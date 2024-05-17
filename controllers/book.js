const Book = require('../models/Book');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

function cleanFileName(str) {
    // Delete emojis
    str = str.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, '');
    // Remplace specials characters
    str = str.normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // Acentuate characters
        .replace(/[^\w\s.-]/g, "") // No letter, number, space, dash or point characters
        .replace(/\s+/g, "") // '#'
        .replace(/\s+/g, "_"); // Convert space to unnderscore
    // Limit name to 99 characters
    if (str.length > 99) {
        str = str.substring(0, 99);
    }
    return str;
}

exports.getAllBook = (req, res, next) => {
    Book.find()
        .then(books => res.status(200).json(books))
        .catch(error => res.status(400).json({error}))
};

exports.getOneBook = (req,res,next) => {
    Book.findOne({ _id: req.params.id })
        .then(book => res.status(200).json(book))
        .catch(error => res.status(404).json({ error }));
};

exports.createBook = async (req,res,next) => {
    console.log("POST ONE") 
    const bookObject = JSON.parse(req.body.book);
    delete bookObject._id;
    delete bookObject.userId;

    const buffer = req.file.buffer;
    const timestamp = Date.now();
    const name = cleanFileName(req.file.originalname);
    const ref = `${timestamp}-${name.split('.')[0]}.webp`;
    sharp(buffer)
        .webp({ quality: 20 })
        .toFile(path.join(__dirname, '../images', ref))
        .then(() => {
            const book = new Book({
                ...bookObject,
                userId: req.auth.userId,
                imageUrl: `${req.protocol}://${req.get('host')}/images/${ref}`
            });
            return book.save();
        })
        .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
        .catch(error => res.status(400).json({ error }));
};

exports.modifyBook = async (req,res,next) => {
    console.log("MODIFY ONE")
    const bookObject = req.file ? {
        ...JSON.parse(req.body.book),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {
        ...req.body
    }
    delete bookObject.userId

    Book.findOne({ _id: req.params.id })
    .then(book => {
      if (book.userId != req.auth.userId) {
        return res.status(401).json({ message: 'Non-autorisé.' });
      }

      if (req.file) {
        const buffer = req.file.buffer;
        const timestamp = Date.now();
        const name = cleanFileName(req.file.originalname);
        const ref = `${timestamp}-${name.split('.')[0]}.webp`;

        return sharp(buffer)
          .webp({ quality: 20 })
          .toFile(path.join(__dirname, '../images', ref))
          .then(() => {
            bookObject.imageUrl = `${req.protocol}://${req.get('host')}/images/${ref}`;

            if (book.imageUrl) {
              const filename = book.imageUrl.split('/images/')[1];
              fs.unlink(`images/${filename}`, (error) => {
                if (error) {
                  console.error("Erreur lors de la suppression du fichier :", error);
                }
              });
            }

            return Book.updateOne({ _id: req.params.id }, { ...bookObject, _id: req.params.id });
          });
      } else {
        return Book.updateOne({ _id: req.params.id }, { ...bookObject, _id: req.params.id });
      }
    })
    .then(() => res.status(200).json({ message: 'Objet modifié!' }))
    .catch(error => res.status(400).json({ error }));
};

exports.deleteBook = (req,res,next) => {
    console.log("DELETE ONE")
    Book.findOne({ _id: req.params.id })
    .then(book => {
        if(book.userId != req.auth.userId){
            res.status(401).json({ message: 'Non-autorisé.' })
        } else {
            const filename = book.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
            Book.deleteOne({ _id: req.params.id })
                .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
                .catch(error => res.status(401).json({ error }));
            })
        }
    })
    .catch(error => res.status(404).json({ error }));
};

// ERROR
exports.getBestBook = (req, res, next) => {
    console.log("GET BEST");
    Book.find().limit(3).sort({ averageRating: -1 })
        .then(books => res.status(200).json(books))
        .catch(error => res.status(400).json({ error }));
};

// NOT IMPLEMENT YET
exports.createRatingBook = (req,res,next) => {
    console.log("POST RATING")
}
const Book = require('../models/Book');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const { cleanFileName, addRating } = require('../functions/utils');

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

exports.createRatingBook = async (req,res,next) => {
    try {
        const book = await Book.findOne({ _id: req.params.id });
        if (!book) {
            return res.status(404).json({ message: "Livre non trouvé." });
        }
        await addRating(req.params.id, book.userId, req.body.rating, req.auth.userId);
        const updatedBook = await Book.findOne({ _id: req.params.id });
        res.status(200).json( updatedBook );
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getBestBooks = async (req, res, next) => {
    console.log("********")
    try {
        const bestBooks = await Book.find().sort({ averageRating: -1 }).limit(3);
        res.status(200).json(bestBooks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
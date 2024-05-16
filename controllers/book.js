const Book = require('../models/Book');
const fs = require('fs');

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

exports.getBestBook = (req, res, next) => {
    console.log("GET BEST");
    Book.find().limit(3).sort({ averageRating: -1 })
        .then(books => res.status(200).json(books))
        .catch(error => res.status(400).json({ error }));
};

exports.createBook = (req,res,next) => {
    console.log("POST ONE") 
    const bookObject = JSON.parse(req.body.book);
    delete bookObject._id;
    delete bookObject.userId;
    const book = new Book({
        ...bookObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    console.log('book final',book)
    book.save()
        .then(() => { res.status(201).json({message: 'Objet enregistré !'})})
        .catch(error => { res.status(400).json({ error })})
};

exports.modifyBook = (req,res,next) => {
    console.log("MODIFY ONE")
    // Require auth
};

exports.deleteBook = (req,res,next) => {
    console.log("DELETE ONE")
    // Require auth
};

exports.createRatingBook = (req,res,next) => {
    console.log("POST RATING")
    // Require auth
}
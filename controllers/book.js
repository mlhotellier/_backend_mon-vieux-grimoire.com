const Book = require('../models/Book');

exports.getAllBook = (req, res, next) => {
    console.log("GET ALL")
    Book.find()
    .then(books => res.status(200).json({books}))
    .catch(error => res.status(400).json({error}))
};

exports.getOneBook = (req,res,next) => {
    console.log("GET ONE")
    console.log(req.params);
    Book.findOne({ _id: req.params.id })
        .then(book => res.status(200).json({book}))
        .catch(error => res.status(404).json({ error }));
};

exports.getBestBook = (req,res,next) => {
    console.log("GET BEST")
    Book.find().sort({ rating: -1 }).limit(3)
    .then(books => res.status(200).json({books}))
    .catch(error => res.status(400).json({error}))
};

exports.createBook = (req,res,next) => {
    console.log("POST ONE")
    // Require auth
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
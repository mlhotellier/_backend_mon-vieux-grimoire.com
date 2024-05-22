const mongoose = require("mongoose");
const calculateAverageRating = require("../functions/calculateAverageRating");

const bookSchema = mongoose.Schema({
    userId : { type: String, required: true },
    title: { type: String, required: true },
    author : { type: String, required: true },
    imageUrl : { type: String, required: true },
    year: { type: Number, required: true },
    genre: { type: String, required: true },
    ratings: [{
        userId: { type: String, required: true },
        grade: { type: Number, required: true, min: 0, max: 5 }
    }],
    averageRating: { type: Number, required: true,  min: 0, max: 5 }
});

bookSchema.pre('save', calculateAverageRating);

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
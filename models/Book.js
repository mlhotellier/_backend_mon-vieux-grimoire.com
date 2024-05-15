const mongoose = require("mongoose")

const bookSchema = mongoose.Schema({
    userId : { type: String, required: true },
    title: { type: String, required: true },
    author : { type: String, required: true },
    imageUrl : { type: String, required: true },
    year: { type: Number, required: true },
    genre: { type: String, required: true },
    ratings: [{
        userId: { type: String },
        grade: { type: Number }
    }],
    averageRating: { type: Number, required: true }
})

// // Calcul de la note moyenne pour chaque livre
// books.forEach(book => {
//     let sum = 0;
//     book.ratings.forEach(rating => {
//         sum += rating.grade;
//     });
//     book.averageRating = sum / book.ratings.length;
// });

module.exports = mongoose.model('Book', bookSchema)
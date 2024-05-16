const mongoose = require("mongoose")

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
    averageRating: { type: Number, required: true, default: 0 }
})

// Calcul de la note moyenne pour chaque livre dès qu'un rating est ajouté, mis à jour ou supprimé
bookSchema.pre('save', function(next) {
    const ratingsCount = this.ratings.length;
    let sum = 0;

    this.ratings.forEach(rating => {
        sum += rating.grade;
    });

    // Calcul de la note moyenne
    if (ratingsCount > 0) {
        this.averageRating = sum / ratingsCount;
    } else {
        this.averageRating = 0;
    }

    next();
});

module.exports = mongoose.model('Book', bookSchema)
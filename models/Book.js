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
    averageRating: { type: Number, required: true,  min: 0, max: 5 }
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

const Book = mongoose.model('Book', bookSchema);

// Fonction pour ajouter une note
const addRating = async (bookId, userId, rating, userConnected) => {
    try {
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: "Le livre demandé n'existe pas." });
        }

        const existingRating = await book.ratings.find(rating => rating.userId === userConnected);
        if (userId === userConnected) {
            return res.status(403).json({ message: "Vous ne pouvez pas noter votre propre livre." });
        }

        if (existingRating) {
            return res.status(403).json({ message: "Vous avez déjà noté ce livre." });
        }

        book.ratings.push({  userId: userConnected, grade: rating });
        await book.save();
        return book;
    } catch (error) {
        res.status(400).json({ error });
    }
};

module.exports = {
    Book,
    addRating
};
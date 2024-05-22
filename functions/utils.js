const Book = require("../models/Book");

// Function to add a note to a book specified by its ID
const addRating = async (bookId, userId, rating, userConnected) => {
    try {
        const book = await Book.findById(bookId);
        if (!book) {
            throw new Error("Le livre demandé n'existe pas.");
        }

        const existingRating = book.ratings.find(rating => rating.userId === userConnected);
        if (userId === userConnected) {
            throw new Error("Vous ne pouvez pas noter votre propre livre.");
        }

        if (existingRating) {
            throw new Error("Vous avez déjà noté ce livre.");
        }

        book.ratings.push({  userId: userConnected, grade: rating });
        await book.save();
        return book;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Function to replace and remove unwanted characters in uploaded file name
const cleanFileName = (str) => {
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
};

module.exports = { cleanFileName, addRating };
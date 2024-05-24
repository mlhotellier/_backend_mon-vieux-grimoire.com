const Book = require('../models/Book');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const { cleanFileName, calculateAverageRating } = require('../functions/utils');

// Function to retrieve all books from the database
exports.getAllBook = async (req, res, next) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ error });
    }
};

// Function to retrieve the 3rd top-rated books from the database
exports.getBestBooks = async (req, res, next) => {
    try {
        const bestBooks = await Book.find().sort({ averageRating: -1 }).limit(3);
        res.status(200).json(bestBooks);
    } catch (error) {
        res.status(500).json({ error });
    }
};

// Function to retrieve a single book from the database based on its ID
exports.getOneBook = async (req, res, next) => {
    try {
        const book = await Book.findOne({ _id: req.params.id });

        if (!book) {
            res.status(404).json({ message: "Book not found." });
        } else {
            res.status(200).json(book);
        }
    } catch (error) {s
        res.status(500).json({ error });
    }
};

// Function to create a new book in the database
exports.createBook = async (req, res, next) => {
    try {
    const bookObject = JSON.parse(req.body.book);
    delete bookObject._id;
    delete bookObject.userId;

    const buffer = req.file.buffer;
    const timestamp = Date.now();
    const name = cleanFileName(req.file.originalname);
    const ref = `${timestamp}-${name.split('.')[0]}.webp`;
    
    // Convert and save image using sharp
    await sharp(buffer)
        .webp({ quality: 20 })
        .toFile(path.join(__dirname, '../images', ref))
        
        const book = new Book({
            ...bookObject,
            userId: req.auth.userId,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${ref}`
        });

        await book.save();
        res.status(201).json({ message: 'Book created !' });
    } catch (error) {
        res.status(500).json({ error });
    }
};

// Function to modify a book in the database
exports.modifyBook = async (req, res, next) => {
    try {
        const bookObject = req.file ? {
            ...JSON.parse(req.body.book),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : {
            ...req.body
        };

        delete bookObject.userId;
        const book = await Book.findOne({ _id: req.params.id });

        if (book.userId != req.auth.userId) {
            return res.status(401).json({ message: 'Unauthorized.' });
        }

        // If a new file is uploaded, process and save the image
        if (req.file) {
            const buffer = req.file.buffer;
            const timestamp = Date.now();
            const name = cleanFileName(req.file.originalname);
            const ref = `${timestamp}-${name.split('.')[0]}.webp`;

            await sharp(buffer)
                .webp({ quality: 20 })
                .toFile(path.join(__dirname, '../images', ref));

            // Update imageUrl in bookObject
            bookObject.imageUrl = `${req.protocol}://${req.get('host')}/images/${ref}`;

            // If the book had an existing image, delete it
            if (book.imageUrl) {
                const filename = book.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, (error) => {
                    if (error) {
                        console.error("Error deleting file:", error);
                    }
                });
            }
        }

        await Book.updateOne({ _id: req.params.id }, { ...bookObject, _id: req.params.id });
        res.status(200).json({ message: 'Book modified!' });
    } catch (error) {
        res.status(500).json({ error });
    }
};

// Function to delete a book from the database
exports.deleteBook = async (req, res, next) => {
    try {
        const book = await Book.findOne({ _id: req.params.id });

        if (book.userId != req.auth.userId) {
            return res.status(401).json({ message: 'Unauthorized.' });
        }

        const filename = book.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
            Book.deleteOne({ _id: req.params.id })
                .then(() => res.status(200).json({ message: 'Book deleted!' }))
                .catch(error => res.status(401).json({ error }));
        });
    } catch (error) {
        res.status(500).json({ error });
    }
};

// Function to add a rating for a book in the database
exports.createRatingBook = async (req, res, next) => {
    const userId = req.auth.userId;
    const rating = req.body.rating;
    try {
        const book = await Book.findOne({ _id: req.params.id });
        
        if (!book) {
            return res.status(404).json({ message: "Book not found." });
        }

        const existingRating = book.ratings.find(r => r.userId === userId);
        if (existingRating) {
            return res.status(400).json({ message: "You have already rated this book." });
        }

        const newRating = { userId: userId, grade: rating };

        const updatedBook = await Book.findOneAndUpdate(
            { _id: req.params.id },
            { $push: { ratings: newRating } },
            { new: true }
        );

        // Calculate and update the book's average rating
        const newAverageRating = calculateAverageRating(updatedBook.ratings);
        updatedBook.averageRating = newAverageRating;
        await updatedBook.save();

        res.status(200).json(updatedBook);
    } catch (error) {
        res.status(500).json({ error });
    }
};
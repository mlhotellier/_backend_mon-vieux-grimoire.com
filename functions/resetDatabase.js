const mongoose = require('mongoose');
const fs = require('fs').promises;
const path = require('path');

// Function to reset the database --dev function
const resetDatabase = async () => {
    try {
        // Delete 'users' collection
        await mongoose.connection.db.collection('users').drop();
        console.log("Collection 'users' deleted.");

        // Delete 'books' collection
        await mongoose.connection.db.collection('books').drop();
        console.log("Collection 'books' deleted.");

        // Get the list of files in the '/images/' directory
        const files = await fs.readdir(path.join(__dirname, '../images'));

        // Loop through each file and delete it
        for (const file of files) {
            await fs.unlink(path.join(__dirname, '../images', file));
            console.log(`Deleted file: ${file}`);
        }

        console.log("Database is reset and ready, uncomment lines in db.js for use app.");

    } catch (error) {
        console.error("Error deleting collections or files in the '/images/' directory:", error);
    }
};

module.exports = resetDatabase;

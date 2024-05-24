const mongoose = require('mongoose');
const fs = require('fs').promises;

// Function to reset the database
const resetDatabase = async () => {
    try {
        // Delete 'users' collection
        await mongoose.connection.db.collection('users').drop();
        console.log("Collection 'users' deleted.");

        // Delete 'books' collection
        await mongoose.connection.db.collection('books').drop();
        console.log("Collection 'books' deleted.");

        console.log("Collections 'users' and 'books' have been removed successfully.");

        // Delete the content of the '/images/' directory
        await fs.rm(path.join(__dirname, '../images'), { recursive: true });
        console.log("The content of the '/images/' directory has been deleted successfully.");
    } catch (error) {
        console.error("Error deleting collections or content of the '/images/' directory:", error);
    }
};

module.exports = resetDatabase;

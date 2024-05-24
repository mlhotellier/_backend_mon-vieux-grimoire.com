const mongoose = require('mongoose');
// If you want to reset your project you need to uncomment line:3 and line:14
// const resetDatabase = require('./functions/resetDatabase');

const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb+srv://${process.env.DB_ID}:${process.env.DB_PWD}@${process.env.DB_URL}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Successfully connected to MongoDB!');

    // Reset collections (users & books) in database (decomment to use)
    // await resetDatabase();
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1); // Exit the process with failure
  }
};

module.exports = connectDB;
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb+srv://${process.env.DB_ID}:${process.env.DB_PWD}@${process.env.DB_URL}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

  } catch (error) {
    process.exit(1); // Exit the process with failure
  }
};

module.exports = connectDB;
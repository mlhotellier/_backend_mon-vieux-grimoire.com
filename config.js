// Use this file to manage sensitive application configuration
// To generate a secure secret key, uncomment the following lines:

// const crypto = require('crypto');
// const secretKey = crypto.randomBytes(32).toString('hex');
// console.log(secretKey);

// Ensure the secret key is defined in the environment variables
if (!process.env.SECRET_KEY) {
    console.error('ERROR: SECRET_KEY is not defined in the environment variables.');
    process.exit(1);
  }
  
  module.exports = {
    secretKey: process.env.SECRET_KEY
  };
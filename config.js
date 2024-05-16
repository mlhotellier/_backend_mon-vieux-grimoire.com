// Générer une clé aléatoire sécurisée
// const crypto = require('crypto');
// const secretKey = crypto.randomBytes(32).toString('hex');
// console.log(secretKey)

module.exports = {
    secretKey: `${process.env.SECRET_KEY}`
};
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { secretKey } = require('../config');

exports.signup = (req, res, next) => {
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(req.body.email);
    
    if (!isValidEmail) {
        return res.status(400).json({ message: 'Invalid email address.' });
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/;
    const isValidPassword = passwordRegex.test(req.body.password);

    if (!isValidPassword) {
        return res.status(400).json({ message: 'Password must contain at least 8 characters, including: 1 uppercase letter, 1 lowercase letter and 1 special character.'});
    }

    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            email: req.body.email,
            password: hash,
            createdAt: new Date(),
        });
        user.save()
            .then(() => res.status(201).json({ message: 'User created' }))
            .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user === null) {
                res.status(401).json({ message: 'Incorrect email/password pair.' });
            } else {
                bcrypt.compare(req.body.password, user.password)
                    .then(valid => {
                        if (!valid) {
                            res.status(401).json({ message: 'Incorrect email/password pair.' });
                        } 
                        const lastActivity = user.lastActivity = Date.now();
                        user.save()
                            .then(() => {
                                res.status(200).json({
                                    userId: user._id,
                                    lastActivity: lastActivity,
                                    token: jwt.sign(
                                        { userID: user._id },
                                        secretKey,
                                        { expiresIn: '24h' }
                                    )
                                });
                            })
                            .catch(error => res.status(500).json({ error: error.message }));
                    })
                    .catch(error => {
                        res.status(500).json({ error });
                    });
            }
        })
        .catch(error => {
            res.status(500).json({ error });
        });
};
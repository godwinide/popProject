const express = require('express');
const Router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load User model
const User = require('../models/userModel');

const { forwardAuthenticated, ensureAuthenticated, ensureIsAdmin } = require('../config/auth');

// Login Page
Router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

// Register Page
Router.get('/register', ensureIsAdmin, ensureAuthenticated, (req, res) => res.render('register', { req }));

Router.post("/register", ensureAuthenticated, ensureIsAdmin, (req, res) => {
    // Register
    const { username, firstname, lastname, cash, password, password2, attendantID } = req.body;
    let errors = [];

    if (!firstname || !lastname || !username || !cash || !password || !password2 || !attendantID) {
        errors.push({ msg: 'Please enter all fields' });
    }

    if (password != password2) {
        errors.push({ msg: 'Passwords do not match' });
    }

    if (errors.length > 0) {
        res.render('register', {
            errors,
            username,
            password,
            password2,
            attendantID,
            firstname,
            lastname,
            cash
        });
    } else {
        User.findOne({ username: username }).then(user => {
            if (user) {
                errors.push({ msg: 'Username already exists' });
                res.render('register', {
                    errors,
                    firstname,
                    username,
                    password,
                    password2,
                    attendantID,
                    lastname,
                    cash
                });
            } else {
                const newUser = new User({
                    firstname,
                    username,
                    password,
                    password2,
                    attendantID,
                    lastname,
                    cash
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser
                            .save()
                            .then(() => {
                                req.flash(
                                    'success_msg',
                                    'You are now registered and can log in'
                                );
                                res.redirect('/');
                            })
                            .catch(err => console.log(err));
                    });
                });
            }
        });
    }
});



// Login
Router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/auth/login',
        failureFlash: true
    })(req, res, next);
});


// Logout
Router.post('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/auth/login');
});

module.exports = Router;
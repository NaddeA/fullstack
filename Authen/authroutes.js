const express = require('express');
const passport = require('passport');
const User = require('../usermodel'); 
const router = express.Router();


router.post('/register', (req, res) => {
    User.register(new User({ username: req.body.username }), req.body.password, (err, user) => {
        if (err) {
            return res.status(500).json(err);
        }
        passport.authenticate('local')(req, res, () => {
            res.redirect('/dashboard');
        });
    });
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login'
}), (req, res) => {});


router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;

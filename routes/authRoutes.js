const express = require('express');
const passport = require('passport');
const User = require('../models/User');  // Assuming a User model is set up with username, email, and password

const router = express.Router();

// Local register route
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        // Create and save the new user
        const newUser = new User({ username, email, password });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
});

// Local login route
router.post('/login', passport.authenticate('local'), (req, res) => {
    res.json({ message: 'Login successful', user: req.user });
});

// GitHub OAuth login route
router.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));

// GitHub OAuth callback route
router.get('/auth/github/callback', passport.authenticate('github', {
    failureRedirect: '/auth/login-failed'
}), (req, res) => {
    res.redirect('/auth/success');  // Redirect to a success page or dashboard
});

// Success route after login
router.get('/auth/success', (req, res) => {
    res.json({ message: 'GitHub login successful', user: req.user });
});

// Logout route
router.get('/logout', (req, res) => {
    req.logout(() => {
        res.json({ message: 'Logged out successfully' });
    });
});

module.exports = router;

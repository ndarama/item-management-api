const express = require('express');
const passport = require('passport');
const User = require('../models/User');  

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
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Error registering user', error });
    }
});

// Local login route
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.error('Login error:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Log in the user
        req.logIn(user, (loginErr) => {
            if (loginErr) {
                console.error('Error during login:', loginErr);
                return res.status(500).json({ message: 'Internal server error' });
            }
            res.json({ message: 'Login successful', user });
        });
    })(req, res, next);
});

// GitHub OAuth login route
router.get('/github', (req, res, next) => {
    console.log('GitHub OAuth login request received');
    next();
}, passport.authenticate('github', { scope: ['user:email'] }));

// GitHub OAuth callback route
router.get('/github/callback',
    passport.authenticate('github', {
        failureRedirect: '/login',
        session: true
    }),
    (req, res) => {
        console.log('GitHub OAuth callback successful');
        res.json({ message: 'GitHub login successful', user: req.user });
    }
);

// Optional: Handle login failures
router.get('/login', (req, res) => {
    res.status(401).json({ message: 'Login failed. Please try again.' });
});

// Logout route
router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            console.error('Logout error:', err);
            return res.status(500).json({ message: 'Logout failed' });
        }

        req.session.destroy(() => {
            res.json({ message: 'Logout successful' });
        });
    });
});


module.exports = router;

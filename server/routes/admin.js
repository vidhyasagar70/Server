const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router();

// Admin login route
router.post('/login', async (req, res) => {
    const { name, password } = req.body;
    
    // Admin credentials (hardcoded for example)
    const adminName = 'admin';
    const adminPassword = 'admin123'; // You can hash and store this securely

    if (name !== adminName || password !== adminPassword) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ name: adminName, role: 'admin' }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });

    res.json({ token });
});

// Get all users (protected, admin only)
router.get('/dashboard', protect, adminOnly, async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');


// SECRET KEY - In a real app, put this in a .env file
const JWT_SECRET = "mooljemal_super_secret_key_2026";

// ==========================================
// SIGN UP ROUTE (Register)
// ==========================================
router.post('/signup', async (req, res) => {
    try {
        const { firstName, lastName, email, phone, password } = req.body;

        // 1. Check if user already exists
        let user = await User.findOne({ $or: [{ email }, { phone }] });
        if (user) return res.status(400).json({ message: "Email or Phone already exists" });

        // 2. Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 3. Create User
        user = new User({
            firstName,
            lastName,
            email,
            phone,
            password: hashedPassword,
            role: 'customer' // Default role
        });

        await user.save();
        res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ==========================================
// LOGIN ROUTE
// ==========================================
router.post('/login', async (req, res) => {
    try {
        const { phone, password } = req.body;

        // 1. Find user by phone
        const user = await User.findOne({ phone });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        // 2. Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        // 3. Create JWT Token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        // 4. Send response
        res.json({
            token,
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role
            }
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// GET Current User Profile
router.get('/profile', auth, async (req, res) => {
    try {
        // req.user.id comes from the decoded token in the middleware
        const user = await User.findById(req.user.id).select('-password'); 
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
module.exports = router;
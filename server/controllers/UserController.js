const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

const UserController = {
    // Registering a new user
    register: async (req, res) => {
        try {
            const { name, alias, email, password } = req.body;
            // Checking if user already exists
            const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use." });
    }
            // Hash password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            // Create new user
            const newUser = await User.create({
                first_name,
                last_name,
                alias,
                email,
                password: hashedPassword
    });
                res.status(201).json({ message: "User registered successfully.", user: newUser });
                } catch (error) {
                console.error(error);
                res.status(500).json({ message: "Error registering new user." });
    }
},
        // Authenticate user and return JWT
        login: async (req, res) => {
            try {
            const { email, password } = req.body;
            // Check for user
            const user = await User.findOne({ where: { email } });
            if (!user) {
                return res.status(400).json({ message: "User not found." });
    }
            // Comparing password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: "Invalid credentials." });
    }
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ message: "Logged in successfully.", token });
            } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error logging in." });
    }
},

};

module.exports = UserController;

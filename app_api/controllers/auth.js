const jwt = require('jsonwebtoken');
const User = require('../models/user');

const JWT_SECRET = process.env.JWT_SECRET || 'devsecret';
const JWT_EXPIRES_IN = '1d';

const signToken = (user) =>
    jwt.sign({ sub: user._id, email: user.email, name: user.name }, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
    });

exports.register = async (req, res) => {
    try {
        const { email, name, password } = req.body;
        if (!email || !name || !password) {
            return res.status(400).json({ message: 'email, name and password are required' });
        }

        const existing = await User.findOne({ email: email.toLowerCase().trim() });
        if (existing) return res.status(409).json({ message: 'Email already registered' });

        const user = new User({ email, name });
        await user.setPassword(password);
        await user.save();

        const token = signToken(user);
        res.status(201).json({ token, user: { id: user._id, email: user.email, name: user.name } });
    } catch (err) {
        res.status(500).json({ message: 'Registration failed', error: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: (email || '').toLowerCase().trim() });
        if (!user) return res.status(401).json({ message: 'Invalid credentials' });

        const ok = await user.validatePassword(password || '');
        if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

        const token = signToken(user);
        res.json({ token, user: { id: user._id, email: user.email, name: user.name } });
    } catch (err) {
        res.status(500).json({ message: 'Login failed', error: err.message });
    }
};

exports.me = async (req, res) => {
    res.status(501).json({ message: 'Not implemented in this snippet' });
};

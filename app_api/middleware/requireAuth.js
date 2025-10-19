const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'dev_only_change_me';

module.exports = function requireAuth(req, res, next) {
    const auth = req.headers.authorization || '';
    const token = auth.startsWith('Bearer ') ? auth.substring(7) : null;
    if (!token) return res.status(401).json({ message: 'Missing token' });

    try {
        const payload = jwt.verify(token, JWT_SECRET);
        req.user = payload; // {sub, email, role}
        return next();
    } catch {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};

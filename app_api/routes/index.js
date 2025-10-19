const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const tripsCtrl = require('../controllers/trips');
const authCtrl = require('../controllers/auth');
const analyticsCtrl = require('../controllers/analytics'); 
const validateTrip = require('../validators/tripValidator');

const JWT_SECRET = process.env.JWT_SECRET || 'changeme';

//simple JWT guard
function requireAuth(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ message: 'No token provided' });

    const token = authHeader.split(' ')[1];
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Failed to authenticate token' });
        req.user = decoded;
        next();
    });
}

//Public read endpoints
router.get('/trips', tripsCtrl.list);
router.get('/trips/:id', tripsCtrl.getOne);

//Protected write endpoints
router.post('/trips', requireAuth, validateTrip, tripsCtrl.create);
router.put('/trips/:id', requireAuth, validateTrip, tripsCtrl.update);
router.delete('/trips/:id', requireAuth, tripsCtrl.remove);

//Auth endpoints
router.post('/register', authCtrl.register);
router.post('/login', authCtrl.login);

//Analytics endpoints
router.get('/analytics/avg-price-per-resort', requireAuth, analyticsCtrl.avgPricePerResort);
router.get('/analytics/counts', requireAuth, analyticsCtrl.counts);

module.exports = router;

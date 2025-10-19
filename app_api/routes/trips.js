const express = require('express');
const router = express.Router();
const tripsController = require('../controllers/trips');

// GET /api/trips
router.get('/', tripsController.tripsList);

module.exports = router;

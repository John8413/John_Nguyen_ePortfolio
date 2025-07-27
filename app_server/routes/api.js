const express = require('express');
const router = express.Router();

// Example static trip data
const trips = [
    {
        title: 'Phillu',
        destination: 'Phildelphia, USA',
        date: '2025-07-10',
        price: '$899'
    },
];

// GET /api/trips
router.get('/trips', (req, res) => {
    res.json(trips);
});

module.exports = router;

const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
    title: { type: String, required: true },
    location: { type: String, required: true },
    duration: { type: String, required: true },
    summary: { type: String, required: true }
});

module.exports = mongoose.model('Trip', tripSchema);

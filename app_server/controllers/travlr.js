// Import trips data
const trips = require('../data/trips.json');

module.exports.home = (req, res) => {
    res.render('index', { title: 'Travlr Getaways', subtitle: 'Explore Your Next Destination' });
};

module.exports.about = (req, res) => {
    res.render('about', { title: 'About Us' });
};

module.exports.rooms = (req, res) => {
    res.render('rooms', { title: 'Rooms' });
};

module.exports.meals = (req, res) => {
    res.render('meals', { title: 'Meals' });
};

module.exports.news = (req, res) => {
    res.render('news', { title: 'News' });
};

// Updated travel route with JSON data
module.exports.travel = (req, res) => {
    res.render('travel', {
        title: 'Travel Destinations',
        trips: trips
    });
};

module.exports.contact = (req, res) => {
    res.render('contact', { title: 'Contact Us' });
};

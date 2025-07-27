// Import the Trip model from Mongoose
const Trip = require('../models/trip');

// Controller for homepage
module.exports.home = (req, res) => {
    res.render('index', {
        title: 'Travlr Getaways',
        subtitle: 'Explore Your Next Destination'
    });
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

// Updated travel route to fetch data from MongoDB
module.exports.travel = async (req, res) => {
    try {
        const trips = await Trip.find(); 
        res.render('travel', {
            title: 'Travel Destinations',
            trips: trips
        });
    } catch (err) {
        console.error('Error fetching trips:', err);
        res.status(500).send('Internal Server Error');
    }
};

module.exports.contact = (req, res) => {
    res.render('contact', { title: 'Contact Us' });
};

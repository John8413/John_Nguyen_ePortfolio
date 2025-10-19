// Load environment variables
require('dotenv').config();

const express = require('express');
const path = require('path');
const hbs = require('hbs');
const cors = require('cors');
const logger = require('./app_api/utils/logger'); // Winston logger
const { connectDB } = require('./app_api/db/database'); // Secure DB connection

const app = express();
const PORT = process.env.PORT || 3000;

//Connect to MongoDB using centralized db module
connectDB();

//Models
require('./app_api/models/trip');
require('./app_api/models/user');

//View Engine Setup (Public Website)
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, 'app_server', 'views', 'partials'));

//Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Enable CORS for Angular frontend
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

//Routes
//Public site routes
app.use('/', require('./app_server/routes/travlr'));

//Auth & API routes
app.use('/api/auth', require('./app_api/routes/auth'));
app.use('/api', require('./app_api/routes'));

//Global Error Handler (for debugging & production safety)
app.use((err, req, res, next) => {
    logger.error(`Unhandled error: ${err.message}`);
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

//Start Server
app.listen(PORT, () => {
    logger.info(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

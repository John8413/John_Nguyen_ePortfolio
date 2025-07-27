const express = require('express');
const path = require('path');
const hbs = require('hbs');

const app = express();
const PORT = 3000;

// View engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'hbs');

// Register partials
hbs.registerPartials(path.join(__dirname, 'app_server', 'views', 'partials'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Body parser middleware (in case you'll need it for POST requests)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Website routes
const travelRouter = require('./app_server/routes/travlr');
app.use('/', travelRouter);

// API routes
const apiRouter = require('./app_server/routes/api');
app.use('/api', apiRouter);

// Start server
app.listen(PORT, () => {
    console.log(`App is running on http://localhost:${PORT}`);
});

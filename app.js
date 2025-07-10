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

// Routes
const travelRouter = require('./app_server/routes/travlr');
app.use('/', travelRouter);

// Start server
app.listen(PORT, () => {
    console.log(`App is running on http://localhost:${PORT}`);
});

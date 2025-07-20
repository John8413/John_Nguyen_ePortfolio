const path = require('path');
const fs = require('fs');

const tripFile = path.join(__dirname, '..', 'data', 'trips.json');

module.exports.getTrips = () => {
    const tripsData = fs.readFileSync(tripFile);
    return JSON.parse(tripsData);
};

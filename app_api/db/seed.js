require('dotenv').config();
const mongoose = require('mongoose');
const { connectDB } = require('./database');
const Trip = require('../models/trip');
const User = require('../models/user');

async function seedData() {
    try {
        await connectDB();

        console.log('Clearing old data...');
        await Trip.deleteMany({});
        await User.deleteMany({});

        console.log('Seeding sample trips...');
        const trips = await Trip.insertMany([
            {
                code: 'HNL001',
                name: 'Honolulu Getaway',
                resort: 'Waikiki Beach Resort',
                perPerson: 1599,
                duration: '5 days',
                allInclusive: true,
                description: 'Relaxing stay in Hawaii with ocean views.',
                start: new Date('2025-12-01'),
                end: new Date('2025-12-06')
            },
            {
                code: 'MAU002',
                name: 'Maui Adventure',
                resort: 'Kaanapali Shores',
                perPerson: 1899,
                duration: '7 days',
                allInclusive: false,
                description: 'Adventure package with snorkeling and volcano tour.',
                start: new Date('2026-01-15'),
                end: new Date('2026-01-22')
            }
        ]);

        console.log('Seeding admin user...');
        const admin = new User({
            email: 'admin@travlr.com',
            name: 'Admin User'
        });
        await admin.setPassword('SecurePass123!');
        await admin.save();

        console.log('Database successfully seeded!');
        mongoose.connection.close();
    } catch (err) {
        console.error('Seeding error:', err.message);
        mongoose.connection.close();
    }
}

seedData();

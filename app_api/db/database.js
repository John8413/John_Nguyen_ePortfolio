const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/travlr';
const MONGODB_DBNAME = process.env.MONGODB_DBNAME || ''; 

mongoose.set('strictQuery', true); // safer queries

async function connectDB() {
    try {
        await mongoose.connect(MONGODB_URI, {
            dbName: MONGODB_DBNAME || undefined,
            autoIndex: false,           // turn on selectively per schema
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 10000
        });
        console.log('[db] connected to', MONGODB_URI, MONGODB_DBNAME || '');
    } catch (err) {
        console.error('[db] connection error:', err.message);
        process.exit(1);
    }
}

mongoose.connection.on('error', err => {
    console.error('[db] runtime error:', err.message);
});

module.exports = { connectDB };

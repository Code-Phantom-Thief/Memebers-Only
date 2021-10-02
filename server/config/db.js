const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI;

const MongoDB_Connection = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB Connection succeeded!!!');
    } catch (error) {
        console.log('MongoDB Connection failed...');
    }
}

module.exports = MongoDB_Connection;
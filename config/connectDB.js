const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        console.log('connecting...');
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("mongodb connected");
    } 
    catch (error) {
        console.log("failed to connect mongodb");
        console.error(error);
    }
}

module.exports = connectDB;
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const ConnectToDB = async() => {

    try {
        await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to the MongoDB database');
    } catch (error) {
        console.error(`Error connecting to the database: ${error.message}`);

    }

}

module.exports = ConnectToDB;
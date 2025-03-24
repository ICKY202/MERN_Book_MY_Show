const mongoose = require('mongoose');
require('dotenv').config();

const mongo_connection =async () => {
    try {
    await mongoose.connect(process.env.mongo_url,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log('connection  has been established successfully!');
    }catch(err) {
        console.log('An Error occurred while connecting to database');
    }
}

module.exports = mongo_connection;
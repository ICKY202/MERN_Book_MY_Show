const mongoose = require('mongoose');

const mongo_connection =async () => {
    try {
    await mongoose.connect(process.env.mongo_url);
    console.log('connection  has been established successfully!');
    }catch(err) {
        console.log('An Error occurred while connecting to database' + err.message);
    }
}

module.exports = mongo_connection;
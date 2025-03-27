
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongo_connection = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const movieRoutes = require('./routes/movieRoutes');
const theaterRoutes = require('./routes/theaterRoutes');
const showRoutes = require('./routes/showRoutes');

const app = express();

mongo_connection();

app.use(express.json());
app.use(cors());

app.use('/api/users', userRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/theaters', theaterRoutes);
app.use('/api/shows', showRoutes);
const PORT = 8001;

app.listen(PORT, () => {
    console.log('server listening...');
});

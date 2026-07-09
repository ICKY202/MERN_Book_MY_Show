const path = require('path');
const express = require('express');
const cors = require('cors');
const express_rate_limiter = require('express-rate-limit');
const helmet = require('helmet');
require('dotenv').config();
const mongo_connection = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const movieRoutes = require('./routes/movieRoutes');
const theaterRoutes = require('./routes/theaterRoutes');
const showRoutes = require('./routes/showRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

const app = express();

mongo_connection();
const rateLimit = express_rate_limiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again later",
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
})
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'https://checkout.stripe.com/checkout.js'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "https://assets-in.bmscdn.com/"],
        connectSrc: ["'self'", "https://api.stripe.com"],
        scriptSrcElem: ["'self'", "'unsafe-inline'", "https://checkout.stripe.com"],
        frameSrc: ["'self'", "https://checkout.stripe.com"],
    },
}))
app.use(express.static(path.join(__dirname, 'build')));
app.use('/api', rateLimit)
app.use('/api/users', userRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/theaters', theaterRoutes);
app.use('/api/shows', showRoutes);
app.use('/api/bookings', bookingRoutes);
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
const PORT = 8001;  

app.listen(PORT, () => {
    console.log('server listening...');
});


const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongo_connection = require('./config/db');
const userRouter = require('./routes/userRoutes');

const app = express();

mongo_connection();

app.use(express.json());
app.use(cors());

app.use('/api/users', userRouter);
const PORT = 8001;

app.listen(PORT, () => {
    console.log('server listening...');
});

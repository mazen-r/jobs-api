require('dotenv').config();
require('express-async-errors');

const express = require('express');
const server = express();

const connectDB = require('./db/connect')
const authenticateUser = require('./middleware/authentication')

server.use(express.json());

const authRoutes = require('./routes/auth');
const jobsRoutes = require('./routes/jobs')

server.get('/', (req, res) => {
    res.send('Hello World')
})

server.use('/api/v1/auth', authRoutes);
server.use('/api/v1/jobs', authenticateUser, jobsRoutes);

const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

server.use(notFoundMiddleware);
server.use(errorHandlerMiddleware);


connectDB(process.env.MONGO_URI)

module.exports = server;
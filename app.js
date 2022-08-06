require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

const connectDB = require('./db/connect')

app.use(express.json());

const authRoutes = require('./routes/auth');
const jobsRoutes = require('./routes/jobs')

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/jobs', jobsRoutes);

const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.port || 8000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => 
        console.log(`Server is running on port ${port}`));
    } catch (error) {
        console.log(error);
    };
};

start();
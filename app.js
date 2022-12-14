require('dotenv').config();
require('express-async-errors');

const helmet = require('helmet');
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')

// Swagger
const swaggerUI = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerDocument = YAML.load('./swagger.yaml')


const express = require('express');
const app = express();

const connectDB = require('./db/connect')
const authenticateUser = require('./middleware/authentication')

app.set('trust proxy', 1);
app.use(rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
}))
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

const authRoutes = require('./routes/auth');
const jobsRoutes = require('./routes/jobs')


app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

app.get('/', (req, res) => {
    res.send('<h1>Jobs API</h1><a href="/docs">API Documentation</a>')
})

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/jobs', authenticateUser, jobsRoutes);

const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 8000

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

require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Jobs API");
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.port || 8000

const start = async () => {
    try {
        app.listen(port, () => 
        console.log(`Server is running on port ${port}`));
    } catch (error) {
        console.log(error);
    };
};

start();
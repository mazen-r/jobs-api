require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Jobs API");
});

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
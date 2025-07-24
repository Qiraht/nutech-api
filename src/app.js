const express = require('express');
const cors = require('cors');
const ErrorHandler = require('./middlwares/ErrorHandler');

const app = express();

const corsOption = {
    origin: '*',
    optionsSuccessStatus: 200,
};

app.use(cors(corsOption));
app.use(express.json());

// Middleware
app.use(ErrorHandler);

// Health Check
app.get('/', (req, res) => {
  res.json({message: 'testing'})
});

module.exports = app;
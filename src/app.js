const express = require('express');
const cors = require('cors');

const app = express();

const corsOption = {
    origin: '*',
    optionsSuccessStatus: 200,
};

app.use(cors(corsOption));
app.use(express.json);

// Health Check
app.get('/', (req, res) => {
  res.json({message: 'testing'})
});

module.exports = app;
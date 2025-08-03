const express = require('express');
const cors = require('cors');
const ErrorHandler = require('./middlewares/ErrorHandler');
const router = require('./routes');
const { scopePerRequest } = require('awilix-express');
const container = require('./container');
const path = require('path');

const app = express();

const routes = router;

const corsOption = {
  origin: '*',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOption));
app.use(express.json());
app.use(scopePerRequest(container));
app.use('/public', express.static(path.join(__dirname, 'public')));

// Routes
app.use(routes);

// Middleware
app.use(ErrorHandler);

// Health Check
app.get('/', (req, res) => {
  res.json({ message: 'Hello World!' });
});

module.exports = app;

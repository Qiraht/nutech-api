const express = require('express');
const cors = require('cors');
const path = require('path');

const { scopePerRequest } = require('awilix-express');
const container = require('./container');

const ErrorHandler = require('./middlewares/ErrorHandler');

const usersRoutes = require('./routes/usersRoutes');
const informationsRoutes = require('./routes/informationsRoutes');
const transactionsRoutes = require('./routes/transactionsRoutes');


const app = express();

const corsOption = {
  origin: '*',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOption));
app.use(express.json());
app.use(scopePerRequest(container));
app.use('/public', express.static(path.join(__dirname, 'public')));

// Routes V1
app.use(usersRoutes);
app.use(informationsRoutes);
app.use(transactionsRoutes);

// Middleware
app.use(ErrorHandler);

// Health Check
app.get('/', (req, res) => {
  res.json({ message: 'Hello World!' });
});

module.exports = app;

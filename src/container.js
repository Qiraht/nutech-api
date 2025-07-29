const { createContainer, asClass, asValue } = require('awilix');
const UsersServices = require('./services/postgres/usersServices');
const UsersController = require('./controllers/usersController');
const { Pool } = require('pg');
const config = require('./config');
const TokenManager = require('./utils/tokenManager');
const InformationsServices = require('./services/postgres/informationServices');
const InformationsController = require('./controllers/informationsController');
const TransactionsServices = require('./services/postgres/transactionService');
const TransactionsController = require('./controllers/transactionsController');
const MapServicesToModel = require('./utils/mapServicesToModel');
const MapBannerToModel = require('./utils/mapBannerToModel');

const container = createContainer();

const pool = new Pool(config.psql);

// Registering Container
container.register({
  // Postgres pool
  pool: asValue(pool),

  // Token Manager
  tokenManager: asValue(TokenManager),

  // Map
  mapBannerToModel: asValue(MapBannerToModel),
  mapServicesToModel: asValue(MapServicesToModel),

  // Services
  userService: asClass(UsersServices).singleton(),
  informationService: asClass(InformationsServices).singleton(),
  transactionService: asClass(TransactionsServices).singleton(),

  // Controller
  userController: asClass(UsersController),
  informationController: asClass(InformationsController),
  transactionController: asClass(TransactionsController),
});

module.exports = container;

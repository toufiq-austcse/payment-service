// start - initialize module aliases
require('module-alias/register');
// end - initialize module aliases

const apiRoute = require('@api');
const bootstrapper = require('@core/bootstrapper');
const commonErrorHandler = require('@core/commonErrorHandler');
const connectors = require('./core/connectors');
const config = require('@config');
const shutDownManager = require('@core/shutdownManager');
const orms = require('./common/orms');
const cache = require('./common/cache');
const middlewares = require('./common/middlewares');
const { logger } = require('handlebars');
/**
 * Creates a server instance
 * @param {*} options Options; can contain either a `clientPath` or `indexPath` together with
 * a `resourcesPath`.
 */
async function start(options) {
  options = options || {};
  options.middlewares = [
    middlewares.ormProvider.includeOrm(orms.sequelize),
    middlewares.cacheProvider.includeCacheDb(cache.redisCache),
  ];

  const port = options.port || config.DEFAULT_PORT;
  const app = _createApp(options);
  await _initializeDependentConnections();
  return app.listen(port, function () {
    logger.log(`server started on port ${port}`);
  });
}

/**
 * Manages force shutdown cases by closing all the open connections
 * and house keeping.
 * @param {*} server An server instance created by invoking `start`
 */
function autoManageShutdown(server) {
  shutDownManager.manage(server);
}

/**
 * Helper method to create an express app with necessary setup.
 * @param {*} options Options; can contain either a `clientPath` or `indexPath` together with
 * a `resourcesPath`
 */
function _createApp(options) {
  let app;
  options = options || {};
  const { clientDirPath, indexPath, staticDirPath, middlewares } = options;
  /**
   * App is bootstrapped only after all the models and routes have
   * been loaded using `apiRoute`
   */
  if (indexPath && staticDirPath) {
    app = bootstrapper.initiateWithIndexAndStaticDir(indexPath, staticDirPath);
  } else {
    app = bootstrapper.initiate(clientDirPath);
  }

  middlewares.forEach((middleware) => app.use(middleware));
  // apis are available under /api prefix
  app.use('/api', apiRoute);

  // error handler middleware has to be attached at the very end
  commonErrorHandler.attachWithApp(app);

  return app;
}

/**
 * All connections to database instance, redis instance etc.
 * should be done inside this function.
 */
async function _initializeDependentConnections() {
  await connectors.sequelize.connectToMysql();
  await connectors.redis.connectToRedis();
  await connectors.pubsub.connectToPubsub();
  // the other connections to be made, should follow here
}

module.exports = {
  autoManageShutdown,
  start,
};

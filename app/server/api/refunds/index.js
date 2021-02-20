const model = require('./model');
const transaction = require('../transactions');
const RefundController = require('./controller');
const orms = require('../../common/orms');
const cache = require('../../common/cache');

function subscribe(topic, pubsubInstance) {
  pubsubInstance.subscribe(topic);

  pubsubInstance.on('message', async (topic, msg) => {
    if (topic === 'refunds') {
      let context = {
        orm: orms.sequelize,
        cacheDb: cache.redisCache,
        transactionModel: transaction.model,
        refundModel: model
      }
      await RefundController.create(context, msg);
    }

  })

}
module.exports = {
  config: require('./config'),
  route: require('./route'),
  model,
  subscribe
};

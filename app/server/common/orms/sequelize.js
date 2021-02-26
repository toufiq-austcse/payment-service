const connectors = require('../../core/connectors');

async function create(model, data) {
  let sequelize = await connectors.sequelize.getSeqInstance();

  const createdData = await model(sequelize).create(data);
  return createdData;
}
async function updateTransaction(model, trxId, data) {
  let sequelize = await connectors.sequelize.getSeqInstance();
  await model(sequelize).update(data, {
    where: {
      ssl_transaction_id: trxId,
    },
  });
}

async function updateRefund(model, refundId, data) {
  let sequelize = await connectors.sequelize.getSeqInstance();
  await model(sequelize).update(data, {
    where: {
      id: refundId,
    },
  });
}


async function findTransactionByOrderId(model, orderId) {
  let sequelize = await connectors.sequelize.getSeqInstance();
  let transaction = await model(sequelize).findOne({ where: { order_id: orderId } });
  if (!transaction) {
    return null;
  }
  return transaction.dataValues;
}
module.exports = {
  create,
  updateTransaction: updateTransaction,
  updateRefund:updateRefund,
  findByOrderId: findTransactionByOrderId,
};

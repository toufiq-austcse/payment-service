const ssl = require('../../core/gateways/ssl');
const config = require('./config');
class TransactionController {
  static async create(context, data) {
    let { orm, model } = context;
    let { sslResponse, transactionId } = await ssl.initiateTransaction(data);
    let transaction = {
      order_id: data.orderId,
      amount: data.totalAmount,
      status: config.STATUS.initiated,
      ssl_transaction_id: transactionId,
      ssl_session_key: sslResponse.sessionkey

    }

    await orm.create(model, transaction);
    return sslResponse.GatewayPageURL;
  }
}

module.exports = TransactionController;

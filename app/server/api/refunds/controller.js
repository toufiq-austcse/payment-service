const ssl = require('../../core/gateways/ssl');
const config = require('./config');
class RefundController {
  static async create(context, data) {
    let { orm, model, cacheDb } = context;
    let { refundAmount, orderId, refundMarks } = data;
    orm.findByOrderId(model, orderId);
   /*  let refund = {
      refund_amount: data.refundAmount,
      status: config.STATUS.initiated,
      ssl_transaction_id: transactionId,
      ssl_session_key: sslResponse.sessionkey

    }

    await orm.create(model, transaction);
    await cacheDb.push(config.UNVERIFIED_TRANSACTION_LIST, transactionId);
    return sslResponse.GatewayPageURL; */
  }

  /* static async getTransactions(context, query) {
     let { orm, model, cacheDb } = context;
     let { status } = query;
     let ids = [];
     if (status === config.STATUS.initiated) {
       ids = await cacheDb.get(config.UNVERIFIED_TRANSACTION_LIST);
     }
 
     return ids;
   }
   static async update(context, data, query) {
     let { orm, model, cacheDb } = context;
     let { status } = data;
     let { trxId } = query
     await orm.update(model, trxId, { status })
     await await cacheDb.remove(config.UNVERIFIED_TRANSACTION_LIST, trxId);
     return;
 
   }*/
}

module.exports = RefundController;

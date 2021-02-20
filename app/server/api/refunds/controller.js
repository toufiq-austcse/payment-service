const ssl = require('../../core/gateways/ssl');
const config = require('./config');
class RefundController {
  static async create(context, data) {
    let { orm, transactionModel, refundModel, cacheDb } = context;
    let { refundAmount, orderId, refundMarks } = data;
    let transaction = await orm.findByOrderId(transactionModel, orderId);
    if (transaction) {
      let refund = {
        refund_amount: data.refundAmount,
        status: config.STATUS.initiated,
        transaction_id: transaction.id

      }
      await orm.create(refundModel, refund);
    }
    /*  
 
    
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

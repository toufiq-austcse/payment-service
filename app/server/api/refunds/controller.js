const ssl = require('../../core/gateways/ssl');
const config = require('./config');
class RefundController {
  static async create(context, data) {
    let { orm, transactionModel, refundModel, cacheDb } = context;
    let { message, payload } = data;

    if (message === 'CREATE') {
      let { refundAmount, orderId, refundMarks } = payload;
      if (!orderId) {
        throw new Error('OrderId Not Given');
      }

      let transaction = await orm.findByOrderId(transactionModel, orderId);
      if (transaction) {
        let refund = {
          refund_amount: refundAmount,
          status: config.STATUS.initiated,
          transaction_id: transaction.id,
        };
        let newRefund = await orm.create(refundModel, refund);
        let newRefundData = newRefund.dataValues;
        await cacheDb.push(config.UNVERIFIED_REFUND_LIST, newRefundData.id);

        await cacheDb.set(
         '1',"sadi"
        );
        let a = await cacheDb.get('1');
        console.log(a);
      }
    }
  }

  static async getRefunds(context, query) {
    let { orm, model, cacheDb } = context;
    let { status } = query;
    let ids = [];
    if (status === config.STATUS.initiated) {
      ids = await cacheDb.get(config.UNVERIFIED_REFUND_LIST);
    }

    return ids;
  }
  static async update(context, data, query) {
    let { orm, model, cacheDb } = context;
    let { status } = data;
    let { refundId } = query;
    await orm.updateRefund(model, refundId, { status });
    await await cacheDb.remove(config.UNVERIFIED_REFUND_LIST, refundId);
    let order = await cacheDb.get(refundId);

    console.log('order ', order);
    /* if (order) {
      let { orderId, refundAmount } = order;
      let completedMsg = {
        type: 'STATUS',
        data: {
          orderId: orderId,
          refundId: refundId,
          amount: refundAmount,
          status: 'REFUNDED',
          error: '',
        },
      };
      await config.pubInstance.publish(config.REFUNDS_TOPIC_NAME, JSON.stringify(completedMsg));
    } */

    return;
  }
}

module.exports = RefundController;

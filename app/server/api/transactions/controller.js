let  model = require('./model');
class TransactionController {
  static async create(context, data) {
    let { db } = context;
    let createdRes = await db.create(model, data);
    return createdRes;
  }
}

module.exports = TransactionController;

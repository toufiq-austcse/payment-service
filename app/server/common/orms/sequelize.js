const connectors = require('../../core/connectors')

async function create(model, data) {
        let sequelize = await connectors.sequelize.getSeqInstance();

        const createdData = await model(sequelize).create(data)
        return createdData
}
async function update(model, trxId, data) {
        let sequelize = await connectors.sequelize.getSeqInstance();
        await model(sequelize).update(data, {
                where: {
                        ssl_transaction_id: trxId
                }
        })
}

async function findByOrderId(model, orderId) {
        let sequelize = await connectors.sequelize.getSeqInstance();
        return model(sequelize).findOne({ where: { order_id: orderId } });
}
module.exports = {
        create,
        update,
        findByOrderId
}
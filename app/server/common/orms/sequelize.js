const { sequelize } = require('../../core/connectors')

async function create(model, data) {
        let seq = await sequelize();
        const createdData = await model(seq).create(data)
        return createdData
}
module.exports = {
        create
}
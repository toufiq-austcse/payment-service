const sequelizeConnector = require('../../core/connectors')

async function create(model, data) {
        let sequelize = await sequelizeConnector.getSeqInstance();

        const createdData = await model(sequelize).create(data)
        return createdData 
}
module.exports = {
        create
}
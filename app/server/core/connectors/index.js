const sequelize = require('./sequelize');
module.exports = {
        getSeqInstance: sequelize.getSeqInstance,
        connectToMySql: sequelize.connectToMysql
}
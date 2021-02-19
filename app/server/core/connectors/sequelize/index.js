const logger = require('@core/logger');
const { Sequelize } = require('sequelize');

let seqInstance;

async function connectToMysql() {
        const { MYSQL_DB, MYSQL_USER, MYSQL_PASSWORD, MYSQL_HOST } = process.env;
        try {

                seqInstance = new Sequelize(MYSQL_DB, MYSQL_USER, MYSQL_PASSWORD, {
                        host: MYSQL_HOST,
                        dialect: 'mysql'
                });
                await seqInstance.authenticate();
                logger.log('Mysql DB is Connected')

        } catch (error) {
                logger.log('mysql connection failed ', error)
        }

}

async function getSeqInstance() {
        if (!seqInstance) {
                await this.connectToMysql();
        }

        return seqInstance;

}
module.exports = {
        connectToMysql,
        getSeqInstance
};

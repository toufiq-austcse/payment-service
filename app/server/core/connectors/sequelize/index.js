const logger = require('@core/logger');
const { Sequelize } = require('sequelize');

let seqInstance;

async function getInstance() {
        const { MYSQL_DB, MYSQL_USER, MYSQL_PASSWORD, MYSQL_HOST } = process.env;
        try {
                if (!seqInstance) {
                        seqInstance = new Sequelize(MYSQL_DB, MYSQL_USER, MYSQL_PASSWORD, {
                                host: MYSQL_HOST,
                                dialect: 'mysql'
                        });
                        await seqInstance.authenticate();
                        logger.log('Mysql DB is Connected')
                }
        } catch (error) {
                logger.log('mysql connection failed ', error)
        }
        return seqInstance;
}
module.exports = {
        getInstance
};

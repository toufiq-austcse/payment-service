const logger = require('@core/logger');
const { Sequelize } = require('sequelize');
const mysql = require('mysql2');

let seqInstance;

async function connectToMysql() {
  const { MYSQL_DB, MYSQL_USER, MYSQL_PASSWORD, MYSQL_HOST, MYSQL_PORT } = process.env;
  try {
    let connection = mysql.createConnection({
      host: MYSQL_HOST,
      port: MYSQL_PORT,
      user: MYSQL_USER,
      password: MYSQL_PASSWORD,
    });
    if (!connection) {
      throw new Error('Mysql Connection Error');
    }
    logger.log('Mysql DB is Connected');
    let res = await connection.promise().query(`CREATE DATABASE IF NOT EXISTS ${MYSQL_DB};`);
    if (res[0].affectedRows === 1) {
      console.log(`${MYSQL_DB} created`);
    }
    seqInstance = new Sequelize({
      host: MYSQL_HOST,
      port: MYSQL_PORT,
      dialect: 'mysql',
      username: MYSQL_USER,
      password: MYSQL_PASSWORD,
      database: MYSQL_DB,
    });
    await seqInstance.authenticate();
    return seqInstance;
  } catch (error) {
    logger.log('mysql connection failed ', error);
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
  getSeqInstance,
};

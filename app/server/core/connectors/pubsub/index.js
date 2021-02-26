const logger = require('@core/logger');
const redis = require('redis');

let pubInstance;
let subInstance;

async function connectToPubInstance() {
  let { REDIS_HOST, REDIS_PORT } = process.env;
  try {
    if (!pubInstance) {
      pubInstance = redis.createClient({
        host: REDIS_HOST,
        port: REDIS_PORT,
      });
      logger.log('connected to redis pub instance');
    }
  } catch (error) {
    logger.log('Redis pub instance Connection error ', error);
  }
}

async function connectToSubInstance() {
  let { REDIS_HOST, REDIS_PORT } = process.env;
  try {
    if (!subInstance) {
      subInstance = redis.createClient({
        host: REDIS_HOST,
        port: REDIS_PORT,
      });
      logger.log('connected to redis sub instance');
    }
  } catch (error) {
    logger.log('Redis pub instance Connection error ', error);
  }
}

async function getPubInstance() {
  if (!pubInstance) {
    await connectToPubInstance();
  }
  return pubInstance;
}

async function getSubInstance() {
  if (!subInstance) {
    await connectToSubInstance();
  }
  return subInstance;
}
module.exports = {
  connectToPubInstance,
  getPubInstance,
  connectToSubInstance,
  getSubInstance,
};

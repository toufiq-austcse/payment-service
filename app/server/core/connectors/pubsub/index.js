const logger = require('@core/logger');
const redis = require('redis');

let pubInstance;
let subInstance;

async function connectToPubInstance() {
  try {
    if (!pubInstance) {
      pubInstance = redis.createClient();
      logger.log('connected to redis pub instance');
    }
  } catch (error) {
    logger.log('Redis pub instance Connection error ', error);
  }
}

async function connectToSubInstance() {
  try {
    if (!subInstance) {
      subInstance = redis.createClient();
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

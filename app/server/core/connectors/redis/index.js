const logger = require('@core/logger');
const redis = require('redis');

let redisInstance;

async function connectToRedis() {
  try {
    if (!redisInstance) {
      redisInstance = redis.createClient();
      logger.log('redis connected');
    }
  } catch (error) {
    logger.log('Redis Connection error ', error);
  }
}

async function getRedisInstance() {
  if (!redisInstance) {
    await connectToRedis();
  }
  return redisInstance;
}

module.exports = {
  connectToRedis,
  getRedisInstance,
};

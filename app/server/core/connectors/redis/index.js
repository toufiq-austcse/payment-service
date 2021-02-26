const logger = require('@core/logger');
const redis = require('redis');

let redisInstance;

async function connectToRedis() {
  let { REDIS_HOST, REDIS_PORT } = process.env;
  try {
    if (!redisInstance) {
      redisInstance = redis.createClient({
        host: REDIS_HOST,
        port: REDIS_PORT,
      });
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

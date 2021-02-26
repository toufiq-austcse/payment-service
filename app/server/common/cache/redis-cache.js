const connectors = require('../../core/connectors');

async function push(key, data) {
  let redis = await connectors.redis.getRedisInstance();
  return redis.lpush(key, data);
}
async function getFromList(key) {
  let redis = await connectors.redis.getRedisInstance();
  return new Promise((resolve, reject) => {
    redis.lrange(key, 0, -1, (err, res) => {
      if (!err) {
        resolve(res);
      }
      reject(err);
    });
  });
}

async function set(key, data) {
  let redis = await connectors.redis.getRedisInstance();
  return redis.set(key, data);
}

async function get(key) {
  let redis = await connectors.redis.getRedisInstance();
  return new Promise((resolve, reject) => {
    redis.get(key, (err, data) => {
      if (!err) {
        return resolve(data);
      }
      return reject(err);
    });
  });
  return redis.get(key);
}
async function deleteKey(key) {
  let redis = await connectors.redis.getRedisInstance();
  return redis.del(key);
}
async function remove(key, data) {
  let redis = await connectors.redis.getRedisInstance();
  return redis.lrem(key, 0, data);
}

module.exports = {
  push,
  remove,
  set,
  get,
  deleteKey,
  getFromList,
};

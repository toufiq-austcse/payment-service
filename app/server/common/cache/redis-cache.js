const connectors = require('../../core/connectors');

async function push(key, data) {
        let redis = await connectors.redis.getRedisInstance();
        return redis.lpush(key, data);
}
async function get(key) {
        console.log(key);
        let redis = await connectors.redis.getRedisInstance();
        return new Promise((resolve, reject) => {
                redis.lrange(key, 0, -1, (err, res) => {
                        if (!err) {
                                resolve(res);
                        }
                        reject(err);
                })
        });

}

async function remove(key, data) {
        let redis = await connectors.redis.getRedisInstance();
        return redis.lrem(key, 0, data);
}

module.exports = {
        push,
        remove,
        get
}
const logger = require('@core/logger');
const redis = require('redis');

let pubsubInstance;

async function connectToPubsub() {
        try {
                if (!pubsubInstance) {
                        pubsubInstance = redis.createClient();
                        logger.log('redis pubsub connected');
                }
              
        } catch (error) {
                logger.log('Redis pubsub Connection error ', error)
        }


}

async function getPubsubInstance() {
        if (!pubsubInstance) {
                await connectToPubsub();
        }
        return pubsubInstance;
}

module.exports = {
        connectToPubsub,
        getPubsubInstance
}
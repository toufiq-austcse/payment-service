const model = require('./model')

function subscribe(topic, pubsubInstance) {
  pubsubInstance.subscribe(topic);
  pubsubInstance.on('message', (topic, msg) => {
    console.log(topic, msg);
  })

}
module.exports = {
  config: require('./config'),
  route: require('./route'),
  model,
  subscribe
};

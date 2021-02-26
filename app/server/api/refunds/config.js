const config = {
  ENDPOINT: '/refunds', // change this to your base api url
  STATUS: {
    initiated: 'INITIATED',
    completed: 'COMPLETED',
    failed: 'FAILED',
  },
  UNVERIFIED_REFUND_LIST: 'unverified_refunds',
  REFUNDS_TOPIC_NAME: 'refunds',
  pubInstance: null,
  subInstance: null,
};

module.exports = config;

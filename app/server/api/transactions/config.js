const config = {
  ENDPOINT: '/transactions', // change this to your base api url
  STATUS: {
    initiated: 'INITIATED',
    completed: 'COMPLETED',
    failed: 'FAILED'
  },
  UNVERIFIED_TRANSACTION_LIST: 'unverified_transactions'
};

module.exports = config;

const { Sequelize, DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
  const Transaction = sequelize.define('transaction', {
    order_id: {
      type: DataTypes.STRING,
      unique: true,
    },
    amount: {
      type: DataTypes.DECIMAL,
    },
    status: {
      type: DataTypes.STRING,
    },
    bank_transaction_id: {
      type: DataTypes.STRING,
    },
    ssl_transaction_id: {
      type: DataTypes.STRING,
      unique: true,
    },
    ssl_session_key: {
      type: DataTypes.STRING,
    },
  });
  Transaction.sync();
  return Transaction;
};

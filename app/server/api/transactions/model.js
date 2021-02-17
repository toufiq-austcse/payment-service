const { Sequelize, DataTypes, Model } = require('sequelize');



module.exports = (sequelize) => {
        const Transaction = sequelize.define("transaction", {
                order_id: {
                        type: DataTypes.STRING
                },
                amount: {
                        type: DataTypes.DECIMAL
                },
                status: {
                        type: DataTypes.STRING
                },
                bank_transaction_id: {
                        type: DataTypes.STRING
                }
        });
        Transaction.sync();
        return Transaction;
};
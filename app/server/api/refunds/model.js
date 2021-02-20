const { Sequelize, DataTypes, Model } = require('sequelize');
const Transaction = require('../transactions');



module.exports = (sequelize) => {
        const Refund = sequelize.define("refund", {
                refund_amount: {
                        type: DataTypes.DECIMAL
                },
                status: {
                        type: DataTypes.STRING
                },
                transaction_id: {
                        type: DataTypes.INTEGER
                }

        });
        Refund.hasOne(Transaction.model(sequelize), {
                foreignKey: 'transaction_id'
        })
        Refund.sync();
        return Refund;
};
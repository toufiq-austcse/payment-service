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

        });
        Refund.hasOne(Transaction.model,{
                foreignKey: 'transaction_id'
        })
        Refund.sync();
        return Refund;
};
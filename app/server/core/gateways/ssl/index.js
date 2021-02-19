const axios = require('axios');
const FormData = require('form-data');
const shortid = require('shortid');
const SSL_BASE_URL = 'https://sandbox.sslcommerz.com';


async function initiateTransaction(order) {
        const { STORE_ID, STORE_PASSWORD } = process.env;
        let transactionId = shortid.generate();
        let { customer, totalAmount, successUrl, failUrl, cancelUrl, noOfItems } = order;
        let { name, email, address, city, postcode, country, phone } = customer;

        let formData = new FormData();
        formData.append('store_id', STORE_ID);
        formData.append('store_passwd', STORE_PASSWORD);

        formData.append('total_amount', totalAmount);
        formData.append('currency', 'BDT');
        formData.append('tran_id', transactionId);
        formData.append('success_url', successUrl);
        formData.append('fail_url', failUrl);
        formData.append('cancel_url', cancelUrl);
        formData.append('emi_option', 0);

        formData.append('cus_name', name);
        formData.append('cus_email', email);
        formData.append('cus_add1', address);
        formData.append('cus_add2', 'not-Applicable');
        formData.append('cus_city', city);
        formData.append('cus_postcode', postcode);
        formData.append('cus_country', country);
        formData.append('cus_phone', phone);

        formData.append('shipping_method', 'NO');
        formData.append('num_of_item', noOfItems);
        formData.append('product_name', 'test good');
        formData.append('product_category', 'not-Applicable');
        formData.append('product_profile', 'not-Applicable');

        try {
                let sslRes = await axios.post(SSL_BASE_URL + '/gwprocess/v4/api.php', formData, {
                        headers: formData.getHeaders()
                });
                return {
                        sslResponse: sslRes.data,
                        transactionId
                };
        } catch (e) {
                throw new Error(e);
        }


}

async function validateByTrxId(trxId) {
        const { STORE_ID, STORE_PASSWORD } = process.env;
        try {
                let sslRes = await axios.get(SSL_BASE_URL + '/validator/api/merchantTransIDvalidationAPI.php', {
                        params: {
                                tran_id: trxId,
                                store_id: STORE_ID,
                                store_passwd: STORE_PASSWORD
                        }
                })
                return sslRes.data;

        } catch (e) {
                console.log(e.message);
                throw new Error(e);
        }
}

module.exports = {
        initiateTransaction,
        validateByTrxId
}
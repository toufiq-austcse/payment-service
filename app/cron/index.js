let cron = require('node-cron');
let axios = require('axios');
let gateways = require('../server/core/gateways');

const { API_BASE_URL } = process.env;

cron.schedule('* * * * *', async () => {
  await verifyTransaction();
  await verifyRefunds();
});

async function verifyTransaction() {
  let res = await axios.get(`${API_BASE_URL}/api/transactions?status=INITIATED`);
  let { trxIds } = res.data;
  trxIds.forEach(async (trxId) => {
    let res = await gateways.ssl.validateByTrxId(trxId);
    if (res.element[0].status === 'PROCESSING') {
      await axios.patch(`${API_BASE_URL}/api/transactions?trxId=${trxId}`, {
        status: 'COMPLETED',
      });
    }
  });
}

async function verifyRefunds() {
  let res = await axios.get(`${API_BASE_URL}/api/refunds?status=INITIATED`);
  let { refundIds } = res.data;
  refundIds.forEach(async (refundId) => {
    await axios.patch(`${API_BASE_URL}/api/refunds?refundId=${refundId}`, {
      status: 'COMPLETED',
    });
  });
}

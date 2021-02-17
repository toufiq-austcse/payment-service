const express = require('express');
const statusCodes = require('http-status-codes');

// we might need to access all the routing params from parent as well,
// so the better practice is to have mergeParams: true
const router = express.Router({ mergeParams: true });

const TransactionController = require('./controller');

router.post('/one', async (req, res) => {
  res.status(statusCodes.OK).send(await TransactionController.create(req, req.body));
});

module.exports = router;

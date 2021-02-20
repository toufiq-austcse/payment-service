const express = require('express');
const statusCodes = require('http-status-codes');

// we might need to access all the routing params from parent as well,
// so the better practice is to have mergeParams: true
const router = express.Router({ mergeParams: true });

const RefundController = require('./controller');


router.get('', async (req, res) => {
  /* try {
    let trxIds = await RefundController.getTransactions(req, req.query);
    res.status(statusCodes.OK).send({ trxIds })
  } catch (e) {
    console.log(e);
    res.status(statusCodes.INTERNAL_SERVER_ERROR).send({
      message: e.message
    })
  }
 */
});
router.patch('', async (req, res) => {
  /* try {
    await RefundController.update(req, req.body, req.query);
    res.status(statusCodes.OK).send({})
  } catch (e) {
    console.log(e);
    res.status(statusCodes.INTERNAL_SERVER_ERROR).send({
      message: e.message
    })
  } */

});
module.exports = router;

const express = require('express');
const router = express.Router();
const modelProvider = require('../common/middlewares/model-provider');
const connectors = require('../core/connectors');

// Any new resource api should imported here and then registered to
// router with proper api endpoint prefix (e.g /user user.route, /items items.route etc.)
//
// Do not remove the /** --route:import-- */ placeholder, if you use the cli to generate
// api resources, this works as placeholder to inject new route file requires.
//
// If you add a require manually, add it above the /** --route:import-- */ line.
const transactions = require('./transactions');
const refunds = require('./refunds');
/** --route:import-- */

// Do not remove the /** --route-- */ placeholder, if you use the cli to generate
// api resources, this works as placeholder to inject new routes.
//
// If you add a require manually, add it above the /** --route-- */ line.
router.use(transactions.config.ENDPOINT, modelProvider.includeModel(transactions.model), transactions.route);
router.use(refunds.config.ENDPOINT, modelProvider.includeModel(refunds.model), refunds.route);
/** --route-- */
(async () => {
        let redisPubsub = await connectors.pubsub.getPubsubInstance()
        refunds.subscribe(refunds.config.REFUNDS_TOPIC_NAME, redisPubsub);
})();

module.exports = router;

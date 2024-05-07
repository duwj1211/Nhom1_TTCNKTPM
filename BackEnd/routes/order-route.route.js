const express = require('express');
const router = express.Router();
const {
    create_payment,
    get_order_information,
    cancel_payment,
} = require('../controllers/order-controller');

router.post('/create',create_payment);
router.get('/order-information/:orderId',get_order_information);
router.post('/cancel-payment/:orderId',cancel_payment);

module.exports = router
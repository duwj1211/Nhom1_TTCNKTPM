const express = require('express');
const router = express.Router();
const {
    create_payment,
    get_order_information
} = require('../controllers/order-controller');

router.post('/create',create_payment);
router.get('/order-information/:orderId');

module.exports = router
const express = require('express');
const router = express.Router();
const Order = require('../controllers/order.controller');

router.post('/add', Order.addToOrder);
router.get('/user/:userId/get', Order.getOrder);

module.exports = router;

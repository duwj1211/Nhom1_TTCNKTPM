const express = require('express');
const router = express.Router();
const Order = require('../controllers/order.controller');
const { verifyToken } = require('../middleware/authJwt');

router.post('/add',verifyToken, Order.addToOrder);
router.get('/get/user',verifyToken, Order.getOrder);
router.post('/set-status/:orderId/:status',verifyToken, Order.setStatus);
router.get('/get/getorderbyid/:orderId',verifyToken, Order.getOrderById);

module.exports = router;

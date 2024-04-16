const express = require('express');
const router = express.Router();
const Cart = require('../controllers/cart.controller');

router.post('/add', Cart.addToCart);
router.get('/user/:id', Cart.getCart);

module.exports = router;
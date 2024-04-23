const express = require('express');
const router = express.Router();
const Cart = require('../controllers/cart.controller');

router.post('/add', Cart.addToCart);
router.get('/user/:usertId', Cart.getCart);
router.delete('/delete/:userId/:cartItemId', Cart.deleteFromCart);
router.post('/updateQuantity', Cart.updateQuantityOfCartItem);

module.exports = router;
const express = require('express');
const router = express.Router();
const Cart = require('../controllers/cart.controller');
const { verifyToken } = require('../middleware/authJwt');

router.post('/add',verifyToken, Cart.addToCart);
router.get('/user',verifyToken, Cart.getCart);
router.delete('/delete/:cartItemId',verifyToken, Cart.deleteFromCart);
router.post('/updateQuantity/:cartItemId/:quantity',verifyToken, Cart.updateQuantityOfCartItem);
router.post('/cartItems',verifyToken, Cart.getCartByBookIds)

module.exports = router;
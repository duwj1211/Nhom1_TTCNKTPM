const CartItem = require('../models/cartItem.model');
const Cart = require('../models/cart.model');
const User = require('../models/user.model');
const Book = require('../models/book.model');
const { populate } = require('dotenv');
const { json } = require('express');
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config")


const addToCart = async(req, res) => {
    try {
        if(req.user.userId){
            const {bookId, quantity } = req.body;

            let cart = await Cart.findOne({ user: req.user.userId });
            if (!cart) {
                cart = new Cart({ user: req.user.userId, items: [], totalPriceOriginal: 0, totalPriceFinal: 0 });
            }

            const book = await Book.findOne({ _id: bookId });
            if (!book) {
                return res.status(404).json({ message: "Sách không tồn tại" });
            }
        
            let existingItem = null;
            for(const item of cart.items){
                const cartItem = await CartItem.findById(item._id).populate('book');
                if (cartItem && cartItem.book._id.equals(bookId)) {
                    existingItem = cartItem;
                    break;
                }
            }
            if (existingItem) {
                if (existingItem.quantity + quantity > book.quantity) {
                    existingItem.quantity = book.quantity; // Gán số lượng của existingItem bằng số lượng sách có sẵn trong book
                } else {
                    existingItem.quantity += quantity; 
                } 
                await existingItem.save();
            } else {
                const newCartItem = new CartItem({ book: bookId, quantity });
                await newCartItem.save();
            cart.items.push(newCartItem);
            }
        
            cart.totalPriceFinal += (quantity * book.priceFinal);
            cart.totalPriceOriginal += (quantity * book.priceOriginal);

            await cart.save();

            res.status(200).json({ message: 'Sản phẩm đã được thêm vào giỏ hàng thành công' });
        }else{
            return res.status(401).json({message: "Không tìm thấy thông tin người dùng"});
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteFromCart = async(req , res) =>{
    try{
        if(req.user.userId){
            const {cartItemId} = req.params;      

            const cart = await Cart.findOne({user : req.user.userId}).populate({
                path: 'items',
                populate: {
                    path: 'book'
                }
            });
        
            const cartItem = await CartItem.findOne({_id: cartItemId});
            if(!cartItem){
                return res.status(404).json({message: 'Không có sản phẩm này trong giỏ hàng'});
            }
            await CartItem.findOneAndDelete({ _id: cartItemId });
            for (let i = 0; i < cart.items.length; i++) {
                const item = cart.items[i];
                if (item && item._id.equals(cartItemId)) {
                    cart.totalPriceOriginal -= (item.book.priceOriginal * item.quantity);
                    cart.totalPriceFinal -= (item.book.priceFinal * item.quantity);
                    cart.items.splice(i, 1);
                    break;
                }
            }        
            await cart.save();
            res.status(200).json({ message: 'Xóa sản phẩm khỏi giỏ hàng thành công' });
        }else{
            return res.status(401).json({message: "Không tìm thấy thông tin người dùng"});
        }
    }catch(error){
        res.status(500).json({ message: error.message });
    }
}

const updateQuantityOfCartItem = async (req, res) => {
    try {
        if(req.user.userId){
            const {cartItemId, quantity } = req.params;
        
            const updateQuantity = quantity || 1;
            const cart = await Cart.findOne({ user: req.user.userId }).populate({
                path: 'items',
                populate: {
                    path: 'book'
                }
            });
            if (!cart) {
                return res.status(404).json({ message: 'Không tìm thấy giỏ hàng cho người dùng này' });
            }

            const cartItem = await CartItem.findOne({_id : cartItemId});
            if (!cartItem) {
                return res.status(404).json({ message: `Không tìm thấy mục hàng với ID ${cartItemId}`});
            }

            if (quantity <= 0) {
                return res.status(400).json({ message: 'Số lượng sản phẩm phải lớn hơn 0' });
            }

            cartItem.quantity = updateQuantity;
            await cartItem.save();

            cart.items.forEach(item => {
                if (item._id.equals(cartItemId)) {
                    item.quantity = updateQuantity;
                }
            });

            let totalPriceOriginal = 0;
            let totalPriceFinal = 0;

            for (const item of cart.items) {
                totalPriceOriginal += item.quantity * item.book.priceOriginal;
                totalPriceFinal += item.quantity * item.book.priceFinal;
            }

            cart.totalPriceOriginal = totalPriceOriginal;
            cart.totalPriceFinal = totalPriceFinal;
        
            await cart.save();

            res.status(200).json({ message: 'Số lượng sản phẩm đã được cập nhật thành công' });
        }else{
            return res.status(401).json({message: "Không tìm thấy thông tin người dùng"});
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getCart = async(req, res) => {
    try {
        if(req.user.userId){
            const cart = await Cart.findOne({ user: req.user.userId }).populate({
                path: 'items',
                populate: {
                path: 'book'
                }
            });
            if (!cart) {
                return res.status(404).json({ message: 'Không tìm thấy giỏ hàng cho người dùng này' });
            }
            return res.status(200).json({ cart });
        }else{
            return res.status(401).json({message: "Không tìm thấy thông tin người dùng"});
        }      
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//User chưa đăng nhập
const getCartByBookIds = async(req, res) => {
    try {
        const cartItems = req.body;
        const cart = {
            items: [],
            totalPriceFinal: 0,
            totalPriceOriginal: 0,
            user: null
        };
        if (cartItems && cartItems.length > 0) {
            for (let item of cartItems) {
                const book = await Book
                    .findOne({_id: item._id})
                    .select('_id slug fullName avatar priceOriginal priceFinal');
                if (book) {
                    cart.items.push({
                        book,
                        quantity: item.quantity
                    });
                    cart.totalPriceOriginal += book.priceOriginal * item.quantity;
                    cart.totalPriceFinal += book.priceFinal * item.quantity;
                }
            }
            res.status(200).json({cart});
        } else {
            res.status(200).json({ cart: [] });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    deleteFromCart,
    addToCart,
    updateQuantityOfCartItem,
    getCart,
    getCartByBookIds
}
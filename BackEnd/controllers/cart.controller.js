const CartItem = require('../models/cartItem.model');
const Cart = require('../models/cart.model');
const User = require('../models/user.model');
const Book = require('../models/book.model');

const addToCart = async(req, res) => {
    try {
        const { userId, bookId, quantity } = req.body;

        const user = await User.findOne({ _id: userId });
        if (!user) {
            return res.status(404).json({ message: "Người dùng không tồn tại" });
        }

        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            cart = new Cart({ user: user._id, items: [], totalPriceOriginal: 0, totalPriceFinal: 0 });
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
            existingItem.quantity += quantity; 
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
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getCart = async(req, res) => {
    try {
        const userId = req.params.userId;

        // Tìm giỏ hàng của người dùng và populate các mục hàng
        const cart = await Cart.findOne({ user: userId }).populate('items');
        if (!cart) {
            return res.status(404).json({ message: 'Không tìm thấy giỏ hàng cho người dùng này' });
        }

        res.status(200).json({ cart });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    addToCart,
    getCart
}

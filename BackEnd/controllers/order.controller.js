const OrderItem = require('../models/orderItem.model');
const Book = require('../models/book.model');
const Cart = require('../models/cart.model');
const CartItem = require('../models/cartItem.model');
const User = require('../models/user.model');
const { populate } = require('dotenv');
const Order = require('../models/order.model');


const addToOrder = async(req , res) =>{
    try{
        const {userId} = req.body;
        const user = await User.findOne({_id: userId});
        if(!user){
            return res.status(404).json("Could not find user");
        }
        const cart = await Cart.findOne({user : userId}).populate({
            path: 'items',
            populate: {
                path: 'book'
            }
        });
        if(!cart){
            return res.status(404).json("Cuold not find cart");
        }
        const order = new Order({
            user: userId,
            fullName: null,
            items:[],
            totalPriceOriginal: 0,
            totalPriceFinal: 0,
            status: 0,
            shippingAddress: "Ha Noi",
            shippingFee: 0,
            totalPrice: 0,
            note: null
        })
        for(const cItem of cart.items){
            const orderItem = new OrderItem({
                book: cItem.book,
                priceOriginal: cItem.book.priceOriginal,
                priceFinal: cItem.book.priceFinal,
                quantity: cItem.quantity,
            })
            await orderItem.save();
            order.items.push(orderItem);
        }
        order.totalPriceOriginal = cart.totalPriceOriginal;
        order.totalPriceFinal = cart.totalPriceFinal
        order.totalPrice = order.totalPriceOriginal + order.totalPriceFinal + order.shippingFee;
        await order.save();

        for(const cItem of cart.items){
            await CartItem.findOneAndDelete({ _id: cItem._id });
        }
        await Cart.findOneAndUpdate(
            { _id: cart._id },
            { $set: { items: [], totalPriceOriginal: 0, totalPriceFinal: 0 } },
            { new: true }
        );

        return res.status(200).json({ message: 'Sản phẩm đặt hàng thành công!' });
    }catch(error){
        return res.status(500).json({ message: error.message });
    }
}

const getOrder = async (req, res) => {
    try{
        const userId = req.params.userId;
        const order = await Order.findOne({ user: userId }).populate({
            path: 'items',
            populate: {
                path: 'book'
            }
        });
        if (!order) {
            return res.status(404).json({ message: "Could not find Order" });
        }
        res.status(200).json({order});
    }catch(error){
        return res.status(500).json({message: error.message});
    }
}
module.exports = {
    addToOrder,
    getOrder
}
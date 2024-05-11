const OrderItem = require('../models/orderItem.model');
const Book = require('../models/book.model');
const Cart = require('../models/cart.model');
const CartItem = require('../models/cartItem.model');
const User = require('../models/user.model');
const { populate } = require('dotenv');
const Order = require('../models/order.model');


const addToOrder = async(req , res) =>{
    try{
        if(req.user.userId){
            const cart = await Cart.findOne({user : req.user.userId}).populate({
                path: 'items',
                populate: {
                    path: 'book'
                }
            });
            if(!cart){
                return res.status(404).json("Could not find cart");
            }
            const order = new Order({
                user: req.user.userId,
                fullName: null,
                items:[],
                totalPriceOriginal: 0,
                totalPriceFinal: 0,
                status: -1,
                shippingAddress: req.body.shippingAddress,
                shippingFee: 0,
                totalPrice: 0,
                note: null,
                orderCode: req.body.orderCode,
                link_payment: req.body.link_payment,
                banking: req.body.banking,
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
            order.totalPrice = order.totalPriceFinal + order.shippingFee;
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
        }else{
            return res.status(401).json({message: "Không tìm thấy thông tin người dùng"});
        }
    }catch(error){
        return res.status(500).json({ message: error.message });
    }
}
const setStatus = async (req, res) => {
    try{
        if(req.user.userId){
            const { orderId, status } = req.params;
            const order = await Order.findOne({_id: orderId});
            if(!order){
                return res.status(404).json({ message: "Could not find Order" });
            }
            order.status = status;
            await order.save();
            return res.status(200).json({ message: "Status updated successfully" });
        }
    }catch(error){
        return res.status(500).json({message: error.message});
    }
}
const getOrderById = async (req, res) => {
    try{
        if(req.user.userId){
            const {orderId} = req.params;
            const order = await Order.findOne({ _id: orderId }).populate({
                path: 'items',
                populate: {
                    path: 'book'
                }
            });
            if (!order) {
                return res.status(404).json({ message: "Could not find Order" });
            }
            res.status(200).json({ order });
        }else{
            return res.status(401).json({message: "Không tìm thấy thông tin người dùng"});
        }  
    }catch(error){
        return res.status(500).json({message: error.message});
    }
}
const getOrder = async (req, res) => {
    try{
        if(req.user.userId){
            const order = await Order.find({ user: req.user.userId }).populate({
                path: 'items',
                populate: {
                    path: 'book'
                }
            });
            if (!order) {
                return res.status(404).json({ message: "Could not find Order" });
            }
            res.status(200).json({ order });
        }else{
            return res.status(401).json({message: "Không tìm thấy thông tin người dùng"});
        }
    }catch(error){
        return res.status(500).json({message: error.message});
    }
}
module.exports = {
    addToOrder,
    getOrder,
    setStatus,
    getOrderById,
}
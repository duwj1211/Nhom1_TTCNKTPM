const OrderItem = require('../models/orderItem.model');
const Book = require('../models/book.model');
const Cart = require('../models/cart.model');
const User = require('../models/user.model');
const { populate } = require('dotenv');
const Order = require('../models/order.model');


const addToOrder = async(req , res) =>{
    try{
        const {userId} = req.body;
        const user = await User.findOne({_id: userId});
        if(!user){
            return res.status(404).json("Cuold not find user");
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
            items:[],
            totalPriceOriginal: 0,
            totalPriceFinal: 0,
            status: 0,
            shippingAddress: 0,
            shippingFee: 0,
            totalPrice: 0,
            note: null

        })
        for(const cItem of cart.items){
            const orderItem = new OrderItem({
                book: cItem.book,
                priceOriginal: cItem.book.priceOriginal,
                prictFinal: cItem.book.prictFinal,
                quantity: cItem.quantity,
            })
            await orderItem.save();
            order.items.push(orderItem);
        }
        for(const item of order.items){
            order.totalPriceOriginal += item.book.priceOriginal*item.quantity;
            order.totalPriceFinal += item.book.prictFinal*item.quantity;    
        }
        order.totalPrice = order.totalPriceOriginal + order.totalPriceFinal + order,shippingAddress + shippingFee;
        await order.save();
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
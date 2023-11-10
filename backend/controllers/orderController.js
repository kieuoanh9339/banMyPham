const Cart = require('../models/cartModel');
const Order = require('../models/orderModel');
const Product = require('../models/productModel');

module.exports = {

    get: async (req, res) => {
        try {
            const orders = await Order.find()
                .populate("cart")
                .populate("user");

            res.status(200).json({ msg: "Gel all orders successfully!", data: orders });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    getByUser: async (req, res) => {
        try {
            const userId = req.user.id;
            const orders = await Order.find({user: userId}).populate("cart").populate("user");

            res.status(200).json({ msg: "Get order by customer", data: orders });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    getById: async (req, res) => {
        try {
            const order = await Order.findById(req.params.id).populate("cart")
                .populate("user");
            res.status(200).json({ msg: "Get order successfully", data: order });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    create: async (req, res) => {
        try {
            const userId = req.body.userId;
            const cartId = req.body.cartId;
            const process= req.body
            const newOrder = await Order.create({ process: process, user: userId, cart: cartId })
            console.log(newOrder);
            const order = await Order.findById(newOrder._id).populate("cart").populate("user");
            res.status(200).json({ msg: "Create order successfully!", data: order });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    update: async (req, res) => {
        try {
            const status = req.body.status;
            await Order.findByIdAndUpdate(req.params.id, {status: status});
            const order = await Order.findById(req.params.id).populate("cart")
                .populate("user");
            res.status(200).json({ msg: "Update order successfully!", data: order });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    delete: async (req, res) => {
        try {
            await Order.findByIdAndDelete(req.params.id);
            res.status(200).json({ msg: "Delete order successfully!", data: req.params.id });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

}


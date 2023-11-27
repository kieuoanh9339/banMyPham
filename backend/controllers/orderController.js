const Cart = require('../models/cartModel');
const Order = require('../models/orderModel');
const Product = require('../models/productModel');

const selectProduct = {
    product_name: 1,
    price: 1,
    images: 1,
    inventory: 1,
    category: 1
}

module.exports = {

    get: async (req, res) => {
        const status = req.query.status;
        try {
            let orders;
            if (status) {
                const listStatus = status.split(",");
                orders = Order.find({
                    status: {
                        "$in": listStatus
                    }
                });
            } else {
                orders = Order.find()
            }
            orders = await orders
                .populate({
                    path: 'cart',
                    populate: {
                        path: "items",
                        model: [Product],
                        populate: {
                            path: "product",
                            model: Product,
                            select: selectProduct
                        }

                    }
                })
                .populate("user");
            res.status(200).json({ msg: "Gel all orders successfully!", data: orders })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    getByUser: async (req, res) => {
        try {
            const userId = req.user.id;
            const orders = await Order.find({ user: userId })
                .populate({
                    path: 'cart',
                    populate: {
                        path: "items",
                        model: [Product],
                        populate: {
                            path: "product",
                            model: Product,
                            select: selectProduct
                        }

                    }
                })
                .populate("user")

            res.status(200).json({ msg: "Get order by customer", data: orders })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    getById: async (req, res) => {
        try {
            const order = await Order.findById(req.params.id)
                .populate({
                    path: 'cart',
                    populate: {
                        path: "items",
                        model: [Product],
                        populate: {
                            path: "product",
                            model: Product,
                            select: selectProduct
                        }

                    }
                })
                .populate("user");
            res.status(200).json({ msg: "Get order successfully", data: order })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    create: async (req, res) => {
        try {
            const userId = req.body.userId
            const cartId = req.body.cartId
            const process = req.body.process
            const newOrder = await Order.create({ process: process, user: userId, cart: cartId })
            // console.log(newOrder);
            const order = await Order.findById(newOrder._id)
                .populate({
                    path: 'cart',
                    populate: {
                        path: "items",
                        model: [Product],
                        populate: {
                            path: "product",
                            model: Product,
                            select: selectProduct
                        }

                    }
                })
                .populate("user");
            res.status(200).json({ msg: "Create order successfully!", data: order });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    update: async (req, res) => {
        try {
            const status = req.body.status;
            await Order.findByIdAndUpdate(req.params.id, { status: status })
            const order = await Order.findById(req.params.id).populate("cart")
                .populate("user");
            console.log(order);
            res.status(200).json({ msg: "Update order successfully!", data: order })
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    delete: async (req, res) => {
        try {
            await Order.findByIdAndDelete(req.params.id);
            res.status(200).json({ msg: "Delete order successfully!", data: req.params.id })
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    statisticRevenue: async (req, res) => {
        try {
            const { date } = req.query;
            const startOfDay = new Date(date)
            startOfDay.setHours(0, 0, 0, 0)

            const endOfDay = new Date(date)
            endOfDay.setHours(23, 59, 59, 999)
            const orders = await Order.find({ 
                createdAt: {
                    $gte: startOfDay,
                    $lt: endOfDay
                  }
            }).populate({
                path: 'cart',
                populate: {
                    path: "items",
                    model: [Product],
                    populate: {
                        path: "product",
                        model: Product,
                        select: selectProduct
                    }

                }
            })

            let totalAmount = 0;
            for (let order of orders) {
                totalAmount += order.cart.totalPrice;
            }
            res.status(200).json({ msg: "Successfully!", data: { "orders": orders, "totalAmount": totalAmount } })
        } catch (err) {
            console.error(err);
            return res.status(500).json({ msg: err.message });
        }
    }

}


const Cart = require('../models/cartModel');
const Product = require('../models/productModel');

const selectProduct = {
    product_name: 1,
    price: 1,
    images: 1,
    inventory: 1,
    category: 1
}

module.exports = {

    addToCart: async (req, res) => {
        try {
            const userId = req.user.id;

            let activeCart = await Cart.findOne({ $and: [{ userId: userId }, { status: "active" }] });

            const { quantity } = req.body;
            const _product = await Product.findById(req.body.product);

            if (activeCart) {
                const index = activeCart.items.findIndex((e) => e.product == req.body.product);

                if (index != -1) {
                    if (_product.inventory >= activeCart.items[index].amount + quantity) {
                        activeCart.items[index].amount += quantity;
                    } else {
                        const tmp = _product.inventory - activeCart.items[index].amount
                        return res.status(400).json({ msg: `Number of products that can be added: ` + tmp });
                    }

                } else {
                    if (_product.inventory < quantity) {
                        return res.status(400).json({ msg: `Not enough product` });
                    }
                    activeCart.items.push({ product: req.body.product, amount: quantity })
                }
                activeCart.totalPrice += _product.price * quantity
                await activeCart.save();
            } else {
                if (_product.inventory < quantity) {
                    return res.status(400).json({ msg: `Not enough product` });
                }
                const cart = { userId: userId, status: "active", items: [{ product: req.body.product, amount: quantity }], totalPrice: _product.price * quantity };
                
                activeCart = await Cart.create(cart);
            }

            res.status(200).json({
                status: "success",
                cart: activeCart
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    getActiveCart: async (req, res) => {
        try {
            const userId = req.user.id;
            let activeCart = await Cart.findOne({ $and: [{ userId: userId }, { status: "active" }] })
                .populate({ path: "items", populate: { path: "product", select: selectProduct } });
            if (!activeCart) {
                const cart = { userId: userId, status: "active", items: [], totalPrice: 0 };
                activeCart = await Cart.create(cart);
            }
            res.status(200).json({
                status: "success",
                cart: activeCart,
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getCartByID: async (req, res) => {
        try {
            const cartId = req.params.id;
            let cart = await Cart.findById(cartId)
                .populate({ path: "items", populate: { path: "product", select: selectProduct } });
            
            res.status(200).json({
                status: "success",
                cart: cart,
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    patchProductQuantity: async (req, res) => {
        try {
            const { product, quantity } = req.body;
            const userId = req.user.id;
            const activeCart = await Cart.findOne({ $and: [{ userId: userId }, { status: "active" }] });
            const index = activeCart.items.findIndex((e) => e.product == product);
            const _product = await Product.findById(product);
            if (_product.inventory < quantity) {
                return res.status(400).json({ msg: "Not enough product" });
            }

            if (index != -1) {

                if (quantity === 0) {

                    const currentAmount = activeCart.items[index].amount;
                    activeCart.totalPrice -= currentAmount * _product.price;
                    activeCart.items.splice(index, 1)
                } else {
                    const currentAmount = activeCart.items[index].amount;
                    activeCart.totalPrice += (quantity - currentAmount) * _product.price;
                    activeCart.items[index].amount = quantity;
                }
            } else {
                activeCart.totalPrice += quantity * _product.price;
                activeCart.items.push({ product: req.body.product, amount: quantity })
            }

            await activeCart.save();
            res.status(200).json({
                status: "success",
                cart: activeCart,
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }

    },

    checkoutCart: async (req, res) => {
        try {
            const cartId = req.params.id;
            const activeCart = await Cart.findById(cartId);
            activeCart.status = "checkouted";
            await activeCart.save()
            for (item of activeCart.items) {
                const product = await Product.findById(item.product);
                product.sold += item.amount;
                product.inventory -= item.amount;
                await product.save();
            }
            res.status(200).json({
                status: "success",
                cart: activeCart,
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    deleteItemProductInCart: async (req, res) => {
        try {
            const product = req.params.id;
            // console.log(req)
            const userId = req.user.id;
            const activeCart = await Cart.findOne({ $and: [{ userId: userId }, { status: "active" }] });
            const index = activeCart.items.findIndex((e) => e.product == product);
            const _product = await Product.findById(product);
            if (index != -1) {
                const currentAmount = activeCart.items[index].amount;
                activeCart.totalPrice -= currentAmount * _product.price;
                activeCart.items.splice(index, 1)
                res.status(200).json({
                    status: "success",
                    cart: activeCart,
                });
                await activeCart.save();
            } else {
                res.status(400).json({
                    status: "error",
                    msg:"Product not found"
                });

            }
            
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}


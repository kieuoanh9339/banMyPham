const router  = require("express").Router()
const cartCtrl = require("../controllers/cartController")
const auth = require('../middlewares/auth')
const authAdmin= require('../middlewares/authAdmin')

router.route('')
.get(auth, cartCtrl.getActiveCart)
.post(auth, cartCtrl.addToCart)
.patch(auth, cartCtrl.patchProductQuantity)

// router.route('/cartId')
// .get(auth, cartCtrl.getCartByID)

router.route('/:id/checkout')
.get(auth, cartCtrl.checkoutCart)

router.route('/:id')
.delete(auth, cartCtrl.deleteItemProductInCart)
.get(auth, cartCtrl.getCartByID)

module.exports = router;
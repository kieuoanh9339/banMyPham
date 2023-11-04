const router  = require("express").Router()
const cartCtrl = require("../controllers/cartController")
const auth = require('../middlewares/auth')
const authAdmin= require('../middlewares/authAdmin')

router.route('')
.get(auth, cartCtrl.getActiveCart)
.post(auth, cartCtrl.addToCart)
.patch(auth, cartCtrl.patchProductQuantity)

router.route('/:id/checkout')
.get(auth, cartCtrl.checkoutCart)
router.route('/:id')
.delete(auth, cartCtrl.deleteItemProductInCart)
module.exports = router;
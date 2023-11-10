const router  = require("express").Router()
const productCtrl = require("../controllers/productController")
const ProductCtrl= require('../controllers/productController')
const auth = require('../middlewares/auth')
const authAdmin= require('../middlewares/authAdmin')

router.route('/product')
.get(productCtrl.getAll)
.post(auth,authAdmin,productCtrl.createProduct)

router.route('/product/:id')
.delete(auth,authAdmin,productCtrl.deleteProduct)
.put(auth,authAdmin,productCtrl.updateProduct)

module.exports = router;
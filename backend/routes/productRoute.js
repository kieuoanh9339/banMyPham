const router  = require("express").Router()
const productCtrl = require("../controllers/productController")
const ProductCtrl= require('../controllers/productController')
const auth = require('../middlewares/auth')
const authAdmin= require('../middlewares/authAdmin')

router.route('/product')
.get(productCtrl.getAll)
.post(productCtrl.createProduct)

router.route('/product/:id')
.delete(productCtrl.deleteProduct)
.put(productCtrl.updateProduct)

module.exports = router;
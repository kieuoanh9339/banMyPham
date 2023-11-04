const router  = require("express").Router()
const CategoryCtrl= require('../controllers/categoryController')
const auth = require('../middlewares/auth')
const authAdmin= require('../middlewares/authAdmin')

router.route('/category')
.get(CategoryCtrl.getCategories)
.post(auth,authAdmin,CategoryCtrl.createCategory)

router.route('/category/:id')
.delete(auth,authAdmin,CategoryCtrl.deleteCategory)
.put(auth,authAdmin,CategoryCtrl.updateCategory)
module.exports= router
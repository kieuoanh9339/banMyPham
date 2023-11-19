const router  = require("express").Router()
const blogCtrl= require('../controllers/blogController')
const auth = require('../middlewares/auth')
const authAdmin= require('../middlewares/authAdmin')

router.route('/blog')
.post(auth,authAdmin,blogCtrl.createBlog)
.get(blogCtrl.getAll)

router.route('/blog/:id')
.delete(auth,authAdmin,blogCtrl.deleteBlog)
.put(auth,authAdmin,blogCtrl.updateBlog)
.get(blogCtrl.getById)
module.exports= router
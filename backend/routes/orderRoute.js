const router  = require("express").Router()
const orderCtrl = require("../controllers/orderController")
const auth = require('../middlewares/auth')
const authAdmin= require('../middlewares/authAdmin')

router.route("")
.get(orderCtrl.get)
.post(auth, orderCtrl.create);

router.route("/:id")
.get(auth, orderCtrl.getById)
.put(auth, orderCtrl.update)
.delete(auth, orderCtrl.delete);

router.get("/user", auth, orderCtrl.getByUser);

module.exports = router;
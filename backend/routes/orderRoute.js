const router  = require("express").Router()
const orderCtrl = require("../controllers/orderController")
const auth = require('../middlewares/auth')
const authAdmin= require('../middlewares/authAdmin')

router.route("")
.get(auth, authAdmin,orderCtrl.get)
.post(auth, orderCtrl.create);

router.get("/getOrder", auth, orderCtrl.getByUser);

router.route("/:id")
.get(auth, orderCtrl.getById)
.put(auth, orderCtrl.update)
.delete(auth, orderCtrl.delete);

router.route("/statistic/revenue")
.get(auth, orderCtrl.statisticRevenue);


module.exports = router;
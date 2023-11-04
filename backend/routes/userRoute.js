const router  = require("express").Router();
const UserCtrl= require('../controllers/userController')
const orderCtrl = require("../controllers/orderController")
const auth = require('../middlewares/auth')

router.post('/register', UserCtrl.register)
router.get('/refresh_token', UserCtrl.refreshToken)
router.post('/login', UserCtrl.login)
router.get('/logout', UserCtrl.logout)
router.get('/infor',auth, UserCtrl.getUser)
router.put('/updateUser',auth, UserCtrl.updateUser)
// router.put('/updatePassword',auth, UserCtrl.updatePassword)
router.get('/orders', auth, orderCtrl.getByUser);


module.exports= router
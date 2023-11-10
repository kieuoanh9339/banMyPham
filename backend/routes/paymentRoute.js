const router  = require("express").Router()
const paymentController = require('../controllers/paymentController')


router.post('/create_payment_url', paymentController.createPayment)
router.get('/vnpay_return', paymentController.vnpReturn)
router.get('/vnpay_ipn', paymentController.vnpIPN)

module.exports = router
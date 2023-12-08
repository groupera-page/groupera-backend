const router = require('express').Router()
const paymentControllers = require('../controllers/paymentControllers')

router.post('/checkout', paymentControllers.checkout)

router.post('/success', paymentControllers.successfulCheckout)

// router.post('/webhook', paymentControllers.webhook);

module.exports = router

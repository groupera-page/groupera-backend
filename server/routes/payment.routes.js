const router = require("express").Router();
const paymentControllers = require("../controllers/paymentControllers");

router.post("/:userId/checkout", paymentControllers.checkout);

router.post('/:userId/success', paymentControllers.successfulCheckout);

// router.post('/webhook', paymentControllers.webhook);

module.exports = router;



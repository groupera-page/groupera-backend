const router = require("express").Router();
const paymentControllers = require("../controllers/paymentControllers");

router.post("/checkout/:id", paymentControllers.checkout);

router.post('/success/:id', paymentControllers.successfulCheckout);

// router.post('/webhook', paymentControllers.webhook);

module.exports = router;



const router = require("express").Router();
const paymentControllers = require("../controllers/paymentControllers");

router.post('/payment', paymentControllers.payment)

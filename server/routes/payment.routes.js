const router = require("express").Router();
const paymentControllers = require("../controllers/paymentControllers");

router.post('/payment/:id', paymentControllers.payment)

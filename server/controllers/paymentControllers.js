const { User } = require("../models/User.model");
const stripe = require("stripe")(process.env.STRIPE_SECRET)

exports.payment = async (req, res, next) => {
    const { amount, paymentId } = req.body;

    try {
        const payment = await stripe.paymentIntents.create({
            amount,
            currency: "EUR",
            description: "Groupera",
            payment_method: paymentId,
            confirm: true
        })
          await User.updateOne({ _id: req.params.id }, { paid: true })
        res.json({
            message: "Payment successful",
            success: true
        })
    } catch (error) {
        res.status(500).send({ message: `${error}` });
    }
}
const { User } = require('../models/User.model')
const myCustomError = require('../utils/myCustomError')
const stripe = require('stripe')(process.env.STRIPE_SECRET)

const createStripeSession = async (planId) => {
	try {
		return await stripe.checkout.sessions.create({
			mode: 'subscription',
			payment_method_types: ['card'],
			line_items: [
				{
					price: planId,
					quantity: 1,
				},
			],
			success_url: `${process.env.FRONTEND_BASE_URL}/payment/success`,
			cancel_url: `${process.env.FRONTEND_BASE_URL}/payment/cancel`,
		})
	} catch (error) {
		return error
	}
}

exports.checkout = async (req, res, next) => {
	const { userId } = req
	const planId = 'price_1O2wEdLSfyDnhMxYbBjqiOXF'

	try {
		const session = await createStripeSession(planId)
		const user = await User.findOne({ _id: userId })

		user.paymentSubscription = {
			sessionId: session.id,
		}

		await user.save()

		res.send(session)
	} catch (error) {
		next(error)
	}
}

exports.successfulCheckout = async (req, res, next) => {
	const {
		body: { sessionId },
		userId,
	} = req

	try {
		const session = await stripe.checkout.sessions.retrieve(sessionId)

		if (session.payment_status !== 'paid')
			throw myCustomError('Payment failed', 400)
		const subscriptionId = session.subscription
		const subscription = await stripe.subscriptions.retrieve(subscriptionId)

		await User.updateOne(
			{ _id: userId },
			{
				subscription: {
					sessionId: null,
					startDate: subscription.current_period_start,
					endDate: subscription.current_period_end,
				},
				paid: true,
			}
		)

		res.send({ message: 'Payment successful' })
	} catch (error) {
		next(error)
	}
}

// exports.checkout = async (req, res, next) => {
//   try {
//     const prices = await stripe.prices.list({
//       lookup_keys: [req.body.lookup_key],
//       expand: ["data.product"],
//     });
//     const session = await stripe.checkout.sessions.create({
//       billing_address_collection: "auto",
//       line_items: [
//         {
//           price: prices.data[0].id,
//           // For metered billing, do not pass quantity
//           quantity: 1,
//         },
//       ],
//       mode: "subscription",
//       success_url: `${process.env.FRONTEND_BASE_URL}/?success=true&session_id={CHECKOUT_SESSION_ID}`,
//       cancel_url: `${process.env.FRONTEND_BASE_URL}?canceled=true`,
//     });

//     res.redirect(303, session.url);
//   } catch (error) {
//     next(error)
//   }
// };

// exports.portal = async (req, res, next) => {
//   try {
//     const { session_id } = req.body;
//     const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);

//     // This is the url to which the customer will be redirected when they are done
//     // managing their billing with the portal.
//     const returnUrl = process.env.FRONTEND_BASE_URL;

//     const portalSession = await stripe.billingPortal.sessions.create({
//       customer: checkoutSession.customer,
//       return_url: returnUrl,
//     });

//     res.redirect(303, portalSession.url);
//   } catch (error) {
//     next(error)
//   }
// };

// (exports.webhook = express.raw({ type: "application/json" })),
//   (req, res, next) => {
//     try {
//       let event = request.body;
//       // Replace this endpoint secret with your endpoint's unique secret
//       // If you are testing with the CLI, find the secret by running 'stripe listen'
//       // If you are using an endpoint defined with the API or dashboard, look in your webhook settings
//       // at https://dashboard.stripe.com/webhooks
//       const endpointSecret = "whsec_12345";
//       // Only verify the event if you have an endpoint secret defined.
//       // Otherwise use the basic event deserialized with JSON.parse
//       if (endpointSecret) {
//         // Get the signature sent by Stripe
//         const signature = request.headers["stripe-signature"];
//         try {
//           event = stripe.webhooks.constructEvent(
//             request.body,
//             signature,
//             endpointSecret
//           );
//         } catch (err) {
//           console.log(
//             `⚠️  Webhook signature verification failed.`,
//             err.message
//           );
//           return response.sendStatus(400);
//         }
//       }
//       let subscription;
//       let status;
//       // Handle the event
//       switch (event.type) {
//         case "customer.subscription.trial_will_end":
//           subscription = event.data.object;
//           status = subscription.status;
//           console.log(`Subscription status is ${status}.`);
//           // Then define and call a method to handle the subscription trial ending.
//           // handleSubscriptionTrialEnding(subscription);
//           break;
//         case "customer.subscription.deleted":
//           subscription = event.data.object;
//           status = subscription.status;
//           console.log(`Subscription status is ${status}.`);
//           // Then define and call a method to handle the subscription deleted.
//           // handleSubscriptionDeleted(subscriptionDeleted);
//           break;
//         case "customer.subscription.created":
//           subscription = event.data.object;
//           status = subscription.status;
//           console.log(`Subscription status is ${status}.`);
//           // Then define and call a method to handle the subscription created.
//           // handleSubscriptionCreated(subscription);
//           break;
//         case "customer.subscription.updated":
//           subscription = event.data.object;
//           status = subscription.status;
//           console.log(`Subscription status is ${status}.`);
//           // Then define and call a method to handle the subscription update.
//           // handleSubscriptionUpdated(subscription);
//           break;
//         default:
//           // Unexpected event type
//           console.log(`Unhandled event type ${event.type}.`);
//       }
//       // Return a 200 response to acknowledge receipt of the event
//       response.send();
//     } catch (error) {
//       next(error)
//     }
//   };

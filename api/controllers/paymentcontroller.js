import Stripe from "stripe";

async function handlePayment(params, context) {
  const { amount, currency } = params.body;

    const stripe = new Stripe('sk_test_51PEUnGSFTAOEdCYw7Q7hr4Q7Ix0rdvZmpddonlQiJ7YbOwFTmPxTekSKEsgfNLnRsJGY2lw1xUNIObZUtKrIj6A200O2Jcj7By', {
      apiVersion: "2023-08-16",
    });

    try {
      console.log(amount, currency)
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount * 100,
        currency,
      });
      const payment_id = paymentIntent.id;
      console.log(payment_id)

      return context.status(200).json({
        client_secret: paymentIntent.client_secret,
        payment_id
      });
    } catch (e) {
      context.status(500);
      console.log(e.message)
      return {
        message: e.message,
      };
    }
}

export default handlePayment;

import Stripe from 'stripe';
import RecurringPayment from '../models/RecurringPayment.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function webhookStripe(req, res) {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'invoice.payment_succeeded') {
    const invoice = event.data.object;
    const customerId = invoice.customer;

    const pagamento = await RecurringPayment.findOne({ stripeCustomerId: customerId });
    if (pagamento) {
      pagamento.history.push({
        date: new Date(),
        status: 'success',
        amount: invoice.amount_paid / 100,
        stripeInvoiceId: invoice.id
      });
      await pagamento.save();
    }
  }

  res.json({ received: true });
}

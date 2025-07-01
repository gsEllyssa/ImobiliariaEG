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
    console.error('❌ Invalid Stripe signature:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Process only successful recurring payments
  if (event.type === 'invoice.payment_succeeded') {
    const invoice = event.data.object;
    const customerId = invoice.customer;

    try {
      const recurring = await RecurringPayment.findOne({ stripeCustomerId: customerId });

      if (recurring) {
        recurring.history.push({
          date: new Date(),
          status: 'success',
          amount: invoice.amount_paid / 100, // convert cents to reais
          stripeInvoiceId: invoice.id,
        });

        await recurring.save();
        console.log(`✅ Payment recorded for customer ${customerId}`);
      } else {
        console.warn(`⚠️ No recurring payment record found for customer ${customerId}`);
      }
    } catch (dbError) {
      console.error('❌ Database error during webhook handling:', dbError);
      return res.status(500).json({ error: 'Database error' });
    }
  }

  res.json({ received: true });
}

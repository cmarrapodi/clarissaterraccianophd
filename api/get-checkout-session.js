const Stripe = require('stripe');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { session_id } = req.query;

  if (!session_id) {
    return res.status(400).json({ error: 'Missing session_id' });
  }

  const stripeKey = process.env.STRIPE_SECRET_KEY?.trim();

  if (!stripeKey) {
    return res.status(500).json({ error: 'Stripe key not configured' });
  }

  try {
    const stripe = new Stripe(stripeKey, { apiVersion: '2023-10-16' });
    const session = await stripe.checkout.sessions.retrieve(session_id);

    return res.status(200).json({
      customer_email: session.customer_email,
      customer_name: session.customer_details?.name || null,
      amount_total: session.amount_total,
      service_title: session.metadata?.serviceTitle || null,
      session_date: session.metadata?.sessionDate || null,
      session_time: session.metadata?.sessionTime || null,
      payment_status: session.payment_status,
    });
  } catch (error) {
    console.error('Get session error:', error.message);
    return res.status(500).json({ error: error.message });
  }
};

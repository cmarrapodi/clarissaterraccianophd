const Stripe = require('stripe');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const stripeKey = process.env.STRIPE_SECRET_KEY?.trim();

  if (!stripeKey) {
    console.error('STRIPE_SECRET_KEY is not set');
    return res.status(500).json({ error: 'Stripe key not configured' });
  }

  if (!stripeKey.startsWith('sk_live_') && !stripeKey.startsWith('sk_test_')) {
    console.error('STRIPE_SECRET_KEY format invalid — starts with:', stripeKey.substring(0, 12));
    return res.status(500).json({ error: 'Stripe key format invalid' });
  }

  if (stripeKey.length < 32) {
    console.error('STRIPE_SECRET_KEY appears truncated — length:', stripeKey.length);
    return res.status(500).json({ error: 'Stripe key appears truncated. Re-save the full key in Vercel env vars.' });
  }

  const { serviceTitle, amount, clientEmail, sessionDate, sessionTime } = req.body;

  if (!serviceTitle || !amount || !clientEmail) {
    return res.status(400).json({ error: 'Missing required fields: serviceTitle, amount, clientEmail' });
  }

  if (typeof amount !== 'number' || amount <= 0) {
    return res.status(400).json({ error: 'Amount must be a positive number (in cents)' });
  }

  let stripe;
  try {
    stripe = new Stripe(stripeKey, { apiVersion: '2023-10-16' });
  } catch (err) {
    console.error('Failed to initialize Stripe:', err.message);
    return res.status(500).json({ error: 'Failed to initialize Stripe' });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: clientEmail,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: serviceTitle,
              description: sessionDate && sessionTime
                ? `Session on ${sessionDate} at ${sessionTime} via Zoom`
                : 'Consulting session via Zoom',
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.origin}/booking-confirmed?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/book`,
      metadata: {
        serviceTitle,
        sessionDate: sessionDate || '',
        sessionTime: sessionTime || '',
        clientEmail,
      },
    });

    return res.status(200).json({ url: session.url });
  } catch (error) {
    console.error('Stripe checkout error:', error.message);

    if (error.type === 'StripeAuthenticationError') {
      return res.status(500).json({ error: 'Stripe authentication failed. Check that the full secret key is saved in Vercel.' });
    }
    if (error.type === 'StripeInvalidRequestError') {
      return res.status(400).json({ error: `Invalid request: ${error.message}` });
    }

    return res.status(500).json({ error: error.message });
  }
};

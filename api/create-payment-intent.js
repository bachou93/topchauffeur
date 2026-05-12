const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { amount, from, to, name, phone, date, time } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe utilise les centimes
      currency: 'eur',
      capture_method: 'manual', // Ne pas débiter immédiatement
      metadata: {
        from_address: from,
        to_address: to,
        client_name: name,
        client_phone: phone,
        date: date,
        time: time
      }
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
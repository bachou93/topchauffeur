const crypto = require('crypto');
const rateLimit = require('./rate-limit');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Rate limiting
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
  const limit = rateLimit(ip, 5, 15 * 60 * 1000);
  
  if (!limit.allowed) {
    return res.status(429).json({ error: limit.message });
  }

  try {
    const { password } = req.body;
    const adminPassword = process.env.ADMIN_PASSWORD;
    const jwtSecret = process.env.JWT_SECRET;

    if (!password || password !== adminPassword) {
      return res.status(401).json({ error: 'Mot de passe incorrect' });
    }

    const token = crypto.randomBytes(32).toString('hex');
    const payload = {
      token,
      exp: Date.now() + 24 * 60 * 60 * 1000
    };

    const signature = crypto
      .createHmac('sha256', jwtSecret)
      .update(JSON.stringify(payload))
      .digest('hex');

    const sessionToken = Buffer.from(JSON.stringify({ ...payload, sig: signature })).toString('base64');

    res.status(200).json({ success: true, sessionToken });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const crypto = require('crypto');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { sessionToken } = req.body;
    const jwtSecret = process.env.JWT_SECRET;

    if (!sessionToken) {
      return res.status(401).json({ valid: false });
    }

    // Decode token
    const decoded = JSON.parse(Buffer.from(sessionToken, 'base64').toString());
    
    // Check expiry
    if (Date.now() > decoded.exp) {
      return res.status(401).json({ valid: false, reason: 'expired' });
    }

    // Verify signature
    const { sig, ...payload } = decoded;
    const expectedSig = crypto
      .createHmac('sha256', jwtSecret)
      .update(JSON.stringify(payload))
      .digest('hex');

    if (sig !== expectedSig) {
      return res.status(401).json({ valid: false, reason: 'invalid' });
    }

    res.status(200).json({ valid: true });

  } catch (error) {
    res.status(401).json({ valid: false });
  }
};
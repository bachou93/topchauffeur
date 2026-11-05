const crypto = require('crypto');

// Vérifie le jeton de session admin envoyé dans l'en-tête Authorization: Bearer <jeton>
// Le jeton est celui créé par /api/admin-login (HMAC signé avec JWT_SECRET).
function verifyAdmin(req) {
  try {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) return false;

    const header = req.headers['authorization'] || '';
    const sessionToken = header.startsWith('Bearer ') ? header.slice(7) : '';
    if (!sessionToken) return false;

    const decoded = JSON.parse(Buffer.from(sessionToken, 'base64').toString());
    if (!decoded.exp || Date.now() > decoded.exp) return false;

    const { sig, ...payload } = decoded;
    if (typeof sig !== 'string') return false;

    const expectedSig = crypto
      .createHmac('sha256', jwtSecret)
      .update(JSON.stringify(payload))
      .digest('hex');

    const a = Buffer.from(sig);
    const b = Buffer.from(expectedSig);
    return a.length === b.length && crypto.timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

module.exports = { verifyAdmin };

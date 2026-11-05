const { verifyAdmin } = require('./_auth');

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://hhdlhwrlbgcbuuwkejph.supabase.co';
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const ALLOWED_STATUS = ['pending', 'confirmed', 'cancelled'];

module.exports = async (req, res) => {
  if (!verifyAdmin(req)) {
    return res.status(401).json({ error: 'Non autorisé' });
  }
  if (!SERVICE_KEY) {
    return res.status(500).json({ error: 'SUPABASE_SERVICE_ROLE_KEY manquante sur Vercel' });
  }

  // Nouvelles clés (sb_secret_...) : en-tête apikey seul.
  // Anciennes clés (JWT, commencent par eyJ) : il faut aussi Authorization.
  const headers = {
    apikey: SERVICE_KEY,
    'Content-Type': 'application/json'
  };
  if (SERVICE_KEY.startsWith('eyJ')) headers.Authorization = `Bearer ${SERVICE_KEY}`;

  try {
    // Lire toutes les réservations
    if (req.method === 'GET') {
      const r = await fetch(`${SUPABASE_URL}/rest/v1/reservations?order=id.desc`, { headers });
      const data = await r.json();
      return res.status(r.status).json(data);
    }

    // Changer le statut d'une réservation
    if (req.method === 'PATCH') {
      const { id, status } = req.body || {};
      if (!Number.isInteger(Number(id)) || !ALLOWED_STATUS.includes(status)) {
        return res.status(400).json({ error: 'Paramètres invalides' });
      }
      const r = await fetch(`${SUPABASE_URL}/rest/v1/reservations?id=eq.${Number(id)}`, {
        method: 'PATCH',
        headers: { ...headers, Prefer: 'return=minimal' },
        body: JSON.stringify({ status })
      });
      return res.status(r.ok ? 200 : r.status).json({ success: r.ok });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

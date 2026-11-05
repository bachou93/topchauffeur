const SUPABASE_URL = process.env.SUPABASE_URL || "https://hhdlhwrlbgcbuuwkejph.supabase.co";
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Appelé par le cron Vercel (vercel.json) : fait une vraie requête sur la base
// pour que Supabase ne mette pas le projet en pause pour inactivité.
module.exports = async (req, res) => {
  try {
    if (!SERVICE_KEY) {
      return res.status(500).json({ ok: false, error: "SUPABASE_SERVICE_ROLE_KEY manquante sur Vercel" });
    }
    const headers = { apikey: SERVICE_KEY };
    if (SERVICE_KEY.startsWith('eyJ')) headers.Authorization = `Bearer ${SERVICE_KEY}`;
    const r = await fetch(`${SUPABASE_URL}/rest/v1/reservations?select=id&limit=1`, { headers });
    // Si Supabase répond autre chose que 2xx, on remonte l'erreur pour la voir dans les logs Vercel
    res.status(r.ok ? 200 : 500).json({ ok: r.ok, status: r.status, time: new Date().toISOString() });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
};

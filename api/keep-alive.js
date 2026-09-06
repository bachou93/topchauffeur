const SUPABASE_URL = process.env.SUPABASE_URL || "https://hhdlhwrlbgcbuuwkejph.supabase.co";
const SUPABASE_KEY = process.env.SUPABASE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhoZGxod3JsYmdjYnV1d2tlanBoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg0MDczNjYsImV4cCI6MjA5Mzk4MzM2Nn0.4kPEUwd_BT-yOFx2U5y8c0hi-wMmyeo1-VUdPKWGp4Q";

module.exports = async (req, res) => {
  try {
    const r = await fetch(`${SUPABASE_URL}/rest/v1/reservations?limit=1`, {
      headers: {
        "apikey": SUPABASE_KEY,
        "Authorization": `Bearer ${SUPABASE_KEY}`
      }
    });
    res.status(200).json({ ok: true, status: r.status, time: new Date().toISOString() });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
};
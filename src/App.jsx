import { useState, useEffect } from "react";

// ── SUPABASE CONFIG ──
const SUPABASE_URL = "https://hhdlhwrlbgcbuuwkejph.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhoZGxod3JsYmdjYnV1d2tlanBoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg0MDczNjYsImV4cCI6MjA5Mzk4MzM2Nn0.4kPEUwd_BT-yOFx2U5y8c0hi-wMmyeo1-VUdPKWGp4Q";


// ── EMAILJS CONFIG ──
const EMAILJS_SERVICE_ID = "service_l5pda4q";
const EMAILJS_TEMPLATE_ID = "template_gu3u9t7";
const EMAILJS_PUBLIC_KEY = "zlP7wIHapHJJFBMQG";

async function sendEmailNotification(data) {
  try {
    await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id: EMAILJS_SERVICE_ID,
        template_id: EMAILJS_TEMPLATE_ID,
        user_id: EMAILJS_PUBLIC_KEY,
        template_params: {
          booking_ref: data.booking_ref,
          from_address: data.from_address,
          to_address: data.to_address,
          date: data.date,
          time: data.time,
          client_name: data.name,
          phone: data.phone,
          passengers: data.passengers,
          pay_method: data.pay_method,
          price: data.price,
          note: data.note || "—"
        }
      })
    });
  } catch {}
}

async function saveReservation(data) {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/reservations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": SUPABASE_KEY,
        "Authorization": `Bearer ${SUPABASE_KEY}`,
        "Prefer": "return=minimal"
      },
      body: JSON.stringify(data)
    });
    return res.ok;
  } catch { return false; }
}

// ── TRANSLATIONS ──
const T = {
  fr: {
    brand: "Topchauffeur",
    brandSub: "VTC Premium · Paris & Île-de-France",
    heroTitle: "Réservez votre chauffeur\nà Paris & Île-de-France",
    heroSub: "Ponctuel · Professionnel · Disponible 24h/24",
    step1: "Trajet", step2: "Coordonnées", step3: "Paiement",
    tripTitle: "Votre trajet",
    fromLabel: "📍 Adresse de départ",
    fromPlaceholder: "Ex: 12 Rue de Rivoli, Paris 75001",
    toLabel: "🏁 Adresse d'arrivée",
    toPlaceholder: "Ex: Aéroport Orly, Terminal 4",
    dateLabel: "📅 Date", timeLabel: "⏰ Heure", timeDefault: "-- Heure --",
    passLabel: "👥 Passagers", passMax: "max 4",
    noteLabel: "📝 Note", noteOpt: "(optionnel)",
    notePlaceholder: "Vol AF123, bagages, siège bébé...",
    priceCalc: "⏳ Calcul du prix...",
    priceInvalid: "Entrez des adresses valides pour voir le prix",
    continue: "Continuer →", back: "← Retour",
    coordTitle: "Vos coordonnées",
    nameLabel: "👤 Nom complet", namePlaceholder: "Prénom Nom",
    phoneLabel: "📱 Téléphone", phonePlaceholder: "+33 6 00 00 00 00",
    emailLabel: "✉️ Email", emailPlaceholder: "votre@email.com",
    payTitle: "Paiement",
    payCard: "💳 Carte bancaire", payCash: "💵 Espèces", payCrypto: "🪙 Crypto",
    cardNum: "Numéro de carte", cardExp: "Expiration", cardCvc: "CVC",
    cardPlaceholder: "1234 5678 9012 3456", expPlaceholder: "MM/AA",
    secureNote: "🔒 Paiement sécurisé — SSL 256 bits",
    cashNote: "💵 Règlement au chauffeur en fin de trajet. Un reçu vous sera remis.",
    cryptoNote: "Sélectionnez votre crypto-monnaie et scannez le QR code pour payer.",
    cryptoSelect: "Choisir la crypto-monnaie",
    cryptoAddress: "Adresse du portefeuille",
    cryptoSend: "Envoyez exactement",
    cryptoConfirm: "Après paiement, envoyez le hash de transaction à votre chauffeur.",
    recap: "Récapitulatif", recapCalc: "🧮 Calcul", total: "💶 Total",
    confirm: "✅ Confirmer la réservation",
    successTitle: "Réservation Confirmée !",
    successSub: "Merci {name} ! Votre chauffeur vous contactera bientôt.",
    refLabel: "Référence",
    smsNote: "📱 SMS envoyé au",
    newBooking: "+ Nouvelle réservation",
    contactTitle: "Contactez-nous",
    footer: "© 2026 Topchauffeur · 24h/24 · 7j/7",
    orlyLabel: "Forfait Aéroport Orly",
    cdgLabel: "Forfait Aéroport CDG",
  },
  en: {
    brand: "Topchauffeur",
    brandSub: "Premium VTC · Paris & Île-de-France",
    heroTitle: "Book your driver\nin Paris & Île-de-France",
    heroSub: "Punctual · Professional · Available 24/7",
    step1: "Journey", step2: "Details", step3: "Payment",
    tripTitle: "Your journey",
    fromLabel: "📍 Pickup address",
    fromPlaceholder: "Ex: 12 Rue de Rivoli, Paris 75001",
    toLabel: "🏁 Drop-off address",
    toPlaceholder: "Ex: Orly Airport, Terminal 4",
    dateLabel: "📅 Date", timeLabel: "⏰ Time", timeDefault: "-- Time --",
    passLabel: "👥 Passengers", passMax: "max 4",
    noteLabel: "📝 Note", noteOpt: "(optional)",
    notePlaceholder: "Flight AF123, luggage, baby seat...",
    priceCalc: "⏳ Calculating price...",
    priceInvalid: "Enter valid addresses to see the price",
    continue: "Continue →", back: "← Back",
    coordTitle: "Your details",
    nameLabel: "👤 Full name", namePlaceholder: "First Last",
    phoneLabel: "📱 Phone", phonePlaceholder: "+33 6 00 00 00 00",
    emailLabel: "✉️ Email", emailPlaceholder: "your@email.com",
    payTitle: "Payment",
    payCard: "💳 Bank card", payCash: "💵 Cash", payCrypto: "🪙 Crypto",
    cardNum: "Card number", cardExp: "Expiry", cardCvc: "CVC",
    cardPlaceholder: "1234 5678 9012 3456", expPlaceholder: "MM/YY",
    secureNote: "🔒 Secure payment — SSL 256-bit",
    cashNote: "💵 Pay the driver at the end of the trip. A receipt will be provided.",
    cryptoNote: "Select your cryptocurrency and scan the QR code to pay.",
    cryptoSelect: "Select cryptocurrency",
    cryptoAddress: "Wallet address",
    cryptoSend: "Send exactly",
    cryptoConfirm: "After payment, send the transaction hash to your driver.",
    recap: "Summary", recapCalc: "🧮 Calculation", total: "💶 Total",
    confirm: "✅ Confirm booking",
    successTitle: "Booking Confirmed!",
    successSub: "Thank you {name}! Your driver will contact you soon.",
    refLabel: "Reference",
    smsNote: "📱 SMS sent to",
    newBooking: "+ New booking",
    contactTitle: "Contact us",
    footer: "© 2026 Topchauffeur · 24/7",
    orlyLabel: "Orly Airport Package",
    cdgLabel: "CDG Airport Package",
  },
  ar: {
    brand: "توب شوفير",
    brandSub: "نقل VTC المميز · باريس وضواحيها",
    heroTitle: "احجز سائقك\nفي باريس وضواحيها",
    heroSub: "دقيق · محترف · متاح 24 ساعة",
    step1: "الرحلة", step2: "بياناتك", step3: "الدفع",
    tripTitle: "رحلتك",
    fromLabel: "📍 عنوان الانطلاق",
    fromPlaceholder: "مثال: 12 Rue de Rivoli, Paris 75001",
    toLabel: "🏁 عنوان الوصول",
    toPlaceholder: "مثال: مطار أورلي، المحطة 4",
    dateLabel: "📅 التاريخ", timeLabel: "⏰ الوقت", timeDefault: "-- الوقت --",
    passLabel: "👥 الركاب", passMax: "حد أقصى 4",
    noteLabel: "📝 ملاحظة", noteOpt: "(اختياري)",
    notePlaceholder: "رقم الرحلة AF123، أمتعة، مقعد أطفال...",
    priceCalc: "⏳ جاري حساب السعر...",
    priceInvalid: "أدخل عناوين صحيحة لمعرفة السعر",
    continue: "متابعة ←", back: "→ رجوع",
    coordTitle: "بياناتك الشخصية",
    nameLabel: "👤 الاسم الكامل", namePlaceholder: "الاسم الأول واللقب",
    phoneLabel: "📱 رقم الهاتف", phonePlaceholder: "+33 6 00 00 00 00",
    emailLabel: "✉️ البريد الإلكتروني", emailPlaceholder: "example@email.com",
    payTitle: "الدفع",
    payCard: "💳 بطاقة بنكية", payCash: "💵 نقداً", payCrypto: "🪙 عملات رقمية",
    cardNum: "رقم البطاقة", cardExp: "تاريخ الانتهاء", cardCvc: "CVC",
    cardPlaceholder: "1234 5678 9012 3456", expPlaceholder: "MM/AA",
    secureNote: "🔒 دفع آمن — تشفير SSL 256",
    cashNote: "💵 الدفع للسائق مباشرة في نهاية الرحلة. ستحصل على إيصال.",
    cryptoNote: "اختر عملتك الرقمية وامسح رمز QR للدفع.",
    cryptoSelect: "اختر العملة الرقمية",
    cryptoAddress: "عنوان المحفظة",
    cryptoSend: "أرسل بالضبط",
    cryptoConfirm: "بعد الدفع، أرسل رقم العملية إلى السائق.",
    recap: "ملخص الحجز", recapCalc: "🧮 حساب السعر", total: "💶 المجموع",
    confirm: "✅ تأكيد الحجز",
    successTitle: "تم تأكيد الحجز!",
    successSub: "شكراً {name}! سيتصل بك السائق قريباً.",
    refLabel: "المرجع",
    smsNote: "📱 تم إرسال رسالة SMS إلى",
    newBooking: "+ حجز جديد",
    contactTitle: "تواصل معنا",
    footer: "© 2026 توب شوفير · 24 ساعة / 7 أيام",
    orlyLabel: "باقة مطار أورلي",
    cdgLabel: "باقة مطار CDG",
  },
  es: {
    brand: "Topchauffeur",
    brandSub: "VTC Premium · París & Île-de-France",
    heroTitle: "Reserve su conductor\nen París & Île-de-France",
    heroSub: "Puntual · Profesional · Disponible 24h/24",
    step1: "Viaje", step2: "Datos", step3: "Pago",
    tripTitle: "Su viaje",
    fromLabel: "📍 Dirección de origen",
    fromPlaceholder: "Ej: 12 Rue de Rivoli, Paris 75001",
    toLabel: "🏁 Dirección de destino",
    toPlaceholder: "Ej: Aeropuerto Orly, Terminal 4",
    dateLabel: "📅 Fecha", timeLabel: "⏰ Hora", timeDefault: "-- Hora --",
    passLabel: "👥 Pasajeros", passMax: "máx 4",
    noteLabel: "📝 Nota", noteOpt: "(opcional)",
    notePlaceholder: "Vuelo AF123, equipaje, silla de bebé...",
    priceCalc: "⏳ Calculando precio...",
    priceInvalid: "Ingrese direcciones válidas para ver el precio",
    continue: "Continuar →", back: "← Volver",
    coordTitle: "Sus datos",
    nameLabel: "👤 Nombre completo", namePlaceholder: "Nombre Apellido",
    phoneLabel: "📱 Teléfono", phonePlaceholder: "+33 6 00 00 00 00",
    emailLabel: "✉️ Email", emailPlaceholder: "su@email.com",
    payTitle: "Pago",
    payCard: "💳 Tarjeta bancaria", payCash: "💵 Efectivo", payCrypto: "🪙 Cripto",
    cardNum: "Número de tarjeta", cardExp: "Vencimiento", cardCvc: "CVC",
    cardPlaceholder: "1234 5678 9012 3456", expPlaceholder: "MM/AA",
    secureNote: "🔒 Pago seguro — SSL 256 bits",
    cashNote: "💵 Pago al conductor al final del viaje. Se entregará recibo.",
    cryptoNote: "Seleccione su criptomoneda y escanee el QR para pagar.",
    cryptoSelect: "Seleccionar criptomoneda",
    cryptoAddress: "Dirección de billetera",
    cryptoSend: "Envíe exactamente",
    cryptoConfirm: "Tras el pago, envíe el hash de transacción a su conductor.",
    recap: "Resumen", recapCalc: "🧮 Cálculo", total: "💶 Total",
    confirm: "✅ Confirmar reserva",
    successTitle: "¡Reserva Confirmada!",
    successSub: "¡Gracias {name}! Su conductor le contactará pronto.",
    refLabel: "Referencia",
    smsNote: "📱 SMS enviado al",
    newBooking: "+ Nueva reserva",
    contactTitle: "Contáctenos",
    footer: "© 2026 Topchauffeur · 24h/24 · 7d/7",
    orlyLabel: "Forfait Aeropuerto Orly",
    cdgLabel: "Forfait Aeropuerto CDG",
  },
};

const LANGS = [
  { code: "fr", label: "🇫🇷 FR" },
  { code: "en", label: "🇬🇧 EN" },
  { code: "ar", label: "🇸🇦 AR" },
  { code: "es", label: "🇪🇸 ES" },
];

const CRYPTOS = [
  { id: "usdt", name: "USDT", full: "Tether (TRC-20)", color: "#26a17b", address: "TYourUSDTAddressHere123456789" },
  { id: "usdc", name: "USDC", full: "USD Coin (ERC-20)", color: "#2775ca", address: "0xYourUSDCAddressHere123456" },
  { id: "btc",  name: "BTC",  full: "Bitcoin",           color: "#f7931a", address: "bc1qYourBitcoinAddressHere" },
  { id: "eth",  name: "ETH",  full: "Ethereum",          color: "#627eea", address: "0xYourETHAddressHere123456" },
  { id: "sol",  name: "SOL",  full: "Solana",            color: "#9945ff", address: "YourSolanaAddressHere12345" },
  { id: "xrp",  name: "XRP",  full: "Ripple",            color: "#00aae4", address: "rYourXRPAddressHere1234567" },
];

const ORLY = ["orly","aéroport d'orly","aeroport orly","paris orly","orly airport"];
const CDG  = ["cdg","charles de gaulle","roissy","paris cdg","roissy cdg"];
const detectAirport = a => {
  const l = a.toLowerCase();
  if (ORLY.some(k => l.includes(k))) return "orly";
  if (CDG.some(k => l.includes(k))) return "cdg";
  return null;
};

function isNightTime(timeStr) {
  if (!timeStr) return false;
  const hour = parseInt(timeStr.split(":")[0]);
  return hour < 7 || hour >= 19;
}

function calcPrice(from, to, km, t, timeStr) {
  const fa = detectAirport(from), ta = detectAirport(to);
  if (fa === "orly" || ta === "orly") return { price: 50, label: t.orlyLabel, fixed: true };
  if (fa === "cdg"  || ta === "cdg")  return { price: 60, label: t.cdgLabel,  fixed: true };
  if (km > 0) {
    const night = isNightTime(timeStr);
    const rate = night ? 2.5 : 2;
    const tariffLabel = night ? "🌙 Tarif nuit (2,50€/km)" : "☀️ Tarif jour (2€/km)";
    const price = Math.round(10 + km * rate);
    return { price, label: `10€ + ${km} km × ${rate}€/km — ${tariffLabel}`, fixed: false, night };
  }
  return null;
}

async function geocode(address) {
  try {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address + ", France")}&format=json&limit=1`;
    const r = await fetch(url, { headers: { "Accept-Language": "fr", "User-Agent": "topchauffeur-app" } });
    const data = await r.json();
    if (data && data[0]) return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) };
    return null;
  } catch { return null; }
}

async function getDistance(from, to) {
  try {
    const [coordFrom, coordTo] = await Promise.all([geocode(from), geocode(to)]);
    if (!coordFrom || !coordTo) return 5;
    const url = `https://router.project-osrm.org/route/v1/driving/${coordFrom.lon},${coordFrom.lat};${coordTo.lon},${coordTo.lat}?overview=false`;
    const r = await fetch(url);
    const data = await r.json();
    if (data.routes && data.routes[0]) {
      const km = Math.ceil(data.routes[0].distance / 1000);
      return km > 0 ? km : 1;
    }
    return 5;
  } catch { return 5; }
}

const timeSlots = Array.from({ length: 48 }, (_, i) => {
  const h = String(Math.floor(i / 2)).padStart(2, "0");
  const m = i % 2 === 0 ? "00" : "30";
  return `${h}:${m}`;
});

// Simple QR placeholder using a canvas-like SVG pattern
function QRPlaceholder({ value, size = 120 }) {
  const seed = value.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const cells = 10;
  const cell = size / cells;
  const squares = [];
  for (let r = 0; r < cells; r++) {
    for (let c = 0; c < cells; c++) {
      const on = ((seed * (r + 1) * (c + 1)) % 7) < 3 || r < 2 || c < 2 || r > cells - 3 || c > cells - 3;
      if (on) squares.push(<rect key={`${r}-${c}`} x={c * cell} y={r * cell} width={cell} height={cell} fill="#000" />);
    }
  }
  return (
    <svg width={size} height={size} style={{ border: "4px solid #fff", borderRadius: 8, background: "#fff" }}>
      {squares}
    </svg>
  );
}

// ── ADMIN DASHBOARD ──
function AdminDashboard() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState("");
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all");
  const ADMIN_PWD = "topchauffeur2026";

  async function loadReservations() {
    setLoading(true);
    try {
      const r = await fetch(`${SUPABASE_URL}/rest/v1/reservations?order=id.desc`, {
        headers: { "apikey": SUPABASE_KEY, "Authorization": `Bearer ${SUPABASE_KEY}` }
      });
      setReservations(await r.json());
    } catch {}
    setLoading(false);
  }

  async function updateStatus(id, status) {
    await fetch(`${SUPABASE_URL}/rest/v1/reservations?id=eq.${id}`, {
      method: "PATCH",
      headers: { "apikey": SUPABASE_KEY, "Authorization": `Bearer ${SUPABASE_KEY}`, "Content-Type": "application/json", "Prefer": "return=minimal" },
      body: JSON.stringify({ status })
    });
    loadReservations();
  }

  function login() {
    if (pwd === ADMIN_PWD) { setLoggedIn(true); loadReservations(); }
    else setError("❌ Mot de passe incorrect");
  }

  const filtered = filter === "all" ? reservations : reservations.filter(r => r.status === filter);
  const total = reservations.length;
  const pending = reservations.filter(r => r.status === "pending").length;
  const confirmed = reservations.filter(r => r.status === "confirmed").length;
  const revenue = reservations.filter(r => r.status === "confirmed").reduce((s, r) => s + (parseInt(r.price) || 0), 0);

  const as = {
    page: { fontFamily: "'Georgia',serif", background: "#f7f4ef", minHeight: "100vh" },
    loginWrap: { display:"flex", alignItems:"center", justifyContent:"center", minHeight:"100vh", background:"linear-gradient(135deg,#1a1a2e,#0f3460)" },
    loginCard: { background:"#fff", borderRadius:20, padding:"40px 32px", width:320, textAlign:"center", boxShadow:"0 8px 40px #0005" },
    header: { background:"#1a1a2e", padding:"14px 20px", display:"flex", justifyContent:"space-between", alignItems:"center" },
    statsGrid: { display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, padding:16 },
    statCard: { background:"#fff", borderRadius:14, padding:16, textAlign:"center", boxShadow:"0 2px 12px #0001" },
    card: { background:"#fff", borderRadius:14, padding:16, marginBottom:12, boxShadow:"0 2px 12px #0001" },
    filters: { padding:"0 16px 12px", display:"flex", gap:8, flexWrap:"wrap" },
  };

  if (!loggedIn) return (
    <div style={as.loginWrap}>
      <div style={as.loginCard}>
        <div style={{fontSize:40,marginBottom:8}}>🚖</div>
        <div style={{fontSize:20,fontWeight:700,color:"#1a1a2e",marginBottom:4}}>Topchauffeur</div>
        <div style={{fontSize:11,color:"#aaa",marginBottom:24,letterSpacing:2}}>TABLEAU DE BORD</div>
        <input type="password" placeholder="Mot de passe" value={pwd}
          onChange={e => setPwd(e.target.value)}
          onKeyDown={e => e.key === "Enter" && login()}
          style={{width:"100%",border:"1.5px solid #e0d8cc",borderRadius:10,padding:"12px 16px",fontSize:16,marginBottom:12,outline:"none",textAlign:"center",background:"#fdfaf6",boxSizing:"border-box"}} />
        <button onClick={login} style={{width:"100%",background:"linear-gradient(135deg,#1a1a2e,#0f3460)",color:"#fff",border:"none",borderRadius:12,padding:14,fontSize:15,fontWeight:700,cursor:"pointer"}}>
          🔓 Connexion
        </button>
        {error && <div style={{color:"#e55",fontSize:13,marginTop:10}}>{error}</div>}
      </div>
    </div>
  );

  return (
    <div style={as.page}>
      <div style={as.header}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <span style={{fontSize:26}}>🚖</span>
          <div>
            <div style={{color:"#c9a96e",fontWeight:700,fontSize:16}}>Topchauffeur</div>
            <div style={{color:"#888",fontSize:10,textTransform:"uppercase",letterSpacing:1}}>Tableau de bord</div>
          </div>
        </div>
        <button onClick={() => setLoggedIn(false)} style={{background:"#c9a96e22",border:"1px solid #c9a96e55",color:"#c9a96e",borderRadius:20,padding:"6px 14px",fontSize:12,cursor:"pointer"}}>
          🔒 Déconnexion
        </button>
      </div>

      <div style={as.statsGrid}>
        {[["📋","Total",total],["⏳","En attente",pending],["✅","Confirmées",confirmed],["💶","CA",revenue+"€"]].map(([icon,label,val]) => (
          <div key={label} style={as.statCard}>
            <div style={{fontSize:22,marginBottom:4}}>{icon}</div>
            <div style={{fontSize:26,fontWeight:700,color:"#1a1a2e"}}>{val}</div>
            <div style={{fontSize:11,color:"#aaa"}}>{label}</div>
          </div>
        ))}
      </div>

      <button onClick={loadReservations} style={{display:"block",margin:"0 16px 12px",background:"#f0ece4",border:"none",borderRadius:10,padding:10,fontSize:13,fontWeight:600,cursor:"pointer",width:"calc(100% - 32px)"}}>
        🔄 Actualiser
      </button>

      <div style={as.filters}>
        {[["all","Toutes"],["pending","⏳ En attente"],["confirmed","✅ Confirmées"],["cancelled","❌ Annulées"]].map(([f,label]) => (
          <button key={f} onClick={() => setFilter(f)}
            style={{padding:"6px 14px",borderRadius:20,border:`1.5px solid ${filter===f?"#1a1a2e":"#e0d8cc"}`,background:filter===f?"#1a1a2e":"#fff",color:filter===f?"#fff":"#555",fontSize:12,cursor:"pointer"}}>
            {label}
          </button>
        ))}
      </div>

      <div style={{padding:"0 16px 24px"}}>
        {loading && <div style={{textAlign:"center",padding:40,color:"#aaa"}}>⏳ Chargement...</div>}
        {!loading && filtered.length === 0 && <div style={{textAlign:"center",padding:40,color:"#aaa"}}>📭 Aucune réservation</div>}
        {!loading && filtered.map(r => (
          <div key={r.id} style={{...as.card, borderLeft:`4px solid ${r.status==="confirmed"?"#22c55e":r.status==="cancelled"?"#ef4444":"#f59e0b"}`}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}>
              <div style={{fontWeight:700,color:"#1a1a2e"}}>#TC{String(r.id).padStart(5,"0")}</div>
              <div style={{fontSize:11,fontWeight:700,padding:"3px 10px",borderRadius:20,background:r.status==="confirmed"?"#dcfce7":r.status==="cancelled"?"#fee2e2":"#fef3c7",color:r.status==="confirmed"?"#16a34a":r.status==="cancelled"?"#dc2626":"#d97706"}}>
                {r.status==="confirmed"?"✅ Confirmée":r.status==="cancelled"?"❌ Annulée":"⏳ En attente"}
              </div>
            </div>
            {[["📍 Départ",r.from_address],["🏁 Arrivée",r.to_address],["📅 Date",`${r.date} à ${r.time}`],["👤 Client",r.name],["📱 Tél",r.phone],["💳 Paiement",r.pay_method]].map(([label,val]) => (
              <div key={label} style={{display:"flex",justifyContent:"space-between",fontSize:12,color:"#555",marginBottom:5}}>
                <span style={{color:"#999"}}>{label}</span>
                <span style={{fontWeight:500,textAlign:"right",maxWidth:"60%",wordBreak:"break-word"}}>{val||"—"}</span>
              </div>
            ))}
            {r.note && <div style={{fontSize:12,color:"#888",margin:"6px 0"}}>📝 {r.note}</div>}
            <div style={{fontSize:22,fontWeight:700,color:"#c9a96e",textAlign:"right",margin:"8px 0 10px"}}>{r.price}€</div>
            <div style={{display:"flex",gap:8}}>
              <a href={`tel:${r.phone}`} style={{background:"#1a1a2e",color:"#fff",border:"none",borderRadius:10,padding:"10px 14px",fontSize:13,fontWeight:700,cursor:"pointer",textDecoration:"none"}}>📞</a>
              {r.status==="pending" ? <>
                <button onClick={() => updateStatus(r.id,"confirmed")} style={{flex:1,background:"#22c55e",color:"#fff",border:"none",borderRadius:10,padding:10,fontSize:13,fontWeight:700,cursor:"pointer"}}>✅ Confirmer</button>
                <button onClick={() => updateStatus(r.id,"cancelled")} style={{flex:1,background:"#ef4444",color:"#fff",border:"none",borderRadius:10,padding:10,fontSize:13,fontWeight:700,cursor:"pointer"}}>❌ Annuler</button>
              </> : <button onClick={() => updateStatus(r.id,"pending")} style={{flex:1,background:"#888",color:"#fff",border:"none",borderRadius:10,padding:10,fontSize:13,fontWeight:700,cursor:"pointer"}}>↩ En attente</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default function App() {
  // ── ADMIN ROUTING ──
  if (window.location.pathname === "/admin") return <AdminDashboard />;

  const [lang, setLang] = useState("fr");
  const t = T[lang];
  const isRtl = lang === "ar";

  const [step, setStep] = useState(1);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [note, setNote] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [payMethod, setPayMethod] = useState("card");
  const [cardNum, setCardNum] = useState("");
  const [cardExp, setCardExp] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [selectedCrypto, setSelectedCrypto] = useState(null);
  const [pricing, setPricing] = useState(null);
  const [loadingPrice, setLoadingPrice] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [bookingRef] = useState("#TC" + Math.floor(Math.random() * 90000 + 10000));
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (from.length < 5 || to.length < 5) { setPricing(null); return; }
    const fa = detectAirport(from), ta = detectAirport(to);
    if (fa || ta) { setPricing(calcPrice(from, to, 0, t, time)); return; }
    const timer = setTimeout(async () => {
      setLoadingPrice(true);
      const km = await getDistance(from, to);
      setPricing(calcPrice(from, to, km, t, time));
      setLoadingPrice(false);
    }, 900);
    return () => clearTimeout(timer);
  }, [from, to, lang, time]);

  const canStep1 = from.trim().length >= 5 && to.trim().length >= 5 && date && time && pricing;
  const canStep2 = name.trim() && phone.trim() && email.trim();
  const canStep3 = payMethod === "cash"
    || (payMethod === "crypto" && selectedCrypto)
    || (payMethod === "card" && cardNum.replace(/\s/g,"").length === 16 && cardExp.length === 5 && cardCvc.length === 3);

  const fmt4   = v => v.replace(/\D/g,"").slice(0,16).replace(/(.{4})/g,"$1 ").trim();
  const fmtExp = v => v.replace(/\D/g,"").slice(0,4).replace(/^(\d{2})(\d)/,"$1/$2");

  async function handleConfirm() {
    const ref = "#TC" + Math.floor(Math.random() * 90000 + 10000);
    const reservationData = {
      from_address: from,
      to_address: to,
      date,
      time,
      passengers: String(passengers),
      name,
      phone,
      email,
      pay_method: payMethod === "crypto" ? selectedCrypto?.name : payMethod,
      price: String(pricing?.price),
      note,
      status: "pending",
      booking_ref: ref
    };
    await saveReservation(reservationData);
    await sendEmailNotification(reservationData);
    setConfirmed(true);
  }

  function reset() {
    setStep(1); setFrom(""); setTo(""); setDate(""); setTime("");
    setName(""); setPhone(""); setEmail("");
    setCardNum(""); setCardExp(""); setCardCvc("");
    setSelectedCrypto(null); setPricing(null); setConfirmed(false);
  }

  const dir = isRtl ? "rtl" : "ltr";

  if (confirmed) return (
    <div style={{ ...s.page, direction: dir }}>
      <Header t={t} lang={lang} setLang={setLang} />
      <div style={s.successCard}>
        <div style={s.checkCircle}>✓</div>
        <h2 style={s.successTitle}>{t.successTitle}</h2>
        <p style={s.successSub}>{t.successSub.replace("{name}", name.split(" ")[0])}</p>
        <div style={s.refBox}>
          <span style={s.refLabel}>{t.refLabel}</span>
          <span style={s.refCode}>{bookingRef}</span>
        </div>
        <div style={s.recapBox}>
          <SRow label="📍" value={from} />
          <SRow label="🏁" value={to} />
          <SRow label="📅" value={`${date} · ${time}`} />
          <SRow label="👥" value={passengers} />
          <SRow label="💳" value={payMethod === "card" ? t.payCard : payMethod === "cash" ? t.payCash : selectedCrypto?.name} />
          <div style={s.totalRow}>
            <span style={s.totalLabel}>{t.total}</span>
            <span style={s.totalAmt}>{pricing?.price}€</span>
          </div>
        </div>
        <p style={s.smsNote}>{t.smsNote} <strong>{phone}</strong></p>
        <button style={s.newBtn} onClick={reset}>{t.newBooking}</button>
      </div>
      <ContactFooter t={t} />
    </div>
  );

  return (
    <div style={{ ...s.page, direction: dir }}>
      <Header t={t} lang={lang} setLang={setLang} />

      {/* Hero */}
      <div style={s.hero}>
        <h1 style={s.heroTitle}>{t.heroTitle}</h1>
        <p style={s.heroSub}>{t.heroSub}</p>
      </div>

      {/* Stepper */}
      <div style={s.stepper}>
        {[t.step1, t.step2, t.step3].map((label, i) => (
          <div key={i} style={s.stepItem}>
            <div style={{ ...s.dot, background: step > i+1 ? "#c9a96e" : step === i+1 ? "#1a1a2e" : "#ddd", color: step >= i+1 ? "#fff" : "#aaa", cursor: i+1 < step ? "pointer" : "default" }}
              onClick={() => i+1 < step && setStep(i+1)}>
              {step > i+1 ? "✓" : i+1}
            </div>
            <span style={{ ...s.stepLabel, color: step === i+1 ? "#1a1a2e" : "#aaa", fontWeight: step === i+1 ? 700 : 400 }}>{label}</span>
            {i < 2 && <div style={{ ...s.stepLine, background: step > i+1 ? "#c9a96e" : "#ddd" }} />}
          </div>
        ))}
      </div>

      <div style={s.card}>

        {/* STEP 1 */}
        {step === 1 && <>
          <h2 style={s.stepTitle}>{t.tripTitle}</h2>
          <Field label={t.fromLabel}><input style={s.input} placeholder={t.fromPlaceholder} value={from} onChange={e => setFrom(e.target.value)} /></Field>
          <Field label={t.toLabel}><input style={s.input} placeholder={t.toPlaceholder} value={to} onChange={e => setTo(e.target.value)} /></Field>

          {from.length >= 5 && to.length >= 5 && (
            <div style={s.priceBox}>
              {loadingPrice
                ? <span style={s.loadingTxt}>{t.priceCalc}</span>
                : pricing
                  ? <><span style={s.priceLbl}>{pricing.label}</span><span style={s.priceAmt}>{pricing.price}€</span></>
                  : <span style={s.loadingTxt}>{t.priceInvalid}</span>
              }
            </div>
          )}

          <div style={s.row2}>
            <Field label={t.dateLabel} style={{ flex: 1 }}><input style={s.input} type="date" min={today} value={date} onChange={e => setDate(e.target.value)} /></Field>
            <Field label={t.timeLabel} style={{ flex: 1 }}>
              <select style={s.select} value={time} onChange={e => setTime(e.target.value)}>
                <option value="">{t.timeDefault}</option>
                {timeSlots.map(ts => <option key={ts}>{ts}</option>)}
              </select>
            </Field>
          </div>

          <Field label={t.passLabel}>
            <div style={s.passRow}>
              <button style={s.passBtn} onClick={() => setPassengers(p => Math.max(1, p-1))}>−</button>
              <span style={s.passNum}>{passengers}</span>
              <button style={s.passBtn} onClick={() => setPassengers(p => Math.min(4, p+1))}>+</button>
              <span style={s.passHint}>{t.passMax}</span>
            </div>
          </Field>

          <Field label={<>{t.noteLabel} <span style={s.opt}>{t.noteOpt}</span></>}>
            <textarea style={s.textarea} rows={2} placeholder={t.notePlaceholder} value={note} onChange={e => setNote(e.target.value)} />
          </Field>

          <button style={{ ...s.nextBtn, opacity: canStep1 ? 1 : 0.4 }} disabled={!canStep1} onClick={() => setStep(2)}>{t.continue}</button>
        </>}

        {/* STEP 2 */}
        {step === 2 && <>
          <h2 style={s.stepTitle}>{t.coordTitle}</h2>
          <div style={s.badge}>
            <div style={s.badgeRow}><span>📍</span><span>{from}</span></div>
            <div style={s.badgeArrow}>↓</div>
            <div style={s.badgeRow}><span>🏁</span><span>{to}</span></div>
            <div style={s.badgeMeta}>{date} · {time} · <strong style={{ color: "#c9a96e" }}>{pricing?.price}€</strong></div>
          </div>
          <Field label={t.nameLabel}><input style={s.input} placeholder={t.namePlaceholder} value={name} onChange={e => setName(e.target.value)} /></Field>
          <Field label={t.phoneLabel}><input style={s.input} type="tel" placeholder={t.phonePlaceholder} value={phone} onChange={e => setPhone(e.target.value)} /></Field>
          <Field label={t.emailLabel}><input style={s.input} type="email" placeholder={t.emailPlaceholder} value={email} onChange={e => setEmail(e.target.value)} /></Field>
          <div style={s.btnRow}>
            <button style={s.backBtn} onClick={() => setStep(1)}>{t.back}</button>
            <button style={{ ...s.nextBtn, flex: 2, opacity: canStep2 ? 1 : 0.4 }} disabled={!canStep2} onClick={() => setStep(3)}>{t.continue}</button>
          </div>
        </>}

        {/* STEP 3 */}
        {step === 3 && <>
          <h2 style={s.stepTitle}>{t.payTitle}</h2>

          {/* Payment method tabs */}
          <div style={s.payToggle}>
            {["card","cash","crypto"].map(m => (
              <button key={m} style={{ ...s.payBtn, background: payMethod === m ? "#1a1a2e" : "#f0ece4", color: payMethod === m ? "#fff" : "#555" }}
                onClick={() => setPayMethod(m)}>
                {m === "card" ? t.payCard : m === "cash" ? t.payCash : t.payCrypto}
              </button>
            ))}
          </div>

          {/* Card */}
          {payMethod === "card" && <>
            <Field label={t.cardNum}><input style={s.input} placeholder={t.cardPlaceholder} value={cardNum} onChange={e => setCardNum(fmt4(e.target.value))} /></Field>
            <div style={s.row2}>
              <Field label={t.cardExp} style={{ flex: 1 }}><input style={s.input} placeholder={t.expPlaceholder} value={cardExp} onChange={e => setCardExp(fmtExp(e.target.value))} /></Field>
              <Field label={t.cardCvc} style={{ flex: 1 }}><input style={s.input} placeholder="123" maxLength={3} value={cardCvc} onChange={e => setCardCvc(e.target.value.replace(/\D/g,"").slice(0,3))} /></Field>
            </div>
            <div style={s.secureNote}>{t.secureNote}</div>
          </>}

          {/* Cash */}
          {payMethod === "cash" && <div style={s.cashNote}>{t.cashNote}</div>}

          {/* Crypto */}
          {payMethod === "crypto" && (
            <div>
              <p style={{ fontSize: 13, color: "#666", marginBottom: 14 }}>{t.cryptoNote}</p>
              {/* Crypto selector */}
              <div style={s.cryptoGrid}>
                {CRYPTOS.map(c => (
                  <button key={c.id} onClick={() => setSelectedCrypto(c)}
                    style={{ ...s.cryptoChip, border: selectedCrypto?.id === c.id ? `2px solid ${c.color}` : "2px solid #eee", background: selectedCrypto?.id === c.id ? c.color + "18" : "#fafafa" }}>
                    <span style={{ ...s.cryptoDot, background: c.color }}></span>
                    <span style={{ fontWeight: 700, fontSize: 13 }}>{c.name}</span>
                    <span style={{ fontSize: 10, color: "#888" }}>{c.full}</span>
                  </button>
                ))}
              </div>

              {selectedCrypto && (
                <div style={s.cryptoPayBox}>
                  <div style={{ display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap" }}>
                    <QRPlaceholder value={selectedCrypto.address} size={110} />
                    <div style={{ flex: 1, minWidth: 160 }}>
                      <div style={{ fontSize: 12, color: "#888", marginBottom: 4 }}>{t.cryptoSend}</div>
                      <div style={{ fontSize: 20, fontWeight: 700, color: selectedCrypto.color }}>{pricing?.price} {selectedCrypto.name}</div>
                      <div style={{ fontSize: 11, color: "#888", marginTop: 8, marginBottom: 4 }}>{t.cryptoAddress}</div>
                      <div style={{ fontSize: 11, fontFamily: "monospace", background: "#f0ece4", padding: "6px 10px", borderRadius: 8, wordBreak: "break-all", color: "#333" }}>
                        {selectedCrypto.address}
                      </div>
                    </div>
                  </div>
                  <p style={{ fontSize: 11, color: "#888", marginTop: 12, borderTop: "1px solid #eee", paddingTop: 10 }}>{t.cryptoConfirm}</p>
                </div>
              )}
            </div>
          )}

          {/* Recap */}
          <div style={s.recap}>
            <div style={s.recapTitle}>{t.recap}</div>
            <SRow label="📍" value={from} />
            <SRow label="🏁" value={to} />
            <SRow label="📅" value={`${date} · ${time}`} />
            <SRow label="👥" value={passengers} />
            <SRow label="👤" value={name} />
            <div style={s.recapDivider} />
            <SRow label={t.recapCalc} value={pricing?.label} />
            <div style={s.totalRow}>
              <span style={s.totalLabel}>{t.total}</span>
              <span style={s.totalAmt}>{pricing?.price}€</span>
            </div>
          </div>

          <div style={s.btnRow}>
            <button style={s.backBtn} onClick={() => setStep(2)}>{t.back}</button>
            <button style={{ ...s.confirmBtn, flex: 2, opacity: canStep3 ? 1 : 0.4 }} disabled={!canStep3} onClick={handleConfirm}>
              {t.confirm}
            </button>
          </div>
        </>}
      </div>

      <ContactFooter t={t} />
    </div>
  );
}

// ── Sub-components ──

function Header({ t, lang, setLang }) {
  const [open, setOpen] = useState(false);
  const current = LANGS.find(l => l.code === lang);

  return (
    <header style={s.header}>
      <div style={s.logoArea}>
        {/* Car SVG Logo */}
        <svg width="52" height="32" viewBox="0 0 52 32" fill="none">
          <rect x="8" y="10" width="36" height="14" rx="4" fill="#c9a96e"/>
          <path d="M14 10 L18 4 H34 L38 10Z" fill="#e8c88a"/>
          <rect x="6" y="20" width="40" height="5" rx="2.5" fill="#b8935a"/>
          <circle cx="14" cy="26" r="4" fill="#1a1a2e"/>
          <circle cx="14" cy="26" r="2" fill="#c9a96e"/>
          <circle cx="38" cy="26" r="4" fill="#1a1a2e"/>
          <circle cx="38" cy="26" r="2" fill="#c9a96e"/>
          <rect x="20" y="5" width="12" height="6" rx="1.5" fill="#1a1a2e" opacity="0.4"/>
          <rect x="4" y="20" width="5" height="3" rx="1" fill="#f5d98a"/>
          <rect x="43" y="20" width="5" height="3" rx="1" fill="#ff6b6b" opacity="0.7"/>
        </svg>
        <div>
          <div style={s.logoName}>{t.brand}</div>
          <div style={s.logoSub}>{t.brandSub}</div>
        </div>
      </div>

      {/* Dropdown language switcher */}
      <div style={{ position: "relative" }}>
        <button
          onClick={() => setOpen(o => !o)}
          style={s.langDropBtn}
        >
          {current.label}
          <span style={{ marginLeft: 6, fontSize: 10, opacity: 0.7 }}>{open ? "▲" : "▼"}</span>
        </button>
        {open && (
          <div style={s.langDropMenu}>
            {LANGS.filter(l => l.code !== lang).map(l => (
              <button key={l.code}
                onClick={() => { setLang(l.code); setOpen(false); }}
                style={s.langDropItem}>
                {l.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}

function ContactFooter({ t }) {
  return (
    <footer style={s.contactFooter}>
      <div style={s.contactTitle}>{t.contactTitle}</div>
      <div style={s.contactRow}>
        <a href="tel:+33635209228" style={s.contactLink}>📞 +33 6 35 20 92 28</a>
        <a href="mailto:topchauffeur75@gmail.com" style={s.contactLink}>✉️ topchauffeur75@gmail.com</a>
      </div>
      <div style={s.footerNote}>{t.footer}</div>
    </footer>
  );
}

function Field({ label, children, style }) {
  return <div style={{ marginBottom: 16, ...style }}><label style={s.label}>{label}</label>{children}</div>;
}
function SRow({ label, value }) {
  return <div style={s.srow}><span style={s.srowLbl}>{label}</span><span style={s.srowVal}>{value}</span></div>;
}

// ── Styles ──
const s = {
  page: { fontFamily: "'Georgia','Times New Roman',serif", background: "#f7f4ef", minHeight: "100vh" },
  header: { display:"flex", justifyContent:"space-between", alignItems:"center", padding:"12px 20px", background:"#1a1a2e", flexWrap:"wrap", gap:8 },
  logoArea: { display:"flex", alignItems:"center", gap:10 },
  logoName: { color:"#c9a96e", fontWeight:700, fontSize:17, letterSpacing:0.5 },
  logoSub: { color:"#888", fontSize:10, letterSpacing:1.2, textTransform:"uppercase" },
  langDropBtn: { display:"flex", alignItems:"center", background:"#c9a96e", border:"none", borderRadius:20, padding:"7px 14px", fontSize:13, fontWeight:700, color:"#1a1a2e", cursor:"pointer", whiteSpace:"nowrap" },
  langDropMenu: { position:"absolute", top:"calc(100% + 8px)", right:0, background:"#16213e", borderRadius:12, overflow:"hidden", boxShadow:"0 8px 24px #0006", zIndex:999, minWidth:110 },
  langDropItem: { display:"block", width:"100%", padding:"10px 16px", background:"transparent", border:"none", color:"#fff", fontSize:13, fontWeight:500, cursor:"pointer", textAlign:"left" },
  hero: { background:"linear-gradient(135deg,#1a1a2e 0%,#0f3460 100%)", padding:"36px 24px 28px", textAlign:"center" },
  heroTitle: { color:"#fff", fontSize:22, margin:"0 0 8px", lineHeight:1.4, whiteSpace:"pre-line" },
  heroSub: { color:"#c9a96e", fontSize:13, margin:0, letterSpacing:1 },
  stepper: { display:"flex", justifyContent:"center", alignItems:"center", padding:"16px 20px", background:"#fff", borderBottom:"1px solid #eee" },
  stepItem: { display:"flex", alignItems:"center", gap:6 },
  dot: { width:28, height:28, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:700, transition:"all .3s" },
  stepLabel: { fontSize:12, transition:"all .3s" },
  stepLine: { width:24, height:2, margin:"0 4px" },
  card: { maxWidth:520, margin:"24px auto", background:"#fff", borderRadius:16, boxShadow:"0 4px 24px #0002", padding:"26px 24px 30px" },
  stepTitle: { fontSize:20, color:"#1a1a2e", margin:"0 0 20px", borderBottom:"2px solid #f0e8d8", paddingBottom:10 },
  label: { display:"block", fontSize:13, fontWeight:600, color:"#555", marginBottom:5 },
  opt: { fontWeight:400, color:"#bbb" },
  input: { width:"100%", border:"1.5px solid #e0d8cc", borderRadius:10, padding:"11px 14px", fontSize:14, outline:"none", background:"#fdfaf6", boxSizing:"border-box", fontFamily:"inherit" },
  select: { width:"100%", border:"1.5px solid #e0d8cc", borderRadius:10, padding:"11px 14px", fontSize:14, outline:"none", background:"#fdfaf6", boxSizing:"border-box", fontFamily:"inherit" },
  textarea: { width:"100%", border:"1.5px solid #e0d8cc", borderRadius:10, padding:"11px 14px", fontSize:13, outline:"none", background:"#fdfaf6", boxSizing:"border-box", fontFamily:"inherit", resize:"vertical" },
  row2: { display:"flex", gap:12 },
  passRow: { display:"flex", alignItems:"center", gap:12 },
  passBtn: { width:32, height:32, borderRadius:"50%", border:"2px solid #c9a96e", background:"#fff", color:"#c9a96e", fontSize:18, cursor:"pointer", fontWeight:700, lineHeight:1 },
  passNum: { fontSize:20, fontWeight:700, color:"#1a1a2e", minWidth:20, textAlign:"center" },
  passHint: { fontSize:11, color:"#bbb" },
  priceBox: { display:"flex", justifyContent:"space-between", alignItems:"center", background:"#fdfaf6", border:"1.5px solid #e8d9c0", borderRadius:10, padding:"12px 16px", marginBottom:16 },
  loadingTxt: { color:"#aaa", fontSize:13 },
  priceLbl: { fontSize:13, color:"#666" },
  priceAmt: { fontSize:26, fontWeight:700, color:"#c9a96e" },
  nextBtn: { width:"100%", background:"linear-gradient(135deg,#1a1a2e,#0f3460)", color:"#fff", border:"none", borderRadius:12, padding:"13px", fontSize:15, fontWeight:700, cursor:"pointer", marginTop:4, transition:"opacity .2s" },
  backBtn: { flex:1, background:"#f0ece4", color:"#555", border:"none", borderRadius:12, padding:"13px", fontSize:14, fontWeight:600, cursor:"pointer" },
  confirmBtn: { background:"linear-gradient(135deg,#c9a96e,#b8935a)", color:"#fff", border:"none", borderRadius:12, padding:"13px", fontSize:15, fontWeight:700, cursor:"pointer" },
  btnRow: { display:"flex", gap:10, marginTop:12 },
  badge: { background:"#f8f5f0", border:"1px solid #e8d9c0", borderRadius:12, padding:"14px 16px", marginBottom:20 },
  badgeRow: { display:"flex", gap:8, fontSize:13, color:"#444" },
  badgeArrow: { color:"#c9a96e", paddingLeft:4, margin:"3px 0" },
  badgeMeta: { marginTop:8, fontSize:12, color:"#888" },
  payToggle: { display:"flex", gap:6, marginBottom:20, flexWrap:"wrap" },
  payBtn: { flex:1, minWidth:90, padding:"10px 6px", borderRadius:10, border:"none", cursor:"pointer", fontSize:12, fontWeight:600, transition:"all .2s" },
  secureNote: { fontSize:12, color:"#16a34a", textAlign:"center", margin:"4px 0 16px", fontWeight:600 },
  cashNote: { background:"#f0fdf4", border:"1px solid #86efac", borderRadius:10, padding:"14px", fontSize:13, color:"#166534", marginBottom:16 },
  cryptoGrid: { display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8, marginBottom:16 },
  cryptoChip: { display:"flex", flexDirection:"column", alignItems:"center", gap:3, padding:"10px 8px", borderRadius:10, cursor:"pointer", transition:"all .2s", background:"#fafafa" },
  cryptoDot: { width:10, height:10, borderRadius:"50%" },
  cryptoPayBox: { background:"#fdfaf6", border:"1.5px solid #e8d9c0", borderRadius:12, padding:"16px", marginBottom:16 },
  recap: { background:"#fdfaf6", border:"1px solid #e8d9c0", borderRadius:12, padding:"16px", marginBottom:16 },
  recapTitle: { fontWeight:700, fontSize:14, color:"#1a1a2e", marginBottom:12 },
  recapDivider: { height:1, background:"#e8d9c0", margin:"10px 0" },
  srow: { display:"flex", justifyContent:"space-between", fontSize:12, color:"#555", marginBottom:7, gap:8 },
  srowLbl: { color:"#999", flexShrink:0 },
  srowVal: { textAlign:"right", fontWeight:500, maxWidth:"65%", wordBreak:"break-word" },
  totalRow: { display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:10, paddingTop:10, borderTop:"1px solid #e8d9c0" },
  totalLabel: { fontWeight:700, fontSize:15, color:"#1a1a2e" },
  totalAmt: { fontSize:26, fontWeight:700, color:"#c9a96e" },
  successCard: { maxWidth:480, margin:"32px auto", background:"#fff", borderRadius:20, boxShadow:"0 8px 40px #0003", padding:"36px 28px", textAlign:"center" },
  checkCircle: { width:68, height:68, borderRadius:"50%", background:"linear-gradient(135deg,#22c55e,#16a34a)", color:"#fff", fontSize:32, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 18px" },
  successTitle: { fontSize:24, color:"#1a1a2e", margin:"0 0 6px" },
  successSub: { color:"#666", margin:"0 0 20px", fontSize:14 },
  refBox: { background:"#f8f5f0", border:"2px dashed #c9a96e", borderRadius:12, padding:"10px 20px", display:"inline-block", marginBottom:20 },
  refLabel: { display:"block", fontSize:10, color:"#aaa", letterSpacing:2, textTransform:"uppercase" },
  refCode: { fontSize:22, fontWeight:700, color:"#1a1a2e", fontFamily:"monospace" },
  recapBox: { textAlign:"left", background:"#fdfaf6", border:"1px solid #e8d9c0", borderRadius:12, padding:"16px", marginBottom:18 },
  smsNote: { fontSize:12, color:"#888", marginBottom:20 },
  newBtn: { background:"linear-gradient(135deg,#1a1a2e,#0f3460)", color:"#fff", border:"none", borderRadius:12, padding:"13px 28px", fontSize:14, fontWeight:700, cursor:"pointer" },
  contactFooter: { background:"#1a1a2e", padding:"28px 24px 20px", textAlign:"center", marginTop:32 },
  contactTitle: { color:"#c9a96e", fontSize:14, fontWeight:700, letterSpacing:1, textTransform:"uppercase", marginBottom:14 },
  contactRow: { display:"flex", justifyContent:"center", gap:24, flexWrap:"wrap", marginBottom:16 },
  contactLink: { color:"#fff", textDecoration:"none", fontSize:14, fontWeight:500 },
  footerNote: { color:"#666", fontSize:11, letterSpacing:0.5 },
};


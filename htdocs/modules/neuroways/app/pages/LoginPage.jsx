/**
 * NW-IDENTITY-002 — Productive Login Page
 * Uses identity.js login() exclusively — no new auth logic.
 */
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { login } from "../lib/identity.js";
import { useAuth } from "../lib/authContext.jsx";

const inputStyle = {
  width: "100%", padding: "13px 14px", border: "1.5px solid #e5e5e5", borderRadius: 10,
  fontSize: 15, color: "#0A1F44", background: "#fafafa", outline: "none",
  boxSizing: "border-box", fontFamily: "'DM Sans', sans-serif",
};
const labelStyle = {
  fontSize: 12, fontWeight: 700, color: "#6b7280", letterSpacing: "0.07em",
  textTransform: "uppercase", display: "block", marginBottom: 6,
};

function BrandPanel() {
  return (
    <div style={{
      background: "#0A1F44", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", padding: "56px 48px",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", top: -100, right: -100, width: 360, height: 360, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.07)" }} />
      <div style={{ position: "absolute", bottom: -80, left: -80, width: 280, height: 280, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.05)" }} />
      <div style={{ position: "relative", textAlign: "center", maxWidth: 340 }}>
        <h1 style={{ fontSize: 38, fontWeight: 900, color: "#fff", letterSpacing: "0.16em", marginBottom: 28, fontFamily: "'DM Sans', sans-serif" }}>
          NEUROWAYS
        </h1>
        <svg viewBox="0 0 320 32" fill="none" style={{ width: "100%", maxWidth: 320, display: "block", margin: "0 auto" }}>
          <defs>
            <linearGradient id="wg" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#fff" stopOpacity="0.9"/>
              <stop offset="30%" stopColor="#008CA8"/>
              <stop offset="60%" stopColor="#7B4BA2"/>
              <stop offset="85%" stopColor="#E2A83B"/>
            </linearGradient>
          </defs>
          <path d="M4 20 Q36 6 68 20 Q100 34 132 20 Q164 6 196 20 Q228 34 260 18" stroke="url(#wg)" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
          <circle cx="274" cy="17" r="5" fill="#E2A83B"/>
          <line x1="285" y1="17" x2="310" y2="17" stroke="#E2A83B" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
        <p style={{ marginTop: 36, fontSize: 15, color: "rgba(255,255,255,0.6)", lineHeight: 1.8 }}>
          Beobachte deinen Energiezustand —<br/>klar, ruhig und ohne Bewertung.
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";
  const statusError = location.state?.error;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) navigate(from, { replace: true });
  }, [user]);

  useEffect(() => {
    if (statusError === "locked")      setErr("Dieses Konto ist gesperrt. Bitte wende dich an den Support.");
    if (statusError === "deactivated") setErr("Dieses Konto ist nicht mehr aktiv.");
  }, [statusError]);

  async function handleSubmit(e) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      await login({ email, password });
      navigate(from, { replace: true });
    } catch (ex) {
      setErr(ex.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", background: "#fff" }}>
      {/* Brand panel — desktop only */}
      <div className="hidden md:flex" style={{ width: "44%", flexDirection: "column" }}>
        <BrandPanel />
      </div>

      {/* Form panel */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>
        <div style={{ width: "100%", maxWidth: 400 }}>

          {/* Mobile brand mark */}
          <div className="md:hidden" style={{ textAlign: "center", marginBottom: 40 }}>
            <span style={{ fontWeight: 900, fontSize: 22, color: "#0A1F44", letterSpacing: "0.14em", fontFamily: "'DM Sans', sans-serif" }}>NEUROWAYS</span>
            <svg viewBox="0 0 280 28" fill="none" style={{ width: "100%", maxWidth: 220, display: "block", margin: "12px auto 0" }}>
              <defs><linearGradient id="wgm" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#0A1F44"/><stop offset="30%" stopColor="#008CA8"/><stop offset="60%" stopColor="#7B4BA2"/><stop offset="85%" stopColor="#E2A83B"/></linearGradient></defs>
              <path d="M4 18 Q34 5 64 18 Q94 31 124 18 Q154 5 184 18 Q214 31 240 16" stroke="url(#wgm)" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
              <circle cx="253" cy="15" r="4" fill="#E2A83B"/>
              <line x1="262" y1="15" x2="278" y2="15" stroke="#E2A83B" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          </div>

          <h2 style={{ fontSize: 26, fontWeight: 800, color: "#0A1F44", marginBottom: 6, fontFamily: "'DM Sans', sans-serif" }}>
            Willkommen zurück
          </h2>
          <p style={{ color: "#6b7280", fontSize: 15, marginBottom: 32 }}>Melde dich an, um fortzufahren.</p>

          {err && (
            <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 10, padding: "12px 16px", marginBottom: 22, fontSize: 14, color: "#b91c1c", lineHeight: 1.5 }}>
              {err}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <label>
              <span style={labelStyle}>E-Mail</span>
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                placeholder="du@beispiel.de" style={inputStyle} autoComplete="email" />
            </label>
            <label>
              <span style={labelStyle}>Passwort</span>
              <input type="password" required value={password} onChange={e => setPassword(e.target.value)}
                placeholder="Dein Passwort" style={inputStyle} autoComplete="current-password" />
            </label>
            <div style={{ textAlign: "right", marginTop: -8 }}>
              <Link to="/forgot-password" style={{ fontSize: 13, color: "#008CA8", textDecoration: "none", fontWeight: 600 }}>
                Passwort vergessen?
              </Link>
            </div>
            <button type="submit" disabled={loading} style={{
              padding: "14px 24px", background: "#0A1F44", color: "#fff",
              border: "none", borderRadius: 12, fontSize: 15, fontWeight: 700,
              cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1,
              fontFamily: "'DM Sans', sans-serif", marginTop: 4,
            }}>
              {loading ? "Wird angemeldet …" : "Anmelden"}
            </button>
          </form>

          <p style={{ marginTop: 30, textAlign: "center", fontSize: 14, color: "#6b7280" }}>
            Noch kein Konto?{" "}
            <Link to="/register" style={{ color: "#0A1F44", fontWeight: 700, textDecoration: "none" }}>Jetzt registrieren</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

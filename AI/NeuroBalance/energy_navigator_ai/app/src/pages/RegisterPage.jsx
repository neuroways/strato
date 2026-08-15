/**
 * NW-IDENTITY-002 — Registration Page
 * Uses existing identity.js register() — no new auth logic.
 */
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { register } from "../lib/identity.js";
import { useAuth } from "../lib/authContext.jsx";

const inputStyle = {
  width: "100%", padding: "12px 14px",
  border: "1.5px solid #e5e5e5", borderRadius: 10,
  fontSize: 15, color: "#0A1F44", background: "#fafafa",
  outline: "none", boxSizing: "border-box", fontFamily: "'DM Sans', sans-serif",
};

export default function RegisterPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) navigate("/dashboard", { replace: true });
  }, [user, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    setErr(null);
    if (password !== passwordConfirm) {
      setErr("Die Passwörter stimmen nicht überein.");
      return;
    }
    setLoading(true);
    try {
      await register({ email, password, passwordConfirm, displayName });
      navigate("/dashboard", { replace: true });
    } catch (ex) {
      setErr(ex.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{
      minHeight: "100vh", background: "#fff", display: "flex",
      alignItems: "center", justifyContent: "center", padding: "32px 24px",
    }}>
      <div style={{ width: "100%", maxWidth: 420 }}>
        {/* Brand */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <span style={{ fontWeight: 800, fontSize: 22, color: "#0A1F44", letterSpacing: "0.12em", fontFamily: "'DM Sans', sans-serif" }}>NEUROWAYS</span>
          <svg viewBox="0 0 280 32" fill="none" style={{ width: "100%", maxWidth: 240, display: "block", margin: "12px auto 0" }}>
            <defs>
              <linearGradient id="wg2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0A1F44"/><stop offset="30%" stopColor="#008CA8"/>
                <stop offset="60%" stopColor="#7B4BA2"/><stop offset="85%" stopColor="#E2A83B"/>
              </linearGradient>
            </defs>
            <path d="M4 20 Q30 6 56 20 Q82 34 108 20 Q134 6 160 20 Q186 34 212 18" stroke="url(#wg2)" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
            <circle cx="224" cy="17" r="4" fill="#E2A83B"/>
            <line x1="233" y1="17" x2="252" y2="17" stroke="#E2A83B" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
        </div>

        <h2 style={{ fontSize: 26, fontWeight: 700, color: "#0A1F44", marginBottom: 6, fontFamily: "'DM Sans', sans-serif" }}>
          Konto erstellen
        </h2>
        <p style={{ color: "#6b7280", fontSize: 15, marginBottom: 32 }}>
          Erstelle dein persönliches NeuroWays-Konto.
        </p>

        {err && (
          <div style={{
            background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 10,
            padding: "12px 16px", marginBottom: 20, fontSize: 14, color: "#b91c1c",
          }}>{err}</div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <label>
            <span style={labelStyle}>Anzeigename <span style={{ color: "#9ca3af", fontWeight: 400 }}>(optional)</span></span>
            <input type="text" value={displayName} onChange={e => setDisplayName(e.target.value)}
              placeholder="Wie sollen wir dich nennen?" style={inputStyle} autoComplete="name" />
          </label>
          <label>
            <span style={labelStyle}>E-Mail</span>
            <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
              placeholder="du@beispiel.de" style={inputStyle} autoComplete="email" />
          </label>
          <label>
            <span style={labelStyle}>Passwort</span>
            <input type="password" required value={password} onChange={e => setPassword(e.target.value)}
              placeholder="Mindestens 8 Zeichen" style={inputStyle} autoComplete="new-password" />
          </label>
          <label>
            <span style={labelStyle}>Passwort wiederholen</span>
            <input type="password" required value={passwordConfirm} onChange={e => setPasswordConfirm(e.target.value)}
              placeholder="Passwort bestätigen" style={inputStyle} autoComplete="new-password" />
          </label>

          <button type="submit" disabled={loading} style={{
            padding: "14px 24px", background: "#0A1F44", color: "#fff",
            border: "none", borderRadius: 12, fontSize: 15, fontWeight: 600,
            cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1,
            fontFamily: "'DM Sans', sans-serif", marginTop: 4,
          }}>
            {loading ? "Konto wird erstellt …" : "Konto erstellen"}
          </button>
        </form>

        <p style={{ marginTop: 28, textAlign: "center", fontSize: 14, color: "#6b7280" }}>
          Bereits angemeldet?{" "}
          <Link to="/login" style={{ color: "#0A1F44", fontWeight: 600, textDecoration: "none" }}>Anmelden</Link>
        </p>
      </div>
    </div>
  );
}

const labelStyle = {
  fontSize: 12, fontWeight: 600, color: "#6b7280",
  letterSpacing: "0.06em", textTransform: "uppercase", display: "block", marginBottom: 6,
};

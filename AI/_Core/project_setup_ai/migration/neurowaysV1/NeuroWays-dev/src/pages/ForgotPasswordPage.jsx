/**
 * NW-IDENTITY-002 — Forgot Password Page
 * UI fully implemented. Email reset flow prepared.
 * OPEN POINT: SMTP not available in this environment.
 * Uses identity.js requestPasswordReset() which returns a generic message
 * without revealing whether the email is registered (security: no enumeration).
 */
import { useState } from "react";
import { Link } from "react-router";
import { requestPasswordReset } from "../lib/identity.js";

const inputStyle = {
  width: "100%", padding: "12px 14px",
  border: "1.5px solid #e5e5e5", borderRadius: 10,
  fontSize: 15, color: "#0A1F44", background: "#fafafa",
  outline: "none", boxSizing: "border-box", fontFamily: "'DM Sans', sans-serif",
};

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await requestPasswordReset(email);
    } catch (_) {
      // Always show success — never reveal email existence
    } finally {
      setSent(true);
      setLoading(false);
    }
  }

  return (
    <div style={{
      minHeight: "100vh", background: "#fff", display: "flex",
      alignItems: "center", justifyContent: "center", padding: "32px 24px",
    }}>
      <div style={{ width: "100%", maxWidth: 400 }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <span style={{ fontWeight: 800, fontSize: 22, color: "#0A1F44", letterSpacing: "0.12em", fontFamily: "'DM Sans', sans-serif" }}>NEUROWAYS</span>
        </div>

        {sent ? (
          <div style={{ textAlign: "center" }}>
            <div style={{
              width: 64, height: 64, borderRadius: "50%", background: "#f0f9ff",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 20px",
            }}>
              <span style={{ fontSize: 28 }}>✉️</span>
            </div>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: "#0A1F44", marginBottom: 12, fontFamily: "'DM Sans', sans-serif" }}>
              Prüfe dein Postfach
            </h2>
            <p style={{ color: "#6b7280", fontSize: 15, lineHeight: 1.7, marginBottom: 8 }}>
              Falls diese E-Mail-Adresse bei uns registriert ist, hast du in Kürze eine Nachricht mit einem Reset-Link erhalten.
            </p>
            <p style={{ color: "#9ca3af", fontSize: 13, marginBottom: 32 }}>
              Hinweis: Der E-Mail-Versand ist in dieser Umgebung noch nicht produktiv aktiviert.
            </p>
            <Link to="/login" style={{
              display: "inline-block", padding: "12px 28px", background: "#0A1F44",
              color: "#fff", borderRadius: 12, textDecoration: "none", fontSize: 15, fontWeight: 600,
              fontFamily: "'DM Sans', sans-serif",
            }}>
              Zurück zur Anmeldung
            </Link>
          </div>
        ) : (
          <>
            <h2 style={{ fontSize: 26, fontWeight: 700, color: "#0A1F44", marginBottom: 6, fontFamily: "'DM Sans', sans-serif" }}>
              Passwort zurücksetzen
            </h2>
            <p style={{ color: "#6b7280", fontSize: 15, marginBottom: 32, lineHeight: 1.6 }}>
              Gib deine E-Mail-Adresse ein. Wenn ein Konto vorhanden ist, erhältst du einen Reset-Link.
            </p>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <label>
                <span style={{ fontSize: 12, fontWeight: 600, color: "#6b7280", letterSpacing: "0.06em", textTransform: "uppercase", display: "block", marginBottom: 6 }}>E-Mail</span>
                <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="du@beispiel.de" style={inputStyle} autoComplete="email" />
              </label>
              <button type="submit" disabled={loading} style={{
                padding: "14px 24px", background: "#0A1F44", color: "#fff",
                border: "none", borderRadius: 12, fontSize: 15, fontWeight: 600,
                cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1,
                fontFamily: "'DM Sans', sans-serif",
              }}>
                {loading ? "Wird gesendet …" : "Reset-Link anfordern"}
              </button>
            </form>
            <p style={{ marginTop: 24, textAlign: "center", fontSize: 14, color: "#6b7280" }}>
              <Link to="/login" style={{ color: "#0A1F44", fontWeight: 500, textDecoration: "none" }}>← Zurück zur Anmeldung</Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

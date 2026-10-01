import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import {
  register,
  login,
  logout,
  changePassword,
  getTestValue,
  saveTestValue,
  getCurrentUser,
  isAuthenticated,
} from "../lib/identity.js";
import { pb } from "../lib/pb.js";

// ─── Minimal design tokens matching NeuroWays World ──────────────────────────
const teal = "#2a9d8f";
const bg = "#f9fafb";
const textDark = "#2d3748";
const textMuted = "#6b7280";
const borderColor = "#e2e8f0";

// ─── Reusable primitives ──────────────────────────────────────────────────────
function Card({ children, style }) {
  return (
    <div style={{
      background: "#fff",
      border: `1px solid ${borderColor}`,
      borderRadius: 16,
      padding: "2rem",
      marginBottom: "1.5rem",
      ...style,
    }}>
      {children}
    </div>
  );
}

function Input({ label, type = "text", value, onChange, placeholder }) {
  return (
    <label style={{ display: "block", marginBottom: "1rem" }}>
      <span style={{ display: "block", fontSize: 13, fontWeight: 600, color: textMuted, marginBottom: 6, letterSpacing: "0.04em", textTransform: "uppercase" }}>
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: "0.75rem 1rem",
          border: `1.5px solid ${borderColor}`,
          borderRadius: 10,
          fontSize: 15,
          color: textDark,
          background: bg,
          outline: "none",
          boxSizing: "border-box",
          fontFamily: "inherit",
        }}
      />
    </label>
  );
}

function Btn({ children, onClick, variant = "primary", disabled, small }) {
  const isPrimary = variant === "primary";
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: small ? "0.5rem 1.2rem" : "0.85rem 2rem",
        background: isPrimary ? teal : "transparent",
        color: isPrimary ? "#fff" : teal,
        border: `1.5px solid ${isPrimary ? teal : teal}`,
        borderRadius: 10,
        fontSize: small ? 13 : 15,
        fontWeight: 600,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.6 : 1,
        fontFamily: "inherit",
        marginRight: 8,
        marginTop: 4,
        transition: "opacity 0.15s",
      }}
    >
      {children}
    </button>
  );
}

function Alert({ type, message }) {
  const colors = {
    error: { bg: "#fef2f2", border: "#fca5a5", text: "#b91c1c" },
    success: { bg: "#f0fdf4", border: "#86efac", text: "#166534" },
    info: { bg: "#eff6ff", border: "#93c5fd", text: "#1e40af" },
  };
  const c = colors[type] || colors.info;
  return (
    <div style={{
      background: c.bg,
      border: `1px solid ${c.border}`,
      color: c.text,
      borderRadius: 10,
      padding: "0.75rem 1rem",
      fontSize: 14,
      marginBottom: "1rem",
      lineHeight: 1.5,
    }}>
      {message}
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <h2 style={{ fontSize: 17, fontWeight: 700, color: textDark, marginBottom: "1.25rem", marginTop: 0 }}>
      {children}
    </h2>
  );
}

function EventBadge({ type, success }) {
  const colors = {
    REGISTRATION: "#2a9d8f",
    LOGIN: "#2a9d8f",
    LOGIN_FAILED: "#dc2626",
    LOGIN_BLOCKED: "#d97706",
    LOGOUT: "#6b7280",
    PASSWORD_RESET_REQUESTED: "#6366f1",
    PASSWORD_CHANGED: "#2a9d8f",
  };
  return (
    <span style={{
      display: "inline-block",
      padding: "2px 8px",
      borderRadius: 6,
      fontSize: 11,
      fontWeight: 700,
      background: (colors[type] || "#6b7280") + "22",
      color: colors[type] || "#6b7280",
      letterSpacing: "0.03em",
    }}>
      {success === false ? "✗" : "✓"} {type}
    </span>
  );
}

// ─── Panel: Register ──────────────────────────────────────────────────────────
function RegisterPanel({ onSuccess }) {
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setErr(null);
    setLoading(true);
    try {
      await register({ email, password, passwordConfirm: confirm, displayName });
      onSuccess();
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <SectionTitle>Registrieren</SectionTitle>
      {err && <Alert type="error" message={err} />}
      <Input label="E-Mail" type="email" value={email} onChange={setEmail} placeholder="du@beispiel.de" />
      <Input label="Anzeigename" value={displayName} onChange={setDisplayName} placeholder="Dein Name" />
      <Input label="Passwort" type="password" value={password} onChange={setPassword} placeholder="Mindestens 8 Zeichen" />
      <Input label="Passwort bestätigen" type="password" value={confirm} onChange={setConfirm} placeholder="Wiederholen" />
      <Btn onClick={handleSubmit} disabled={loading}>{loading ? "Wird registriert …" : "Konto erstellen"}</Btn>
    </Card>
  );
}

// ─── Panel: Login ─────────────────────────────────────────────────────────────
function LoginPanel({ onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setErr(null);
    setLoading(true);
    try {
      await login({ email, password });
      onSuccess();
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <SectionTitle>Anmelden</SectionTitle>
      {err && <Alert type="error" message={err} />}
      <Input label="E-Mail" type="email" value={email} onChange={setEmail} />
      <Input label="Passwort" type="password" value={password} onChange={setPassword} />
      <Btn onClick={handleSubmit} disabled={loading}>{loading ? "Wird angemeldet …" : "Anmelden"}</Btn>
    </Card>
  );
}

// ─── Panel: Logged-in dashboard ───────────────────────────────────────────────
function DashboardPanel({ user, onLogout, auditEntries }) {
  const [testValue, setTestValue] = useState("");
  const [savedValue, setSavedValue] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState(null);

  // Password change
  const [oldPw, setOldPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [newPwConfirm, setNewPwConfirm] = useState("");
  const [pwErr, setPwErr] = useState(null);
  const [pwMsg, setPwMsg] = useState(null);

  const loadValue = useCallback(async () => {
    const v = await getTestValue();
    setSavedValue(v);
    if (v) setTestValue(v.test_value || "");
  }, []);

  useEffect(() => { loadValue(); }, [loadValue]);

  const handleSave = async () => {
    setSaving(true);
    setSaveMsg(null);
    try {
      await saveTestValue(testValue);
      setSaveMsg({ type: "success", text: "Wert gespeichert." });
      await loadValue();
    } catch (e) {
      setSaveMsg({ type: "error", text: e.message });
    } finally {
      setSaving(false);
    }
  };

  const handlePwChange = async () => {
    setPwErr(null);
    setPwMsg(null);
    try {
      await changePassword({ currentPassword: oldPw, newPassword: newPw, newPasswordConfirm: newPwConfirm });
      setPwMsg("Passwort erfolgreich geändert. Bitte melde dich erneut an.");
      setOldPw(""); setNewPw(""); setNewPwConfirm("");
    } catch (e) {
      setPwErr(e.message);
    }
  };

  return (
    <div>
      {/* Identity context */}
      <Card style={{ borderLeft: `4px solid ${teal}` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <p style={{ margin: 0, fontSize: 13, color: textMuted, textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600 }}>Angemeldet als</p>
            <p style={{ margin: "4px 0 0", fontSize: 20, fontWeight: 700, color: textDark }}>{user.display_name || user.email}</p>
            <p style={{ margin: "2px 0 0", fontSize: 13, color: textMuted }}>{user.email}</p>
            <p style={{ margin: "4px 0 0", fontSize: 12, color: textMuted, fontFamily: "monospace" }}>ID: {user.id}</p>
            <span style={{
              display: "inline-block", marginTop: 8,
              padding: "2px 10px", borderRadius: 20, fontSize: 12, fontWeight: 700,
              background: "#f0fdf4", color: "#166534", border: "1px solid #86efac",
            }}>
              {user.account_status || "ACTIVE"}
            </span>
          </div>
          <Btn variant="secondary" onClick={onLogout} small>Abmelden</Btn>
        </div>
      </Card>

      {/* Personal test value — isolation proof */}
      <Card>
        <SectionTitle>Persönlicher Testwert</SectionTitle>
        <p style={{ fontSize: 14, color: textMuted, marginTop: 0, marginBottom: "1rem" }}>
          Dieser Wert ist ausschließlich mit deiner internen Benutzer-ID ({user.id.slice(0, 8)}…) verknüpft.
          Andere Benutzer können ihn weder lesen noch verändern.
        </p>
        {savedValue && (
          <Alert type="info" message={`Gespeicherter Wert: „${savedValue.test_value}"`} />
        )}
        {saveMsg && <Alert type={saveMsg.type} message={saveMsg.text} />}
        <Input label="Mein NeuroWays-Testwert" value={testValue} onChange={setTestValue} placeholder="z. B. Mein aktueller Testfortschritt" />
        <Btn onClick={handleSave} disabled={saving}>{saving ? "Wird gespeichert …" : "Wert speichern"}</Btn>
      </Card>

      {/* Password change */}
      <Card>
        <SectionTitle>Passwort ändern</SectionTitle>
        {pwErr && <Alert type="error" message={pwErr} />}
        {pwMsg && <Alert type="success" message={pwMsg} />}
        <Input label="Aktuelles Passwort" type="password" value={oldPw} onChange={setOldPw} />
        <Input label="Neues Passwort" type="password" value={newPw} onChange={setNewPw} />
        <Input label="Neues Passwort bestätigen" type="password" value={newPwConfirm} onChange={setNewPwConfirm} />
        <Btn onClick={handlePwChange} variant="secondary">Passwort ändern</Btn>
      </Card>

      {/* Security event log */}
      <Card>
        <SectionTitle>Sicherheitsereignisse</SectionTitle>
        {auditEntries.length === 0 ? (
          <p style={{ color: textMuted, fontSize: 14 }}>Noch keine Ereignisse aufgezeichnet.</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {auditEntries.map(e => (
              <div key={e.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "0.5rem 0", borderBottom: `1px solid ${borderColor}` }}>
                <EventBadge type={e.event_type} success={e.success} />
                <span style={{ fontSize: 12, color: textMuted, fontFamily: "monospace" }}>
                  {new Date(e.created).toLocaleString("de-DE")}
                </span>
                {e.note && <span style={{ fontSize: 12, color: textMuted }}>— {e.note}</span>}
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function IdentityPoc() {
  const [view, setView] = useState("login"); // login | register | dashboard
  const [user, setUser] = useState(null);
  const [auditEntries, setAuditEntries] = useState([]);
  const TOKEN = node => node; // unused — SDK manages token

  const syncUser = useCallback(() => {
    const u = getCurrentUser();
    setUser(u);
    if (u) setView("dashboard");
    else setView("login");
  }, []);

  const loadAuditLog = useCallback(async () => {
    try {
      const TOKEN_ADMIN = null; // audit log is admin-only; we load it via admin token in shell
      // The audit log is write-open (createRule: ""), but listRule: null = admin only.
      // In the POC UI we show entries from pb with admin context isn't available from browser.
      // Instead we display a placeholder — the real audit verification is done in the test report.
      setAuditEntries([]);
    } catch (_) {
      setAuditEntries([]);
    }
  }, []);

  // Listen to auth changes
  useEffect(() => {
    const unsub = pb.authStore.onChange(() => syncUser());
    syncUser();
    return unsub;
  }, [syncUser]);

  useEffect(() => {
    if (user) loadAuditLog();
  }, [user, loadAuditLog]);

  const handleLogout = async () => {
    await logout();
    syncUser();
  };

  return (
    <div style={{ maxWidth: 640, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'DM Sans', sans-serif", color: textDark }}>
      {/* Header */}
      <div style={{ marginBottom: "2rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <span style={{ background: teal, color: "#fff", borderRadius: 8, padding: "4px 10px", fontSize: 11, fontWeight: 700, letterSpacing: "0.06em" }}>
            POC
          </span>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: textDark }}>
            NW-IDENTITY-POC-001
          </h1>
        </div>
        <p style={{ margin: 0, fontSize: 14, color: textMuted, lineHeight: 1.6 }}>
          Proof of Identity — Identitätsschicht v0.1.0 · Grundlage: NW-IDENTITY-001
        </p>
      </div>

      {/* Tab switcher (only when logged out) */}
      {!user && (
        <div style={{ display: "flex", gap: 8, marginBottom: "1.5rem" }}>
          {["login", "register"].map(v => (
            <button
              key={v}
              onClick={() => setView(v)}
              style={{
                padding: "0.5rem 1.5rem",
                borderRadius: 10,
                border: `1.5px solid ${view === v ? teal : borderColor}`,
                background: view === v ? teal + "11" : "#fff",
                color: view === v ? teal : textMuted,
                fontWeight: 600,
                fontSize: 14,
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              {v === "login" ? "Anmelden" : "Registrieren"}
            </button>
          ))}
        </div>
      )}

      {/* Content */}
      {!user && view === "login" && (
        <LoginPanel onSuccess={syncUser} />
      )}
      {!user && view === "register" && (
        <RegisterPanel onSuccess={syncUser} />
      )}
      {user && (
        <DashboardPanel user={user} onLogout={handleLogout} auditEntries={auditEntries} />
      )}

      {/* Status bar */}
      <div style={{
        marginTop: "2rem", padding: "0.75rem 1rem",
        background: "#fff", border: `1px solid ${borderColor}`,
        borderRadius: 10, fontSize: 12, color: textMuted,
        display: "flex", gap: 16, flexWrap: "wrap",
      }}>
        <span>Status: <strong style={{ color: user ? "#166534" : "#6b7280" }}>{user ? "Angemeldet" : "Nicht angemeldet"}</strong></span>
        <span>Sitzung: <strong>{isAuthenticated() ? "aktiv" : "keine"}</strong></span>
        {user && <span>UserID: <code style={{ fontFamily: "monospace", fontSize: 11 }}>{user.id}</code></span>}
      </div>
    </div>
  );
}

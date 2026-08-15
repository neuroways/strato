/**
 * NW-IDENTITY-002 — Protected Dashboard / Start Page
 * First protected landing after login.
 */
import { Link, useNavigate } from "react-router";
import { useAuth } from "../lib/authContext.jsx";
import ArrowRight from "icon:arrow-right";
import Package from "icon:package";
import Hammer from "icon:hammer";
import ClipboardList from "icon:clipboard-list";
import BarChart2 from "icon:bar-chart-2";
import LogOut from "icon:log-out";

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/login", { replace: true });
  }

  const displayName = user?.display_name || user?.email?.split("@")[0] || "Benutzer";
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Guten Morgen" : hour < 17 ? "Hallo" : "Guten Abend";

  return (
    <main style={{ maxWidth: 640, margin: "0 auto", padding: "36px 20px 120px", fontFamily: "'DM Sans', sans-serif" }}>

      {/* Greeting */}
      <div style={{ marginBottom: 36 }}>
        <p style={{ fontSize: 13, color: "#008CA8", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 6 }}>
          {greeting},
        </p>
        <h1 style={{ fontSize: 30, fontWeight: 800, color: "#0A1F44", marginBottom: 10, lineHeight: 1.2 }}>
          {displayName}
        </h1>
        <p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.7 }}>
          Schön, dass du da bist. Beobachte deinen Energiezustand oder verwalte deine Bereiche.
        </p>
      </div>

      {/* Brand wave */}
      <div style={{ marginBottom: 36 }}>
        <svg viewBox="0 0 400 28" fill="none" style={{ width: "100%", maxWidth: 320 }}>
          <defs>
            <linearGradient id="dg" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0A1F44"/>
              <stop offset="30%" stopColor="#008CA8"/>
              <stop offset="60%" stopColor="#7B4BA2"/>
              <stop offset="85%" stopColor="#E2A83B"/>
            </linearGradient>
          </defs>
          <path d="M4 18 Q40 5 76 18 Q112 31 148 18 Q184 5 220 18 Q256 31 292 16" stroke="url(#dg)" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
          <circle cx="308" cy="15" r="4.5" fill="#E2A83B"/>
          <line x1="320" y1="15" x2="345" y2="15" stroke="#E2A83B" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
      </div>

      {/* Primary CTA */}
      <Link to="/checkin" style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "24px 24px", borderRadius: 20, background: "#0A1F44",
        textDecoration: "none", marginBottom: 14,
      }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <ClipboardList size={16} color="rgba(255,255,255,0.6)" />
            <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>Energy Navigator</span>
          </div>
          <p style={{ color: "#fff", fontWeight: 700, fontSize: 19, marginBottom: 2 }}>Check-in starten</p>
          <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 13 }}>6 Fragen · ca. 2 Minuten</p>
        </div>
        <div style={{ width: 44, height: 44, borderRadius: 14, background: "rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <ArrowRight size={20} color="#fff" />
        </div>
      </Link>

      {/* Verlauf quick link */}
      <Link to="/history" style={{
        display: "flex", alignItems: "center", gap: 14,
        padding: "16px 20px", borderRadius: 16, background: "#f6f4f1",
        textDecoration: "none", marginBottom: 24, border: "1px solid #eae8e5",
      }}>
        <div style={{ width: 40, height: 40, borderRadius: 12, background: "#e8f5f3", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <BarChart2 size={18} color="#2a9d8f" />
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ fontWeight: 600, fontSize: 15, color: "#0A1F44", marginBottom: 1 }}>Mein Verlauf</p>
          <p style={{ fontSize: 13, color: "#9ca3af" }}>Bisherige Check-ins ansehen</p>
        </div>
        <ArrowRight size={16} color="#b0b8c4" />
      </Link>

      {/* Coming-soon tiles */}
      <p style={{ fontSize: 12, fontWeight: 700, color: "#b0b8c4", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>
        Demnächst verfügbar
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 36 }}>
        {[
          { Icon: Package, label: "Meine Pakete",  sub: "Zusammenstellen",      color: "#008CA8", bg: "#f0fafd" },
          { Icon: Hammer,  label: "Meine Builds",  sub: "Installationspakete",  color: "#7B4BA2", bg: "#f8f0fd" },
        ].map(({ Icon, label, sub, color, bg }) => (
          <div key={label} style={{ padding: "16px 16px", borderRadius: 16, background: "#fafafa", border: "1px solid #e5e5e5", opacity: 0.6 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: bg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10 }}>
              <Icon size={18} color={color} />
            </div>
            <p style={{ fontWeight: 600, fontSize: 14, color: "#0A1F44", marginBottom: 2 }}>{label}</p>
            <p style={{ fontSize: 12, color: "#9ca3af" }}>{sub}</p>
            <span style={{ display: "inline-block", marginTop: 8, fontSize: 10, fontWeight: 700, color: "#b0b8c4", background: "#f0f0f0", padding: "2px 7px", borderRadius: 5, letterSpacing: "0.04em" }}>BALD</span>
          </div>
        ))}
      </div>

      {/* Account info + logout */}
      <div style={{ padding: "16px 20px", borderRadius: 16, background: "#f6f4f1", border: "1px solid #eae8e5", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
        <div style={{ minWidth: 0 }}>
          <p style={{ fontSize: 12, color: "#9ca3af", marginBottom: 2 }}>Angemeldet als</p>
          <p style={{ fontSize: 14, fontWeight: 600, color: "#0A1F44", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user?.email}</p>
        </div>
        <button onClick={handleLogout} style={{
          display: "flex", alignItems: "center", gap: 6, padding: "8px 14px",
          background: "#fff", border: "1px solid #e5e5e5", borderRadius: 10,
          cursor: "pointer", fontSize: 13, fontWeight: 500, color: "#6b7280",
          fontFamily: "'DM Sans', sans-serif", flexShrink: 0,
        }}>
          <LogOut size={14} />
          Abmelden
        </button>
      </div>
    </main>
  );
}

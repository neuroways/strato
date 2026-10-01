/**
 * NW-IDENTITY-002 — Auth-aware Navigation
 * Reflects full auth state: public vs. protected nav.
 */
import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../lib/authContext.jsx";
import Home from "icon:home";
import ClipboardList from "icon:clipboard-list";
import BarChart2 from "icon:bar-chart-2";
import Package from "icon:package";
import Hammer from "icon:hammer";
import LogOut from "icon:log-out";
import User from "icon:user";

export default function AuthNav() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/login", { replace: true });
  }

  if (!user) {
    return (
      <header style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 24px", height: 60, background: "#fff",
        borderBottom: "1px solid #e5e5e5", position: "sticky", top: 0, zIndex: 40,
      }}>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 17, color: "#0A1F44", letterSpacing: "0.12em" }}>
          NEUROWAYS
        </span>
        <div style={{ display: "flex", gap: 8 }}>
          <NavLink to="/login"    style={({ isActive }) => pillStyle(isActive)}>Anmelden</NavLink>
          <NavLink to="/register" style={() => pillStyle(false, true)}>Registrieren</NavLink>
        </div>
      </header>
    );
  }

  const mainLinks = [
    { to: "/dashboard", label: "Start",       Icon: Home,          end: true },
    { to: "/checkin",   label: "Check-in",    Icon: ClipboardList, end: false },
    { to: "/history",   label: "Meine Reise", Icon: BarChart2,     end: false },
  ];
  const extraLinks = [
    { to: "/my-packages", label: "Meine Pakete", Icon: Package, end: false, soon: true },
    { to: "/my-builds",   label: "Meine Builds", Icon: Hammer,  end: false, soon: true },
  ];

  return (
    <>
      {/* ── Desktop top nav ── */}
      <header className="hidden md:flex" style={{
        alignItems: "center", justifyContent: "space-between",
        padding: "0 32px", height: 64, background: "#fff",
        borderBottom: "1px solid #e5e5e5", position: "sticky", top: 0, zIndex: 40,
      }}>
        {/* Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 10, background: "#0A1F44", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#fff", fontWeight: 800, fontSize: 14 }}>N</span>
          </div>
          <span style={{ fontWeight: 700, fontSize: 15, color: "#0A1F44", letterSpacing: "0.08em", fontFamily: "'DM Sans', sans-serif" }}>NEUROWAYS</span>
        </div>

        {/* Links */}
        <nav style={{ display: "flex", alignItems: "center", gap: 2 }}>
          {mainLinks.map(({ to, label, Icon, end }) => (
            <NavLink key={to} to={to} end={end} style={({ isActive }) => linkStyle(isActive)}>
              <Icon size={14} />
              {label}
            </NavLink>
          ))}
          <div style={{ width: 1, height: 18, background: "#e5e5e5", margin: "0 6px" }} />
          {extraLinks.map(({ to, label, Icon }) => (
            <span key={to} style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 10, fontSize: 13, color: "#b0b8c4", cursor: "default", userSelect: "none" }}>
              <Icon size={13} />
              {label}
              <span style={{ fontSize: 10, background: "#f0f0f0", color: "#b0b8c4", padding: "1px 5px", borderRadius: 5, letterSpacing: "0.04em" }}>Bald</span>
            </span>
          ))}
          <div style={{ width: 1, height: 18, background: "#e5e5e5", margin: "0 6px" }} />
          <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "4px 10px", borderRadius: 10, background: "#f6f4f1" }}>
            <User size={13} color="#0A1F44" />
            <span style={{ fontSize: 12, color: "#0A1F44", fontWeight: 600, maxWidth: 130, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {user.display_name || user.email?.split("@")[0]}
            </span>
          </div>
          <button onClick={handleLogout} style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 10, fontSize: 13, fontWeight: 500, background: "transparent", border: "none", cursor: "pointer", color: "#6b7280", fontFamily: "'DM Sans', sans-serif" }}>
            <LogOut size={14} />
            Abmelden
          </button>
        </nav>
      </header>

      {/* ── Mobile bottom nav ── */}
      <nav className="md:hidden" style={{
        position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 40,
        background: "#fff", borderTop: "1px solid #e5e5e5",
        display: "flex", alignItems: "center", justifyContent: "space-around",
        padding: "4px 0 calc(4px + env(safe-area-inset-bottom))",
      }}>
        {mainLinks.map(({ to, label, Icon, end }) => (
          <NavLink key={to} to={to} end={end} style={({ isActive }) => mobileTabStyle(isActive)}>
            {({ isActive }) => (
              <>
                <div style={{ width: 36, height: 36, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", background: isActive ? "#f0f4fa" : "transparent" }}>
                  <Icon size={18} color={isActive ? "#0A1F44" : "#9ca3af"} />
                </div>
                <span style={{ fontSize: 10, fontWeight: 500 }}>{label}</span>
              </>
            )}
          </NavLink>
        ))}
        <button onClick={handleLogout} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, padding: "4px 12px", background: "none", border: "none", cursor: "pointer", color: "#9ca3af", minWidth: 56, fontFamily: "'DM Sans', sans-serif" }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <LogOut size={18} color="#9ca3af" />
          </div>
          <span style={{ fontSize: 10, fontWeight: 500 }}>Abmelden</span>
        </button>
      </nav>
    </>
  );
}

function pillStyle(isActive, primary = false) {
  if (primary) return { padding: "7px 18px", borderRadius: 10, fontSize: 14, fontWeight: 600, textDecoration: "none", background: "#0A1F44", color: "#fff" };
  return { padding: "7px 18px", borderRadius: 10, fontSize: 14, fontWeight: 500, textDecoration: "none", color: isActive ? "#0A1F44" : "#6b7280", background: isActive ? "#f0f4fa" : "transparent" };
}

function linkStyle(isActive) {
  return { display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 10, fontSize: 13, fontWeight: 500, textDecoration: "none", color: isActive ? "#0A1F44" : "#6b7280", background: isActive ? "#f0f4fa" : "transparent", transition: "all 0.15s" };
}

function mobileTabStyle(isActive) {
  return { display: "flex", flexDirection: "column", alignItems: "center", gap: 3, padding: "4px 12px", textDecoration: "none", minWidth: 56, color: isActive ? "#0A1F44" : "#9ca3af" };
}

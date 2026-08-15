/**
 * NW-IDENTITY-002 — Protected Route Guard
 * Redirects unauthenticated users to /login.
 * LOCKED/DEACTIVATED accounts are also redirected.
 */
import { Navigate, useLocation } from "react-router";
import { useAuth } from "../lib/authContext.jsx";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        minHeight: "100vh", background: "#fff"
      }}>
        <div style={{
          width: 40, height: 40, borderRadius: "50%",
          border: "2.5px solid #e5e5e5", borderTopColor: "#0A1F44",
          animation: "spin 0.8s linear infinite"
        }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (user.account_status === "LOCKED") {
    return <Navigate to="/login" state={{ error: "locked" }} replace />;
  }

  if (user.account_status === "DEACTIVATED") {
    return <Navigate to="/login" state={{ error: "deactivated" }} replace />;
  }

  return children;
}

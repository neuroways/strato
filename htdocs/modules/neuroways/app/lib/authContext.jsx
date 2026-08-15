/**
 * NW-IDENTITY-002 — Global Auth State
 * Provides auth context to the entire app. Reads exclusively from pb.authStore.
 * Never derives identity from URL or form input.
 */
import { createContext, useContext, useState, useEffect } from "react";
import { pb } from "./pb.js";
import { refreshAuthOnStartup, getCurrentUser, logout as identityLogout } from "./identity.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // On mount: refresh token, then sync user state
    refreshAuthOnStartup().then(() => {
      setUser(getCurrentUser());
      setLoading(false);
    });

    // Listen to any auth store changes (login/logout from anywhere)
    const unsub = pb.authStore.onChange(() => {
      setUser(getCurrentUser());
    });

    return unsub;
  }, []);

  async function logout() {
    await identityLogout();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

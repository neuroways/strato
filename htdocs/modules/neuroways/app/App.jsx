import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { AuthProvider } from "./lib/authContext.jsx";
import AuthNav from "./components/AuthNav.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

// Auth pages (public)
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import ForgotPasswordPage from "./pages/ForgotPasswordPage.jsx";

// Protected pages
import DashboardPage from "./pages/DashboardPage.jsx";
import WorkspacePage from "./pages/WorkspacePage.jsx";
import CheckIn from "./pages/CheckIn.jsx";
import Result from "./pages/Result.jsx";
import History from "./pages/History.jsx";
import Journey from "./pages/Journey.jsx";
import Privacy from "./pages/Privacy.jsx";

// Dev/POC (kept but not in main nav)
import IdentityPoc from "./pages/IdentityPoc.jsx";
import PromptLibraryPage  from "./pages/PromptLibraryPage.jsx";
import ModuleManagerPage  from "./pages/ModuleManagerPage.jsx";
import ModuleBuilderPage  from "./pages/ModuleBuilderPage.jsx";
import MethodBuilderPage   from "./pages/MethodBuilderPage.jsx";
import SessionBuilderPage  from "./pages/SessionBuilderPage.jsx";

const basename = new URL(document.baseURI).pathname.replace(/\/$/, "");

function Layout({ children, showNav = true }) {
  return (
    <div style={{ minHeight: "100vh", background: "#fff" }}>
      {showNav && <AuthNav />}
      <div>{children}</div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter basename={basename}>
      <AuthProvider>
        <Routes>
          {/* Public auth routes — no nav */}
          <Route path="/login"           element={<LoginPage />} />
          <Route path="/register"        element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />

          {/* Protected routes — with AuthNav */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Layout><WorkspacePage /></Layout>
            </ProtectedRoute>
          } />

          <Route path="/checkin" element={
            <ProtectedRoute>
              <Layout><CheckIn /></Layout>
            </ProtectedRoute>
          } />

          <Route path="/result/:id" element={
            <ProtectedRoute>
              <Layout><Result /></Layout>
            </ProtectedRoute>
          } />

          <Route path="/history" element={
            <ProtectedRoute>
              <Layout><Journey /></Layout>
            </ProtectedRoute>
          } />

          <Route path="/privacy" element={
            <ProtectedRoute>
              <Layout><Privacy /></Layout>
            </ProtectedRoute>
          } />

          {/* Dev POC — accessible without auth for testing */}
          <Route path="/identity-poc" element={<Layout><IdentityPoc /></Layout>} />

          {/* Admin: Prompt Library — protected, internal only */}
          <Route path="/admin/prompts" element={
            <ProtectedRoute>
              <Layout><PromptLibraryPage /></Layout>
            </ProtectedRoute>
          } />

          {/* Admin: Module Manager */}
          <Route path="/admin/modules" element={
            <ProtectedRoute>
              <Layout><ModuleManagerPage /></Layout>
            </ProtectedRoute>
          } />

          {/* Admin: Module Builder */}
          <Route path="/admin/builder" element={
            <ProtectedRoute>
              <Layout><ModuleBuilderPage /></Layout>
            </ProtectedRoute>
          } />

          {/* Admin: Method Builder */}
          <Route path="/admin/methods" element={
            <ProtectedRoute>
              <Layout><MethodBuilderPage /></Layout>
            </ProtectedRoute>
          } />

          {/* Admin: Session Builder */}
          <Route path="/admin/sessions" element={
            <ProtectedRoute>
              <Layout><SessionBuilderPage /></Layout>
            </ProtectedRoute>
          } />

          {/* Root redirect → login (if not auth'd) or dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

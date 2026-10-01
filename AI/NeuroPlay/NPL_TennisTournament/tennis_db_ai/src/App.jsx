import { useState, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router';
import { useAuthRefresh } from './lib/useAuthRefresh';
import { isAdminLoggedIn } from './lib/api';

// Admin Pages
import AdminLayout from './pages/admin/AdminLayout';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import TournamentManagement from './pages/admin/TournamentManagement';
import TournamentSettings from './pages/admin/TournamentSettings';
import PlayerManagement from './pages/admin/PlayerManagement';
import RegistrationManagement from './pages/admin/RegistrationManagement';
import CourtManagement from './pages/admin/CourtManagement';
import RoundManagement from './pages/admin/RoundManagement';
import MatchManagement from './pages/admin/MatchManagement';
import ResultManagement from './pages/admin/ResultManagement';
import ContentManagement from './pages/admin/ContentManagement';

// Public Pages
import PublicLayout from './pages/public/Layout';
import Home from './pages/public/Home';
import Tournaments from './pages/public/Tournaments';
import Schedule from './pages/public/Schedule';
import Results from './pages/public/Results';
import Players from './pages/public/Players';
import News from './pages/public/News';
import Courts from './pages/public/Courts';
import Contact from './pages/public/Contact';
import NotFound from './pages/public/NotFound';

import './index.css';

function ProtectedRoute({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
    setIsLoggedIn(isAdminLoggedIn());
  }, []);

  if (loading) return <div className="flex items-center justify-center min-h-screen">Lädt...</div>;

  return isLoggedIn ? children : <Navigate to="/admin/login" />;
}

export default function App() {
  useAuthRefresh();

  return (
    <Routes>
      {/* Admin Routes */}
      <Route path="/admin/login" element={<AdminLogin />} />
      
      <Route
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/admin" element={<Navigate to="/admin/dashboard" />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/tournaments" element={<TournamentManagement />} />
        <Route path="/admin/tournaments/:tournamentId/settings" element={<TournamentSettings />} />
        <Route path="/admin/players" element={<PlayerManagement />} />
        <Route path="/admin/registrations" element={<RegistrationManagement />} />
        <Route path="/admin/courts" element={<CourtManagement />} />
        <Route path="/admin/rounds" element={<RoundManagement />} />
        <Route path="/admin/matches" element={<MatchManagement />} />
        <Route path="/admin/results" element={<ResultManagement />} />
        <Route path="/admin/content" element={<ContentManagement />} />
      </Route>

      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/tournaments" element={<Tournaments />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/results" element={<Results />} />
        <Route path="/players" element={<Players />} />
        <Route path="/news" element={<News />} />
        <Route path="/courts" element={<Courts />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

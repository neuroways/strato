import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router';
import { initializeDatabase, pb } from './lib/pb';

// Public pages
import Home from './pages/Home';
import Register from './pages/Register';
import Participants from './pages/Participants';
import Schedule from './pages/Schedule';
import Results from './pages/Results';
import Contact from './pages/Contact';

// Admin pages
import Admin from './pages/Admin';
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import ParticipantsAdmin from './pages/admin/ParticipantsAdmin';
import TournamentAdmin from './pages/admin/TournamentAdmin';
import CourtsAdmin from './pages/admin/CourtsAdmin';
import MatchesAdmin from './pages/admin/MatchesAdmin';
import ResultsAdmin from './pages/admin/ResultsAdmin';
import ScheduleAdmin from './pages/admin/ScheduleAdmin';

// Protected Route Component
function ProtectedRoute({ children }) {
  const [isAuthed, setIsAuthed] = useState(null);

  useEffect(() => {
    setIsAuthed(pb.authStore.isValid && pb.authStore.model?.collectionId === 'admins');
  }, []);

  if (isAuthed === null) {
    return <div className="flex items-center justify-center min-h-screen">Laden...</div>;
  }

  if (!isAuthed) {
    return <Navigate to="/admin" replace />;
  }

  return <AdminLayout>{children}</AdminLayout>;
}

export default function App() {
  useEffect(() => {
    initializeDatabase();
  }, []);

  return (
    <Routes>
      {/* Public pages */}
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/participants" element={<Participants />} />
      <Route path="/schedule" element={<Schedule />} />
      <Route path="/results" element={<Results />} />
      <Route path="/contact" element={<Contact />} />

      {/* Admin pages */}
      <Route path="/admin" element={<Admin />} />
      <Route path="/admin/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/admin/tournament" element={<ProtectedRoute><TournamentAdmin /></ProtectedRoute>} />
      <Route path="/admin/participants" element={<ProtectedRoute><ParticipantsAdmin /></ProtectedRoute>} />
      <Route path="/admin/courts" element={<ProtectedRoute><CourtsAdmin /></ProtectedRoute>} />
      <Route path="/admin/matches" element={<ProtectedRoute><MatchesAdmin /></ProtectedRoute>} />
      <Route path="/admin/results" element={<ProtectedRoute><ResultsAdmin /></ProtectedRoute>} />
      <Route path="/admin/schedule" element={<ProtectedRoute><ScheduleAdmin /></ProtectedRoute>} />

      {/* 404 */}
      <Route path="*" element={<div className="min-h-screen flex items-center justify-center"><p className="text-2xl text-gray-600">Seite nicht gefunden</p></div>} />
    </Routes>
  );
}

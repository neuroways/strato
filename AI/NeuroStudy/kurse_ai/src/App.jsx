import { useState } from 'react';
import { Route, Routes, Link, useNavigate } from 'react-router';
import { LogOut, BarChart3, Users, BookOpen, CheckSquare, AlertCircle, Clock, ChevronDown } from 'lucide-react';
import AdminDashboard from './pages/AdminDashboard';
import CourseLeaderHome from './pages/CourseLeaderHome';
import FamilyPortal from './pages/FamilyPortal';
import NotFound from './pages/NotFound';
import './index.css';

// Rolle auswählen (Einstiegsseite)
function RoleSelection({ setRole }) {
  const navigate = useNavigate();

  const handleRole = (role) => {
    setRole(role);
    navigate(`/${role}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-3">Kursplattform</h1>
          <p className="text-lg text-slate-600">Wähle deine Rolle, um zu starten</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Admin */}
          <button
            onClick={() => handleRole('admin')}
            className="group bg-white rounded-lg border-2 border-slate-200 p-8 text-left hover:border-blue-500 hover:shadow-lg transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-4">
              <BarChart3 className="w-8 h-8 text-blue-600" />
              <ChevronDown className="w-5 h-5 text-slate-400 group-hover:text-blue-600 transition-colors transform group-hover:translate-y-1" />
            </div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">Administration</h2>
            <p className="text-sm text-slate-600">Kurse erstellen, Anmeldungen verwalten, Wartelisten steuern</p>
          </button>

          {/* Kursleitung */}
          <button
            onClick={() => handleRole('instructor')}
            className="group bg-white rounded-lg border-2 border-slate-200 p-8 text-left hover:border-green-500 hover:shadow-lg transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-4">
              <BookOpen className="w-8 h-8 text-green-600" />
              <ChevronDown className="w-5 h-5 text-slate-400 group-hover:text-green-600 transition-colors transform group-hover:translate-y-1" />
            </div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">Kursleitung</h2>
            <p className="text-sm text-slate-600">Kursideen einreichen, live Belegung sehen, Änderungen erkennen</p>
          </button>

          {/* Familie */}
          <button
            onClick={() => handleRole('family')}
            className="group bg-white rounded-lg border-2 border-slate-200 p-8 text-left hover:border-purple-500 hover:shadow-lg transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 text-purple-600" />
              <ChevronDown className="w-5 h-5 text-slate-400 group-hover:text-purple-600 transition-colors transform group-hover:translate-y-1" />
            </div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">Familie / Teilnehmer</h2>
            <p className="text-sm text-slate-600">Anmelden, Status verfolgen, Abmeldungen verwalten</p>
          </button>
        </div>

        <div className="mt-12 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-900">
            <strong>Hinweis:</strong> Dies ist ein Oberflächenprototyp ohne Datenspeicherung. Die Navigation zeigt die Bedienung und Statusdarstellung für jede Rolle.
          </p>
        </div>
      </div>
    </div>
  );
}

// Layout für Admin, Kursleitung, Familie (mit gemeinsamer Header)
function RoleLayout({ role, children, onLogout }) {
  const roleConfig = {
    admin: { name: 'Administration', color: 'blue', icon: BarChart3 },
    instructor: { name: 'Kursleitung', color: 'green', icon: BookOpen },
    family: { name: 'Familie & Teilnehmer', color: 'purple', icon: Users },
  };

  const config = roleConfig[role] || {};
  const Icon = config.icon;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className={`bg-${config.color}-600 text-white shadow-md`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icon className="w-6 h-6" />
            <h1 className="text-xl font-bold">{config.name}</h1>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-md transition-colors text-sm font-medium"
          >
            <LogOut className="w-4 h-4" />
            Abmelden
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  );
}

export default function App() {
  const [role, setRole] = useState(null);

  const handleLogout = () => {
    setRole(null);
  };

  const navigateBack = () => {
    setRole(null);
  };

  return (
    <Routes>
      <Route path="/" element={<RoleSelection setRole={setRole} />} />
      <Route
        path="/admin/*"
        element={
          <RoleLayout role="admin" onLogout={navigateBack}>
            <AdminDashboard />
          </RoleLayout>
        }
      />
      <Route
        path="/instructor/*"
        element={
          <RoleLayout role="instructor" onLogout={navigateBack}>
            <CourseLeaderHome />
          </RoleLayout>
        }
      />
      <Route
        path="/family/*"
        element={
          <RoleLayout role="family" onLogout={navigateBack}>
            <FamilyPortal />
          </RoleLayout>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
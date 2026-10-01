import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router';
import { pb } from '../lib/pb';

export default function AdminLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    pb.authStore.clear();
    navigate('/admin');
  };

  const isActive = (path) => location.pathname === path;

  const menuItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/admin/tournament', label: 'Turnier', icon: '⚙️' },
    { path: '/admin/participants', label: 'Teilnehmer', icon: '👥' },
    { path: '/admin/courts', label: 'Plätze', icon: '🎾' },
    { path: '/admin/matches', label: 'Matches', icon: '⏱️' },
    { path: '/admin/results', label: 'Ergebnisse', icon: '📈' },
    { path: '/admin/schedule', label: 'KI-Spielplan', icon: '🤖' }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <nav className="bg-green-900 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">🎾 Tennisturnier Admin</h1>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-semibold transition"
          >
            Abmelden
          </button>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <div className="hidden md:block w-64 bg-green-800 text-white min-h-screen">
          <div className="p-6 space-y-2">
            {menuItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-4 py-3 rounded-lg transition font-semibold ${
                  isActive(item.path)
                    ? 'bg-green-600 text-white'
                    : 'hover:bg-green-700 text-white'
                }`}
              >
                {item.icon} {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg z-50"
        >
          ☰
        </button>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden fixed inset-0 bg-green-800 text-white z-40 pt-20">
            <div className="p-4 space-y-2">
              {menuItems.map(item => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-3 rounded-lg hover:bg-green-700 font-semibold text-lg"
                >
                  {item.icon} {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 p-6 md:p-8">
          {children}
        </div>
      </div>
    </div>
  );
}

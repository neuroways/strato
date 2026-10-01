import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router';
import { adminLogout, getCurrentAdmin } from '../../lib/api';
import MenuIcon from 'icon:menu';
import XIcon from 'icon:x';
import LogOutIcon from 'icon:log-out';

export default function AdminLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const admin = getCurrentAdmin();

  function handleLogout() {
    adminLogout();
    navigate('/admin/login');
  }

  const navItems = [
    { path: '/admin/dashboard', label: 'Dashboard' },
    { path: '/admin/tournaments', label: 'Turniere' },
    { path: '/admin/players', label: 'Spieler' },
    { path: '/admin/registrations', label: 'Anmeldungen' },
    { path: '/admin/courts', label: 'Plätze' },
    { path: '/admin/rounds', label: 'Runden' },
    { path: '/admin/matches', label: 'Spiele' },
    { path: '/admin/results', label: 'Ergebnisse' },
    { path: '/admin/content', label: 'Inhalte' }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-gray-900 text-white transform transition-transform duration-300
        ${menuOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static
      `}>
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-800">
          <h1 className="text-xl font-bold">Tennis Admin</h1>
          <button onClick={() => setMenuOpen(false)} className="lg:hidden">
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) => `
                block px-6 py-3 transition ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800'
                }
              `}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-800">
          <p className="text-xs text-gray-400 mb-3">Angemeldet als:</p>
          <p className="text-sm font-semibold text-white mb-4">
            {admin?.email || 'Admin'}
          </p>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition"
          >
            <LogOutIcon className="w-4 h-4" />
            Abmelden
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 lg:px-8">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden text-gray-600"
          >
            <MenuIcon className="w-6 h-6" />
          </button>
          <h2 className="text-2xl font-bold text-gray-900">Administrationsoberfläche</h2>
          <div className="w-10 h-10" /> {/* spacer for balance */}
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6 lg:p-8">
          <Outlet />
        </main>
      </div>

      {/* Mobile overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </div>
  );
}

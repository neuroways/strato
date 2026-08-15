import { useState } from 'react';
import { NavLink, Outlet } from 'react-router';
import MenuIcon from 'icon:menu';
import XIcon from 'icon:x';

export default function PublicLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Startseite', path: '/' },
    { label: 'Turniere', path: '/tournaments' },
    { label: 'Spielplan', path: '/schedule' },
    { label: 'Ergebnisse', path: '/results' },
    { label: 'Teilnehmer', path: '/players' },
    { label: 'News', path: '/news' },
    { label: 'Plätze', path: '/courts' },
    { label: 'Kontakt', path: '/contact' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo/Brand */}
            <NavLink 
              to="/" 
              className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition"
            >
              Tennis Turnier
            </NavLink>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map(item => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-lg transition text-sm font-medium ${
                      isActive
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
            >
              {mobileMenuOpen ? (
                <XIcon className="w-6 h-6" />
              ) : (
                <MenuIcon className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden pb-4 border-t border-gray-200 space-y-1">
              {navItems.map(item => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-2 rounded-lg transition font-medium ${
                      isActive
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* About */}
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Über uns</h3>
              <p className="text-gray-600 text-sm">
                Wir organisieren Tennisturniere mit hohen Standards für Spieler und Zuschauer.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Navigation</h3>
              <ul className="space-y-2 text-sm">
                <li><NavLink to="/" className="text-gray-600 hover:text-blue-600">Startseite</NavLink></li>
                <li><NavLink to="/tournaments" className="text-gray-600 hover:text-blue-600">Turniere</NavLink></li>
                <li><NavLink to="/news" className="text-gray-600 hover:text-blue-600">News</NavLink></li>
                <li><NavLink to="/contact" className="text-gray-600 hover:text-blue-600">Kontakt</NavLink></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Rechtliches</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-600 hover:text-blue-600">Impressum</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600">Datenschutz</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-600 text-sm">
            <p>&copy; 2026 Tennis Turnier. Alle Rechte vorbehalten.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

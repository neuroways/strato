import React, { useState } from 'react';
import { Menu, X, LogOut, Settings, User, Gamepad2, BookOpen, LayoutDashboard } from 'lucide-react';

export function Navigation({ currentUser, onNavigate, onLogout, isAdmin }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavigation = (screen) => {
    onNavigate(screen);
    setMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-700 bg-slate-900/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNavigation('start')}
            className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent hover:from-blue-300 hover:to-blue-500 transition-all"
          >
            NeuroPlay
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            <button
              onClick={() => handleNavigation('catalog')}
              className="flex items-center gap-2 px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors"
            >
              <Gamepad2 className="w-4 h-4" />
              Katalog
            </button>

            {currentUser && (
              <>
                <button
                  onClick={() => handleNavigation('mygames')}
                  className="flex items-center gap-2 px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors"
                >
                  <BookOpen className="w-4 h-4" />
                  Sammlung
                </button>

                {isAdmin && (
                  <button
                    onClick={() => handleNavigation('admin')}
                    className="hidden md:flex items-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 hover:text-white transition-colors text-sm"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Admin
                  </button>
                )}
              </>
            )}
          </div>

          {/* User Menu & Hamburger */}
          <div className="flex items-center gap-3">
            {currentUser ? (
              <div className="hidden md:flex items-center gap-2">
                <button
                  onClick={() => handleNavigation('profile')}
                  className="flex items-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 hover:text-white transition-colors text-sm"
                >
                  <User className="w-4 h-4" />
                  Profil
                </button>
                <button
                  onClick={onLogout}
                  className="flex items-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 hover:text-white transition-colors text-sm"
                >
                  <LogOut className="w-4 h-4" />
                  Abmelden
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleNavigation('auth')}
                className="hidden md:flex items-center gap-2 px-4 py-2 bg-nw-primary hover:bg-nw-primary-dark rounded-lg text-white font-semibold transition-colors"
              >
                Anmelden
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 text-slate-300 hover:text-white transition-colors"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-slate-700 space-y-2 pb-4">
            <button
              onClick={() => handleNavigation('catalog')}
              className="w-full flex items-center gap-2 px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors"
            >
              <Gamepad2 className="w-4 h-4" />
              Katalog
            </button>

            {currentUser && (
              <>
                <button
                  onClick={() => handleNavigation('mygames')}
                  className="w-full flex items-center gap-2 px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors"
                >
                  <BookOpen className="w-4 h-4" />
                  Sammlung
                </button>

                <button
                  onClick={() => handleNavigation('profile')}
                  className="w-full flex items-center gap-2 px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors"
                >
                  <User className="w-4 h-4" />
                  Mein Profil
                </button>

                {isAdmin && (
                  <button
                    onClick={() => handleNavigation('admin')}
                    className="w-full flex items-center gap-2 px-4 py-3 text-blue-400 hover:text-blue-300 hover:bg-slate-800/50 rounded-lg transition-colors"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Admin
                  </button>
                )}

                <button
                  onClick={onLogout}
                  className="w-full flex items-center gap-2 px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Abmelden
                </button>
              </>
            )}

            {!currentUser && (
              <button
                onClick={() => handleNavigation('auth')}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-nw-primary hover:bg-nw-primary-dark rounded-lg text-white font-semibold transition-colors"
              >
                Anmelden / Registrieren
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

import { useLocation, Link } from 'react-router';
import { Home, Compass, MessageCircle, BookOpen, TrendingUp, Menu } from 'lucide-react';
import { useState } from 'react';

const NAV_ITEMS = [
  { label: 'Heute', path: '/', icon: Home },
  { label: 'Entdecken', path: '/entdecken', icon: Compass },
  { label: 'Coach', path: '/coach', icon: MessageCircle },
  { label: 'Sammlung', path: '/meine-aktivitaeten', icon: BookOpen },
  { label: 'Entwicklung', path: '/entwicklung', icon: TrendingUp },
  { label: 'Mehr', path: '/mehr', icon: Menu },
];

export default function Navigation() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-border-light shadow-lg md:static md:border-t-0 md:shadow-none md:bg-warm-white">
      {/* Mobile: Bottom navigation bar */}
      <div className="md:hidden flex justify-between items-center h-16 px-2">
        {NAV_ITEMS.slice(0, 5).map(item => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center justify-center w-12 h-12 rounded-lg transition-colors ${
              location.pathname === item.path
                ? 'bg-gold text-white'
                : 'text-anthrazit hover:bg-light-gray'
            }`}
            aria-label={item.label}
            onClick={() => setMobileMenuOpen(false)}
          >
            <item.icon size={24} />
          </Link>
        ))}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex flex-col items-center justify-center w-12 h-12 rounded-lg text-anthrazit hover:bg-light-gray transition-colors"
          aria-label="Menu"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile: Dropdown menu for "Mehr" */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute bottom-16 left-0 right-0 bg-white border-t border-border-light shadow-lg">
          <Link
            to="/mehr"
            className="block w-full px-4 py-3 text-left hover:bg-light-gray transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Mehr
          </Link>
        </div>
      )}

      {/* Desktop: Horizontal navigation */}
      <div className="hidden md:flex gap-1 bg-warm-white p-4 border-b border-border-light">
        {NAV_ITEMS.map(item => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
              location.pathname === item.path
                ? 'bg-deep-navy text-white'
                : 'text-anthrazit hover:bg-light-gray'
            }`}
          >
            <item.icon size={18} />
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}

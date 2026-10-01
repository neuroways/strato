import { useEffect, useState } from 'react';
import { loadNavigation, getNavigationForDevice } from '@/core/navigation/navigationService';

export function MobileNavigation({ onClose }) {
  const [navigation, setNavigation] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNav = async () => {
      try {
        const items = await loadNavigation();
        // Filter for primary area items that are enabled and visible on mobile
        const mobileNav = items.filter(item =>
          item.navigation_area === 'primary' &&
          item.is_enabled &&
          item.show_in_mobile !== false
        );
        setNavigation(mobileNav);
      } catch (err) {
        console.error('Failed to load mobile navigation:', err);
      } finally {
        setLoading(false);
      }
    };

    loadNav();
  }, []);

  // Close on escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 top-24 bg-nw-white border-t border-nw-section-gray z-30 overflow-y-auto md:hidden"
      role="navigation"
      aria-label="Mobile navigation"
    >
      <nav className="p-4 space-y-1">
        {loading ? (
          <p className="text-xs sm:text-sm text-nw-light-gray px-3 py-2">Navigation wird geladen...</p>
        ) : navigation.length === 0 ? (
          <p className="text-xs sm:text-sm text-nw-light-gray px-3 py-2">Keine Navigationselemente verfügbar</p>
        ) : (
          navigation.map(item => (
            <MobileNavItem key={item.id} item={item} onNavigate={onClose} />
          ))
        )}
      </nav>
    </div>
  );
}

function MobileNavItem({ item, onNavigate }) {
  if (item.target_type === 'group') {
    return (
      <div className="pt-2">
        <h3 className="px-3 py-2 text-xs font-bold uppercase text-nw-navy">
          {item.label}
        </h3>
      </div>
    );
  }

  const href = item.target_type === 'external' ? item.target_url : `/${item.page_id}`;

  const handleClick = () => {
    if (item.target_type !== 'external') {
      onNavigate();
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      target={item.target_type === 'external' ? '_blank' : undefined}
      rel={item.target_type === 'external' ? 'noopener noreferrer' : undefined}
      className="block px-3 py-2.5 sm:py-3 rounded-medium text-sm sm:text-base font-bold text-nw-navy hover:bg-nw-pale-blue hover:text-nw-teal transition-colors duration-fast focus:outline-2 focus:outline-nw-teal focus:outline-offset-2"
    >
      {item.label}
    </a>
  );
}

import { useEffect, useState } from 'react';
import { loadNavigation } from '@/core/navigation/navigationService';
import { loadPages } from '@/core/routing/pageRegistry';
import { ModuleNavigation } from './ModuleNavigation';

export function Sidebar() {
  const [navigation, setNavigation] = useState([]);
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [debugInfo, setDebugInfo] = useState('');

  useEffect(() => {
    const loadNav = async () => {
      try {
        const [items, pagesData] = await Promise.all([
          loadNavigation(),
          loadPages(),
        ]);
        console.log('[Sidebar] Loaded items from service:', items.length, items);
        
        // Filter for primary area items that are enabled and visible on desktop
        const desktopNav = items.filter(item => {
          return item.navigation_area === 'primary' && 
                 item.is_enabled === true && 
                 item.show_in_desktop === true;
        });
        
        console.log('[Sidebar] Filtered desktop nav items:', desktopNav.length);
        setDebugInfo(`Loaded: ${items.length}, Desktop: ${desktopNav.length}`);
        setNavigation(desktopNav);
        setPages(pagesData);
      } catch (err) {
        console.error('[Sidebar] Failed to load navigation:', err);
        setError(err);
        setDebugInfo(`Error: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    loadNav();
  }, []);

  if (loading) {
    return <div className="p-4 text-sm text-slate-500">Navigation wird geladen...</div>;
  }

  if (error) {
    return <div className="p-4 text-sm text-red-600">Navigation-Fehler: {String(error)}</div>;
  }

  return (
    <div className="flex flex-col h-full overflow-y-auto bg-nw-white">
      {/* Primary Navigation */}
      <nav className="p-4 sm:p-5 space-y-1 flex-shrink-0" aria-label="Hauptnavigation">
        {navigation.length === 0 ? (
          <div>
            <p className="text-xs sm:text-sm text-nw-charcoal">Keine Navigationselemente verfügbar</p>
            <p className="text-xs text-nw-light-gray mt-2">{debugInfo}</p>
          </div>
        ) : (
          navigation.map(item => (
            <NavItem key={item.id} item={item} pages={pages} />
          ))
        )}
      </nav>

      {/* Module Navigation */}
      <div className="p-4 sm:p-5 border-t border-nw-section-gray flex-shrink-0">
        <ModuleNavigation orientation="vertical" />
      </div>
    </div>
  );
}

function NavItem({ item, pages = [] }) {
  if (item.target_type === 'group') {
    return (
      <div className="pt-2">
        <h3 className="px-3 py-2 text-xs font-bold uppercase text-nw-navy">
          {item.label}
        </h3>
      </div>
    );
  }

  // Determine href based on page_id or target_url
  let href = '#';
  if (item.target_type === 'external' && item.target_url) {
    href = item.target_url;
  } else if (item.page_id) {
    // Find the page and use its route_path
    const page = pages.find(p => p.id === item.page_id);
    href = page ? page.route_path : `/${item.page_id}`;
  }

  return (
    <a
      href={href}
      target={item.target_type === 'external' ? '_blank' : undefined}
      rel={item.target_type === 'external' ? 'noopener noreferrer' : undefined}
      className="flex items-center gap-3 px-3 py-2.5 sm:py-3 rounded-medium text-sm sm:text-base font-bold text-nw-navy hover:bg-nw-pale-blue hover:text-nw-teal transition-colors duration-fast focus:outline-2 focus:outline-nw-teal focus:outline-offset-2"
    >
      {item.icon_key && (
        <span className="w-4 h-4 text-nw-teal flex-shrink-0" aria-hidden="true">⚛</span>
      )}
      {item.label}
    </a>
  );
}

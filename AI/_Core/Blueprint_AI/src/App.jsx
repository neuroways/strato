import { useEffect, useState, Suspense } from 'react';
import { loadPages } from '@/core/routing/pageRegistry';
import { loadModules, getEnabledModules } from '@/core/modules/moduleRegistry';
import { resolvePageForRoute, isPageAccessible } from '@/core/routing/pageResolver';
import { resolveComponent } from '@/core/routing/pageComponentRegistry';
import { resolveLayout } from '@/core/routing/layoutRegistry';

import { PlaceholderPage } from '@/page-templates/PlaceholderPage';
import { ErrorPage } from '@/page-templates/ErrorPage';
import { StandardLayout } from '@/shell/components/StandardLayout';

function App() {
  const [pages, setPages] = useState(null);
  const [modules, setModules] = useState(null);
  const [currentRoute, setCurrentRoute] = useState(() => {
    // Clean URL on initial load - remove query params added by platform
    const pathname = window.location.pathname;
    if (window.location.search && !pathname.includes('.')) {
      window.history.replaceState(null, '', pathname);
    }
    return pathname;
  });
  const [resolvedPage, setResolvedPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load initial data
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [pagesData, modulesData] = await Promise.all([
          loadPages(),
          loadModules(),
        ]);
        
        setPages(pagesData);
        setModules(modulesData);
        setLoading(false);
      } catch (err) {
        console.error('Failed to load app structure:', err);
        setError(err);
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  // Resolve current page when route or data changes
  useEffect(() => {
    const resolveCurrentPage = async () => {
      if (!pages || !modules) return;

      try {
        console.log('[App] Resolving route:', currentRoute);
        
        // Normalize route
        const route = currentRoute === '/' ? '/' : currentRoute;
        
        // Find matching page
        const resolved = await resolvePageForRoute(route, pages);
        console.log('[App] Resolved page:', resolved?.page?.page_key || 'none');

        if (resolved) {
          // Check if page is accessible (module enabled, etc.)
          const accessible = await isPageAccessible(resolved.page);
          
          if (!accessible) {
            console.log('[App] Page not accessible');
            setResolvedPage(null);
            return;
          }

          console.log('[App] Setting resolved page:', resolved.page.page_key);
          setResolvedPage(resolved);
        } else {
          // No matching page found - will show not found
          console.log('[App] No page found for route:', route);
          setResolvedPage(null);
        }
      } catch (err) {
        console.error('[App] Failed to resolve page:', err);
        setError(err);
      }
    };

    resolveCurrentPage();
  }, [currentRoute, pages, modules]);

  // Handle browser back/forward
  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Handle link clicks for client-side navigation
  useEffect(() => {
    const handleLinkClick = (e) => {
      const link = e.target.closest('a');
      
      if (!link) return;
      
      const href = link.getAttribute('href');
      
      // Only handle internal links
      if (href && href.startsWith('/') && !link.target) {
        e.preventDefault();
        setCurrentRoute(href);
        window.history.pushState(null, '', href);
      }
    };

    document.addEventListener('click', handleLinkClick);
    return () => document.removeEventListener('click', handleLinkClick);
  }, []);

  // Loading state
  if (loading) {
    return (
      <StandardLayout>
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-2 h-2 bg-slate-900 rounded-full animate-pulse"></div>
              <span className="text-slate-600">NeuroWays wird geladen...</span>
            </div>
          </div>
        </div>
      </StandardLayout>
    );
  }

  // Data load error
  if (error) {
    return (
      <StandardLayout>
        <div className="text-center py-12">
          <h2 className="text-xl font-bold text-red-600 mb-2">Fehler beim Laden der App-Struktur</h2>
          <p className="text-slate-600 mb-6">Bitte versuche die Seite zu aktualisieren.</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-nw-navy text-nw-white rounded-medium hover:bg-nw-teal transition-colors duration-fast"
          >
            Seite aktualisieren
          </button>
        </div>
      </StandardLayout>
    );
  }

  // No pages loaded
  if (!pages || pages.length === 0) {
    return (
      <StandardLayout>
        <div className="text-center py-12">
          <h2 className="text-xl font-bold text-slate-900 mb-2">Keine Seiten verfügbar</h2>
          <p className="text-slate-600">Die App-Struktur konnte nicht geladen werden.</p>
        </div>
      </StandardLayout>
    );
  }

  // Page not found or not accessible - redirect to home
  if (!resolvedPage) {
    // Redirect to home if page is not found
    if (currentRoute !== '/') {
      setTimeout(() => {
        setCurrentRoute('/');
        window.history.replaceState(null, '', '/');
      }, 300);
    }
    
    return (
      <StandardLayout>
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <p className="text-nw-charcoal">Seite wird geladen...</p>
          </div>
        </div>
      </StandardLayout>
    );
  }

  // Render resolved page with layout
  const LayoutComponent = resolvedPage.layout;
  const PageComponent = resolvedPage.component;

  return (
    <LayoutComponent breadcrumbs={resolvedPage.breadcrumb}>
      <Suspense fallback={<PlaceholderPage title="Seite wird geladen..." pageKey="loading" />}>
        <PageComponent />
      </Suspense>
    </LayoutComponent>
  );
}

export default App;

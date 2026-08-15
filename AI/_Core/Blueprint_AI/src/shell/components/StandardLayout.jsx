import { useState } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { MobileNavigation } from './MobileNavigation';
import { Breadcrumbs } from './Breadcrumbs';

export function StandardLayout({ children, breadcrumbs = [] }) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-nw-soft-white">
      {/* Header */}
      <Header 
        onMobileMenuToggle={() => setIsMobileNavOpen(!isMobileNavOpen)}
        isMobileNavOpen={isMobileNavOpen}
      />

      <div className="flex flex-1 pt-24 sm:pt-24 md:pt-28">
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex md:w-64 lg:w-72 bg-nw-white border-r border-nw-section-gray flex-col overflow-y-auto">
          <Sidebar />
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col bg-nw-soft-white min-h-0">
          {/* Breadcrumbs */}
          {breadcrumbs.length > 0 && (
            <nav className="border-b border-nw-section-gray bg-nw-white px-4 py-3 sm:px-6 sticky top-24 sm:top-24 md:top-28 z-20" aria-label="Breadcrumbs">
              <Breadcrumbs items={breadcrumbs} />
            </nav>
          )}

          {/* Page Content */}
          <div className="flex-1 p-4 sm:p-6 max-w-6xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Navigation */}
      {isMobileNavOpen && (
        <MobileNavigation onClose={() => setIsMobileNavOpen(false)} />
      )}
    </div>
  );
}

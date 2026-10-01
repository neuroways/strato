export function Header({ onMobileMenuToggle, isMobileNavOpen }) {
  return (
    <header className="fixed top-0 left-0 right-0 h-24 md:h-28 bg-nw-white border-b border-nw-section-gray z-40 flex items-center px-4 md:px-6">
      <div className="flex items-center justify-between w-full h-full">
        {/* Logo */}
        <a href="/" className="flex items-center gap-0 h-full focus:outline-2 focus:outline-nw-teal focus:outline-offset-2 rounded-small">
          <img 
            src="/static/neuroways-wordmark.png" 
            alt="NeuroWays – Startseite" 
            className="h-full w-auto object-contain max-h-20 sm:max-h-24"
          />
        </a>

        {/* Mobile Menu Button */}
        <button
          onClick={onMobileMenuToggle}
          className="md:hidden p-2.5 rounded-medium hover:bg-nw-pale-blue text-nw-navy transition-colors duration-fast focus:outline-2 focus:outline-nw-teal focus:outline-offset-2"
          aria-label={isMobileNavOpen ? 'Menü schließen' : 'Menü öffnen'}
          aria-expanded={isMobileNavOpen}
          aria-controls="mobile-navigation"
        >
          <svg
            className="w-6 h-6 text-nw-navy"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            {isMobileNavOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>
    </header>
  );
}

export function PlaceholderPage({ pageKey, title }) {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-lg bg-gray-100 mb-6">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m0 0h6m0 0h-6m0 0h-6" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{title || pageKey}</h1>
        <p className="text-gray-500 mb-6">Diese Seite wird noch vorbereitet.</p>
        <a
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-medium bg-nw-navy text-nw-white text-base font-bold hover:bg-nw-teal transition-colors duration-fast"
        >
          Zurück zur Übersicht
        </a>
      </div>
    </div>
  );
}

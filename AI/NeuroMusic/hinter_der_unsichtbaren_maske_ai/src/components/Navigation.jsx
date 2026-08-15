import { Link } from 'react-router';
import { ChevronLeft } from 'lucide-react';

export function Navigation() {
  return (
    <nav style={{ backgroundColor: 'rgba(252, 248, 245, 0.95)', borderBottomColor: 'rgba(57, 52, 61, 0.1)' }} className="fixed top-0 left-0 right-0 backdrop-blur-sm border-b z-40">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        <Link to="/" style={{ color: 'var(--color-dark-text)' }} className="text-sm md:text-base font-bold hover:opacity-70 transition-opacity">
          Album
        </Link>
        <div className="flex gap-4 md:gap-8">
          <Link to="/" style={{ color: 'var(--color-dark-text)' }} className="text-sm md:text-base hover:opacity-70 transition-opacity">
            Songs
          </Link>
        </div>
      </div>
    </nav>
  );
}

export function SongNavigation({ previousId, nextId }) {
  return (
    <div className="flex justify-between items-center gap-4 my-8 pt-8" style={{ borderTopColor: 'rgba(57, 52, 61, 0.1)', borderTopWidth: '1px' }}>
      {previousId ? (
        <Link
          to={`/songs/${previousId}`}
          style={{ color: 'var(--color-dark-purple)' }}
          className="inline-flex items-center gap-2 text-sm hover:opacity-70 transition-opacity"
        >
          <ChevronLeft className="w-4 h-4" />
          Vorheriger Song
        </Link>
      ) : (
        <div />
      )}
      <Link
        to="/"
        style={{ color: 'var(--color-dark-text)' }}
        className="text-sm hover:opacity-70 transition-opacity"
      >
        Zur Trackliste
      </Link>
      {nextId ? (
        <Link
          to={`/songs/${nextId}`}
          style={{ color: 'var(--color-dark-purple)' }}
          className="inline-flex items-center gap-2 ml-auto text-sm hover:opacity-70 transition-opacity"
        >
          Nächster Song
          <ChevronLeft className="w-4 h-4 rotate-180" />
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}

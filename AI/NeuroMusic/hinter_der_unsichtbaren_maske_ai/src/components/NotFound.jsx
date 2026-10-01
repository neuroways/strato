import { Link } from 'react-router';
import { ArrowLeft } from 'lucide-react';

export function NotFound() {
  return (
    <div className="min-h-screen pt-24 px-4 flex items-center justify-center" style={{ backgroundColor: 'var(--color-cream)' }}>
      <div className="text-center max-w-md">
        <h1 style={{ color: 'var(--color-dark-text)' }} className="text-6xl font-bold mb-4">404</h1>
        <h2 style={{ color: 'var(--color-dark-text)' }} className="text-2xl font-bold mb-4">Song nicht gefunden</h2>
        <p style={{ color: 'var(--color-graphite)' }} className="mb-8">
          Dieser Song existiert in unserem Album nicht. Vielleicht fragst du dich, was hinter dieser unsichtbaren Maske steckt?
        </p>
        <Link
          to="/"
          style={{ color: 'var(--color-dark-purple)' }}
          className="inline-flex items-center gap-2 font-semibold hover:opacity-70 transition-opacity"
        >
          <ArrowLeft className="w-4 h-4" />
          Zurück zur Trackliste
        </Link>
      </div>
    </div>
  );
}

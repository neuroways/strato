import { Link } from 'react-router';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Seite nicht gefunden</h2>
        <p className="text-gray-600 text-lg mb-8 max-w-md">
          Die gesuchte Seite existiert nicht oder wurde verschoben.
        </p>
        <Link
          to="/"
          className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
        >
          Zur Startseite
        </Link>
      </div>
    </div>
  );
}

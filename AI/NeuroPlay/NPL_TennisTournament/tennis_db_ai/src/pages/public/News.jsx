import { useState, useEffect } from 'react';
import { AnnouncementService } from '../../services';

export default function News() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadAnnouncements() {
      const result = await AnnouncementService.getVisibleAnnouncements(undefined);
      if (result.success) {
        setAnnouncements(result.data);
      } else {
        setError(result.error || 'Fehler beim Laden');
      }
      setLoading(false);
    }

    loadAnnouncements();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Laden...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-12">News</h1>

      {announcements.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">Keine News verfügbar</p>
        </div>
      ) : (
        <div className="max-w-3xl space-y-8">
          {announcements.map(announcement => (
            <article
              key={announcement.id}
              className="bg-white rounded-lg shadow-md border border-gray-200 p-8 hover:shadow-lg transition"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {announcement.title}
                  </h2>
                  {announcement.published_date && (
                    <p className="text-gray-600 text-sm">
                      {new Date(announcement.published_date).toLocaleDateString('de-DE', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  )}
                </div>
                {announcement.tournament_id && (
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    Turnier
                  </span>
                )}
              </div>

              {announcement.content && (
                <p className="text-gray-700 leading-relaxed mb-4">
                  {announcement.content}
                </p>
              )}

              {announcement.visible && (
                <div className="flex items-center gap-2 text-green-600 text-sm">
                  <span>✓</span>
                  <span>Veröffentlicht</span>
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

import { useState, useEffect } from 'react';
import { CourtService } from '../../services';

export default function Courts() {
  const [courts, setCourts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadCourts() {
      const result = await CourtService.getAllCourts(undefined, undefined);
      if (result.success) {
        setCourts(result.data);
      } else {
        setError(result.error || 'Fehler beim Laden');
      }
      setLoading(false);
    }

    loadCourts();
  }, []);

  const getAvailabilityBadge = (available) => {
    return available ? (
      <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
        ✓ Verfügbar
      </span>
    ) : (
      <span className="px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
        Nicht verfügbar
      </span>
    );
  };

  const getSurfaceLabel = (surface) => {
    const labels = {
      clay: 'Asche',
      hard: 'Hart',
      grass: 'Rasen',
      synthetic: 'Kunststoff'
    };
    return labels[surface] || surface;
  };

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
      <h1 className="text-4xl font-bold text-gray-900 mb-12">Plätze</h1>

      {courts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">Keine Plätze verfügbar</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courts.map(court => (
            <div
              key={court.id}
              className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">{court.name}</h3>
                {getAvailabilityBadge(court.available)}
              </div>

              <div className="space-y-3 text-sm">
                {court.surface && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Belag:</span>
                    <span className="font-semibold text-gray-900">
                      {getSurfaceLabel(court.surface)}
                    </span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="text-gray-600">Art:</span>
                  <span className="font-semibold text-gray-900">
                    {court.outdoor ? 'Outdoor' : 'Indoor'}
                  </span>
                </div>

                {court.location_id && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ort:</span>
                    <span className="font-semibold text-gray-900">Vereinsheim</span>
                  </div>
                )}
              </div>

              {court.notes && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-gray-700 text-sm">{court.notes}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

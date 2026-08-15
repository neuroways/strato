import { useState, useEffect } from 'react';
import { PlayerService } from '../../services';

export default function Players() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function loadPlayers() {
      const result = await PlayerService.getAllPlayers(undefined);
      if (result.success) {
        setPlayers(result.data);
      } else {
        setError(result.error || 'Fehler beim Laden');
      }
      setLoading(false);
    }

    loadPlayers();
  }, []);

  const filteredPlayers = players.filter(p =>
    `${p.first_name} ${p.last_name}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getSkillBadge = (level) => {
    const colors = {
      beginner: 'bg-blue-100 text-blue-800',
      intermediate: 'bg-yellow-100 text-yellow-800',
      advanced: 'bg-orange-100 text-orange-800',
      professional: 'bg-red-100 text-red-800'
    };
    const labels = {
      beginner: 'Anfänger',
      intermediate: 'Fortgeschritten',
      advanced: 'Fortgeschritten+',
      professional: 'Professionell'
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${colors[level] || 'bg-gray-100 text-gray-800'}`}>
        {labels[level] || level || 'Unbekannt'}
      </span>
    );
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
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Teilnehmer</h1>

      {/* Search */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Nach Spieler suchen..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      {/* Results */}
      <div className="text-sm text-gray-600 mb-6">
        {filteredPlayers.length} Spieler gefunden
      </div>

      {filteredPlayers.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">Keine Spieler gefunden</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlayers.map(player => (
            <div
              key={player.id}
              className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {PlayerService.getPlayerFullName(player)}
                  </h3>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                {player.skill_level && (
                  <div>
                    <p className="text-gray-600 text-xs uppercase tracking-wide mb-1">Spielstärke</p>
                    {getSkillBadge(player.skill_level)}
                  </div>
                )}

                {player.birth_date && (
                  <div>
                    <p className="text-gray-600 text-xs uppercase tracking-wide">Geburtsdatum</p>
                    <p className="text-gray-900 font-semibold">
                      {new Date(player.birth_date).toLocaleDateString('de-DE')}
                    </p>
                  </div>
                )}

                {player.email && (
                  <div>
                    <p className="text-gray-600 text-xs uppercase tracking-wide">E-Mail</p>
                    <a href={`mailto:${player.email}`} className="text-blue-600 hover:underline break-all">
                      {player.email}
                    </a>
                  </div>
                )}

                {player.phone && (
                  <div>
                    <p className="text-gray-600 text-xs uppercase tracking-wide">Telefon</p>
                    <a href={`tel:${player.phone}`} className="text-blue-600 hover:underline">
                      {player.phone}
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

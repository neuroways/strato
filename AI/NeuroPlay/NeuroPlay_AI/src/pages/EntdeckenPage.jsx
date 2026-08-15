import { useState, useEffect } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import ActivityCard from '../components/ActivityCard';
import { getActivities } from '@/lib/db';

// Fallback when database is empty
const FALLBACK_ACTIVITIES = [
  {
    id: 'haekeln',
    name: 'Häkeln',
    type: 'kreativ',
    duration: '20–45 Min',
    minPeople: 1,
    maxPeople: 1,
    intensity: 'niedrig',
    tags: ['ruhig', 'kreativ', 'solo'],
    fit: 85
  },
  {
    id: 'dorfromantik',
    name: 'Dorfromantik',
    type: 'Brettspiel',
    duration: '30–45 Min',
    minPeople: 1,
    maxPeople: 4,
    intensity: 'niedrig',
    tags: ['kooperativ', 'entspannt', 'strategisch'],
    fit: 78
  },
  {
    id: 'cafe-del-gatto',
    name: 'Café del Gatto',
    type: 'Brettspiel',
    duration: '30–45 Min',
    minPeople: 2,
    maxPeople: 4,
    intensity: 'mittel',
    tags: ['taktisch', 'schnell', 'sozial'],
    fit: 65
  },
  {
    id: 'spaziergang',
    name: 'Spaziergang',
    type: 'Bewegung',
    duration: 'offen',
    minPeople: 1,
    maxPeople: 10,
    intensity: 'variabel',
    tags: ['aktiv', 'natur', 'erfrischend'],
    fit: 72
  },
  {
    id: 'puzzle',
    name: 'Puzzle',
    type: 'kreativ',
    duration: '30–120 Min',
    minPeople: 1,
    maxPeople: 4,
    intensity: 'niedrig',
    tags: ['fokus', 'beruhigend', 'gesellig'],
    fit: 68
  },
  {
    id: 'lesen',
    name: 'Lesen',
    type: 'Ruhe',
    duration: 'offen',
    minPeople: 1,
    maxPeople: 1,
    intensity: 'niedrig',
    tags: ['solo', 'entschleunigung', 'bildung'],
    fit: 75
  },
];

const FILTERS = {
  time: ['unter 10 Min', '10–20 Min', '20–45 Min', '45–90 Min', 'über 90 Min', 'offen'],
  energy: ['niedrig', 'mittel', 'hoch'],
  people: ['allein', 'zu zweit', 'Familie', 'Freunde', 'Gruppe'],
  intensity: ['niedrig', 'mittel', 'hoch'],
};

export default function EntdeckenPage() {
  const [activities, setActivities] = useState(FALLBACK_ACTIVITIES);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFilters, setExpandedFilters] = useState({});
  const [selectedFilters, setSelectedFilters] = useState({
    time: [],
    energy: [],
    people: [],
    intensity: []
  });

  useEffect(() => {
    // Lade Aktivitäten aus lokaler Datenbank
    const allActivities = getActivities();
    const transformed = allActivities.map(item => ({
      ...item,
      id: item.public_id,
      type: item.activity_type,
      duration: item.typical_duration_minutes ? `${item.typical_duration_minutes} Min` : 'variabel',
      minPeople: item.min_participants,
      maxPeople: item.max_participants,
      intensity: 'variabel',
      tags: item.short_description ? item.short_description.split(',').slice(0, 3) : [],
      fit: Math.floor(Math.random() * 30 + 70)
    }));
    setActivities(transformed);
    setLoading(false);
  }, []);

  const toggleFilter = (category, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(v => v !== value)
        : [...prev[category], value]
    }));
  };

  const toggleFilterExpanded = (category) => {
    setExpandedFilters(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const filtered = activities.filter(activity => {
    if (searchTerm && !activity.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    return true;
  });

  const activeFiltersCount = Object.values(selectedFilters).flat().length;

  return (
    <div className="flex-1 md:flex-none pb-20 md:pb-0">
      <div className="max-w-4xl mx-auto p-4 md:p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-deep-navy mb-2">Entdecken</h1>
          <p className="text-anthrazit">Finde Aktivitäten, die zu dir passen.</p>
        </div>

        {/* Search bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Aktivität suchen..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-border-light focus:outline-none focus:border-gold focus:shadow-sm transition"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="space-y-3 mb-6">
          {Object.entries(FILTERS).map(([category, options]) => (
            <div key={category} className="neuroplay-card">
              <button
                onClick={() => toggleFilterExpanded(category)}
                className="w-full px-4 py-3 flex items-center justify-between hover:bg-light-gray transition"
              >
                <div className="flex items-center gap-2">
                  <span className="font-medium text-anthrazit capitalize">
                    {category === 'time' ? 'Wie viel Zeit?' : 
                     category === 'energy' ? 'Energie?' :
                     category === 'people' ? 'Allein oder gemeinsam?' :
                     'Aktivitätslevel?'}
                  </span>
                  {selectedFilters[category].length > 0 && (
                    <span className="text-xs bg-gold text-white px-2 py-1 rounded-full">
                      {selectedFilters[category].length}
                    </span>
                  )}
                </div>
                <ChevronDown
                  size={18}
                  className={`transition-transform ${expandedFilters[category] ? 'rotate-180' : ''}`}
                />
              </button>

              {expandedFilters[category] && (
                <div className="border-t border-border-light p-4 grid grid-cols-2 md:grid-cols-3 gap-2">
                  {options.map(option => (
                    <button
                      key={option}
                      onClick={() => toggleFilter(category, option)}
                      className={`px-3 py-2 rounded text-sm font-medium transition ${
                        selectedFilters[category].includes(option)
                          ? 'bg-deep-navy text-white'
                          : 'bg-light-gray text-anthrazit hover:bg-border-light'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Results */}
        <div className="space-y-4">
          {loading && (
            <div className="text-center py-8">
              <p className="text-gray-500">Aktivitäten werden geladen...</p>
            </div>
          )}

          {!loading && (
            <>
              <div className="flex items-center justify-between">
                <p className="font-medium text-anthrazit">
                  {filtered.length} Aktivität{filtered.length !== 1 ? 'en' : ''} gefunden
                </p>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={() => setSelectedFilters({ time: [], energy: [], people: [], intensity: [] })}
                    className="text-sm text-gold hover:text-deep-navy transition font-medium"
                  >
                    Filter zurücksetzen
                  </button>
                )}
              </div>

              {filtered.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2">
                  {filtered.map(activity => (
                    <ActivityCard key={activity.id} activity={activity} />
                  ))}
                </div>
              ) : (
                <div className="neuroplay-card p-8 text-center">
                  <p className="text-anthrazit">Keine Aktivitäten gefunden.</p>
                  <p className="text-sm text-gray-500 mt-1">Versuche andere Filter zu verwenden.</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

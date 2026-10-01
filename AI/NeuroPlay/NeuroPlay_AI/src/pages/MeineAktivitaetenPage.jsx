import { useState } from 'react';
import { Star, Bookmark, Clock, Zap } from 'lucide-react';
import ActivityCard from '../components/ActivityCard';

const MOCK_COLLECTION = {
  favorites: [
    { id: 'haekeln', name: 'Häkeln', type: 'kreativ', duration: '20–45 Min', minPeople: 1, maxPeople: 1, intensity: 'niedrig', tags: ['ruhig', 'kreativ'] },
    { id: 'dorfromantik', name: 'Dorfromantik', type: 'Brettspiel', duration: '30–45 Min', minPeople: 1, maxPeople: 4, intensity: 'niedrig', tags: ['kooperativ', 'entspannt'] }
  ],
  owned: [
    { id: 'dorfromantik', name: 'Dorfromantik', type: 'Brettspiel', duration: '30–45 Min', minPeople: 1, maxPeople: 4, intensity: 'niedrig', tags: ['kooperativ'] },
    { id: 'cafe-del-gatto', name: 'Café del Gatto', type: 'Brettspiel', duration: '30–45 Min', minPeople: 2, maxPeople: 4, intensity: 'mittel', tags: ['taktisch'] }
  ],
  recentlyUsed: [
    { id: 'haekeln', name: 'Häkeln', type: 'kreativ', duration: '20–45 Min', minPeople: 1, maxPeople: 1, intensity: 'niedrig', tags: ['ruhig'], fit: 85, lastUsed: 'vor 2 Tagen' },
    { id: 'lesen', name: 'Lesen', type: 'Ruhe', duration: 'offen', minPeople: 1, maxPeople: 1, intensity: 'niedrig', tags: ['solo'], fit: 72, lastUsed: 'vor 3 Tagen' },
    { id: 'spaziergang', name: 'Spaziergang', type: 'Bewegung', duration: 'offen', minPeople: 1, maxPeople: 10, intensity: 'variabel', tags: ['aktiv'], fit: 68, lastUsed: 'vor 5 Tagen' }
  ],
  toExplore: [
    { id: 'puzzle', name: 'Puzzle', type: 'kreativ', duration: '30–120 Min', minPeople: 1, maxPeople: 4, intensity: 'niedrig', tags: ['fokus', 'entspannend'], fit: 70 }
  ]
};

const TABS = ['Favoriten', 'Besitz', 'Zuletzt genutzt', 'Möchte ich ausprobieren'];

export default function MeineAktivitaetenPage() {
  const [activeTab, setActiveTab] = useState('Favoriten');

  const getActivities = () => {
    switch (activeTab) {
      case 'Favoriten':
        return MOCK_COLLECTION.favorites;
      case 'Besitz':
        return MOCK_COLLECTION.owned;
      case 'Zuletzt genutzt':
        return MOCK_COLLECTION.recentlyUsed;
      case 'Möchte ich ausprobieren':
        return MOCK_COLLECTION.toExplore;
      default:
        return [];
    }
  };

  const activities = getActivities();

  return (
    <div className="flex-1 md:flex-none pb-20 md:pb-0">
      <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-deep-navy mb-2">Meine Aktivitäten</h1>
          <p className="text-anthrazit">deine persönliche Sammlung und dein Lernstand</p>
        </div>

        {/* Tab navigation */}
        <div className="flex gap-2 overflow-x-auto border-b border-border-light pb-3">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-medium text-sm whitespace-nowrap transition border-b-2 ${
                activeTab === tab
                  ? 'border-deep-navy text-deep-navy'
                  : 'border-transparent text-gray-500 hover:text-anthrazit'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="space-y-4">
          {activeTab === 'Zuletzt genutzt' && activities.length > 0 && (
            <div className="space-y-3 mb-6">
              {activities.map(activity => (
                <div key={activity.id} className="neuroplay-card p-4 flex items-center justify-between hover:shadow-md transition">
                  <div className="flex-1">
                    <p className="font-bold text-anthrazit">{activity.name}</p>
                    <div className="flex gap-3 mt-2 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {activity.lastUsed}
                      </span>
                      {activity.fit && (
                        <span className="flex items-center gap-1">
                          <Zap size={14} />
                          {activity.fit}% Passung
                        </span>
                      )}
                    </div>
                  </div>
                  <button className="p-2 hover:bg-light-gray rounded-lg transition" aria-label="Zu Favoriten hinzufügen">
                    <Star size={20} className="text-gold" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab !== 'Zuletzt genutzt' && activities.length > 0 && (
            <div className="grid gap-4 md:grid-cols-2">
              {activities.map(activity => (
                <ActivityCard key={activity.id} activity={activity} showFit={activeTab === 'Möchte ich ausprobieren'} />
              ))}
            </div>
          )}

          {activities.length === 0 && (
            <div className="neuroplay-card p-8 text-center">
              <div className="text-3xl mb-3">
                {activeTab === 'Favoriten' && '⭐'}
                {activeTab === 'Besitz' && '📦'}
                {activeTab === 'Zuletzt genutzt' && '🕐'}
                {activeTab === 'Möchte ich ausprobieren' && '🔭'}
              </div>
              <p className="text-anthrazit font-medium mb-1">Noch leer</p>
              <p className="text-sm text-gray-500">
                {activeTab === 'Favoriten' && 'Du hast noch keine Favoriten. Markier Aktivitäten, die dir besonders gefallen.'}
                {activeTab === 'Besitz' && 'Kein Besitz eingetragen. Füge deine Spiele hinzu.'}
                {activeTab === 'Zuletzt genutzt' && 'Du hast noch keine Aktivitäten durchgeführt.'}
                {activeTab === 'Möchte ich ausprobieren' && 'Du hast noch keine Aktivitäten auf die Merkliste gesetzt.'}
              </p>
            </div>
          )}
        </div>

        {/* Personal learning status */}
        {activeTab === 'Besitz' && (
          <div className="mt-8 pt-6 border-t border-border-light space-y-4">
            <h2 className="text-lg font-bold text-deep-navy">Dein Lernstand</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="neuroplay-card p-4 bg-petrol/10 border-l-4 border-petrol">
                <p className="text-sm font-bold text-petrol uppercase mb-2">Grundlagen</p>
                <p className="text-anthrazit font-medium">Dorfromantik</p>
                <div className="bg-light-gray rounded-full h-2 mt-2">
                  <div className="bg-petrol h-2 rounded-full" style={{ width: '100%' }} />
                </div>
                <p className="text-xs text-gray-500 mt-2">sichere Grundkenntnisse</p>
              </div>
              <div className="neuroplay-card p-4 bg-violet/10 border-l-4 border-violet">
                <p className="text-sm font-bold text-violet uppercase mb-2">Strategie</p>
                <p className="text-anthrazit font-medium">Café del Gatto</p>
                <div className="bg-light-gray rounded-full h-2 mt-2">
                  <div className="bg-violet h-2 rounded-full" style={{ width: '45%' }} />
                </div>
                <p className="text-xs text-gray-500 mt-2">anfangen zu verstehen</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

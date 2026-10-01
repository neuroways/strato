// Lokale In-Memory Datenbank für MVP
// Alle Daten werden im Browser-Speicher gehalten und sind dauerhaft für die aktuelle Session

const db = {
  tenants: [
    { tenant_id: 1, public_id: 'tenant_neuroplay', name: 'NeuroPlay', slug: 'neuroplay' }
  ],
  organizations: [
    { org_id: 1, public_id: 'org_neuroplay', tenant_id: 1, name: 'NeuroPlay Demo', slug: 'neuroplay-demo' }
  ],
  activities: [
    { activity_id: 1, public_id: 'act_haekeln', tenant_id: 1, name: 'Häkeln', slug: 'haekeln', activity_type: 'kreativ', short_description: 'Rhythmische, beruhigende Aktivität', typical_duration_minutes: 30, min_participants: 1, max_participants: 1, complexity_level: 'einfach', status: 'published' },
    { activity_id: 2, public_id: 'act_dorf', tenant_id: 1, name: 'Dorfromantik', slug: 'dorfromantik', activity_type: 'Brettspiel', short_description: 'Kooperatives Spiel', typical_duration_minutes: 40, min_participants: 1, max_participants: 4, complexity_level: 'einfach', status: 'published' },
    { activity_id: 3, public_id: 'act_cafe', tenant_id: 1, name: 'Café del Gatto', slug: 'cafe-del-gatto', activity_type: 'Brettspiel', short_description: 'Taktisches Spiel', typical_duration_minutes: 40, min_participants: 2, max_participants: 4, complexity_level: 'mittel', status: 'published' },
    { activity_id: 4, public_id: 'act_spaz', tenant_id: 1, name: 'Spaziergang', slug: 'spaziergang', activity_type: 'Bewegung', short_description: 'An der frischen Luft gehen', typical_duration_minutes: 45, min_participants: 1, max_participants: 10, complexity_level: 'einfach', status: 'published' },
    { activity_id: 5, public_id: 'act_puzzle', tenant_id: 1, name: 'Puzzle', slug: 'puzzle', activity_type: 'kreativ', short_description: 'Bildpuzzle zusammensetzen', typical_duration_minutes: 60, min_participants: 1, max_participants: 4, complexity_level: 'variabel', status: 'published' },
    { activity_id: 6, public_id: 'act_lesen', tenant_id: 1, name: 'Lesen', slug: 'lesen', activity_type: 'Ruhe', short_description: 'Ein Buch oder Text lesen', typical_duration_minutes: 45, min_participants: 1, max_participants: 1, complexity_level: 'variabel', status: 'published' }
  ],
  activity_sessions: [],
  observations: [],
  favorites: []
};

// Speichere Daten im Browser localStorage
const STORAGE_KEY = 'neuroplay_db';

function loadFromStorage() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const data = JSON.parse(stored);
      db.activity_sessions = data.activity_sessions || [];
      db.observations = data.observations || [];
      db.favorites = data.favorites || [];
    }
  } catch (e) {
    console.log('localStorage nicht verfügbar – Daten nur für diese Session');
  }
}

function saveToStorage() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      activity_sessions: db.activity_sessions,
      observations: db.observations,
      favorites: db.favorites
    }));
  } catch (e) {
    console.log('localStorage Fehler – Daten gehen nach Reload verloren');
  }
}

// Lade Daten beim Start
loadFromStorage();

export const getActivities = () => db.activities;
export const getActivity = (id) => db.activities.find(a => a.public_id === id || a.slug === id);

export const addObservation = (obs) => {
  const newObs = {
    observation_id: db.observations.length + 1,
    public_id: `obs_${Date.now()}`,
    created_at: new Date().toISOString(),
    ...obs
  };
  db.observations.push(newObs);
  saveToStorage();
  return newObs;
};

export const getObservations = (userId) => db.observations.filter(o => o.user_id === userId);

export const addFavorite = (userId, activityId) => {
  if (!db.favorites.find(f => f.user_id === userId && f.activity_id === activityId)) {
    db.favorites.push({
      favorite_id: db.favorites.length + 1,
      user_id: userId,
      activity_id: activityId,
      created_at: new Date().toISOString()
    });
    saveToStorage();
  }
};

export const removeFavorite = (userId, activityId) => {
  db.favorites = db.favorites.filter(f => !(f.user_id === userId && f.activity_id === activityId));
  saveToStorage();
};

export const getFavorites = (userId) => db.favorites.filter(f => f.user_id === userId);

export const addSession = (session) => {
  const newSession = {
    session_id: db.activity_sessions.length + 1,
    public_id: `sess_${Date.now()}`,
    created_at: new Date().toISOString(),
    ...session
  };
  db.activity_sessions.push(newSession);
  saveToStorage();
  return newSession;
};

export const getSessions = (userId) => db.activity_sessions.filter(s => s.user_id === userId);

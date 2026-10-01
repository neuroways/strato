CREATE TABLE IF NOT EXISTS tenants (
  tenant_id INTEGER PRIMARY KEY AUTOINCREMENT,
  public_id TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  is_active INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS organizations (
  org_id INTEGER PRIMARY KEY AUTOINCREMENT,
  public_id TEXT NOT NULL UNIQUE,
  tenant_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  org_type TEXT NOT NULL,
  is_active INTEGER DEFAULT 1,
  FOREIGN KEY (tenant_id) REFERENCES tenants(tenant_id)
);

CREATE TABLE IF NOT EXISTS activities (
  activity_id INTEGER PRIMARY KEY AUTOINCREMENT,
  public_id TEXT NOT NULL UNIQUE,
  tenant_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  activity_type TEXT NOT NULL,
  short_description TEXT,
  full_description TEXT,
  typical_duration_minutes INTEGER,
  min_participants INTEGER DEFAULT 1,
  max_participants INTEGER,
  complexity_level TEXT,
  status TEXT DEFAULT 'draft',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (tenant_id) REFERENCES tenants(tenant_id)
);

CREATE TABLE IF NOT EXISTS activity_sessions (
  session_id INTEGER PRIMARY KEY AUTOINCREMENT,
  public_id TEXT NOT NULL UNIQUE,
  activity_id INTEGER NOT NULL,
  user_id TEXT NOT NULL,
  started_at DATETIME NOT NULL,
  ended_at DATETIME,
  duration_minutes INTEGER,
  status TEXT DEFAULT 'started',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (activity_id) REFERENCES activities(activity_id)
);

CREATE TABLE IF NOT EXISTS observations (
  observation_id INTEGER PRIMARY KEY AUTOINCREMENT,
  public_id TEXT NOT NULL UNIQUE,
  session_id INTEGER NOT NULL,
  user_id TEXT NOT NULL,
  description TEXT NOT NULL,
  energy_level INTEGER,
  context TEXT,
  is_positive INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (session_id) REFERENCES activity_sessions(session_id)
);

CREATE TABLE IF NOT EXISTS favorites (
  favorite_id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT NOT NULL,
  activity_id INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, activity_id),
  FOREIGN KEY (activity_id) REFERENCES activities(activity_id)
);

INSERT OR IGNORE INTO tenants (public_id, name, slug) VALUES ('tenant_neuroplay', 'NeuroPlay', 'neuroplay');

INSERT OR IGNORE INTO organizations (public_id, tenant_id, name, slug, org_type) 
VALUES ('org_neuroplay', 1, 'NeuroPlay Demo', 'neuroplay-demo', 'demo');

INSERT OR IGNORE INTO activities (public_id, tenant_id, name, slug, activity_type, short_description, typical_duration_minutes, min_participants, max_participants, complexity_level, status) 
VALUES 
('act_haekeln', 1, 'Häkeln', 'haekeln', 'kreativ', 'Rhythmische, beruhigende Aktivität mit klarem Anfang und Ende', 30, 1, 1, 'einfach', 'published'),
('act_dorf', 1, 'Dorfromantik', 'dorfromantik', 'Brettspiel', 'Kooperatives Spiel, bei dem ihr gemeinsam ein Dorf aufbaut', 40, 1, 4, 'einfach', 'published'),
('act_cafe', 1, 'Café del Gatto', 'cafe-del-gatto', 'Brettspiel', 'Taktisches Spiel um Café-Verwaltung', 40, 2, 4, 'mittel', 'published'),
('act_spaz', 1, 'Spaziergang', 'spaziergang', 'Bewegung', 'An der frischen Luft gehen', 45, 1, 10, 'einfach', 'published'),
('act_puzzle', 1, 'Puzzle', 'puzzle', 'kreativ', 'Bildpuzzle zusammensetzen', 60, 1, 4, 'variabel', 'published'),
('act_lesen', 1, 'Lesen', 'lesen', 'Ruhe', 'Ein Buch oder Text lesen', 45, 1, 1, 'variabel', 'published');

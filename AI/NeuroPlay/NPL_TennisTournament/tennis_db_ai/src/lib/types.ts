/**
 * TypeScript types for database records.
 * Use these in components for type-safe data handling.
 */

export interface Tournament {
  id: string;
  name: string;
  subtitle?: string;
  description?: string;
  tournament_date: string;
  registration_deadline: string;
  start_time?: string;
  end_time?: string;
  status?: 'planned' | 'open' | 'running' | 'completed' | 'cancelled';
  max_participants?: number;
  location_id?: string;
  created: string;
  updated: string;
}

export interface TournamentSettings {
  id: string;
  tournament_id: string;
  registration_open?: boolean;
  waitlist_enabled?: boolean;
  match_duration_minutes?: number;
  break_duration_minutes?: number;
  max_matches_per_player?: number;
  draw_method?: 'random' | 'seeded' | 'custom';
  created: string;
  updated: string;
}

export interface Location {
  id: string;
  name: string;
  address?: string;
  notes?: string;
  created: string;
  updated: string;
}

export interface Court {
  id: string;
  name: string;
  surface?: 'clay' | 'hard' | 'grass' | 'other';
  available?: boolean;
  notes?: string;
  created: string;
  updated: string;
}

export interface Player {
  id: string;
  first_name: string;
  last_name: string;
  birth_date?: string;
  skill_level?: 'beginner' | 'intermediate' | 'advanced' | 'professional';
  email?: string;
  phone?: string;
  notes?: string;
  created: string;
  updated: string;
}

export interface Contact {
  id: string;
  contact_type: 'organizer' | 'tournament_director' | 'contact_person' | 'other';
  first_name: string;
  last_name: string;
  email?: string;
  phone?: string;
  role?: string;
  notes?: string;
  created: string;
  updated: string;
}

export interface Registration {
  id: string;
  tournament_id: string;
  player_id: string;
  registration_date: string;
  status?: 'registered' | 'confirmed' | 'waitlist' | 'cancelled';
  notes?: string;
  created: string;
  updated: string;
}

export interface Round {
  id: string;
  tournament_id: string;
  round_number: number;
  name: string;
  start_date?: string;
  end_date?: string;
  created: string;
  updated: string;
}

export interface Match {
  id: string;
  round_id: string;
  tournament_id: string;
  court_id?: string;
  match_time?: string;
  match_date?: string;
  status?: 'scheduled' | 'live' | 'completed' | 'cancelled';
  notes?: string;
  created: string;
  updated: string;
}

export interface MatchPlayer {
  id: string;
  match_id: string;
  player_id: string;
  team?: 'team_a' | 'team_b';
  position?: number;
  notes?: string;
  created: string;
  updated: string;
}

export interface Result {
  id: string;
  match_id: string;
  winner_id?: string;
  loser_id?: string;
  score?: string;
  match_notes?: string;
  recorded_at?: string;
  created: string;
  updated: string;
}

export interface InfoSection {
  id: string;
  section_key: string;
  title?: string;
  content?: string;
  order?: number;
  visible?: boolean;
  created: string;
  updated: string;
}

export interface Announcement {
  id: string;
  tournament_id?: string;
  title: string;
  content?: string;
  published_date: string;
  visible?: boolean;
  created: string;
  updated: string;
}

export interface AIScheduleRun {
  id: string;
  tournament_id: string;
  run_date: string;
  parameters?: Record<string, any>;
  matches_generated?: number;
  status?: 'pending' | 'success' | 'failed';
  error_message?: string;
  created: string;
  updated: string;
}

export interface Admin {
  id: string;
  username: string;
  email: string;
  password?: string;
  first_name?: string;
  last_name?: string;
  active?: boolean;
  created: string;
  updated: string;
}

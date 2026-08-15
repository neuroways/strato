import PocketBase from 'pocketbase';

/**
 * Shared PocketBase client instance for the entire app.
 * 
 * Platform routing:
 * - Dev/Preview: /.sfs-bd/
 * - Production: /.sfs-be/
 * 
 * Never pass a URL or derive it from window.location;
 * the platform automatically routes the correct instance.
 */
export const pb = new PocketBase();

// Export collection names for type safety
export const COLLECTIONS = {
  tournaments: 'tournaments',
  tournament_settings: 'tournament_settings',
  locations: 'locations',
  courts: 'courts',
  players: 'players',
  contacts: 'contacts',
  registrations: 'registrations',
  rounds: 'rounds',
  matches: 'matches',
  match_players: 'match_players',
  results: 'results',
  info_sections: 'info_sections',
  announcements: 'announcements',
  ai_schedule_runs: 'ai_schedule_runs',
  admins: 'admins'
} as const;

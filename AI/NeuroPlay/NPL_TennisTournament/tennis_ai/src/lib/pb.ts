import PocketBase from 'pocketbase';

export const pb = new PocketBase();

// Initialize collections on startup
export async function initializeDatabase() {
  try {
    // Check if collections exist, create if not
    const collections = await pb.collections.getFullList();
    const collectionNames = collections
      .filter((c: any) => !c.system && !c.name.startsWith('_'))
      .map((c: any) => c.name);

    const requiredCollections = [
      'tournaments',
      'locations',
      'contacts',
      'info_sections',
      'courts',
      'players',
      'registrations',
      'rounds',
      'matches',
      'match_players',
      'results',
      'ai_schedule_runs'
    ];

    for (const name of requiredCollections) {
      if (!collectionNames.includes(name)) {
        console.log(`Collection ${name} missing - will be created on first use`);
      }
    }
  } catch (error) {
    console.error('Database initialization check failed:', error);
  }
}

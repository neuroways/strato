/**
 * Collection Verification
 * Checks if all required collections exist before import
 */

import { pb } from './pb.js';

const REQUIRED_COLLECTIONS = [
  'publishers',
  'games',
  'game_editions',
  'rule_sources',
  'import_batches',
  'source_verification_history'
];

export async function checkCollections() {
  try {
    // Attempt to list collections - this will fail if user is unauthenticated
    // but we can catch it and check individually
    const results = {
      exists: [],
      missing: [],
      error: null
    };

    for (const collName of REQUIRED_COLLECTIONS) {
      try {
        // Try to access the collection by fetching a single record
        // If collection doesn't exist, this will fail with a specific error
        await pb.collection(collName).getFirstListItem('1=1', { fields: 'id' }).catch(() => {});
        results.exists.push(collName);
      } catch (error) {
        // Check if it's a "not found" error (collection doesn't exist) vs auth error
        if (error.status === 404 || error.message.includes('collection')) {
          results.missing.push(collName);
        } else {
          // Some other error (auth, network, etc)
          throw error;
        }
      }
    }

    return results;
  } catch (error) {
    return {
      exists: [],
      missing: REQUIRED_COLLECTIONS,
      error: error.message
    };
  }
}

export function getSchemaSetupInstructions() {
  return `Das PocketBase-Schema fehlt. Führe diese Schritte aus:

1. Öffne die PocketBase-Administrationsoberfläche:
   https://<deine-domain>/.sfs-be/

2. Logge dich mit deinen Admin-Zugangsdaten ein

3. Klicke auf "Einstellungen" (Zahnradsymbol unten)

4. Wähle "Sammlungen" und klicke "Schema importieren"

5. Lade diese Datei hoch:
   /public/pb_schema_export.json

6. Bestätige den Import

Nach dem Import sollten diese sechs Sammlungen existieren:
- publishers
- games
- game_editions
- rule_sources
- import_batches
- source_verification_history

Danach kannst du den Katalog-Import erneut versuchen.`;
}

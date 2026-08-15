import PocketBase from 'pocketbase';

// Create PocketBase instance with proper URL detection
function createPBClient() {
  // In development/preview, use the platform's automatic routing
  // new PocketBase() with no arguments uses the correct backend
  return new PocketBase();
}

export const pb = createPBClient();

// Log which backend we're connecting to (only in dev)
if (typeof window !== 'undefined' && import.meta.env.DEV) {
  console.log('[PocketBase] Instance created - will auto-route to correct backend');
  console.log('[PocketBase] Current URL:', window.location.origin);
}

import { useEffect } from 'react';
import { pb } from './pb';

/**
 * Auto-refresh admin auth token on app startup.
 * 
 * The token is persisted in localStorage. On page reload it may be expired.
 * This hook refreshes it once to ensure the first authenticated request succeeds.
 * 
 * Only runs if a valid token exists; skips for anonymous visitors.
 */
export function useAuthRefresh() {
  useEffect(() => {
    // Only refresh if a token is already stored
    if (!pb.authStore.isValid) {
      return;
    }

    // Refresh the token; clear auth if it fails
    pb.collection('admins').authRefresh()
      .catch(() => {
        pb.authStore.clear();
      });
  }, []);
}

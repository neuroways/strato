import PocketBase from 'pocketbase';

export const pb = new PocketBase();

// Initialize auth on app startup
export async function initAuth() {
  try {
    // Try to refresh existing token
    if (pb.authStore.isValid) {
      await pb.collection('users').authRefresh();
    }
  } catch (e) {
    pb.authStore.clear();
  }
}

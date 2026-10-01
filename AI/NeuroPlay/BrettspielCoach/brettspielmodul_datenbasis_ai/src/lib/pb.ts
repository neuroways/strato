import PocketBase from 'pocketbase';

export const pb = new PocketBase();

// Initialize collections on app load
export async function initializeCollections() {
  try {
    // Check if publishers collection exists
    await pb.collection('publishers').getList(1, 1);
  } catch (e: any) {
    if (e?.status === 404) {
      // Collections don't exist yet, they'll be created on demand
      console.log('Collections need to be initialized');
    }
  }
}

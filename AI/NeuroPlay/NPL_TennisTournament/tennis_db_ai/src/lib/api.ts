import { pb, COLLECTIONS } from './pb';

/**
 * API utilities for accessing the database.
 * All functions use the shared PocketBase client.
 */

export interface QueryOptions {
  filter?: string;
  sort?: string;
  page?: number;
  perPage?: number;
  signal?: AbortSignal;
}

/**
 * Fetch records from a collection with optional filtering/sorting.
 */
export async function getRecords(
  collectionName: string,
  options: QueryOptions = {}
): Promise<any[]> {
  const { filter, sort, page = 1, perPage = 50, signal } = options;

  try {
    const result = await pb.collection(collectionName).getList(page, perPage, {
      filter,
      sort,
      signal
    });
    return result.items;
  } catch (error: any) {
    if (error?.isAbort || error?.name === 'AbortError') {
      return [];
    }
    console.error(`Error fetching ${collectionName}:`, error);
    throw error;
  }
}

/**
 * Fetch a single record by ID.
 */
export async function getRecord(
  collectionName: string,
  recordId: string,
  signal?: AbortSignal
): Promise<any> {
  try {
    return await pb.collection(collectionName).getOne(recordId, { signal });
  } catch (error: any) {
    if (error?.isAbort || error?.name === 'AbortError') {
      return null;
    }
    console.error(`Error fetching record from ${collectionName}:`, error);
    throw error;
  }
}

/**
 * Create a new record.
 */
export async function createRecord(
  collectionName: string,
  data: any,
  signal?: AbortSignal
): Promise<any> {
  try {
    return await pb.collection(collectionName).create(data, { signal });
  } catch (error: any) {
    if (error?.isAbort || error?.name === 'AbortError') {
      return null;
    }
    console.error(`Error creating record in ${collectionName}:`, error);
    throw error;
  }
}

/**
 * Update an existing record.
 */
export async function updateRecord(
  collectionName: string,
  recordId: string,
  data: any,
  signal?: AbortSignal
): Promise<any> {
  try {
    return await pb.collection(collectionName).update(recordId, data, { signal });
  } catch (error: any) {
    if (error?.isAbort || error?.name === 'AbortError') {
      return null;
    }
    console.error(`Error updating record in ${collectionName}:`, error);
    throw error;
  }
}

/**
 * Delete a record.
 */
export async function deleteRecord(
  collectionName: string,
  recordId: string,
  signal?: AbortSignal
): Promise<void> {
  try {
    await pb.collection(collectionName).delete(recordId, { signal });
  } catch (error: any) {
    if (error?.isAbort || error?.name === 'AbortError') {
      return;
    }
    console.error(`Error deleting record from ${collectionName}:`, error);
    throw error;
  }
}

/**
 * Get first record matching a filter (used for singletons like settings).
 */
export async function getFirstRecord(
  collectionName: string,
  filter: string,
  signal?: AbortSignal
): Promise<any> {
  try {
    return await pb.collection(collectionName).getFirstListItem(filter, { signal });
  } catch (error: any) {
    if (error?.isAbort || error?.name === 'AbortError') {
      return null;
    }
    if (error?.status === 404) {
      return null;
    }
    console.error(`Error fetching first record from ${collectionName}:`, error);
    throw error;
  }
}

/**
 * Count records matching a filter.
 */
export async function countRecords(
  collectionName: string,
  filter?: string
): Promise<number> {
  try {
    const result = await pb.collection(collectionName).getList(1, 1, { filter });
    return result.totalItems;
  } catch (error) {
    console.error(`Error counting records in ${collectionName}:`, error);
    throw error;
  }
}

/**
 * Admin login.
 */
export async function adminLogin(
  email: string,
  password: string
): Promise<any> {
  try {
    const authData = await pb.collection(COLLECTIONS.admins).authWithPassword(email, password);
    return authData;
  } catch (error) {
    console.error('Admin login failed:', error);
    throw error;
  }
}

/**
 * Admin logout.
 */
export function adminLogout(): void {
  pb.authStore.clear();
}

/**
 * Check if current user is logged in as admin.
 */
export function isAdminLoggedIn(): boolean {
  return pb.authStore.isValid && pb.authStore.record?.collectionName === COLLECTIONS.admins;
}

/**
 * Get current logged-in admin.
 */
export function getCurrentAdmin(): any {
  return pb.authStore.record;
}

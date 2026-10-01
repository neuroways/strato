import PocketBase from 'pocketbase';

/**
 * Get the correct PocketBase instance based on the current environment.
 * In development: uses /.sfs-bd/
 * In production: uses /.sfs-be/
 */
function getPocketBaseUrl(): string {
  // Check current hostname to determine which backend to use
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    // Use dev backend for preview/demo environments
    if (hostname.includes('preview') || hostname.includes('localhost')) {
      return '/.sfs-bd/';
    }
    // Use production backend for all other environments (live site)
    return '/.sfs-be/';
  }
  // Fallback to dev backend in SSR context
  return '/.sfs-bd/';
}

export const pb = new PocketBase(getPocketBaseUrl());

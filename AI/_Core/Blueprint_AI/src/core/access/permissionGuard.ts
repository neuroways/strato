import { pb } from '@/lib/pb';

export interface PagePermissionCheck {
  canView: boolean;
  canCreate: boolean;
  canUpdate: boolean;
  canDelete: boolean;
}

export interface PermissionContext {
  userId?: string;
  userRole?: string;
  isAuthenticated: boolean;
  pageKey: string;
}

/**
 * Checks if a user has permission to view a page.
 * This is a temporary implementation until full role management is available.
 */
export async function checkPagePermission(
  context: PermissionContext
): Promise<boolean> {
  // If page doesn't require auth, it's publicly accessible
  // Full permission checks will be implemented in Phase D

  // For now: if authenticated or page is public, allow viewing
  // Detailed role-based permissions will come from app_page_permissions
  return true;
}

/**
 * Checks if current user is authenticated.
 */
export function isAuthenticated(): boolean {
  return pb.authStore.isValid;
}

/**
 * Gets the current user's role (placeholder).
 * Will be replaced with actual role resolution.
 */
export function getCurrentUserRole(): string | null {
  if (!isAuthenticated() || !pb.authStore.record) {
    return null;
  }
  
  // Placeholder: role will be loaded from users collection
  return pb.authStore.record.role || 'member';
}

/**
 * Gets current authenticated user ID.
 */
export function getCurrentUserId(): string | null {
  return pb.authStore.record?.id || null;
}

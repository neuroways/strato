/**
 * NeuroWays App Structure Schema
 * 
 * This file documents the PocketBase collections that form the foundation
 * of the NeuroWays platform. These are user-defined collections that drive
 * module registration, page routing, navigation structure, and role-based access.
 * 
 * Collections:
 * - app_modules: Module registry (NeuroBalance, NeuroPlay, etc.)
 * - app_pages: Page registry with routing and component mapping
 * - app_navigation_items: Navigation structure with hierarchy
 * - app_navigation_roles: Role-based navigation visibility
 * - app_page_permissions: Role-based page access control
 * - workspace_navigation_settings: Workspace-level navigation customization (future)
 */

export const AppDatabaseSchema = {
  // Collection definitions follow below
} as const;

export type ModuleKey = 'platform' | 'neurobalance' | 'neuroplay' | 'neurowork' | 'neurolearning' | 'admin';
export type ModuleStatus = 'draft' | 'active' | 'deprecated' | 'archived';
export type PageType = 'dashboard' | 'overview' | 'list' | 'detail' | 'form' | 'wizard' | 'check_in' | 'result' | 'timeline' | 'content' | 'settings' | 'admin' | 'external' | 'error' | 'placeholder';
export type NavigationArea = 'primary' | 'module' | 'context' | 'mobile' | 'user' | 'footer' | 'admin' | 'quick_access';
export type TargetType = 'page' | 'external' | 'group' | 'action';
export type RoleKey = 'member' | 'team_manager' | 'organization_admin' | 'coach' | 'researcher' | 'neuroways_admin';
export type LifecycleStatus = 'draft' | 'active' | 'deprecated' | 'archived';

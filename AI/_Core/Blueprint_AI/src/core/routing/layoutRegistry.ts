import { StandardLayout } from '@/shell/components/StandardLayout';
import { AuthLayout } from '@/shell/components/AuthLayout';
import { ErrorLayout } from '@/shell/components/ErrorLayout';
import { AdminLayout } from '@/shell/components/AdminLayout';

export const layoutRegistry = {
  standard: StandardLayout,
  auth: AuthLayout,
  error: ErrorLayout,
  admin: AdminLayout,
  focused: StandardLayout, // Alias for now
  fullscreen: StandardLayout, // Alias for now
} as const;

export type LayoutKey = keyof typeof layoutRegistry;

/**
 * Resolves a layout key to a Layout component.
 * Returns StandardLayout for unknown keys for safe fallback.
 */
export function resolveLayout(key?: string | null): React.ComponentType<{ children: React.ReactNode }> {
  if (!key || !(key in layoutRegistry)) {
    console.warn(`Unknown or missing layout key: ${key}. Using StandardLayout.`);
    return layoutRegistry.standard;
  }

  return layoutRegistry[key as LayoutKey];
}

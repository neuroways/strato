import { pb } from '@/lib/pb';
import { PageRecord } from './pageRegistry';
import { resolveComponent } from './pageComponentRegistry';
import { resolveLayout } from './layoutRegistry';

export interface ResolvedPage {
  page: PageRecord;
  component: React.ComponentType<any>;
  layout: React.ComponentType<{ children: React.ReactNode }>;
  breadcrumb: BreadcrumbItem[];
  isPublic: boolean;
  isEnabled: boolean;
}

export interface BreadcrumbItem {
  label: string;
  route?: string;
  pageKey?: string;
}

/**
 * Resolves a page from the database and determines:
 * - Which React component to render
 * - Which layout to use
 * - Breadcrumb trail
 * - Access requirements
 */
export async function resolvePageForRoute(
  route: string,
  pages: PageRecord[]
): Promise<ResolvedPage | null> {
  // Find the page by route_path
  const page = pages.find(p => p.route_path === route && p.is_enabled && p.lifecycle_status === 'active');

  if (!page) {
    return null;
  }

  // Resolve the React component
  const componentKey = page.component_key || `placeholder`;
  const component = resolveComponent(componentKey);

  if (!component) {
    console.error(`Failed to resolve component for page: ${page.page_key}`);
    return null;
  }

  // Resolve the layout
  const layoutKey = (page as any).layout_key || 'standard';
  const layout = resolveLayout(layoutKey);

  // Generate breadcrumb trail
  const breadcrumb = await generateBreadcrumb(page);

  return {
    page,
    component,
    layout,
    breadcrumb,
    isPublic: !page.requires_auth,
    isEnabled: page.is_enabled,
  };
}

// Fallback module names
const FALLBACK_MODULE_NAMES = {
  'platform': 'Plattform',
  'neurobalance': 'NeuroBalance',
  'admin': 'Administration',
};

/**
 * Generates breadcrumb trail for a page based on its hierarchy
 * and navigation structure.
 */
async function generateBreadcrumb(page: PageRecord): Promise<BreadcrumbItem[]> {
  const breadcrumb: BreadcrumbItem[] = [];

  // Add module as first breadcrumb if available
  if (page.module_id) {
    try {
      const modules = await pb.collection('app_modules').getFullList();
      const module = modules.find(m => m.id === page.module_id);
      if (module) {
        breadcrumb.push({
          label: module.name,
          route: module.base_path,
        });
      }
    } catch (error) {
      console.warn('Failed to load module for breadcrumb, using fallback:', error);
      // Use fallback module name
      const moduleName = FALLBACK_MODULE_NAMES[page.module_id as keyof typeof FALLBACK_MODULE_NAMES];
      if (moduleName) {
        breadcrumb.push({
          label: moduleName,
          route: `/${page.module_id}`,
        });
      }
    }
  }

  // Add current page
  breadcrumb.push({
    label: page.short_title || page.title,
    pageKey: page.page_key,
  });

  return breadcrumb;
}

/**
 * Checks if a page and its module are accessible.
 */
// Fallback modules for accessibility check
const FALLBACK_MODULES = {
  'platform': { is_enabled: true, module_status: 'active' },
  'neurobalance': { is_enabled: true, module_status: 'active' },
  'admin': { is_enabled: true, module_status: 'active' },
};

export async function isPageAccessible(page: PageRecord): Promise<boolean> {
  // Page must be enabled
  if (!page.is_enabled || page.lifecycle_status !== 'active') {
    return false;
  }

  // Check module status if page belongs to a module
  if (page.module_id) {
    try {
      const module = await pb.collection('app_modules').getOne(page.module_id);
      if (!module.is_enabled || module.module_status !== 'active') {
        return false;
      }
    } catch (error) {
      console.warn('Failed to check module accessibility, using fallback:', error);
      // Use fallback module data
      const fallbackModule = FALLBACK_MODULES[page.module_id as keyof typeof FALLBACK_MODULES];
      if (fallbackModule && fallbackModule.is_enabled && fallbackModule.module_status === 'active') {
        return true;
      }
      return false;
    }
  }

  return true;
}

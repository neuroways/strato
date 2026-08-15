import { pb } from '@/lib/pb';

/**
 * Seeds the navigation structure for Phase D.
 * This function idempotently creates navigation entries from the defined structure.
 * Run once during app initialization or manually if navigation_items are missing.
 */
export async function seedNavigationData(): Promise<void> {
  try {
    // Check if navigation already seeded
    let existingItems;
    try {
      existingItems = await pb.collection('app_navigation_items').getList(1, 1);
    } catch (err) {
      console.warn('Failed to check existing navigation items:', err);
      existingItems = { totalItems: 0 };
    }
    
    if (existingItems.totalItems > 0) {
      console.log('Navigation items already exist, skipping seed.');
      return;
    }

    // Load modules and pages for reference
    const [modules, pages] = await Promise.all([
      pb.collection('app_modules').getFullList(),
      pb.collection('app_pages').getFullList(),
    ]);

    const platformModule = modules.find(m => m.module_key === 'platform');
    const neurobalanceModule = modules.find(m => m.module_key === 'neurobalance');

    if (!platformModule || !neurobalanceModule) {
      console.warn('Required modules not found, cannot seed navigation');
      return;
    }

    // Define navigation structure
    const navigationItems = [
      // Primary Navigation - Start
      {
        navigation_key: 'primary-start',
        navigation_area: 'primary',
        label: 'Start',
        icon_key: 'home',
        target_type: 'group',
        sort_order: 1,
        show_in_desktop: true,
        show_in_mobile: true,
        show_in_breadcrumb: false,
        is_enabled: true,
      },
      {
        navigation_key: 'primary-start-overview',
        navigation_area: 'primary',
        parent_item_id: null, // Will reference 'primary-start' after creation
        page_id: pages.find(p => p.page_key === 'platform.home')?.id,
        label: 'Übersicht',
        icon_key: 'dashboard',
        target_type: 'page',
        sort_order: 1,
        show_in_desktop: true,
        show_in_mobile: true,
        show_in_breadcrumb: true,
        is_enabled: true,
      },
      {
        navigation_key: 'primary-start-today',
        navigation_area: 'primary',
        parent_item_id: null, // Will reference 'primary-start'
        page_id: pages.find(p => p.page_key === 'platform.today')?.id,
        label: 'Heute',
        icon_key: 'calendar',
        target_type: 'page',
        sort_order: 2,
        show_in_desktop: true,
        show_in_mobile: true,
        show_in_breadcrumb: true,
        is_enabled: true,
      },

      // Primary Navigation - Modules
      {
        navigation_key: 'primary-modules',
        navigation_area: 'primary',
        label: 'Module',
        icon_key: 'layers',
        target_type: 'group',
        sort_order: 2,
        show_in_desktop: true,
        show_in_mobile: true,
        show_in_breadcrumb: false,
        is_enabled: true,
      },

      // NeuroBalance Navigation
      {
        navigation_key: 'primary-neurobalance',
        navigation_area: 'primary',
        parent_item_id: null, // Will reference 'primary-modules'
        page_id: pages.find(p => p.page_key === 'neurobalance.overview')?.id,
        label: 'NeuroBalance',
        icon_key: 'zap',
        target_type: 'page',
        sort_order: 1,
        show_in_desktop: true,
        show_in_mobile: true,
        show_in_breadcrumb: true,
        requires_module: 'neurobalance',
        is_enabled: true,
      },

      {
        navigation_key: 'primary-neurobalance-energy',
        navigation_area: 'primary',
        parent_item_id: null, // Will reference 'primary-neurobalance'
        page_id: pages.find(p => p.page_key === 'neurobalance.energy.overview')?.id,
        label: 'Energie',
        icon_key: 'activity',
        target_type: 'page',
        sort_order: 1,
        show_in_desktop: true,
        show_in_mobile: true,
        show_in_breadcrumb: true,
        requires_module: 'neurobalance',
        is_enabled: true,
      },

      {
        navigation_key: 'primary-neurobalance-energy-checkin',
        navigation_area: 'primary',
        parent_item_id: null, // Will reference 'primary-neurobalance-energy'
        page_id: pages.find(p => p.page_key === 'neurobalance.energy.check_in')?.id,
        label: 'Check-in',
        icon_key: 'clipboard',
        target_type: 'page',
        sort_order: 1,
        show_in_desktop: true,
        show_in_mobile: true,
        show_in_breadcrumb: true,
        requires_module: 'neurobalance',
        is_enabled: true,
      },

      {
        navigation_key: 'primary-neurobalance-energy-history',
        navigation_area: 'primary',
        parent_item_id: null, // Will reference 'primary-neurobalance-energy'
        page_id: pages.find(p => p.page_key === 'neurobalance.energy.history')?.id,
        label: 'Verlauf',
        icon_key: 'trending-up',
        target_type: 'page',
        sort_order: 2,
        show_in_desktop: true,
        show_in_mobile: true,
        show_in_breadcrumb: true,
        requires_module: 'neurobalance',
        is_enabled: true,
      },

      {
        navigation_key: 'primary-neurobalance-regulation',
        navigation_area: 'primary',
        parent_item_id: null, // Will reference 'primary-neurobalance'
        page_id: pages.find(p => p.page_key === 'neurobalance.regulation.overview')?.id,
        label: 'Regulation',
        icon_key: 'settings',
        target_type: 'page',
        sort_order: 2,
        show_in_desktop: true,
        show_in_mobile: true,
        show_in_breadcrumb: true,
        requires_module: 'neurobalance',
        is_enabled: true,
      },

      {
        navigation_key: 'primary-neurobalance-resources',
        navigation_area: 'primary',
        parent_item_id: null, // Will reference 'primary-neurobalance'
        page_id: pages.find(p => p.page_key === 'neurobalance.resources.overview')?.id,
        label: 'Ressourcen & Anforderungen',
        icon_key: 'package',
        target_type: 'page',
        sort_order: 3,
        show_in_desktop: true,
        show_in_mobile: true,
        show_in_breadcrumb: true,
        requires_module: 'neurobalance',
        is_enabled: true,
      },

      {
        navigation_key: 'primary-neurobalance-interventions',
        navigation_area: 'primary',
        parent_item_id: null, // Will reference 'primary-neurobalance'
        page_id: pages.find(p => p.page_key === 'neurobalance.interventions.list')?.id,
        label: 'Interventionen',
        icon_key: 'target',
        target_type: 'page',
        sort_order: 4,
        show_in_desktop: true,
        show_in_mobile: true,
        show_in_breadcrumb: true,
        requires_module: 'neurobalance',
        is_enabled: true,
      },

      {
        navigation_key: 'primary-neurobalance-development',
        navigation_area: 'primary',
        parent_item_id: null, // Will reference 'primary-neurobalance'
        page_id: pages.find(p => p.page_key === 'neurobalance.development.timeline')?.id,
        label: 'Entwicklung',
        icon_key: 'trending-up',
        target_type: 'page',
        sort_order: 5,
        show_in_desktop: true,
        show_in_mobile: true,
        show_in_breadcrumb: true,
        requires_module: 'neurobalance',
        is_enabled: true,
      },
    ];

    // Create navigation items
    for (const item of navigationItems) {
      try {
        await pb.collection('app_navigation_items').create(item);
        console.log(`Created navigation item: ${item.navigation_key}`);
      } catch (err) {
        console.error(`Failed to create navigation item ${item.navigation_key}:`, err);
      }
    }

    console.log('Navigation seeding completed');
  } catch (err) {
    console.error('Failed to seed navigation data:', err);
  }
}

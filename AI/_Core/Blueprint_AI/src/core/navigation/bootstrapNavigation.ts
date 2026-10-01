import { pb } from '@/lib/pb';

/**
 * Bootstrap navigation items for Phase D testing.
 * Creates minimal but functional navigation structure in dev.
 * Idempotent: checks if items exist before creating.
 */
export async function bootstrapNavigation(): Promise<void> {
  try {
    // Check if we already have navigation items
    const existing = await pb.collection('app_navigation_items').getList(1, 1);
    if (existing.totalItems > 0) {
      return;
    }

    // Get module and page IDs
    const [modules, pages] = await Promise.all([
      pb.collection('app_modules').getFullList(),
      pb.collection('app_pages').getFullList(),
    ]);

    const platformModule = modules.find(m => m.module_key === 'platform');
    const neurobalanceModule = modules.find(m => m.module_key === 'neurobalance');

    if (!platformModule || !neurobalanceModule) return;

    const homePage = pages.find(p => p.page_key === 'platform.home');
    const todayPage = pages.find(p => p.page_key === 'platform.today');
    const neurobalanceOverviewPage = pages.find(p => p.page_key === 'neurobalance.overview');
    const energyCheckInPage = pages.find(p => p.page_key === 'neurobalance.energy.check_in');
    const energyHistoryPage = pages.find(p => p.page_key === 'neurobalance.energy.history');

    // Create primary group
    const primaryStartGroup = await pb.collection('app_navigation_items').create({
      navigation_key: 'nav-start-group',
      navigation_area: 'primary',
      label: 'Start',
      target_type: 'group',
      sort_order: 1,
      show_in_desktop: true,
      show_in_mobile: true,
      is_enabled: true,
    });

    // Create Start → Home
    if (homePage) {
      await pb.collection('app_navigation_items').create({
        navigation_key: 'nav-start-home',
        navigation_area: 'primary',
        parent_item_id: primaryStartGroup.id,
        page_id: homePage.id,
        label: 'Übersicht',
        target_type: 'page',
        sort_order: 1,
        show_in_desktop: true,
        show_in_mobile: true,
        is_enabled: true,
      });
    }

    // Create Start → Today
    if (todayPage) {
      await pb.collection('app_navigation_items').create({
        navigation_key: 'nav-start-today',
        navigation_area: 'primary',
        parent_item_id: primaryStartGroup.id,
        page_id: todayPage.id,
        label: 'Heute',
        target_type: 'page',
        sort_order: 2,
        show_in_desktop: true,
        show_in_mobile: true,
        is_enabled: true,
      });
    }

    // Create Modules group
    const modulesGroup = await pb.collection('app_navigation_items').create({
      navigation_key: 'nav-modules-group',
      navigation_area: 'primary',
      label: 'Module',
      target_type: 'group',
      sort_order: 2,
      show_in_desktop: true,
      show_in_mobile: true,
      is_enabled: true,
    });

    // Create NeuroBalance group
    const neurobalanceGroup = await pb.collection('app_navigation_items').create({
      navigation_key: 'nav-neurobalance-group',
      navigation_area: 'primary',
      parent_item_id: modulesGroup.id,
      page_id: neurobalanceOverviewPage?.id,
      label: 'NeuroBalance',
      target_type: 'page',
      sort_order: 1,
      show_in_desktop: true,
      show_in_mobile: true,
      is_enabled: true,
    });

    // Create Energy Check-in
    if (energyCheckInPage) {
      await pb.collection('app_navigation_items').create({
        navigation_key: 'nav-energy-checkin',
        navigation_area: 'primary',
        parent_item_id: neurobalanceGroup.id,
        page_id: energyCheckInPage.id,
        label: 'Energy Check-in',
        target_type: 'page',
        sort_order: 1,
        show_in_desktop: true,
        show_in_mobile: true,
        is_enabled: true,
      });
    }

    // Create Energy History
    if (energyHistoryPage) {
      await pb.collection('app_navigation_items').create({
        navigation_key: 'nav-energy-history',
        navigation_area: 'primary',
        parent_item_id: neurobalanceGroup.id,
        page_id: energyHistoryPage.id,
        label: 'Energy Verlauf',
        target_type: 'page',
        sort_order: 2,
        show_in_desktop: true,
        show_in_mobile: true,
        is_enabled: true,
      });
    }

    console.log('[Navigation] Bootstrap complete - created primary navigation structure');
  } catch (err) {
    console.error('[Navigation] Bootstrap failed:', err);
    // Non-fatal: app will continue with empty navigation
  }
}

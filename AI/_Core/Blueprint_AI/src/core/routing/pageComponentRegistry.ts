import { lazy } from 'react';
import { PlaceholderPage } from '@/page-templates/PlaceholderPage';
import { ErrorPage } from '@/page-templates/ErrorPage';

// Lazy-loaded page components
const PlatformHomePage = lazy(() => import('@/platform/pages/HomePage').then(m => ({ default: m.HomePage })));
const PlatformTodayPage = lazy(() => import('@/platform/pages/TodayPage').then(m => ({ default: m.TodayPage })));
const PlatformProfilePage = lazy(() => import('@/platform/pages/ProfilePage').then(m => ({ default: m.ProfilePage })));
const AdminOverviewPage = lazy(() => import('@/platform/pages/AdminOverviewPage').then(m => ({ default: m.AdminOverviewPage })));

const NeuroBalanceOverviewPage = lazy(() => import('@/modules/neurobalance/pages/OverviewPage').then(m => ({ default: m.OverviewPage })));
const NeuroBalanceEnergyOverviewPage = lazy(() => import('@/modules/neurobalance/pages/EnergyOverviewPage').then(m => ({ default: m.EnergyOverviewPage })));
const NeuroBalanceEnergyCheckInPage = lazy(() => import('@/modules/neurobalance/pages/EnergyCheckInPage').then(m => ({ default: m.EnergyCheckInPage })));
const NeuroBalanceEnergyHistoryPage = lazy(() => import('@/modules/neurobalance/pages/EnergyHistoryPage').then(m => ({ default: m.EnergyHistoryPage })));
const NeuroBalanceRegulationOverviewPage = lazy(() => import('@/modules/neurobalance/pages/RegulationOverviewPage').then(m => ({ default: m.RegulationOverviewPage })));
const NeuroBalanceResourcesOverviewPage = lazy(() => import('@/modules/neurobalance/pages/ResourcesOverviewPage').then(m => ({ default: m.ResourcesOverviewPage })));
const NeuroBalanceInterventionsListPage = lazy(() => import('@/modules/neurobalance/pages/InterventionsListPage').then(m => ({ default: m.InterventionsListPage })));
const NeuroBalanceDevelopmentTimelinePage = lazy(() => import('@/modules/neurobalance/pages/DevelopmentTimelinePage').then(m => ({ default: m.DevelopmentTimelinePage })));

export const pageComponentRegistry = {
  // Platform Core
  'platform_home': PlatformHomePage,
  'platform-home': PlatformHomePage,
  'platform_today': PlatformTodayPage,
  'platform-today': PlatformTodayPage,
  'platform_profile': PlatformProfilePage,
  'platform-profile': PlatformProfilePage,

  // NeuroBalance (both underscore and dash versions for compatibility)
  'neurobalance_overview': NeuroBalanceOverviewPage,
  'neurobalance-overview': NeuroBalanceOverviewPage,
  'neurobalance_energy_overview': NeuroBalanceEnergyOverviewPage,
  'neurobalance-energy-overview': NeuroBalanceEnergyOverviewPage,
  'neurobalance_energy_check_in': NeuroBalanceEnergyCheckInPage,
  'neurobalance-energy-check-in': NeuroBalanceEnergyCheckInPage,
  'neurobalance_energy_history': NeuroBalanceEnergyHistoryPage,
  'neurobalance-energy-history': NeuroBalanceEnergyHistoryPage,
  'neurobalance_regulation_overview': NeuroBalanceRegulationOverviewPage,
  'neurobalance-regulation-overview': NeuroBalanceRegulationOverviewPage,
  'neurobalance_resources_overview': NeuroBalanceResourcesOverviewPage,
  'neurobalance-resources-overview': NeuroBalanceResourcesOverviewPage,
  'neurobalance_interventions_list': NeuroBalanceInterventionsListPage,
  'neurobalance-interventions-list': NeuroBalanceInterventionsListPage,
  'neurobalance_development_timeline': NeuroBalanceDevelopmentTimelinePage,
  'neurobalance-development-timeline': NeuroBalanceDevelopmentTimelinePage,

  // Admin
  'admin_overview': AdminOverviewPage,
  'admin-overview': AdminOverviewPage,

  // Error and System Pages
  'system_forbidden': () => ErrorPage({ code: 403 }),
  'system-forbidden': () => ErrorPage({ code: 403 }),
  'system_error': () => ErrorPage({ code: 500 }),
  'system-error': () => ErrorPage({ code: 500 }),
  'system_not_found': () => ErrorPage({ code: 404 }),
  'system-not-found': () => ErrorPage({ code: 404 }),

  // Fallback for unknown or placeholder pages
  'placeholder': PlaceholderPage,
} as const;

export type ComponentKey = keyof typeof pageComponentRegistry;

/**
 * Resolves a component key to a React component.
 * Returns PlaceholderPage for unknown keys instead of throwing.
 */
export function resolveComponent(key: string): React.ComponentType<any> | null {
  const component = pageComponentRegistry[key as ComponentKey];
  
  if (!component) {
    console.warn(`Unknown component key: ${key}. Using PlaceholderPage.`);
    return PlaceholderPage;
  }

  return component;
}



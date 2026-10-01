import { pb } from '@/lib/pb';

export interface PageRecord {
  id: string;
  module_id: string;
  page_key: string;
  title: string;
  short_title?: string;
  description?: string;
  route_path: string;
  route_name?: string;
  page_type: string;
  component_key: string;
  requires_auth: boolean;
  is_landing_page?: boolean;
  is_enabled: boolean;
  lifecycle_status: 'draft' | 'active' | 'deprecated' | 'archived';
  created: string;
  updated: string;
}

let pagesCache: PageRecord[] | null = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 30 * 1000; // 30 seconds for faster updates

// Fallback pages for production when database is unavailable
const FALLBACK_PAGES: PageRecord[] = [
  {
    id: 'fallback-home',
    module_id: 'platform',
    page_key: 'platform.home',
    title: 'Startseite',
    description: 'Willkommen bei NeuroWays — Deine persönliche Plattform für Selbstbeobachtung und Neuroregulation.',
    route_path: '/',
    page_type: 'dashboard',
    component_key: 'platform_home',
    requires_auth: false,
    is_enabled: true,
    lifecycle_status: 'active',
    created: '',
    updated: '',
  },
  {
    id: 'fallback-neurobalance',
    module_id: 'neurobalance',
    page_key: 'neurobalance.overview',
    title: 'NeuroBalance',
    description: 'Erkunde Deine Energie, Regulation und inneren Ressourcen mit NeuroBalance.',
    route_path: '/neurobalance',
    page_type: 'overview',
    component_key: 'neurobalance_overview',
    requires_auth: false,
    is_enabled: true,
    lifecycle_status: 'active',
    created: '',
    updated: '',
  },
  {
    id: 'fallback-energy-overview',
    module_id: 'neurobalance',
    page_key: 'neurobalance.energy.overview',
    title: 'Energie-Überblick',
    description: 'Verfolge Deine Energielevel und erkenne Muster in Deinem Wohlbefinden.',
    route_path: '/neurobalance/energy',
    page_type: 'overview',
    component_key: 'neurobalance_energy_overview',
    requires_auth: false,
    is_enabled: true,
    lifecycle_status: 'active',
    created: '',
    updated: '',
  },
  {
    id: 'fallback-energy-checkin',
    module_id: 'neurobalance',
    page_key: 'neurobalance.energy.check_in',
    title: 'Energie-Check-in',
    description: 'Mache einen schnellen Check-in Deines aktuellen Energieniveaus.',
    route_path: '/neurobalance/energy/checkin',
    page_type: 'check_in',
    component_key: 'neurobalance_energy_check_in',
    requires_auth: false,
    is_enabled: true,
    lifecycle_status: 'active',
    created: '',
    updated: '',
  },
  {
    id: 'fallback-energy-history',
    module_id: 'neurobalance',
    page_key: 'neurobalance.energy.history',
    title: 'Energieverlauf',
    description: 'Sieh Deine Energie-Check-ins über Zeit und erkenne Veränderungen.',
    route_path: '/neurobalance/energy/history',
    page_type: 'overview',
    component_key: 'neurobalance_energy_history',
    requires_auth: false,
    is_enabled: true,
    lifecycle_status: 'active',
    created: '',
    updated: '',
  },
  {
    id: 'fallback-regulation',
    module_id: 'neurobalance',
    page_key: 'neurobalance.regulation.overview',
    title: 'Selbstregulation',
    description: 'Lerne Strategien zur Selbstregulation und Neuroregulation.',
    route_path: '/neurobalance/regulation',
    page_type: 'overview',
    component_key: 'neurobalance_regulation_overview',
    requires_auth: false,
    is_enabled: true,
    lifecycle_status: 'active',
    created: '',
    updated: '',
  },
  {
    id: 'fallback-interventions',
    module_id: 'neurobalance',
    page_key: 'neurobalance.interventions.list',
    title: 'Interventionen',
    description: 'Entdecke praktische Interventionen für verschiedene Situationen.',
    route_path: '/neurobalance/interventions',
    page_type: 'list',
    component_key: 'neurobalance_interventions_list',
    requires_auth: false,
    is_enabled: true,
    lifecycle_status: 'active',
    created: '',
    updated: '',
  },
  {
    id: 'fallback-resources',
    module_id: 'neurobalance',
    page_key: 'neurobalance.resources.overview',
    title: 'Ressourcen & Anforderungen',
    description: 'Erkenne Deine inneren Ressourcen und verstehe Deine Anforderungen.',
    route_path: '/neurobalance/resources',
    page_type: 'overview',
    component_key: 'neurobalance_resources_overview',
    requires_auth: false,
    is_enabled: true,
    lifecycle_status: 'active',
    created: '',
    updated: '',
  },
  {
    id: 'fallback-development',
    module_id: 'neurobalance',
    page_key: 'neurobalance.development.timeline',
    title: 'Entwicklung & Wachstum',
    description: 'Verfolge Deine persönliche Entwicklung und Dein Wachstum über Zeit.',
    route_path: '/neurobalance/development',
    page_type: 'timeline',
    component_key: 'neurobalance_development_timeline',
    requires_auth: false,
    is_enabled: true,
    lifecycle_status: 'active',
    created: '',
    updated: '',
  },
  {
    id: 'fallback-today',
    module_id: 'platform',
    page_key: 'platform.today',
    title: 'Heute',
    description: 'Dein Überblick für heute — alle wichtigen Informationen auf einen Blick.',
    route_path: '/today',
    page_type: 'overview',
    component_key: 'platform_today',
    requires_auth: false,
    is_enabled: true,
    lifecycle_status: 'active',
    created: '',
    updated: '',
  },
  {
    id: 'fallback-profile',
    module_id: 'platform',
    page_key: 'platform.profile',
    title: 'Profil',
    description: 'Verwalte Dein Profil und Deine persönlichen Einstellungen.',
    route_path: '/profile',
    page_type: 'overview',
    component_key: 'platform_profile',
    requires_auth: false,
    is_enabled: true,
    lifecycle_status: 'active',
    created: '',
    updated: '',
  },
  {
    id: 'fallback-admin',
    module_id: 'admin',
    page_key: 'admin.overview',
    title: 'Administration',
    description: 'Administrationspanel für NeuroWays.',
    route_path: '/admin',
    page_type: 'overview',
    component_key: 'admin_overview',
    requires_auth: false,
    is_enabled: true,
    lifecycle_status: 'active',
    created: '',
    updated: '',
  },
];

export async function loadPages(): Promise<PageRecord[]> {
  const now = Date.now();
  if (pagesCache && now - cacheTimestamp < CACHE_DURATION) {
    return pagesCache;
  }

  try {
    const result = await pb.collection('app_pages').getFullList<PageRecord>({
      filter: 'is_enabled = true && lifecycle_status = "active"',
    });
    pagesCache = result;
    cacheTimestamp = now;
    return result;
  } catch (error) {
    console.warn('Pages database unavailable, using fallback:', error);
    pagesCache = FALLBACK_PAGES;
    cacheTimestamp = now;
    return FALLBACK_PAGES;
  }
}

export function getPageByKey(pages: PageRecord[], key: string): PageRecord | undefined {
  return pages.find(p => p.page_key === key);
}

export function getPageByRoute(pages: PageRecord[], route: string): PageRecord | undefined {
  return pages.find(p => p.route_path === route);
}

export const pageComponentRegistry = {
  dashboard: null,
  overview: null,
  list: null,
  detail: null,
  form: null,
  wizard: null,
  check_in: null,
  result: null,
  timeline: null,
  content: null,
  settings: null,
  admin: null,
  external: null,
  error: null,
  placeholder: null,
  // Specific components
  auth_login: null,
  auth_invitation: null,
  platform_onboarding: null,
  platform_home: null,
  platform_today: null,
  platform_profile: null,
  system_forbidden: null,
  system_error: null,
  system_not_found: null,
  neurobalance_overview: null,
  neurobalance_energy_overview: null,
  neurobalance_energy_check_in: null,
  neurobalance_energy_history: null,
  neurobalance_regulation_overview: null,
  neurobalance_resources_overview: null,
  neurobalance_interventions_list: null,
  neurobalance_development_timeline: null,
} as const;

export type ComponentKey = keyof typeof pageComponentRegistry;

import { pb } from '@/lib/pb';

export interface NavigationItem {
  id: string;
  navigation_key: string;
  navigation_area: 'primary' | 'module' | 'context' | 'mobile' | 'user' | 'footer' | 'admin' | 'quick_access';
  page_id?: string;
  label: string;
  short_label?: string;
  icon_key?: string;
  target_type: 'page' | 'external' | 'group' | 'action';
  target_url?: string;
  sort_order?: number;
  show_in_desktop: boolean;
  show_in_mobile: boolean;
  show_in_breadcrumb: boolean;
  is_enabled: boolean;
  created: string;
  updated: string;
}

let navigationCache: NavigationItem[] | null = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 5 * 60 * 1000;

// Fallback navigation when database is temporarily unavailable
const FALLBACK_NAVIGATION: NavigationItem[] = [
  {
    id: 'fallback-nav-1',
    navigation_key: 'nav-ubersicht',
    label: 'Übersicht',
    navigation_area: 'primary',
    is_enabled: true,
    show_in_desktop: true,
    show_in_mobile: true,
    show_in_breadcrumb: true,
    page_id: 'tthcvl3ofd5deic',
    target_type: 'page',
    sort_order: 1,
    created: '',
    updated: '',
  },
  {
    id: 'fallback-nav-2',
    navigation_key: 'nav-neurobalance',
    label: 'NeuroBalance',
    navigation_area: 'primary',
    is_enabled: true,
    show_in_desktop: true,
    show_in_mobile: true,
    show_in_breadcrumb: true,
    page_id: '234g0e8l05b3xv8',
    target_type: 'page',
    sort_order: 2,
    created: '',
    updated: '',
  },
];

export async function loadNavigation(): Promise<NavigationItem[]> {
  const now = Date.now();
  if (navigationCache && now - cacheTimestamp < CACHE_DURATION) {
    return navigationCache;
  }

  try {
    const result = await pb.collection('app_navigation_items').getFullList<NavigationItem>({
      filter: 'is_enabled = true',
      sort: 'sort_order,label',
    });
    navigationCache = result;
    cacheTimestamp = now;
    return result;
  } catch (error) {
    console.warn('Navigation database unavailable, using fallback:', error);
    // Use fallback navigation when database is unavailable
    navigationCache = FALLBACK_NAVIGATION;
    cacheTimestamp = now;
    return FALLBACK_NAVIGATION;
  }
}

export function getNavigationByArea(
  navigation: NavigationItem[],
  area: NavigationItem['navigation_area']
): NavigationItem[] {
  return navigation.filter(item => item.navigation_area === area && item.is_enabled);
}

export function getNavigationForDevice(
  navigation: NavigationItem[],
  area: NavigationItem['navigation_area'],
  device: 'desktop' | 'mobile'
): NavigationItem[] {
  return navigation.filter(item => {
    const isInArea = item.navigation_area === area && item.is_enabled;
    const isVisible = device === 'desktop' ? item.show_in_desktop : item.show_in_mobile;
    return isInArea && isVisible;
  });
}

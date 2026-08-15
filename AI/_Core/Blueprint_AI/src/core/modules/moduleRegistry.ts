import { pb } from '@/lib/pb';

export interface Module {
  id: string;
  module_key: string;
  name: string;
  description?: string;
  base_path?: string;
  icon_key?: string;
  color_key?: string;
  module_version?: string;
  module_status: 'draft' | 'active' | 'deprecated' | 'archived';
  is_core_module?: boolean;
  is_enabled: boolean;
  sort_order?: number;
  created: string;
  updated: string;
}

let modulesCache: Module[] | null = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Fallback modules for production when database is unavailable
const FALLBACK_MODULES: Module[] = [
  {
    id: 'fallback-platform',
    module_key: 'platform',
    name: 'Platform',
    module_status: 'active',
    is_enabled: true,
    sort_order: 1,
    created: '',
    updated: '',
  },
  {
    id: 'fallback-neurobalance',
    module_key: 'neurobalance',
    name: 'NeuroBalance',
    module_status: 'active',
    is_enabled: true,
    sort_order: 2,
    created: '',
    updated: '',
  },
  {
    id: 'fallback-admin',
    module_key: 'admin',
    name: 'Administration',
    module_status: 'active',
    is_enabled: true,
    sort_order: 3,
    created: '',
    updated: '',
  },
];

export async function loadModules(): Promise<Module[]> {
  const now = Date.now();
  if (modulesCache && now - cacheTimestamp < CACHE_DURATION) {
    return modulesCache;
  }

  try {
    const result = await pb.collection('app_modules').getFullList<Module>({
      sort: 'sort_order',
    });
    modulesCache = result;
    cacheTimestamp = now;
    return result;
  } catch (error) {
    console.warn('Modules database unavailable, using fallback:', error);
    modulesCache = FALLBACK_MODULES;
    cacheTimestamp = now;
    return FALLBACK_MODULES;
  }
}

export function getEnabledModules(modules: Module[]): Module[] {
  return modules.filter(m => m.is_enabled && m.module_status === 'active');
}

export function getModuleByKey(modules: Module[], key: string): Module | undefined {
  return modules.find(m => m.module_key === key);
}

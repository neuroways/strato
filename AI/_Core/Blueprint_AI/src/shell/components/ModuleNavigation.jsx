import { useEffect, useState } from 'react';
import { loadModules } from '@/core/modules/moduleRegistry';

export function ModuleNavigation({ orientation = 'horizontal' }) {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const allModules = await loadModules();
        // Show all modules (both active and draft) so user sees what's coming
        const sorted = allModules.sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
        setModules(sorted);
      } catch (err) {
        console.error('Failed to load modules:', err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) {
    return null;
  }

  if (modules.length === 0) {
    return null;
  }

  const activeModules = modules.filter(m => m.is_enabled && m.module_status === 'active');
  const draftModules = modules.filter(m => !m.is_enabled || m.module_status === 'draft');

  if (orientation === 'vertical') {
    // Sidebar / Vertical Layout
    return (
      <nav className="space-y-1" aria-label="Module Navigation">
        {/* Active Modules */}
        {activeModules.length > 0 && (
          <div>
            <h3 className="px-3 py-2 text-xs font-bold uppercase text-nw-navy">
              Module
            </h3>
            {activeModules.map(module => (
              <a
                key={module.id}
                href={module.base_path}
                className="flex items-center gap-3 px-3 py-2.5 sm:py-3 rounded-medium text-sm sm:text-base font-bold text-nw-navy hover:bg-nw-pale-blue hover:text-nw-teal transition-colors duration-fast focus:outline-2 focus:outline-nw-teal focus:outline-offset-2"
              >
                <span className="w-2 h-2 rounded-full bg-nw-teal flex-shrink-0" aria-hidden="true"></span>
                {module.name}
              </a>
            ))}
          </div>
        )}

        {/* Draft/Coming Soon */}
        {draftModules.length > 0 && (
          <div>
            <h3 className="px-3 py-2 text-xs font-bold uppercase text-nw-light-gray mt-4">
              Demnächst
            </h3>
            {draftModules.map(module => (
              <div
                key={module.id}
                className="flex items-center gap-3 px-3 py-2.5 sm:py-3 rounded-medium text-sm sm:text-base font-bold text-nw-light-gray opacity-60 cursor-not-allowed"
              >
                <span className="w-2 h-2 rounded-full bg-nw-section-gray flex-shrink-0" aria-hidden="true"></span>
                {module.name}
              </div>
            ))}
          </div>
        )}
      </nav>
    );
  }

  // Horizontal / Grid Layout (for homepage)
  return (
    <div className="space-y-8 sm:space-y-12">
      {/* Active Modules */}
      {activeModules.length > 0 && (
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-nw-navy mb-6 sm:mb-8">Verfügbare Module</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {activeModules.map(module => (
              <a
                key={module.id}
                href={module.base_path}
                className="p-5 sm:p-6 bg-nw-white border border-nw-section-gray rounded-medium hover:shadow-lg hover:border-nw-teal transition-all group focus:outline-3 focus:outline-nw-teal focus:outline-offset-2"
              >
                <div className="flex items-start justify-between gap-3 mb-3 sm:mb-4">
                  <div>
                    <h3 className="font-bold text-nw-navy group-hover:text-nw-teal text-base sm:text-lg">
                      {module.name}
                    </h3>
                  </div>
                  <span className="text-xl text-nw-teal flex-shrink-0" aria-hidden="true">→</span>
                </div>
                {module.description && (
                  <p className="text-xs sm:text-sm text-nw-charcoal leading-relaxed">{module.description}</p>
                )}
                <div className="text-xs text-nw-light-gray mt-3 font-bold">
                  {module.module_status === 'active' && module.is_enabled && 'Aktiv'}
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Draft/Coming Soon Modules */}
      {draftModules.length > 0 && (
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-nw-navy mb-6 sm:mb-8">Demnächst verfügbar</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {draftModules.map(module => (
              <div
                key={module.id}
                className="p-5 sm:p-6 bg-nw-pale-blue border border-nw-section-gray rounded-medium opacity-60 cursor-not-allowed"
              >
                <div className="flex items-start justify-between gap-3 mb-3 sm:mb-4">
                  <div>
                    <h3 className="font-bold text-nw-charcoal text-base sm:text-lg">
                      {module.name}
                    </h3>
                  </div>
                  <span className="text-xl text-nw-light-gray flex-shrink-0" aria-hidden="true">⏳</span>
                </div>
                {module.description && (
                  <p className="text-xs sm:text-sm text-nw-light-gray leading-relaxed">{module.description}</p>
                )}
                <div className="text-xs text-nw-light-gray mt-3 font-bold">
                  In Entwicklung
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

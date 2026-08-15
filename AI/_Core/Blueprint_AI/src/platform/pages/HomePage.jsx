import { useEffect, useState } from 'react';
import { loadModules } from '@/core/modules/moduleRegistry';
import { ModuleNavigation } from '@/shell/components/ModuleNavigation';
import Heart from 'icon:heart';
import Zap from 'icon:zap';
import Lightbulb from 'icon:lightbulb';

export function HomePage() {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const allModules = await loadModules();
        const activeModules = allModules.filter(
          m => m.is_enabled && m.module_status === 'active'
        );
        setModules(activeModules);
      } catch (err) {
        console.error('Failed to load modules:', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="space-y-12 sm:space-y-16 lg:space-y-20">
      {/* Hero Section */}
      <div className="space-y-6 sm:space-y-8">
        <div className="space-y-3 sm:space-y-4">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-nw-navy leading-tight">
            Erkenne Deine Energie
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-nw-charcoal max-w-2xl leading-relaxed">
            NeuroWays hilft Dir, Deine Energie, Deine Regulation und Deine inneren Ressourcen zu verstehen. Beobachte, lerne und wachse.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-6 sm:pt-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-nw-violet flex-shrink-0" aria-hidden="true" />
              <span className="text-xs sm:text-sm font-bold text-nw-navy">Ressourcen</span>
            </div>
            <p className="text-xs text-nw-charcoal">Erkenne Deine Stärken</p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-nw-gold flex-shrink-0" aria-hidden="true" />
              <span className="text-xs sm:text-sm font-bold text-nw-navy">Energie</span>
            </div>
            <p className="text-xs text-nw-charcoal">Verfolge Dein Level</p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6 text-nw-teal flex-shrink-0" aria-hidden="true" />
              <span className="text-xs sm:text-sm font-bold text-nw-navy">Regulation</span>
            </div>
            <p className="text-xs text-nw-charcoal">Finde Dein Gleichgewicht</p>
          </div>
        </div>
      </div>

      {/* Module Navigation */}
      <ModuleNavigation orientation="horizontal" />

      {/* Features Section */}
      {!loading && modules.length > 0 && (
        <div className="space-y-8 pt-12 sm:pt-16 border-t border-nw-section-gray">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-nw-navy mb-6 sm:mb-8">Deine Module</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {modules.map(module => (
                <a
                  key={module.id}
                  href={module.base_path}
                  className="group p-5 sm:p-6 bg-nw-white border border-nw-section-gray rounded-medium hover:shadow-lg hover:border-nw-teal transition-all duration-fast focus:outline-3 focus:outline-nw-teal focus:outline-offset-2"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2 sm:space-y-3 flex-1">
                      <h3 className="font-bold text-nw-navy text-base sm:text-lg group-hover:text-nw-teal transition-colors">
                        {module.name}
                      </h3>
                      {module.description && (
                        <p className="text-xs sm:text-sm text-nw-charcoal leading-relaxed">
                          {module.description}
                        </p>
                      )}
                    </div>
                    <span className="text-2xl text-nw-teal group-hover:translate-x-1 transition-transform duration-fast flex-shrink-0" aria-hidden="true">
                      →
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

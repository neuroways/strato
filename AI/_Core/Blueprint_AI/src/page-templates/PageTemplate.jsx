import { useEffect, useState } from 'react';
import { loadPages } from '@/core/routing/pageRegistry';
import ArrowLeft from 'icon:arrow-left';

// Static page descriptions - sourced from database structure as fallback
const STATIC_DESCRIPTIONS = {
  'platform.home': 'Willkommen bei NeuroWays — Deine persönliche Plattform für Selbstbeobachtung und Neuroregulation.',
  'neurobalance.overview': 'Erkunde Deine Energie, Regulation und inneren Ressourcen mit NeuroBalance.',
  'neurobalance.energy.overview': 'Verfolge Deine Energielevel und erkenne Muster in Deinem Wohlbefinden.',
  'neurobalance.energy.check_in': 'Mache einen schnellen Check-in Deines aktuellen Energieniveaus.',
  'neurobalance.energy.history': 'Sieh Deine Energie-Check-ins über Zeit und erkenne Veränderungen.',
  'neurobalance.regulation.overview': 'Lerne Strategien zur Selbstregulation und Neuroregulation.',
  'neurobalance.interventions.list': 'Entdecke praktische Interventionen für verschiedene Situationen.',
  'neurobalance.resources.overview': 'Erkenne Deine inneren Ressourcen und verstehe Deine Anforderungen.',
  'neurobalance.development.timeline': 'Verfolge Deine persönliche Entwicklung und Dein Wachstum über Zeit.',
  'platform.today': 'Dein Überblick für heute — alle wichtigen Informationen auf einen Blick.',
  'platform.profile': 'Verwalte Dein Profil und Deine persönlichen Einstellungen.',
  'admin.overview': 'Administrationspanel für NeuroWays.',
};

// Helper function to get the back link based on current pageKey
function getBackLink(pageKey) {
  // For neurobalance subpages, go back to neurobalance overview
  if (pageKey.startsWith('neurobalance.') && pageKey !== 'neurobalance.overview') {
    return '/neurobalance';
  }
  
  return '/';
}

export function PageTemplate({ title, pageKey, children }) {
  const [description, setDescription] = useState(() => {
    return STATIC_DESCRIPTIONS[pageKey] || '';
  });

  useEffect(() => {
    const loadDescription = async () => {
      try {
        const pages = await loadPages();
        const page = pages.find(p => p.page_key === pageKey);
        if (page && page.description) {
          setDescription(page.description);
        } else if (STATIC_DESCRIPTIONS[pageKey]) {
          setDescription(STATIC_DESCRIPTIONS[pageKey]);
        }
      } catch (err) {
        if (STATIC_DESCRIPTIONS[pageKey]) {
          setDescription(STATIC_DESCRIPTIONS[pageKey]);
        }
      }
    };

    loadDescription();
  }, [pageKey]);

  const backLink = getBackLink(pageKey);

  return (
    <div className="min-h-screen bg-nw-soft-white flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-b from-nw-pale-blue via-nw-white to-transparent border-b border-nw-section-gray">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-nw-navy mb-4 sm:mb-6 leading-tight">
            {title}
          </h1>
          {description && (
            <p className="text-base sm:text-lg text-nw-charcoal max-w-2xl leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          {children ? (
            children
          ) : (
            <div className="text-center py-16 sm:py-20">
              <div className="inline-flex items-center justify-center w-16 sm:w-20 h-16 sm:h-20 rounded-medium bg-nw-pale-blue mb-6 sm:mb-8">
                <svg className="w-8 sm:w-10 h-8 sm:h-10 text-nw-light-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m0 0h6m0 0h-6m0 0h-6" />
                </svg>
              </div>
              <p className="text-base sm:text-lg text-nw-charcoal font-bold">Diese Seite wird noch vorbereitet.</p>
            </div>
          )}
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="border-t border-nw-section-gray bg-nw-white mt-auto">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <a
            href={backLink}
            className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-medium bg-nw-navy text-nw-white font-bold text-sm hover:bg-nw-teal hover:text-nw-navy transition-colors duration-fast focus:outline-3 focus:outline-nw-teal focus:outline-offset-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Zurück</span>
          </a>
        </div>
      </div>
    </div>
  );
}

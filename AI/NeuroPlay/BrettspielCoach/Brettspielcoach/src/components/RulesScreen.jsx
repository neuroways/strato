import { Search, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export function RulesScreen({ game, onBack }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState(null);

  const categories = [
    {
      title: 'Spielmaterial',
      items: game.material.map(m => ({
        name: m.name,
        description: m.description
      }))
    },
    {
      title: 'Aktionen',
      items: game.actions.map(a => ({
        name: a.name,
        description: `${a.description}\n\nKosten: ${a.cost}`
      }))
    },
    {
      title: 'Spezialregeln',
      items: game.specialRules.map(r => ({
        name: r.name,
        description: r.description
      }))
    },
    {
      title: 'Typische Anfängerfehler',
      items: game.beginnerMistakes.map(m => ({
        name: m.mistake,
        description: `Warum: ${m.why}\n\nLösung: ${m.solution}`
      }))
    }
  ];

  const allItems = categories.flatMap(cat => 
    cat.items.map(item => ({
      ...item,
      category: cat.title
    }))
  );

  const filtered = searchTerm.trim() 
    ? allItems.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : allItems;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <div className="border-b border-slate-700 p-4">
        <button
          onClick={onBack}
          className="text-slate-400 hover:text-white transition-colors text-sm flex items-center gap-2 mb-4"
        >
          ← Zurück
        </button>
        <h1 className="text-2xl font-bold">Regeln</h1>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6">
        {/* Search */}
        <div className="mb-8 relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
          <input
            type="text"
            placeholder="Regel durchsuchen..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        {/* Results */}
        {searchTerm.trim() ? (
          // Search results
          <div className="space-y-3">
            {filtered.length > 0 ? (
              filtered.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-slate-800 border border-slate-700 rounded-lg p-4"
                >
                  <p className="text-xs text-blue-400 mb-2">{item.category}</p>
                  <h3 className="font-semibold mb-2">{item.name}</h3>
                  <p className="text-slate-300 text-sm whitespace-pre-wrap">
                    {item.description}
                  </p>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-slate-400">
                Keine Regeln gefunden. Versuche einen anderen Suchbegriff.
              </div>
            )}
          </div>
        ) : (
          // Categories
          <div className="space-y-3">
            {categories.map((category, catIdx) => (
              <div
                key={catIdx}
                className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => setActiveCategory(activeCategory === catIdx ? -1 : catIdx)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-700/50 transition-colors"
                >
                  <span className="font-semibold text-lg">{category.title}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${
                      activeCategory === catIdx ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {activeCategory === catIdx && (
                  <div className="border-t border-slate-700 bg-slate-700/30">
                    {category.items.map((item, itemIdx) => (
                      <div
                        key={itemIdx}
                        className={`px-6 py-4 ${
                          itemIdx > 0 ? 'border-t border-slate-600' : ''
                        }`}
                      >
                        <h4 className="font-semibold mb-2">{item.name}</h4>
                        <p className="text-slate-300 text-sm whitespace-pre-wrap">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

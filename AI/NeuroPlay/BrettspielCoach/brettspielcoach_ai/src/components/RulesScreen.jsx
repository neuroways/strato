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
    <div className="min-h-screen" style={{ backgroundColor: 'var(--nw-bg-primary)', color: 'var(--nw-text-primary)' }}>
      {/* Header */}
      <div className="border-b p-4" style={{ borderColor: 'var(--nw-border)' }}>
        <button
          onClick={onBack}
          onMouseEnter={(e) => e.currentTarget.style.color = 'var(--nw-primary)'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'var(--nw-secondary)'}
          className="transition-colors text-sm flex items-center gap-2 mb-4"
          style={{ color: 'var(--nw-secondary)' }}
        >
          ← Zurück
        </button>
        <h1 className="text-2xl font-bold" style={{ color: 'var(--nw-primary)' }}>Regeln</h1>
      </div>

      <div className="max-w-3xl mx-auto px-4 md:px-8 py-6">
        {/* Search */}
        <div className="mb-8 relative">
          <Search className="absolute left-3 top-3 w-5 h-5" style={{ color: 'var(--nw-text-tertiary)' }} />
          <input
            type="text"
            placeholder="Regel durchsuchen..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="nw-input w-full pl-10 pr-4 py-3 rounded-lg transition-colors"
            style={{
              backgroundColor: 'var(--nw-surface)',
              borderColor: 'var(--nw-border)',
              borderWidth: '1px',
              color: 'var(--nw-text-primary)'
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = 'var(--nw-secondary)';
              e.currentTarget.style.outlineColor = 'var(--nw-secondary)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'var(--nw-border)';
            }}
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
                  className="rounded-lg p-4 transition-all"
                  style={{
                    backgroundColor: 'var(--nw-surface)',
                    borderColor: 'var(--nw-border)',
                    borderWidth: '1px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--nw-secondary)';
                    e.currentTarget.style.boxShadow = 'var(--nw-shadow-md)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--nw-border)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <p className="text-xs mb-2" style={{ color: 'var(--nw-secondary)' }}>{item.category}</p>
                  <h3 className="font-semibold mb-2" style={{ color: 'var(--nw-primary)' }}>{item.name}</h3>
                  <p className="text-sm whitespace-pre-wrap" style={{ color: 'var(--nw-text-secondary)' }}>
                    {item.description}
                  </p>
                </div>
              ))
            ) : (
              <div className="text-center py-8" style={{ color: 'var(--nw-text-secondary)' }}>
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
                className="rounded-lg overflow-hidden transition-all"
                style={{
                  backgroundColor: 'var(--nw-surface)',
                  borderColor: 'var(--nw-border)',
                  borderWidth: '1px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--nw-secondary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--nw-border)';
                }}
              >
                <button
                  onClick={() => setActiveCategory(activeCategory === catIdx ? -1 : catIdx)}
                  onMouseEnter={(e) => {
                    const parent = e.currentTarget.closest('div');
                    parent.style.backgroundColor = 'rgba(0, 140, 168, 0.05)';
                  }}
                  onMouseLeave={(e) => {
                    const parent = e.currentTarget.closest('div');
                    parent.style.backgroundColor = 'var(--nw-surface)';
                  }}
                  className="w-full px-6 py-4 flex items-center justify-between transition-colors"
                >
                  <span className="font-semibold text-lg" style={{ color: 'var(--nw-primary)' }}>{category.title}</span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-200 ${
                      activeCategory === catIdx ? 'rotate-180' : ''
                    }`}
                    style={{ color: 'var(--nw-text-secondary)' }}
                  />
                </button>

                {activeCategory === catIdx && (
                  <div className="border-t" style={{ borderColor: 'var(--nw-border)', backgroundColor: 'rgba(0, 140, 168, 0.03)' }}>
                    {category.items.map((item, itemIdx) => (
                      <div
                        key={itemIdx}
                        className={`px-6 py-4 ${
                          itemIdx > 0 ? 'border-t' : ''
                        }`}
                        style={{ borderColor: itemIdx > 0 ? 'var(--nw-border)' : 'transparent' }}
                      >
                        <h4 className="font-semibold mb-2" style={{ color: 'var(--nw-primary)' }}>{item.name}</h4>
                        <p className="text-sm whitespace-pre-wrap" style={{ color: 'var(--nw-text-secondary)' }}>
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

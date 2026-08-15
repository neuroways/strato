import { ArrowRight, HelpCircle, Play, Zap, BookOpen, Users, Clock, Gauge } from 'lucide-react';

export function GameOverview({ game, onNavigate }) {
  const sections = [
    { id: 'quickstart', icon: Zap, label: 'Schnellstart', colorVar: '--nw-highlight' },
    { id: 'setup', icon: BookOpen, label: 'Spielaufbau', colorVar: '--nw-secondary' },
    { id: 'rules', icon: BookOpen, label: 'Regeln', colorVar: '--nw-accent' },
    { id: 'gameflow', icon: Play, label: 'Spielablauf', colorVar: '--nw-secondary' },
    { id: 'strategy', icon: Zap, label: 'Strategie', colorVar: '--nw-accent' },
    { id: 'coach', icon: HelpCircle, label: 'Coach fragen', colorVar: '--nw-primary' },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--nw-bg-primary)', color: 'var(--nw-text-primary)' }}>
      {/* Header */}
      <div className="border-b p-4" style={{ borderColor: 'var(--nw-border)' }}>
        <button
          onClick={() => onNavigate('start')}
          onMouseEnter={(e) => e.currentTarget.style.color = 'var(--nw-primary)'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'var(--nw-secondary)'}
          className="transition-colors text-sm"
          style={{ color: 'var(--nw-secondary)' }}
        >
          ← Startseite
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-8 py-8">
        {/* Game Title */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-3" style={{ color: 'var(--nw-primary)' }}>{game.title}</h1>
          <p className="text-lg" style={{ color: 'var(--nw-text-secondary)' }}>{game.description}</p>

          {/* Meta Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="rounded-lg p-4" style={{ backgroundColor: 'var(--nw-surface)', borderColor: 'var(--nw-border)', borderWidth: '1px' }}>
              <Users className="w-5 h-5 mb-2" style={{ color: 'var(--nw-secondary)' }} />
              <p className="text-xs" style={{ color: 'var(--nw-text-secondary)' }}>Spieler</p>
              <p className="font-semibold" style={{ color: 'var(--nw-primary)' }}>{game.basics.playerCount.min}–{game.basics.playerCount.max}</p>
            </div>
            <div className="rounded-lg p-4" style={{ backgroundColor: 'var(--nw-surface)', borderColor: 'var(--nw-border)', borderWidth: '1px' }}>
              <Clock className="w-5 h-5 mb-2" style={{ color: 'var(--nw-highlight)' }} />
              <p className="text-xs" style={{ color: 'var(--nw-text-secondary)' }}>Dauer</p>
              <p className="font-semibold" style={{ color: 'var(--nw-primary)' }}>{game.basics.duration.min}–{game.basics.duration.max} Min.</p>
            </div>
            <div className="rounded-lg p-4" style={{ backgroundColor: 'var(--nw-surface)', borderColor: 'var(--nw-border)', borderWidth: '1px' }}>
              <Gauge className="w-5 h-5 mb-2" style={{ color: 'var(--nw-accent)' }} />
              <p className="text-xs" style={{ color: 'var(--nw-text-secondary)' }}>Komplexität</p>
              <p className="font-semibold capitalize" style={{ color: 'var(--nw-primary)' }}>{game.basics.complexity}</p>
            </div>
            <div className="rounded-lg p-4" style={{ backgroundColor: 'var(--nw-surface)', borderColor: 'var(--nw-border)', borderWidth: '1px' }}>
              <p className="text-xs" style={{ color: 'var(--nw-text-secondary)' }}>Alter</p>
              <p className="font-semibold" style={{ color: 'var(--nw-primary)' }}>{game.basics.age}</p>
            </div>
          </div>
        </div>

        {/* Goal Box */}
        <div className="rounded-lg p-6 mb-8" style={{ backgroundColor: 'rgba(0, 140, 168, 0.08)', borderColor: 'var(--nw-secondary)', borderWidth: '1px' }}>
          <h2 className="text-lg font-semibold mb-2" style={{ color: 'var(--nw-primary)' }}>🎯 Spielziel</h2>
          <p style={{ color: 'var(--nw-text-secondary)' }}>{game.goal}</p>
        </div>

        {/* Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {sections.map((section) => {
            const Icon = section.icon;
            const bgColor = `var(${section.colorVar})`;
            return (
              <button
                key={section.id}
                onClick={() => onNavigate(section.id)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = 'var(--nw-shadow-lg)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'var(--nw-shadow-sm)';
                }}
                className="group relative px-6 py-6 rounded-lg transition-all duration-200 text-left"
                style={{
                  backgroundColor: bgColor,
                  color: section.colorVar === '--nw-highlight' ? 'var(--nw-primary)' : 'white',
                  boxShadow: 'var(--nw-shadow-sm)'
                }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <Icon className="w-6 h-6 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold">{section.label}</p>
                      <p className="text-sm opacity-90 mt-1">
                        {section.id === 'quickstart' && 'Das Wichtigste in 5 Schritten'}
                        {section.id === 'setup' && 'Schritt für Schritt aufgebaut'}
                        {section.id === 'rules' && 'Alle Regeln durchsuchen'}
                        {section.id === 'gameflow' && 'Wie ein Zug funktioniert'}
                        {section.id === 'strategy' && 'Tipps zum Gewinnen'}
                        {section.id === 'coach' && 'Frag den Coach'}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Start Game Button */}
        <button
          onClick={() => onNavigate('gamemode')}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--nw-primary-dark)';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = 'var(--nw-shadow-lg)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--nw-primary)';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'var(--nw-shadow-md)';
          }}
          className="w-full py-4 rounded-lg font-semibold text-lg transition-all duration-200 text-white min-h-[48px]"
          style={{
            backgroundColor: 'var(--nw-primary)',
            boxShadow: 'var(--nw-shadow-md)'
          }}
        >
          ▶ Partie starten
        </button>
      </div>
    </div>
  );
}

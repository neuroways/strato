export default function ProgressHeader({ day, sentence }) {
  const missionTexts = {
    1: {
      icon: "🌱",
      main: "Mission 1 von 5",
      sub: "Unser Abenteuer beginnt. Noch fünf kleine Missionen warten heute auf uns.",
    },
    2: {
      icon: "🍃",
      main: "Mission 2 von 5",
      sub: "Schon zwei kleine Schritte geschafft. Wir kommen dem Geheimnis näher.",
    },
    3: {
      icon: "✨",
      main: "Mission 3 von 5",
      sub: "Halb geschafft. Caspar und Lumi entdecken immer mehr.",
    },
    4: {
      icon: "⭐",
      main: "Mission 4 von 5",
      sub: "Nur noch eine Mission. Das Geheimnis ist fast gelüftet.",
    },
    5: {
      icon: "🏆",
      main: "Mission 5 von 5",
      sub: "Geschafft! Heute habt ihr gemeinsam alle fünf Missionen gemeistert.",
    },
  };

  const missionText = missionTexts[sentence];

  // Progress dots for overall week
  const dayDots = Array.from({ length: 5 }, (_, i) => {
    if (i < day - 1) return "⭐";
    if (i === day - 1) return "●";
    return "○";
  });

  // Progress dots for daily missions
  const sentenceDots = Array.from({ length: 5 }, (_, i) => {
    if (i < sentence) return "⭐";
    if (i === sentence - 1) return "●";
    return "○";
  });

  return (
    <div>
      {/* Overall adventure progress */}
      <div className="adventure-header">
        <div className="adventure-header__title">✨ Dein Abenteuer</div>
        <div className="adventure-header__progress">
          {dayDots.map((dot, i) => (
            <span key={i} className="progress-dot">{dot}</span>
          ))}
        </div>
        <div className="progress-label">Tag {day} von 5</div>
      </div>

      {/* Daily mission progress */}
      <div className="mission-header">
        <div className="mission-header__icon">{missionText.icon}</div>
        <div className="mission-header__text">{missionText.main}</div>
        <div className="mission-header__dots">
          {sentenceDots.map((dot, i) => (
            <span key={i} className="progress-dot">{dot}</span>
          ))}
        </div>
        <div className="mission-header__subtext">{missionText.sub}</div>
      </div>
    </div>
  );
}

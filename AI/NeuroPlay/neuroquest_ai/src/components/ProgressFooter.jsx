// ProgressFooter.jsx — unified progress indicator for all pages
export default function ProgressFooter({ day, sentence }) {
  // Overall journey: 5 days
  const dayStones = Array.from({ length: 5 }, (_, i) => {
    if (i < day - 1) return "🌳";
    if (i === day - 1) return "⭐";
    return "🍂";
  });

  // Today's missions: 5 missions
  const missionLeaves = Array.from({ length: 5 }, (_, i) => {
    if (i < sentence) return "🌿";
    if (i === sentence - 1) return "🍃";
    return "🌾";
  });

  return (
    <footer className="progress-footer">
      <div className="progress-footer__section">
        <div className="progress-footer__label">🌳 Die große Reise</div>
        <div className="progress-footer__items">
          {dayStones.map((stone, i) => (
            <span key={i} className="progress-item">{stone}</span>
          ))}
        </div>
        <div className="progress-footer__meta">Tag {day} von 5</div>
      </div>

      <div className="progress-footer__divider"></div>

      <div className="progress-footer__section">
        <div className="progress-footer__label">🌿 Heutige Missionen</div>
        <div className="progress-footer__items">
          {missionLeaves.map((leaf, i) => (
            <span key={i} className="progress-item">{leaf}</span>
          ))}
        </div>
        <div className="progress-footer__meta">Mission {sentence} von 5</div>
      </div>
    </footer>
  );
}

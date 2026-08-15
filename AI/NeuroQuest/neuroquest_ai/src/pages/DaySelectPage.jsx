export default function DaySelectPage({ onSelectDay }) {
  const days = [
    { day: 1, title: "Das geheimnis­volle Zeichen", subtitle: "Caspar findet ein Zeichen..." },
    { day: 2, title: "Der Weg der fünf Schritte", subtitle: "Caspar und Lumi entdecken..." },
    { day: 3, title: "Der Wald flüstert", subtitle: "Eine neue Entdeckung..." },
    { day: 4, title: "Der Stern in der Mitte", subtitle: "Ein Stern leuchtet auf..." },
    { day: 5, title: "Das Licht in dir", subtitle: "Das größte Abenteuer..." },
  ];

  return (
    <div className="book-page" style={{ paddingBottom: "0" }}>
      <h1 className="book-page__heading" style={{ marginBottom: "32px" }}>
        Welcher Tag?
      </h1>
      <div style={{ width: "100%", marginBottom: "32px" }}>
        {days.map((day) => (
          <button
            key={day.day}
            onClick={() => onSelectDay(day.day)}
            style={{
              width: "100%",
              padding: "20px 16px",
              marginBottom: "12px",
              backgroundColor: "rgba(189, 165, 117, 0.1)",
              border: "2px solid var(--color-gold)",
              borderRadius: "8px",
              cursor: "pointer",
              textAlign: "left",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(189, 165, 117, 0.2)";
              e.currentTarget.style.borderColor = "var(--color-forest)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(189, 165, 117, 0.1)";
              e.currentTarget.style.borderColor = "var(--color-gold)";
            }}
          >
            <div style={{ fontSize: "18px", fontWeight: "600", color: "var(--color-forest)", marginBottom: "4px" }}>
              Tag {day.day}
            </div>
            <div style={{ fontSize: "14px", color: "var(--color-light-text)" }}>
              {day.title}
            </div>
          </button>
        ))}
      </div>
      <div className="lumi-character">
        <span className="lumi-character__emoji">✨</span>
        <p className="lumi-character__text">
          Welcher Tag wartet auf dich?
        </p>
      </div>
    </div>
  );
}

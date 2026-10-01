import ProgressHeader from "../components/ProgressHeader";

export default function DayCompletePage({ day, onNextDay, onHome }) {
  const dayStories = {
    1: "Caspar und Lumi werden Freunde. Sie treffen sich im Wald und erleben ihr erstes gemeinsames Abenteuer. Caspar spürt, dass dies nur der Anfang ist.",
    2: "Caspar und Lumi entdecken einen geheimen Pfad. Sie erkennen, dass sich die ganze Welt ganz anders anfühlt, wenn man sich Zeit nimmt zum Schauen.",
    3: "Caspar lernt, dass kleine Momente große Bedeutung haben. Lumi zeigt ihm, dass Langsamkeit eine Kraft ist.",
    4: "Caspar und Lumi finden einen stillen Platz, an dem die Welt still zu halten scheint. Hier verstehen sie einander ohne Worte.",
    5: "Caspar erkennt: Das größte Abenteuer ist nicht das Ziel. Es ist jeder einzelne Schritt auf dem Weg dorthin.",
  };

  const dayMessages = {
    1: "🌟 Heute hast du alle fünf kleinen Missionen geschafft. Caspar und Lumi sind stolz auf den gemeinsamen Weg mit dir.",
    2: "🌟 Wunderbar! Auch heute hast du alle fünf Missionen gemeistert. Du wirst immer mutiger.",
    3: "🌟 Das war großartig! Fünf Missionen an nur einem Tag. Du machst das wirklich wunderbar.",
    4: "🌟 Du bist fantastisch! Fünf Missionen heute — du bist dem Licht sehr nahegekommen.",
    5: "🌟 Das ist es — du hast es geschafft! Alle fünf Tage, alle fünf Missionen pro Tag. Du hast ein echtes Abenteuer erlebt.",
  };

  const storyText = dayStories[day] || "Die Geschichte geht weiter...";
  const dayMessage = dayMessages[day] || "🌟 Heute hast du all deine Missionen geschafft!";

  return (
    <div className="book-page">
      <ProgressHeader day={day} sentence={5} />
      <img
        src="/static/stock_neuroquest-day-complete-f7221d-0.jpg"
        alt="Freude und Erfüllung"
        className="book-page__illustration"
      />
      <div className="book-page__content">
        <p className="book-page__text" style={{ fontSize: "20px", color: "var(--color-forest)", marginBottom: "32px", marginTop: "32px", fontStyle: "italic" }}>
          {dayMessage}
        </p>
        
        <div style={{ backgroundColor: "rgba(189, 165, 117, 0.1)", padding: "24px", borderRadius: "8px", marginBottom: "32px" }}>
          <h2 className="book-page__heading" style={{ fontSize: "24px", marginBottom: "16px" }}>
            Die vollständige Geschichte von Tag {day}
          </h2>
          <p className="book-page__text" style={{ fontSize: "18px", color: "var(--color-forest)", lineHeight: "1.9" }}>
            {storyText}
          </p>
        </div>

        <p className="book-page__text" style={{ color: "var(--color-moss)", fontSize: "16px", marginTop: "32px", fontStyle: "italic" }}>
          Große Abenteuer entstehen aus vielen kleinen Schritten.
        </p>

        <div className="lumi-character">
          <span className="lumi-character__emoji">✨</span>
          <p className="lumi-character__text">
            {day < 5 
              ? "Morgen wartet ein neues Abenteuer auf dich. Ich freue mich darauf, es mit dir zu teilen."
              : "Du hast eine ganze Woche großartiger Abenteuer geschafft. Das ist wirklich bemerkenswert!"}
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "48px", width: "100%" }}>
          {day < 5 ? (
            <>
              <button 
                className="book-page__button" 
                onClick={onNextDay}
                style={{ backgroundColor: "var(--color-moss)" }}
              >
                Morgen wartet das nächste Abenteuer
              </button>
              <button 
                className="book-page__button" 
                onClick={onHome}
                style={{ backgroundColor: "var(--color-light-text)" }}
              >
                Für heute Schluss
              </button>
            </>
          ) : (
            <>
              <button 
                className="book-page__button" 
                onClick={onHome}
                style={{ backgroundColor: "var(--color-moss)" }}
              >
                Zur Startseite
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

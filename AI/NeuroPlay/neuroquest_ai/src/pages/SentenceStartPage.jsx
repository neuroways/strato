const dayImages = {
  1: "/static/neuroquest-day1-hero.jpg",
  2: "/static/neuroquest-day2-hero.jpg",
  3: "/static/neuroquest-day2-hero.jpg",
  4: "/static/neuroquest-day4-hero.jpg",
  5: "/static/neuroquest-day5-hero.jpg",
};

const dayIntros = {
  1: {
    heading: "🌳 Willkommen zum ersten Tag!",
    text: "Heute beginnt deine Reise durch den Zauberwald. Vor dir liegen fünf kleine Missionen. Jede Mission besteht aus einem Satz und den Magischen 5. Nach jeder Mission erzählt dir Lumi ein weiteres Stück der Geschichte.",
    lumiText: "Große Abenteuer beginnen immer mit einem kleinen Schritt. Ich begleite dich bei jeder deiner fünf Missionen. Lass uns gemeinsam anfangen.",
    buttonText: "Meine erste Mission beginnt",
  },
  2: {
    heading: "🌿 Tag 2 wartet auf dich!",
    text: "Gestern hast du Caspar und Lumi kennengelernt. Heute entdeckt ihr zusammen den Weg der fünf Schritte. Fünf Missionen erwarten dich.",
    lumiText: "Du machst das wunderbar. Jeder neue Tag ist ein weiteres Abenteuer für uns beide. Los geht's!",
    buttonText: "Meine erste Mission beginnt",
  },
  3: {
    heading: "🌲 Tag 3 – Tiefer in den Wald",
    text: "Mit jedem Tag verstehst du die Magie des Waldes besser. Heute haben wir wieder fünf Missionen für dich.",
    lumiText: "Du wirst immer mutiger. Ich bin stolz auf dich. Lass uns diesen Tag gemeinsam erleben.",
    buttonText: "Meine erste Mission beginnt",
  },
  4: {
    heading: "⭐ Tag 4 – Der Stern erscheint",
    text: "Du bist der Hälfte deines großen Abenteuers schon sehr nahegekommen. Fünf weitere Missionen warten auf dich.",
    lumiText: "Siehst du, wie weit du schon gekommen bist? Das ist deine Kraft. Komm, lass uns weitergehen.",
    buttonText: "Meine erste Mission beginnt",
  },
  5: {
    heading: "🌟 Tag 5 – Das Licht in dir",
    text: "Das ist dein letzter Tag dieser Woche. Fünf letzte Missionen, und dann hast du etwas Großes geschafft.",
    lumiText: "Du hast gezeigt, was in dir steckt. Lass uns diesen wunderbaren Tag gemeinsam beenden.",
    buttonText: "Meine erste Mission beginnt",
  },
};

const sentenceIntros = {
  1: { heading: "🌳 Mission 1 von 5", text: "Deine erste Mission wartet. Lass uns beginnen.", lumiText: "Der erste Schritt — du schaffst das!" },
  2: { heading: "🌿 Mission 2 von 5", text: "Du machst das großartig. Hier kommt deine zweite Mission.", lumiText: "Schritt für Schritt — genau so!" },
  3: { heading: "🌲 Mission 3 von 5", text: "Du bist schon über die Hälfte. Mission drei wartet auf dich.", lumiText: "Du kommst dem Geheimnis näher. Weiter geht's!" },
  4: { heading: "⭐ Mission 4 von 5", text: "Noch eine Mission vor dem heutigen Abenteuer-Geheimnis.", lumiText: "Nur noch eine kleine Aufgabe. Du schaffst das!" },
  5: { heading: "🌟 Mission 5 von 5", text: "Das ist deine letzte Mission heute. Danach entdecken wir gemeinsam den Abschluss.", lumiText: "Die letzte Mission — und dann die große Geschichte!" },
};

export default function SentenceStartPage({ day, sentence, onBegin, isFirstSentenceOfDay }) {
  const intro = isFirstSentenceOfDay ? dayIntros[day] : sentenceIntros[sentence];
  
  return (
    <div className="book-page">
      {!isFirstSentenceOfDay && (
        <div className="book-page__orientation">
          Satz {sentence} von 5
        </div>
      )}
      {isFirstSentenceOfDay && (
        <img
          src={dayImages[day] || "/static/neuroquest-day1-hero.jpg"}
          alt={`Tag ${day}`}
          className="book-page__illustration"
        />
      )}
      <div className="book-page__content">
        <h2 className="book-page__heading" style={{ marginTop: isFirstSentenceOfDay ? "40px" : "28px" }}>
          {intro.heading}
        </h2>
        <p className="book-page__text" style={{ marginBottom: "32px" }}>
          {intro.text}
        </p>
        {intro.lumiText && (
          <div className="lumi-character">
            <span className="lumi-character__emoji">✨</span>
            <div>
              <p className="lumi-speaks">Lumi sagt:</p>
              <p className="lumi-character__text">
                {intro.lumiText}
              </p>
            </div>
          </div>
        )}
        <button className="book-page__button" onClick={onBegin}>
          {intro.buttonText}
        </button>
      </div>
    </div>
  );
}

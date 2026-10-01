import ProgressHeader from "../components/ProgressHeader";

export default function StoryRevealPage({ day, sentence, onContinue }) {
  const storyFragments = {
    "1-1": {
      title: "Das geheimnis­volle Zeichen",
      text: "Caspar findet ein mysteriöses Zeichen im Wald. Es leuchtet sanft. Sein Herz wird schneller. Was bedeutet dieses Zeichen?",
    },
    "1-2": {
      title: "Das geheime Licht",
      text: "Das Licht wird stärker. Zwischen den Blättern erkennt Caspar eine schöne Gestalt. Sie wirkt freundlich und warm.",
    },
    "1-3": {
      title: "Lumi erscheint",
      text: "»Hallo, Caspar«, sagt die Gestalt sanft. »Ich bin Lumi. Ich war auf dich. Zusammen können wir etwas Großartiges entdecken.«",
    },
    "1-4": {
      title: "Der Anfang einer Freundschaft",
      text: "Caspar und Lumi schauen sich an. Ein warmes Gefühl erfüllt Caspars Herz. Er weiß: Das ist der Anfang von etwas Wunderbar­em.",
    },
    "1-5": {
      title: "Der erste Tag",
      text: "Sie sitzen zusammen auf einem Stein und schauen in die Ferne. Lumi sagt: »Das war erst der Anfang. Morgen entdecken wir noch mehr.«",
    },
    "2-1": {
      title: "Der Weg der fünf Schritte",
      text: "Caspar erkennt, dass jeder gute Weg aus fünf wichtigen Schritten besteht. Lumi zeigt sie ihm auf der Karte.",
    },
    "2-2": {
      title: "Der erste Schritt",
      text: "Der erste Schritt ist das genaue Hinschauen. Caspar lernt, langsamer zu werden. Die Welt wird plötzlich viel größer.",
    },
    "2-3": {
      title: "Der zweite Schritt",
      text: "Der zweite Schritt ist das Verstehen. Caspar übt, die Zeichen des Waldes zu lesen.",
    },
    "2-4": {
      title: "Der dritte Schritt",
      text: "Der dritte Schritt ist die Geduld. Caspar entdeckt: Langsam ist manchmal schneller.",
    },
    "2-5": {
      title: "Der vierte und fünfte Schritt",
      text: "Caspar lernt noch zwei Schritte: Zuhören und Vertrauen. Mit Lumi fühlt er sich bereit für jedes Abenteuer.",
    },
  };

  const key = `${day}-${sentence}`;
  const story = storyFragments[key] || {
    title: "Weiteres Abenteuer",
    text: "Die Geschichte geht weiter...",
  };

  const progressMessages = {
    1: "Der erste Lichtpunkt beginnt zu leuchten. Vier kleine Missionen warten noch auf uns.",
    2: "Unser Weg wird heller. Drei Missionen trennen uns noch vom heutigen Geheimnis.",
    3: "Wir kommen dem Geheimnis immer näher. Noch zwei kleine Missionen.",
    4: "Nur noch eine letzte Mission. Danach entdecken wir gemeinsam den Abschluss des heutigen Abenteuers.",
    5: "Das ist das Ende dieses wunderbaren Tages. Lass uns gemeinsam die ganze Geschichte noch einmal lesen.",
  };

  return (
    <div className="book-page">
      <div className="book-page__content">
        <ProgressHeader day={day} sentence={sentence} />
        <h2 className="book-page__heading" style={{ marginBottom: "40px", marginTop: "28px" }}>
          {story.title}
        </h2>
        <p className="book-page__text" style={{ marginBottom: "48px", fontSize: "22px" }}>
          {story.text}
        </p>
        <div className="lumi-character">
          <span className="lumi-character__emoji">✨</span>
          <div>
            <p className="lumi-speaks">Lumi sagt:</p>
            <p className="lumi-character__text">
              {progressMessages[sentence]}
            </p>
          </div>
        </div>
        <button className="book-page__button" onClick={onContinue}>
          {sentence < 5 ? "📖 Nächste Mission" : "🌟 Zum Tagesabschluss"}
        </button>
      </div>
    </div>
  );
}

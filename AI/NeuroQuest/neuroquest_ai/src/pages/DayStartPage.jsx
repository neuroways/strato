export default function DayStartPage({ day, round, onBegin }) {
  return (
    <div className="book-page">
      <img
        src="/static/stock_neuroquest-task-focus-fabcf1-0.jpg"
        alt="Hände beim Schreiben"
        className="book-page__illustration"
      />
      <div className="book-page__content">
        <p style={{ fontSize: "16px", color: "var(--color-light-text)", marginBottom: "16px" }}>
          Tag {day} • Aufgabe {round} von 5
        </p>
        <h2 className="book-page__heading">Neue Aufgabe</h2>
        <p className="book-page__text">
          Jetzt kommt ein neuer Schritt in Caspars Abenteuer.
        </p>
        <div className="lumi-character">
          <span className="lumi-character__emoji">💙</span>
          <p className="lumi-character__text">
            Nimm dir Zeit. Langsam ist völlig in Ordnung.
          </p>
        </div>
        <button className="book-page__button" onClick={onBegin}>
          Aufgabe anschauen
        </button>
      </div>
    </div>
  );
}

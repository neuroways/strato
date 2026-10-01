export default function WelcomePage({ onBegin }) {
  return (
    <div className="book-page">
      <img
        src="/static/neuroquest-characters-guide.png"
        alt="Caspar und Lumi – Deine Begleiter"
        className="book-page__illustration"
        style={{ height: "auto", maxHeight: "70vh" }}
      />
      <div className="book-page__content">
        <p className="book-page__text">
          Das ist Caspar und das ist Lumi.
        </p>
        <p className="book-page__text" style={{ marginBottom: "32px" }}>
          Sie begleiten dich auf deinem Abenteuer.
        </p>
        <div className="lumi-character">
          <span className="lumi-character__emoji">✨</span>
          <p className="lumi-character__text">
            Komm, lass uns gemeinsam entdecken!
          </p>
        </div>
        <button className="book-page__button" onClick={onBegin}>
          Los geht&apos;s!
        </button>
      </div>
    </div>
  );
}

export default function CoverPage({ onStart }) {
  return (
    <div className="book-page" style={{ paddingTop: "24px", paddingBottom: "32px" }}>
      <div style={{ width: "100%", marginBottom: "0" }}>
        <img
          src="/static/neuroquest-cover.png?v=3"
          alt="NeuroQuest - Caspar und Lumi im Zauberwald"
          className="book-page__illustration"
          style={{ marginBottom: "0", borderRadius: "12px" }}
        />
        <button 
          className="book-page__button" 
          onClick={onStart}
          style={{ width: "100%", marginTop: "32px" }}
        >
          ✨ Abenteuer starten
        </button>
      </div>
    </div>
  );
}

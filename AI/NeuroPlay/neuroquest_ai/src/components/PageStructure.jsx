// PageStructure.jsx — unified page layout for all mission screens
import ProgressFooter from "./ProgressFooter";

export default function PageStructure({ day, sentence, title, instruction, detail, lumiText, onContinue, children }) {
  return (
    <div className="page-structure">
      {/* Main content area */}
      <div className="page-structure__content">
        {/* Title with consistent positioning */}
        <div className="page-structure__header">
          <h1 className="page-structure__title">{title}</h1>
        </div>

        {/* Instruction text */}
        <div className="page-structure__instruction">
          <p>{instruction}</p>
        </div>

        {/* Detail area (task-specific content) */}
        <div className="page-structure__detail">
          {detail && <p>{detail}</p>}
        </div>

        {/* Children can be task-specific content */}
        {children}

        {/* Lumi speaks */}
        {lumiText && (
          <div className="page-structure__lumi">
            <div className="lumi-box">
              <span className="lumi-box__emoji">✨</span>
              <div className="lumi-box__content">
                <p className="lumi-box__label">Lumi sagt:</p>
                <p className="lumi-box__text">{lumiText}</p>
              </div>
            </div>
          </div>
        )}

        {/* Continue button */}
        <button className="page-structure__button" onClick={onContinue}>
          📖 Weiter
        </button>
      </div>

      {/* Progress footer — always at bottom */}
      <ProgressFooter day={day} sentence={sentence} />
    </div>
  );
}

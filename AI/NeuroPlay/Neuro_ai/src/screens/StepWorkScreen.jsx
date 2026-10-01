import { STEPS } from '../screens';

const stepsArray = STEPS;

export function StepWorkScreen({ step, day, round, onComplete }) {
  const stepData = stepsArray[step];

  return (
    <div className="min-h-screen h-screen bg-gradient-to-b from-indigo-50 via-blue-50 to-indigo-50 p-4 md:p-8 flex flex-col items-center justify-center overflow-hidden">
      <div className="max-w-2xl w-full flex flex-col gap-6">
        {/* Info */}
        <div className="text-center">
          <p className="text-sm md:text-base text-nq-sage font-semibold mb-2">
            Runde {round + 1} von 5 — Schritt {step + 1} von 5
          </p>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-nq-forest">
            {stepData.title}
          </h1>
        </div>

        {/* Große Beschreibung */}
        <div className="bg-white rounded-3xl p-8 md:p-10 border-4 border-nq-forest shadow-lg">
          <p className="text-xl md:text-2xl text-nq-text leading-relaxed text-center mb-6">
            {stepData.description}
          </p>
          <div className="bg-nq-cream rounded-2xl p-6 border-l-4 border-nq-gold">
            <p className="text-lg text-nq-text italic text-center">
              {stepData.hint}
            </p>
          </div>
        </div>

        {/* Icon für visuellen Fokus */}
        <div className="text-7xl md:text-8xl text-center">
          {step === 0 && '❓'}
          {step === 1 && '✏️'}
          {step === 2 && '🔍'}
          {step === 3 && '━━━'}
          {step === 4 && '🌟'}
        </div>

        {/* Hauptbutton */}
        <button
          onClick={onComplete}
          className="w-full bg-nq-gold hover:bg-nq-wood text-white font-bold py-5 px-8 rounded-2xl text-lg md:text-xl transition-all duration-300 transform hover:scale-105"
        >
          Schritt erledigt
        </button>
      </div>

      <style>{`
        @keyframes pageFlip {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        div { animation: pageFlip 0.6s ease-out; }
      `}</style>
    </div>
  );
}

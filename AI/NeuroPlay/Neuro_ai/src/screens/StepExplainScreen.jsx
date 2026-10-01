import { STEPS } from '../screens';

const stepsArray = STEPS;

export function StepExplainScreen({ step, day, round, onContinue }) {
  const stepData = stepsArray[step];

  return (
    <div className="min-h-screen h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-rose-50 p-4 md:p-8 flex flex-col items-center justify-center overflow-hidden">
      <div className="max-w-2xl w-full flex flex-col gap-8 text-center">
        {/* Nummer */}
        <div className="text-6xl md:text-7xl font-bold text-nq-gold">
          {step + 1}
        </div>

        {/* Regel-Titel */}
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-nq-forest">
          {stepData.title}
        </h1>

        {/* Erklärung */}
        <p className="text-lg md:text-xl text-nq-text leading-relaxed">
          {stepData.description}
        </p>

        {/* Hinweis */}
        <div className="bg-white rounded-2xl border-2 border-nq-sage p-6">
          <p className="text-base md:text-lg text-nq-text italic">
            {stepData.hint}
          </p>
        </div>

        {/* Progress */}
        <div className="flex gap-2 justify-center">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`h-2 w-8 md:w-10 rounded-full transition-all ${
                i <= step
                  ? 'bg-nq-gold'
                  : 'bg-nq-line'
              }`}
            />
          ))}
        </div>

        {/* Button */}
        <button
          onClick={onContinue}
          className="w-full bg-nq-forest hover:bg-nq-sage text-white font-bold py-4 px-6 rounded-2xl text-lg md:text-xl transition-all duration-300 transform hover:scale-105 mt-4"
        >
          Los geht's
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

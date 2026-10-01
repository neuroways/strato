import { SafeImage } from '../ImageFallback';
import { getStoryPart } from '../story';
import { getStoryPartImage } from '../imageConfig';

export function StepStoryScreen({ day, round, onContinue }) {
  const storyPart = getStoryPart(day, round);
  const storyImage = getStoryPartImage(day, round);

  return (
    <div className="min-h-screen h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-rose-50 p-4 md:p-8 flex flex-col items-center justify-center overflow-hidden">
      <div className="max-w-2xl w-full flex flex-col gap-6">
        {/* Großes Story-Bild */}
        <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-nq-gold h-48 md:h-64 flex-shrink-0">
          <SafeImage 
            src={storyImage}
            alt={`Geschichtenteil ${round + 1}`}
            className="w-full h-full object-cover"
            showFallback={true}
          />
        </div>

        {/* Story-Text */}
        <div className="bg-white rounded-3xl p-8 md:p-10 border-4 border-nq-gold shadow-lg">
          <div className="flex gap-4 items-start">
            <span className="text-5xl md:text-6xl flex-shrink-0">{storyPart.image}</span>
            <p className="text-lg md:text-xl text-nq-text leading-relaxed italic pt-2">
              {storyPart.text}
            </p>
          </div>
        </div>

        {/* Fortschritt */}
        <div className="flex gap-2 justify-center">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`h-2 w-8 md:w-10 rounded-full transition-all ${
                i <= round
                  ? 'bg-nq-gold'
                  : 'bg-nq-line'
              }`}
            />
          ))}
        </div>

        {/* Button */}
        <button
          onClick={onContinue}
          className="w-full bg-nq-forest hover:bg-nq-sage text-white font-bold py-4 px-6 rounded-2xl text-lg md:text-xl transition-all duration-300 transform hover:scale-105"
        >
          Weiter
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

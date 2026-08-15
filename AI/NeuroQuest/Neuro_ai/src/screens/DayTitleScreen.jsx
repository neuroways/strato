import { SafeImage } from '../ImageFallback';
import { getDayTitle, getDayIntro } from '../story';
import { getDayImage } from '../imageConfig';

export function DayTitleScreen({ day, onContinue }) {
  const title = getDayTitle(day);
  const intro = getDayIntro(day);
  const image = getDayImage(day);

  return (
    <div className="min-h-screen h-screen bg-gradient-to-b from-sky-50 via-blue-50 to-indigo-50 p-4 md:p-8 flex flex-col items-center justify-center overflow-hidden">
      <div className="max-w-2xl w-full flex flex-col gap-6">
        {/* Großes Titelbild */}
        <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-nq-gold h-48 md:h-64 flex-shrink-0">
          <SafeImage 
            src={image?.title}
            alt={`Titelbild für ${title}`}
            className="w-full h-full object-cover"
            showFallback={true}
          />
        </div>

        {/* Titel und Text */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-nq-forest">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-nq-text leading-relaxed">
            {intro}
          </p>
        </div>

        {/* Hauptbutton */}
        <button
          onClick={onContinue}
          className="w-full bg-nq-forest hover:bg-nq-sage text-white font-bold py-4 px-6 rounded-2xl text-lg md:text-xl transition-all duration-300 transform hover:scale-105 mt-4"
        >
          Beginnen
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

import { SafeImage } from '../ImageFallback';
import { getDayTitle, getDayOutro, getStoryPart } from '../story';
import { getDayImage, getStoryPartImage } from '../imageConfig';

export function DayCompleteScreen({ day, onContinue }) {
  const title = getDayTitle(day);
  const outro = getDayOutro(day);
  const image = getDayImage(day);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-rose-50 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-6">✨</div>
          <h1 className="text-4xl font-serif font-bold text-nq-forest mb-2">
            {title}
          </h1>
          <p className="text-xl text-nq-gold font-semibold">
            Tag {day + 1} vollendet
          </p>
        </div>

        {/* Tagesabschluss-Text */}
        <div className="bg-white rounded-3xl shadow-lg p-8 md:p-10 border-4 border-nq-gold mb-12">
          <p className="text-lg md:text-xl text-nq-text leading-relaxed italic">
            {outro}
          </p>
        </div>

        {/* Komplette Geschichte dieses Tages */}
        <div className="bg-white rounded-3xl shadow-lg p-8 md:p-10 border-4 border-nq-gold space-y-8 mb-12">
          <h2 className="text-2xl font-bold text-nq-forest text-center">
            Die Geschichte des Tages
          </h2>

          {[0, 1, 2, 3, 4].map((round) => {
            const storyPart = getStoryPart(day, round);
            const storyImage = getStoryPartImage(day, round);
            return (
              <div key={round} className="space-y-4 pb-8 border-b-2 border-nq-line last:border-b-0 last:pb-0">
                <div className="rounded-2xl overflow-hidden max-h-40">
                  <SafeImage 
                    src={storyImage}
                    alt={`Teil ${round + 1}`}
                    className="w-full h-auto"
                    showFallback={false}
                  />
                </div>
                <div className="flex gap-3">
                  <span className="text-3xl flex-shrink-0">{storyPart.image}</span>
                  <p className="text-base text-nq-text leading-relaxed italic pt-1">
                    {storyPart.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Button */}
        <div className="text-center">
          <button
            onClick={onContinue}
            className="bg-nq-forest hover:bg-nq-sage text-white font-bold py-4 px-8 rounded-2xl text-lg md:text-xl transition-all duration-300 transform hover:scale-105"
          >
            {day === 4 ? 'Zum Abschluss' : 'Nächster Tag'}
          </button>
        </div>
      </div>
    </div>
  );
}

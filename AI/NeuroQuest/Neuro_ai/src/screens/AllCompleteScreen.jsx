import { getStoryPart, getDayTitle, getDayIntro } from '../story';
import { getStoryPartImage } from '../imageConfig';
import { SafeImage } from '../ImageFallback';

export function AllCompleteScreen({ onRestart }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-rose-50 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-7xl mb-6">🌟</div>
          <h1 className="text-5xl font-serif font-bold text-nq-forest mb-4">
            Das Geheimnis der magischen 5
          </h1>
          <p className="text-xl text-nq-gold font-semibold">
            Deine komplette Geschichte
          </p>
        </div>

        {/* Alle 5 Tage */}
        <div className="bg-white rounded-3xl shadow-lg p-8 md:p-10 border-4 border-nq-gold space-y-12 mb-12">
          {[0, 1, 2, 3, 4].map((day) => (
            <div key={day} className="pb-12 border-b-2 border-nq-line last:border-b-0 last:pb-0">
              <h2 className="text-3xl font-bold text-nq-forest mb-2">
                {getDayTitle(day)}
              </h2>
              <p className="text-sm text-nq-sage mb-6">Tag {day + 1}</p>
              <p className="text-lg text-nq-text leading-relaxed mb-8">
                {getDayIntro(day)}
              </p>

              {/* 5 Story-Teile */}
              <div className="space-y-6">
                {[0, 1, 2, 3, 4].map((round) => {
                  const storyPart = getStoryPart(day, round);
                  const storyImage = getStoryPartImage(day, round);
                  return (
                    <div key={round} className="space-y-3">
                      <div className="rounded-2xl overflow-hidden max-h-32">
                        <SafeImage 
                          src={storyImage}
                          alt={`Tag ${day + 1}, Teil ${round + 1}`}
                          className="w-full h-auto"
                          showFallback={false}
                        />
                      </div>
                      <div className="flex gap-3">
                        <span className="text-2xl flex-shrink-0">{storyPart.image}</span>
                        <p className="text-sm text-nq-text leading-relaxed italic">
                          {storyPart.text}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Button */}
        <div className="text-center">
          <button
            onClick={onRestart}
            className="bg-nq-forest hover:bg-nq-sage text-white font-bold py-4 px-8 rounded-2xl text-lg md:text-xl transition-all duration-300 transform hover:scale-105"
          >
            Neue Geschichte beginnen
          </button>
        </div>
      </div>
    </div>
  );
}

import { Link } from "react-router";

const storyContent = {
  1: {
    1: {
      text: "Caspar sitzt an seinem Schreibtisch. Sein Heft liegt offen vor ihm. Draußen scheint die Sonne. Lumi, das kleine Lichtwesen, schwebt neben seinem Ohr und flüstert: »Schau, was wir heute lernen!«",
      illustration: "Illustration: Caspar am Schreibtisch",
    },
  },
};

export default function StoryView({ day = 1, round = 1 }) {
  const story = storyContent[day]?.[round] || storyContent[1][1];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 flex items-center justify-center px-6 py-12">
      <div className="max-w-2xl w-full">
        {/* Header: Round & Day Info */}
        <div className="text-center mb-8">
          <p className="text-sm text-blue-600 font-medium">Tag {day} · Runde {round}</p>
        </div>

        {/* Large Illustration */}
        <div className="mb-8 aspect-video bg-blue-100 rounded-2xl flex items-center justify-center border-4 border-blue-200 text-center">
          <span className="text-blue-600 text-sm px-6">{story.illustration}</span>
        </div>

        {/* Story Text */}
        <div className="mb-10 space-y-4">
          <p className="text-2xl text-blue-900 leading-relaxed font-serif">
            {story.text}
          </p>
        </div>

        {/* Next Button */}
        <Link
          to={`/day/${day}/round/${round}/step/1`}
          className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xl py-6 px-8 rounded-xl transition-colors duration-200 active:bg-blue-800 text-center"
        >
          Weiter
        </Link>
      </div>
    </div>
  );
}

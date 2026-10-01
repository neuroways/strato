import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router';

export default function RecommendationCard({ activity }) {
  return (
    <div className="neuroplay-card p-5 md:p-6 space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-deep-navy">{activity.name}</h2>
          <p className="text-sm text-gray-600 mt-1">{activity.type}</p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-gold">{activity.fit}%</div>
          <p className="text-xs text-gray-500">Passung</p>
        </div>
      </div>

      <div className="flex gap-4 text-sm text-anthrazit">
        <div>
          <p className="text-xs text-gray-500 uppercase">Dauer</p>
          <p className="font-medium">{activity.duration}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase">Vibe</p>
          <p className="font-medium">{activity.vibe}</p>
        </div>
      </div>

      <Link
        to={`/activity/${activity.id}`}
        className="flex items-center justify-center gap-2 bg-deep-navy text-white font-semibold py-3 rounded-lg hover:bg-petrol transition-all w-full"
      >
        Aktivität anschauen
        <ChevronRight size={18} />
      </Link>
    </div>
  );
}

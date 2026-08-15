import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router';

export default function ActivityCard({ activity, showFit = true }) {
  return (
    <Link
      to={`/activity/${activity.id}`}
      className="neuroplay-card p-4 hover:shadow-md transition-all block group"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-bold text-anthrazit text-lg group-hover:text-deep-navy transition">
            {activity.name}
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">{activity.type}</p>
        </div>
        {showFit && (
          <div className="text-right flex-shrink-0">
            <p className="text-xl font-bold text-gold">{activity.fit}%</p>
            <p className="text-xs text-gray-500">Passung</p>
          </div>
        )}
      </div>

      <div className="flex gap-4 text-xs text-gray-600 mb-3">
        <div>
          <p className="text-gray-400 uppercase text-xs">Dauer</p>
          <p className="font-medium text-anthrazit">{activity.duration}</p>
        </div>
        <div>
          <p className="text-gray-400 uppercase text-xs">Personen</p>
          <p className="font-medium text-anthrazit">
            {activity.minPeople === activity.maxPeople
              ? activity.minPeople
              : `${activity.minPeople}–${activity.maxPeople}`}
          </p>
        </div>
      </div>

      {activity.tags && (
        <div className="flex gap-2 flex-wrap mb-3">
          {activity.tags.slice(0, 3).map(tag => (
            <span key={tag} className="text-xs bg-light-gray text-anthrazit px-2 py-1 rounded">
              {tag}
            </span>
          ))}
          {activity.tags.length > 3 && (
            <span className="text-xs text-gray-500 px-2 py-1">+{activity.tags.length - 3}</span>
          )}
        </div>
      )}

      <div className="flex items-center justify-end gap-1 text-gold group-hover:translate-x-1 transition-transform">
        <span className="text-xs font-medium">Details</span>
        <ChevronRight size={16} />
      </div>
    </Link>
  );
}

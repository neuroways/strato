export default function EnergyScale({ value, onChange }) {
  const levels = [
    { num: 1, label: 'sehr wenig', color: 'bg-red-400' },
    { num: 2, label: 'wenig', color: 'bg-orange-400' },
    { num: 3, label: 'mittel', color: 'bg-yellow-400' },
    { num: 4, label: 'viel', color: 'bg-lime-400' },
    { num: 5, label: 'sehr viel', color: 'bg-green-400' }
  ];

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        {levels.map(level => (
          <button
            key={level.num}
            onClick={() => onChange(level.num)}
            className={`flex-1 h-12 rounded-lg font-semibold transition-all ${
              value === level.num
                ? `${level.color} text-white scale-105 shadow-md`
                : `${level.color} bg-opacity-30 text-anthrazit hover:bg-opacity-50`
            }`}
            aria-label={`${level.label} Energie`}
          >
            <span className="text-xs md:text-sm">{level.label}</span>
          </button>
        ))}
      </div>
      <p className="text-xs text-gray-500 text-center">
        {value && levels.find(l => l.num === value)?.label}
      </p>
    </div>
  );
}

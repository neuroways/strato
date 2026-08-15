import ZoneIcon from "./ZoneIcon.jsx";

/**
 * ZoneCard — displays a result_rule record.
 * rule shape: { result_code, result_label, description, observation_hint, icon, color, bg_color }
 */
export default function ZoneCard({ rule, compact = false }) {
  if (!rule) return null;

  const zone = {
    label: rule.result_label,
    description: rule.description,
    hint: rule.observation_hint,
    icon: rule.icon,
    color: rule.color || "#2a9d8f",
    bgColor: rule.bg_color || "#e8f5f3",
  };

  if (compact) {
    return (
      <div
        className="flex items-center gap-3 rounded-2xl px-4 py-3"
        style={{ backgroundColor: zone.bgColor, border: `1.5px solid ${zone.color}20` }}
      >
        <ZoneIcon icon={zone.icon} color={zone.color} size={32} />
        <div>
          <p className="text-xs font-medium" style={{ color: zone.color }}>
            Dein Bereich
          </p>
          <p className="text-base font-semibold text-gray-800">{zone.label}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="rounded-3xl p-6"
      style={{ backgroundColor: zone.bgColor, border: `2px solid ${zone.color}30` }}
    >
      <div className="flex items-center gap-4 mb-4">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
          style={{ backgroundColor: zone.color + "20" }}
        >
          <ZoneIcon icon={zone.icon} color={zone.color} size={28} />
        </div>
        <div>
          <p className="text-sm font-medium mb-0.5" style={{ color: zone.color }}>
            Dein aktueller Bereich
          </p>
          <h2 className="text-2xl font-bold text-gray-800">{zone.label}</h2>
        </div>
      </div>
      <p className="text-gray-700 leading-relaxed mb-4">{zone.description}</p>
      <div
        className="rounded-2xl p-4"
        style={{ backgroundColor: zone.color + "10", border: `1px solid ${zone.color}20` }}
      >
        <p className="text-sm text-gray-600 leading-relaxed">
          <span className="font-semibold" style={{ color: zone.color }}>Beobachtungshinweis: </span>
          {zone.hint}
        </p>
      </div>
      <p className="text-xs text-gray-400 mt-4 leading-relaxed">
        Diese Einschätzung ist kein medizinischer Befund. Sie dient ausschließlich zur persönlichen Selbstbeobachtung.
      </p>
    </div>
  );
}

export default function DeviceCard({ device, isSelected, onClick }) {
  const categoryColors = {
    keyboard: "from-blue-500 to-blue-600",
    "sound-module": "from-purple-500 to-purple-600",
    mixer: "from-red-500 to-red-600",
    computer: "from-green-500 to-green-600",
    speaker: "from-yellow-500 to-yellow-600",
  };

  return (
    <button
      onClick={onClick}
      className={`w-64 bg-gradient-to-br ${categoryColors[device.category]} rounded-lg p-4 text-white cursor-pointer transform transition-all duration-200 hover:scale-105 hover:shadow-2xl border-2 ${
        isSelected
          ? "border-white shadow-2xl scale-105"
          : "border-transparent"
      }`}
    >
      <div className="font-bold text-lg mb-1">{device.name}</div>
      <div className="text-sm opacity-90 mb-3">{device.manufacturer}</div>
      <div className="text-xs opacity-75 bg-black/30 rounded px-2 py-1 inline-block">
        {device.type}
      </div>
    </button>
  );
}

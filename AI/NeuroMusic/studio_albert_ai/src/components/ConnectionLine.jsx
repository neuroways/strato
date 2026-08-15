export default function ConnectionLine({
  source,
  target,
  type,
  isHovered,
  onHover,
  onLeave,
}) {
  const colors = {
    audio: "#22c55e",
    midi: "#06b6d4",
    usb: "#f97316",
    network: "#a855f7",
  };

  const color = colors[type] || "#666";
  const strokeWidth = isHovered ? 3 : 2;

  return (
    <line
      x1={source.x}
      y1={source.y}
      x2={target.x}
      y2={target.y}
      stroke={color}
      strokeWidth={strokeWidth}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      style={{
        cursor: "pointer",
        transition: "stroke-width 0.2s",
      }}
    />
  );
}

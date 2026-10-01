import Mountain from "icon:mountain";
import Trees from "icon:trees";
import Waves from "icon:waves";
import Anchor from "icon:anchor";
import Umbrella from "icon:umbrella";
import Circle from "icon:circle";

const iconMap = {
  mountain: Mountain,
  trees: Trees,
  waves: Waves,
  anchor: Anchor,
  umbrella: Umbrella,
};

export default function ZoneIcon({ icon, color = "#2a9d8f", size = 24 }) {
  const Icon = iconMap[icon] || Circle;
  return <Icon size={size} color={color} />;
}

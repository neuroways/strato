/**
 * NW-DS-006 — Component System: AnswerCard
 * NW-DS-007 — Illustration System: Energy Level Icons
 *
 * Reusable answer option card for all NeuroWays questionnaire methods.
 * Icons support text — they never replace it.
 * Accessible without color (icon + text always present).
 *
 * Props:
 *   icon           string  — one of: zap | leaf | waves | battery-low | battery-empty
 *   accentColor    string  — CSS color for border and icon stroke
 *   backgroundColor string — CSS color for icon circle background (pastel)
 *   label          string  — Answer text shown to the user
 *   selected       bool    — Whether this option is currently chosen
 *   onClick        fn      — Selection handler
 *   ariaLabel      string  — Optional aria-label override
 */
import Zap        from "icon:zap";
import Leaf       from "icon:leaf";
import Waves      from "icon:waves";
import BatteryLow from "icon:battery-low";
import BatteryOff from "icon:battery";

// ─── Icon map (outline only, no fill) ────────────────────────────────────────
const ICON_MAP = {
  "zap":           Zap,
  "leaf":          Leaf,
  "waves":         Waves,
  "battery-low":   BatteryLow,
  "battery-empty": BatteryOff,
};

// ─── Energy level presets — mapped from numeric_value 1–5 ────────────────────
export const ENERGY_ICON_PRESETS = {
  1: { icon: "zap",           accentColor: "#008CA8", backgroundColor: "#e0f7fa" },
  2: { icon: "leaf",          accentColor: "#4caf7d", backgroundColor: "#e8f5e9" },
  3: { icon: "waves",         accentColor: "#E2A83B", backgroundColor: "#fff8e1" },
  4: { icon: "battery-low",   accentColor: "#e07a30", backgroundColor: "#fff3e0" },
  5: { icon: "battery-empty", accentColor: "#c0392b", backgroundColor: "#fdecea" },
};

export default function AnswerCard({
  icon,
  accentColor,
  backgroundColor,
  label,
  selected,
  onClick,
  ariaLabel,
}) {
  const IconComponent = ICON_MAP[icon] || Waves;

  return (
    <button
      onClick={onClick}
      aria-pressed={selected}
      aria-label={ariaLabel || label}
      style={{
        // Layout
        display: "flex",
        alignItems: "center",
        gap: "14px",
        width: "100%",
        textAlign: "left",
        padding: "14px 18px",
        minHeight: 64,
        // Shape
        borderRadius: 16,
        border: `2px solid ${selected ? accentColor : "#e5e7eb"}`,
        // Color
        background: selected ? accentColor + "12" : "#fff",
        cursor: "pointer",
        // Typography
        fontSize: 15,
        fontWeight: selected ? 600 : 500,
        color: selected ? accentColor : "#374151",
        fontFamily: "'DM Sans', sans-serif",
        // Smooth 150–200ms transitions — no jumpy effects
        transition: "border-color 0.17s ease, background 0.17s ease, color 0.17s ease, box-shadow 0.17s ease",
        boxShadow: selected ? `0 0 0 3px ${accentColor}20` : "none",
      }}
    >
      {/* Icon circle */}
      {icon && (
        <div
          aria-hidden="true"
          style={{
            flexShrink: 0,
            width: 40,
            height: 40,
            borderRadius: "50%",
            background: selected ? accentColor + "22" : backgroundColor,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "background 0.17s ease",
          }}
        >
          <IconComponent
            size={18}
            color={accentColor}
            strokeWidth={1.8}
          />
        </div>
      )}

      {/* Label */}
      <span style={{ flex: 1, lineHeight: 1.45 }}>{label}</span>

      {/* Selected indicator — accessible, not color-only */}
      {selected && (
        <span
          aria-hidden="true"
          style={{
            flexShrink: 0,
            width: 18,
            height: 18,
            borderRadius: "50%",
            background: accentColor,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path d="M1 4L3.8 7L9 1" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      )}
    </button>
  );
}

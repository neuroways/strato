import { NavLink } from "react-router";
import Home from "icon:home";
import ClipboardList from "icon:clipboard-list";
import BarChart2 from "icon:bar-chart-2";
import Shield from "icon:shield";

const links = [
  { to: "/", label: "Start", Icon: Home },
  { to: "/checkin", label: "Check-in", Icon: ClipboardList },
  { to: "/history", label: "Verlauf", Icon: BarChart2 },
  { to: "/privacy", label: "Datenschutz", Icon: Shield },
];

export default function Nav() {
  return (
    <>
      {/* Desktop top nav */}
      <header className="hidden md:flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#2a9d8f" }}>
            <span className="text-white text-sm font-bold">N</span>
          </div>
          <span className="font-semibold text-gray-800 text-base tracking-tight">NeuroWays</span>
          <span className="text-gray-300 text-base">|</span>
          <span className="text-gray-500 text-sm">Energy Navigator</span>
        </div>
        <nav className="flex items-center gap-1">
          {links.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? "text-teal-700 bg-teal-50"
                    : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
                }`
              }
            >
              <Icon size={16} />
              {label}
            </NavLink>
          ))}
        </nav>
      </header>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-100 px-2 py-2 flex items-center justify-around">
        {links.map(({ to, label, Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-colors min-w-[60px] ${
                isActive ? "text-teal-600" : "text-gray-400"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
                    isActive ? "bg-teal-50" : ""
                  }`}
                >
                  <Icon size={18} color={isActive ? "#0d9488" : "#9ca3af"} />
                </div>
                <span className="text-[10px] font-medium">{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </>
  );
}

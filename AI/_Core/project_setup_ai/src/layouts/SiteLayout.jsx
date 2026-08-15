import { NavLink, Outlet } from "react-router";

export default function SiteLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <NavLink 
            to="/" 
            className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
          >
            NeuroWays
          </NavLink>
          <div className="flex gap-8">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                isActive 
                  ? "font-semibold text-blue-600 border-b-2 border-blue-600 pb-1" 
                  : "text-gray-600 hover:text-blue-600 transition-colors pb-1"
              }
            >
              Home
            </NavLink>
            <NavLink 
              to="/neurobalance" 
              className={({ isActive }) => 
                isActive 
                  ? "font-semibold text-blue-600 border-b-2 border-blue-600 pb-1" 
                  : "text-gray-600 hover:text-blue-600 transition-colors pb-1"
              }
            >
              NeuroBalance
            </NavLink>
            <NavLink 
              to="/neuroplay" 
              className={({ isActive }) => 
                isActive 
                  ? "font-semibold text-blue-600 border-b-2 border-blue-600 pb-1" 
                  : "text-gray-600 hover:text-blue-600 transition-colors pb-1"
              }
            >
              NeuroPlay
            </NavLink>
            <NavLink 
              to="/info" 
              className={({ isActive }) => 
                isActive 
                  ? "font-semibold text-blue-600 border-b-2 border-blue-600 pb-1" 
                  : "text-gray-600 hover:text-blue-600 transition-colors pb-1"
              }
            >
              Info
            </NavLink>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8 mt-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p>&copy; 2024 NeuroWays. Alle Rechte vorbehalten.</p>
        </div>
      </footer>
    </div>
  );
}

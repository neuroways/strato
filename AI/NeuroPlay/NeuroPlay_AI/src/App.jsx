import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router';
import Navigation from './components/Navigation';
import HeutePage from './pages/HeutePage';
import EntdeckenPage from './pages/EntdeckenPage';
import ActivityDetailPage from './pages/ActivityDetailPage';
import CoachPage from './pages/CoachPage';
import MeineAktivitaetenPage from './pages/MeineAktivitaetenPage';
import EntwicklungPage from './pages/EntwicklungPage';
import MehrPage from './pages/MehrPage';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Assume logged in for MVP

  // Get basename from document for multi-path deployment
  const basename = new URL(document.baseURI).pathname.replace(/\/$/, '');

  return (
    <BrowserRouter basename={basename}>
      <div className="min-h-screen bg-warm-white text-anthrazit flex flex-col">
        {isAuthenticated ? (
          <>
            <div className="flex-1 flex flex-col pb-20 md:pb-0">
              <Routes>
                <Route path="/" element={<HeutePage />} />
                <Route path="/entdecken" element={<EntdeckenPage />} />
                <Route path="/activity/:id" element={<ActivityDetailPage />} />
                <Route path="/coach" element={<CoachPage />} />
                <Route path="/meine-aktivitaeten" element={<MeineAktivitaetenPage />} />
                <Route path="/entwicklung" element={<EntwicklungPage />} />
                <Route path="/mehr" element={<MehrPage />} />
              </Routes>
            </div>
            <Navigation />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-4">NeuroPlay</h1>
              <p>Bitte anmelden.</p>
            </div>
          </div>
        )}
      </div>
    </BrowserRouter>
  );
}

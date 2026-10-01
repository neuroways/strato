import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { getTournament, getRegistrationsByTournament } from '../lib/api';
import { pb } from '../lib/pb';

export default function Home() {
  const [tournament, setTournament] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        // Load default tournament (05.09.2026)
        const tournaments = await pb.collection('tournaments').getFullList();
        if (tournaments.length > 0) {
          const t = tournaments[0];
          setTournament(t);
          const regs = await getRegistrationsByTournament(t.id);
          setRegistrations(regs);
        }
      } catch (error) {
        console.error('Error loading tournament:', error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          <p className="mt-4 text-green-600">Turnierdaten werden geladen...</p>
        </div>
      </div>
    );
  }

  if (!tournament) {
    return (
      <div className="min-h-screen bg-green-50">
        <div className="max-w-6xl mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold text-green-900 mb-4">Tennisturnier Verwaltung</h1>
          <p className="text-lg text-green-700 mb-8">Noch kein Turnier konfiguriert</p>
          <Link to="/admin" className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition">
            Admin-Bereich
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-green-600 to-green-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-32 h-32 bg-white rounded-full blur-2xl"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-black mb-4 leading-tight">
              ❤️ Ein Tag für alle!
            </h1>
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              TENNISTURNIER in Neindorf
            </h2>
            
            {/* Tournament Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-8">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6">
                <div className="text-sm font-semibold text-green-100 mb-2">📅 Datum</div>
                <div className="text-2xl font-bold">
                  {tournament?.event_date ? new Date(tournament.event_date).toLocaleDateString('de-DE', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  }) : 'TBD'}
                </div>
              </div>
              
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6">
                <div className="text-sm font-semibold text-green-100 mb-2">🕐 Uhrzeit</div>
                <div className="text-2xl font-bold">{tournament?.start_time || 'TBD'}</div>
              </div>
              
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6">
                <div className="text-sm font-semibold text-green-100 mb-2">📍 Ort</div>
                <div className="text-2xl font-bold">Tennisplatz</div>
              </div>
            </div>

            {/* Highlights */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="text-center">
                <div className="text-3xl mb-2">🎾</div>
                <div className="font-semibold">Tennis</div>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🌭</div>
                <div className="font-semibold">Bratwurst</div>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🍺</div>
                <div className="font-semibold">Getränke</div>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">👨‍👩‍👧‍👦</div>
                <div className="font-semibold">Familie</div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/register"
                className="bg-yellow-400 hover:bg-yellow-500 text-green-900 font-bold py-3 px-8 rounded-lg transition transform hover:scale-105 inline-block"
              >
                Jetzt anmelden
              </Link>
              <Link 
                to="/schedule"
                className="border-2 border-white hover:bg-white/20 text-white font-bold py-3 px-8 rounded-lg transition inline-block"
              >
                Spielplan ansehen
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Tournament Stats */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-4xl font-black text-green-600">{registrations.length}</div>
            <div className="text-green-700 font-semibold mt-2">Teilnehmer</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-4xl font-black text-green-600">-</div>
            <div className="text-green-700 font-semibold mt-2">Spiele</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center md:col-span-3 md:max-w-xs md:mx-auto">
            <div className="text-4xl font-black text-green-600">3</div>
            <div className="text-green-700 font-semibold mt-2">Plätze</div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Information */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-bold text-green-900 mb-6">Turnierinformation</h3>
            <div className="space-y-4 text-green-800">
              <div>
                <h4 className="font-bold text-green-900">Ablauf:</h4>
                <p className="text-sm">Spaßturnier für Anfänger und Freizeitspieler mit Fokus auf Geselligkeit.</p>
              </div>
              <div>
                <h4 className="font-bold text-green-900">Verpflegung:</h4>
                <p className="text-sm">Grill mit Bratwurst, Getränke und Snacks ganztägig verfügbar.</p>
              </div>
              <div>
                <h4 className="font-bold text-green-900">Teilnehmer:</h4>
                <p className="text-sm">Alle Erfahrungsstufen willkommen - von Anfänger bis Turnierspieler!</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-bold text-green-900 mb-6">Schnelllinks</h3>
            <div className="space-y-3">
              <Link to="/participants" className="block p-4 bg-green-50 hover:bg-green-100 rounded-lg text-green-900 font-semibold transition">
                → Teilnehmerliste
              </Link>
              <Link to="/schedule" className="block p-4 bg-green-50 hover:bg-green-100 rounded-lg text-green-900 font-semibold transition">
                → Spielplan
              </Link>
              <Link to="/results" className="block p-4 bg-green-50 hover:bg-green-100 rounded-lg text-green-900 font-semibold transition">
                → Ergebnisse
              </Link>
              <Link to="/contact" className="block p-4 bg-green-50 hover:bg-green-100 rounded-lg text-green-900 font-semibold transition">
                → Kontakt & Anfahrt
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-green-900 text-white mt-16 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-sm">© 2026 Tennisturnier Neindorf • Alle Rechte vorbehalten</p>
        </div>
      </footer>
    </div>
  );
}

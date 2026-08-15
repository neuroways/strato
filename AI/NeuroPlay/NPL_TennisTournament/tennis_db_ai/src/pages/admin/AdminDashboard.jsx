import { useEffect, useState } from 'react';
import { DashboardService } from '../../services';

function StatCard({ label, value, loading }) {
  return (
    <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
      <p className="text-gray-600 text-sm font-medium">{label}</p>
      <p className="text-3xl font-bold text-gray-900 mt-2">
        {loading ? '-' : value}
      </p>
    </div>
  );
}

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    players: 0,
    registrations: 0,
    matches: 0,
    scheduledMatches: 0,
    completedMatches: 0,
    tournaments: 0
  });
  const [loading, setLoading] = useState(true);
  const [currentTournament, setCurrentTournament] = useState(null);

  useEffect(() => {
    async function loadStats() {
      const controller = new AbortController();

      try {
        const result = await DashboardService.getDashboardData(controller.signal);
        
        if (result.success) {
          setStats(result.data.stats);
          if (result.data.currentTournament) {
            setCurrentTournament(result.data.currentTournament);
          }
        }

        setLoading(false);
      } catch (err) {
        if (!err?.isAbort) {
          console.error('Error loading stats:', err);
          setLoading(false);
        }
      }

      return () => controller.abort();
    }

    loadStats();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">
          Übersicht über das aktuelle Turnier und die Verwaltung
        </p>
      </div>

      {currentTournament && (
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg p-6">
          <h2 className="text-2xl font-bold">{currentTournament.name}</h2>
          <p className="text-blue-100 mt-2">{currentTournament.subtitle}</p>
          <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-blue-100">Datum</p>
              <p className="font-semibold">{currentTournament.tournament_date}</p>
            </div>
            <div>
              <p className="text-blue-100">Anmeldeschluss</p>
              <p className="font-semibold">{currentTournament.registration_deadline}</p>
            </div>
            <div>
              <p className="text-blue-100">Status</p>
              <p className="font-semibold capitalize">{currentTournament.status}</p>
            </div>
            <div>
              <p className="text-blue-100">Max. Teilnehmer</p>
              <p className="font-semibold">{currentTournament.max_participants || '-'}</p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard label="Spieler" value={stats.players} loading={loading} />
        <StatCard label="Anmeldungen" value={stats.registrations} loading={loading} />
        <StatCard label="Spiele gesamt" value={stats.matches} loading={loading} />
        <StatCard label="Geplante Spiele" value={stats.scheduledMatches} loading={loading} />
        <StatCard label="Abgeschlossene Spiele" value={stats.completedMatches} loading={loading} />
        <StatCard label="Turniere" value={stats.tournaments} loading={loading} />
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Schnelleinstieg</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="/admin/tournaments"
            className="block p-4 border border-gray-200 rounded-lg hover:bg-blue-50 transition"
          >
            <h4 className="font-semibold text-gray-900">Turniere verwalten</h4>
            <p className="text-sm text-gray-600 mt-1">Turniere bearbeiten und erstellen</p>
          </a>
          <a
            href="/admin/players"
            className="block p-4 border border-gray-200 rounded-lg hover:bg-blue-50 transition"
          >
            <h4 className="font-semibold text-gray-900">Spieler verwalten</h4>
            <p className="text-sm text-gray-600 mt-1">Spieler hinzufügen und bearbeiten</p>
          </a>
          <a
            href="/admin/registrations"
            className="block p-4 border border-gray-200 rounded-lg hover:bg-blue-50 transition"
          >
            <h4 className="font-semibold text-gray-900">Anmeldungen</h4>
            <p className="text-sm text-gray-600 mt-1">Anmeldungen verwalten</p>
          </a>
          <a
            href="/admin/matches"
            className="block p-4 border border-gray-200 rounded-lg hover:bg-blue-50 transition"
          >
            <h4 className="font-semibold text-gray-900">Spiele planen</h4>
            <p className="text-sm text-gray-600 mt-1">Matches erstellen und bearbeiten</p>
          </a>
        </div>
      </div>
    </div>
  );
}

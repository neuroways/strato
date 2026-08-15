import React, { useState, useEffect } from 'react';
import { pb } from '../../lib/pb';

export default function Dashboard() {
  const [stats, setStats] = useState({
    tournaments: 0,
    players: 0,
    registrations: 0,
    matches: 0,
    matchesCompleted: 0,
    matchesOpen: 0,
    courts: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const tournaments = await pb.collection('tournaments').getFullList();
        const players = await pb.collection('players').getFullList().catch(() => []);
        const registrations = await pb.collection('registrations').getFullList().catch(() => []);
        const matches = await pb.collection('matches').getFullList().catch(() => []);
        const courts = await pb.collection('courts').getFullList().catch(() => []);

        const completedMatches = matches.filter(m => m.status === 'beendet').length;
        const openMatches = matches.filter(m => m.status === 'geplant' || m.status === 'läuft').length;

        setStats({
          tournaments: tournaments.length,
          players: players.length,
          registrations: registrations.length,
          matches: matches.length,
          matchesCompleted: completedMatches,
          matchesOpen: openMatches,
          courts: courts.length
        });
      } catch (error) {
        console.error('Error loading stats:', error);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          <p className="mt-2 text-gray-600">Statistiken werden geladen...</p>
        </div>
      </div>
    );
  }

  const StatCard = ({ label, value, color = 'green' }) => {
    const colors = {
      green: 'bg-green-50 border-green-600 text-green-900',
      blue: 'bg-blue-50 border-blue-600 text-blue-900',
      purple: 'bg-purple-50 border-purple-600 text-purple-900',
      red: 'bg-red-50 border-red-600 text-red-900'
    };
    return (
      <div className={`border-l-4 p-6 rounded-lg ${colors[color]}`}>
        <div className="text-4xl font-black">{value}</div>
        <div className="text-sm font-semibold mt-2">{label}</div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Turniere" value={stats.tournaments} color="green" />
        <StatCard label="Spieler" value={stats.players} color="blue" />
        <StatCard label="Anmeldungen" value={stats.registrations} color="purple" />
        <StatCard label="Plätze" value={stats.courts} color="green" />
        <StatCard label="Insgesamt Matches" value={stats.matches} color="blue" />
        <StatCard label="Abgeschlossen" value={stats.matchesCompleted} color="green" />
        <StatCard label="Offen/Läuft" value={stats.matchesOpen} color="red" />
      </div>
    </div>
  );
}

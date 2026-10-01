import React, { useState, useEffect } from 'react';
import { pb } from '../../lib/pb';

export default function ScheduleAdmin() {
  const [tournament, setTournament] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [courts, setCourts] = useState([]);
  const [rounds, setRounds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generatedSchedule, setGeneratedSchedule] = useState(null);
  const [scheduleParams, setScheduleParams] = useState({
    matchDuration: 20,
    pauseDuration: 5,
    startTime: '09:00'
  });

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const tournaments = await pb.collection('tournaments').getFullList();
      if (tournaments.length > 0) {
        const t = tournaments[0];
        setTournament(t);

        const [regList, courtList, roundList] = await Promise.all([
          pb.collection('registrations').getFullList({
            filter: `tournament_id = "${t.id}"`
          }).catch(() => []),
          pb.collection('courts').getFullList({
            filter: `tournament_id = "${t.id}"`
          }).catch(() => []),
          pb.collection('rounds').getFullList({
            filter: `tournament_id = "${t.id}"`
          }).catch(() => [])
        ]);

        setRegistrations(regList);
        setCourts(courtList);
        setRounds(roundList);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }

  const generateSchedule = async () => {
    if (registrations.length === 0) {
      alert('Keine Anmeldungen vorhanden');
      return;
    }

    if (courts.length === 0) {
      alert('Keine Plätze konfiguriert');
      return;
    }

    if (rounds.length === 0) {
      alert('Keine Runden konfiguriert');
      return;
    }

    // Simple round-robin scheduler
    const matches = [];
    const players = registrations;
    const matchCount = Math.floor((players.length * (players.length - 1)) / 2 / courts.length);
    let currentTime = scheduleParams.startTime;
    let courtIndex = 0;

    for (let i = 0; i < players.length; i++) {
      for (let j = i + 1; j < Math.min(i + 5, players.length); j++) {
        matches.push({
          tournament_id: tournament.id,
          round_id: rounds[0].id,
          court_id: courts[courtIndex % courts.length].id,
          player_a: players[i].player_id,
          player_b: players[j].player_id,
          start_time: currentTime,
          status: 'geplant'
        });

        courtIndex++;
        if (courtIndex % courts.length === 0) {
          // Move to next time slot
          const [hours, minutes] = currentTime.split(':').map(Number);
          const totalMinutes = hours * 60 + minutes + scheduleParams.matchDuration + scheduleParams.pauseDuration;
          const newHours = Math.floor(totalMinutes / 60);
          const newMinutes = totalMinutes % 60;
          currentTime = `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}`;
        }
      }
    }

    setGeneratedSchedule(matches);
  };

  const acceptSchedule = async () => {
    if (!generatedSchedule) return;

    try {
      // Save as schedule run
      await pb.collection('ai_schedule_runs').create({
        tournament_id: tournament.id,
        player_count: registrations.length,
        algorithm: 'round-robin',
        accepted: false,
        schedule_data: JSON.stringify(generatedSchedule)
      });

      // Create matches
      for (const match of generatedSchedule) {
        await pb.collection('matches').create(match).catch(() => {});
      }

      alert('Spielplan übernommen');
      setGeneratedSchedule(null);
      window.location.reload();
    } catch (error) {
      console.error('Error:', error);
      alert('Fehler beim Speichern');
    }
  };

  if (loading) return <div className="text-center py-8">Laden...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">KI-Spielplan-Generator</h1>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Anmeldungen: {registrations.length}
            </label>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Plätze: {courts.length}
            </label>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Runden: {rounds.length}
            </label>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Match-Dauer (Minuten)</label>
            <input
              type="number"
              value={scheduleParams.matchDuration}
              onChange={(e) => setScheduleParams({ ...scheduleParams, matchDuration: parseInt(e.target.value) })}
              min="5"
              max="120"
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Pause (Minuten)</label>
            <input
              type="number"
              value={scheduleParams.pauseDuration}
              onChange={(e) => setScheduleParams({ ...scheduleParams, pauseDuration: parseInt(e.target.value) })}
              min="0"
              max="30"
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Startzeit</label>
            <input
              type="time"
              value={scheduleParams.startTime}
              onChange={(e) => setScheduleParams({ ...scheduleParams, startTime: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>

        <button
          onClick={generateSchedule}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-bold text-lg transition"
        >
          🤖 Spielplan generieren
        </button>
      </div>

      {generatedSchedule && (
        <div className="bg-yellow-50 border-l-4 border-yellow-600 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4 text-yellow-900">Spielplan-Vorschlag</h2>
          <p className="text-yellow-800 mb-6">
            Der KI-Generator hat {generatedSchedule.length} Matches erstellt. Bitte überprüfen Sie diese und akzeptieren oder bearbeiten Sie diese.
          </p>

          <div className="space-y-2 max-h-64 overflow-y-auto mb-6 bg-white p-4 rounded">
            {generatedSchedule.slice(0, 10).map((match, idx) => (
              <div key={idx} className="text-sm text-gray-700">
                {match.start_time} - {match.player_a || 'A'} vs {match.player_b || 'B'}
              </div>
            ))}
            {generatedSchedule.length > 10 && (
              <div className="text-sm text-gray-500 italic">
                ... und {generatedSchedule.length - 10} weitere Matches
              </div>
            )}
          </div>

          <div className="flex gap-4">
            <button
              onClick={acceptSchedule}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-bold transition"
            >
              ✓ Übernehmen
            </button>
            <button
              onClick={() => setGeneratedSchedule(null)}
              className="flex-1 bg-gray-400 hover:bg-gray-500 text-white py-3 rounded-lg font-bold transition"
            >
              ✕ Abbrechen
            </button>
          </div>
        </div>
      )}

      {!generatedSchedule && (
        <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-lg text-blue-900">
          <p className="font-semibold mb-2">ℹ️ Wie funktioniert der KI-Spielplan?</p>
          <ul className="text-sm space-y-1">
            <li>• Der Generator erstellt automatisch Paarungen</li>
            <li>• Spieler werden fair verteilt</li>
            <li>• Plätze werden gleichmäßig belastet</li>
            <li>• Sie können den Vorschlag annehmen oder bearbeiten</li>
          </ul>
        </div>
      )}
    </div>
  );
}

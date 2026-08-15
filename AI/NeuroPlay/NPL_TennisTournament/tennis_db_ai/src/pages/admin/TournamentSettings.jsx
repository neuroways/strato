import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { TournamentSettingsService } from '../../services';

export default function TournamentSettings() {
  const { tournamentId } = useParams();
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    async function loadSettings() {
      const result = await TournamentSettingsService.getSettingsByTournament(tournamentId);
      if (result.success && result.data) {
        setSettings(result.data);
      } else {
        setError(result.error || 'Fehler beim Laden');
      }
      setLoading(false);
    }

    loadSettings();
  }, [tournamentId]);

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');

    const result = await TournamentSettingsService.updateSettings(settings.id, settings);
    if (result.success) {
      setSuccess('Einstellungen gespeichert');
      setTimeout(() => setSuccess(''), 3000);
    } else {
      setError(result.error || 'Fehler beim Speichern');
    }
    setSaving(false);
  }

  if (loading) return <div className="text-center py-8">Lädt...</div>;

  if (!settings) return <div className="text-center py-8 text-red-600">Einstellungen nicht gefunden</div>;

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Turniereinstellungen</h1>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
          {success}
        </div>
      )}

      <form onSubmit={handleSave} className="bg-white rounded-lg shadow p-6 space-y-6">
        <div>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.registration_open || false}
              onChange={(e) => setSettings({ ...settings, registration_open: e.target.checked })}
              className="w-4 h-4 text-blue-600 rounded"
              disabled={saving}
            />
            <span className="text-gray-900 font-medium">Anmeldung geöffnet</span>
          </label>
        </div>

        <div>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.waitlist_enabled || false}
              onChange={(e) => setSettings({ ...settings, waitlist_enabled: e.target.checked })}
              className="w-4 h-4 text-blue-600 rounded"
              disabled={saving}
            />
            <span className="text-gray-900 font-medium">Warteliste aktiviert</span>
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Spieldauer (Minuten)
          </label>
          <input
            type="number"
            value={settings.match_duration_minutes || ''}
            onChange={(e) => setSettings({ ...settings, match_duration_minutes: parseInt(e.target.value) || null })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={saving}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Pausenzeit (Minuten)
          </label>
          <input
            type="number"
            value={settings.break_duration_minutes || ''}
            onChange={(e) => setSettings({ ...settings, break_duration_minutes: parseInt(e.target.value) || null })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={saving}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Max. Spiele pro Spieler
          </label>
          <input
            type="number"
            value={settings.max_matches_per_player || ''}
            onChange={(e) => setSettings({ ...settings, max_matches_per_player: parseInt(e.target.value) || null })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={saving}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Auslosungsverfahren
          </label>
          <select
            value={settings.draw_method || ''}
            onChange={(e) => setSettings({ ...settings, draw_method: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={saving}
          >
            <option value="">-- Auswählen --</option>
            <option value="random">Zufällig</option>
            <option value="seeded">Gesetzt</option>
            <option value="custom">Manuell</option>
          </select>
        </div>

        <div className="flex gap-4 pt-4 border-t">
          <a
            href="/admin/tournaments"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-center"
          >
            Zurück
          </a>
          <button
            type="submit"
            disabled={saving}
            className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg transition"
          >
            {saving ? 'Wird gespeichert...' : 'Speichern'}
          </button>
        </div>
      </form>
    </div>
  );
}

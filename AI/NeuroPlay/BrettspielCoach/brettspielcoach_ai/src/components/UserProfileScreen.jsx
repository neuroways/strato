import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save, User } from 'lucide-react';
import { pb } from '../lib/pb';

export function UserProfileScreen({ currentUser, onBack }) {
  const [playerName, setPlayerName] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    loadProfile();
  }, [currentUser]);

  const loadProfile = async () => {
    try {
      setLoading(true);
      if (currentUser?.id) {
        const userProfile = await pb
          .collection('user_profiles')
          .getFirstListItem(`user_id = "${currentUser.id}"`)
          .catch(() => null);

        if (userProfile) {
          setProfile(userProfile);
          setPlayerName(userProfile.player_name || '');
        }
      }
    } catch (err) {
      console.error('Fehler beim Laden des Profils:', err);
    } finally {
      setLoading(false);
    }
  };

  const saveProfile = async () => {
    try {
      setSaving(true);
      setMessage('');

      if (!currentUser?.id) {
        setMessage('Fehler: Benutzer nicht authentifiziert');
        return;
      }

      const controller = new AbortController();
      const options = { signal: controller.signal };

      if (profile?.id) {
        await pb.collection('user_profiles').update(profile.id, {
          player_name: playerName || null,
        }, options);
      } else {
        const newProfile = await pb.collection('user_profiles').create({
          user_id: currentUser.id,
          player_name: playerName || null,
        }, options);
        setProfile(newProfile);
      }

      setMessage('✓ Profil gespeichert');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      if (err?.isAbort) return;
      setMessage('Fehler beim Speichern: ' + (err.message || 'Unbekannter Fehler'));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-4 md:p-8">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 mb-8 text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Zurück
        </button>

        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <User className="w-6 h-6 text-blue-400" />
            <h1 className="text-2xl font-bold">Mein Profil</h1>
          </div>

          {loading ? (
            <div className="text-center py-12 text-slate-400">Profil wird geladen...</div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  E-Mail
                </label>
                <p className="w-full bg-slate-700/50 border border-slate-600 rounded px-4 py-2 text-slate-400">
                  {currentUser?.email}
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Spielername
                </label>
                <input
                  type="text"
                  placeholder="Dein Spielername"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                />
                <p className="text-xs text-slate-500 mt-1">
                  So werden deine Spiele und Sammlungen angezeigt
                </p>
              </div>

              {message && (
                <div className={`rounded-lg p-3 text-sm ${
                  message.startsWith('✓')
                    ? 'bg-green-900/30 border border-green-700 text-green-300'
                    : 'bg-red-900/30 border border-red-700 text-red-300'
                }`}>
                  {message}
                </div>
              )}

              <button
                onClick={saveProfile}
                disabled={saving}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-lg font-semibold transition-colors"
              >
                <Save className="w-4 h-4" />
                {saving ? 'Wird gespeichert...' : 'Profil speichern'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

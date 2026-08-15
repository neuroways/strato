import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { pb } from '../lib/pb';

export default function SettingsPage() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showNewPasswordConfirm, setShowNewPasswordConfirm] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const isAuthenticated = pb.authStore.isValid;
    setIsLoggedIn(isAuthenticated);

    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [navigate]);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    if (!currentPassword || !newPassword) {
      setError('Bitte fülle alle Felder aus.');
      setLoading(false);
      return;
    }

    if (newPassword !== newPasswordConfirm) {
      setError('Neue Passwörter stimmen nicht überein.');
      setLoading(false);
      return;
    }

    if (newPassword.length < 8) {
      setError('Neues Passwort muss mindestens 8 Zeichen lang sein.');
      setLoading(false);
      return;
    }

    if (currentPassword === newPassword) {
      setError('Neues Passwort muss sich vom aktuellen unterscheiden.');
      setLoading(false);
      return;
    }

    try {
      // Verify current password by attempting to refresh auth
      const user = pb.authStore.record;
      if (!user) {
        setError('Benutzer nicht gefunden.');
        setLoading(false);
        return;
      }

      // Update password
      await pb.collection('npl_users').update(user.id, {
        password: newPassword,
        passwordConfirm: newPasswordConfirm,
      });

      setSuccess('Passwort erfolgreich geändert!');
      setCurrentPassword('');
      setNewPassword('');
      setNewPasswordConfirm('');
    } catch (err) {
      console.error('Password change error:', err);
      setError('Passwort konnte nicht geändert werden. Versuche es später erneut.');
    } finally {
      setLoading(false);
    }
  };

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white py-8 px-4">
      <div className="max-w-md mx-auto">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition mb-8"
        >
          <ArrowLeft size={18} />
          <span className="text-sm">Zur Startseite</span>
        </button>

        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8">
          <h1 className="text-3xl font-bold mb-2">Kontoeinstellungen</h1>
          <p className="text-slate-300 mb-8">
            Ändere dein Passwort und verwalte dein Konto
          </p>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6 text-red-300 text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4 mb-6 text-emerald-300 text-sm">
              {success}
            </div>
          )}

          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">
                Aktuelles Passwort
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 text-slate-400" size={18} />
                <input
                  type={showCurrentPassword ? 'text' : 'password'}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Dein aktuelles Passwort"
                  className="w-full pl-10 pr-10 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-300 transition"
                >
                  {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">
                Neues Passwort
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 text-slate-400" size={18} />
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Mindestens 8 Zeichen"
                  className="w-full pl-10 pr-10 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-300 transition"
                >
                  {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">
                Neues Passwort wiederholen
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 text-slate-400" size={18} />
                <input
                  type={showNewPasswordConfirm ? 'text' : 'password'}
                  value={newPasswordConfirm}
                  onChange={(e) => setNewPasswordConfirm(e.target.value)}
                  placeholder="Passwort wiederholen"
                  className="w-full pl-10 pr-10 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPasswordConfirm(!showNewPasswordConfirm)}
                  className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-300 transition"
                >
                  {showNewPasswordConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 disabled:from-slate-600 disabled:to-slate-600 text-slate-900 font-bold py-3 rounded-lg transition mt-6"
            >
              {loading ? 'Wird geändert...' : 'Passwort ändern'}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-700">
            <p className="text-slate-400 text-sm mb-4">
              Dein Konto ist sicher. Du kannst dein Passwort jederzeit hier ändern.
            </p>
            <button
              onClick={() => {
                pb.authStore.clear();
                navigate('/login');
              }}
              className="w-full text-slate-400 hover:text-slate-300 transition py-2 text-sm font-medium"
            >
              Abmelden
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

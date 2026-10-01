import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Mail, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { pb } from '../lib/pb';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [resetMode, setResetMode] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetPassword, setResetPassword] = useState('');
  const [resetPasswordConfirm, setResetPasswordConfirm] = useState('');
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!email || !password) {
      setError('Bitte fülle alle Felder aus.');
      setLoading(false);
      return;
    }

    try {
      await pb.collection('npl_users').authWithPassword(email, password);
      navigate('/');
    } catch (err) {
      console.error('Login error:', err);
      setError('E-Mail oder Passwort nicht korrekt.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    setError(null);

    setError('Passwort-Zurücksetzen ist aus Sicherheitsgründen nur für angemeldete Nutzer verfügbar. Wenn du dein Passwort vergessen hast, kontaktiere bitte den Support.');
  };

  if (resetSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/50">
            <div className="text-3xl">✓</div>
          </div>
          <h1 className="text-3xl font-bold mb-3">Passwort aktualisiert!</h1>
          <p className="text-slate-300 mb-8">
            Dein neues Passwort ist aktiv. Du wirst gleich weitergeleitet...
          </p>
          <div className="animate-pulse text-emerald-400">Weiterleitung...</div>
        </div>
      </div>
    );
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
          {!resetMode ? (
            <>
              <h1 className="text-3xl font-bold mb-2">Anmelden</h1>
              <p className="text-slate-300 mb-8">
                Melde dich an und setze deine Reise fort
              </p>

              {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6 text-red-300 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">
                    E-Mail
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 text-slate-400" size={18} />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="deine@email.com"
                      className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">
                    Passwort
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3.5 text-slate-400" size={18} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Dein Passwort"
                      className="w-full pl-10 pr-10 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-300 transition"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 disabled:from-slate-600 disabled:to-slate-600 text-slate-900 font-bold py-3 rounded-lg transition mt-6"
                >
                  {loading ? 'Wird angemeldet...' : 'Anmelden'}
                </button>
              </form>

              <button
                onClick={() => setResetMode(true)}
                className="w-full text-emerald-400 hover:text-emerald-300 transition py-2 text-sm font-medium mt-4"
              >
                Passwort vergessen?
              </button>

              <p className="text-center text-slate-400 mt-6 text-sm">
                Du hast noch keinen Account?{' '}
                <button
                  onClick={() => navigate('/register')}
                  className="text-emerald-400 hover:text-emerald-300 transition font-medium"
                >
                  Registrieren
                </button>
              </p>
            </>
          ) : (
            <>
              <h1 className="text-3xl font-bold mb-2">Passwort zurücksetzen</h1>
              <p className="text-slate-300 mb-8">
                Gib deine E-Mail und ein neues Passwort ein
              </p>

              {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6 text-red-300 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleReset} className="space-y-4">
                <p className="text-slate-300 text-sm leading-relaxed">
                  Aus Sicherheitsgründen kannst du dein Passwort nur ändern, wenn du angemeldet bist – auf deiner Kontoeinstellungsseite.
                </p>
                <p className="text-slate-400 text-sm">
                  Wenn du dein Passwort vergessen hast und dich nicht anmelden kannst, schreib uns bitte. Wir helfen dir, wieder Zugang zu deinem Konto zu bekommen.
                </p>
              </form>

              <button
                onClick={() => {
                  setResetMode(false);
                  setError(null);
                }}
                className="w-full text-emerald-400 hover:text-emerald-300 transition py-2 text-sm font-medium mt-6 border-t border-slate-700 pt-6"
              >
                ← Zurück zur Anmeldung
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

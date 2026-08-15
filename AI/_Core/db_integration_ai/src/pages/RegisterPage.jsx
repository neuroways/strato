import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Mail, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { pb } from '../lib/pb';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!email || !password || !displayName) {
      setError('Bitte fülle alle Felder aus.');
      setLoading(false);
      return;
    }

    if (password !== passwordConfirm) {
      setError('Passwörter stimmen nicht überein.');
      setLoading(false);
      return;
    }

    if (password.length < 8) {
      setError('Passwort muss mindestens 8 Zeichen lang sein.');
      setLoading(false);
      return;
    }

    try {
      // Register new user
      const userData = {
        email,
        password,
        passwordConfirm,
        display_name: displayName,
      };

      const user = await pb.collection('npl_users').create(userData);

      // Auto-login after registration
      await pb.collection('npl_users').authWithPassword(email, password);

      setSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      console.error('Registration error:', err);
      
      // Parse error more carefully
      let errorMessage = 'Registrierung fehlgeschlagen.';
      
      if (err.status === 400 && err.data?.data) {
        const errors = err.data.data;
        if (errors.email?.message) {
          errorMessage = errors.email.message;
        } else if (errors.display_name?.message) {
          errorMessage = errors.display_name.message;
        } else if (errors.password?.message) {
          errorMessage = errors.password.message;
        }
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/50">
            <div className="text-3xl">✓</div>
          </div>
          <h1 className="text-3xl font-bold mb-3">Willkommen!</h1>
          <p className="text-slate-300 mb-8">
            Du bist erfolgreich registriert und angemeldet. Gleich geht es weiter...
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
          <h1 className="text-3xl font-bold mb-2">Registrieren</h1>
          <p className="text-slate-300 mb-8">
            Erstelle einen Account und starte deine NeuroPlay-Reise
          </p>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6 text-red-300 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">
                Dein Name
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="z.B. Maria"
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
              />
            </div>

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
                  placeholder="Mindestens 8 Zeichen"
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

            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">
                Passwort wiederholen
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 text-slate-400" size={18} />
                <input
                  type={showPasswordConfirm ? 'text' : 'password'}
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  placeholder="Passwort wiederholen"
                  className="w-full pl-10 pr-10 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                  className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-300 transition"
                >
                  {showPasswordConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 disabled:from-slate-600 disabled:to-slate-600 text-slate-900 font-bold py-3 rounded-lg transition mt-6"
            >
              {loading ? 'Wird registriert...' : 'Account erstellen'}
            </button>
          </form>

          <p className="text-center text-slate-400 mt-6 text-sm">
            Du hast bereits einen Account?{' '}
            <button
              onClick={() => navigate('/login')}
              className="text-emerald-400 hover:text-emerald-300 transition font-medium"
            >
              Anmelden
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

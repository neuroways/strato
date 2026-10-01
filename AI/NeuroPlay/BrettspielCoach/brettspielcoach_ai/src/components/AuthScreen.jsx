import React, { useState } from 'react';
import { LogIn, UserPlus, ArrowLeft } from 'lucide-react';
import { pb } from '../lib/pb';

export function AuthScreen({ onAuthSuccess, onBack }) {
  const [mode, setMode] = useState('login'); // 'login' oder 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const authData = await pb.collection('users').authWithPassword(email, password);
      localStorage.setItem('neuroplay_user_id', authData.record.id);
      localStorage.setItem('neuroplay_user_email', authData.record.email);
      localStorage.setItem('neuroplay_auth_token', authData.token);
      onAuthSuccess(authData.record);
    } catch (err) {
      setError(err.message || 'Anmeldung fehlgeschlagen');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const authData = await pb.collection('users').create({
        email,
        password,
        passwordConfirm: password,
        name,
      });
      
      const authRecord = await pb.collection('users').authWithPassword(email, password);
      localStorage.setItem('neuroplay_user_id', authRecord.record.id);
      localStorage.setItem('neuroplay_user_email', authRecord.record.email);
      localStorage.setItem('neuroplay_auth_token', authRecord.token);
      onAuthSuccess(authRecord.record);
    } catch (err) {
      setError(err.message || 'Registrierung fehlgeschlagen');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: `linear-gradient(135deg, var(--nw-primary) 0%, var(--nw-accent) 100%)`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    }}>
      <div style={{ width: '100%', maxWidth: '28rem' }}>
        <button
          onClick={onBack}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '2rem',
            color: 'rgba(255,255,255,0.7)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '0.875rem',
            fontWeight: 500,
            transition: 'color 150ms'
          }}
          onMouseEnter={(e) => e.target.style.color = '#ffffff'}
          onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.7)'}
        >
          <ArrowLeft className="w-4 h-4" />
          Zurück
        </button>

        <div style={{
          background: 'rgba(255,255,255,0.95)',
          borderRadius: '10px',
          padding: '2rem',
          boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)'
        }}>
          <h1 style={{
            fontSize: 'clamp(1.5rem, 4vw, 2rem)',
            fontWeight: 700,
            marginBottom: '2rem',
            textAlign: 'center',
            color: 'var(--nw-primary)'
          }}>
            {mode === 'login' ? 'Anmelden' : 'Registrieren'}
          </h1>

          <form onSubmit={mode === 'login' ? handleLogin : handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {mode === 'signup' && (
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  marginBottom: '0.5rem',
                  color: 'var(--nw-primary)'
                }}>
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: `2px solid var(--nw-secondary)`,
                    borderRadius: '6px',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'border-color 150ms'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--nw-primary)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--nw-secondary)'}
                  placeholder="Dein Name"
                  required={mode === 'signup'}
                />
              </div>
            )}

            <div>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: 600,
                marginBottom: '0.5rem',
                color: 'var(--nw-primary)'
              }}>
                E-Mail
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: `2px solid var(--nw-secondary)`,
                  borderRadius: '6px',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'border-color 150ms'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--nw-primary)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--nw-secondary)'}
                placeholder="deine@email.com"
                required
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: 600,
                marginBottom: '0.5rem',
                color: 'var(--nw-primary)'
              }}>
                Passwort
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: `2px solid var(--nw-secondary)`,
                  borderRadius: '6px',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'border-color 150ms'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--nw-primary)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--nw-secondary)'}
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <div style={{
                background: '#fef2f2',
                border: `2px solid var(--nw-error)`,
                borderRadius: '6px',
                padding: '0.75rem',
                color: 'var(--nw-error)',
                fontSize: '0.875rem'
              }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.5rem',
                background: loading ? 'rgba(10, 31, 68, 0.5)' : 'var(--nw-primary)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '6px',
                fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'background 150ms'
              }}
              onMouseEnter={(e) => !loading && (e.target.style.background = 'var(--nw-primary-light)')}
              onMouseLeave={(e) => !loading && (e.target.style.background = 'var(--nw-primary)')}
            >
              {mode === 'login' ? (
                <>
                  <LogIn className="w-4 h-4" />
                  Anmelden
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4" />
                  Registrieren
                </>
              )}
            </button>
          </form>

          <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <p style={{
              color: 'var(--nw-text-secondary)',
              fontSize: '0.875rem',
              marginBottom: '0.75rem'
            }}>
              {mode === 'login'
                ? 'Noch kein Konto?'
                : 'Du hast bereits ein Konto?'}
            </p>
            <button
              onClick={() => {
                setMode(mode === 'login' ? 'signup' : 'login');
                setError('');
              }}
              style={{
                color: 'var(--nw-primary)',
                fontWeight: 600,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.875rem',
                transition: 'opacity 150ms'
              }}
              onMouseEnter={(e) => e.target.style.opacity = '0.7'}
              onMouseLeave={(e) => e.target.style.opacity = '1'}
            >
              {mode === 'login' ? 'Jetzt registrieren' : 'Anmelden'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

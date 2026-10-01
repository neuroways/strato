import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router';
import { pb } from '../lib/pb';

export default function Admin() {
  const navigate = useNavigate();
  const [authUser, setAuthUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (pb.authStore.isValid && pb.authStore.model?.collectionId === 'admins') {
      setAuthUser(pb.authStore.model);
      navigate('/admin/dashboard');
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = await pb.collection('admins').authWithPassword(email, password);
      setAuthUser(data.record);
      navigate('/admin/dashboard');
    } catch (err) {
      setError('Anmeldung fehlgeschlagen. Überprüfen Sie E-Mail und Passwort.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-green-900 mb-2 text-center">Admin-Anmeldung</h1>
        <p className="text-center text-gray-600 mb-8">Melden Sie sich als Administrator an</p>

        <form onSubmit={handleLogin} className="space-y-4">
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded">
              {error}
            </div>
          )}

          <div>
            <label className="block text-green-900 font-semibold mb-2">E-Mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-200"
              placeholder="admin@example.com"
            />
          </div>

          <div>
            <label className="block text-green-900 font-semibold mb-2">Passwort</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-200"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-3 rounded-lg transition"
          >
            {loading ? 'Wird angemeldet...' : 'Anmelden'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p className="mb-2">Noch kein Admin-Konto?</p>
          <p className="text-xs">Kontaktieren Sie den Systemadministrator</p>
        </div>
      </div>
    </div>
  );
}

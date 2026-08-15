import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { pb } from '../lib/pb';

export default function Register() {
  const navigate = useNavigate();
  const [tournaments, setTournaments] = useState([]);
  const [selectedTournament, setSelectedTournament] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    age: '',
    experience: 'Freizeit',
    club: '',
    email: '',
    note: ''
  });

  useEffect(() => {
    async function loadTournaments() {
      try {
        const list = await pb.collection('tournaments').getFullList();
        setTournaments(list);
        if (list.length > 0) {
          setSelectedTournament(list[0].id);
        }
      } catch (err) {
        console.error('Error loading tournaments:', err);
      }
    }
    loadTournaments();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validate
      if (!formData.firstname || !formData.lastname || !formData.email || !formData.experience) {
        setError('Bitte füllen Sie alle erforderlichen Felder aus');
        setLoading(false);
        return;
      }

      // Create player
      const player = await pb.collection('players').create({
        firstname: formData.firstname,
        lastname: formData.lastname,
        age: formData.age ? parseInt(formData.age) : null,
        experience: formData.experience,
        club: formData.club,
        email: formData.email,
        note: formData.note
      });

      // Register for tournament
      await pb.collection('registrations').create({
        tournament_id: selectedTournament,
        player_id: player.id,
        confirmed: false,
        checked_in: false
      });

      setSubmitted(true);
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (err) {
      setError(err.message || 'Anmeldung fehlgeschlagen. Bitte versuchen Sie es später erneut.');
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center px-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
          <div className="text-5xl mb-4">✓</div>
          <h2 className="text-3xl font-bold text-green-900 mb-4">Anmeldung bestätigt!</h2>
          <p className="text-green-700 mb-6">
            Vielen Dank für Ihre Anmeldung zum Tennisturnier in Neindorf. Wir freuen uns auf Sie!
          </p>
          <p className="text-sm text-gray-600 mb-4">Sie werden in 3 Sekunden zur Startseite weitergeleitet...</p>
          <button 
            onClick={() => navigate('/')}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition"
          >
            Zur Startseite
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-12 px-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-green-900 mb-2 text-center">Anmeldung</h1>
        <p className="text-center text-green-700 mb-8">Melden Sie sich zum Tennisturnier an</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded">
              {error}
            </div>
          )}

          {tournaments.length > 0 && (
            <div>
              <label className="block text-green-900 font-semibold mb-2">Turnier</label>
              <select
                value={selectedTournament}
                onChange={(e) => setSelectedTournament(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-200"
              >
                {tournaments.map(t => (
                  <option key={t.id} value={t.id}>
                    {t.title} ({new Date(t.event_date).toLocaleDateString('de-DE')})
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-green-900 font-semibold mb-2">Vorname *</label>
              <input
                type="text"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-200"
              />
            </div>
            <div>
              <label className="block text-green-900 font-semibold mb-2">Nachname *</label>
              <input
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-200"
              />
            </div>
          </div>

          <div>
            <label className="block text-green-900 font-semibold mb-2">Alter</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-200"
            />
          </div>

          <div>
            <label className="block text-green-900 font-semibold mb-2">E-Mail *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-200"
            />
          </div>

          <div>
            <label className="block text-green-900 font-semibold mb-2">Erfahrung *</label>
            <select
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-200"
            >
              <option value="Anfänger">Anfänger</option>
              <option value="Freizeit">Freizeit</option>
              <option value="Fortgeschritten">Fortgeschritten</option>
              <option value="Mannschaft">Mannschaft</option>
              <option value="Turnier">Turnier</option>
            </select>
          </div>

          <div>
            <label className="block text-green-900 font-semibold mb-2">Verein (optional)</label>
            <input
              type="text"
              name="club"
              value={formData.club}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-200"
            />
          </div>

          <div>
            <label className="block text-green-900 font-semibold mb-2">Bemerkung (optional)</label>
            <textarea
              name="note"
              value={formData.note}
              onChange={handleChange}
              rows="3"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-200"
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
      </div>
    </div>
  );
}

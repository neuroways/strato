import React, { useState, useEffect } from 'react';
import { pb } from '../lib/pb';

export default function Participants() {
  const [participants, setParticipants] = useState([]);
  const [filteredParticipants, setFilteredParticipants] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadParticipants() {
      try {
        const players = await pb.collection('players').getFullList({
          sort: 'lastname,firstname'
        });
        setParticipants(players);
        setFilteredParticipants(players);
      } catch (error) {
        console.error('Error loading participants:', error);
      } finally {
        setLoading(false);
      }
    }
    loadParticipants();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (!query) {
      setFilteredParticipants(participants);
    } else {
      const filtered = participants.filter(p =>
        p.firstname.toLowerCase().includes(query.toLowerCase()) ||
        p.lastname.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredParticipants(filtered);
    }
  };

  const getExperienceColor = (exp) => {
    switch (exp) {
      case 'Anfänger': return 'bg-blue-100 text-blue-900';
      case 'Freizeit': return 'bg-green-100 text-green-900';
      case 'Fortgeschritten': return 'bg-yellow-100 text-yellow-900';
      case 'Mannschaft': return 'bg-orange-100 text-orange-900';
      case 'Turnier': return 'bg-red-100 text-red-900';
      default: return 'bg-gray-100 text-gray-900';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          <p className="mt-4 text-green-600">Teilnehmerliste wird geladen...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-green-900 mb-8 text-center">Teilnehmerliste</h1>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Spieler suchen..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full px-6 py-3 pl-12 border-2 border-green-300 rounded-lg focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-200"
            />
            <span className="absolute left-4 top-3 text-xl">🔍</span>
          </div>
        </div>

        {/* Participants Count */}
        <div className="mb-6 text-center">
          <p className="text-lg text-green-700 font-semibold">
            {filteredParticipants.length} Spieler
            {searchQuery && ` (von ${participants.length})`}
          </p>
        </div>

        {/* Participants Table */}
        {filteredParticipants.length > 0 ? (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="hidden md:block">
              <table className="w-full">
                <thead className="bg-green-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Name</th>
                    <th className="px-6 py-4 text-left font-semibold">Alter</th>
                    <th className="px-6 py-4 text-left font-semibold">Erfahrung</th>
                    <th className="px-6 py-4 text-left font-semibold">Verein</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredParticipants.map((p, idx) => (
                    <tr key={p.id} className="hover:bg-green-50 transition">
                      <td className="px-6 py-4 font-medium text-green-900">
                        {idx + 1}. {p.firstname} {p.lastname}
                      </td>
                      <td className="px-6 py-4 text-gray-700">{p.age || '-'}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getExperienceColor(p.experience)}`}>
                          {p.experience}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-700">{p.club || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile View */}
            <div className="md:hidden space-y-4 p-4">
              {filteredParticipants.map((p, idx) => (
                <div key={p.id} className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <div className="font-bold text-green-900 mb-2">
                    {idx + 1}. {p.firstname} {p.lastname}
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-gray-600">Alter: {p.age || '-'}</div>
                    <div>
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${getExperienceColor(p.experience)}`}>
                        {p.experience}
                      </span>
                    </div>
                    {p.club && <div className="col-span-2 text-gray-600">Verein: {p.club}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <p className="text-gray-600 text-lg">
              {searchQuery ? 'Keine Spieler gefunden' : 'Noch keine Anmeldungen'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

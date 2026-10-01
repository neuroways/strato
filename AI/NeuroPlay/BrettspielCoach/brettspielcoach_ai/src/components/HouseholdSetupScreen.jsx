import React, { useState, useEffect } from 'react';
import { ArrowLeft, Home, Plus, X, Users, Copy, Check } from 'lucide-react';
import { pb } from '../lib/pb';

export function HouseholdSetupScreen({ currentUser, onBack, onHouseholdCreated }) {
  const [household, setHousehold] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAddMember, setShowAddMember] = useState(false);
  const [memberName, setMemberName] = useState('');
  const [members, setMembers] = useState([]);
  const [error, setError] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    loadHousehold();
  }, [currentUser]);

  const loadHousehold = async () => {
    try {
      setLoading(true);
      if (!currentUser?.id) return;

      // Try to find household for this user
      const existingHousehold = await pb
        .collection('households')
        .getFirstListItem(`owner_user_id = "${currentUser.id}"`)
        .catch(() => null);

      if (existingHousehold) {
        setHousehold(existingHousehold);
        setInviteCode(existingHousehold.id);
        loadMembers(existingHousehold.id);
      }
    } catch (err) {
      console.error('Fehler beim Laden des Haushalts:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadMembers = async (householdId) => {
    try {
      const householdMembers = await pb
        .collection('household_members')
        .getFullList({
          filter: `household_id = "${householdId}"`,
        });
      setMembers(householdMembers);
    } catch (err) {
      console.error('Fehler beim Laden der Mitglieder:', err);
    }
  };

  const createHousehold = async () => {
    try {
      setError('');
      const newHousehold = await pb.collection('households').create({
        name: `${currentUser.name}s Haushalt`,
        owner_user_id: currentUser.id,
      });
      setHousehold(newHousehold);
      setInviteCode(newHousehold.id);
      onHouseholdCreated(newHousehold);
    } catch (err) {
      setError('Fehler beim Erstellen des Haushalts: ' + (err.message || ''));
    }
  };

  const addMember = async () => {
    if (!memberName.trim() || !household?.id) return;

    try {
      setError('');
      await pb.collection('household_members').create({
        household_id: household.id,
        user_id: currentUser.id, // Reference to current user for now
        role: 'member',
        name: memberName.trim(),
      });
      setMemberName('');
      setShowAddMember(false);
      await loadMembers(household.id);
    } catch (err) {
      setError('Fehler beim Hinzufügen des Mitglieds: ' + (err.message || ''));
    }
  };

  const removeMember = async (memberId) => {
    try {
      await pb.collection('household_members').delete(memberId);
      await loadMembers(household.id);
    } catch (err) {
      setError('Fehler beim Entfernen: ' + (err.message || ''));
    }
  };

  const copyInviteCode = () => {
    navigator.clipboard.writeText(inviteCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-4 md:p-8 flex items-center justify-center">
        <p className="text-slate-400">Haushalt wird geladen...</p>
      </div>
    );
  }

  if (!household) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-4 md:p-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 mb-8 text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Zurück
        </button>

        <div className="max-w-md mx-auto bg-slate-800/50 border border-slate-700 rounded-lg p-8">
          <div className="flex items-center gap-3 mb-6">
            <Home className="w-8 h-6 text-blue-400" />
            <h1 className="text-2xl font-bold">Haushalt gründen</h1>
          </div>

          <p className="text-slate-300 mb-6">
            Gründe deinen Spielerhaushalt und lade Freunde und Familie ein, um Spiele gemeinsam zu verwalten.
          </p>

          <button
            onClick={createHousehold}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors"
          >
            <Plus className="w-4 h-4" />
            Haushalt gründen
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-4 md:p-8">
      <button
        onClick={onBack}
        className="flex items-center gap-2 mb-8 text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Zurück
      </button>

      <div className="max-w-2xl mx-auto space-y-6">
        {/* Household Info */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <Home className="w-6 h-6 text-blue-400" />
            <h2 className="text-2xl font-bold">{household.name}</h2>
          </div>

          <p className="text-slate-400 mb-4">
            Lade Spieler ein, um gemeinsam Spiele zu verwalten und zu organisieren.
          </p>

          <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-4">
            <p className="text-sm text-slate-400 mb-2">Einladungscode:</p>
            <div className="flex gap-2">
              <code className="flex-1 bg-slate-800 border border-slate-600 rounded px-3 py-2 font-mono text-sm text-blue-400">
                {inviteCode}
              </code>
              <button
                onClick={copyInviteCode}
                className="px-4 py-2 bg-slate-600 hover:bg-slate-500 rounded transition-colors flex items-center gap-2"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Members */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-green-400" />
              <h3 className="text-xl font-bold">Mitglieder ({members.length})</h3>
            </div>
            <button
              onClick={() => setShowAddMember(!showAddMember)}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-sm font-semibold transition-colors"
            >
              <Plus className="w-4 h-4" />
              Hinzufügen
            </button>
          </div>

          {showAddMember && (
            <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-4 mb-6">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Spielername"
                  value={memberName}
                  onChange={(e) => setMemberName(e.target.value)}
                  className="flex-1 bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-green-500"
                />
                <button
                  onClick={addMember}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded text-sm font-semibold transition-colors"
                >
                  Hinzufügen
                </button>
                <button
                  onClick={() => setShowAddMember(false)}
                  className="px-3 py-2 bg-slate-600 hover:bg-slate-500 rounded transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-900/30 border border-red-700 rounded-lg p-3 mb-4 text-red-300 text-sm">
              {error}
            </div>
          )}

          {members.length === 0 ? (
            <p className="text-slate-400 text-center py-8">
              Noch keine Mitglieder. Lade Spieler ein, um zu beginnen.
            </p>
          ) : (
            <div className="space-y-2">
              {members.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between bg-slate-700/50 rounded-lg p-4"
                >
                  <div>
                    <p className="font-semibold">{member.name}</p>
                    <p className="text-sm text-slate-400 capitalize">{member.role}</p>
                  </div>
                  <button
                    onClick={() => removeMember(member.id)}
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

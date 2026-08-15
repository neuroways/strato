import React, { useState, useEffect } from 'react';
import { Users, Plus, Trash2, X } from 'lucide-react';
import { pb } from '../lib/pb';
import { getApiEndpoint } from '../lib/config';

export function AdminUserManagement({ currentUser }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddAdmin, setShowAddAdmin] = useState(false);
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [roles, setRoles] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (currentUser) {
      checkAdminStatus();
    }
  }, [currentUser?.id]);

  const checkAdminStatus = async () => {
    try {
      if (!currentUser?.id) {
        setIsAdmin(false);
        return;
      }

      // Load user's role from PocketBase via REST API
      const apiUrl = getApiEndpoint();
      
      const response = await fetch(`${apiUrl}/collections/users/records/${currentUser.id}`, {
        headers: {
          'Authorization': `Bearer ${pb.authStore.token}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        // Check if user has admin role in the role_id field
        const isAdminUser = userData.role_id === 'admin' || userData.verified === true;
        
        if (isAdminUser) {
          setIsAdmin(true);
          await loadData();
        } else {
          setIsAdmin(false);
          setError('Nur Administratoren können Benutzer verwalten');
        }
      } else {
        setIsAdmin(false);
        setError('Fehler beim Prüfen der Berechtigung');
      }
    } catch (err) {
      console.error('Admin status check error:', err);
      setIsAdmin(false);
      setError('Fehler beim Laden der Benutzer: ' + (err.message || ''));
    }
  };

  const loadData = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Load roles from localStorage first, fallback to PocketBase
      let rolesData = [];
      try {
        const stored = localStorage.getItem('neuroplay_roles');
        if (stored) {
          rolesData = JSON.parse(stored);
        } else {
          rolesData = await pb.collection('roles').getFullList({ sort: 'name' });
        }
      } catch {
        rolesData = await pb.collection('roles').getFullList({ sort: 'name' });
      }
      setRoles(rolesData);

      // Load users from localStorage if available (like games/publishers)
      let usersData = [];
      try {
        const stored = localStorage.getItem('neuroplay_users');
        if (stored) {
          usersData = JSON.parse(stored);
        } else {
          // Fallback: try REST API
          const apiUrl = getApiEndpoint();
          const url = `${apiUrl}/collections/users/records`;
          
          const response = await fetch(url, {
            headers: {
              'Authorization': `Bearer ${pb.authStore.token}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            usersData = data.items || [];
          }
        }
      } catch (err) {
        console.error('Error loading users:', err);
        setError('Fehler beim Laden der Benutzer. Bitte versuche es später erneut.');
        setLoading(false);
        return;
      }
      
      // Get profiles for each user
      const usersWithProfiles = await Promise.all(
        usersData.map(async (user) => {
          try {
            const profile = await pb
              .collection('user_profiles')
              .getFirstListItem(`user_id = "${user.id}"`)
              .catch(() => null);
            return { ...user, profile };
          } catch {
            return { ...user, profile: null };
          }
        })
      );

      setUsers(usersWithProfiles);
    } catch (err) {
      setError('Fehler beim Laden der Benutzer: ' + (err.message || ''));
      console.error('Admin error:', err);
    } finally {
      setLoading(false);
    }
  };

  const addAdmin = async () => {
    if (!newAdminEmail.trim()) return;

    try {
      const apiUrl = getApiEndpoint();

      // Find user by email via REST API
      const response = await fetch(
        `${apiUrl}/collections/users/records?filter=email%3D%22${encodeURIComponent(newAdminEmail.trim())}%22`,
        {
          headers: {
            'Authorization': `Bearer ${pb.authStore.token}`,
          },
        }
      );

      if (!response.ok) throw new Error('Benutzer nicht gefunden');
      
      const data = await response.json();
      if (!data.items || data.items.length === 0) {
        alert('Benutzer mit dieser E-Mail nicht gefunden');
        return;
      }

      const user = data.items[0];

      // Get admin role
      const adminRole = roles.find(r => r.id === 'admin');
      if (!adminRole) throw new Error('Admin-Rolle nicht gefunden');

      // Update or create profile
      const existingProfile = await pb
        .collection('user_profiles')
        .getFirstListItem(`user_id = "${user.id}"`)
        .catch(() => null);

      if (existingProfile) {
        await pb
          .collection('user_profiles')
          .update(existingProfile.id, { role_id: adminRole.id });
      } else {
        await pb.collection('user_profiles').create({
          user_id: user.id,
          role_id: adminRole.id,
        });
      }

      // Mark user as verified (superuser) via REST API
      const updateResponse = await fetch(
        `${window.location.origin}${endpoint}/collections/users/records/${user.id}`,
        {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${pb.authStore.token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ verified: true }),
        }
      );
      
      if (!updateResponse.ok) throw new Error('Fehler beim Speichern der Admin-Rolle');

      setNewAdminEmail('');
      setShowAddAdmin(false);
      await loadData();
    } catch (err) {
      setError('Fehler beim Hinzufügen des Admins: ' + (err.message || ''));
    }
  };

  const removeAdminRole = async (userId) => {
    try {
      const profile = await pb
        .collection('user_profiles')
        .getFirstListItem(`user_id = "${userId}"`);

      await pb.collection('user_profiles').update(profile.id, { role_id: null });
      
      // Remove verified status
      await pb.collection('users').update(userId, { verified: false });
      
      await loadData();
    } catch (err) {
      setError('Fehler beim Entfernen der Admin-Rolle: ' + (err.message || ''));
    }
  };

  const getRoleName = (roleId) => {
    const role = roles.find(r => r.id === roleId);
    return role?.name || roleId || '–';
  };

  if (!isAdmin) {
    return (
      <div className="bg-red-900/20 border border-red-700 rounded-lg p-6 text-red-300">
        <p className="font-semibold mb-2">Zugriff verweigert</p>
        <p className="text-sm">Nur Administratoren können Benutzer verwalten.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-semibold">Benutzerverwaltung</h3>
          </div>
          <button
            onClick={() => setShowAddAdmin(!showAddAdmin)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-semibold transition-colors"
          >
            <Plus className="w-4 h-4" />
            Admin hinzufügen
          </button>
        </div>

        {showAddAdmin && (
          <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-4 mb-6">
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="E-Mail-Adresse"
                value={newAdminEmail}
                onChange={(e) => setNewAdminEmail(e.target.value)}
                className="flex-1 bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={addAdmin}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm font-semibold transition-colors"
              >
                Hinzufügen
              </button>
              <button
                onClick={() => setShowAddAdmin(false)}
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

        {loading ? (
          <div className="text-center py-8 text-slate-400">Benutzer werden geladen...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-3 px-4 font-semibold text-slate-300">E-Mail</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-300">Spielername</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-300">Rolle</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-300">Aktionen</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-slate-700 hover:bg-slate-700/50 transition-colors">
                    <td className="py-3 px-4">{user.email}</td>
                    <td className="py-3 px-4">{user.profile?.player_name || '–'}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        user.profile?.role_id === 'admin'
                          ? 'bg-red-900/30 text-red-300'
                          : 'bg-slate-700 text-slate-300'
                      }`}>
                        {getRoleName(user.profile?.role_id)}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {user.profile?.role_id === 'admin' && user.email !== 'svenja@festerling.org' && (
                        <button
                          onClick={() => removeAdminRole(user.id)}
                          className="text-red-400 hover:text-red-300 transition-colors"
                          title="Admin-Rolle entfernen"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <p className="text-xs text-slate-500 mt-4">
          {users.length} Benutzer registriert
        </p>
      </div>
    </div>
  );
}

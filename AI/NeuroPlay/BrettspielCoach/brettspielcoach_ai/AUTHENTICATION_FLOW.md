# NeuroPlay – Authentifizierungs- & Berechtigungsfluss

## 1. Anmeldung

**Ablauf in AuthScreen.jsx:**
1. Nutzer gibt E-Mail + Passwort ein
2. `pb.collection('users').authWithPassword(email, password)` wird aufgerufen
3. PocketBase bestätigt die Anmeldung und gibt `authData.record` zurück
4. Wichtig: Der Record enthält folgende Felder:
   - `id` – eindeutige Benutzer-ID
   - `email` – E-Mail-Adresse
   - **`verified`** – boolean Flag (true = Admin/Superuser)
5. Der Datensatz wird in localStorage gespeichert:
   - `neuroplay_user_id` → authData.record.id
   - `neuroplay_user_email` → authData.record.email
   - `neuroplay_auth_token` → authData.token
6. `onAuthSuccess(authData.record)` wird aufgerufen → setzt `currentUser` in App.jsx

---

## 2. Admin-Erkennung in App.jsx

**In der useEffect (Zeile 127-131):**
```javascript
useEffect(() => {
  const isCurrentUserAdmin = currentUser?.verified === true;
  setIsAdmin(isCurrentUserAdmin);
}, [currentUser?.id, currentUser?.verified]);
```

**Was passiert:**
- Prüft: Hat der currentUser das Feld `verified: true`?
- Wenn ja → `isAdmin` = true
- Wenn nein → `isAdmin` = false

---

## 3. Admin-Button sichtbar/unsichtbar in Navigation.jsx

**In Navigation.jsx (Zeile 46-53):**
```javascript
{isAdmin && (
  <button
    onClick={() => handleNavigation('admin')}
    className="hidden md:flex items-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 hover:text-white transition-colors text-sm"
  >
    <LayoutDashboard className="w-4 h-4" />
    Admin
  </button>
)}
```

**Was passiert:**
- Admin-Button wird nur gerendert, wenn `isAdmin === true`
- Klick navigiert zu screen='admin'

---

## 4. Admin-Panel-Zugriff in App.jsx

**In App.jsx (Zeile 213-230):**
```javascript
{screen === 'admin' && currentUser?.email === 'svenja@festerling.org' ? (
  <AdminPanel onBack={() => navigate('start')} currentUser={currentUser} />
) : screen === 'admin' ? (
  <div className="...">Zugriff verweigert</div>
) : null}
```

**Was passiert:**
- Prüft ZUSÄTZLICH: Ist die E-Mail exakt `svenja@festerling.org`?
- Nur wenn beide wahr sind → zeige AdminPanel
- Sonst → zeige "Zugriff verweigert"

---

## 5. Wo die verified-Flag gesteuert wird

**In PocketBase (Datenbank):**
- Die `users` Collection hat ein Feld `verified` (boolean)
- Nur wenn ein Benutzer dort mit `verified: true` markiert ist, wird er als Admin erkannt

**Beispiel:**
```
svenja@festerling.org:  verified: true  → Admin sichtbar
andere@email.com:       verified: false → kein Admin
```

---

## 6. Benutzerbasierte Daten (Sammlung, Favoriten)

**Speicherung in MyGamesScreen.jsx:**
- `neuroplay_my_collection_{userId}` – gespeicherte Spiele pro Nutzer
- `neuroplay_my_favorites_{userId}` – Favoriten pro Nutzer
- Werden auch in PocketBase `user_game_collection` gespeichert (wenn verfügbar)

**Prüfung beim Laden (MyGamesScreen.jsx, useEffect):**
- Lädt aus localStorage mit Nutzer-Kontext
- Falls Nutzer sich abmeldet und anderer anmeldet → andere Daten

---

## 7. Zusammenfassung für svenja@festerling.org

Wenn du dich mit svenja@festerling.org anmeldest:

1. **Anmeldung:**
   - PocketBase findet den Datensatz mit verified: true
   - AuthScreen speichert currentUser mit `verified: true`

2. **App.jsx erkennt Admin:**
   - `currentUser.verified === true` → `isAdmin = true`

3. **Navigation zeigt Admin-Button:**
   - `isAdmin && (...)` → Button wird gerendert
   - Klick → navigiere zu screen='admin'

4. **AdminPanel wird angezeigt:**
   - Zusätzliche Prüfung: `currentUser.email === 'svenja@festerling.org'` ✓
   - Zeige AdminPanel statt "Zugriff verweigert"

5. **Deine Spiele folgen dir:**
   - Beim Klick "Sammlung" wird `neuroplay_my_collection` mit deiner User-ID geladen
   - Wenn du andere Spiele hinzufügst, werden sie unter deiner ID gespeichert

---

## 8. Falls der Admin-Button nicht sichtbar ist

**Fehlersuche:**
1. Ist `currentUser.verified === true`? 
   - Prüfe in Browser DevTools: `localStorage.getItem('neuroplay_user_id')`
   - Oder in PocketBase: Klick auf dein Benutzerkonto → ist `verified: true` markiert?

2. Ist die E-Mail exakt `svenja@festerling.org`?
   - Achte auf Leerzeichen, Großbuchstaben, Tippfehler

3. Ist die Navigation neu gerendert?
   - Seite neu laden (F5)

---

## 9. Wie man andere zum Admin macht

**In der Benutzerverwaltung (Admin-Panel):**
1. Gehe zu Benutzer & Rollen
2. Suche den Benutzer (z.B. svenja.schriever@googlemail.com)
3. Klick auf "Admin-Button" oder ähnliches
4. Das System setzt `verified: true` in PocketBase
5. Nächste Anmeldung dieser Person → Admin-Button wird sichtbar

# NeuroPlay mit Datenbank – Setup-Anleitung

Deine App ist jetzt mit einer Live-Datenbank verbunden. So funktioniert es:

## Was wurde eingerichtet?

**Vier Datensammlungen (Collections):**
- **activities** – alle Aktivitäten (Häkeln, Brettspiele, etc.)
- **observations** – deine persönlichen Beobachtungen (privat)
- **favorites** – deine Favoriten (privat)
- **checkins** – deine Check-ins (privat)

Jede Sammlung speichert ihre Daten sicher. Persönliche Daten (observations, favorites, checkins) sind nur für dich sichtbar – Privacy by Default, wie im Standard gefordert.

## Wo sind die Daten?

Die Daten leben auf dem Server, unter der Haube der Anwendung. Wenn ein Benutzer bei dir angemeldet ist, sieht er nur seine eigenen Beobachtungen und Favoriten – das wird durch Zugriffregeln automatisch erzwungen.

## Wie verbinde ich die App damit?

Die App ist bereits teilweise vorbereitet:

### 1. **Benutzerverwaltung (Optional für MVP)**
Für Phase 1 kannst du noch mit Mock-Daten arbeiten. Wenn du echte Benutzer brauchst:

```javascript
// Benutzer registrieren
const user = await pb.collection('users').create({
  email: 'test@example.com',
  password: 'test123456',
  passwordConfirm: 'test123456',
  name: 'Test User'
});

// Einloggen
await pb.collection('users').authWithPassword('test@example.com', 'test123456');
```

### 2. **Aktivitäten laden**
Statt Mock-Daten aus der App, lade echte aus der Datenbank:

```javascript
import { useActivities } from '@/hooks/useActivities';

export function MeineSeite() {
  const { activities, loading } = useActivities();
  
  if (loading) return <p>Lädt...</p>;
  return <ActivityList activities={activities} />;
}
```

### 3. **Beobachtungen speichern**
Wenn jemand eine Aktivität durchgeführt hat:

```javascript
import { useObservations } from '@/hooks/useObservations';

export function ReflectionForm({ userId }) {
  const { addObservation } = useObservations(userId);
  
  const handleSave = async (e) => {
    await addObservation({
      activityId: 'haekeln',
      date: new Date().toISOString().split('T')[0],
      observation: 'angenehm und fokussierend',
      energy: 2,
      notes: 'Finger wurden müde'
    });
  };
  
  return <form onSubmit={handleSave}>...</form>;
}
```

## Nächste Schritte (in dieser Reihenfolge)

1. **Aktivitäten einfügen** – über Admin-Panel oder API direkt einige Aktivitäten speichern
   ```bash
   curl -X POST http://localhost/.sfs-bd/api/collections/activities/records \
     -H "Authorization: Bearer YOUR_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"id":"haekeln","name":"Häkeln","type":"kreativ",...}'
   ```

2. **Heute-Seite mit Datenbank verbinden** – statt Mock `MOCK_ACTIVITIES` auf `useActivities()` umstellen

3. **Entdecken-Seite mit Datenbank verbinden** – Filter funktionieren bereits, nur die Datenquelle wechseln

4. **Beobachtungen speichern** – wenn jemand auf Entwicklung eine Reflexion einträgt, sichert sie sich

5. **Favoriten-Toggle** – über die `useFavorites()` Hook mit der Datenbank synchronisieren

## Welche Fehler können auftreten?

**„401 Unauthorized"** – der Benutzer ist nicht angemeldet oder sein Token ist abgelaufen. Die `authRefresh()` in `src/lib/pb.js` kümmert sich darum.

**„403 Forbidden"** – der Benutzer versucht, auf Daten anderer Benutzer zuzugreifen. Das ist gewollt und wird automatisch blockiert.

**„404 Not Found"** – die Collection existiert nicht oder ist nicht richtig eingerichtet. Überprüfe die Collection-Namen.

## Admin-Panel

Um die Datenbank zu verwalten (neue Aktivitäten hinzufügen, Daten ansehen), öffne:
- **Entwicklung:** http://localhost/.sfs-bd/_/
- **Live:** https://deine-domain.de/.sfs-be/_/

Mit deinem Admin-Token kannst du alles verwalten.

---

**Fangen wir an – welche Seite möchtest du zuerst mit der Datenbank verbinden?**

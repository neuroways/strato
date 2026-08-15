# NeuroQuest – Abenteuerbegleiter für tägliche Lernaufgaben

Willkommen zu **NeuroQuest**! Eine moderne Webanwendung, die Grundschulkindern hilft, tägliche Lernaufgaben mit Freude und ohne Druck zu bearbeiten.

## 🚀 Die App live testen

Öffnen Sie die App in Ihrem Browser. Sie sehen sofort die Login-Seite.

### Demo-Konten:
- **Kind:** kid@demo.de / demo123
- **Lehrkraft:** teacher@demo.de / demo123

Klicken Sie auf eine Rolle und melden Sie sich an!

## 📚 Was NeuroQuest ist

NeuroQuest ist **kein Spiel**. NeuroQuest ist ein **Lernbegleiter**.

Jede Woche erlebt ein Kind eine fünftägige Geschichte:
- **Montag–Freitag:** 5 tägliche Missionen pro Tag
- **Geschichte:** Angepasst an die Klassenstufe (Klasse 1–4)
- **Begleiter:** Eine freundliche Figur (z.B. Luna, die Eule)
- **Belohnung:** Nur das Vorankommen der Geschichte – nicht Punkte oder Sterne

Beispiel: "Der geheimnisvolle Waldpfad"
- Ein Kind begleitet Luna die Eule in einen Wald
- Jeden Tag gibt es ein neues Geheimnis
- Die Geschichte endet mit einem schönen Ende am Freitag
- Nächste Woche: Neues Abenteuer

## ✨ Design-Philosophie

> "So spannend wie nötig. So ruhig wie möglich."

- Keine Zeitlimits
- Keine Ranglisten
- Keine Bestrafungen
- Keine flackernden Effekte
- Warme, natürliche Farben
- Kinderfreundliche Schrift

## 🏗️ Architektur

### Für Kinder
- **Einfache, ruhige Benutzeroberfläche**
- Geschichte + 5 Missionen pro Tag
- Selbstkontrolle (verpflichtend)
- Abenteuerbuch (Archiv)

### Für Lehrkräfte (Woche 2+)
- Wochen erstellen und verwalten
- Aufgaben und Hinweise schreiben
- Fortschritt überwachen
- Geschichten auswählen

### Für Eltern (Woche 2+)
- Fortschritt sehen
- Motivierende Nachrichten schreiben
- Zusätzliche Aufgaben erstellen

### Für Admins (Woche 3+)
- Benutzer verwalten
- Geschichten und Klassen verwalten
- Systemeinstellungen

## 🛠️ Tech Stack

- **React 18** – Modern, responsive UI
- **React Router v7** – Client-side routing
- **Tailwind CSS v4** – Rapid styling
- **PocketBase v0.39** – Backend + Database
- **Vite 6** – Lightning-fast builds
- **German language** – 100% Deutsch

## 📖 Dokumentation

- **[QUICKSTART.md](./QUICKSTART.md)** – Anfangen in 2 Minuten
- **[app/AGENTS.md](./app/AGENTS.md)** – Technische Referenz
- **[app/ARCHITECTURE.md](./app/ARCHITECTURE.md)** – Design & Erweiterbarkeit

## 🎯 Nächste Schritte

### Woche 2: Teacher & Parent Features
- Lehrkraft kann Wochen erstellen
- Lehrkraft kann Missionen definieren
- Eltern sehen Fortschritt
- Eltern schreiben Nachrichten

### Woche 3: Data Sync & Offline
- Fortschritt zu PocketBase migrieren
- Offline-Unterstützung
- Automatisches Synchronisieren

### Woche 4: Polish & Accessibility
- WCAG 2.1 AA Compliance
- Mobile Testing
- Performance Audit

## 💡 Was macht NeuroQuest besonders?

1. **Keine Konkurrenz zwischen Kindern** – Jedes Kind hat sein eigenes Abenteuer
2. **Keine Zeitlimits** – Kinder lernen in ihrem Tempo
3. **Keine Fehlerbestrafung** – Fehler sind Teil des Lernens
4. **Geschichten als Motor** – Die Geschichte macht die Aufgaben spannend
5. **Modular & erweiterbar** – Neue Geschichten, neue Aufgaben, neue Klassenstufen

## 🗂️ Projektstruktur

```
NeuroQuest/
├── app/                  # React + Vite application
│   ├── src/
│   │   ├── pages/        # Login, KidDashboard, Mission, AdventureBook, ...
│   │   ├── lib/          # Auth, Stories, Missions, PocketBase client
│   │   └── index.css     # Tailwind styles
│   ├── public/           # Favicon
│   ├── dist/             # Built output (production)
│   └── index.html        # Entry point
│
├── static/               # Served images & assets
│
├── QUICKSTART.md         # Quick reference
├── README.md             # This file
└── ...
```

## 🚀 Development

```bash
# Start dev server with live reload
cd app && npm run dev

# Build for production
npm run build:prod

# Preview production build
npm run preview
```

## 📊 Database

**7 PocketBase collections:**
- `children` (auth)
- `teachers` (auth)
- `parents` (auth)
- `admins` (auth)
- `weeks` (lesson plans)
- `missions` (tasks)
- `progress` (completion tracking)

All linked with relations. Demo users already created.

## 🎨 Customization

### Add a new story
Edit `src/lib/stories.ts` – add a new story with 4 grade adaptations.

### Add new missions
Edit `src/lib/missions.ts` – define tasks for each day.

### Change colors
Edit `tailwind.config.cjs` – customize theme colors.

### Add new role
Update `src/lib/auth.tsx` and `src/App.jsx`.

## 📱 Responsive Design

- **375px** (mobile) – Single column, touch-friendly
- **768px** (tablet) – Two columns where appropriate
- **1280px+** (desktop) – Full layout

All pages are tested and work perfectly on phones, tablets, and desktops.

## ♿ Accessibility

- [x] Semantic HTML
- [ ] WCAG 2.1 AA (in progress)
- [ ] Keyboard navigation
- [ ] Screen reader support

## 🔒 Security

- PocketBase handles authentication & password hashing
- JWT tokens managed automatically
- Role-based access control on every route
- Input validation via PocketBase

## 📝 License

Built with ❤️ for education.

---

**Ready to empower children's learning? Start with the [QUICKSTART.md](./QUICKSTART.md)!**

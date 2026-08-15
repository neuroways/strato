import { useState } from 'react';
import { ChevronRight, LogOut, Shield, FileText, Users, Settings } from 'lucide-react';

const MEHR_SECTIONS = [
  {
    id: 'household',
    label: 'Mein Haushalt',
    icon: Users,
    description: 'Gemeinsame Sammlung, Familienmitglieder',
    color: 'bg-petrol'
  },
  {
    id: 'groups',
    label: 'Meine Gruppen',
    icon: Users,
    description: 'Spieleabende, Teams, Workshops',
    color: 'bg-violet'
  },
  {
    id: 'sharing',
    label: 'Freigaben',
    icon: Shield,
    description: 'Kontrolliere, wer deine Daten sieht',
    color: 'bg-gold'
  },
  {
    id: 'data',
    label: 'Meine Daten',
    icon: FileText,
    description: 'Ansehen, exportieren, löschen',
    color: 'bg-deep-navy'
  },
  {
    id: 'settings',
    label: 'Einstellungen',
    icon: Settings,
    description: 'Sprache, Benachrichtigungen, Sichtbarkeit',
    color: 'bg-gold'
  }
];

const HELP_ITEMS = [
  { label: 'Hilfe & FAQ', description: 'Häufig gestellte Fragen' },
  { label: 'Datenschutz', description: 'Unsere Datenschutzrichtlinie' },
  { label: 'Impressum', description: 'Rechtliche Informationen' },
  { label: 'Kontakt', description: 'Fragen oder Feedback' }
];

export default function MehrPage() {
  const [selectedSection, setSelectedSection] = useState(null);
  const [expandedGroup, setExpandedGroup] = useState(null);

  if (selectedSection === 'sharing') {
    return (
      <SharingManager onBack={() => setSelectedSection(null)} />
    );
  }

  if (selectedSection === 'data') {
    return (
      <DataManager onBack={() => setSelectedSection(null)} />
    );
  }

  return (
    <div className="flex-1 md:flex-none pb-20 md:pb-0">
      <div className="max-w-2xl mx-auto p-4 md:p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-deep-navy mb-2">Mehr</h1>
          <p className="text-anthrazit">Haushalt, Gruppen, Datenschutz, Einstellungen</p>
        </div>

        {/* Main menu items */}
        <div className="space-y-2">
          {MEHR_SECTIONS.map(item => (
            <button
              key={item.id}
              onClick={() => setSelectedSection(item.id)}
              className="w-full neuroplay-card p-4 flex items-center gap-4 hover:shadow-md transition group"
            >
              <div className={`${item.color} text-white w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0`}>
                <item.icon size={20} />
              </div>
              <div className="flex-1 text-left">
                <p className="font-bold text-anthrazit group-hover:text-deep-navy transition">
                  {item.label}
                </p>
                <p className="text-xs text-gray-500 mt-1">{item.description}</p>
              </div>
              <ChevronRight className="text-gold group-hover:translate-x-1 transition-transform" size={20} />
            </button>
          ))}
        </div>

        {/* Help & Legal section */}
        <div className="border-t border-border-light pt-6 space-y-2">
          <p className="font-bold text-anthrazit text-sm px-2">Hilfe & Rechtliches</p>
          {HELP_ITEMS.map((item, i) => (
            <button
              key={i}
              className="w-full p-3 flex items-center justify-between hover:bg-light-gray transition rounded-lg text-left"
            >
              <div>
                <p className="font-medium text-anthrazit">{item.label}</p>
                <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
              </div>
              <ChevronRight size={18} className="text-gold flex-shrink-0" />
            </button>
          ))}
        </div>

        {/* Logout button */}
        <div className="border-t border-border-light pt-6">
          <button className="w-full flex items-center justify-center gap-2 py-3 text-red-600 font-medium hover:bg-red-50 rounded-lg transition">
            <LogOut size={18} />
            Abmelden
          </button>
        </div>

        {/* Version info */}
        <div className="text-center text-xs text-gray-500 pb-4">
          <p>NeuroPlay v0.1.0 · MVP Phase 1</p>
        </div>
      </div>
    </div>
  );
}

function SharingManager({ onBack }) {
  const [sharings, setSharings] = useState([
    {
      id: 1,
      name: 'Partner',
      access: 'Beobachtungen & Lernstand',
      since: 'seit 3 Monaten',
      type: 'household'
    },
    {
      id: 2,
      name: 'Spielegruppe (Freitags)',
      access: 'Favoriten & Katalog (schreibgeschützt)',
      since: 'seit 1 Monat',
      type: 'group'
    }
  ]);

  return (
    <div className="flex-1 md:flex-none pb-20 md:pb-0">
      <div className="max-w-2xl mx-auto p-4 md:p-6 space-y-6">
        {/* Header */}
        <button
          onClick={onBack}
          className="text-petrol hover:text-deep-navy transition font-medium flex items-center gap-1 text-sm"
        >
          ← Zurück
        </button>

        <div>
          <h1 className="text-3xl font-bold text-deep-navy mb-2">Freigaben</h1>
          <p className="text-anthrazit">Kontrolliere, wer deine Daten sehen und ändern darf</p>
        </div>

        {/* Active sharings */}
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-deep-navy">Aktive Freigaben</h2>
          {sharings.length === 0 ? (
            <div className="neuroplay-card p-6 text-center">
              <p className="text-anthrazit font-medium">Noch keine Freigaben</p>
            </div>
          ) : (
            sharings.map(sharing => (
              <div key={sharing.id} className="neuroplay-card p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-bold text-anthrazit">{sharing.name}</p>
                    <p className="text-xs text-gray-500">{sharing.since}</p>
                  </div>
                  <button className="text-red-600 text-xs font-medium hover:text-red-800 transition">
                    Widerrufen
                  </button>
                </div>
                <div className="text-sm text-gray-600">
                  <p className="font-medium">Zugriff:</p>
                  <p className="text-gray-600">{sharing.access}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Privacy principles */}
        <div className="neuroplay-explanation">
          <p className="font-medium text-anthrazit mb-2">Privacy by Default</p>
          <p className="text-anthrazit text-sm leading-relaxed">
            Deine persönlichen Daten sind standardmäßig privat. Freigaben sind freiwillig, zweckgebunden und jederzeit widerrufbar. Keine automatischen Freigaben durch Haushaltszugehörigkeit.
          </p>
        </div>
      </div>
    </div>
  );
}

function DataManager({ onBack }) {
  return (
    <div className="flex-1 md:flex-none pb-20 md:pb-0">
      <div className="max-w-2xl mx-auto p-4 md:p-6 space-y-6">
        {/* Header */}
        <button
          onClick={onBack}
          className="text-petrol hover:text-deep-navy transition font-medium flex items-center gap-1 text-sm"
        >
          ← Zurück
        </button>

        <div>
          <h1 className="text-3xl font-bold text-deep-navy mb-2">Meine Daten</h1>
          <p className="text-anthrazit">Deine Rechte bezüglich deiner persönlichen Daten</p>
        </div>

        {/* Data actions */}
        <div className="space-y-3">
          <button className="w-full neuroplay-card p-4 text-left hover:shadow-md transition">
            <p className="font-bold text-anthrazit">Daten ansehen</p>
            <p className="text-xs text-gray-500 mt-1">Alle deine gespeicherten Informationen herunterladen</p>
          </button>

          <button className="w-full neuroplay-card p-4 text-left hover:shadow-md transition">
            <p className="font-bold text-anthrazit">Daten exportieren</p>
            <p className="text-xs text-gray-500 mt-1">Deine Daten im Format JSON/CSV herunterladen</p>
          </button>

          <button className="w-full neuroplay-card p-4 text-left hover:shadow-md transition border border-red-200">
            <p className="font-bold text-red-600">Konto löschen</p>
            <p className="text-xs text-gray-500 mt-1">Dein Konto und alle zugehörigen Daten dauerhaft löschen</p>
          </button>
        </div>

        {/* Data retention */}
        <div className="neuroplay-explanation">
          <p className="font-medium text-anthrazit mb-2">Datenaufbewahrung</p>
          <p className="text-anthrazit text-sm">
            Deine Beobachtungen und Reflexionen werden so lange gespeichert, wie du das möchtest. Nach Löschung bleiben anonymisierte, zusammengefasste Muster für Forschungszwecke.
          </p>
        </div>
      </div>
    </div>
  );
}

import { BookOpen, Plus, AlertCircle } from "lucide-react";

export default function Documentation() {
  return (
    <div className="min-h-screen py-12 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Dokumentation
          </h1>
          <p className="text-lg text-gray-400">
            Verwaltung und Bearbeitung der Studio-Dokumentation
          </p>
        </div>

        {/* Feature Coming Soon */}
        <div className="bg-gradient-to-br from-blue-950/30 to-blue-900/20 border border-blue-800/50 rounded-lg p-8 mb-8">
          <div className="flex items-start gap-4">
            <AlertCircle className="text-blue-400 flex-shrink-0 mt-1" size={24} />
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Dokumentation noch in Arbeit</h3>
              <p className="text-gray-400">
                Die Dokumentationsverwaltung wird in Kürze aktiviert. Sie können dann:
              </p>
              <ul className="mt-4 space-y-2 text-gray-300">
                <li className="flex items-center gap-2">
                  <span className="text-blue-400">✓</span> Neue Geräte hinzufügen
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-400">✓</span> Verbindungen bearbeiten
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-400">✓</span> Kabel dokumentieren
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-400">✓</span> Fehler-Lösungen hinzufügen
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-400">✓</span> Änderungen speichern
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Documentation Structure */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-gray-800/40 border border-gray-700 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                <BookOpen className="text-white" size={20} />
              </div>
              <h3 className="text-lg font-bold text-white">Geräte</h3>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Verwalte alle Studio-Geräte: Spezifikationen, Einstellungen, Firmware und Presets.
            </p>
            <div className="space-y-2 text-sm text-gray-300">
              <p>• Geräteinformationen</p>
              <p>• Technische Spezifikationen</p>
              <p>• Firmware-Versionen</p>
              <p>• Handbuch-Links</p>
            </div>
          </div>

          <div className="bg-gray-800/40 border border-gray-700 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                <BookOpen className="text-white" size={20} />
              </div>
              <h3 className="text-lg font-bold text-white">Verbindungen</h3>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Dokumentiere alle Signalwege und physischen Verbindungen zwischen Geräten.
            </p>
            <div className="space-y-2 text-sm text-gray-300">
              <p>• Signaltyp (Audio/MIDI/USB)</p>
              <p>• Kabel-Spezifikationen</p>
              <p>• Routing-Informationen</p>
              <p>• Notizen und Besonderheiten</p>
            </div>
          </div>

          <div className="bg-gray-800/40 border border-gray-700 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-lg flex items-center justify-center">
                <BookOpen className="text-white" size={20} />
              </div>
              <h3 className="text-lg font-bold text-white">Kabel</h3>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Verzeichnis aller Kabel mit Spezifikationen und Zustand.
            </p>
            <div className="space-y-2 text-sm text-gray-300">
              <p>• Kabeltyp und Subtyp</p>
              <p>• Länge und Farbe</p>
              <p>• Stecker und Anschlüsse</p>
              <p>• Status und Notizen</p>
            </div>
          </div>

          <div className="bg-gray-800/40 border border-gray-700 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                <BookOpen className="text-white" size={20} />
              </div>
              <h3 className="text-lg font-bold text-white">Fehler & Lösungen</h3>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Sammel häufige Probleme und deren Lösungsschritte.
            </p>
            <div className="space-y-2 text-sm text-gray-300">
              <p>• Symptome und Ursachen</p>
              <p>• Lösungsschritte</p>
              <p>• Betroffene Geräte</p>
              <p>• Häufigkeit und Schweregrad</p>
            </div>
          </div>
        </div>

        {/* Data Model Info */}
        <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 border border-gray-700 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Datensicherung & Synchronisation</h2>
          <div className="space-y-4 text-gray-300">
            <p>
              Alle Dokumentationsdaten werden automatisch gespeichert und können später 
              mit einer echten Datenbank synchronisiert werden.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-700">
              <div>
                <h3 className="text-white font-semibold mb-2">Derzeitig (lokal)</h3>
                <ul className="space-y-1 text-sm">
                  <li>✓ JSON-Dateiformat</li>
                  <li>✓ Browser-Speicher</li>
                  <li>✓ Automatische Synchronisation</li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">Bald verfügbar</h3>
                <ul className="space-y-1 text-sm">
                  <li>→ Datenbank-Integration</li>
                  <li>→ Benutzer-Authentifizierung</li>
                  <li>→ Versionskontrolle</li>
                  <li>→ Echtzeit-Kollaboration</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

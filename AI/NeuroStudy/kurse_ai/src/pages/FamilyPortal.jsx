import { useState } from 'react';
import { Plus, Calendar, MapPin, Users, Clock, AlertCircle, CheckCircle, XCircle, Download, Eye } from 'lucide-react';

// Mock-Daten
const mockFamily = {
  accountId: 'FAM-2026-001',
  name: 'Familie Müller',
  members: [
    { id: 1, name: 'Maria Müller', role: 'adult', birthDate: '15.03.1985' },
    { id: 2, name: 'Peter Müller', role: 'adult', birthDate: '22.07.1982' },
    { id: 3, name: 'Eva Müller', role: 'child', birthDate: '10.05.2015', age: 11 },
    { id: 4, name: 'Tom Müller', role: 'child', birthDate: '03.09.2017', age: 8 },
  ]
};

const mockEnrollments = [
  {
    id: 1,
    enrollmentId: 'ANM-2026-0847',
    courseName: 'Aquarellmalen für Anfänger',
    courseStart: '15.09.2026',
    courseEnd: '06.10.2026',
    time: 'Montag, 15:00-16:30 Uhr',
    location: 'Kunststudio A3',
    capacity: '9/10 Plätze',
    status: 'confirmed',
    participants: ['Eva Müller', 'Tom Müller (8 J.)'],
    enrollmentDate: '02.09.2026 14:23 Uhr',
    fee: '45,00 €',
    paymentStatus: 'paid',
    cancellationDeadline: '08.09.2026 23:59 Uhr',
    canCancel: true,
    timeline: [
      { event: 'Anmeldung erfolgreich', date: '02.09.2026 14:23', status: 'done' },
      { event: 'Angebot angenommen', date: '02.09.2026 14:30', status: 'done' },
      { event: 'Platz bestätigt', date: '02.09.2026 15:15', status: 'done' },
      { event: 'Zahlung erhalten', date: '03.09.2026 09:45', status: 'done' },
    ]
  },
  {
    id: 2,
    enrollmentId: 'ANM-2026-0925',
    courseName: 'Yoga am Morgen',
    courseStart: '08.09.2026',
    courseEnd: '13.10.2026',
    time: 'Montag & Mittwoch, 08:00-09:00 Uhr',
    location: 'Yoga-Raum B1',
    capacity: '10/12 Plätze',
    status: 'waitlist',
    participants: ['Maria Müller'],
    enrollmentDate: '03.09.2026 10:45 Uhr',
    fee: '60,00 €',
    paymentStatus: 'none',
    cancellationDeadline: '—',
    timeline: [
      { event: 'Anmeldung erfolgreich', date: '03.09.2026 10:45', status: 'done' },
      { event: 'Auf Warteliste (Platz 1)', date: '03.09.2026 10:46', status: 'active' },
    ]
  },
  {
    id: 3,
    enrollmentId: 'ANM-2026-0756',
    courseName: 'Gitarre Grundlagen',
    courseStart: '10.10.2026',
    courseEnd: '05.11.2026',
    time: 'Freitag, 19:00-20:00 Uhr',
    location: 'Musik-Studio M2',
    capacity: '—',
    status: 'pending',
    participants: ['Peter Müller'],
    enrollmentDate: '01.09.2026 19:15 Uhr',
    fee: '50,00 €',
    paymentStatus: 'none',
    cancellationDeadline: '—',
    timeline: [
      { event: 'Anmeldung erfolgreich', date: '01.09.2026 19:15', status: 'done' },
      { event: 'Platzangebot erhalten', date: '04.09.2026 08:30', status: 'active' },
      { event: 'Warte auf Bestätigung...', date: '—', status: 'pending' },
    ]
  },
];

const mockAvailableCourses = [
  { id: 1, name: 'Keramik für Anfänger', start: '17.09.2026', capacity: 'Plätze verfügbar', minAge: 8, maxAge: 99 },
  { id: 2, name: 'Englisch Konversation', start: '09.09.2026', capacity: 'Auf Warteliste', minAge: 16, maxAge: 99 },
  { id: 3, name: 'Familien-Workshop Kochen', start: '21.09.2026', capacity: 'Plätze verfügbar', minAge: 6, maxAge: 99 },
];

function EnrollmentCard({ enrollment }) {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'confirmed':
        return <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full"><CheckCircle className="w-3 h-3" /> Bestätigt</span>;
      case 'waitlist':
        return <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full"><Clock className="w-3 h-3" /> Warteliste</span>;
      case 'pending':
        return <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full"><Clock className="w-3 h-3" /> Angebot ausstehend</span>;
      case 'cancelled':
        return <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded-full"><XCircle className="w-3 h-3" /> Abgesagt</span>;
      default:
        return null;
    }
  };

  const getStatusDescription = (status) => {
    switch (status) {
      case 'confirmed':
        return 'Dein Platz ist sicher. Zahlung steht aus.' || 'Zahlung erfolgreich. Du bist angemeldet!';
      case 'waitlist':
        return 'Du bist auf der Warteliste. Wir benachrichtigen dich, wenn ein Platz frei wird.';
      case 'pending':
        return 'Du hast ein Platzangebot erhalten. Bitte bestätige es innerhalb von 48 Stunden.';
      case 'cancelled':
        return 'Dieser Kurs wurde leider abgesagt.';
      default:
        return '';
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900">{enrollment.courseName}</h3>
          <p className="text-sm text-slate-600 mt-1 font-mono">#{enrollment.enrollmentId}</p>
        </div>
        {getStatusBadge(enrollment.status)}
      </div>

      {/* Kursinformationen */}
      <div className="mb-4 space-y-2 text-sm">
        <div className="flex items-center gap-2 text-slate-700">
          <Calendar className="w-4 h-4 text-slate-400" />
          <span>{enrollment.courseStart} – {enrollment.courseEnd}</span>
        </div>
        <div className="flex items-center gap-2 text-slate-700">
          <Clock className="w-4 h-4 text-slate-400" />
          <span>{enrollment.time}</span>
        </div>
        <div className="flex items-center gap-2 text-slate-700">
          <MapPin className="w-4 h-4 text-slate-400" />
          <span>{enrollment.location}</span>
        </div>
        <div className="flex items-center gap-2 text-slate-700">
          <Users className="w-4 h-4 text-slate-400" />
          <span>{enrollment.participants.join(', ')}</span>
        </div>
      </div>

      {/* Statusmeldung */}
      <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded">
        <p className="text-xs font-medium text-blue-900">{getStatusDescription(enrollment.status)}</p>
      </div>

      {/* Wichtige Fristen */}
      {enrollment.status === 'pending' && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded">
          <p className="text-xs font-semibold text-red-900 flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            Angebotsfrist: 06.09.2026 08:30 Uhr (in 2 Tagen)
          </p>
        </div>
      )}

      {enrollment.status === 'confirmed' && enrollment.canCancel && (
        <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded">
          <p className="text-xs font-medium text-amber-900">
            <AlertCircle className="inline mr-2 w-4 h-4" />
            Kostenlose Absage möglich bis <span className="font-semibold">{enrollment.cancellationDeadline}</span>
          </p>
        </div>
      )}

      {/* Zahlung & Gebühr */}
      <div className="mb-4 grid grid-cols-2 gap-4 p-3 bg-slate-50 rounded">
        <div>
          <p className="text-xs text-slate-600 font-semibold">Gebühr</p>
          <p className="text-sm font-bold text-slate-900 mt-1">{enrollment.fee}</p>
        </div>
        <div>
          <p className="text-xs text-slate-600 font-semibold">Zahlungsstatus</p>
          <p className={`text-sm font-bold mt-1 ${
            enrollment.paymentStatus === 'paid' ? 'text-green-600' :
            enrollment.paymentStatus === 'pending' ? 'text-amber-600' :
            'text-slate-600'
          }`}>
            {enrollment.paymentStatus === 'paid' ? '✓ Bezahlt' :
             enrollment.paymentStatus === 'pending' ? 'Ausstehend' :
             'Keine Zahlung erforderlich'}
          </p>
        </div>
      </div>

      {/* Timeline */}
      <div className="mb-4 border-t pt-4">
        <p className="text-xs font-semibold text-slate-600 mb-3">ZEITSTEMPEL & BESTÄTIGUNGEN</p>
        <div className="space-y-2">
          {enrollment.timeline.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 text-xs">
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                item.status === 'done' ? 'bg-green-500 border-green-500' :
                item.status === 'active' ? 'bg-blue-500 border-blue-500' :
                'border-slate-300 bg-white'
              }`}>
                {item.status === 'done' && <span className="text-white text-xs">✓</span>}
              </div>
              <div className="flex-1">
                <p className="font-medium text-slate-900">{item.event}</p>
                {item.date && <p className="text-slate-500">{item.date}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 flex-wrap">
        {enrollment.status === 'pending' && (
          <>
            <button className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded transition-colors">
              Platz annehmen
            </button>
            <button className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 text-sm font-medium rounded transition-colors">
              Ablehnen
            </button>
          </>
        )}
        {enrollment.status === 'confirmed' && enrollment.canCancel && (
          <button className="flex-1 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 text-sm font-medium rounded transition-colors">
            Kostenlos absagen
          </button>
        )}
        {enrollment.status === 'confirmed' && !enrollment.canCancel && (
          <button className="flex-1 px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 text-sm font-medium rounded transition-colors">
            Absageanfrage stellen
          </button>
        )}
        {enrollment.status === 'waitlist' && (
          <button className="flex-1 px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 text-sm font-medium rounded transition-colors">
            Von Warteliste abmelden
          </button>
        )}
        <button className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 text-sm font-medium rounded transition-colors flex items-center gap-2">
          <Download className="w-4 h-4" /> PDF
        </button>
      </div>
    </div>
  );
}

export default function FamilyPortal() {
  const [showAvailable, setShowAvailable] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  const pendingEnrollments = mockEnrollments.filter(e => e.status === 'pending').length;
  const confirmedEnrollments = mockEnrollments.filter(e => e.status === 'confirmed').length;

  return (
    <div className="space-y-8">
      {/* Header mit Familieninfo */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">{mockFamily.name}</h2>
            <p className="text-sm text-slate-600 mt-1 font-mono">Kundennummer: {mockFamily.accountId}</p>
            <p className="text-sm text-slate-600 mt-2">
              {mockFamily.members.length} Familienmitglieder registriert
            </p>
          </div>
          <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" /> Neue Anmeldung
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <p className="text-xs text-slate-600 font-semibold mb-2">ANGEBOT AUSSTEHEND</p>
          <p className="text-3xl font-bold text-red-600">{pendingEnrollments}</p>
          <p className="text-xs text-red-600 font-medium mt-2">Aktion erforderlich</p>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <p className="text-xs text-slate-600 font-semibold mb-2">BESTÄTIGTE ANMELDUNGEN</p>
          <p className="text-3xl font-bold text-green-600">{confirmedEnrollments}</p>
          <p className="text-xs text-slate-600 mt-2">Plätze gesichert</p>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <p className="text-xs text-slate-600 font-semibold mb-2">ZAHLBAR</p>
          <p className="text-3xl font-bold text-slate-900">105,00 €</p>
          <p className="text-xs text-slate-600 mt-2">Ausstehende Gebühren</p>
        </div>
      </div>

      {/* Familienmitglieder */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Familienmitglieder</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {mockFamily.members.map(member => (
            <button
              key={member.id}
              onClick={() => setSelectedMember(member)}
              className={`p-4 rounded-lg border-2 text-left transition-all ${
                selectedMember?.id === member.id
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-slate-200 hover:border-purple-300'
              }`}
            >
              <p className="font-semibold text-slate-900">{member.name}</p>
              <p className="text-xs text-slate-600 mt-1">
                {member.role === 'adult' ? 'Erwachsen' : `Kind (${member.age} Jahre)`}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Anmeldungsübersicht */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-900">Meine Anmeldungen</h3>
          <button
            onClick={() => setShowAvailable(!showAvailable)}
            className="text-sm text-purple-600 hover:text-purple-700 font-medium"
          >
            {showAvailable ? '← Zurück zu Anmeldungen' : 'Weitere Kurse →'}
          </button>
        </div>

        {!showAvailable ? (
          <div className="grid grid-cols-1 gap-6">
            {mockEnrollments.map(enrollment => (
              <EnrollmentCard key={enrollment.id} enrollment={enrollment} />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {mockAvailableCourses.map(course => (
              <div key={course.id} className="bg-white border border-slate-200 rounded-lg p-4 flex items-start justify-between hover:shadow-md transition-shadow">
                <div>
                  <h4 className="font-semibold text-slate-900">{course.name}</h4>
                  <p className="text-xs text-slate-600 mt-1">
                    📅 {course.start} • Alter: {course.minAge}–{course.maxAge}
                  </p>
                  <p className={`text-xs font-semibold mt-2 ${
                    course.capacity === 'Plätze verfügbar' ? 'text-green-600' : 'text-amber-600'
                  }`}>
                    {course.capacity}
                  </p>
                </div>
                <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded transition-colors flex-shrink-0">
                  Anmelden
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Datenschutz & Kontakt */}
      <div className="bg-slate-50 rounded-lg border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-3">Einstellungen & Hilfe</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-3 rounded-lg border border-slate-200 hover:bg-white transition-colors text-left">
            <p className="text-sm font-semibold text-slate-900">Datenschutzoptionen</p>
            <p className="text-xs text-slate-600 mt-1">Verwalte deine Datenfreigaben</p>
          </button>
          <button className="p-3 rounded-lg border border-slate-200 hover:bg-white transition-colors text-left">
            <p className="text-sm font-semibold text-slate-900">Kontaktdaten</p>
            <p className="text-xs text-slate-600 mt-1">E-Mail, Telefon, Adresse</p>
          </button>
          <button className="p-3 rounded-lg border border-slate-200 hover:bg-white transition-colors text-left">
            <p className="text-sm font-semibold text-slate-900">Hilfe & Kontakt</p>
            <p className="text-xs text-slate-600 mt-1">Support und FAQ</p>
          </button>
        </div>
      </div>
    </div>
  );
}
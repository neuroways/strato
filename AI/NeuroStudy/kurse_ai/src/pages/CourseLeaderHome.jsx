import { useState } from 'react';
import { TrendingDown, Users, AlertCircle, Eye, Edit, FileText, CheckCircle, Clock, XCircle } from 'lucide-react';

// Mock-Daten
const mockCourses = [
  {
    id: 1,
    name: 'Aquarellmalen für Anfänger',
    status: 'confirmed',
    startDate: '15.09.2026',
    location: 'Raum A3',
    enrolled: 9,
    capacity: 10,
    waitlist: 2,
    lastUpdate: 'vor 2 Stunden',
    changes: [
      { type: 'enrollment', person: 'Eva Müller, Tom Müller (8 J.)', time: 'vor 2 Stunden' },
      { type: 'waitlist', person: 'Anna Fischer', time: 'vor 1 Stunde' },
    ]
  },
  {
    id: 2,
    name: 'Gitarre Grundlagen',
    status: 'pending-approval',
    startDate: '10.10.2026',
    location: 'Musik-Studio',
    enrolled: 0,
    capacity: 8,
    waitlist: 0,
    lastUpdate: 'vor 3 Tagen',
    submittedDate: '30.08.2026'
  },
  {
    id: 3,
    name: 'Yoga am Morgen',
    status: 'confirmed',
    startDate: '08.09.2026',
    location: 'Yoga-Raum',
    enrolled: 10,
    capacity: 12,
    waitlist: 0,
    lastUpdate: 'vor 8 Stunden',
    changes: [
      { type: 'enrollment', person: 'Christian Bauer', time: 'vor 8 Stunden' },
    ]
  },
];

const mockProposal = {
  id: 1,
  title: 'Keramik Fortgeschrittene',
  status: 'in-review',
  submittedDate: '25.08.2026',
  adminNotes: 'Kapazität angepasst von 8 auf 12 Plätze',
  nextStep: 'Redaktionelle Anpassung erwartet',
  timeline: [
    { step: 'Eingereicht', date: '25.08.2026', status: 'done' },
    { step: 'In Prüfung', date: '—', status: 'active' },
    { step: 'In Redaktion', date: '—', status: 'pending' },
    { step: 'Genehmigt', date: '—', status: 'pending' },
  ]
};

function CourseCard({ course }) {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'confirmed':
        return <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full"><CheckCircle className="w-3 h-3" /> Genehmigt</span>;
      case 'pending-approval':
        return <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full"><Clock className="w-3 h-3" /> Ausstehend</span>;
      case 'cancelled':
        return <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded-full"><XCircle className="w-3 h-3" /> Abgesagt</span>;
      default:
        return null;
    }
  };

  const percentFull = Math.round((course.enrolled / course.capacity) * 100);

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900">{course.name}</h3>
          <div className="flex items-center gap-2 mt-2 text-xs text-slate-600">
            <span>📍 {course.location}</span>
            <span>📅 {course.startDate}</span>
          </div>
        </div>
        {getStatusBadge(course.status)}
      </div>

      {/* Belegungsfortschritt */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-slate-600">Belegung</span>
          <span className="text-sm font-bold text-slate-900">{course.enrolled}/{course.capacity}</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2">
          <div
            className="h-2 rounded-full bg-gradient-to-r from-green-400 to-green-600 transition-all"
            style={{ width: `${percentFull}%` }}
          ></div>
        </div>
      </div>

      {/* Warteliste Hinweis */}
      {course.waitlist > 0 && (
        <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded">
          <p className="text-xs font-medium text-amber-900">
            <AlertCircle className="inline mr-2 w-4 h-4" />
            {course.waitlist} Personen auf Warteliste
          </p>
        </div>
      )}

      {/* Letzte Änderungen */}
      {course.changes && course.changes.length > 0 && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded">
          <p className="text-xs font-semibold text-blue-900 mb-2">Kürzliche Änderungen:</p>
          {course.changes.map((change, idx) => (
            <p key={idx} className="text-xs text-blue-800 mb-1">
              <span className="font-medium">{change.person}</span> — {change.time}
            </p>
          ))}
        </div>
      )}

      {/* Aktualisierungszeit */}
      <p className="text-xs text-slate-500 mb-4">Zuletzt aktualisiert: {course.lastUpdate}</p>

      {/* Actions */}
      <div className="flex gap-2">
        <button className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded transition-colors flex items-center justify-center gap-2">
          <Eye className="w-4 h-4" /> Anmeldungen
        </button>
        <button className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 text-sm font-medium rounded transition-colors">
          Kontakt Admin
        </button>
      </div>
    </div>
  );
}

function ProposalCard({ proposal }) {
  const statusColors = {
    draft: 'bg-slate-100 text-slate-800',
    submitted: 'bg-blue-100 text-blue-800',
    'in-review': 'bg-yellow-100 text-yellow-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
  };

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900">{proposal.title}</h3>
          <p className="text-xs text-slate-600 mt-1">eingereicht am {proposal.submittedDate}</p>
        </div>
        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${statusColors[proposal.status]}`}>
          {proposal.status === 'in-review' ? 'In Prüfung' : 'Status'}
        </span>
      </div>

      {/* Admin-Notizen */}
      {proposal.adminNotes && (
        <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded">
          <p className="text-xs font-semibold text-amber-900 mb-1">Admin-Notiz:</p>
          <p className="text-xs text-amber-900">{proposal.adminNotes}</p>
        </div>
      )}

      {/* Nächster Schritt */}
      <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded">
        <p className="text-xs font-semibold text-blue-900">Nächster Schritt:</p>
        <p className="text-sm text-blue-900 mt-1">{proposal.nextStep}</p>
      </div>

      {/* Timeline */}
      <div className="mb-4 space-y-2">
        {proposal.timeline.map((item, idx) => (
          <div key={idx} className="flex items-center gap-3 text-xs">
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
              item.status === 'done' ? 'bg-green-500 border-green-500' :
              item.status === 'active' ? 'bg-blue-500 border-blue-500' :
              'border-slate-300 bg-white'
            }`}>
              {item.status === 'done' && <span className="text-white text-xs">✓</span>}
            </div>
            <div className="flex-1">
              <p className="font-medium text-slate-900">{item.step}</p>
              <p className="text-slate-500">{item.date}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded transition-colors flex items-center justify-center gap-2">
          <Edit className="w-4 h-4" /> Bearbeiten
        </button>
        <button className="flex-1 px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 text-sm font-medium rounded transition-colors flex items-center justify-center gap-2">
          <FileText className="w-4 h-4" /> Details
        </button>
      </div>
    </div>
  );
}

export default function CourseLeaderHome() {
  const [activeTab, setActiveTab] = useState('courses');

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Meine Kurse</h2>
        <p className="text-slate-600">Live-Status, Änderungen und Genehmigungsstatus</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200 flex gap-8">
        <button
          onClick={() => setActiveTab('courses')}
          className={`px-4 py-3 font-medium border-b-2 transition-colors ${
            activeTab === 'courses'
              ? 'border-green-500 text-green-600'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          Bestätigte Kurse
        </button>
        <button
          onClick={() => setActiveTab('proposals')}
          className={`px-4 py-3 font-medium border-b-2 transition-colors ${
            activeTab === 'proposals'
              ? 'border-green-500 text-green-600'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          Kursvorschläge
        </button>
      </div>

      {/* Bestätigte Kurse */}
      {activeTab === 'courses' && (
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-lg p-4">
            <p className="text-sm font-medium text-slate-600">
              📊 {mockCourses.filter(c => c.status === 'confirmed').length} genehmigt
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockCourses.filter(c => c.status === 'confirmed').map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      )}

      {/* Kursvorschläge */}
      {activeTab === 'proposals' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-600">
              📋 In Bearbeitung: {mockCourses.filter(c => c.status === 'pending-approval').length}
            </p>
            <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded transition-colors">
              Neuer Vorschlag
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockCourses.filter(c => c.status === 'pending-approval').map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
            <ProposalCard proposal={mockProposal} />
          </div>
        </div>
      )}

      {/* Tipps und Hilfe */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-3">💡 Schnellhilfe</h3>
        <ul className="space-y-2 text-sm text-slate-700">
          <li>✓ Die Belegung aktualisiert sich automatisch, wenn sich Anmeldungen ändern</li>
          <li>✓ Kurzfristige Absagen (Warteliste) werden sofort angezeigt</li>
          <li>✓ Kontaktiere die Administration bei Fragen zur Kapazität oder zum Status</li>
        </ul>
      </div>
    </div>
  );
}
import { useState } from 'react';
import { AlertCircle, CheckSquare, Clock, Users, Plus, Filter, Search, ChevronRight, Eye } from 'lucide-react';

// Mock-Daten für Demo
const mockTasks = [
  { id: 1, type: 'new-enrollment', course: 'Aquarellmalen für Anfänger', people: ['Eva Müller', 'Tom Müller (8 J.)'], status: 'unread', time: 'vor 2 Stunden', priority: 'normal' },
  { id: 2, type: 'cancellation-request', course: 'Gitarre Grundlagen', person: 'Karl Schmidt', reason: 'Zeitkonflikt', status: 'unread', time: 'vor 45 Min.', priority: 'high' },
  { id: 3, type: 'free-spot', course: 'Yoga am Morgen', spots: 2, status: 'open', time: 'vor 30 Min.', priority: 'critical' },
  { id: 4, type: 'waiting-list', course: 'Nähen Kompakt', count: 3, status: 'pending', time: 'vor 1 Stunde', priority: 'normal' },
];

const mockCourses = [
  { id: 1, name: 'Aquarellmalen für Anfänger', capacity: 10, enrolled: 9, waitlist: 2, status: 'active', minParticipants: 5, cancellationDeadline: '5 Tage' },
  { id: 2, name: 'Gitarre Grundlagen', capacity: 8, enrolled: 8, waitlist: 1, status: 'full', minParticipants: 4, cancellationDeadline: '3 Tage' },
  { id: 3, name: 'Yoga am Morgen', capacity: 12, enrolled: 10, waitlist: 0, status: 'active', minParticipants: 6, cancellationDeadline: '7 Tage' },
  { id: 4, name: 'Töpfern Workshop', capacity: 6, enrolled: 3, waitlist: 0, status: 'active', minParticipants: 4, cancellationDeadline: '1 Tag' },
];

function TaskCard({ task }) {
  const typeConfig = {
    'new-enrollment': { icon: Plus, label: 'Neue Anmeldung', bgColor: 'bg-blue-50', borderColor: 'border-blue-200' },
    'cancellation-request': { icon: AlertCircle, label: 'Absageanfrage', bgColor: 'bg-red-50', borderColor: 'border-red-200' },
    'free-spot': { icon: CheckSquare, label: 'Freier Platz', bgColor: 'bg-green-50', borderColor: 'border-green-200' },
    'waiting-list': { icon: Clock, label: 'Warteliste voll', bgColor: 'bg-yellow-50', borderColor: 'border-yellow-200' },
  };

  const config = typeConfig[task.type] || {};
  const Icon = config.icon;

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'critical': return <span className="inline-block px-2 py-1 text-xs font-semibold rounded bg-red-200 text-red-900">KRITISCH</span>;
      case 'high': return <span className="inline-block px-2 py-1 text-xs font-semibold rounded bg-orange-200 text-orange-900">WICHTIG</span>;
      default: return null;
    }
  };

  return (
    <div className={`border-l-4 ${config.borderColor} ${config.bgColor} rounded-lg p-4 mb-3 hover:shadow-md transition-shadow`}>
      <div className="flex items-start gap-4">
        <Icon className="w-5 h-5 mt-1 flex-shrink-0 text-slate-600" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-slate-900">{config.label}</h3>
            {getPriorityBadge(task.priority)}
          </div>
          <p className="text-sm font-medium text-slate-700">{task.course}</p>
          {task.people && <p className="text-xs text-slate-600 mt-1">{task.people.join(', ')}</p>}
          {task.person && <p className="text-xs text-slate-600 mt-1">{task.person}</p>}
          {task.reason && <p className="text-xs text-slate-600">{task.reason}</p>}
          {task.spots && <p className="text-xs text-slate-600">{task.spots} Plätze verfügbar</p>}
          {task.count && <p className="text-xs text-slate-600">{task.count} Wartende</p>}
          <p className="text-xs text-slate-500 mt-2">{task.time}</p>
        </div>
        <button className="px-3 py-2 bg-slate-200 hover:bg-slate-300 rounded text-xs font-medium text-slate-700 transition-colors flex-shrink-0">Prüfen</button>
      </div>
    </div>
  );
}

function CourseCard({ course }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'full': return 'bg-red-100 text-red-800';
      case 'active': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCapacityPercentage = (enrolled, capacity) => {
    return Math.round((enrolled / capacity) * 100);
  };

  const percentage = getCapacityPercentage(course.enrolled, course.capacity);

  return (
    <div className="border border-slate-200 rounded-lg p-5 hover:shadow-lg transition-all bg-white">
      <div className="flex items-start justify-between mb-4">
        <h3 className="font-semibold text-slate-900 text-sm">{course.name}</h3>
        <span className={`text-xs font-semibold px-2 py-1 rounded ${getStatusColor(course.status)}`}>
          {course.status === 'full' ? 'Voll' : 'Offen'}
        </span>
      </div>

      {/* Kapazitätsbalken */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-slate-600">Reguläre Plätze</span>
          <span className="text-xs font-semibold text-slate-900">{course.enrolled}/{course.capacity}</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all ${percentage >= 100 ? 'bg-red-500' : 'bg-green-500'}`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          ></div>
        </div>
      </div>

      {/* Warteliste */}
      {course.waitlist > 0 && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
          <p className="text-xs font-medium text-yellow-900">{course.waitlist} auf Warteliste</p>
        </div>
      )}

      {/* Details */}
      <div className="grid grid-cols-2 gap-3 text-xs mb-4">
        <div>
          <p className="text-slate-500">Min. Teilnehmer</p>
          <p className="font-semibold text-slate-900">{course.minParticipants}</p>
        </div>
        <div>
          <p className="text-slate-500">Absagefrist</p>
          <p className="font-semibold text-slate-900">{course.cancellationDeadline}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded transition-colors">
          Bearbeiten
        </button>
        <button className="flex-1 px-3 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-medium rounded transition-colors flex items-center justify-center gap-2">
          <Eye className="w-4 h-4" /> Einträge
        </button>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTasks = selectedFilter === 'critical'
    ? mockTasks.filter(t => t.priority === 'critical' || t.priority === 'high')
    : mockTasks;

  return (
    <div className="space-y-8">
      {/* Header mit Shortcuts */}
      <div>
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Admin-Übersicht</h2>
        <p className="text-slate-600">Alle Anmeldungen, Wartelisten und Kursänderungen auf einen Blick</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <p className="text-xs text-slate-600 font-semibold mb-2">OFFENE AUFGABEN</p>
          <p className="text-3xl font-bold text-slate-900">4</p>
          <p className="text-xs text-red-600 font-medium mt-2">2 kritisch</p>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <p className="text-xs text-slate-600 font-semibold mb-2">KURSE GESAMT</p>
          <p className="text-3xl font-bold text-slate-900">4</p>
          <p className="text-xs text-slate-600 mt-2">1 voll</p>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <p className="text-xs text-slate-600 font-semibold mb-2">ANMELDUNGEN</p>
          <p className="text-3xl font-bold text-slate-900">30</p>
          <p className="text-xs text-slate-600 mt-2">3 auf Warteliste</p>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <p className="text-xs text-slate-600 font-semibold mb-2">UNTER MINDEST-TN</p>
          <p className="text-3xl font-bold text-red-600">1</p>
          <p className="text-xs text-red-600 mt-2">Töpfern Workshop</p>
        </div>
      </div>

      {/* Hauptbereich: Tasks und Kurse */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Aufgaben-Spalte */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">Aufgaben</h3>
              <button className="px-3 py-1 text-xs bg-slate-200 hover:bg-slate-300 rounded text-slate-700 font-medium transition-colors">Filter</button>
            </div>

            <div className="space-y-2">
              {filteredTasks.map(task => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>

            <button className="w-full mt-4 py-2 border border-slate-300 hover:bg-slate-50 rounded text-slate-700 text-sm font-medium transition-colors">
              Alle Aufgaben sehen
            </button>
          </div>
        </div>

        {/* Kurse-Spalte */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-slate-900">Kursverwaltung</h3>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded transition-colors flex items-center gap-2">
                <Plus className="w-4 h-4" /> Neuer Kurs
              </button>
            </div>

            {/* Suchfeld */}
            <div className="mb-6 relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Kurs suchen..."
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Kursliste */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockCourses.map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Detaillierte Verwaltungssektion */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Programmplanung</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="border-2 border-dashed border-slate-300 hover:border-slate-400 rounded-lg p-4 text-center transition-colors">
            <Plus className="w-6 h-6 mx-auto text-slate-400 mb-2" />
            <p className="text-sm font-medium text-slate-700">Halbjahresprogramm erstellen</p>
          </button>
          <button className="border-2 border-dashed border-slate-300 hover:border-slate-400 rounded-lg p-4 text-center transition-colors">
            <Plus className="w-6 h-6 mx-auto text-slate-400 mb-2" />
            <p className="text-sm font-medium text-slate-700">Kurse importieren (Excel)</p>
          </button>
          <button className="border-2 border-dashed border-slate-300 hover:border-slate-400 rounded-lg p-4 text-center transition-colors">
            <Plus className="w-6 h-6 mx-auto text-slate-400 mb-2" />
            <p className="text-sm font-medium text-slate-700">Programmheft erzeugen</p>
          </button>
        </div>
      </div>
    </div>
  );
}
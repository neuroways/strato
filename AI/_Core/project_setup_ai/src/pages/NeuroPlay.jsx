export default function NeuroPlay() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
          NeuroPlay
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Aktiviere dein Gehirn durch spielerische Herausforderungen, die Kreativität, Konzentration und kognitiven Scharfsinn fördern.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-purple-600 mb-4">Neurogames</h2>
            <p className="text-gray-600">
              Entdecke innovative Spiele und Rätsel, die dein Gehirn trainieren und gleichzeitig Spaß machen.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-pink-600 mb-4">Kreatives Training</h2>
            <p className="text-gray-600">
              Steigere deine kognitiven Fähigkeiten durch spielerisches Lernen und interaktive Herausforderungen.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

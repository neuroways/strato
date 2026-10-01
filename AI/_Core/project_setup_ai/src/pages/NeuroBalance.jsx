export default function NeuroBalance() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">
          NeuroBalance
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Finde deine innere Harmonie durch neurowissenschaftliche Methoden, die dein Gehirn und deinen Körper in Einklang bringen.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-emerald-600 mb-4">Neuronale Balance</h2>
            <p className="text-gray-600">
              Nutze bewährte Techniken zur Optimierung deiner Hirnfunktion und zur Verbesserung deiner mentalen Klarheit.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-teal-600 mb-4">Ganzheitliches Wohlbefinden</h2>
            <p className="text-gray-600">
              Verbinde körperliche und mentale Gesundheit für eine umfassende Balance in deinem alltäglichen Leben.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

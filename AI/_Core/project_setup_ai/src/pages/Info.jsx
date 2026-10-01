export default function Info() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-4">
          Info
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Alles, was du über NeuroWays und unsere innovativen Programme wissen musst.
        </p>
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Über NeuroWays</h2>
          <p className="text-gray-600 mb-4">
            NeuroWays verbindet Neurowissenschaft, Psychologie und praktische Weisheit, um dir Tools an die Hand zu geben, die wirklich funktionieren.
          </p>
          <p className="text-gray-600">
            Unsere Mission ist es, Menschen dabei zu helfen, ihr volles kognitives Potenzial auszuschöpfen und ein erfülltes, ausgeglichenes Leben zu führen.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-xl font-bold text-amber-600 mb-4">Kontakt</h3>
            <p className="text-gray-600">
              Hast du Fragen? Kontaktiere uns unter info@neuroways.de
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-xl font-bold text-orange-600 mb-4">Community</h3>
            <p className="text-gray-600">
              Trete unserer wachsenden Community bei und teile deine Erfahrungen.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

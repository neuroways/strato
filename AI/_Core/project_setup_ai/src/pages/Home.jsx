export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            NeuroWays
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8">
            Entdecke innovative Wege für dein Wohlbefinden und deine Balance
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#" className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Erfahre mehr
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

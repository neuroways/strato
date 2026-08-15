import { Check } from 'lucide-react';
import { useState, useEffect } from 'react';

export function AnalysisScreen({ fileName, onAnalysisComplete }) {
  const [steps, setSteps] = useState([
    { name: 'Anleitung wird gelesen', done: false, delay: 0 },
    { name: 'Spielmaterial wird erkannt', done: false, delay: 600 },
    { name: 'Spielziel wird bestimmt', done: false, delay: 1200 },
    { name: 'Rundenstruktur wird analysiert', done: false, delay: 1800 },
    { name: 'Regeln werden verknüpft', done: false, delay: 2400 },
    { name: 'Wissensmodell wird erstellt', done: false, delay: 3000 },
  ]);

  useEffect(() => {
    steps.forEach((step, idx) => {
      const timer = setTimeout(() => {
        setSteps((prev) => {
          const updated = [...prev];
          updated[idx].done = true;
          return updated;
        });
      }, step.delay);

      return () => clearTimeout(timer);
    });
  }, []);

  useEffect(() => {
    const allDone = steps.every((s) => s.done);
    if (allDone) {
      const timer = setTimeout(() => {
        onAnalysisComplete();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [steps, onAnalysisComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col items-center justify-center px-4 py-12">
      {/* Header */}
      <h2 className="text-3xl font-bold mb-2">Analysiere dein Spiel</h2>
      <p className="text-slate-400 mb-12 text-center">{fileName}</p>

      {/* Progress Steps */}
      <div className="w-full max-w-md space-y-3">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 p-3 rounded-lg bg-slate-800 transition-all duration-300"
          >
            <div
              className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                step.done
                  ? 'bg-green-600'
                  : 'bg-slate-700'
              }`}
            >
              {step.done && <Check className="w-4 h-4" />}
            </div>
            <span className={step.done ? 'text-white' : 'text-slate-400'}>
              {step.name}
            </span>
          </div>
        ))}
      </div>

      {/* Completion Message */}
      {steps.every((s) => s.done) && (
        <div className="mt-12 text-center animate-fade-in">
          <p className="text-lg font-semibold text-green-500">
            ✓ Spiel ist bereit
          </p>
        </div>
      )}
    </div>
  );
}

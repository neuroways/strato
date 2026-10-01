import { useState } from "react";
import { ChevronRight, Check } from "lucide-react";
import { getStoryPart, getDayIntro, getDayTitle, getDayOutro } from "./story";
import { forestIllustration, casparlumi, dayBackground } from "./illustrations";
import { ConfirmDialog } from "./ConfirmDialog";
import { RestartDialog } from "./RestartDialog";
import { getDayImage, getStoryPartImage } from "./imageConfig";
import { SafeImage } from "./ImageFallback";

const STEPS = [
  {
    id: 1,
    title: "Prüfe das Satzende",
    description: "Wo endet der Satz? Mit Punkt · Fragezeichen · oder Ausrufezeichen!",
    hint: "Schau auf das letzte Zeichen",
  },
  {
    id: 2,
    title: "Schreibe den Satz",
    description: "Schreibe jedes Wort sorgfältig auf.",
    hint: "Nimm dir Zeit bei jedem Buchstaben",
  },
  {
    id: 3,
    title: "Kontrolliere jedes Wort",
    description: "Lies langsam durch. Stimmt jedes Wort?",
    hint: "Vergleiche mit dem Original",
  },
  {
    id: 4,
    title: "Unterstreiche den Satz",
    description: "Markiere deinen fertigen Satz mit dem Lineal.",
    hint: "Das Besondere für gute Arbeit",
  },
  {
    id: 5,
    title: "Moment der Freude",
    description: "Deine Geschichte wächst!",
    hint: "Ein neuer Satz ist vollendet",
  },
];

function App() {
  const [currentDay, setCurrentDay] = useState(0);
  const [currentRound, setCurrentRound] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const [showDayStory, setShowDayStory] = useState(false);
  const [showFullStory, setShowFullStory] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  const [showRestartDialog, setShowRestartDialog] = useState(false);

  const step = STEPS[currentStep];
  const isStepCompleted = completedSteps.has(currentStep);
  const canContinue = currentStep < 4 && isStepCompleted;

  const handleNextRound = () => {
    if (currentRound < 4) {
      setCurrentRound(currentRound + 1);
      setCurrentStep(0);
      setCompletedSteps(new Set());
    } else {
      setShowDayStory(true);
    }
  };

  const handleCompleteStep = () => {
    const newCompleted = new Set(completedSteps);
    newCompleted.add(currentStep);
    setCompletedSteps(newCompleted);

    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Tagesabschluss mit Story
  if (showDayStory) {
    const dayTitle = getDayTitle(currentDay);
    const dayOutro = getDayOutro(currentDay);
    const isLastDay = currentDay === 4;

    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-rose-50 flex items-center justify-center p-4 overflow-y-auto">
        <div className="max-w-2xl w-full py-8">
          {/* Illustration oben */}
          <div className="mb-8 rounded-2xl overflow-hidden shadow-lg border-4 border-amber-200 bg-white">
            <div dangerouslySetInnerHTML={{ __html: forestIllustration }} className="w-full" />
          </div>

          <div className="text-center mb-12">
            <div className="text-6xl mb-6">✨</div>
            <h1 className="text-3xl font-bold text-amber-900 mb-2">{dayTitle}</h1>
            <p className="text-lg text-amber-700">Tag {currentDay + 1} vollendet</p>
          </div>

          {/* Tagesabschluss */}
          <div className="bg-white rounded-3xl shadow-lg p-8 mb-8 border-4 border-amber-200">
            <p
              className="text-lg leading-relaxed text-amber-900 font-serif"
              style={{ animation: `fadeInUp 0.8s ease-out both` }}
            >
              {dayOutro}
            </p>
          </div>

          {/* Gesamte Geschichte bis zu diesem Tag */}
          <div className="bg-white rounded-3xl shadow-lg p-8 mb-8 border-4 border-amber-200">
            <h2 className="text-2xl font-bold text-amber-900 mb-6 text-center">Deine Geschichte bis hierher</h2>
            <div className="space-y-8">
              {[0, 1, 2, 3, 4].map((day) => {
                if (day > currentDay) return null;
                return (
                  <div key={day} className="border-b-2 border-amber-200 pb-6 last:border-b-0 last:pb-0">
                    <h3 className="text-xl font-bold text-amber-900 mb-2">{getDayTitle(day)}</h3>
                    <p className="text-sm text-amber-600 mb-3">Tag {day + 1}</p>
                    <p className="text-base leading-relaxed text-amber-900 mb-4">{getDayIntro(day)}</p>
                    <div className="space-y-3 pl-4 border-l-4 border-amber-300">
                      {[0, 1, 2, 3, 4].map((part) => {
                        const storyPart = getStoryPart(day, part);
                        return (
                          <div key={part} className="text-sm leading-relaxed text-amber-900 italic">
                            <span className="text-lg mr-2">{storyPart.image}</span>
                            <span>{storyPart.text}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => {
                if (isLastDay) {
                  setShowFullStory(true);
                } else {
                  setCurrentDay(currentDay + 1);
                  setCurrentRound(0);
                  setCurrentStep(0);
                  setCompletedSteps(new Set());
                  setShowDayStory(false);
                }
              }}
              className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105"
            >
              {isLastDay ? "Die komplette Geschichte sehen" : "Zum nächsten Tag"}
            </button>
          </div>

          <style>{`
            @keyframes fadeInUp {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}</style>
        </div>
      </div>
    );
  }

  // Komplette Geschichte
  if (showFullStory) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-rose-50 flex items-center justify-center p-4 overflow-y-auto">
        <div className="max-w-2xl w-full py-8">
          {/* Charaktere Illustration oben */}
          <div className="mb-12 rounded-2xl overflow-hidden shadow-lg border-4 border-amber-200 bg-white">
            <div dangerouslySetInnerHTML={{ __html: casparlumi }} className="w-full" />
          </div>

          <div className="text-center mb-12">
            <div className="text-6xl mb-6">🌟</div>
            <h1 className="text-4xl font-bold text-amber-900 mb-2">Das Geheimnis der magischen 5</h1>
            <p className="text-lg text-amber-700">Deine vollständige Geschichte</p>
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-8 mb-8 border-4 border-amber-200 space-y-8 max-h-96 overflow-y-auto">
            {[0, 1, 2, 3, 4].map((day) => (
              <div key={day} className="border-b-2 border-amber-200 pb-6 last:border-b-0 last:pb-0">
                <h2 className="text-2xl font-bold text-amber-900 mb-2">{getDayTitle(day)}</h2>
                <p className="text-sm text-amber-600 mb-4">Tag {day + 1}</p>
                <p className="text-base leading-relaxed text-amber-900 mb-4">{getDayIntro(day)}</p>
                <div className="space-y-3 pl-4 border-l-4 border-amber-300">
                  {[0, 1, 2, 3, 4].map((part) => {
                    const storyPart = getStoryPart(day, part);
                    return (
                      <div key={part} className="text-sm leading-relaxed text-amber-900 italic">
                        <span className="text-lg mr-2">{storyPart.image}</span>
                        <span>{storyPart.text}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center space-y-4">
            <button
              onClick={() => {
                setCurrentDay(0);
                setCurrentRound(0);
                setCurrentStep(0);
                setCompletedSteps(new Set());
                setShowDayStory(false);
                setShowFullStory(false);
              }}
              className="block w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105"
            >
              Neue Geschichte beginnen
            </button>
            
            <button
              onClick={() => {
                setCurrentDay(0);
                setCurrentRound(0);
                setCurrentStep(0);
                setCompletedSteps(new Set());
                setShowDayStory(false);
                setShowFullStory(false);
              }}
              className="block w-full bg-gray-300 hover:bg-gray-400 text-gray-900 font-semibold py-3 px-8 rounded-full text-base transition-all duration-300"
            >
              Alles zurücksetzen
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Arbeitsschritt-Screen (vollständig ohne Scrollen)
  return (
    <div className="min-h-screen h-screen bg-gradient-to-b from-sky-50 via-blue-50 to-indigo-50 p-3 md:p-6 flex flex-col overflow-hidden">
      <div className="max-w-3xl mx-auto w-full flex flex-col h-full">
        {/* Tages-Navigation oben - kompakt */}
        {showConfirm && (
          <ConfirmDialog 
            currentRound={currentRound}
            onContinue={() => {
              setShowConfirm(false);
            }}
            onLeave={() => {
              setShowConfirm(false);
              if (pendingAction) {
                pendingAction();
              }
            }}
            leaveLabel={currentDay === 4 ? "Nächster Tag" : "Tag wechseln"}
          />
        )}

        <div className="flex items-center justify-between mb-4 md:mb-6 gap-2 flex-shrink-0">
          <button
            onClick={() => {
              if (currentRound < 4) {
                setPendingAction(() => () => {
                  setCurrentDay(Math.max(0, currentDay - 1));
                  setCurrentRound(0);
                  setCurrentStep(0);
                  setCompletedSteps(new Set());
                });
                setShowConfirm(true);
              } else {
                setCurrentDay(Math.max(0, currentDay - 1));
                setCurrentRound(0);
                setCurrentStep(0);
                setCompletedSteps(new Set());
              }
            }}
            disabled={currentDay === 0}
            className="px-2 md:px-4 py-2 text-xs md:text-sm rounded-lg bg-indigo-200 text-indigo-900 font-semibold hover:bg-indigo-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex-shrink-0"
          >
            ←
          </button>
          
          <div className="flex gap-1 md:gap-2">
            {[0, 1, 2, 3, 4].map((day) => (
              <button
                key={day}
                onClick={() => {
                  if (currentRound < 4) {
                    setPendingAction(() => () => {
                      setCurrentDay(day);
                      setCurrentRound(0);
                      setCurrentStep(0);
                      setCompletedSteps(new Set());
                    });
                    setShowConfirm(true);
                  } else {
                    setCurrentDay(day);
                    setCurrentRound(0);
                    setCurrentStep(0);
                    setCompletedSteps(new Set());
                  }
                }}
                disabled={day === currentDay}
                className={`w-8 h-8 md:w-10 md:h-10 rounded-full font-bold text-xs md:text-sm transition-all flex-shrink-0 ${
                  day === currentDay
                    ? "bg-indigo-600 text-white ring-2 ring-indigo-400"
                    : "bg-white text-indigo-900 border-2 border-indigo-200 hover:bg-indigo-50 disabled:opacity-50 disabled:cursor-not-allowed"
                }`}
              >
                {day + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              if (currentRound < 4) {
                setPendingAction(() => () => {
                  setCurrentDay(Math.min(4, currentDay + 1));
                  setCurrentRound(0);
                  setCurrentStep(0);
                  setCompletedSteps(new Set());
                });
                setShowConfirm(true);
              } else {
                setCurrentDay(Math.min(4, currentDay + 1));
                setCurrentRound(0);
                setCurrentStep(0);
                setCompletedSteps(new Set());
              }
            }}
            disabled={currentDay === 4}
            className="px-4 py-2 rounded-lg bg-indigo-200 text-indigo-900 font-semibold hover:bg-indigo-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Nächster Tag →
          </button>
        </div>

        {/* Restart-Dialog */}
        {showRestartDialog && (
          <RestartDialog
            currentRound={currentRound}
            isDayComplete={showDayStory}
            onCancel={() => setShowRestartDialog(false)}
            onConfirm={() => {
              setCurrentRound(0);
              setCurrentStep(0);
              setCompletedSteps(new Set());
              setShowRestartDialog(false);
            }}
          />
        )}

        {/* Tagestitel-Illustration */}
        <div className="mb-8 rounded-2xl overflow-hidden shadow-lg border-2 border-indigo-200 bg-white">
          <SafeImage 
            src={getDayImage(currentDay)?.title}
            alt={`Titelbild für ${getDayTitle(currentDay)}`}
            className="w-full h-auto"
            showFallback={true}
          />
        </div>

        {/* Header mit Tagesinfo */}
        <div className="text-center mb-12">
          <div className="text-5xl mb-3">✨</div>
          <h1 className="text-3xl md:text-4xl font-bold text-indigo-900 mb-1">{getDayTitle(currentDay)}</h1>
          <p className="text-indigo-600 text-lg">Tag {currentDay + 1} von 5</p>
          
          <button
            onClick={() => {
              setShowRestartDialog(true);
            }}
            className="mt-4 text-sm px-3 py-1 rounded-full bg-amber-100 text-amber-900 hover:bg-amber-200 transition-all font-semibold"
          >
            Tag von vorne starten
          </button>
        </div>

        {/* Hauptbereich - scrollbar für Inhalt */}
        <div className="flex-1 overflow-y-auto">
        
        {/* Tag-Intro - kompakt */}
        <div className="bg-indigo-50 rounded-2xl border-2 border-indigo-200 p-4 md:p-6 mb-4 md:mb-6">
          <p className="text-indigo-900 text-sm md:text-base leading-relaxed">{getDayIntro(currentDay)}</p>
        </div>

        {/* Fortschritt */}
        <div className="bg-white rounded-2xl shadow-md p-4 md:p-6 mb-4 md:mb-6 border-2 border-indigo-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-indigo-900">Runde {currentRound + 1} von 5</h2>
              <p className="text-indigo-600">Satz {currentRound + 1} von 5</p>
            </div>
            <div className="text-4xl">📝</div>
          </div>

          <div className="flex gap-2">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`h-3 flex-1 rounded-full transition-all duration-300 ${
                  i <= currentRound ? "bg-gradient-to-r from-indigo-400 to-indigo-600" : "bg-indigo-200"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Aktueller Schritt */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mb-8 border-4 border-indigo-300">
          <div className="mb-6">
            <div className="inline-block bg-indigo-100 text-indigo-900 px-4 py-2 rounded-full font-bold mb-4">
              Schritt {currentStep + 1} von 5
            </div>
            <h2 className="text-3xl font-bold text-indigo-900 mb-3">{step.title}</h2>
            <p className="text-lg text-indigo-700 mb-4">{step.description}</p>
            <div className="bg-indigo-50 border-l-4 border-indigo-400 p-4 rounded">
              <p className="text-indigo-800 italic">{step.hint}</p>
            </div>
          </div>

          {/* Story-Fragment nach Schritt 4 */}
          {currentStep === 4 && isStepCompleted && (
            <div className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl p-6 my-6 border-2 border-amber-300 space-y-4">
              <p className="text-sm text-amber-700 font-bold">📖 Teil {currentRound + 1} deiner Geschichte:</p>
              
              {/* Story-Bild */}
              <div className="bg-white rounded-lg p-0 overflow-hidden">
                <SafeImage 
                  src={getStoryPartImage(currentDay, currentRound)}
                  alt={`Geschichtenpart {currentRound + 1} von Tag {currentDay + 1}`}
                  className="w-full h-auto rounded-lg"
                  showFallback={true}
                />
              </div>
              
              {/* Story-Text */}
              <div className="bg-white rounded-lg p-4">
                <div className="flex gap-3">
                  <span className="text-3xl flex-shrink-0">{getStoryPart(currentDay, currentRound).image}</span>
                  <p className="text-amber-900 leading-relaxed italic">{getStoryPart(currentDay, currentRound).text}</p>
                </div>
              </div>
            </div>
          )}

          {/* Schritt-Visualisierung */}
          {currentStep !== 4 && (
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-8 my-8 min-h-40 flex items-center justify-center border-2 border-indigo-200">
              {currentStep === 0 && (
                <div className="text-center">
                  <div className="text-6xl mb-4">❓❗⚫</div>
                  <p className="text-indigo-900 font-bold">Punktuation erkennen</p>
                </div>
              )}
              {currentStep === 1 && (
                <div className="text-center">
                  <div className="text-6xl mb-4">✏️</div>
                  <p className="text-indigo-900 font-bold">Sorgfältig schreiben</p>
                </div>
              )}
              {currentStep === 2 && (
                <div className="text-center">
                  <div className="text-6xl mb-4">🔍</div>
                  <p className="text-indigo-900 font-bold">Jedes Wort prüfen</p>
                </div>
              )}
              {currentStep === 3 && (
                <div className="text-center">
                  <div className="text-6xl mb-4">━━━</div>
                  <p className="text-indigo-900 font-bold">Schön unterstreichen</p>
                </div>
              )}
            </div>
          )}

          {/* Aktions-Buttons */}
          {currentStep === 4 ? (
            <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-2xl p-8 text-center border-2 border-amber-300">
              <div className="text-5xl mb-4">🌟</div>
              <h3 className="text-2xl font-bold text-amber-900 mb-3">Wunderbar!</h3>
              <p className="text-amber-800 mb-6">Du hast diesen Satz mit voller Konzentration bearbeitet.</p>
              {!isStepCompleted ? (
                <button
                  onClick={handleCompleteStep}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 px-6 rounded-2xl text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <Check className="w-6 h-6" />
                  Ja, ich bin fertig!
                </button>
              ) : (
                <button
                  onClick={handleNextRound}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-6 rounded-2xl text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  Nächste Runde
                  <ChevronRight className="w-6 h-6" />
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {!isStepCompleted ? (
                <button
                  onClick={handleCompleteStep}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-6 rounded-2xl text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <Check className="w-6 h-6" />
                  Schritt erledigt
                </button>
              ) : (
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      const newCompleted = new Set(completedSteps);
                      newCompleted.delete(currentStep);
                      setCompletedSteps(newCompleted);
                      setCurrentStep(Math.max(0, currentStep - 1));
                    }}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-900 font-bold py-4 px-6 rounded-2xl text-lg transition-all duration-300"
                  >
                    Zurück
                  </button>
                  <button
                    onClick={() => setCurrentStep(currentStep + 1)}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-6 rounded-2xl text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                  >
                    Weiter
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Schritt-Übersicht - unten festgepinnt */}
        <div className="bg-white rounded-2xl shadow-md p-4 md:p-6 border-2 border-indigo-200 mt-4 md:mt-6">
          <h3 className="font-bold text-indigo-900 mb-3 text-sm md:text-base">Die Magischen 5</h3>
          <div className="space-y-1 md:space-y-2">
            {STEPS.map((s, i) => (
              <div
                key={i}
                className={`p-2 md:p-3 rounded-lg flex items-center gap-2 md:gap-3 transition-all duration-300 ${
                  i === currentStep ? "bg-indigo-100 border-2 border-indigo-400" : i < currentStep ? "bg-green-50 border-2 border-green-200" : "bg-gray-50 border-2 border-gray-200"
                }`}
              >
                <div className="font-bold text-indigo-900 w-6 md:w-8 text-center flex-shrink-0">
                  {i < currentStep ? <Check className="w-4 h-4 md:w-6 md:h-6 text-green-600" /> : i + 1}
                </div>
                <div>
                  <p className="font-semibold text-indigo-900 text-xs md:text-sm">{s.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        </div>
      </div>
    </div>
  );
}

export default App;

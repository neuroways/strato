import { useState, useEffect } from "react";
import { ChevronRight, RefreshCw, Award, Target, AlertCircle, CheckCircle2, XCircle, Volume2, BookOpen } from "lucide-react";
import { quizEngine } from "../services/quiz-engine";
import quizQuestionsData from "../data/quiz-questions-complete.json";

export default function Quiz() {
  const [screen, setScreen] = useState("start"); // start, quiz, results, wiederholung
  const [selectedStufe, setSelectedStufe] = useState(1);
  const [selectedThemen, setSelectedThemen] = useState([]);
  const [sessionId, setSessionId] = useState(null);
  const [aktuelleSession, setAktuelleSession] = useState(null);
  const [aktuelleGrage, setAktuelleGrage] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [statistik, setStatistik] = useState(null);
  const [fortschritt, setFortschritt] = useState(null);
  const [lernfortschritt, setLernfortschritt] = useState(null);

  const stufen = [
    { level: 1, name: "Entdecken", desc: "Grundlagen verstehen" },
    { level: 2, name: "Anwenden", desc: "Verbindungen planen" },
    { level: 3, name: "Verstehen", desc: "Fehler erkennen & X32" },
    { level: 4, name: "Studio-Profi", desc: "Komplexe Szenarien" },
  ];

  const themen = [
    { id: "geräte", label: "Geräte" },
    { id: "audio-midi", label: "Audio & MIDI" },
    { id: "verbindungen", label: "Verbindungen" },
    { id: "x32", label: "Behringer X32" },
    { id: "aufnahme", label: "Aufnahme" },
    { id: "fehlersuche", label: "Fehlersuche" },
    { id: "sampler", label: "Sampler" },
    { id: "synthesizer", label: "Synthesizer" },
  ];

  useEffect(() => {
    setLernfortschritt(quizEngine.getLernfortschritt());
  }, []);

  const handleStartQuiz = () => {
    const newSession = quizEngine.createSession(
      quizQuestionsData.fragen,
      selectedStufe,
      selectedThemen
    );
    
    if (!newSession.fragen || newSession.fragen.length === 0) {
      alert("Keine Fragen für diese Auswahl gefunden. Bitte andere Optionen wählen.");
      return;
    }

    setSessionId(newSession.id);
    setAktuelleSession(newSession);
    
    const currentQuestion = quizEngine.getCurrentQuestion(newSession);
    setAktuelleGrage(currentQuestion);
    setFortschritt(quizEngine.getProgress(newSession));
    setScreen("quiz");
    setSelectedAnswers([]);
    setShowFeedback(false);
  };

  const handleStartWiederholung = () => {
    const unsichereFragen = quizEngine.getUnsichereFragenFürWiederholung(
      quizQuestionsData.fragen,
      sessionId
    );

    if (unsichereFragen.length === 0) {
      alert("Keine unsicheren Themen gefunden. Du machst gute Fortschritte!");
      return;
    }

    const sessionForRepetition = quizEngine.createSession(
      unsichereFragen,
      Math.max(1, Math.floor(selectedStufe / 2)), // Eine Stufe tiefer
      []
    );

    setSessionId(sessionForRepetition.id);
    setAktuelleSession(sessionForRepetition);
    const currentQuestion = quizEngine.getCurrentQuestion(sessionForRepetition);
    setAktuelleGrage(currentQuestion);
    setFortschritt(quizEngine.getProgress(sessionForRepetition));
    setScreen("quiz");
    setSelectedAnswers([]);
    setShowFeedback(false);
  };

  const handleAnswerSelect = (answerId) => {
    if (!aktuelleGrage) return;

    if (aktuelleGrage.mehrereAntwortenMöglich) {
      setSelectedAnswers((prev) =>
        prev.includes(answerId)
          ? prev.filter((id) => id !== answerId)
          : [...prev, answerId]
      );
    } else {
      setSelectedAnswers([answerId]);
    }
  };

  const handleCheckAnswer = () => {
    if (selectedAnswers.length === 0) return;

    const { feedback: answerFeedback, session: updatedSession } = quizEngine.submitAnswer(
      aktuelleSession,
      aktuelleGrage.id,
      selectedAnswers,
      0 // Zeitsekundenbzw. in echter App messen
    );

    setFeedback(answerFeedback);
    setShowFeedback(true);
    setAktuelleSession(updatedSession);
  };

  const handleNextQuestion = () => {
    if (!aktuelleSession) return;

    if (aktuelleSession.beendtAm) {
      // Quiz ist vorbei
      quizEngine.updateLernfortschritt(sessionId);
      const progressData = quizEngine.getLernfortschritt();
      setLernfortschritt(progressData);
      setStatistik(aktuelleSession.statistik);
      setScreen("results");
    } else {
      const nextQuestion = quizEngine.getCurrentQuestion(aktuelleSession);
      if (nextQuestion) {
        setAktuelleGrage(nextQuestion);
        setFortschritt(quizEngine.getProgress(aktuelleSession));
        setSelectedAnswers([]);
        setShowFeedback(false);
        setFeedback(null);
      }
    }
  };

  const bewertungsText = (prozent) => {
    if (prozent >= 90) return "Meisterlich verstanden! Du bist bereit für Profis.";
    if (prozent >= 75) return "Sehr gute Grundlagen! Noch ein bisschen üben.";
    if (prozent >= 60) return "Grundlagen erkannt. Wiederholung hilft beim Festigen.";
    if (prozent >= 50) return "Guter Anfang. Schaue dir die Lernmodule an.";
    return "Keine Sorge! Das ist ein Anfang. Lerne Schritt für Schritt.";
  };

  // ============================================================
  // SCREEN: START
  // ============================================================
  if (screen === "start") {
    return (
      <div className="min-h-screen py-12 pb-24 bg-gradient-to-b from-gray-950 to-gray-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 flex items-center gap-3">
              <Target size={44} className="text-orange-500" />
              Klang-Challenges
            </h1>
            <p className="text-lg text-gray-300">
              Kleine Rätsel über Musik und Technik. Jede richtige Lösung erklärt den Hintergrund. 40 Challenges warten auf dich.
            </p>
          </div>

          <div className="space-y-12">
            {/* Stufe wählen */}
            <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">1. Schwierigkeitsstufe</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {stufen.map((stufe) => (
                  <button
                    key={stufe.level}
                    onClick={() => setSelectedStufe(stufe.level)}
                    className={`p-6 rounded-lg text-left transition-all border-2 ${
                      selectedStufe === stufe.level
                        ? "bg-orange-600/20 border-orange-500 shadow-lg shadow-orange-500/20"
                        : "bg-gray-800/40 border-gray-700 hover:border-gray-600"
                    }`}
                  >
                    <h3 className={`text-lg font-bold mb-1 ${
                      selectedStufe === stufe.level ? "text-orange-400" : "text-gray-300"
                    }`}>
                      Stufe {stufe.level} – {stufe.name}
                    </h3>
                    <p className={`text-sm ${
                      selectedStufe === stufe.level ? "text-orange-200" : "text-gray-400"
                    }`}>
                      {stufe.desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Themen wählen */}
            <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">2. Themen (optional)</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {themen.map((thema) => (
                  <button
                    key={thema.id}
                    onClick={() =>
                      setSelectedThemen((prev) =>
                        prev.includes(thema.id)
                          ? prev.filter((t) => t !== thema.id)
                          : [...prev, thema.id]
                      )
                    }
                    className={`p-3 rounded-lg text-sm font-medium transition-all border ${
                      selectedThemen.includes(thema.id)
                        ? "bg-orange-600 border-orange-500 text-white"
                        : "bg-gray-800 border-gray-700 text-gray-300 hover:border-gray-600"
                    }`}
                  >
                    {thema.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Quiz starten */}
            <button
              onClick={handleStartQuiz}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-6 rounded-lg transition-all flex items-center justify-center gap-2 text-lg"
            >
              <ChevronRight size={24} />
              Quiz starten
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ============================================================
  // SCREEN: QUIZ
  // ============================================================
  if (screen === "quiz" && aktuelleSession && aktuelleGrage) {
    const antworten = aktuelleGrage.antworten || [];
    
    return (
      <div className="min-h-screen py-8 pb-24 bg-gradient-to-b from-gray-950 to-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Fortschritt */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-400">
                Frage {fortschritt?.aktuelleFrage}/{fortschritt?.gesamtFragen}
              </span>
              <span className="text-sm font-bold text-orange-500">{fortschritt?.prozent}%</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2">
              <div
                className="bg-orange-600 h-2 rounded-full transition-all"
                style={{ width: `${fortschritt?.prozent}%` }}
              />
            </div>
          </div>

          {/* Frage */}
          <div className="bg-gray-900/80 border border-gray-800 rounded-xl p-8 mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
              {aktuelleGrage.frage}
            </h2>

            {/* Antworten */}
            <div className="space-y-3">
              {antworten.map((antwort) => (
                <button
                  key={antwort.id}
                  onClick={() => handleAnswerSelect(antwort.id)}
                  disabled={showFeedback}
                  className={`w-full p-4 rounded-lg text-left transition-all border-2 ${
                    selectedAnswers.includes(antwort.id)
                      ? "bg-orange-600/20 border-orange-500"
                      : "bg-gray-800/40 border-gray-700 hover:border-gray-600"
                  } ${showFeedback ? "opacity-75 cursor-default" : ""}`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`mt-1 flex-shrink-0 w-5 h-5 rounded border-2 ${
                        selectedAnswers.includes(antwort.id)
                          ? "bg-orange-600 border-orange-600"
                          : "border-gray-600"
                      }`}
                    />
                    <span className="text-gray-200">{antwort.text}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Feedback */}
            {showFeedback && feedback && (
              <div className={`mt-8 p-6 rounded-lg border-2 ${
                feedback.richtig
                  ? "bg-green-900/20 border-green-600"
                  : "bg-red-900/20 border-red-600"
              }`}>
                <div className="flex items-start gap-3 mb-4">
                  {feedback.richtig ? (
                    <CheckCircle2 className="text-green-500 flex-shrink-0 mt-1" size={24} />
                  ) : (
                    <XCircle className="text-red-500 flex-shrink-0 mt-1" size={24} />
                  )}
                  <div>
                    <h3 className={`font-bold text-lg mb-2 ${
                      feedback.richtig ? "text-green-400" : "text-red-400"
                    }`}>
                      {feedback.richtig ? "Richtig!" : "Nicht ganz..."}
                    </h3>
                    <p className="text-gray-200 mb-4">
                      {feedback.einfacheErklärung}
                    </p>

                    {feedback.warumNichtKorrekt && (
                      <div className="mb-4 p-3 bg-gray-800/50 rounded border-l-4 border-orange-500">
                        <p className="text-sm text-gray-300">
                          <strong>Warum nicht:</strong> {feedback.warumNichtKorrekt.join(" • ")}
                        </p>
                      </div>
                    )}

                    {feedback.technischeErgänzung && (
                      <div className="mb-4 p-3 bg-blue-900/20 rounded border-l-4 border-blue-500">
                        <p className="text-sm text-blue-200">
                          <strong>Technisch:</strong> {feedback.technischeErgänzung}
                        </p>
                      </div>
                    )}

                    {feedback.linkZuLernmodul && (
                      <a
                        href={`/learning#${feedback.linkZuLernmodul.modulId}`}
                        className="inline-flex items-center gap-2 mt-3 text-orange-400 hover:text-orange-300"
                      >
                        <BookOpen size={16} />
                        Lernmodul: {feedback.linkZuLernmodul.titel}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            {!showFeedback ? (
              <button
                onClick={handleCheckAnswer}
                disabled={selectedAnswers.length === 0}
                className={`flex-1 py-3 px-4 rounded-lg font-bold transition-all flex items-center justify-center gap-2 ${
                  selectedAnswers.length === 0
                    ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                    : "bg-orange-600 hover:bg-orange-700 text-white"
                }`}
              >
                Antwort prüfen
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2"
              >
                Nächste Frage
                <ChevronRight size={20} />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ============================================================
  // SCREEN: ERGEBNISSE
  // ============================================================
  if (screen === "results" && statistik) {
    return (
      <div className="min-h-screen py-12 pb-24 bg-gradient-to-b from-gray-950 to-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Award size={56} className="mx-auto text-orange-500 mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Quiz fertig!
            </h1>
            <p className="text-xl text-gray-300">
              {bewertungsText(statistik.prozentRichtig)}
            </p>
          </div>

          {/* Ergebnis Karten */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-900/80 border border-gray-800 rounded-xl p-6 text-center">
              <div className="text-5xl font-bold text-orange-500 mb-2">
                {statistik.prozentRichtig}%
              </div>
              <p className="text-gray-400">Richtig beantwortet</p>
            </div>

            <div className="bg-gray-900/80 border border-gray-800 rounded-xl p-6 text-center">
              <div className="text-5xl font-bold text-green-500 mb-2">
                {statistik.richtigeAnzahl}
              </div>
              <p className="text-gray-400">Korrekte Antworten</p>
            </div>

            <div className="bg-gray-900/80 border border-gray-800 rounded-xl p-6 text-center">
              <div className="text-5xl font-bold text-red-500 mb-2">
                {statistik.falschtAnzahl}
              </div>
              <p className="text-gray-400">Noch zu üben</p>
            </div>
          </div>

          {/* Stärken und Schwächen */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {statistik.stärkenThemen.length > 0 && (
              <div className="bg-green-900/20 border border-green-700 rounded-xl p-6">
                <h3 className="text-lg font-bold text-green-400 mb-4 flex items-center gap-2">
                  <CheckCircle2 size={20} />
                  Deine Stärken
                </h3>
                <ul className="space-y-2">
                  {statistik.stärkenThemen.map((thema) => (
                    <li key={thema.themaId} className="text-green-200">
                      <span className="font-medium capitalize">{thema.themaId}</span>{" "}
                      <span className="text-green-400">({thema.prozent}%)</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {statistik.schwächenThemen.length > 0 && (
              <div className="bg-orange-900/20 border border-orange-700 rounded-xl p-6">
                <h3 className="text-lg font-bold text-orange-400 mb-4 flex items-center gap-2">
                  <AlertCircle size={20} />
                  Zum Üben
                </h3>
                <ul className="space-y-2">
                  {statistik.schwächenThemen.map((thema) => (
                    <li key={thema.themaId} className="text-orange-200">
                      <span className="font-medium capitalize">{thema.themaId}</span>{" "}
                      <span className="text-orange-400">({thema.prozent}%)</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Aktionen */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => setScreen("start")}
              className="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded-lg transition-all"
            >
              Neues Quiz
            </button>

            {statistik.schwächenThemen.length > 0 && (
              <button
                onClick={handleStartWiederholung}
                className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2"
              >
                <RefreshCw size={20} />
                Unsichere Themen üben
              </button>
            )}
          </div>

          {lernfortschritt && (
            <div className="mt-12 bg-blue-900/20 border border-blue-700 rounded-xl p-6">
              <h3 className="text-lg font-bold text-blue-400 mb-4">Dein Fortschritt</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-blue-200 font-medium">Gesamte Lernzeit</p>
                  <p className="text-blue-400 text-lg">
                    {Math.round(lernfortschritt.gesamtLernzeit / 60)} min
                  </p>
                </div>
                <div>
                  <p className="text-blue-200 font-medium">Absolvierte Sessions</p>
                  <p className="text-blue-400 text-lg">
                    {lernfortschritt.absolvierteSessionenAusnahlmeBeginn.length}
                  </p>
                </div>
                <div>
                  <p className="text-blue-200 font-medium">Bestesz Ergebnis</p>
                  <p className="text-blue-400 text-lg">
                    {lernfortschritt.statistikProSchwierigkeitsgrad.length > 0
                      ? Math.max(
                          ...lernfortschritt.statistikProSchwierigkeitsgrad.map(
                            (s) => s.bestesErgebnis
                          )
                        )
                      : "–"}
                    %
                  </p>
                </div>
                <div>
                  <p className="text-blue-200 font-medium">Empfohlene Module</p>
                  <p className="text-blue-400 text-lg">
                    {lernfortschritt.empfohleneLernmodule.length}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
}

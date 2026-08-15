import quizQuestionsData from "../data/quiz-questions.json";

export interface QuizAntwort {
  id: string;
  text: string;
  korrekt: boolean;
  feedback: string;
  warumNichtKorrekt?: string;
}

export interface QuizFrage {
  id: string;
  titel: string;
  frage: string;
  aufgabentyp: string;
  schwierigkeitsstufe: number;
  themenIds: string[];
  geräteIds?: string[];
  antworten: QuizAntwort[];
  richtigeAntwortIds: string[];
  mehrereAntwortenMöglich: boolean;
  lösungserklärung: string;
  hinweis?: string;
  lernmodulIds?: string[];
  bestätigungsstatus: string;
  aktiv: boolean;
}

export interface QuizSession {
  id: string;
  stufe: number;
  themenIds: string[];
  fragen: QuizFrage[];
  aktuelleFrageIndex: number;
  antworten: { frageId: string; benutzerAntwortenIds: string[]; richtig: boolean }[];
  gestartetAm: string;
  beendetAm?: string;
}

export interface QuizStatistik {
  gesamtFragen: number;
  richtig: number;
  falsch: number;
  prozent: number;
  starkeThemen: string[];
  unsichereThemen: string[];
  falscheFragenIds: string[];
}

class QuizService {
  private alleFragen: QuizFrage[] = quizQuestionsData.fragen as unknown as QuizFrage[];
  private sessionsKey = "quiz-sessions";
  private statistikKey = "quiz-statistik";

  /**
   * Lade Fragen für eine bestimmte Stufe und Themenkombination
   */
  getFragen(stufe: number, themenIds: string[], anzahl: number = 10): QuizFrage[] {
    let gefiltert = this.alleFragen.filter(
      (f) =>
        f.schwierigkeitsstufe === stufe &&
        f.bestätigungsstatus === "bestätigt" &&
        f.aktiv &&
        (themenIds.length === 0 || f.themenIds.some((t) => themenIds.includes(t)))
    );

    // Shuffle
    gefiltert = gefiltert.sort(() => Math.random() - 0.5);

    return gefiltert.slice(0, anzahl);
  }

  /**
   * Starte eine neue Quiz-Session
   */
  startSession(stufe: number, themenIds: string[], anzahl: number = 10): QuizSession {
    const fragen = this.getFragen(stufe, themenIds, anzahl);

    const session: QuizSession = {
      id: `session-${Date.now()}`,
      stufe,
      themenIds,
      fragen,
      aktuelleFrageIndex: 0,
      antworten: [],
      gestartetAm: new Date().toISOString(),
    };

    this.saveSession(session);
    return session;
  }

  /**
   * Speichere eine Antwort
   */
  beantworteFrage(
    sessionId: string,
    frageId: string,
    benutzerAntwortenIds: string[]
  ): { korrekt: boolean; feedback: string[] } {
    const session = this.getSession(sessionId);
    if (!session) throw new Error("Session nicht gefunden");

    const frage = session.fragen.find((f) => f.id === frageId);
    if (!frage) throw new Error("Frage nicht gefunden");

    // Prüfe ob die Antwort korrekt ist
    const richtig = this.prüfAntwort(frage, benutzerAntwortenIds);

    // Speichere die Antwort
    session.antworten.push({
      frageId,
      benutzerAntwortenIds,
      richtig,
    });

    // Gehe zur nächsten Frage
    session.aktuelleFrageIndex++;

    // Wenn alle Fragen beantwortet, beende die Session
    if (session.aktuelleFrageIndex >= session.fragen.length) {
      session.beendetAm = new Date().toISOString();
      this.saveStatistik(sessionId, session);
    }

    this.saveSession(session);

    // Erstelle Feedback
    const feedbacks = this.erstelleFeedback(frage, benutzerAntwortenIds, richtig);

    return { korrekt: richtig, feedback: feedbacks };
  }

  /**
   * Prüfe, ob eine Antwort korrekt ist
   */
  private prüfAntwort(frage: QuizFrage, benutzerAntwortenIds: string[]): boolean {
    if (frage.mehrereAntwortenMöglich) {
      // Alle richtigen Antworten müssen gewählt sein, keine falschen
      const benutzerSet = new Set(benutzerAntwortenIds);
      const richtigSet = new Set(frage.richtigeAntwortIds);

      return (
        benutzerSet.size === richtigSet.size &&
        Array.from(benutzerSet).every((id) => richtigSet.has(id))
      );
    } else {
      // Genau eine Antwort, und sie muss richtig sein
      return (
        benutzerAntwortenIds.length === 1 &&
        frage.richtigeAntwortIds.includes(benutzerAntwortenIds[0])
      );
    }
  }

  /**
   * Erstelle erklärendes Feedback
   */
  private erstelleFeedback(
    frage: QuizFrage,
    benutzerAntwortenIds: string[],
    richtig: boolean
  ): string[] {
    const feedbacks: string[] = [];

    if (richtig) {
      feedbacks.push("✓ Das ist richtig!");
    } else {
      feedbacks.push("✗ Das stimmt nicht ganz.");
    }

    // Explizites Feedback der gewählten Antwort(en)
    benutzerAntwortenIds.forEach((antId) => {
      const antwort = frage.antworten.find((a) => a.id === antId);
      if (antwort) {
        if (antwort.korrekt) {
          feedbacks.push(antwort.feedback);
        } else if (antwort.warumNichtKorrekt) {
          feedbacks.push(`Warum nicht: ${antwort.warumNichtKorrekt}`);
        }
      }
    });

    // Lösungserklärung
    feedbacks.push(`Erklärung: ${frage.lösungserklärung}`);

    // Hinweis
    if (frage.hinweis && !richtig) {
      feedbacks.push(`💡 Tipp: ${frage.hinweis}`);
    }

    return feedbacks;
  }

  /**
   * Gebe Statistik einer beendeten Session zurück
   */
  getStatistik(sessionId: string): QuizStatistik | null {
    const storedStats = localStorage.getItem(`${this.statistikKey}-${sessionId}`);
    if (!storedStats) return null;

    const session = this.getSession(sessionId);
    if (!session || !session.beendetAm) return null;

    const richtig = session.antworten.filter((a) => a.richtig).length;
    const gesamt = session.antworten.length;
    const falsch = gesamt - richtig;

    // Themen analysieren
    const starkeThemen: { [key: string]: number } = {};
    const unsichereThemen: { [key: string]: number } = {};
    const falscheFragenIds: string[] = [];

    session.antworten.forEach((antwort, idx) => {
      const frage = session.fragen[idx];
      if (!frage) return;

      frage.themenIds.forEach((thema) => {
        if (antwort.richtig) {
          starkeThemen[thema] = (starkeThemen[thema] || 0) + 1;
        } else {
          unsichereThemen[thema] = (unsichereThemen[thema] || 0) + 1;
          falscheFragenIds.push(frage.id);
        }
      });
    });

    return {
      gesamtFragen: gesamt,
      richtig,
      falsch,
      prozent: Math.round((richtig / gesamt) * 100),
      starkeThemen: Object.keys(starkeThemen),
      unsichereThemen: Object.keys(unsichereThemen),
      falscheFragenIds: [...new Set(falscheFragenIds)],
    };
  }

  /**
   * Session-Verwaltung
   */
  private saveSession(session: QuizSession): void {
    localStorage.setItem(
      `${this.sessionsKey}-${session.id}`,
      JSON.stringify(session)
    );
  }

  private getSession(sessionId: string): QuizSession | null {
    const stored = localStorage.getItem(`${this.sessionsKey}-${sessionId}`);
    return stored ? JSON.parse(stored) : null;
  }

  private saveStatistik(sessionId: string, session: QuizSession): void {
    const statistik = this.getStatistik(sessionId);
    if (statistik) {
      localStorage.setItem(
        `${this.statistikKey}-${sessionId}`,
        JSON.stringify(statistik)
      );
    }
  }

  /**
   * Gebe aktuelle Session zurück
   */
  getAktuelleSession(sessionId: string): QuizSession | null {
    return this.getSession(sessionId);
  }

  /**
   * Gebe aktuelle Frage zurück
   */
  getAktuelleGrage(sessionId: string): QuizFrage | null {
    const session = this.getSession(sessionId);
    if (!session) return null;
    return session.fragen[session.aktuelleFrageIndex] || null;
  }

  /**
   * Gebe Fortschritt zurück
   */
  getFortschritt(sessionId: string): { aktuelle: number; gesamt: number } | null {
    const session = this.getSession(sessionId);
    if (!session) return null;
    return {
      aktuelle: session.aktuelleFrageIndex + 1,
      gesamt: session.fragen.length,
    };
  }
}

export const quizService = new QuizService();

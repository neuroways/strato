// Quiz Engine Service
// Kernlogik für Quiz-Management, Feedback-Generierung und Lernfortschritt

import {
  QuizFrage,
  QuizSession,
  QuizSessionStatistik,
  QuizAntwortBenutzer,
  QuizFeedback,
  Lernfortschritt,
  AufgabenTyp,
  Schwierigkeitsgrad,
  QuizVerwaltungFilter,
} from "../types/quiz";

const QUIZ_SESSIONS_KEY = "studio_albert_quiz_sessions";
const LERNFORTSCHRITT_KEY = "studio_albert_lernfortschritt";

class QuizEngineService {
  createSession(
    fragen: QuizFrage[],
    schwierigkeitsstufe: Schwierigkeitsgrad,
    gewählteThemen: string[]
  ): QuizSession {
    const filteredFragen = fragen
      .filter((f) => f.aktiv && f.bestätigungsstatus === "bestätigt")
      .filter((f) => f.schwierigkeitsstufe === schwierigkeitsstufe)
      .filter(
        (f) =>
          gewählteThemen.length === 0 ||
          f.themenIds.some((t) => gewählteThemen.includes(t))
      );

    // Shuffle Fragen
    const shuffled = [...filteredFragen].sort(() => Math.random() - 0.5);

    const session: QuizSession = {
      id: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      startAm: new Date().toISOString(),
      schwierigkeitsstufe,
      gewählteThemen,
      fragen: shuffled,
      antworten: [],
      aktuelleFrageIndex: 0,
      statistik: {
        gesamtFragen: shuffled.length,
        beantworteteFragenAnzahl: 0,
        richtigeAnzahl: 0,
        falschtAnzahl: 0,
        prozentRichtig: 0,
        durchschnittlicheZeitSecunden: 0,
        stärkenThemen: [],
        schwächenThemen: [],
        falschtBeantworteteFragen: [],
      },
    };

    this.saveSession(session);
    return session;
  }

  getSession(sessionId: string): QuizSession | null {
    const sessions = this.getAllSessions();
    return sessions.find((s) => s.id === sessionId) || null;
  }

  saveSession(session: QuizSession): void {
    const sessions = this.getAllSessions();
    const index = sessions.findIndex((s) => s.id === session.id);
    if (index >= 0) {
      sessions[index] = session;
    } else {
      sessions.push(session);
    }
    localStorage.setItem(QUIZ_SESSIONS_KEY, JSON.stringify(sessions));
  }

  getAllSessions(): QuizSession[] {
    try {
      const data = localStorage.getItem(QUIZ_SESSIONS_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  getCurrentQuestion(session: QuizSession): QuizFrage | null {
    if (session.aktuelleFrageIndex >= session.fragen.length) {
      return null;
    }
    return session.fragen[session.aktuelleFrageIndex];
  }

  getProgress(session: QuizSession): {
    aktuelleFrage: number;
    gesamtFragen: number;
    prozent: number;
  } {
    const progress = session.aktuelleFrageIndex + 1;
    return {
      aktuelleFrage: progress,
      gesamtFragen: session.fragen.length,
      prozent: Math.round((progress / session.fragen.length) * 100),
    };
  }

  submitAnswer(
    session: QuizSession,
    frageId: string,
    gegebeneAntwortIds: string[],
    zeitSecunden: number
  ): { feedback: QuizFeedback; session: QuizSession } {
    const frage = session.fragen.find((f) => f.id === frageId);
    if (!frage) {
      throw new Error(`Frage ${frageId} nicht gefunden`);
    }

    const richtig = this.isAnswerCorrect(
      gegebeneAntwortIds,
      frage.richtigeAntwortIds,
      frage.mehrereAntwortenMöglich
    );

    const feedback = this.generateFeedback(
      frage,
      gegebeneAntwortIds,
      richtig
    );

    const antwortBenutzer: QuizAntwortBenutzer = {
      frageId,
      gegebeneAntwortIds,
      richtig,
      zeitSecunden,
      feedback,
    };

    session.antworten.push(antwortBenutzer);

    // Statistik aktualisieren
    session.statistik.beantworteteFragenAnzahl += 1;
    if (richtig) {
      session.statistik.richtigeAnzahl += 1;
    } else {
      session.statistik.falschtAnzahl += 1;
      session.statistik.falschtBeantworteteFragen.push(frageId);
    }

    // Fortschritt
    session.aktuelleFrageIndex += 1;

    // Zeitliche Durchschnitte
    const totalZeit = session.antworten.reduce((sum, a) => sum + a.zeitSecunden, 0);
    session.statistik.durchschnittlicheZeitSecunden = Math.round(
      totalZeit / session.antworten.length
    );

    // Prozente
    session.statistik.prozentRichtig = Math.round(
      (session.statistik.richtigeAnzahl / session.statistik.beantworteteFragenAnzahl) *
        100
    );

    // Stärken und Schwächen analysieren
    this.updateThemenStatistik(session);

    // Quiz beenden, falls alle Fragen beantwortet
    if (session.aktuelleFrageIndex >= session.fragen.length) {
      session.beendtAm = new Date().toISOString();
    }

    this.saveSession(session);
    return { feedback, session };
  }

  private isAnswerCorrect(
    gegebeneAntwortIds: string[],
    richtigeAntwortIds: string[],
    mehrereAntwortenMöglich: boolean
  ): boolean {
    if (!mehrereAntwortenMöglich) {
      return (
        gegebeneAntwortIds.length === 1 &&
        richtigeAntwortIds.length === 1 &&
        gegebeneAntwortIds[0] === richtigeAntwortIds[0]
      );
    }

    // Bei Mehrfachauswahl: alle richtigen Antworten gewählt und keine falschen
    const gegebeneSet = new Set(gegebeneAntwortIds);
    const richtigeSet = new Set(richtigeAntwortIds);

    return (
      gegebeneSet.size === richtigeSet.size &&
      Array.from(gegebeneSet).every((id) => richtigeSet.has(id))
    );
  }

  private generateFeedback(
    frage: QuizFrage,
    gegebeneAntwortIds: string[],
    richtig: boolean
  ): QuizFeedback {
    const einfacheErklärung = richtig
      ? `✓ Richtig! ${frage.lösungserklärung}`
      : `✗ Nicht ganz. ${frage.lösungserklärung}`;

    const warumNichtKorrekt: string[] = [];
    if (!richtig) {
      for (const antwortId of gegebeneAntwortIds) {
        const antwort = frage.antworten.find((a) => a.id === antwortId);
        if (antwort && !antwort.korrekt && antwort.warumNichtKorrekt) {
          warumNichtKorrekt.push(antwort.warumNichtKorrekt);
        }
      }
    }

    return {
      richtig,
      punkteEarned: richtig ? 10 : 0,
      einfacheErklärung,
      technischeErgänzung: frage.antworten
        .find((a) => a.korrekt)
        ?.feedback,
      warumNichtKorrekt: warumNichtKorrekt.length > 0 ? warumNichtKorrekt : undefined,
      signalart: this.detectSignalArt(frage),
      linkZuLernmodul:
        frage.lernmodulIds && frage.lernmodulIds.length > 0
          ? {
              modulId: frage.lernmodulIds[0],
              titel: this.getLernmodulTitel(frage.lernmodulIds[0]),
            }
          : undefined,
      linkZuGerät:
        frage.geräteIds && frage.geräteIds.length > 0
          ? {
              gerätId: frage.geräteIds[0],
              modell: this.getGerätModell(frage.geräteIds[0]),
            }
          : undefined,
    };
  }

  private detectSignalArt(frage: QuizFrage): string {
    const themaIds = new Set(frage.themenIds);
    if (themaIds.has("audio-midi")) {
      if (frage.themenIds.includes("aufnahme")) return "MIDI + Audio";
      return "Audio & MIDI";
    }
    if (themaIds.has("verbindungen")) return "Signal-Routing";
    if (themaIds.has("x32")) return "Audio-Mixing";
    return "Audio";
  }

  private getLernmodulTitel(modulId: string): string {
    const titel: { [key: string]: string } = {
      audio: "Audio Grundlagen",
      midi: "MIDI verstehen",
      routing: "Signal-Routing",
      x32_basis: "X32 Grundlagen",
      aufnahme: "Aufnahmetechniken",
      synthesizer: "Synthesizer-Grundlagen",
      sampler: "Sampler bedienen",
    };
    return titel[modulId] || "Lernmodul";
  }

  private getGerätModell(gerätId: string): string {
    const modelle: { [key: string]: string } = {
      "behringer-x32": "Behringer X32",
      "kawai-es920": "Kawai ES920",
      "roland-jv1010": "Roland JV-1010",
      "yamaha-tg500": "Yamaha TG500",
      "yamaha-su700": "Yamaha SU700",
      "akai-s2000": "Akai S2000",
      "roland-sound-canvas": "Roland Sound Canvas",
      "kenton-midi-thru": "Kenton MIDI Thru",
      "steinberg-cc121": "Steinberg CC121",
      "behringer-amp800": "Behringer AMP800",
      "novation-launchpad-pro": "Novation Launchpad Pro",
      "neumann-kms-104": "Neumann KMS 104",
      "audio-technica-at4035": "Audio-Technica AT4035",
      "presonus-eris-e5": "PreSonus Eris E5",
      "macbook-pro-m1": "MacBook Pro M1",
    };
    return modelle[gerätId] || "Gerät";
  }

  private updateThemenStatistik(session: QuizSession): void {
    const themenErgebnisse: { [themaId: string]: { richtig: number; gesamt: number } } =
      {};

    for (const antwort of session.antworten) {
      const frage = session.fragen.find((f) => f.id === antwort.frageId);
      if (!frage) continue;

      for (const themaId of frage.themenIds) {
        if (!themenErgebnisse[themaId]) {
          themenErgebnisse[themaId] = { richtig: 0, gesamt: 0 };
        }
        themenErgebnisse[themaId].gesamt += 1;
        if (antwort.richtig) {
          themenErgebnisse[themaId].richtig += 1;
        }
      }
    }

    const stärken: { themaId: string; prozent: number }[] = [];
    const schwächen: { themaId: string; prozent: number }[] = [];

    for (const [themaId, ergebnisse] of Object.entries(themenErgebnisse)) {
      const prozent = Math.round((ergebnisse.richtig / ergebnisse.gesamt) * 100);
      if (prozent >= 80) {
        stärken.push({ themaId, prozent });
      } else if (prozent < 60) {
        schwächen.push({ themaId, prozent });
      }
    }

    session.statistik.stärkenThemen = stärken.sort((a, b) => b.prozent - a.prozent);
    session.statistik.schwächenThemen = schwächen.sort((a, b) => a.prozent - b.prozent);
  }

  getLernfortschritt(): Lernfortschritt {
    try {
      const data = localStorage.getItem(LERNFORTSCHRITT_KEY);
      return data
        ? JSON.parse(data)
        : {
            absolvierteSessionenAusnahlmeBeginn: [],
            statistikProSchwierigkeitsgrad: [],
            häufigeFehlerThemen: [],
            unsichereThemen: [],
            empfohleneLernmodule: [],
            gesamtLernzeit: 0,
            letzterZugriff: new Date().toISOString(),
          };
    } catch {
      return {
        absolvierteSessionenAusnahlmeBeginn: [],
        statistikProSchwierigkeitsgrad: [],
        häufigeFehlerThemen: [],
        unsichereThemen: [],
        empfohleneLernmodule: [],
        gesamtLernzeit: 0,
        letzterZugriff: new Date().toISOString(),
      };
    }
  }

  updateLernfortschritt(sessionId: string): void {
    const session = this.getSession(sessionId);
    if (!session || !session.beendtAm) return;

    const lernfortschritt = this.getLernfortschritt();

    // Absolvierte Session hinzufügen
    const totalZeit = session.antworten.reduce((sum, a) => sum + a.zeitSecunden, 0);
    lernfortschritt.absolvierteSessionenAusnahlmeBeginn.push({
      sessionId: session.id,
      schwierigkeitsstufe: session.schwierigkeitsstufe,
      resultProzentr: session.statistik.prozentRichtig,
      gesamtZeitSecunden: totalZeit,
      timestamp: new Date().toISOString(),
    });

    // Statistik pro Schwierigkeitsgrad
    const stufeIndex = lernfortschritt.statistikProSchwierigkeitsgrad.findIndex(
      (s) => s.stufe === session.schwierigkeitsstufe
    );

    if (stufeIndex >= 0) {
      const stat = lernfortschritt.statistikProSchwierigkeitsgrad[stufeIndex];
      stat.anzahlVersuche += 1;
      stat.bestesErgebnis = Math.max(
        stat.bestesErgebnis,
        session.statistik.prozentRichtig
      );
      stat.durchschnittlich = Math.round(
        (stat.durchschnittlich * (stat.anzahlVersuche - 1) + session.statistik.prozentRichtig) /
          stat.anzahlVersuche
      );
    } else {
      lernfortschritt.statistikProSchwierigkeitsgrad.push({
        stufe: session.schwierigkeitsstufe,
        anzahlVersuche: 1,
        bestesErgebnis: session.statistik.prozentRichtig,
        durchschnittlich: session.statistik.prozentRichtig,
      });
    }

    // Häufige Fehler aktualisieren
    for (const schwacheThema of session.statistik.schwächenThemen) {
      const existiert = lernfortschritt.häufigeFehlerThemen.find(
        (t) => t.themaId === schwacheThema.themaId
      );
      if (existiert) {
        existiert.fehlerquote = (existiert.fehlerquote + (100 - schwacheThema.prozent)) / 2;
        existiert.letztesFehlerdatum = new Date().toISOString();
      } else {
        lernfortschritt.häufigeFehlerThemen.push({
          themaId: schwacheThema.themaId,
          fehlerquote: 100 - schwacheThema.prozent,
          letztesFehlerdatum: new Date().toISOString(),
        });
      }
    }

    // Unsichere Themen aktualisieren
    lernfortschritt.unsichereThemen = session.statistik.schwächenThemen.map(
      (t) => t.themaId
    );

    // Empfehlen Lernmodule
    lernfortschritt.empfohleneLernmodule = this.recommendLernmodule(
      session.statistik.schwächenThemen
    );

    // Gesamtlernzeit
    lernfortschritt.gesamtLernzeit += totalZeit;
    lernfortschritt.letzterZugriff = new Date().toISOString();
    lernfortschritt.letzteQuizSessionId = sessionId;

    localStorage.setItem(LERNFORTSCHRITT_KEY, JSON.stringify(lernfortschritt));
  }

  private recommendLernmodule(
    schwächenThemen: { themaId: string; prozent: number }[]
  ): string[] {
    const mapping: { [themaId: string]: string[] } = {
      "audio-midi": ["audio", "midi"],
      verbindungen: ["routing"],
      x32: ["x32_basis"],
      aufnahme: ["aufnahme"],
      sampler: ["sampler"],
      synthesizer: ["synthesizer"],
      fehlersuche: ["x32_basis"],
      geräte: ["audio"],
    };

    const empfehlung = new Set<string>();
    for (const schwache of schwächenThemen) {
      const module = mapping[schwache.themaId] || [];
      module.forEach((m) => empfehlung.add(m));
    }

    return Array.from(empfehlung).slice(0, 3);
  }

  getUnsichereFragenFürWiederholung(
    alleFragen: QuizFrage[],
    sessionId?: string
  ): QuizFrage[] {
    const lernfortschritt = this.getLernfortschritt();

    if (lernfortschritt.unsichereThemen.length === 0) {
      return [];
    }

    return alleFragen
      .filter((f) =>
        f.themenIds.some((t) => lernfortschritt.unsichereThemen.includes(t))
      )
      .filter((f) => f.aktiv && f.bestätigungsstatus === "bestätigt")
      .sort(() => Math.random() - 0.5)
      .slice(0, 8);
  }

  filterFragenFürVerwaltung(
    fragen: QuizFrage[],
    filter: QuizVerwaltungFilter
  ): QuizFrage[] {
    return fragen.filter((f) => {
      if (
        filter.aufgabentypen &&
        !filter.aufgabentypen.includes(f.aufgabentyp as any)
      ) {
        return false;
      }
      if (
        filter.schwierigkeitsstufen &&
        !filter.schwierigkeitsstufen.includes(f.schwierigkeitsstufe)
      ) {
        return false;
      }
      if (filter.themenIds && !f.themenIds.some((t) => filter.themenIds!.includes(t))) {
        return false;
      }
      if (filter.aktiv !== undefined && f.aktiv !== filter.aktiv) {
        return false;
      }
      if (
        filter.bestätigungsstatus &&
        filter.bestätigungsstatus !== "alle" &&
        f.bestätigungsstatus !== filter.bestätigungsstatus
      ) {
        return false;
      }
      return true;
    });
  }

  validateFragenQualität(fragen: QuizFrage[]): string[] {
    const issues: string[] = [];

    for (const f of fragen) {
      if (!f.titel || f.titel.trim().length === 0) {
        issues.push(`[${f.id}] Titel fehlt`);
      }
      if (!f.frage || f.frage.trim().length === 0) {
        issues.push(`[${f.id}] Fragetext fehlt`);
      }
      if (f.antworten.length < 2) {
        issues.push(`[${f.id}] Mindestens 2 Antworten erforderlich`);
      }
      if (f.richtigeAntwortIds.length === 0) {
        issues.push(`[${f.id}] Mindestens eine richtige Antwort erforderlich`);
      }
      const allAntwortIds = f.antworten.map((a) => a.id);
      for (const rId of f.richtigeAntwortIds) {
        if (!allAntwortIds.includes(rId)) {
          issues.push(`[${f.id}] Richtige Antwort ${rId} existiert nicht`);
        }
      }
      if (f.themenIds.length === 0) {
        issues.push(`[${f.id}] Mindestens ein Thema erforderlich`);
      }
      if (!f.lösungserklärung || f.lösungserklärung.trim().length === 0) {
        issues.push(`[${f.id}] Lösungserklärung fehlt`);
      }
      if (f.bestätigungsstatus !== "bestätigt") {
        issues.push(`[${f.id}] Frage nicht bestätigt`);
      }
    }

    return issues;
  }

  generateQualitätsbericht(fragen: QuizFrage[]): {
    gesamtFragen: number;
    bestätigteFragen: number;
    ungeprüfteFragen: number;
    aktiveFragen: number;
    frageTypenVerteilung: { [key: string]: number };
    schwierigkeitsverteilung: { [key: string]: number };
    themenVerteilung: { [key: string]: number };
    qualitätsprobleme: string[];
  } {
    const bericht = {
      gesamtFragen: fragen.length,
      bestätigteFragen: fragen.filter((f) => f.bestätigungsstatus === "bestätigt").length,
      ungeprüfteFragen: fragen.filter((f) => f.bestätigungsstatus !== "bestätigt").length,
      aktiveFragen: fragen.filter((f) => f.aktiv).length,
      frageTypenVerteilung: {} as { [key: string]: number },
      schwierigkeitsverteilung: {} as { [key: string]: number },
      themenVerteilung: {} as { [key: string]: number },
      qualitätsprobleme: this.validateFragenQualität(fragen),
    };

    for (const f of fragen) {
      bericht.frageTypenVerteilung[f.aufgabentyp] =
        (bericht.frageTypenVerteilung[f.aufgabentyp] || 0) + 1;
      const stufeKey = `Stufe ${f.schwierigkeitsstufe}`;
      bericht.schwierigkeitsverteilung[stufeKey] =
        (bericht.schwierigkeitsverteilung[stufeKey] || 0) + 1;
      for (const themaId of f.themenIds) {
        bericht.themenVerteilung[themaId] =
          (bericht.themenVerteilung[themaId] || 0) + 1;
      }
    }

    return bericht;
  }
}

export const quizEngine = new QuizEngineService();

// Quiz Engine Types
// Vollständiges Datenmodell für pädagogische Quiz mit erklärendem Feedback

export enum AufgabenTyp {
  KATEGORISIERUNG = "kategorisierung",
  VERBINDUNG_WÄHLEN = "verbindung-wählen",
  ERGEBNIS_BESTIMMEN = "ergebnis-bestimmen",
  AUDIO_MIDI_UNTERSCHEIDEN = "audio-midi-unterscheiden",
  FEHLER_FINDEN = "fehler-finden",
  UNMÖGLICH_ERKENNEN = "unmöglich-erkennen",
  KABEL_WÄHLEN = "kabel-wählen",
  SIGNALWEG_ORDNEN = "signalweg-ordnen",
  AUFNAHMEART_WÄHLEN = "aufnahmeart-wählen",
  STUDIOSITUATION = "studiosituation",
}

export enum Schwierigkeitsgrad {
  ENTDECKEN = 1,
  ANWENDEN = 2,
  VERSTEHEN = 3,
  STUDIO_PROFI = 4,
}

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
  aufgabentyp: AufgabenTyp;
  schwierigkeitsstufe: Schwierigkeitsgrad;
  themenIds: string[];
  geräteIds: string[];
  verbindungsregelIds?: string[];
  lernmodulIds?: string[];
  antworten: QuizAntwort[];
  richtigeAntwortIds: string[];
  mehrereAntwortenMöglich: boolean;
  lösungserklärung: string;
  hinweis?: string;
  bildOptional?: string;
  signalwegOptional?: {
    stufen: string[];
    erklärung: string;
  };
  quellenIds?: string[];
  bestätigungsstatus: "bestätigt" | "ungeprüft";
  aktiv: boolean;
  erstelltAm: string;
  geändertAm: string;
}

export interface QuizAntwortBenutzer {
  frageId: string;
  gegebeneAntwortIds: string[];
  richtig: boolean;
  zeitSecunden: number;
  feedback: QuizFeedback;
}

export interface QuizFeedback {
  richtig: boolean;
  punkteEarned: number;
  einfacheErklärung: string;
  technischeErgänzung?: string;
  warumNichtKorrekt?: string[];
  signalart?: string;
  linkZuLernmodul?: {
    modulId: string;
    kapitelId?: string;
    titel: string;
  };
  linkZuGerät?: {
    gerätId: string;
    modell: string;
  };
  signalflussGrafik?: string;
}

export interface QuizSession {
  id: string;
  startAm: string;
  beendtAm?: string;
  schwierigkeitsstufe: Schwierigkeitsgrad;
  gewählteThemen: string[];
  fragen: QuizFrage[];
  antworten: QuizAntwortBenutzer[];
  aktuelleFrageIndex: number;
  statistik: QuizSessionStatistik;
}

export interface QuizSessionStatistik {
  gesamtFragen: number;
  beantworteteFragenAnzahl: number;
  richtigeAnzahl: number;
  falschtAnzahl: number;
  prozentRichtig: number;
  durchschnittlicheZeitSecunden: number;
  stärkenThemen: { themaId: string; prozent: number }[];
  schwächenThemen: { themaId: string; prozent: number }[];
  falschtBeantworteteFragen: string[];
}

export interface Lernfortschritt {
  userId?: string; // Optional für zukünftige Anmeldung
  letzteQuizSessionId?: string;
  absolvierteSessionenAusnahlmeBeginn: {
    sessionId: string;
    schwierigkeitsstufe: Schwierigkeitsgrad;
    resultProzentr: number;
    gesamtZeitSecunden: number;
    timestamp: string;
  }[];
  statistikProSchwierigkeitsgrad: {
    stufe: Schwierigkeitsgrad;
    anzahlVersuche: number;
    bestesErgebnis: number;
    durchschnittlich: number;
  }[];
  häufigeFehlerThemen: {
    themaId: string;
    fehlerquote: number;
    letztesFehlerdatum: string;
  }[];
  unsichereThemen: string[];
  empfohleneLernmodule: string[];
  gesamtLernzeit: number; // Sekunden
  letzterZugriff: string;
}

export interface QuizVerwaltungFilter {
  aufgabentypen?: AufgabenTyp[];
  schwierigkeitsstufen?: Schwierigkeitsgrad[];
  themenIds?: string[];
  aktiv?: boolean;
  bestätigungsstatus?: "bestätigt" | "ungeprüft" | "alle";
}

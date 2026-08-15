// Learning Platform Types

export enum GeräteRolle {
  EINGABEGERÄT = "eingabegerät",
  KLANGERZEUGER = "klangerzeuger",
  SAMPLER = "sampler",
  MISCH_ROUTING = "misch-routing",
  AUFNAHME = "aufnahme",
  MIKROFON = "mikrofon",
  WIEDERGABE = "wiedergabe",
  STEUERGERÄT = "steuergerät",
  VERTEILER = "verteiler",
  HILFSGERÄT = "hilfsgerät",
}

export enum AufnahmeArt {
  AUDIO = "audio",
  MIDI = "midi",
  AUDIO_UND_MIDI = "audio-und-midi",
  KEINE = "keine",
}

export enum KompatibilitätsStatus {
  DIREKT = "direkt",
  MIT_ZUSATZGERÄT = "mit-zusatzgerät",
  MIT_KONFIGURATION = "mit-konfiguration",
  NICHT_SINNVOLL = "nicht-sinnvoll",
  TECHNISCH_UNMÖGLICH = "technisch-unmöglich",
  UNGEKLÄRT = "ungeklärt",
}

export interface GeräteRolle {
  id: string;
  gerätId: string;
  rolle: GeräteRolle;
  primär: boolean;
  erklärung: string;
  typischeSignale: string[];
  typischeEingänge: string[];
  typischeAusgänge: string[];
  alltagsvergleich: string;
  erstelltAm: string;
}

export interface Verbindungsregel {
  id: string;
  quellKategorieId?: string;
  quellGerätId?: string;
  quellAnschlussTyp: string;
  quellSignalTyp: string;
  zielKategorieId?: string;
  zielGerätId?: string;
  zielAnschlussTyp: string;
  zielSignalTyp: string;
  kompatibilitätsstatus: KompatibilitätsStatus;
  zweck?: string;
  benötigtesKabel?: string;
  zusatzgerät?: string;
  erwartetesErgebnis: string;
  aufnahmeart: AufnahmeArt;
  vorteile: string[];
  nachteile: string[];
  warnhinweis?: string;
  einfacheErklärung: string;
  technischeErklärung?: string;
  quellenIds?: string[];
  erstelltAm: string;
  geändertAm: string;
}

export interface QuizFrage {
  id: string;
  titel: string;
  fragetext: string;
  fragetyp: "kategorisierung" | "verbindung" | "was-passiert" | "fehler-finden" | "kabel-wählen" | "unmöglich-erkennen";
  schwierigkeitsgrad: 1 | 2 | 3 | 4;
  optionen: { text: string; korrekt: boolean; erklärung: string }[];
  einfachesTranscript: string;
  technischesTranscript?: string;
  linkZuGeräteseite?: string;
  linkZuLernseite?: string;
  quellenIds?: string[];
  erstelltAm: string;
}

export interface QuizErgebnis {
  id: string;
  frageId: string;
  beantwortet: boolean;
  benutzerAntwort: string;
  richtig: boolean;
  zeitSecunden: number;
  feedback?: string;
  zeitstempel: string;
}

export interface LernModul {
  id: string;
  titel: string;
  beschreibung: string;
  zielklasse: number; // 8-13
  kategorie: "grundlagen" | "geräte" | "verbindungen" | "aufnahme" | "x32" | "synthesizer" | "sampler" | "geschichte";
  kapitel: LernKapitel[];
  aufgaben: LernAufgabe[];
  quellenIds?: string[];
  erstelltAm: string;
  geändertAm: string;
}

export interface LernKapitel {
  id: string;
  nummer: number;
  titel: string;
  inhalt: string; // Markdown
  einfacheErklärung: string;
  technischeErklärung?: string;
  vergleiche: string[];
  schlüsselkonzepte: string[];
  häufigeFehler: string[];
}

export interface LernAufgabe {
  id: string;
  titel: string;
  beschreibung: string;
  aufgabentyp: "experimentieren" | "nachdenken" | "verbinden" | "erklären" | "fehler-finden";
  lösung?: string;
  tipps: string[];
  quellenIds?: string[];
}

export interface KlangKategorie {
  id: string;
  name: string;
  beschreibung: string;
  typischeWirkung: string;
  geeigneteMusiksile: string[];
  möglicheVerwendung: string;
  passendesStudio-Gerät: string[];
  beispielPresets?: string[];
  quellenIds?: string[];
  erstelltAm: string;
}

export interface KünstlerNutzung {
  id: string;
  künstler: string;
  band?: string;
  produzent?: string;
  song: string;
  album?: string;
  jahr?: number;
  verwendetesGerät: string;
  belegteNutzung: string;
  artDerNutzung: string;
  beschriebenerKlang: string;
  quelle: string;
  quellentyp: "interview" | "studiobericht" | "doku" | "fachzeitschrift" | "datenbank" | "video" | "sekundärquelle";
  verifizierungsstatus: "bestätigt" | "wahrscheinlich" | "umstritten" | "unbestätigt" | "widerlegt";
  quellenIds?: string[];
  notizen?: string;
  erstelltAm: string;
  geändertAm: string;
}

export interface Lernfortschritt {
  id: string;
  modulId: string;
  kapitelId?: string;
  status: "nicht-begonnen" | "in-bearbeitung" | "abgeschlossen";
  prozent: number;
  besuchtAm: string;
  abgeschlossenAm?: string;
}

export interface QuizStatistik {
  gesamt: number;
  richtig: number;
  falsch: number;
  prozent: number;
  durchschnittlicheZeit: number;
  letzterVersuch: string;
  häufigeFehler: { frageId: string; fehlerquote: number }[];
}

// Enums
export enum GeräteKategorie {
  DIGITALPIANO = "digitalpiano",
  SYNTHESIZER = "synthesizer",
  SOUNDMODUL = "soundmodul",
  SAMPLER = "sampler",
  MISCHPULT = "mischpult",
  COMPUTER = "computer",
  AUDIOINTERFACE = "audiointerface",
  MIDI_GERÄT = "midi-gerät",
  MONITOR = "monitor",
  MIKROFON = "mikrofon",
  KOPFHÖRERVERSTÄRKER = "kopfhörerverstärker",
  CONTROLLER = "controller",
  DI_BOX = "di-box",
  EFFEKTGERÄT = "effektgerät",
  PATCHBAY = "patchbay",
  SONSTIGES = "sonstiges",
}

export enum AnschlussTyp {
  XLR = "xlr",
  KLINKE_6_3 = "klinke-6.3",
  KLINKE_3_5 = "klinke-3.5",
  CINCH = "cinch",
  DIN_MIDI = "din-midi",
  USB_B = "usb-b",
  USB_A = "usb-a",
  USB_C = "usb-c",
  ETHERNET = "ethernet",
  ADAT = "adat",
  S_PDIF = "s-pdif",
  IEC_STROM = "iec-strom",
  UNBEKANNT = "unbekannt",
}

export enum SignalTyp {
  AUDIO_ANALOG = "audio-analog",
  AUDIO_DIGITAL = "audio-digital",
  MIDI = "midi",
  USB = "usb",
  NETZWERK = "netzwerk",
  STROM = "strom",
  STEUERUNG = "steuerung",
}

export enum AnschlussRichtung {
  EINGANG = "eingang",
  AUSGANG = "ausgang",
  BIDIREKTIONAL = "bidirektional",
}

export enum KabelStatus {
  ANGESCHLOSSEN = "angeschlossen",
  VERFÜGBAR = "verfügbar",
  DEFEKT = "defekt",
  ZU_PRÜFEN = "zu-prüfen",
  AUSGELIEHEN = "ausgeliehen",
  UNBEKANNT = "unbekannt",
}

export enum VerbindungsStatus {
  AKTIV = "aktiv",
  INAKTIV = "inaktiv",
  UNGEKLÄRT = "ungeklärt",
  DEFEKT = "defekt",
}

export enum GeräteStatus {
  AKTIV = "aktiv",
  INAKTIV = "inaktiv",
  REPARATUR = "reparatur",
  ZU_PRÜFEN = "zu-prüfen",
  AUSGELIEHEN = "ausgeliehen",
}

export enum DokumentationsStatus {
  VOLLSTÄNDIG = "vollständig",
  TEILWEISE_DOKUMENTIERT = "teilweise-dokumentiert",
  UNGEKLÄRT = "ungeklärt",
  NICHT_BEGONNEN = "nicht-begonnen",
  ZU_PRÜFEN = "zu-prüfen",
}

export enum ÄnderungsTyp {
  ERSTELLT = "erstellt",
  BEARBEITET = "bearbeitet",
  GELÖSCHT = "gelöscht",
  DUPLIZIERT = "dupliziert",
  STATUS_GEÄNDERT = "status-geändert",
}

export enum FotoStatus {
  UNBEARBEITET = "unbearbeitet",
  AUSGEWERTET = "ausgewertet",
  TEILWEISE_AUSGEWERTET = "teilweise-ausgewertet",
  ZU_PRÜFEN = "zu-prüfen",
  ARCHIVIERT = "archiviert",
}

export enum BeobachtungsTyp {
  GERÄT_SICHTBAR = "gerät-sichtbar",
  MODELLBEZEICHNUNG = "modellbezeichnung",
  ANSCHLUSS_SICHTBAR = "anschluss-sichtbar",
  KABEL_SICHTBAR = "kabel-sichtbar",
  STECKER_SICHTBAR = "stecker-sichtbar",
  KABELVERLAUF = "kabelverlauf",
  GERÄTEPOSITION = "geräteposition",
  RACKPOSITION = "rackposition",
  BESCHRIFTUNG = "beschriftung",
  ZUSTAND = "zustand",
  SONSTIGE = "sonstige",
}

export enum Sicherheitsgrad {
  EINDEUTIG = "eindeutig",
  WAHRSCHEINLICH = "wahrscheinlich",
  TEILWEISE_VERDECKT = "teilweise-verdeckt",
  UNSICHER = "unsicher",
  NICHT_ERKENNBAR = "nicht-erkennbar",
}

export enum AbleitungsTyp {
  DIREKTE_ÜBERNAHME = "direkte-übernahme",
  TECHNISCHE_INTERPRETATION = "technische-interpretation",
  VERMUTUNG = "vermutung",
  NUTZERANGABE = "nutzerangabe",
  FUNKTIONSTEST = "funktionstest",
  HERSTELLERDOKUMENTATION = "herstellerdokumentation",
}

export enum BestätigungsStatus {
  UNBESTÄTIGT = "unbestätigt",
  ZU_PRÜFEN = "zu-prüfen",
  DURCH_FOTO = "durch-foto",
  DURCH_NUTZER = "durch-nutzer",
  TECHNISCH_GETESTET = "technisch-getestet",
  WIDERSPRÜCHLICH = "widersprüchlich",
  VERWORFEN = "verworfen",
}

export enum PrüfaufgabenStatus {
  OFFEN = "offen",
  IN_PRÜFUNG = "in-prüfung",
  BESTÄTIGT = "bestätigt",
  KORRIGIERT = "korrigiert",
  NICHT_PRÜFBAR = "nicht-prüfbar",
  ERLEDIGT = "erledigt",
}

// Photo & Verification Models
export interface Foto {
  id: string;
  dateiname: string;
  titel: string;
  beschreibung: string;
  aufnahmedatum?: string;
  hochgeladenAm: string;
  quelle: string; // "studio-foto", "upload", "archiv"
  raumId?: string;
  abgebildeteGerätIds: string[];
  status: FotoStatus;
  notizen?: string;
  erstelltAm: string;
  geändertAm: string;
}

export interface Beobachtung {
  id: string;
  fotoId: string;
  objekttyp: string; // "gerät", "anschluss", "kabel", "verbindung", "positionierung"
  objektId?: string;
  beobachtungstyp: BeobachtungsTyp;
  beschreibung: string;
  sichtbarerText?: string;
  sicherheitsgrad: Sicherheitsgrad;
  ausschnittBeschreibung?: string; // z.B. "oberer rechter Bereich", "Rückseite"
  geprüft: boolean;
  geprüftVon?: string;
  geprüftAm?: string;
  notizen?: string;
  erstelltAm: string;
  geändertAm: string;
}

export interface Ableitung {
  id: string;
  beobachtungsIds: string[];
  datentyp: string; // "gerät", "anschluss", "kabel", "verbindung", etc.
  datensatzId?: string;
  aussage: string; // z.B. "Yamaha SU700 hat MIDI Out Anschluss"
  ableitungsTyp: AbleitungsTyp;
  sicherheitsgrad: Sicherheitsgrad;
  bestätigungsstatus: BestätigungsStatus;
  begründung: string;
  bestätigtVon?: string;
  bestätigtAm?: string;
  notizen?: string;
  erstelltAm: string;
  geändertAm: string;
}

export interface Prüfaufgabe {
  id: string;
  titel: string;
  beschreibung: string;
  bezogenesObjekt: string; // Typ + ID, z.B. "verbindung:conn-su700-s2000-midi"
  priorität: "niedrig" | "mittel" | "hoch" | "kritisch";
  status: PrüfaufgabenStatus;
  erstelltAm: string;
  erledigtAm?: string;
  prüfergebnis?: string;
  notizen?: string;
}

// Extended Models with Source Tracking
export interface QuellenTracking {
  quellenIds?: string[]; // Foto-IDs
  ableitungsIds?: string[];
  bestätigungsstatus?: BestätigungsStatus;
  sicherheitsgrad?: Sicherheitsgrad;
  letztePrüfungAm?: string;
  geprüftVon?: string;
  prüfnotiz?: string;
}

// Models
export interface Hersteller {
  id: string;
  name: string;
  website?: string;
  notizen?: string;
  erstelltAm: string;
  geändertAm: string;
}

export interface Gerät extends QuellenTracking {
  id: string;
  slug: string;
  name: string;
  herstellerId: string;
  modell: string;
  geräteKategorie: GeräteKategorie;
  kurzbeschreibung: string;
  ausführlicheBeschreibung: string;
  standort: string;
  rackPosition?: string;
  status: GeräteStatus;
  inventarStatus: string; // z.B. "im Studio", "verliehen", "verkauft"
  foto?: string;
  handbuchUrl?: string;
  seriennummer?: string;
  firmware?: string;
  stromversorgung: string; // z.B. "100-240V AC", "USB Power"
  notizen?: string;
  dokumentationsStatus: DokumentationsStatus;
  position?: { x: number; y: number }; // für Studioansicht
  erstelltAm: string;
  geändertAm: string;
}

export interface Anschluss extends QuellenTracking {
  id: string;
  gerätId: string;
  name: string;
  anschlussTyp: AnschlussTyp;
  signalTyp: SignalTyp;
  richtung: AnschlussRichtung;
  kanal?: number | string; // z.B. 1, "L", "R", "1-2"
  beschriftungAmGerät?: string;
  symmetrisch: boolean;
  phantomspannungErlaubt: boolean;
  mehrkanalig: boolean;
  status: string; // "funktionsfähig", "zu prüfen", "defekt"
  notizen?: string;
  erstelltAm: string;
  geändertAm: string;
}

export interface Kabel {
  id: string;
  bezeichnung: string;
  kabelTyp: string; // "XLR 3-pin balanced", "USB 2.0 AB", etc.
  steckerA: AnschlussTyp;
  steckerB: AnschlussTyp;
  signalTyp: SignalTyp;
  länge: number; // in Metern
  farbe: string;
  inventarnummer?: string;
  status: KabelStatus;
  lagerort: string;
  notizen?: string;
  erstelltAm: string;
  geändertAm: string;
}

export interface Verbindung {
  id: string;
  quellAnschlussId: string;
  zielAnschlussId: string;
  kabelId?: string;
  signalTyp: SignalTyp;
  signalrichtung: string; // beschreibend, z.B. "Quelle → Ziel"
  zweck: string; // z.B. "Monitoring", "Aufnahme", "Steuerung"
  status: VerbindungsStatus;
  dauerhaft: boolean;
  bestätigt: boolean;
  notizen?: string;
  erstelltAm: string;
  geändertAm: string;
}

export interface SignalWeg {
  id: string;
  name: string;
  beschreibung: string;
  verwendungszweck: string;
  schritte: string[]; // Array von Anschluss-IDs in Reihenfolge
  startGerätId: string;
  zielGerätId: string;
  status: VerbindungsStatus;
  bestätigt: boolean;
  notizen?: string;
  erstelltAm: string;
  geändertAm: string;
}

export interface WissensArtikel {
  id: string;
  titel: string;
  kategorie: string;
  inhalt: string;
  wichtigePunkte: string[];
  schwierigkeit: "anfänger" | "mittelstufe" | "fortgeschritten";
  tags: string[];
  dokumentationsStatus: DokumentationsStatus;
  erstelltAm: string;
  geändertAm: string;
}

export interface Fehler {
  id: string;
  titel: string;
  symptom: string;
  ursachen: string[];
  lösungsschritte: string[];
  betroffeneGeräte: string[]; // Gerät-IDs
  verwandteFehler: string[]; // Fehler-IDs
  häufigkeit: "sehr-häufig" | "häufig" | "gelegentlich" | "selten";
  schweregrad: "kritisch" | "hoch" | "mittel" | "niedrig";
  dokumentationsStatus: DokumentationsStatus;
  erstelltAm: string;
  geändertAm: string;
}

export interface ÄnderungsEintrag {
  id: string;
  zeitpunkt: string;
  datenTyp: string; // "geräte", "anschlüsse", "kabel", etc.
  datensatzId: string;
  datensatzName: string;
  änderungsTyp: ÄnderungsTyp;
  vorgängerZustand?: any;
  neuerZustand?: any;
  notizen?: string;
}

export interface StudioDaten {
  version: string;
  geräte: Gerät[];
  anschlüsse: Anschluss[];
  kabel: Kabel[];
  verbindungen: Verbindung[];
  signalWege: SignalWeg[];
  wissensArtikel: WissensArtikel[];
  fehler: Fehler[];
  hersteller: Hersteller[];
  änderungsProtokoll: ÄnderungsEintrag[];
  fotos?: Foto[];
  beobachtungen?: Beobachtung[];
  ableitungen?: Ableitung[];
  prüfaufgaben?: Prüfaufgabe[];
}

export interface DashboardStatistiken {
  gesamtGeräte: number;
  vollständigDokumentiert: number;
  teilvÕnösDokumentiert: number;
  ungeklärt: number;
  gesamtAnschlüsse: number;
  gesamtVerbindungen: number;
  ungeklärteVerbindungen: number;
  gesamtKabel: number;
  aktivKabel: number;
  kabelZuPrüfen: number;
}

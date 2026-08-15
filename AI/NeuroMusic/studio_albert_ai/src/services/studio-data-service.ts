import initialData from "../data/initial-studio-data.json";
import {
  StudioDaten,
  Gerät,
  Anschluss,
  Kabel,
  Verbindung,
  SignalWeg,
  ÄnderungsEintrag,
  ÄnderungsTyp,
  DashboardStatistiken,
  DokumentationsStatus,
  Hersteller,
  WissensArtikel,
  Fehler,
} from "../types/index";

const STORAGE_KEY = "studio-albert-data";
const STORAGE_VERSION_KEY = "studio-albert-version";

class StudioDataService {
  private data: StudioDaten | null = null;

  /**
   * Lade Daten: Zuerst localStorage (mit lokalen Änderungen),
   * fallback auf Initial-Daten
   */
  loadData(): StudioDaten {
    if (this.data) {
      return this.data;
    }

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        this.data = JSON.parse(stored);
        return this.data;
      }
    } catch (e) {
      console.error("Fehler beim Laden von localStorage:", e);
    }

    this.data = JSON.parse(JSON.stringify(initialData)) as StudioDaten;
    return this.data;
  }

  /**
   * Speichere Daten in localStorage
   */
  saveData(data: StudioDaten): void {
    this.data = data;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    localStorage.setItem(STORAGE_VERSION_KEY, data.version);
  }

  /**
   * Gebe aktuell geladene Daten zurück
   */
  getData(): StudioDaten {
    return this.loadData();
  }

  /**
   * Setze Daten auf Ausgangszustand zurück
   */
  resetToDefaults(): StudioDaten {
    this.data = JSON.parse(JSON.stringify(initialData)) as StudioDaten;
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(STORAGE_VERSION_KEY);
    return this.data;
  }

  /**
   * Exportiere Daten als JSON
   */
  exportData(data: StudioDaten): string {
    return JSON.stringify(
      {
        ...data,
        exportedAt: new Date().toISOString(),
      },
      null,
      2
    );
  }

  /**
   * Importiere Daten aus JSON mit Validierung
   */
  importData(
    jsonString: string
  ): {
    success: boolean;
    data?: StudioDaten;
    error?: string;
    preview?: {
      neueGeräte: number;
      geändertGeräte: number;
      neueDatensätze: number;
    };
  } {
    try {
      const imported = JSON.parse(jsonString) as StudioDaten;

      // Validierung
      if (
        !imported.version ||
        !Array.isArray(imported.geräte) ||
        !Array.isArray(imported.änderungsProtokoll)
      ) {
        return {
          success: false,
          error: "Ungültiges Dateiformat",
        };
      }

      const currentData = this.getData();

      // Preview: zähle neue und geänderte Datensätze
      const neueGeräte = imported.geräte.filter(
        (g) => !currentData.geräte.find((cg) => cg.id === g.id)
      ).length;

      const geändertGeräte = imported.geräte.filter((g) => {
        const current = currentData.geräte.find((cg) => cg.id === g.id);
        return current && JSON.stringify(current) !== JSON.stringify(g);
      }).length;

      const neueDatensätze =
        (imported.anschlüsse?.length || 0) +
        (imported.kabel?.length || 0) +
        (imported.verbindungen?.length || 0);

      return {
        success: true,
        data: imported,
        preview: {
          neueGeräte,
          geändertGeräte,
          neueDatensätze,
        },
      };
    } catch (e) {
      return {
        success: false,
        error: `Parse-Fehler: ${String(e)}`,
      };
    }
  }

  /**
   * Merge importierte Daten mit aktuellen Daten
   */
  mergeImportedData(importedData: StudioDaten, strategy: "merge" | "overwrite" = "merge"): StudioDaten {
    const currentData = this.getData();

    if (strategy === "overwrite") {
      this.saveData(importedData);
      return importedData;
    }

    // Merge-Strategie: neue Datensätze hinzufügen, existierende überschreiben
    const merged: StudioDaten = {
      ...currentData,
      geräte: this.mergeArrayById(currentData.geräte, importedData.geräte),
      anschlüsse: this.mergeArrayById(currentData.anschlüsse, importedData.anschlüsse),
      kabel: this.mergeArrayById(currentData.kabel, importedData.kabel),
      verbindungen: this.mergeArrayById(
        currentData.verbindungen,
        importedData.verbindungen
      ),
      signalWege: this.mergeArrayById(currentData.signalWege, importedData.signalWege),
      wissensArtikel: this.mergeArrayById(
        currentData.wissensArtikel,
        importedData.wissensArtikel
      ),
      fehler: this.mergeArrayById(currentData.fehler, importedData.fehler),
      hersteller: this.mergeArrayById(currentData.hersteller, importedData.hersteller),
    };

    this.saveData(merged);
    return merged;
  }

  private mergeArrayById<T extends { id: string }>(current: T[], imported: T[]): T[] {
    const map = new Map(current.map((item) => [item.id, item]));
    imported.forEach((item) => {
      map.set(item.id, item);
    });
    return Array.from(map.values());
  }

  /**
   * Berechne Dashboard-Statistiken aus Daten
   */
  calculateStatistics(): DashboardStatistiken {
    const data = this.getData();

    const vollständigDokumentiert = data.geräte.filter(
      (g) => g.dokumentationsStatus === "vollständig"
    ).length;

    const teilweiseDokumentiert = data.geräte.filter(
      (g) => g.dokumentationsStatus === "teilweise-dokumentiert"
    ).length;

    const ungeklärt = data.geräte.filter(
      (g) => g.dokumentationsStatus === "ungeklärt"
    ).length;

    const ungeklärteVerbindungen = data.verbindungen.filter(
      (v) => v.status === "ungeklärt" || !v.bestätigt
    ).length;

    const aktivKabel = data.kabel.filter(
      (k) => k.status === "angeschlossen"
    ).length;

    const kabelZuPrüfen = data.kabel.filter(
      (k) => k.status === "zu-prüfen"
    ).length;

    return {
      gesamtGeräte: data.geräte.length,
      vollständigDokumentiert,
      teilvÕnösDokumentiert: teilweiseDokumentiert,
      ungeklärt,
      gesamtAnschlüsse: data.anschlüsse.length,
      gesamtVerbindungen: data.verbindungen.length,
      ungeklärteVerbindungen,
      gesamtKabel: data.kabel.length,
      aktivKabel,
      kabelZuPrüfen,
    };
  }

  /**
   * Füge Änderung zu Änderungsprotokoll hinzu
   */
  addChangeLog(
    datenTyp: string,
    datensatzId: string,
    datensatzName: string,
    änderungsTyp: ÄnderungsTyp,
    vorgängerZustand?: any,
    neuerZustand?: any,
    notizen?: string
  ): void {
    const data = this.getData();

    const eintrag: ÄnderungsEintrag = {
      id: `change-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      zeitpunkt: new Date().toISOString(),
      datenTyp,
      datensatzId,
      datensatzName,
      änderungsTyp,
      vorgängerZustand,
      neuerZustand,
      notizen,
    };

    data.änderungsProtokoll.unshift(eintrag); // neueste oben
    if (data.änderungsProtokoll.length > 1000) {
      data.änderungsProtokoll = data.änderungsProtokoll.slice(0, 1000);
    }

    this.saveData(data);
  }

  /**
   * CRUD: Gerät
   */
  getGerät(id: string): Gerät | undefined {
    return this.getData().geräte.find((g) => g.id === id);
  }

  createGerät(gerät: Omit<Gerät, "id" | "erstelltAm" | "geändertAm">): Gerät {
    const data = this.getData();

    const newGerät: Gerät = {
      ...gerät,
      id: `device-${Date.now()}`,
      erstelltAm: new Date().toISOString(),
      geändertAm: new Date().toISOString(),
    };

    data.geräte.push(newGerät);
    this.saveData(data);
    this.addChangeLog("geräte", newGerät.id, newGerät.name, ÄnderungsTyp.ERSTELLT, undefined, newGerät);

    return newGerät;
  }

  updateGerät(id: string, updates: Partial<Gerät>): Gerät | null {
    const data = this.getData();
    const gerät = data.geräte.find((g) => g.id === id);

    if (!gerät) return null;

    const oldData = JSON.parse(JSON.stringify(gerät));
    Object.assign(gerät, updates, { geändertAm: new Date().toISOString() });

    this.saveData(data);
    this.addChangeLog(
      "geräte",
      id,
      gerät.name,
      ÄnderungsTyp.BEARBEITET,
      oldData,
      gerät
    );

    return gerät;
  }

  deleteGerät(id: string): boolean {
    const data = this.getData();
    const index = data.geräte.findIndex((g) => g.id === id);

    if (index === -1) return false;

    const gerät = data.geräte[index];
    data.geräte.splice(index, 1);

    // Entferne auch zugehörige Anschlüsse
    data.anschlüsse = data.anschlüsse.filter((a) => a.gerätId !== id);

    this.saveData(data);
    this.addChangeLog("geräte", id, gerät.name, ÄnderungsTyp.GELÖSCHT, gerät, undefined);

    return true;
  }

  /**
   * CRUD: Anschluss
   */
  getAnschlüsse(gerätId: string): Anschluss[] {
    return this.getData().anschlüsse.filter((a) => a.gerätId === gerätId);
  }

  createAnschluss(
    anschluss: Omit<Anschluss, "id" | "erstelltAm" | "geändertAm">
  ): Anschluss {
    const data = this.getData();

    const newAnschluss: Anschluss = {
      ...anschluss,
      id: `connector-${Date.now()}`,
      erstelltAm: new Date().toISOString(),
      geändertAm: new Date().toISOString(),
    };

    data.anschlüsse.push(newAnschluss);
    this.saveData(data);
    this.addChangeLog(
      "anschlüsse",
      newAnschluss.id,
      newAnschluss.name,
      ÄnderungsTyp.ERSTELLT,
      undefined,
      newAnschluss
    );

    return newAnschluss;
  }

  updateAnschluss(id: string, updates: Partial<Anschluss>): Anschluss | null {
    const data = this.getData();
    const anschluss = data.anschlüsse.find((a) => a.id === id);

    if (!anschluss) return null;

    const oldData = JSON.parse(JSON.stringify(anschluss));
    Object.assign(anschluss, updates, { geändertAm: new Date().toISOString() });

    this.saveData(data);
    this.addChangeLog(
      "anschlüsse",
      id,
      anschluss.name,
      ÄnderungsTyp.BEARBEITET,
      oldData,
      anschluss
    );

    return anschluss;
  }

  deleteAnschluss(id: string): boolean {
    const data = this.getData();
    const index = data.anschlüsse.findIndex((a) => a.id === id);

    if (index === -1) return false;

    const anschluss = data.anschlüsse[index];
    data.anschlüsse.splice(index, 1);

    // Entferne auch zugehörige Verbindungen
    data.verbindungen = data.verbindungen.filter(
      (v) => v.quellAnschlussId !== id && v.zielAnschlussId !== id
    );

    this.saveData(data);
    this.addChangeLog(
      "anschlüsse",
      id,
      anschluss.name,
      ÄnderungsTyp.GELÖSCHT,
      anschluss,
      undefined
    );

    return true;
  }

  /**
   * CRUD: Kabel
   */
  getKabel(id: string): Kabel | undefined {
    return this.getData().kabel.find((k) => k.id === id);
  }

  createKabel(kabel: Omit<Kabel, "id" | "erstelltAm" | "geändertAm">): Kabel {
    const data = this.getData();

    const newKabel: Kabel = {
      ...kabel,
      id: `cable-${Date.now()}`,
      erstelltAm: new Date().toISOString(),
      geändertAm: new Date().toISOString(),
    };

    data.kabel.push(newKabel);
    this.saveData(data);
    this.addChangeLog("kabel", newKabel.id, newKabel.bezeichnung, ÄnderungsTyp.ERSTELLT, undefined, newKabel);

    return newKabel;
  }

  updateKabel(id: string, updates: Partial<Kabel>): Kabel | null {
    const data = this.getData();
    const kabel = data.kabel.find((k) => k.id === id);

    if (!kabel) return null;

    const oldData = JSON.parse(JSON.stringify(kabel));
    Object.assign(kabel, updates, { geändertAm: new Date().toISOString() });

    this.saveData(data);
    this.addChangeLog("kabel", id, kabel.bezeichnung, ÄnderungsTyp.BEARBEITET, oldData, kabel);

    return kabel;
  }

  deleteKabel(id: string): boolean {
    const data = this.getData();
    const index = data.kabel.findIndex((k) => k.id === id);

    if (index === -1) return false;

    const kabel = data.kabel[index];
    data.kabel.splice(index, 1);

    // Entferne auch Verbindungen, die dieses Kabel nutzen
    data.verbindungen = data.verbindungen.filter((v) => v.kabelId !== id);

    this.saveData(data);
    this.addChangeLog("kabel", id, kabel.bezeichnung, ÄnderungsTyp.GELÖSCHT, kabel, undefined);

    return true;
  }

  /**
   * CRUD: Verbindung
   */
  getVerbindung(id: string): Verbindung | undefined {
    return this.getData().verbindungen.find((v) => v.id === id);
  }

  createVerbindung(
    verbindung: Omit<Verbindung, "id" | "erstelltAm" | "geändertAm">
  ): Verbindung {
    const data = this.getData();

    const newVerbindung: Verbindung = {
      ...verbindung,
      id: `connection-${Date.now()}`,
      erstelltAm: new Date().toISOString(),
      geändertAm: new Date().toISOString(),
    };

    data.verbindungen.push(newVerbindung);
    this.saveData(data);
    this.addChangeLog(
      "verbindungen",
      newVerbindung.id,
      `${newVerbindung.quellAnschlussId} → ${newVerbindung.zielAnschlussId}`,
      ÄnderungsTyp.ERSTELLT,
      undefined,
      newVerbindung
    );

    return newVerbindung;
  }

  updateVerbindung(id: string, updates: Partial<Verbindung>): Verbindung | null {
    const data = this.getData();
    const verbindung = data.verbindungen.find((v) => v.id === id);

    if (!verbindung) return null;

    const oldData = JSON.parse(JSON.stringify(verbindung));
    Object.assign(verbindung, updates, { geändertAm: new Date().toISOString() });

    this.saveData(data);
    this.addChangeLog(
      "verbindungen",
      id,
      `${verbindung.quellAnschlussId} → ${verbindung.zielAnschlussId}`,
      ÄnderungsTyp.BEARBEITET,
      oldData,
      verbindung
    );

    return verbindung;
  }

  deleteVerbindung(id: string): boolean {
    const data = this.getData();
    const index = data.verbindungen.findIndex((v) => v.id === id);

    if (index === -1) return false;

    const verbindung = data.verbindungen[index];
    data.verbindungen.splice(index, 1);

    this.saveData(data);
    this.addChangeLog(
      "verbindungen",
      id,
      `${verbindung.quellAnschlussId} → ${verbindung.zielAnschlussId}`,
      ÄnderungsTyp.GELÖSCHT,
      verbindung,
      undefined
    );

    return true;
  }

  /**
   * Hersteller
   */
  getHersteller(id: string): Hersteller | undefined {
    return this.getData().hersteller.find((h) => h.id === id);
  }

  getAllHersteller(): Hersteller[] {
    return this.getData().hersteller;
  }
}

export const studioDataService = new StudioDataService();

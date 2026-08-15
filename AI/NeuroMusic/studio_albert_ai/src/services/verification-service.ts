import {
  Foto,
  Beobachtung,
  Ableitung,
  Prüfaufgabe,
  FotoStatus,
  BeobachtungsTyp,
  Sicherheitsgrad,
  AbleitungsTyp,
  BestätigungsStatus,
  PrüfaufgabenStatus,
} from "../types/index";
import { studioDataService } from "./studio-data-service";

class VerificationService {
  /**
   * Erstelle ein neues Foto
   */
  createFoto(foto: Omit<Foto, "id" | "erstelltAm" | "geändertAm">): Foto {
    const data = studioDataService.getData();

    const newFoto: Foto = {
      ...foto,
      id: `foto-${Date.now()}`,
      erstelltAm: new Date().toISOString(),
      geändertAm: new Date().toISOString(),
    };

    if (!data.fotos) data.fotos = [];
    data.fotos.push(newFoto);
    studioDataService.saveData(data);

    return newFoto;
  }

  /**
   * Erstelle eine Beobachtung aus einem Foto
   */
  createBeobachtung(
    beobachtung: Omit<Beobachtung, "id" | "erstelltAm" | "geändertAm">
  ): Beobachtung {
    const data = studioDataService.getData();

    const newBeobachtung: Beobachtung = {
      ...beobachtung,
      id: `beob-${Date.now()}`,
      erstelltAm: new Date().toISOString(),
      geändertAm: new Date().toISOString(),
    };

    if (!data.beobachtungen) data.beobachtungen = [];
    data.beobachtungen.push(newBeobachtung);

    // Markiere Foto als teilweise ausgewertet
    if (data.fotos) {
      const foto = data.fotos.find((f) => f.id === beobachtung.fotoId);
      if (foto && foto.status === "unbearbeitet") {
        foto.status = "teilweise-ausgewertet";
        foto.geändertAm = new Date().toISOString();
      }
    }

    studioDataService.saveData(data);
    return newBeobachtung;
  }

  /**
   * Erstelle eine Ableitung aus Beobachtungen
   */
  createAbleitung(
    ableitung: Omit<Ableitung, "id" | "erstelltAm" | "geändertAm">
  ): Ableitung {
    const data = studioDataService.getData();

    const newAbleitung: Ableitung = {
      ...ableitung,
      id: `ableit-${Date.now()}`,
      erstelltAm: new Date().toISOString(),
      geändertAm: new Date().toISOString(),
    };

    if (!data.ableitungen) data.ableitungen = [];
    data.ableitungen.push(newAbleitung);

    // Erzeuge Prüfaufgabe, falls Status unbestätigt
    if (
      newAbleitung.bestätigungsstatus === BestätigungsStatus.UNBESTÄTIGT ||
      newAbleitung.bestätigungsstatus === BestätigungsStatus.ZU_PRÜFEN
    ) {
      this.createPrüfaufgabe({
        titel: `Ableitung prüfen: ${newAbleitung.aussage}`,
        beschreibung: `Verifiziere die Ableitung: ${newAbleitung.aussage}\n\nBegründung: ${newAbleitung.begründung}`,
        bezogenesObjekt: newAbleitung.datentyp + (newAbleitung.datensatzId ? `:${newAbleitung.datensatzId}` : ""),
        priorität: newAbleitung.sicherheitsgrad === Sicherheitsgrad.EINDEUTIG ? "mittel" : "hoch",
        status: PrüfaufgabenStatus.OFFEN,
      });
    }

    studioDataService.saveData(data);
    return newAbleitung;
  }

  /**
   * Bestätige eine Ableitung
   */
  confirmAbleitung(
    ableitungsId: string,
    bestätigtVon: string,
    notizen?: string
  ): Ableitung | null {
    const data = studioDataService.getData();
    if (!data.ableitungen) return null;

    const ableitung = data.ableitungen.find((a) => a.id === ableitungsId);
    if (!ableitung) return null;

    ableitung.bestätigungsstatus = BestätigungsStatus.DURCH_NUTZER;
    ableitung.bestätigtVon = bestätigtVon;
    ableitung.bestätigtAm = new Date().toISOString();
    if (notizen) ableitung.notizen = notizen;
    ableitung.geändertAm = new Date().toISOString();

    studioDataService.saveData(data);

    // Markiere entsprechende Prüfaufgabe als erledigt
    this.completePrüfaufgabeForAbleitung(ableitungsId);

    return ableitung;
  }

  /**
   * Markiere eine Ableitung als zu prüfen
   */
  markAbleitungAsUncertain(ableitungsId: string): Ableitung | null {
    const data = studioDataService.getData();
    if (!data.ableitungen) return null;

    const ableitung = data.ableitungen.find((a) => a.id === ableitungsId);
    if (!ableitung) return null;

    ableitung.bestätigungsstatus = BestätigungsStatus.ZU_PRÜFEN;
    ableitung.geändertAm = new Date().toISOString();

    studioDataService.saveData(data);
    return ableitung;
  }

  /**
   * Verwerfe eine Ableitung
   */
  rejectAbleitung(ableitungsId: string, grund?: string): Ableitung | null {
    const data = studioDataService.getData();
    if (!data.ableitungen) return null;

    const ableitung = data.ableitungen.find((a) => a.id === ableitungsId);
    if (!ableitung) return null;

    ableitung.bestätigungsstatus = BestätigungsStatus.VERWORFEN;
    if (grund) ableitung.notizen = grund;
    ableitung.geändertAm = new Date().toISOString();

    studioDataService.saveData(data);

    // Markiere entsprechende Prüfaufgabe als erledigt
    this.completePrüfaufgabeForAbleitung(ableitungsId);

    return ableitung;
  }

  /**
   * Erstelle eine Prüfaufgabe
   */
  createPrüfaufgabe(
    aufgabe: Omit<Prüfaufgabe, "id" | "erstelltAm">
  ): Prüfaufgabe {
    const data = studioDataService.getData();

    const newAufgabe: Prüfaufgabe = {
      ...aufgabe,
      id: `aufgabe-${Date.now()}`,
      erstelltAm: new Date().toISOString(),
    };

    if (!data.prüfaufgaben) data.prüfaufgaben = [];
    data.prüfaufgaben.push(newAufgabe);

    studioDataService.saveData(data);
    return newAufgabe;
  }

  /**
   * Markiere Prüfaufgabe als erledigt
   */
  completePrüfaufgabe(
    aufgabeId: string,
    ergebnis?: string
  ): Prüfaufgabe | null {
    const data = studioDataService.getData();
    if (!data.prüfaufgaben) return null;

    const aufgabe = data.prüfaufgaben.find((a) => a.id === aufgabeId);
    if (!aufgabe) return null;

    aufgabe.status = PrüfaufgabenStatus.ERLEDIGT;
    aufgabe.erledigtAm = new Date().toISOString();
    if (ergebnis) aufgabe.prüfergebnis = ergebnis;

    studioDataService.saveData(data);
    return aufgabe;
  }

  private completePrüfaufgabeForAbleitung(ableitungsId: string): void {
    const data = studioDataService.getData();
    if (!data.prüfaufgaben) return;

    const aufgabe = data.prüfaufgaben.find(
      (a) => a.bezogenesObjekt.includes(ableitungsId)
    );
    if (aufgabe) {
      aufgabe.status = PrüfaufgabenStatus.ERLEDIGT;
      aufgabe.erledigtAm = new Date().toISOString();
      studioDataService.saveData(data);
    }
  }

  /**
   * Gebe alle Beobachtungen für ein Foto zurück
   */
  getBeobachtungenForFoto(fotoId: string): Beobachtung[] {
    const data = studioDataService.getData();
    if (!data.beobachtungen) return [];

    return data.beobachtungen.filter((b) => b.fotoId === fotoId);
  }

  /**
   * Gebe alle Ableitungen für eine Beobachtung zurück
   */
  getAbleitungenForBeobachtung(beobachtungsId: string): Ableitung[] {
    const data = studioDataService.getData();
    if (!data.ableitungen) return [];

    return data.ableitungen.filter((a) =>
      a.beobachtungsIds.includes(beobachtungsId)
    );
  }

  /**
   * Gebe unbestätigte Ableitungen zurück
   */
  getUnconfirmedAbleitungen(): Ableitung[] {
    const data = studioDataService.getData();
    if (!data.ableitungen) return [];

    return data.ableitungen.filter(
      (a) =>
        a.bestätigungsstatus === BestätigungsStatus.UNBESTÄTIGT ||
        a.bestätigungsstatus === BestätigungsStatus.ZU_PRÜFEN
    );
  }

  /**
   * Gebe offene Prüfaufgaben zurück
   */
  getOffenePrüfaufgaben(): Prüfaufgabe[] {
    const data = studioDataService.getData();
    if (!data.prüfaufgaben) return [];

    return data.prüfaufgaben.filter(
      (a) =>
        a.status === PrüfaufgabenStatus.OFFEN ||
        a.status === PrüfaufgabenStatus.IN_PRÜFUNG
    );
  }

  /**
   * Berechne Verifikations-Statistiken
   */
  calculateVerificationStats(): {
    gesamtFotos: number;
    ausgewertete: number;
    gesamtBeobachtungen: number;
    gesamtAbleitungen: number;
    unbestätigtAbleitungen: number;
    bestätigteAbleitungen: number;
    offeneAufgaben: number;
    erledigteAufgaben: number;
  } {
    const data = studioDataService.getData();

    const gesamtFotos = data.fotos?.length || 0;
    const ausgewertete =
      data.fotos?.filter(
        (f) => f.status !== FotoStatus.UNBEARBEITET
      ).length || 0;
    const gesamtBeobachtungen = data.beobachtungen?.length || 0;
    const gesamtAbleitungen = data.ableitungen?.length || 0;
    const unbestätigtAbleitungen =
      data.ableitungen?.filter(
        (a) =>
          a.bestätigungsstatus === BestätigungsStatus.UNBESTÄTIGT ||
          a.bestätigungsstatus === BestätigungsStatus.ZU_PRÜFEN
      ).length || 0;
    const bestätigteAbleitungen =
      data.ableitungen?.filter(
        (a) =>
          a.bestätigungsstatus === BestätigungsStatus.DURCH_NUTZER ||
          a.bestätigungsstatus === BestätigungsStatus.TECHNISCH_GETESTET
      ).length || 0;
    const offeneAufgaben =
      data.prüfaufgaben?.filter(
        (a) =>
          a.status === PrüfaufgabenStatus.OFFEN ||
          a.status === PrüfaufgabenStatus.IN_PRÜFUNG
      ).length || 0;
    const erledigteAufgaben =
      data.prüfaufgaben?.filter(
        (a) => a.status === PrüfaufgabenStatus.ERLEDIGT
      ).length || 0;

    return {
      gesamtFotos,
      ausgewertete,
      gesamtBeobachtungen,
      gesamtAbleitungen,
      unbestätigtAbleitungen,
      bestätigteAbleitungen,
      offeneAufgaben,
      erledigteAufgaben,
    };
  }
}

export const verificationService = new VerificationService();

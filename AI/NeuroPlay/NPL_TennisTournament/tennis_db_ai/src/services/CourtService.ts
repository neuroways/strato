import { COLLECTIONS } from '../lib/pb';
import {
  getRecords,
  getRecord,
  createRecord,
  updateRecord,
  deleteRecord,
  countRecords
} from '../lib/api';
import { Court } from '../lib/types';

interface ServiceResult<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Geschäftslogik für Platz-Verwaltung.
 */
export const CourtService = {
  /**
   * Alle Plätze abrufen.
   */
  async getAllCourts(signal?: AbortSignal): Promise<ServiceResult<Court[]>> {
    try {
      const courts = await getRecords(COLLECTIONS.courts, {
        sort: 'name',
        perPage: 1000,
        signal
      });
      return {
        success: true,
        data: courts
      };
    } catch (err: unknown) {
      return {
        success: false,
        error: 'Plätze konnten nicht geladen werden'
      };
    }
  },

  /**
   * Verfügbare Plätze abrufen.
   */
  async getAvailableCourts(signal?: AbortSignal): Promise<ServiceResult<Court[]>> {
    try {
      const courts = await getRecords(COLLECTIONS.courts, {
        filter: 'available = true',
        sort: 'name',
        signal
      });
      return {
        success: true,
        data: courts
      };
    } catch (err: unknown) {
      return {
        success: false,
        error: 'Verfügbare Plätze konnten nicht geladen werden'
      };
    }
  },

  /**
   * Einzelnen Platz abrufen.
   */
  async getCourt(id: string): Promise<ServiceResult<Court>> {
    try {
      const court = await getRecord(COLLECTIONS.courts, id);
      if (!court) {
        return {
          success: false,
          error: 'Platz nicht gefunden'
        };
      }
      return {
        success: true,
        data: court
      };
    } catch (err: unknown) {
      return {
        success: false,
        error: 'Fehler beim Laden des Platzes'
      };
    }
  },

  /**
   * Neuen Platz erstellen.
   */
  async createCourt(data: Partial<Court>): Promise<ServiceResult<Court>> {
    // Validierung
    if (!data.name || data.name.trim() === '') {
      return {
        success: false,
        error: 'Platzname ist erforderlich'
      };
    }

    try {
      const court = await createRecord(COLLECTIONS.courts, {
        ...data,
        name: data.name.trim(),
        available: data.available !== false
      });

      return {
        success: true,
        data: court
      };
    } catch (err: unknown) {
      return {
        success: false,
        error: err?.message || 'Platz konnte nicht erstellt werden'
      };
    }
  },

  /**
   * Platz aktualisieren.
   */
  async updateCourt(id: string, data: Partial<Court>): Promise<ServiceResult<Court>> {
    if (data.name) {
      data.name = data.name.trim();
    }

    try {
      const court = await updateRecord(COLLECTIONS.courts, id, data);
      return {
        success: true,
        data: court
      };
    } catch (err: unknown) {
      return {
        success: false,
        error: err?.message || 'Platz konnte nicht aktualisiert werden'
      };
    }
  },

  /**
   * Platz löschen.
   */
  async deleteCourt(id: string): Promise<ServiceResult> {
    try {
      // Prüfe ob Platz in Matches verwendet wird
      const matchCount = await countRecords(
        COLLECTIONS.matches,
        `court_id = "${id}"`
      );

      if (matchCount > 0) {
        return {
          success: false,
          error: `Platz wird in ${matchCount} Match(es) verwendet und kann nicht gelöscht werden`
        };
      }

      await deleteRecord(COLLECTIONS.courts, id);
      return {
        success: true
      };
    } catch (err: unknown) {
      return {
        success: false,
        error: err?.message || 'Platz konnte nicht gelöscht werden'
      };
    }
  },

  /**
   * Platz-Verfügbarkeit ändern.
   */
  async setCourtAvailability(id: string, available: boolean): Promise<ServiceResult> {
    try {
      await updateRecord(COLLECTIONS.courts, id, { available });
      return {
        success: true
      };
    } catch (err: unknown) {
      return {
        success: false,
        error: err?.message || 'Verfügbarkeit konnte nicht geändert werden'
      };
    }
  },

  /**
   * Belag-Label übersetzen.
   */
  getSurfaceLabel(surface?: string): string {
    const labels: Record<string, string> = {
      clay: 'Asche',
      hard: 'Hart',
      grass: 'Gras',
      other: 'Sonstig'
    };
    return labels[surface || ''] || surface || 'Unbekannt';
  }
};

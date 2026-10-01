import { COLLECTIONS } from '../lib/pb';
import {
  getRecords,
  getRecord,
  createRecord,
  updateRecord,
  deleteRecord
} from '../lib/api';
import { Result } from '../lib/types';

interface ServiceResult<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Geschäftslogik für Ergebnisverwaltung.
 */
export const ResultService = {
  /**
   * Alle Ergebnisse abrufen.
   */
  async getAllResults(
    filter?: string,
    signal?: AbortSignal
  ): Promise<ServiceResult<Result[]>> {
    try {
      const results = await getRecords(COLLECTIONS.results, {
        filter,
        sort: '-created',
        perPage: 500,
        signal
      });
      return {
        success: true,
        data: results
      };
    } catch (err: unknown) {
      return {
        success: false,
        error: 'Ergebnisse konnten nicht geladen werden'
      };
    }
  },

  /**
   * Ergebnis für ein Spiel abrufen.
   */
  async getMatchResult(matchId: string): Promise<ServiceResult<Result | null>> {
    try {
      const results = await getRecords(COLLECTIONS.results, {
        filter: `match_id = "${matchId}"`,
        perPage: 1
      });

      if (results.length === 0) {
        return {
          success: true,
          data: null
        };
      }

      return {
        success: true,
        data: results[0]
      };
    } catch (err: unknown) {
      return {
        success: false,
        error: 'Ergebnis konnte nicht geladen werden'
      };
    }
  },

  /**
   * Neues Ergebnis erstellen oder überschreiben.
   */
  async recordResult(
    matchId: string,
    winnerId: string | null,
    loserId: string | null,
    score: string,
    recordedAt: string
  ): Promise<ServiceResult<Result>> {
    // Validierung
    if (!matchId) {
      return {
        success: false,
        error: 'Match-ID ist erforderlich'
      };
    }

    if (!score || score.trim() === '') {
      return {
        success: false,
        error: 'Ergebnis ist erforderlich (z.B. 6:4, 7:5)'
      };
    }

    if (winnerId === loserId) {
      return {
        success: false,
        error: 'Gewinner und Verlierer müssen unterschiedlich sein'
      };
    }

    try {
      // Prüfe ob bereits Ergebnis existiert
      const existing = await getRecords(COLLECTIONS.results, {
        filter: `match_id = "${matchId}"`,
        perPage: 1
      });

      let result;
      if (existing.length > 0) {
        // Update existing
        result = await updateRecord(COLLECTIONS.results, existing[0].id, {
          winner_id: winnerId,
          loser_id: loserId,
          score,
          recorded_at: recordedAt
        });
      } else {
        // Create new
        result = await createRecord(COLLECTIONS.results, {
          match_id: matchId,
          winner_id: winnerId,
          loser_id: loserId,
          score,
          recorded_at: recordedAt
        });
      }

      return {
        success: true,
        data: result
      };
    } catch (err: unknown) {
      return {
        success: false,
        error: err?.message || 'Ergebnis konnte nicht gespeichert werden'
      };
    }
  },

  /**
   * Ergebnis aktualisieren.
   */
  async updateResult(id: string, data: Partial<Result>): Promise<ServiceResult<Result>> {
    try {
      const result = await updateRecord(COLLECTIONS.results, id, data);
      return {
        success: true,
        data: result
      };
    } catch (err: unknown) {
      return {
        success: false,
        error: err?.message || 'Ergebnis konnte nicht aktualisiert werden'
      };
    }
  },

  /**
   * Ergebnis löschen.
   */
  async deleteResult(id: string): Promise<ServiceResult> {
    try {
      await deleteRecord(COLLECTIONS.results, id);
      return {
        success: true
      };
    } catch (err: unknown) {
      return {
        success: false,
        error: err?.message || 'Ergebnis konnte nicht gelöscht werden'
      };
    }
  },

  /**
   * Score-Format validieren.
   */
  validateScoreFormat(score: string): boolean {
    // Einfache Validierung: "6:4, 7:5"
    const pattern = /^\d+:\d+(,\s*\d+:\d+)*$/;
    return pattern.test(score);
  }
};

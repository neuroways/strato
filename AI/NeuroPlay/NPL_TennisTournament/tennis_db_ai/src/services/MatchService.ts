import { COLLECTIONS } from '../lib/pb';
import {
  getRecords,
  getRecord,
  createRecord,
  updateRecord,
  deleteRecord,
  countRecords
} from '../lib/api';
import { Match } from '../lib/types';

interface ServiceResult<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Geschäftslogik für Spielverwaltung.
 */
export const MatchService = {
  /**
   * Alle Spiele abrufen.
   */
  async getAllMatches(
    filter?: string,
    signal?: AbortSignal
  ): Promise<ServiceResult<Match[]>> {
    try {
      const matches = await getRecords(COLLECTIONS.matches, {
        filter,
        sort: 'match_date,match_time',
        perPage: 500,
        signal
      });
      return {
        success: true,
        data: matches
      };
    } catch (err: unknown) {
      return {
        success: false,
        error: 'Spiele konnten nicht geladen werden'
      };
    }
  },

  /**
   * Spiele für eine Runde abrufen.
   */
  async getRoundMatches(roundId: string, signal?: AbortSignal): Promise<ServiceResult<Match[]>> {
    return this.getAllMatches(`round_id = "${roundId}"`, signal);
  },

  /**
   * Spiele für ein Turnier abrufen.
   */
  async getTournamentMatches(tournamentId: string, signal?: AbortSignal): Promise<ServiceResult<Match[]>> {
    return this.getAllMatches(`tournament_id = "${tournamentId}"`, signal);
  },

  /**
   * Neues Spiel erstellen.
   */
  async createMatch(data: Partial<Match>): Promise<ServiceResult<Match>> {
    // Validierung
    if (!data.round_id) {
      return {
        success: false,
        error: 'Runde ist erforderlich'
      };
    }

    if (!data.tournament_id) {
      return {
        success: false,
        error: 'Turnier ist erforderlich'
      };
    }

    try {
      const match = await createRecord(COLLECTIONS.matches, {
        ...data,
        status: data.status || 'scheduled'
      });

      return {
        success: true,
        data: match
      };
    } catch (err: unknown) {
      return {
        success: false,
        error: err?.message || 'Spiel konnte nicht erstellt werden'
      };
    }
  },

  /**
   * Spiel aktualisieren.
   */
  async updateMatch(id: string, data: Partial<Match>): Promise<ServiceResult<Match>> {
    try {
      const match = await updateRecord(COLLECTIONS.matches, id, data);
      return {
        success: true,
        data: match
      };
    } catch (err: unknown) {
      return {
        success: false,
        error: err?.message || 'Spiel konnte nicht aktualisiert werden'
      };
    }
  },

  /**
   * Spiel-Status ändern.
   */
  async changeMatchStatus(
    id: string,
    newStatus: 'scheduled' | 'live' | 'completed' | 'cancelled'
  ): Promise<ServiceResult> {
    const validStatuses = ['scheduled', 'live', 'completed', 'cancelled'];
    if (!validStatuses.includes(newStatus)) {
      return {
        success: false,
        error: 'Ungültiger Status'
      };
    }

    try {
      await updateRecord(COLLECTIONS.matches, id, { status: newStatus });
      return {
        success: true
      };
    } catch (err: unknown) {
      return {
        success: false,
        error: err?.message || 'Status konnte nicht geändert werden'
      };
    }
  },

  /**
   * Spiel löschen.
   */
  async deleteMatch(id: string): Promise<ServiceResult> {
    try {
      // Prüfe ob Spiel Ergebnis hat
      const resultCount = await countRecords(
        COLLECTIONS.results,
        `match_id = "${id}"`
      );

      if (resultCount > 0) {
        return {
          success: false,
          error: 'Spiel hat ein Ergebnis und kann nicht gelöscht werden'
        };
      }

      // Löschen Sie auch die Spieler-Zuordnungen
      const matchPlayers = await getRecords(COLLECTIONS.match_players, {
        filter: `match_id = "${id}"`
      });

      for (const mp of matchPlayers) {
        await deleteRecord(COLLECTIONS.match_players, mp.id);
      }

      await deleteRecord(COLLECTIONS.matches, id);
      return {
        success: true
      };
    } catch (err: unknown) {
      return {
        success: false,
        error: err?.message || 'Spiel konnte nicht gelöscht werden'
      };
    }
  },

  /**
   * Anzahl Spiele pro Status.
   */
  async getMatchCountByStatus(tournamentId: string): Promise<{
    total: number;
    scheduled: number;
    live: number;
    completed: number;
    cancelled: number;
  }> {
    const baseFilter = `tournament_id = "${tournamentId}"`;

    const [total, scheduled, live, completed, cancelled] = await Promise.all([
      countRecords(COLLECTIONS.matches, baseFilter),
      countRecords(COLLECTIONS.matches, `${baseFilter} && status = "scheduled"`),
      countRecords(COLLECTIONS.matches, `${baseFilter} && status = "live"`),
      countRecords(COLLECTIONS.matches, `${baseFilter} && status = "completed"`),
      countRecords(COLLECTIONS.matches, `${baseFilter} && status = "cancelled"`)
    ]);

    return { total, scheduled, live, completed, cancelled };
  },

  /**
   * Status-Label übersetzen.
   */
  getStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      scheduled: 'Geplant',
      live: 'Läuft',
      completed: 'Abgeschlossen',
      cancelled: 'Abgesagt'
    };
    return labels[status] || status;
  }
};

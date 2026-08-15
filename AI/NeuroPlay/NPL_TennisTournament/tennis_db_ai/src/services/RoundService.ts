import { COLLECTIONS } from '../lib/pb';
import {
  getRecords,
  getRecord,
  createRecord,
  updateRecord,
  deleteRecord
} from '../lib/api';
import { Round } from '../lib/types';

interface ServiceResult<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Geschäftslogik für Runden-Verwaltung.
 */
export const RoundService = {
  /**
   * Alle Runden abrufen.
   */
  async getAllRounds(
    filter?: string,
    signal?: AbortSignal
  ): Promise<ServiceResult<Round[]>> {
    try {
      const rounds = await getRecords(COLLECTIONS.rounds, {
        filter,
        sort: 'round_number',
        perPage: 500,
        signal
      });
      return {
        success: true,
        data: rounds
      };
    } catch (err: unknown) {
      return {
        success: false,
        error: 'Runden konnten nicht geladen werden'
      };
    }
  },

  /**
   * Runden für ein Turnier abrufen.
   */
  async getTournamentRounds(tournamentId: string, signal?: AbortSignal): Promise<ServiceResult<Round[]>> {
    return this.getAllRounds(`tournament_id = "${tournamentId}"`, signal);
  },

  /**
   * Neue Runde erstellen.
   */
  async createRound(data: Partial<Round>): Promise<ServiceResult<Round>> {
    if (!data.tournament_id) {
      return {
        success: false,
        error: 'Turnier ist erforderlich'
      };
    }

    if (!data.name || data.name.trim() === '') {
      return {
        success: false,
        error: 'Rundenname ist erforderlich'
      };
    }

    if (!data.round_number) {
      return {
        success: false,
        error: 'Rundennummer ist erforderlich'
      };
    }

    try {
      const round = await createRecord(COLLECTIONS.rounds, {
        ...data,
        name: data.name.trim()
      });

      return {
        success: true,
        data: round
      };
    } catch (err: unknown) {
      return {
        success: false,
        error: err?.message || 'Runde konnte nicht erstellt werden'
      };
    }
  },

  /**
   * Runde aktualisieren.
   */
  async updateRound(id: string, data: Partial<Round>): Promise<ServiceResult<Round>> {
    try {
      const round = await updateRecord(COLLECTIONS.rounds, id, data);
      return {
        success: true,
        data: round
      };
    } catch (err: unknown) {
      return {
        success: false,
        error: err?.message || 'Runde konnte nicht aktualisiert werden'
      };
    }
  },

  /**
   * Runde löschen.
   */
  async deleteRound(id: string): Promise<ServiceResult> {
    try {
      await deleteRecord(COLLECTIONS.rounds, id);
      return {
        success: true
      };
    } catch (err: unknown) {
      return {
        success: false,
        error: err?.message || 'Runde konnte nicht gelöscht werden'
      };
    }
  }
};

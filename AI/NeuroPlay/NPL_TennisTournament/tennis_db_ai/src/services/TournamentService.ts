import { COLLECTIONS } from '../lib/pb';
import {
  getRecords,
  getRecord,
  createRecord,
  updateRecord,
  deleteRecord,
  countRecords
} from '../lib/api';
import { Tournament } from '../lib/types';

interface ServiceResult<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Geschäftslogik für Turnierverwaltung.
 * Kapselt CRUD, Validierungen, Datenaufbereitung.
 */
export const TournamentService = {
  /**
   * Alle Turniere abrufen, optional gefiltert.
   */
  async getAllTournaments(
    filter?: string,
    signal?: AbortSignal
  ): Promise<ServiceResult<Tournament[]>> {
    try {
      const tournaments = await getRecords(COLLECTIONS.tournaments, {
        filter,
        sort: '-created',
        signal
      });
      return {
        success: true,
        data: tournaments
      };
    } catch (err: unknown) {
      return {
        success: false,
        error: 'Turniere konnten nicht geladen werden'
      };
    }
  },

  /**
   * Einzelnes Turnier abrufen.
   */
  async getTournament(id: string): Promise<ServiceResult<Tournament>> {
    try {
      const tournament = await getRecord(COLLECTIONS.tournaments, id);
      if (!tournament) {
        return {
          success: false,
          error: 'Turnier nicht gefunden'
        };
      }
      return {
        success: true,
        data: tournament
      };
    } catch (err: unknown) {
      return {
        success: false,
        error: 'Fehler beim Laden des Turniers'
      };
    }
  },

  /**
   * Neues Turnier erstellen mit Validierungen.
   */
  async createTournament(data: Partial<Tournament>): Promise<ServiceResult<Tournament>> {
    // Validierung
    if (!data.name || data.name.trim() === '') {
      return {
        success: false,
        error: 'Turniername ist erforderlich'
      };
    }

    if (!data.tournament_date) {
      return {
        success: false,
        error: 'Turnierdatum ist erforderlich'
      };
    }

    if (!data.registration_deadline) {
      return {
        success: false,
        error: 'Anmeldeschluss ist erforderlich'
      };
    }

    // Logische Validierung: Anmeldeschluss vor Turnierdatum
    if (data.registration_deadline >= data.tournament_date) {
      return {
        success: false,
        error: 'Anmeldeschluss muss vor dem Turnierdatum liegen'
      };
    }

    try {
      const tournament = await createRecord(COLLECTIONS.tournaments, {
        ...data,
        status: data.status || 'planned'
      });

      return {
        success: true,
        data: tournament
      };
    } catch (err: unknown) {
      return {
        success: false,
        error: err?.message || 'Turnier konnte nicht erstellt werden'
      };
    }
  },

  /**
   * Turnier aktualisieren mit Validierungen.
   */
  async updateTournament(id: string, data: Partial<Tournament>): Promise<ServiceResult<Tournament>> {
    if (data.registration_deadline && data.tournament_date) {
      if (data.registration_deadline >= data.tournament_date) {
        return {
          success: false,
          error: 'Anmeldeschluss muss vor dem Turnierdatum liegen'
        };
      }
    }

    try {
      const tournament = await updateRecord(COLLECTIONS.tournaments, id, data);
      return {
        success: true,
        data: tournament
      };
    } catch (err: unknown) {
      return {
        success: false,
        error: err?.message || 'Turnier konnte nicht aktualisiert werden'
      };
    }
  },

  /**
   * Turnier löschen mit Validierung.
   */
  async deleteTournament(id: string): Promise<ServiceResult> {
    try {
      // Prüfe ob Turnier Anmeldungen hat
      const registrationCount = await countRecords(
        COLLECTIONS.registrations,
        `tournament_id = "${id}"`
      );

      if (registrationCount > 0) {
        return {
          success: false,
          error: `Turnier hat ${registrationCount} Anmeldung(en) und kann nicht gelöscht werden`
        };
      }

      await deleteRecord(COLLECTIONS.tournaments, id);
      return {
        success: true
      };
    } catch (err: unknown) {
      return {
        success: false,
        error: err?.message || 'Turnier konnte nicht gelöscht werden'
      };
    }
  },

  /**
   * Turnier-Status ändern (mit Validierung).
   */
  async changeTournamentStatus(
    id: string,
    newStatus: 'planned' | 'open' | 'running' | 'completed' | 'cancelled'
  ): Promise<ServiceResult> {
    const validStatuses = ['planned', 'open', 'running', 'completed', 'cancelled'];
    if (!validStatuses.includes(newStatus)) {
      return {
        success: false,
        error: 'Ungültiger Status'
      };
    }

    try {
      await updateRecord(COLLECTIONS.tournaments, id, { status: newStatus });
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
   * Offene Turniere (für öffentliche Website).
   */
  async getOpenTournaments(signal?: AbortSignal): Promise<ServiceResult<Tournament[]>> {
    return this.getAllTournaments('status = "open"', signal);
  }
};

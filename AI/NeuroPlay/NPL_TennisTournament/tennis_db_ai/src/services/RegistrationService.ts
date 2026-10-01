import { COLLECTIONS } from '../lib/pb';
import {
  getRecords,
  getRecord,
  createRecord,
  updateRecord,
  deleteRecord,
  countRecords
} from '../lib/api';
import { Registration } from '../lib/types';

interface ServiceResult<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Geschäftslogik für Anmeldungsverwaltung.
 */
export const RegistrationService = {
  /**
   * Alle Anmeldungen abrufen.
   */
  async getAllRegistrations(
    filter?: string,
    signal?: AbortSignal
  ): Promise<ServiceResult<Registration[]>> {
    try {
      const registrations = await getRecords(COLLECTIONS.registrations, {
        filter,
        sort: '-created',
        perPage: 500,
        signal
      });
      return {
        success: true,
        data: registrations
      };
    } catch (err: unknown) {
      return {
        success: false,
        error: 'Anmeldungen konnten nicht geladen werden'
      };
    }
  },

  /**
   * Anmeldungen für ein Turnier abrufen.
   */
  async getTournamentRegistrations(
    tournamentId: string,
    signal?: AbortSignal
  ): Promise<ServiceResult<Registration[]>> {
    return this.getAllRegistrations(
      `tournament_id = "${tournamentId}"`,
      signal
    );
  },

  /**
   * Neue Anmeldung erstellen.
   */
  async registerPlayer(
    tournamentId: string,
    playerId: string,
    registrationDate: string
  ): Promise<ServiceResult<Registration>> {
    // Validierung: Spieler darf sich nicht zweimal anmelden
    const existing = await getRecords(COLLECTIONS.registrations, {
      filter: `tournament_id = "${tournamentId}" && player_id = "${playerId}"`,
      perPage: 1
    });

    if (existing.length > 0) {
      return {
        success: false,
        error: 'Spieler ist bereits zu diesem Turnier angemeldet'
      };
    }

    try {
      const registration = await createRecord(COLLECTIONS.registrations, {
        tournament_id: tournamentId,
        player_id: playerId,
        registration_date: registrationDate,
        status: 'registered'
      });

      return {
        success: true,
        data: registration
      };
    } catch (err: unknown) {
      return {
        success: false,
        error: err?.message || 'Anmeldung konnte nicht erstellt werden'
      };
    }
  },

  /**
   * Anmeldung aktualisieren (Status ändern).
   */
  async updateRegistrationStatus(
    id: string,
    newStatus: 'registered' | 'confirmed' | 'waitlist' | 'cancelled'
  ): Promise<ServiceResult<Registration>> {
    const validStatuses = ['registered', 'confirmed', 'waitlist', 'cancelled'];
    if (!validStatuses.includes(newStatus)) {
      return {
        success: false,
        error: 'Ungültiger Status'
      };
    }

    try {
      const registration = await updateRecord(COLLECTIONS.registrations, id, {
        status: newStatus
      });
      return {
        success: true,
        data: registration
      };
    } catch (err: unknown) {
      return {
        success: false,
        error: err?.message || 'Status konnte nicht geändert werden'
      };
    }
  },

  /**
   * Anmeldung stornieren.
   */
  async cancelRegistration(id: string): Promise<ServiceResult> {
    try {
      await updateRecord(COLLECTIONS.registrations, id, {
        status: 'cancelled'
      });
      return {
        success: true
      };
    } catch (err: unknown) {
      return {
        success: false,
        error: err?.message || 'Stornierung fehlgeschlagen'
      };
    }
  },

  /**
   * Anmeldung löschen.
   */
  async deleteRegistration(id: string): Promise<ServiceResult> {
    try {
      await deleteRecord(COLLECTIONS.registrations, id);
      return {
        success: true
      };
    } catch (err: unknown) {
      return {
        success: false,
        error: err?.message || 'Anmeldung konnte nicht gelöscht werden'
      };
    }
  },

  /**
   * Anzahl bestätigter Anmeldungen für Turnier.
   */
  async getConfirmedCount(tournamentId: string): Promise<number> {
    return countRecords(
      COLLECTIONS.registrations,
      `tournament_id = "${tournamentId}" && status = "confirmed"`
    );
  },

  /**
   * Status-Label übersetzen.
   */
  getStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      registered: 'Angemeldet',
      confirmed: 'Bestätigt',
      waitlist: 'Warteliste',
      cancelled: 'Storniert'
    };
    return labels[status] || status;
  }
};

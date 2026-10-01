import { COLLECTIONS } from '../lib/pb';
import {
  getRecords,
  getRecord,
  createRecord,
  updateRecord,
  deleteRecord
} from '../lib/api';
import { TournamentSettings } from '../lib/types';

interface ServiceResult<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Geschäftslogik für Turniereinstellungen.
 * Verwaltet spezifische Einstellungen pro Turnier.
 */
export const TournamentSettingsService = {
  /**
   * Einstellungen für Turnier abrufen.
   */
  async getSettingsByTournament(
    tournamentId: string,
    signal?: AbortSignal
  ): Promise<ServiceResult<TournamentSettings>> {
    try {
      const records = await getRecords(COLLECTIONS.tournament_settings, {
        filter: `tournament_id = "${tournamentId}"`,
        perPage: 1,
        signal
      });

      if (records.length === 0) {
        return {
          success: false,
          error: 'Einstellungen nicht gefunden'
        };
      }

      return {
        success: true,
        data: records[0]
      };
    } catch (err: unknown) {
      return {
        success: false,
        error: 'Einstellungen konnten nicht geladen werden'
      };
    }
  },

  /**
   * Einstellungen abrufen nach ID.
   */
  async getSettings(id: string): Promise<ServiceResult<TournamentSettings>> {
    try {
      const settings = await getRecord(COLLECTIONS.tournament_settings, id);
      if (!settings) {
        return {
          success: false,
          error: 'Einstellungen nicht gefunden'
        };
      }
      return {
        success: true,
        data: settings
      };
    } catch (err: unknown) {
      return {
        success: false,
        error: 'Fehler beim Laden der Einstellungen'
      };
    }
  },

  /**
   * Neue Einstellungen erstellen.
   */
  async createSettings(
    data: Partial<TournamentSettings>
  ): Promise<ServiceResult<TournamentSettings>> {
    // Validierung
    if (!data.tournament_id || data.tournament_id.trim() === '') {
      return {
        success: false,
        error: 'Turnier-ID ist erforderlich'
      };
    }

    try {
      const settings = await createRecord(COLLECTIONS.tournament_settings, {
        tournament_id: data.tournament_id.trim(),
        registration_open: data.registration_open ?? false,
        waitlist_enabled: data.waitlist_enabled ?? false,
        match_duration_minutes: data.match_duration_minutes ?? 60,
        break_duration_minutes: data.break_duration_minutes ?? 10,
        max_matches_per_player: data.max_matches_per_player ?? 5,
        draw_method: data.draw_method ?? 'random'
      });

      return {
        success: true,
        data: settings
      };
    } catch (err: unknown) {
      return {
        success: false,
        error: 'Einstellungen konnten nicht erstellt werden'
      };
    }
  },

  /**
   * Einstellungen aktualisieren.
   */
  async updateSettings(
    id: string,
    data: Partial<TournamentSettings>
  ): Promise<ServiceResult<TournamentSettings>> {
    // Validierungen
    if (
      data.match_duration_minutes !== undefined &&
      data.match_duration_minutes < 1
    ) {
      return {
        success: false,
        error: 'Spieldauer muss mindestens 1 Minute sein'
      };
    }

    if (
      data.break_duration_minutes !== undefined &&
      data.break_duration_minutes < 0
    ) {
      return {
        success: false,
        error: 'Pausenzeit kann nicht negativ sein'
      };
    }

    if (
      data.max_matches_per_player !== undefined &&
      data.max_matches_per_player < 1
    ) {
      return {
        success: false,
        error: 'Max. Spiele pro Spieler muss mindestens 1 sein'
      };
    }

    try {
      const settings = await updateRecord(COLLECTIONS.tournament_settings, id, data);
      return {
        success: true,
        data: settings
      };
    } catch (err: unknown) {
      return {
        success: false,
        error: 'Einstellungen konnten nicht aktualisiert werden'
      };
    }
  },

  /**
   * Einstellungen löschen.
   */
  async deleteSettings(id: string): Promise<ServiceResult> {
    try {
      await deleteRecord(COLLECTIONS.tournament_settings, id);
      return {
        success: true
      };
    } catch (err: unknown) {
      return {
        success: false,
        error: 'Einstellungen konnten nicht gelöscht werden'
      };
    }
  },

  /**
   * Draw-Methode übersetzen.
   */
  getDrawMethodLabel(method?: string): string {
    const labels: Record<string, string> = {
      random: 'Zufällig',
      seeded: 'Gesetzt',
      custom: 'Manuell'
    };
    return labels[method || ''] || 'Unbekannt';
  }
};

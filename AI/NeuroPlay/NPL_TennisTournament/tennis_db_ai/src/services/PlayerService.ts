import { COLLECTIONS } from '../lib/pb';
import {
  getRecords,
  getRecord,
  createRecord,
  updateRecord,
  deleteRecord,
  countRecords
} from '../lib/api';
import { Player } from '../lib/types';

interface ServiceResult<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Geschäftslogik für Spielerverwaltung.
 */
export const PlayerService = {
  /**
   * Alle Spieler abrufen.
   */
  async getAllPlayers(signal?: AbortSignal): Promise<ServiceResult<Player[]>> {
    try {
      const players = await getRecords(COLLECTIONS.players, {
        sort: 'last_name,first_name',
        perPage: 1000,
        signal
      });
      return {
        success: true,
        data: players
      };
    } catch (err: unknown) {
      return {
        success: false,
        error: 'Spieler konnten nicht geladen werden'
      };
    }
  },

  /**
   * Einzelnen Spieler abrufen.
   */
  async getPlayer(id: string): Promise<ServiceResult<Player>> {
    try {
      const player = await getRecord(COLLECTIONS.players, id);
      if (!player) {
        return {
          success: false,
          error: 'Spieler nicht gefunden'
        };
      }
      return {
        success: true,
        data: player
      };
    } catch (err: unknown) {
      return {
        success: false,
        error: 'Fehler beim Laden des Spielers'
      };
    }
  },

  /**
   * Neuen Spieler erstellen.
   */
  async createPlayer(data: Partial<Player>): Promise<ServiceResult<Player>> {
    // Validierung
    if (!data.first_name || data.first_name.trim() === '') {
      return {
        success: false,
        error: 'Vorname ist erforderlich'
      };
    }

    if (!data.last_name || data.last_name.trim() === '') {
      return {
        success: false,
        error: 'Nachname ist erforderlich'
      };
    }

    try {
      const player = await createRecord(COLLECTIONS.players, {
        ...data,
        first_name: data.first_name.trim(),
        last_name: data.last_name.trim()
      });

      return {
        success: true,
        data: player
      };
    } catch (err: unknown) {
      return {
        success: false,
        error: err?.message || 'Spieler konnte nicht erstellt werden'
      };
    }
  },

  /**
   * Spieler aktualisieren.
   */
  async updatePlayer(id: string, data: Partial<Player>): Promise<ServiceResult<Player>> {
    if (data.first_name) {
      data.first_name = data.first_name.trim();
    }
    if (data.last_name) {
      data.last_name = data.last_name.trim();
    }

    try {
      const player = await updateRecord(COLLECTIONS.players, id, data);
      return {
        success: true,
        data: player
      };
    } catch (err: unknown) {
      return {
        success: false,
        error: err?.message || 'Spieler konnte nicht aktualisiert werden'
      };
    }
  },

  /**
   * Spieler löschen (mit Validierung).
   */
  async deletePlayer(id: string): Promise<ServiceResult> {
    try {
      // Prüfe ob Spieler Anmeldungen hat
      const registrationCount = await countRecords(
        COLLECTIONS.registrations,
        `player_id = "${id}"`
      );

      if (registrationCount > 0) {
        return {
          success: false,
          error: `Spieler hat ${registrationCount} Anmeldung(en) und kann nicht gelöscht werden`
        };
      }

      // Prüfe ob Spieler in Matches ist
      const matchCount = await countRecords(
        COLLECTIONS.match_players,
        `player_id = "${id}"`
      );

      if (matchCount > 0) {
        return {
          success: false,
          error: `Spieler hat ${matchCount} Match(es) und kann nicht gelöscht werden`
        };
      }

      await deleteRecord(COLLECTIONS.players, id);
      return {
        success: true
      };
    } catch (err: unknown) {
      return {
        success: false,
        error: err?.message || 'Spieler konnte nicht gelöscht werden'
      };
    }
  },

  /**
   * Spieler-Name formatieren (Anzeige).
   */
  getPlayerFullName(player: Player): string {
    return `${player.first_name} ${player.last_name}`;
  },

  /**
   * Spieler-Skill-Level übersetzen.
   */
  getSkillLevelLabel(level?: string): string {
    const labels: Record<string, string> = {
      beginner: 'Anfänger',
      intermediate: 'Fortgeschritten',
      advanced: 'Fortgeschritten+',
      professional: 'Professionell'
    };
    return labels[level || ''] || level || 'Unbekannt';
  }
};

import { COLLECTIONS } from '../lib/pb';
import {
  getRecords,
  getRecord,
  createRecord,
  updateRecord,
  deleteRecord
} from '../lib/api';
import { Announcement } from '../lib/types';

interface ServiceResult<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Geschäftslogik für Ankündigungen.
 */
export const AnnouncementService = {
  /**
   * Alle Ankündigungen abrufen.
   */
  async getAllAnnouncements(
    filter?: string,
    signal?: AbortSignal
  ): Promise<ServiceResult<Announcement[]>> {
    try {
      const announcements = await getRecords(COLLECTIONS.announcements, {
        filter,
        sort: '-published_date',
        perPage: 500,
        signal
      });
      return {
        success: true,
        data: announcements
      };
    } catch (err: unknown) {
      return {
        success: false,
        error: 'Ankündigungen konnten nicht geladen werden'
      };
    }
  },

  /**
   * Sichtbare Ankündigungen (für öffentliche Website).
   */
  async getVisibleAnnouncements(signal?: AbortSignal): Promise<ServiceResult<Announcement[]>> {
    return this.getAllAnnouncements('visible = true', signal);
  },

  /**
   * Ankündigungen für ein Turnier.
   */
  async getTournamentAnnouncements(
    tournamentId: string,
    signal?: AbortSignal
  ): Promise<ServiceResult<Announcement[]>> {
    return this.getAllAnnouncements(
      `tournament_id = "${tournamentId}" && visible = true`,
      signal
    );
  },

  /**
   * Neue Ankündigung erstellen.
   */
  async createAnnouncement(data: Partial<Announcement>): Promise<ServiceResult<Announcement>> {
    // Validierung
    if (!data.title || data.title.trim() === '') {
      return {
        success: false,
        error: 'Titel ist erforderlich'
      };
    }

    if (!data.published_date) {
      return {
        success: false,
        error: 'Veröffentlichungsdatum ist erforderlich'
      };
    }

    try {
      const announcement = await createRecord(COLLECTIONS.announcements, {
        ...data,
        title: data.title.trim(),
        visible: data.visible !== false
      });

      return {
        success: true,
        data: announcement
      };
    } catch (err: unknown) {
      return {
        success: false,
        error: err?.message || 'Ankündigung konnte nicht erstellt werden'
      };
    }
  },

  /**
   * Ankündigung aktualisieren.
   */
  async updateAnnouncement(
    id: string,
    data: Partial<Announcement>
  ): Promise<ServiceResult<Announcement>> {
    if (data.title) {
      data.title = data.title.trim();
    }

    try {
      const announcement = await updateRecord(COLLECTIONS.announcements, id, data);
      return {
        success: true,
        data: announcement
      };
    } catch (err: unknown) {
      return {
        success: false,
        error: err?.message || 'Ankündigung konnte nicht aktualisiert werden'
      };
    }
  },

  /**
   * Ankündigung löschen.
   */
  async deleteAnnouncement(id: string): Promise<ServiceResult> {
    try {
      await deleteRecord(COLLECTIONS.announcements, id);
      return {
        success: true
      };
    } catch (err: unknown) {
      return {
        success: false,
        error: err?.message || 'Ankündigung konnte nicht gelöscht werden'
      };
    }
  },

  /**
   * Ankündigung Sichtbarkeit ändern.
   */
  async setVisibility(id: string, visible: boolean): Promise<ServiceResult> {
    try {
      await updateRecord(COLLECTIONS.announcements, id, { visible });
      return {
        success: true
      };
    } catch (err: unknown) {
      return {
        success: false,
        error: err?.message || 'Sichtbarkeit konnte nicht geändert werden'
      };
    }
  }
};

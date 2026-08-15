import { COLLECTIONS } from '../lib/pb';
import {
  getRecords,
  getRecord,
  createRecord,
  updateRecord,
  deleteRecord
} from '../lib/api';
import { InfoSection } from '../lib/types';

interface ServiceResult<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Geschäftslogik für Website-Info-Bereiche.
 */
export const InfoSectionService = {
  /**
   * Alle Info-Bereiche abrufen.
   */
  async getAllSections(signal?: AbortSignal): Promise<ServiceResult<InfoSection[]>> {
    try {
      const sections = await getRecords(COLLECTIONS.info_sections, {
        sort: 'order,section_key',
        perPage: 500,
        signal
      });
      return {
        success: true,
        data: sections
      };
    } catch (err: unknown) {
      return {
        success: false,
        error: 'Info-Bereiche konnten nicht geladen werden'
      };
    }
  },

  /**
   * Sichtbare Info-Bereiche (für öffentliche Website).
   */
  async getVisibleSections(signal?: AbortSignal): Promise<ServiceResult<InfoSection[]>> {
    try {
      const sections = await getRecords(COLLECTIONS.info_sections, {
        filter: 'visible = true',
        sort: 'order,section_key',
        signal
      });
      return {
        success: true,
        data: sections
      };
    } catch (err: unknown) {
      return {
        success: false,
        error: 'Sichtbare Bereiche konnten nicht geladen werden'
      };
    }
  },

  /**
   * Info-Bereich nach Schlüssel abrufen.
   */
  async getSection(key: string): Promise<ServiceResult<InfoSection | null>> {
    try {
      const sections = await getRecords(COLLECTIONS.info_sections, {
        filter: `section_key = "${key}"`,
        perPage: 1
      });

      if (sections.length === 0) {
        return {
          success: true,
          data: null
        };
      }

      return {
        success: true,
        data: sections[0]
      };
    } catch (err: unknown) {
      return {
        success: false,
        error: 'Info-Bereich konnte nicht geladen werden'
      };
    }
  },

  /**
   * Neuen Info-Bereich erstellen.
   */
  async createSection(data: Partial<InfoSection>): Promise<ServiceResult<InfoSection>> {
    // Validierung
    if (!data.section_key || data.section_key.trim() === '') {
      return {
        success: false,
        error: 'Schlüssel ist erforderlich'
      };
    }

    // Prüfe ob Schlüssel bereits existiert
    const existing = await getRecords(COLLECTIONS.info_sections, {
      filter: `section_key = "${data.section_key}"`,
      perPage: 1
    });

    if (existing.length > 0) {
      return {
        success: false,
        error: 'Schlüssel existiert bereits'
      };
    }

    try {
      const section = await createRecord(COLLECTIONS.info_sections, {
        ...data,
        section_key: data.section_key.trim(),
        visible: data.visible !== false
      });

      return {
        success: true,
        data: section
      };
    } catch (err: unknown) {
      return {
        success: false,
        error: err?.message || 'Bereich konnte nicht erstellt werden'
      };
    }
  },

  /**
   * Info-Bereich aktualisieren.
   */
  async updateSection(id: string, data: Partial<InfoSection>): Promise<ServiceResult<InfoSection>> {
    try {
      const section = await updateRecord(COLLECTIONS.info_sections, id, data);
      return {
        success: true,
        data: section
      };
    } catch (err: unknown) {
      return {
        success: false,
        error: err?.message || 'Bereich konnte nicht aktualisiert werden'
      };
    }
  },

  /**
   * Info-Bereich löschen.
   */
  async deleteSection(id: string): Promise<ServiceResult> {
    try {
      await deleteRecord(COLLECTIONS.info_sections, id);
      return {
        success: true
      };
    } catch (err: unknown) {
      return {
        success: false,
        error: err?.message || 'Bereich konnte nicht gelöscht werden'
      };
    }
  },

  /**
   * Sichtbarkeit ändern.
   */
  async setVisibility(id: string, visible: boolean): Promise<ServiceResult> {
    try {
      await updateRecord(COLLECTIONS.info_sections, id, { visible });
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

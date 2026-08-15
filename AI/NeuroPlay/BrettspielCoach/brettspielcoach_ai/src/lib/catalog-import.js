/**
 * Game Catalog Import Service
 * 
 * Imports publishers, games, editions, and rule sources from CSV data
 * into PocketBase. Provides idempotent import with comprehensive validation.
 */

import { pb } from './pb.js';

export class CatalogImporter {
  constructor() {
    this.stats = {
      publisherRowsFound: 0,
      publishersCreated: 0,
      publishersUpdated: 0,
      gamesCreated: 0,
      gamesUpdated: 0,
      editionsCreated: 0,
      editionsUpdated: 0,
      ruleSourcesCreated: 0,
      ruleSourcesUpdated: 0,
      errors: [],
      warnings: [],
      importBatchId: null
    };
    
    this.publishers = {};
    this.games = {};
    this.importBatchId = null;
  }

  normalize(text) {
    if (!text) return null;
    return text
      .toLowerCase()
      .trim()
      .replace(/\s+/g, ' ')
      .replace(/[^a-z0-9 ]/g, '');
  }

  extractPublisherCode(publisherMarks) {
    if (!publisherMarks) return null;
    const parts = publisherMarks.split(' / ');
    return parts[0].trim();
  }

  extractArticleNumber(identifier) {
    if (!identifier || !identifier.trim()) return null;
    if (identifier.includes('/')) return null;
    if (/^\d{8}$|^\d{13}$/.test(identifier.trim())) return null;
    return identifier.trim();
  }

  extractEAN(identifier) {
    if (!identifier || !identifier.trim()) return null;
    const clean = identifier.trim();
    if (/^\d{8}$|^\d{13}$/.test(clean)) {
      return clean;
    }
    return null;
  }

  getIdentificationStatus(identifier) {
    if (!identifier || !identifier.trim()) {
      return 'incomplete';
    }
    if (identifier.includes('/')) {
      return 'needs_review';
    }
    return 'complete';
  }

  mapSourceType(linkType) {
    const mapping = {
      'Direkt-PDF': 'official_rule_pdf',
      'Produktseite mit PDF': 'official_product_page',
      'Regelkatalog-Eintrag': 'official_rule_archive',
      'Produktseite mit Regel': 'official_product_page'
    };
    return mapping[linkType] || 'unknown';
  }

  async createImportBatch() {
    try {
      const batch = await pb.collection('import_batches').create({
        import_name: 'NeuroPlay Brettspielanleitungen Quellenkatalog',
        source_file_name: 'NeuroPlay_Brettspielanleitungen_Quellenkatalog_v0.1.0.xlsx',
        source_version: '0.1.0',
        started_at: new Date().toISOString(),
        status: 'running',
        publisher_rows_found: 0,
        publisher_rows_created: 0,
        game_source_rows_found: 0,
        games_created: 0,
        editions_created: 0,
        rule_sources_created: 0,
        records_skipped: 0,
        records_with_warnings: 0,
        records_with_errors: 0,
        error_log: '[]',
        warning_log: '[]'
      });
      
      this.importBatchId = batch.id;
      this.stats.importBatchId = batch.id;
      return batch.id;
    } catch (error) {
      throw new Error(`Failed to create import batch: ${error.message}`);
    }
  }

  async importPublishers(publishersData) {
    this.stats.publisherRowsFound = publishersData.length;
    
    for (const row of publishersData) {
      try {
        const publisherCode = row['Verlag-ID'];
        
        // Check for existing publisher by code
        let existing = null;
        try {
          const list = await pb.collection('publishers').getList(1, 1, {
            filter: `publisher_code = "${publisherCode}"`
          });
          if (list.items.length > 0) {
            existing = list.items[0];
          }
        } catch (err) {
          // Collection might not exist yet, continue
        }

        const publisherData = {
          publisher_code: publisherCode,
          name_de: row['Verlag'],
          country: row['Land'] || null,
          priority: parseInt(row['Priorität']) || null,
          website: row['Startseite'] || null,
          notes: row['Hinweis'] || null,
          original_record_id: row['Datensatz-ID'] || `${publisherCode}_${Date.now()}`,
          import_batch: this.importBatchId
        };

        if (existing) {
          // Update existing
          await pb.collection('publishers').update(existing.id, publisherData);
          this.stats.publishersUpdated++;
          this.publishers[publisherCode] = existing.id;
        } else {
          // Create new
          const created = await pb.collection('publishers').create(publisherData);
          this.stats.publishersCreated++;
          this.publishers[publisherCode] = created.id;
        }
      } catch (error) {
        this.stats.errors.push(`Publisher "${row['Verlag']}": ${error.message}`);
      }
    }
  }

  async importGameSources(gamesData) {
    this.stats.gameRowsFound = gamesData.length;
    
    for (const row of gamesData) {
      try {
        // Get or create game
        const gameTitle = row['Spiel'];
        const gameLookupKey = this.normalize(gameTitle);
        
        let gameId = this.games[gameLookupKey];
        
        if (!gameId) {
          // Check for existing game
          let existing = null;
          try {
            const list = await pb.collection('games').getList(1, 1, {
              filter: `normalized_title = "${gameLookupKey}"`
            });
            if (list.items.length > 0) {
              existing = list.items[0];
              gameId = existing.id;
              this.stats.gamesUpdated++;
            }
          } catch (err) {
            // Collection might not exist
          }

          if (!gameId) {
            // Create new game
            try {
              const created = await pb.collection('games').create({
                title: gameTitle,
                normalized_title: gameLookupKey,
                category: row['Kategorie'],
                status: 'cataloged',
                notes: null,
                source_import_id: this.importBatchId
              });
              gameId = created.id;
              this.stats.gamesCreated++;
            } catch (err) {
              throw new Error(`Cannot create game: ${err.message}`);
            }
          }
          
          this.games[gameLookupKey] = gameId;
        }

        // Get publisher ID
        const publisherCode = this.extractPublisherCode(row['Verlag / Marke']);
        const publisherId = this.publishers[publisherCode] || null;

        if (!publisherId && publisherCode) {
          this.stats.warnings.push(`Game "${gameTitle}": Publisher "${publisherCode}" not found`);
        }

        // Create or find edition
        let editionId = null;
        try {
          const list = await pb.collection('game_editions').getList(1, 1, {
            filter: `game_id = "${gameId}" && publisher_id = "${publisherId || ''}" && language = "${row['Sprache']}"`
          });
          if (list.items.length > 0) {
            editionId = list.items[0].id;
            this.stats.editionsUpdated++;
          }
        } catch (err) {
          // Continue
        }

        if (!editionId) {
          // Create new edition
          try {
            const created = await pb.collection('game_editions').create({
              game: gameId,
              publisher: publisherId || null,
              article_number: this.extractArticleNumber(row['Artikelnummer / EAN']),
              ean_13: this.extractEAN(row['Artikelnummer / EAN']),
              identification_status: this.getIdentificationStatus(row['Artikelnummer / EAN']),
              notes: row['Hinweis'] || null,
              original_record_id: row['Datensatz-ID'] || `edition_${gameId}_${Date.now()}`,
              import_batch: this.importBatchId
            });
            editionId = created.id;
            this.stats.editionsCreated++;
          } catch (err) {
            throw new Error(`Cannot create edition: ${err.message}`);
          }
        }

        // Create rule source
        try {
          const list = await pb.collection('rule_sources').getList(1, 1, {
            filter: `original_record_id = "${row['Datensatz-ID']}"`
          });
          
          if (list.items.length === 0) {
            // Create new rule source
            const urlToUse = row['Anleitung / Regelquelle'] || row['Produkt- oder Katalogseite'];
            await pb.collection('rule_sources').create({
              game: gameId,
              edition: editionId || null,
              source_type: this.mapSourceType(row['Linktyp']),
              language: row['Sprache'],
              url: urlToUse,
              link_label: row['Linktyp'] || 'Rule source',
              verification_status: row['Prüfstatus'].includes('offiziell') || row['Prüfstatus'].includes('geprüft') ? 'verified' : 'unverified',
              verified_at: row['Geprüft am'] ? new Date(row['Geprüft am']).toISOString() : null,
              original_record_id: row['Datensatz-ID'],
              import_batch: this.importBatchId
            });
            this.stats.ruleSourcesCreated++;
          } else {
            this.stats.ruleSourcesUpdated++;
          }
        } catch (err) {
          throw new Error(`Cannot create rule source: ${err.message}`);
        }

      } catch (error) {
        this.stats.errors.push(`Game/Source "${row['Spiel']}": ${error.message}`);
      }
    }
  }

  async finalizeImportBatch() {
    try {
      const status = this.stats.errors.length > 0 
        ? 'completed_with_errors'
        : (this.stats.warnings.length > 0 ? 'completed_with_warnings' : 'completed');

      await pb.collection('import_batches').update(this.importBatchId, {
        completed_at: new Date().toISOString(),
        status: status,
        publisher_rows_found: this.stats.publisherRowsFound,
        publisher_rows_created: this.stats.publishersCreated,
        game_source_rows_found: this.stats.gameRowsFound,
        games_created: this.stats.gamesCreated,
        editions_created: this.stats.editionsCreated,
        rule_sources_created: this.stats.ruleSourcesCreated,
        records_skipped: 0,
        records_with_warnings: this.stats.warnings.length,
        records_with_errors: this.stats.errors.length,
        error_log: JSON.stringify(this.stats.errors)
      });
    } catch (error) {
      console.error('Failed to finalize batch:', error);
    }
  }

  async run(publishersData, gamesData) {
    try {
      await this.createImportBatch();
      await this.importPublishers(publishersData);
      await this.importGameSources(gamesData);
      await this.finalizeImportBatch();
      
      return {
        success: true,
        batchId: this.importBatchId,
        stats: this.stats
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        stats: this.stats
      };
    }
  }
}

export default CatalogImporter;

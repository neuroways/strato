/**
 * Server-side initialization hook for PocketBase collections
 * 
 * This module is designed to be imported by a server-side context (e.g., a Vite plugin
 * or Express middleware that runs before the app). It creates all required collections
 * with full admin privileges.
 * 
 * In STRATO environment: requires integration with the platform's initialization system
 * or a custom build step that runs this before the app starts.
 */

import PocketBase from 'pocketbase';

// Build the correct PocketBase URL based on environment
function getPocketBaseUrl() {
  // In server context, use localhost and let STRATO's internal networking route correctly
  return process.env.POCKETBASE_URL || 'http://localhost:8090';
}

// Get admin credentials from environment
function getAdminCredentials() {
  const email = process.env.POCKETBASE_ADMIN_EMAIL || 'admin@example.com';
  const password = process.env.POCKETBASE_ADMIN_PASSWORD || 'admin123456';
  return { email, password };
}

export const COLLECTIONS = [
  {
    name: 'publishers',
    type: 'base',
    schema: [
      { id: 'text_p1', name: 'publisher_code', type: 'text', required: true, unique: true },
      { id: 'text_p2', name: 'name_de', type: 'text', required: true },
      { id: 'number_p1', name: 'priority', type: 'number', required: false },
      { id: 'text_p3', name: 'country', type: 'text', required: false },
      { id: 'url_p1', name: 'website', type: 'url', required: false },
      { id: 'text_p4', name: 'notes', type: 'text', required: false },
      { id: 'text_p5', name: 'original_record_id', type: 'text', required: false, unique: true },
    ]
  },
  {
    name: 'games',
    type: 'base',
    schema: [
      { id: 'text_g1', name: 'title_de', type: 'text', required: true },
      { id: 'text_g2', name: 'title_normalized', type: 'text', required: false },
      { id: 'relation_g1', name: 'publisher', type: 'relation', required: true, collectionId: 'publishers' },
      { id: 'text_g3', name: 'category_primary', type: 'text', required: false },
      { id: 'text_g4', name: 'category_secondary', type: 'text', required: false },
      { id: 'select_g1', name: 'language', type: 'select', required: false, values: ['de', 'en', 'fr', 'mixed'] },
      { id: 'number_g1', name: 'year_published', type: 'number', required: false },
      { id: 'number_g2', name: 'players_min', type: 'number', required: false },
      { id: 'number_g3', name: 'players_max', type: 'number', required: false },
      { id: 'number_g4', name: 'duration_minutes', type: 'number', required: false },
      { id: 'number_g5', name: 'age_min', type: 'number', required: false },
      { id: 'text_g5', name: 'original_record_id', type: 'text', required: false, unique: true },
    ]
  },
  {
    name: 'game_editions',
    type: 'base',
    schema: [
      { id: 'relation_e1', name: 'game', type: 'relation', required: true, collectionId: 'games' },
      { id: 'text_e1', name: 'edition_name', type: 'text', required: false },
      { id: 'number_e1', name: 'edition_year', type: 'number', required: false },
      { id: 'text_e2', name: 'ean_13', type: 'text', required: false },
      { id: 'text_e3', name: 'article_number', type: 'text', required: false },
      { id: 'select_e1', name: 'identification_status', type: 'select', required: false, values: ['complete', 'incomplete', 'needs_review'] },
      { id: 'text_e4', name: 'notes', type: 'text', required: false },
      { id: 'text_e5', name: 'original_record_id', type: 'text', required: false, unique: true },
    ]
  },
  {
    name: 'rule_sources',
    type: 'base',
    schema: [
      { id: 'relation_r1', name: 'game', type: 'relation', required: true, collectionId: 'games' },
      { id: 'relation_r2', name: 'edition', type: 'relation', required: false, collectionId: 'game_editions' },
      { id: 'select_r1', name: 'source_type', type: 'select', required: true, values: ['official_rule_pdf', 'official_product_page', 'official_rule_archive', 'unknown'] },
      { id: 'select_r2', name: 'language', type: 'select', required: true, values: ['de', 'en', 'fr', 'mixed'] },
      { id: 'url_r1', name: 'url', type: 'url', required: true },
      { id: 'text_r1', name: 'link_label', type: 'text', required: false },
      { id: 'select_r3', name: 'verification_status', type: 'select', required: false, values: ['verified', 'unverified', 'broken'] },
      { id: 'date_r1', name: 'verified_at', type: 'date', required: false },
      { id: 'text_r2', name: 'original_record_id', type: 'text', required: false, unique: true },
    ]
  },
  {
    name: 'import_batches',
    type: 'base',
    schema: [
      { id: 'text_ib1', name: 'import_name', type: 'text', required: true },
      { id: 'text_ib2', name: 'source_file_name', type: 'text', required: true },
      { id: 'text_ib3', name: 'source_version', type: 'text', required: false },
      { id: 'date_ib1', name: 'started_at', type: 'date', required: true },
      { id: 'date_ib2', name: 'completed_at', type: 'date', required: false },
      { id: 'select_ib1', name: 'status', type: 'select', required: true, values: ['running', 'completed', 'failed'] },
      { id: 'number_ib1', name: 'publisher_rows_found', type: 'number', required: false },
      { id: 'number_ib2', name: 'publisher_rows_created', type: 'number', required: false },
      { id: 'number_ib3', name: 'game_source_rows_found', type: 'number', required: false },
      { id: 'number_ib4', name: 'games_created', type: 'number', required: false },
      { id: 'number_ib5', name: 'editions_created', type: 'number', required: false },
      { id: 'number_ib6', name: 'rule_sources_created', type: 'number', required: false },
      { id: 'number_ib7', name: 'records_skipped', type: 'number', required: false },
      { id: 'number_ib8', name: 'records_with_warnings', type: 'number', required: false },
      { id: 'number_ib9', name: 'records_with_errors', type: 'number', required: false },
      { id: 'json_ib1', name: 'error_log', type: 'json', required: false },
      { id: 'json_ib2', name: 'warning_log', type: 'json', required: false },
    ]
  },
  {
    name: 'source_verification_history',
    type: 'base',
    schema: [
      { id: 'relation_sv1', name: 'rule_source', type: 'relation', required: true, collectionId: 'rule_sources' },
      { id: 'date_sv1', name: 'verified_at', type: 'date', required: true },
      { id: 'number_sv1', name: 'http_status', type: 'number', required: false },
      { id: 'select_sv1', name: 'verification_status', type: 'select', required: true, values: ['verified', 'broken', 'redirected'] },
      { id: 'text_sv1', name: 'notes', type: 'text', required: false },
    ]
  }
];

export async function initializePocketBaseCollections() {
  const pbUrl = getPocketBaseUrl();
  const { email, password } = getAdminCredentials();
  const pb = new PocketBase(pbUrl);

  try {
    console.log(`[PB Init] Authenticating as admin...`);
    await pb.admins.authWithPassword(email, password);

    console.log(`[PB Init] Fetching existing collections...`);
    const collections = await pb.collections.getFullList();
    const existingNames = new Set(collections.map(c => c.name));
    const collectionIds = {};
    collections.forEach(c => {
      collectionIds[c.name] = c.id;
    });

    let createdCount = 0;
    let skippedCount = 0;

    for (const collDef of COLLECTIONS) {
      if (existingNames.has(collDef.name)) {
        console.log(`[PB Init] ✓ ${collDef.name} (exists)`);
        skippedCount++;
        continue;
      }

      console.log(`[PB Init] Creating ${collDef.name}...`);
      
      const schema = collDef.schema.map(field => {
        if (field.collectionId && !field.collectionId.match(/^[a-z0-9]+$/)) {
          return {
            ...field,
            collectionId: collectionIds[field.collectionId] || field.collectionId
          };
        }
        return field;
      });

      await pb.collections.create({
        name: collDef.name,
        type: collDef.type,
        schema: schema,
        system: false,
      });

      collectionIds[collDef.name] = collDef.name;
      console.log(`[PB Init] ✓ ${collDef.name} (created)`);
      createdCount++;
    }

    console.log(`[PB Init] Complete: ${createdCount} created, ${skippedCount} existing`);
    return { success: true, created: createdCount, skipped: skippedCount };
  } catch (error) {
    console.error(`[PB Init] Failed: ${error.message}`);
    throw error;
  }
}

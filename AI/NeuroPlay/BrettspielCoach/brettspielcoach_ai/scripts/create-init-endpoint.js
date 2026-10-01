/**
 * Generate a PocketBase admin API endpoint for collection initialization.
 * 
 * For STRATO environments:
 * 1. Add this file as a custom service in PocketBase
 * 2. Or: Execute this manually in PocketBase's admin UI Scripts section
 * 
 * This creates an HTTP endpoint that accepts admin credentials and initializes collections.
 */

const collectionDefinitions = `
// PocketBase Hook: Initialize catalog collections
// Add this to PocketBase's go-routines or custom scripts
onBeforeServe((e) => {
  e.router.post("/api/init-collections", (c) => {
    // Check if already initialized
    const collections = e.dao.findCollectionsByType("base");
    const needed = ["publishers", "games", "game_editions", "rule_sources", "import_batches", "source_verification_history"];
    const existing = collections.map(c => c.name);
    
    if (needed.every(n => existing.includes(n))) {
      return c.json(200, {
        success: true,
        message: "Collections already exist",
        stats: { skipped: needed.length }
      });
    }

    // Define collection schemas
    const schemas = {
      publishers: {
        name: "publishers",
        type: "base",
        fields: [
          { name: "id", type: "text", system: true },
          { name: "created", type: "date", system: true },
          { name: "updated", type: "date", system: true },
          { name: "publisher_code", type: "text", required: true, unique: true },
          { name: "name_de", type: "text", required: true },
          { name: "priority", type: "number" },
          { name: "country", type: "text" },
          { name: "website", type: "url" },
          { name: "notes", type: "text" },
          { name: "original_record_id", type: "text", unique: true }
        ]
      },
      games: {
        name: "games",
        type: "base",
        fields: [
          { name: "id", type: "text", system: true },
          { name: "created", type: "date", system: true },
          { name: "updated", type: "date", system: true },
          { name: "title_de", type: "text", required: true },
          { name: "title_normalized", type: "text" },
          { name: "publisher", type: "relation", required: true, collectionId: "publishers" },
          { name: "category_primary", type: "text" },
          { name: "category_secondary", type: "text" },
          { name: "language", type: "select", values: ["de", "en", "fr", "mixed"] },
          { name: "year_published", type: "number" },
          { name: "players_min", type: "number" },
          { name: "players_max", type: "number" },
          { name: "duration_minutes", type: "number" },
          { name: "age_min", type: "number" },
          { name: "original_record_id", type: "text", unique: true }
        ]
      },
      game_editions: {
        name: "game_editions",
        type: "base",
        fields: [
          { name: "id", type: "text", system: true },
          { name: "created", type: "date", system: true },
          { name: "updated", type: "date", system: true },
          { name: "game", type: "relation", required: true, collectionId: "games" },
          { name: "edition_name", type: "text" },
          { name: "edition_year", type: "number" },
          { name: "ean_13", type: "text" },
          { name: "article_number", type: "text" },
          { name: "identification_status", type: "select", values: ["complete", "incomplete", "needs_review"] },
          { name: "notes", type: "text" },
          { name: "original_record_id", type: "text", unique: true }
        ]
      },
      rule_sources: {
        name: "rule_sources",
        type: "base",
        fields: [
          { name: "id", type: "text", system: true },
          { name: "created", type: "date", system: true },
          { name: "updated", type: "date", system: true },
          { name: "game", type: "relation", required: true, collectionId: "games" },
          { name: "edition", type: "relation", collectionId: "game_editions" },
          { name: "source_type", type: "select", required: true, values: ["official_rule_pdf", "official_product_page", "official_rule_archive", "unknown"] },
          { name: "language", type: "select", required: true, values: ["de", "en", "fr", "mixed"] },
          { name: "url", type: "url", required: true },
          { name: "link_label", type: "text" },
          { name: "verification_status", type: "select", values: ["verified", "unverified", "broken"] },
          { name: "verified_at", type: "date" },
          { name: "original_record_id", type: "text", unique: true }
        ]
      },
      import_batches: {
        name: "import_batches",
        type: "base",
        fields: [
          { name: "id", type: "text", system: true },
          { name: "created", type: "date", system: true },
          { name: "updated", type: "date", system: true },
          { name: "import_name", type: "text", required: true },
          { name: "source_file_name", type: "text", required: true },
          { name: "source_version", type: "text" },
          { name: "started_at", type: "date", required: true },
          { name: "completed_at", type: "date" },
          { name: "status", type: "select", required: true, values: ["running", "completed", "failed"] },
          { name: "publisher_rows_found", type: "number" },
          { name: "publisher_rows_created", type: "number" },
          { name: "game_source_rows_found", type: "number" },
          { name: "games_created", type: "number" },
          { name: "editions_created", type: "number" },
          { name: "rule_sources_created", type: "number" },
          { name: "records_skipped", type: "number" },
          { name: "records_with_warnings", type: "number" },
          { name: "records_with_errors", type: "number" },
          { name: "error_log", type: "json" },
          { name: "warning_log", type: "json" }
        ]
      },
      source_verification_history: {
        name: "source_verification_history",
        type: "base",
        fields: [
          { name: "id", type: "text", system: true },
          { name: "created", type: "date", system: true },
          { name: "updated", type: "date", system: true },
          { name: "rule_source", type: "relation", required: true, collectionId: "rule_sources" },
          { name: "verified_at", type: "date", required: true },
          { name: "http_status", type: "number" },
          { name: "verification_status", type: "select", required: true, values: ["verified", "broken", "redirected"] },
          { name: "notes", type: "text" }
        ]
      }
    };

    // Create missing collections
    let created = 0;
    for (const collName of needed) {
      if (existing.includes(collName)) continue;
      
      const schema = schemas[collName];
      const collection = new Collection(schema);
      e.dao.saveCollection(collection);
      created++;
    }

    return c.json(200, {
      success: true,
      message: "Collections initialized",
      stats: { created, skipped: existing.filter(e => needed.includes(e)).length }
    });
  }, "GET", "POST");
});
`;

console.log('PocketBase Collection Initialization Hook');
console.log('=========================================\n');
console.log('To use this in PocketBase:');
console.log('1. Log in to PocketBase admin UI');
console.log('2. Go to Settings > Custom Scripts');
console.log('3. Paste the code below in the "onBeforeServe" section\n');
console.log(collectionDefinitions);

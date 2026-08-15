/**
 * NW-DEPLOY-001 — NeuroWays Migration Script
 * Migrates all fachliche Stammdaten from DEV to LIVE.
 * Idempotent: upserts by id — safe to run multiple times.
 * NEVER migrates: users, checkins, checkin_answers, checkin_results, identity_test_values, identity_audit_log
 */
const http = require("http");
const crypto = require("crypto");

const DEV_TOKEN  = process.env.DEV_TOKEN;
const LIVE_TOKEN = process.env.LIVE_TOKEN;

const DEV_BASE  = "http://localhost/.sfs-bd/api";
const LIVE_BASE = "http://localhost/.sfs-be/api";

function req(method, baseUrl, path, body, token) {
  return new Promise((resolve, reject) => {
    const opts = {
      socketPath: "/run/cm4all/http/tie.socket",
      hostname: "localhost", method,
      path: baseUrl.replace("http://localhost","") + path,
      headers: { "Authorization": "Bearer " + token, "Content-Type": "application/json" }
    };
    const r = http.request(opts, res => {
      let b = ""; res.on("data", c => b += c);
      res.on("end", () => { try { resolve({ s: res.statusCode, b: JSON.parse(b) }); } catch(e) { resolve({ s: res.statusCode, b: {} }); } });
    });
    r.on("error", reject);
    if (body) r.write(JSON.stringify(body));
    r.end();
  });
}

async function getAllRecords(baseUrl, col, token) {
  const all = [];
  let page = 1;
  while (true) {
    const res = await req("GET", baseUrl, `/collections/${col}/records?page=${page}&perPage=200&skipTotal=false`, null, token);
    if (!res.b.items || res.b.items.length === 0) break;
    all.push(...res.b.items);
    if (all.length >= res.b.totalItems) break;
    page++;
  }
  return all;
}

// Strip PocketBase metadata fields that should not be sent on create/update
function stripMeta(record) {
  const { collectionId, collectionName, expand, ...data } = record;
  return data;
}

async function upsertRecord(col, record, liveToken) {
  const data = stripMeta(record);
  // Try to get existing record by id
  const check = await req("GET", LIVE_BASE, `/collections/${col}/records/${record.id}`, null, liveToken);
  if (check.s === 200) {
    // Update
    const upd = await req("PATCH", LIVE_BASE, `/collections/${col}/records/${record.id}`, data, liveToken);
    return { action: "updated", id: record.id, ok: upd.s < 300 };
  } else {
    // Create with explicit id
    const cre = await req("POST", LIVE_BASE, `/collections/${col}/records`, data, liveToken);
    return { action: "created", id: record.id, ok: cre.s < 300, err: cre.s >= 300 ? JSON.stringify(cre.b).slice(0,120) : null };
  }
}

// Migration manifest — ordered by dependency
const MASTER_DATA_COLLECTIONS = [
  "methods",
  "questions",
  "answer_options",
  "result_rules",
  "world_versions",
  "world_regions",
  "design_tokens",
  "design_rules",
  "animation_rules",
  "accessibility_rules",
  "asset_versions",
  "asset_files",
  "asset_assignments",
  "asset_metadata",
  "asset_prompts",
  "pkg_bases",
  "pkg_base_versions",
  "pkg_modules",
  "pkg_module_versions",
];

async function run() {
  const startTime = Date.now();
  const results = {};
  let totalMigrated = 0;
  let totalErrors = 0;

  console.log("══════════════════════════════════════════════════");
  console.log("NW-DEPLOY-001 — Stammdaten-Migration DEV → LIVE");
  console.log("Gestartet:", new Date().toISOString());
  console.log("══════════════════════════════════════════════════\n");

  for (const col of MASTER_DATA_COLLECTIONS) {
    console.log(`[${col}] Lade Quelldaten …`);
    const records = await getAllRecords(DEV_BASE, col, DEV_TOKEN);
    console.log(`[${col}] ${records.length} Datensätze gefunden`);
    
    let created = 0, updated = 0, errors = 0;
    for (const rec of records) {
      const r = await upsertRecord(col, rec, LIVE_TOKEN);
      if (r.ok) {
        if (r.action === "created") created++;
        else updated++;
      } else {
        errors++;
        console.log(`  ⚠️  ${col}/${r.id}: ${r.err}`);
      }
    }
    
    results[col] = { total: records.length, created, updated, errors };
    totalMigrated += records.length;
    totalErrors += errors;
    console.log(`[${col}] ✅ ${created} neu + ${updated} aktualisiert${errors ? ` + ⚠️ ${errors} Fehler` : ""}\n`);
  }

  const duration = ((Date.now() - startTime) / 1000).toFixed(1);
  
  // Compute checksum over migration results
  const cs = crypto.createHash("sha256").update(JSON.stringify(results)).digest("hex");

  console.log("══════════════════════════════════════════════════");
  console.log("MIGRATIONSERGEBNIS");
  console.log("══════════════════════════════════════════════════");
  console.log(`Dauer:            ${duration}s`);
  console.log(`Gesamt migriert:  ${totalMigrated} Datensätze`);
  console.log(`Fehler:           ${totalErrors}`);
  console.log(`Prüfsumme:        ${cs.slice(0,32)}…`);
  console.log("");

  // Write results to file for deploy report
  const fs = require("fs");
  fs.writeFileSync("/tmp/nw_migration_result.json", JSON.stringify({ results, totalMigrated, totalErrors, duration, checksum: cs, timestamp: new Date().toISOString() }, null, 2));
  
  return totalErrors === 0;
}

run().then(ok => process.exit(ok ? 0 : 1)).catch(e => { console.error(e); process.exit(1); });

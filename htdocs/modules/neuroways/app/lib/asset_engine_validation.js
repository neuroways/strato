const http = require("http");

const TOKEN = process.env.PB_TOKEN;
const WV_ID = "3hbx5gsy932l77e"; // published world_version 1.1.0

function req(method, path, body) {
  return new Promise((resolve, reject) => {
    const opts = {
      socketPath: "/run/cm4all/http/tie.socket",
      hostname: "localhost",
      method,
      path: "/.sfs-bd/api" + path,
      headers: {
        "Authorization": "Bearer " + TOKEN,
        "Content-Type": "application/json"
      }
    };
    const r = http.request(opts, res => {
      let b = "";
      res.on("data", c => b += c);
      res.on("end", () => resolve(JSON.parse(b)));
    });
    r.on("error", reject);
    if (body) r.write(JSON.stringify(body));
    r.end();
  });
}

// ─── Validation helpers ──────────────────────────────────────────────────────

const VALID_ASSET_TYPES = ["illustration","svg_icon","logo","animation","audio","video","font","texture","background","component_asset"];
const VALID_ASSET_STATUS = ["draft","review","published","rejected","superseded","archived"];
const VALID_TARGET_TYPES = ["world","world_region","component","method","result_rule"];
const VALID_USAGE_TYPES  = ["hero","background","result_image","region_icon","energy_icon","thumbnail","texture"];
const VALID_VALUE_TYPES  = ["string","number","boolean","json","date"];
const VALID_PROMPT_STATUS = ["draft","approved","archived"];
const MUTABLE_AFTER_PUBLISH = ["status","superseded_at","superseded_by_id","updated"];

async function checkRefExists(col, id) {
  if (!id) return true; // optional ref
  const r = await req("GET", `/collections/${col}/records/${id}`);
  return !r.message;
}

async function checkUnique(col, filter) {
  const enc = encodeURIComponent(filter);
  const r = await req("GET", `/collections/${col}/records?filter=${enc}&perPage=1`);
  return (r.totalItems || 0) === 0;
}

async function checkPrimaryUnique(targetType, targetId, usageType, excludeId) {
  const today = new Date().toISOString().split("T")[0];
  const enc = encodeURIComponent(
    `target_type="${targetType}"&&target_id="${targetId}"&&usage_type="${usageType}"&&is_primary=true`
  );
  const r = await req("GET", `/collections/asset_assignments/records?filter=${enc}&perPage=10`);
  const active = (r.items || []).filter(a => {
    if (a.id === excludeId) return false;
    if (a.valid_to && a.valid_to < today) return false;
    if (a.valid_from && a.valid_from > today) return false;
    return true;
  });
  return active.length === 0;
}

async function isPublished(assetVersionId) {
  const r = await req("GET", `/collections/asset_versions/records/${assetVersionId}`);
  return r.status === "published";
}

// ─── Guarded write functions ─────────────────────────────────────────────────

async function createAssetVersion(data) {
  const errors = [];
  if (!VALID_ASSET_TYPES.includes(data.asset_type)) errors.push("Ungültiger asset_type: " + data.asset_type);
  if (!VALID_ASSET_STATUS.includes(data.status)) errors.push("Ungültiger status: " + data.status);
  if (!(await checkRefExists("world_versions", data.world_version_id))) errors.push("world_version_id existiert nicht");
  if (data.superseded_by_id && !(await checkRefExists("asset_versions", data.superseded_by_id))) errors.push("superseded_by_id existiert nicht");
  const unique = await checkUnique("asset_versions", `code="${data.code}"&&version="${data.version}"`);
  if (!unique) errors.push(`Asset ${data.code} v${data.version} existiert bereits`);
  if (errors.length) return { ok: false, errors };
  const r = await req("POST", "/collections/asset_versions/records", data);
  return r.message ? { ok: false, errors: [r.message] } : { ok: true, record: r };
}

async function createAssetFile(data) {
  const errors = [];
  if (!(await checkRefExists("asset_versions", data.asset_version_id))) errors.push("asset_version_id existiert nicht");
  if (await isPublished(data.asset_version_id)) errors.push("Asset ist veröffentlicht — keine neuen Dateien erlaubt");
  data.locale = data.locale || "*";
  data.theme = data.theme || "standard";
  data.resolution_variant = data.resolution_variant || "standard";
  if (!data.locale || !data.theme || !data.resolution_variant) errors.push("locale, theme und resolution_variant sind Pflicht");
  if ((data.file_url || "").startsWith("data:")) errors.push("Data-URI in file_url nicht erlaubt");
  const unique = await checkUnique("asset_files",
    `asset_version_id="${data.asset_version_id}"&&resolution_variant="${data.resolution_variant}"&&locale="${data.locale}"&&theme="${data.theme}"`);
  if (!unique) errors.push("Dateivariante bereits vorhanden (Duplikat)");
  if (errors.length) return { ok: false, errors };
  const r = await req("POST", "/collections/asset_files/records", data);
  return r.message ? { ok: false, errors: [r.message] } : { ok: true, record: r };
}

async function createAssetAssignment(data) {
  const errors = [];
  if (!(await checkRefExists("asset_versions", data.asset_version_id))) errors.push("asset_version_id existiert nicht");
  if (await isPublished(data.asset_version_id)) errors.push("Asset ist veröffentlicht — keine neuen Zuordnungen erlaubt");
  if (!VALID_TARGET_TYPES.includes(data.target_type)) errors.push("Ungültiger target_type: " + data.target_type);
  if (!VALID_USAGE_TYPES.includes(data.usage_type)) errors.push("Ungültiger usage_type: " + data.usage_type);
  const unique = await checkUnique("asset_assignments",
    `asset_version_id="${data.asset_version_id}"&&target_type="${data.target_type}"&&target_id="${data.target_id}"&&usage_type="${data.usage_type}"`);
  if (!unique) errors.push("Zuordnung bereits vorhanden (Duplikat)");
  if (data.is_primary) {
    const primaryFree = await checkPrimaryUnique(data.target_type, data.target_id, data.usage_type, null);
    if (!primaryFree) errors.push("Für diese Kombination existiert bereits eine primäre Zuordnung");
  }
  if (errors.length) return { ok: false, errors };
  const r = await req("POST", "/collections/asset_assignments/records", data);
  return r.message ? { ok: false, errors: [r.message] } : { ok: true, record: r };
}

async function createAssetMetadata(data) {
  const errors = [];
  if (!(await checkRefExists("asset_versions", data.asset_version_id))) errors.push("asset_version_id existiert nicht");
  if (await isPublished(data.asset_version_id)) errors.push("Asset ist veröffentlicht — Metadaten unveränderlich");
  if (!VALID_VALUE_TYPES.includes(data.value_type || "string")) errors.push("Ungültiger value_type");
  data.value_type = data.value_type || "string";
  const unique = await checkUnique("asset_metadata",
    `asset_version_id="${data.asset_version_id}"&&metadata_key="${data.metadata_key}"`);
  if (!unique) errors.push("Metadatenschlüssel bereits vorhanden (Duplikat)");
  if (errors.length) return { ok: false, errors };
  const r = await req("POST", "/collections/asset_metadata/records", data);
  return r.message ? { ok: false, errors: [r.message] } : { ok: true, record: r };
}

async function createAssetPrompt(data) {
  const errors = [];
  if (!(await checkRefExists("asset_versions", data.asset_version_id))) errors.push("asset_version_id existiert nicht");
  if (await isPublished(data.asset_version_id)) errors.push("Asset ist veröffentlicht — Prompts unveränderlich");
  if (!(await checkRefExists("world_versions", data.source_world_version_id))) errors.push("source_world_version_id existiert nicht");
  if (!VALID_PROMPT_STATUS.includes(data.status)) errors.push("Ungültiger Prompt-Status: " + data.status);
  const unique = await checkUnique("asset_prompts",
    `asset_version_id="${data.asset_version_id}"&&prompt_version="${data.prompt_version}"`);
  if (!unique) errors.push("Prompt-Version bereits vorhanden (Duplikat)");
  if (errors.length) return { ok: false, errors };
  const r = await req("POST", "/collections/asset_prompts/records", data);
  return r.message ? { ok: false, errors: [r.message] } : { ok: true, record: r };
}

module.exports = { createAssetVersion, createAssetFile, createAssetAssignment, createAssetMetadata, createAssetPrompt, checkRefExists, isPublished };

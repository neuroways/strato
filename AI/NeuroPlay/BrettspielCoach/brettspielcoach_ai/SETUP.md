# NeuroPlay Setup Guide

## Prerequisites

### 1. PocketBase Access

The app requires PocketBase to be running and accessible. In STRATO environments, PocketBase is automatically provisioned at:
- **Development**: `/.sfs-bd/`
- **Production**: `/.sfs-be/`

### 2. Admin Credentials

To initialize the catalog schema, you need PocketBase admin credentials.

## Installation Steps

### Step 1: Initialize Database Collections

The catalog import requires 6 collections to be created in PocketBase:
- `publishers`
- `games`
- `game_editions`
- `rule_sources`
- `import_batches`
- `source_verification_history`

**Option A: Manual Setup (via Admin UI)**

1. Open PocketBase Admin UI:
   - Dev: `https://<your-domain>/.sfs-bd/`
   - Prod: `https://<your-domain>/.sfs-be/`

2. Log in with your admin credentials

3. In Admin Panel, create collections manually:
   - Use the schemas defined in `app/AGENTS.md` under "Database Schema"
   - Or import the JSON definitions from `app/scripts/`

**Option B: Automated Setup (if accessible)**

If you have direct access to PocketBase:

```bash
# Copy env template
cp app/.env.example app/.env

# Edit with your admin credentials
nano app/.env

# Run initialization
npm run init-collections
```

### Step 2: Run the Catalog Import

Once collections exist:

1. Build the app: `npm run build:prod`
2. Publish to your domain
3. Open Admin Panel > Catalog Import
4. Click "Start Import"
5. Monitor the console for results

## Troubleshooting

### Collections Not Initialized

**Error**: "Failed to create import batch: Missing or invalid collection context"

**Solution**:
1. Verify collections exist in PocketBase Admin UI
2. Check collection names match exactly (case-sensitive)
3. Ensure all required fields are present per schema

### Authentication Failed

**Error**: "The request requires valid record authorization token"

**Solution**:
1. Verify PocketBase is running
2. Check admin credentials in `.env`
3. Try logging in manually in PocketBase Admin UI first

### Import Shows 0 Records

**Possible Causes**:
- CSV files (`verlage.csv`, `spiele_anleitungen.csv`) not found in `public/`
- Collection relations not properly configured
- Collections missing required fields

**Solution**:
1. Verify CSV files exist: `ls public/verlage.csv public/spiele_anleitungen.csv`
2. Check collection schemas in PocketBase Admin UI
3. Re-run init-collections script if fields were added

## Database Schema Reference

All collection definitions are in:
- **Details**: `app/src/lib/catalog-import.js` (field validation)
- **Init Script**: `app/scripts/init-pb-collections.js` (automated creation)
- **Shell Script**: `app/scripts/init-collections.sh` (manual via REST API)

## Testing Data

Test import with the example catalog:
- **Publishers**: 12 records (P01–P12)
- **Games**: 52 records from catalog
- **Expected Relations**: 1:M from publishers → games, games → editions → rule_sources

All data is idempotent and safe to import multiple times.

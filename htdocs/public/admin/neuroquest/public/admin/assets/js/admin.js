const API_URL = '../../../api/index.php?route=admin/dashboard';

const state = {
  tables: []
};

const elements = {
  loading: document.querySelector('#loadingState'),
  error: document.querySelector('#errorState'),
  errorMessage: document.querySelector('#errorMessage'),
  dashboard: document.querySelector('#dashboard'),
  refreshButton: document.querySelector('#refreshButton'),
  connectionDot: document.querySelector('#connectionDot'),
  connectionStatus: document.querySelector('#connectionStatus'),
  latency: document.querySelector('#latency'),
  serverVersion: document.querySelector('#serverVersion'),
  charset: document.querySelector('#charset'),
  tableCount: document.querySelector('#tableCount'),
  databaseSize: document.querySelector('#databaseSize'),
  storyCount: document.querySelector('#storyCount'),
  storyCountHint: document.querySelector('#storyCountHint'),
  detectedStoryTables: document.querySelector('#detectedStoryTables'),
  contentMetrics: document.querySelector('#contentMetrics'),
  tablesBody: document.querySelector('#tablesBody'),
  tableSearch: document.querySelector('#tableSearch'),
  checkedAt: document.querySelector('#checkedAt')
};

function formatNumber(value) {
  return new Intl.NumberFormat('de-DE').format(Number(value || 0));
}

function formatSize(megabytes) {
  return `${new Intl.NumberFormat('de-DE', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  }).format(Number(megabytes || 0))} MB`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function renderTables(filter = '') {
  const normalized = filter.trim().toLowerCase();
  const rows = state.tables.filter((table) =>
    table.name.toLowerCase().includes(normalized)
  );

  elements.tablesBody.innerHTML = rows.map((table) => `
    <tr>
      <td><strong>${escapeHtml(table.name)}</strong></td>
      <td>${formatNumber(table.rowCount)}</td>
      <td>${formatSize(table.sizeMb)}</td>
      <td>
        <span class="badge ${table.category === 'story' ? 'story' : ''}">
          ${escapeHtml(table.categoryLabel)}
        </span>
      </td>
    </tr>
  `).join('');
}

function renderContentMetrics(metrics) {
  const entries = Object.entries(metrics || {});
  elements.contentMetrics.innerHTML = entries.length
    ? entries.map(([label, value]) => `
        <article class="content-item">
          <span>${escapeHtml(label)}</span>
          <strong>${formatNumber(value)}</strong>
        </article>
      `).join('')
    : '<p class="muted">Es konnten noch keine fachlichen Tabellen sicher zugeordnet werden.</p>';
}

function renderDashboard(data) {
  state.tables = Array.isArray(data.tables) ? data.tables : [];

  elements.connectionDot.classList.toggle('connected', data.connection?.connected === true);
  elements.connectionStatus.textContent = data.connection?.connected ? 'Verbunden' : 'Nicht verfügbar';
  elements.latency.textContent = `${formatNumber(data.connection?.latencyMs)} ms`;
  elements.serverVersion.textContent = data.connection?.serverVersion || '–';
  elements.charset.textContent = data.connection?.charset || '–';
  elements.tableCount.textContent = formatNumber(data.database?.tableCount);
  elements.databaseSize.textContent = formatSize(data.database?.sizeMb);
  elements.storyCount.textContent = formatNumber(data.stories?.estimatedCount);

  const storyTables = data.stories?.detectedTables || [];
  elements.detectedStoryTables.textContent = storyTables.length
    ? `Erkannte Tabellen: ${storyTables.join(', ')}`
    : 'Noch keine Story-Tabelle anhand ihres Namens erkannt.';

  elements.storyCountHint.textContent = storyTables.length
    ? 'aus erkannten Story-Tabellen'
    : 'noch keine eindeutige Tabelle';

  renderContentMetrics(data.contentMetrics);
  renderTables(elements.tableSearch.value);
  elements.checkedAt.textContent = `Letzte Prüfung: ${data.checkedAtLabel || '–'}`;

  elements.loading.hidden = true;
  elements.error.hidden = true;
  elements.dashboard.hidden = false;
}

function renderError(error) {
  elements.loading.hidden = true;
  elements.dashboard.hidden = true;
  elements.error.hidden = false;
  elements.errorMessage.textContent = error.message || 'Die Datenbankprüfung ist fehlgeschlagen.';
}

async function loadDashboard() {
  elements.loading.hidden = false;
  elements.error.hidden = true;
  elements.refreshButton.disabled = true;

  try {
    const response = await fetch(API_URL, {
      headers: { Accept: 'application/json' },
      credentials: 'same-origin',
      cache: 'no-store'
    });

    const payload = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(payload.message || `API-Fehler ${response.status}`);
    }

    renderDashboard(payload);
  } catch (error) {
    console.error(error);
    renderError(error);
  } finally {
    elements.refreshButton.disabled = false;
  }
}

elements.refreshButton.addEventListener('click', loadDashboard);
elements.tableSearch.addEventListener('input', (event) => {
  renderTables(event.target.value);
});

loadDashboard();

const portalModules = [
  {
    id: "neuroplay",
    name: "NeuroPlay",
    icon: "🎲",
    description: "Spiele, Turniere und interaktive Erlebnisse.",
    status: "active",
    href: "/tennis/",
    sortOrder: 10,
    experiences: [
      {
        name: "Tennisturnier Neindorf",
        icon: "🎾",
        meta: "05.09.2026 · Neindorf",
        href: "/tennis/"
      }
    ]
  },
  {
    id: "neuroknow",
    name: "NeuroKnow",
    icon: "📚",
    description: "Wissen verständlich machen und Zusammenhänge entdecken.",
    status: "coming",
    sortOrder: 20,
    experiences: []
  },
  {
    id: "energy-navigator",
    name: "Energy Navigator",
    icon: "🌱",
    description: "Eigene Energie und Belastung besser verstehen.",
    status: "coming",
    sortOrder: 30,
    experiences: []
  }
];

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderExperience(experience) {
  return `
    <div class="module-experience">
      <div class="experience-box">
        <div class="experience-title">
          <span aria-hidden="true">${escapeHtml(experience.icon)}</span>
          <span>${escapeHtml(experience.name)}</span>
        </div>
        <span class="experience-meta">${escapeHtml(experience.meta)}</span>
        <span class="module-link">Zum Tennisturnier <span aria-hidden="true">→</span></span>
      </div>
    </div>
  `;
}

function renderModule(module) {
  const active = module.status === "active";
  const classes = `nw-card module-card ${active ? "nw-card--interactive is-active" : "is-coming"}`;
  const status = active ? "Verfügbar" : "Demnächst";
  const experiences = (module.experiences || []).map(renderExperience).join("");

  const content = `
    <div class="module-top">
      <span class="module-icon" aria-hidden="true">${escapeHtml(module.icon)}</span>
      <span class="nw-badge module-status">${escapeHtml(status)}</span>
    </div>
    <h3>${escapeHtml(module.name)}</h3>
    <p>${escapeHtml(module.description)}</p>
    ${experiences}
    ${active && !experiences ? '<span class="module-link">Öffnen <span aria-hidden="true">→</span></span>' : ""}
  `;

  if (active && module.href) {
    return `<a class="${classes}" href="${escapeHtml(module.href)}">${content}</a>`;
  }

  return `<article class="${classes}" aria-disabled="true">${content}</article>`;
}

function renderPortalModules() {
  const grid = document.querySelector("#module-grid");
  if (!grid) return;

  const sortedModules = [...portalModules].sort(
    (a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0)
  );

  grid.innerHTML = sortedModules.map(renderModule).join("");
}

document.addEventListener("DOMContentLoaded", renderPortalModules);

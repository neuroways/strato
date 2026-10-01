(() => {
  const app = document.getElementById('app');

  const state = {
    page: 'cover',
    day: 1,
    mission: 1,
    story: null,
    source: 'fallback',
    dbFragments: {},
    dialog: null,
    loading: false,
  };

  const tasks = [
    {
      title: '👀 Prüfe das Satzende',
      instruction: 'Schau in dein Heft. Wie endet dein Satz?',
      detail: 'Punkt (.) · Fragezeichen (?) · Ausrufezeichen (!)',
      lumi: 'Schau ganz in Ruhe. Der Satz verrät dir selbst, wie er endet.',
    },
    {
      title: '✍️ Schreibe deinen Satz ab',
      instruction: 'Schreibe den Satz langsam und vollständig in dein Heft.',
      detail: 'Ein Wort nach dem anderen reicht.',
      lumi: 'Du musst nicht den ganzen Satz auf einmal behalten.',
    },
    {
      title: '🔍 Kontrolliere jedes Wort',
      instruction: 'Lies deinen Satz noch einmal langsam. Stimmt jedes Wort?',
      detail: 'Gehe Wort für Wort vor.',
      lumi: 'Du musst nicht alles sofort richtig haben. Schau einfach noch einmal.',
    },
    {
      title: '📏 Unterstreiche deinen Satz',
      instruction: 'Jetzt unterstreichst du deinen fertigen Satz mit Lineal und Stift.',
      detail: 'Ziehe eine ruhige Linie unter deinen Satz.',
      lumi: 'Geschafft. Gleich wartet der nächste Teil unserer Geschichte.',
    },
  ];

  const esc = (value) =>
    String(value ?? '').replace(/[&<>'"]/g, (character) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;',
    })[character]);

  const fragmentKey = (day, mission) => `${day}-${mission}`;

  async function loadFallbackStory() {
    const response = await fetch('data/default-story.json?v=110', {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Fallback konnte nicht geladen werden: HTTP ${response.status}`);
    }

    state.story = await response.json();
  }

  async function loadDatabaseFragment(dayNumber, missionNumber) {
    const key = fragmentKey(dayNumber, missionNumber);

    if (state.dbFragments[key]) {
      return state.dbFragments[key];
    }

    const response = await fetch(
      `api/story.php?day=${encodeURIComponent(dayNumber)}&mission=${encodeURIComponent(missionNumber)}&v=034`,
      {
        headers: { Accept: 'application/json' },
        cache: 'no-store',
      },
    );

    if (!response.ok) {
      throw new Error(`Story-API HTTP ${response.status}`);
    }

    const payload = await response.json();

    if (
      payload?.source !== 'database' ||
      !payload?.data?.text
    ) {
      throw new Error(payload?.reason || 'Kein Datenbankfragment verfügbar');
    }

    const fragment = {
      title: payload.data.title || `Mission ${missionNumber}`,
      text: payload.data.text,
      dayTitle: payload.data.title || '',
      locationName: payload.data.locationName || '',
      arrivalHeadline: payload.data.arrivalHeadline || '',
      arrivalText: payload.data.arrivalText || '',
      completionText: payload.data.completionText || '',
      source: 'database',
    };

    state.dbFragments[key] = fragment;
    state.source = 'database';

    return fragment;
  }

  async function prepareStoryPage() {
    state.loading = true;
    render();

    try {
      await loadDatabaseFragment(state.day, state.mission);
    } catch (error) {
      console.warn('[NeuroQuest] Datenbankfragment nicht verfügbar:', error);
      state.source = 'fallback';
    } finally {
      state.loading = false;
      render();
    }
  }

  async function prepareDayComplete() {
    state.loading = true;
    render();

    let databaseParts = 0;

    for (let missionNumber = 1; missionNumber <= 5; missionNumber += 1) {
      try {
        await loadDatabaseFragment(state.day, missionNumber);
        databaseParts += 1;
      } catch (error) {
        console.warn(
          `[NeuroQuest] Mission ${missionNumber} verwendet den Fallback:`,
          error,
        );
      }
    }

    state.source = databaseParts > 0 ? 'database' : 'fallback';
    state.loading = false;
    render();
  }

  async function initialise() {
    try {
      await loadFallbackStory();
    } catch (error) {
      console.error('[NeuroQuest] Standardgeschichte fehlt:', error);
    }

    render();
  }

  function currentDay() {
    return (
      state.story?.days?.find((item) => Number(item.day) === state.day) ||
      state.story?.days?.[0]
    );
  }

  function localFragment(dayData, missionNumber) {
    return dayData?.fragments?.[missionNumber - 1] || {
      title: 'Diese Seite wird vorbereitet',
      text: 'Die Geschichte geht bald weiter.',
    };
  }

  function currentFragment() {
    const databaseFragment =
      state.dbFragments[fragmentKey(state.day, state.mission)];

    return databaseFragment || localFragment(currentDay(), state.mission);
  }

  function fullDayFragments() {
    const dayData = currentDay();

    return Array.from({ length: 5 }, (_, index) => {
      const missionNumber = index + 1;

      return (
        state.dbFragments[fragmentKey(state.day, missionNumber)] ||
        localFragment(dayData, missionNumber)
      );
    });
  }

  function shell(content) {
    const sourceLabel =
      state.source === 'database'
        ? 'Datenbankgeschichte'
        : 'Standardgeschichte';

    return `
      <main class="page">${content}</main>
      <div class="status" title="Technische Datenquelle">${sourceLabel}</div>
      ${dialog()}
    `;
  }

  function lumi(text) {
    return `
      <aside class="lumi">
        <span aria-hidden="true">✨</span>
        <div><strong>Lumi sagt:</strong>${esc(text)}</div>
      </aside>
    `;
  }

  function button(label, action, secondary = false) {
    return `
      <button
        type="button"
        class="button${secondary ? ' secondary' : ''}"
        data-action="${action}"
      >${label}</button>
    `;
  }

  function progress() {
    return `
      <div class="progress">
        Tag ${state.day} von 5 · Mission ${state.mission} von 5
      </div>
    `;
  }

  function dialog() {
    if (!state.dialog) return '';

    return `
      <div class="dialog-backdrop">
        <div class="dialog">
          <h2>Darf ich dich kurz etwas fragen?</h2>
          <p>Unser heutiges Abenteuer wartet geduldig auf uns. Du entscheidest.</p>
          ${button('🌿 Weiter im Abenteuer', 'close-dialog')}
          ${button('🍂 Trotzdem Tag wechseln', 'confirm-day', true)}
        </div>
      </div>
    `;
  }

  function render() {
    if (!state.story) {
      app.innerHTML = shell(
        '<h1 class="title">NeuroQuest wird vorbereitet …</h1>',
      );
      return;
    }

    if (state.loading) {
      app.innerHTML = shell(`
        <div class="content">
          <h1 class="title">Die Geschichte wird geöffnet …</h1>
          <p class="text">Einen kleinen Moment.</p>
        </div>
      `);
      return;
    }

    const dayData = currentDay();
    let html = '';

    if (state.page === 'cover') {
      html = shell(`
        <img
          class="hero"
          src="static/neuroquest-cover.png"
          alt="NeuroQuest – Caspar und Lumi im Zauberwald"
        >
        ${button('✨ Abenteuer starten', 'welcome')}
      `);
    } else if (state.page === 'welcome') {
      html = shell(`
        <img
          class="hero"
          src="static/neuroquest-characters-guide.png"
          alt="Caspar und Lumi"
        >
        <div class="content">
          <p class="text">
            Das ist Caspar und das ist Lumi.<br>
            Sie begleiten dich auf deinem Abenteuer.
          </p>
          ${lumi('Komm, lass uns gemeinsam entdecken!')}
          ${button('Los geht’s!', 'days')}
        </div>
      `);
    } else if (state.page === 'days') {
      html = shell(`
        <h1 class="title">Welcher Tag wartet auf dich?</h1>
        <div class="days">
          ${state.story.days.map((item) => `
            <button class="day" data-day="${item.day}">
              <strong>Tag ${item.day}</strong>
              <span>${esc(item.title)}</span>
            </button>
          `).join('')}
        </div>
        ${lumi('Du kannst ein Abenteuer auswählen.')}
      `);
    } else if (state.page === 'mission-start') {
      html = shell(`
        ${state.mission === 1
          ? `<img
               class="hero"
               src="${esc(dayData.image)}"
               alt="Illustration zu Tag ${state.day}"
             >`
          : progress()}
        <div class="content">
          <h1 class="title">
            ${state.mission === 1
              ? esc(dayData.title)
              : `Mission ${state.mission} von 5`}
          </h1>
          <p class="text">
            ${state.mission === 1
              ? esc(dayData.intro)
              : 'Die nächste kleine Mission wartet auf dich.'}
          </p>
          ${lumi('Wir gehen einfach einen kleinen Schritt nach dem anderen.')}
          ${button(
            state.mission === 1
              ? 'Meine erste Mission beginnt'
              : 'Mission beginnen',
            'task-0',
          )}
        </div>
      `);
    } else if (state.page.startsWith('task-')) {
      const index = Number(state.page.split('-')[1]);
      const task = tasks[index];

      html = shell(`
        ${progress()}
        <div class="content">
          <h1 class="title">${task.title}</h1>
          <p class="text">${esc(task.instruction)}</p>
          <p class="detail">${esc(task.detail)}</p>
          ${lumi(task.lumi)}
          ${button(
            index < 3 ? '📖 Weiter' : '📖 Geschichte entdecken',
            index < 3 ? `task-${index + 1}` : 'story',
          )}
        </div>
      `);
    } else if (state.page === 'story') {
      const fragment = currentFragment();

      html = shell(`
        ${progress()}

        <img
          class="story-reward-image"
          src="${esc(dayData.image)}?v=2"
          alt="Illustration zu Tag ${state.day}: ${esc(fragment.title)}"
        >

        <div class="content">
          <section class="story-card">
            <h1 class="title">${esc(fragment.title)}</h1>
            <p class="text">${esc(fragment.text)}</p>
          </section>
          ${lumi(
            state.mission < 5
              ? 'Der Weg geht weiter.'
              : 'Der heutige Weg ist geschafft.',
          )}
          ${button(
            state.mission < 5
              ? '📖 Nächste Mission'
              : '🌟 Zum Tagesabschluss',
            'after-story',
          )}
        </div>
      `);
    } else if (state.page === 'complete') {
      const fragments = fullDayFragments();
      const fullText = fragments.map((fragment) => fragment.text).join('\n\n');

      html = shell(`
        <img
          class="hero"
          src="static/day-complete.jpg"
          alt="Tagesabschluss"
        >
        <div class="content">
          <h1 class="title">Tag ${state.day} ist geschafft</h1>
          <p class="text">
            Große Abenteuer entstehen aus vielen kleinen Schritten.
          </p>
          <section class="story-card">
            <h2>Die Geschichte von Tag ${state.day}</h2>
            <p>${esc(fullText)}</p>
          </section>
          ${lumi(
            state.day < 5
              ? 'Ein neuer Tag wartet auf dich. Du entscheidest, wann er beginnt.'
              : 'Du hast die ganze Geschichte entdeckt.',
          )}
          <div class="actions">
            ${state.day < 5
              ? button('Zum nächsten Abenteuer', 'next-day')
              : ''}
            ${button('Zur Startseite', 'home', true)}
          </div>
        </div>
      `);
    }

    app.innerHTML = html;
  }

  app.addEventListener('click', async (event) => {
    const dayButton = event.target.closest('[data-day]');

    if (dayButton) {
      state.day = Number(dayButton.dataset.day);
      state.mission = 1;
      state.page = 'mission-start';
      state.source = 'fallback';
      render();
      return;
    }

    const actionButton = event.target.closest('[data-action]');

    if (!actionButton) return;

    const action = actionButton.dataset.action;

    if (action === 'welcome') {
      state.page = 'welcome';
      render();
    } else if (action === 'days') {
      state.page = 'days';
      render();
    } else if (action.startsWith('task-')) {
      state.page = action;
      render();
    } else if (action === 'story') {
      state.page = 'story';
      await prepareStoryPage();
    } else if (action === 'after-story') {
      if (state.mission < 5) {
        state.mission += 1;
        state.page = 'mission-start';
        render();
      } else {
        state.page = 'complete';
        await prepareDayComplete();
      }
    } else if (action === 'next-day') {
      state.day += 1;
      state.mission = 1;
      state.page = 'mission-start';
      state.source = 'fallback';
      render();
    } else if (action === 'home') {
      state.page = 'cover';
      state.day = 1;
      state.mission = 1;
      state.source = 'fallback';
      render();
    } else if (action === 'close-dialog') {
      state.dialog = null;
      render();
    }
  });

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
      try {
        const registration = await navigator.serviceWorker.register(
          'service-worker.js?v=035',
        );
        await registration.update();
      } catch (error) {
        console.warn('[NeuroQuest] Service Worker:', error);
      }
    });
  }

  initialise();
})();

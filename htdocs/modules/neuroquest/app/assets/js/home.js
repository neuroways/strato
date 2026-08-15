const elements = {
  pageTitle: document.querySelector('#page-title'),
  greeting: document.querySelector('#greeting'),
  storyTitle: document.querySelector('#storyTitle'),
  chapterLine: document.querySelector('#chapterLine'),
  locationLine: document.querySelector('#locationLine'),
  primaryAction: document.querySelector('#primaryAction'),
  progressList: document.querySelector('#progressList'),
  progressText: document.querySelector('#progressText'),
  retryButton: document.querySelector('#retryButton'),
  companionBadge: document.querySelector('#companionBadge'),
  logoutButton: document.querySelector('#logoutButton')
};

function safeText(value, fallback = '–') {
  return typeof value === 'string' && value.trim() ? value.trim() : fallback;
}

function buildProgressItem(index, currentRound, completedRounds) {
  const item = document.createElement('li');
  const round = index + 1;

  let state = 'future';
  let stateLabel = 'noch nicht erreicht';
  let symbol = '◇';

  if (round <= completedRounds) {
    state = 'done';
    stateLabel = 'abgeschlossen';
    symbol = '✓';
  } else if (round === currentRound) {
    state = 'current';
    stateLabel = 'aktuell';
    symbol = '✦';
  }

  item.className = `progress-item ${state}`;
  item.setAttribute('aria-label', `Wegstein ${round}: ${stateLabel}`);
  item.innerHTML = `
    <span class="symbol" aria-hidden="true">${symbol}</span>
    <span class="progress-label">Wegstein ${round}</span>
  `;

  return item;
}

export function renderStartState(data) {
  const childName = safeText(data.player?.displayName, 'Abenteurerin');
  const companionName = safeText(data.companion?.name, 'Luna');
  const storyTitle = safeText(data.quest?.title, 'Ein neues Abenteuer');
  const dayTitle = safeText(data.quest?.dayTitle, 'Ein neuer Weg');
  const locationName = safeText(data.scene?.locationName, 'am Waldrand');
  const greeting = safeText(
    data.scene?.greeting,
    `${companionName} wartet ${locationName} auf ${childName}.`
  );

  const currentRound = Number(data.quest?.currentRound || 1);
  const completedRounds = Number(data.quest?.completedRounds || 0);
  const totalRounds = Number(data.quest?.totalRounds || 5);

  elements.pageTitle.textContent = safeText(data.scene?.headline, `Willkommen zurück, ${childName}.`);
  elements.greeting.textContent = greeting;
  elements.storyTitle.textContent = storyTitle;
  elements.chapterLine.textContent = `Tag ${Number(data.quest?.currentDay || 1)} · ${dayTitle}`;
  elements.locationLine.textContent = `Mit ${companionName} ${locationName}`;

  elements.primaryAction.textContent = safeText(data.nextAction?.label, 'Abenteuer fortsetzen');
  elements.primaryAction.href = safeText(data.nextAction?.url, '#');
  elements.primaryAction.setAttribute('aria-disabled', 'false');

  elements.companionBadge.setAttribute('aria-label', `Begleitung: ${companionName}`);
  elements.companionBadge.title = companionName;

  elements.progressList.replaceChildren();
  for (let index = 0; index < Math.min(totalRounds, 5); index += 1) {
    elements.progressList.appendChild(buildProgressItem(index, currentRound, completedRounds));
  }

  elements.progressText.textContent = safeText(
    data.quest?.progressText,
    completedRounds > 0
      ? `Ihr seid bereits bis zum ${completedRounds}. Wegstein gekommen.`
      : 'Euer erster Wegstein wartet bereits.'
  );

  elements.retryButton.hidden = true;
}

export function renderError() {
  elements.pageTitle.textContent = 'Die Abenteuerkarte wird gerade sortiert.';
  elements.greeting.textContent = 'Bitte versucht es gleich noch einmal.';
  elements.storyTitle.textContent = 'NeuroQuest';
  elements.chapterLine.textContent = 'Der aktuelle Stand konnte nicht geladen werden.';
  elements.locationLine.textContent = 'Es ist kein Fortschritt verloren gegangen.';
  elements.primaryAction.textContent = 'Noch einmal versuchen';
  elements.primaryAction.href = '#';
  elements.primaryAction.setAttribute('aria-disabled', 'false');
  elements.retryButton.hidden = false;
}

export function bindHomeActions(onRetry) {
  elements.retryButton.addEventListener('click', onRetry);

  elements.primaryAction.addEventListener('click', (event) => {
    if (elements.primaryAction.getAttribute('aria-disabled') === 'true') {
      event.preventDefault();
    }
  });

  elements.logoutButton.addEventListener('click', () => {
    window.location.href = './logout.php';
  });
}

import { loadStartState } from './api.js';
import { bindHomeActions, renderError, renderStartState } from './home.js';

async function initialize() {
  try {
    const state = await loadStartState();
    renderStartState(state);
  } catch (error) {
    console.error('Startseite konnte nicht initialisiert werden.', error);
    renderError();
  }
}

bindHomeActions(initialize);
initialize();

const API_URL = './api/start-state.php';
const FALLBACK_URL = './data/start-state.demo.json';

export async function loadStartState() {
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json'
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error(`API status ${response.status}`);
    }

    const payload = await response.json();

    if (!payload || typeof payload !== 'object') {
      throw new Error('Ungültige API-Antwort');
    }

    return payload;
  } catch (apiError) {
    console.warn('NeuroQuest API nicht verfügbar. Demo-Daten werden geladen.', apiError);

    const fallbackResponse = await fetch(FALLBACK_URL, {
      headers: { 'Accept': 'application/json' },
      cache: 'no-store'
    });

    if (!fallbackResponse.ok) {
      throw new Error('Weder API noch Demo-Daten konnten geladen werden.');
    }

    return fallbackResponse.json();
  }
}

const CACHE = 'neuroquest-upload-v034';

const CORE = [
  './',
  'index.html?v=034',
  'assets/app.css?v=034',
  'assets/app.js?v=034',
  'data/default-story.json?v=110',
  'manifest.json',
  'static/neuroquest-cover.png',
  'static/neuroquest-characters-guide.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) =>
      Promise.allSettled(CORE.map((asset) => cache.add(asset))),
    ),
  );

  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE)
          .map((key) => caches.delete(key)),
      ),
    ),
  );

  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  if (url.origin !== self.location.origin) return;

  // API niemals aus dem Cache liefern.
  if (url.pathname.includes('/api/')) return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE).then((cache) => cache.put(event.request, clone));
        }

        return response;
      })
      .catch(async () => {
        const cached = await caches.match(event.request);

        if (cached) return cached;

        if (event.request.mode === 'navigate') {
          return caches.match('index.html?v=034');
        }

        return Response.error();
      }),
  );
});

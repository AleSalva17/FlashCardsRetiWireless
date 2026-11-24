const CACHE_NAME = 'flashcards-rw-v6';
const ASSETS = [
  './',
  './index.html',
  './topics.js?v=6',
  './exercises.js?v=6',
  './manifest.json'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      );
    })
  );
  self.clients.claim();
});

// Network-First strategy per file HTML, JS e JSON (così gli aggiornamenti si riflettono subito)
// Cache-First per immagini e icone statiche
self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  const isScriptOrDoc = e.request.mode === 'navigate' || 
                        url.pathname.endsWith('.html') || 
                        url.pathname.endsWith('.js') || 
                        url.pathname.endsWith('.json') ||
                        url.pathname === '/' ||
                        url.pathname.endsWith('/');

  if (isScriptOrDoc) {
    e.respondWith(
      fetch(e.request)
        .then((networkRes) => {
          if (networkRes && networkRes.status === 200) {
            const resClone = networkRes.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(e.request, resClone));
          }
          return networkRes;
        })
        .catch(() => caches.match(e.request).then((res) => res || caches.match('./index.html')))
    );
  } else {
    e.respondWith(
      caches.match(e.request).then((res) => {
        return res || fetch(e.request);
      })
    );
  }
});

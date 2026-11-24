const CACHE_NAME = 'flashcards-rw-v9';
const ASSETS = [
  './',
  './index.html',
  './topics.js?v=9',
  './exercises.js?v=9',
  './formulas.js?v=9',
  './summaries.js?v=9',
  './manifest.json',
  './images/maps/DimensionamentoDellaCella.svg',
  './images/maps/RetiCellulari.svg',
  './images/maps/LTE.svg',
  './images/maps/Riassunto_5G.svg',
  './images/maps/Riassunto_LTE_17_22_Marzo.svg',
  './notes/Riassunto_5G.md',
  './notes/Riassunto_LTE_17_22_Marzo.md',
  './notes/Formulario_Reti_Wireless.md'
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

// Network-First strategy per file HTML, JS, JSON, SVG e MD (così gli aggiornamenti si riflettono subito)
// Cache-First di supporto solo se offline
self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  const isDynamicAsset = e.request.mode === 'navigate' || 
                         url.pathname.endsWith('.html') || 
                         url.pathname.endsWith('.js') || 
                         url.pathname.endsWith('.json') || 
                         url.pathname.endsWith('.svg') || 
                         url.pathname.endsWith('.md') || 
                         url.pathname === '/' ||
                         url.pathname.endsWith('/');

  if (isDynamicAsset) {
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

// Service worker — caches the whole app shell for offline use.
// Bump CACHE_NAME whenever you deploy an update so old caches are cleared.
const CACHE_NAME = 'japan-trip-2026-v4';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Strategy:
// - Navigation requests (the page itself) and the map tiles: NETWORK-FIRST.
//   This means every time you're online, you automatically get the latest
//   deployed version — no manual cache-clearing needed. Falls back to the
//   last cached copy only if there's no connection.
// - Everything else (icons, manifest): CACHE-FIRST, since those rarely
//   change and this keeps the app opening instantly.
self.addEventListener('fetch', event => {
  const url = event.request.url;
  const isMapTile = url.includes('tile.openstreetmap.org');
  const isNavigation = event.request.mode === 'navigate' || url.endsWith('/index.html') || url.endsWith('/Japan-2026/') || url.endsWith('/Japan-2026');

  if (isMapTile || isNavigation) {
    event.respondWith(
      fetch(event.request).then(res => {
        const clone = res.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        return res;
      }).catch(() => caches.match(event.request))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(res => {
        const clone = res.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        return res;
      }).catch(() => cached);
    })
  );
});

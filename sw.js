/* Service worker mínimo: cachea la app para uso offline.
   Cuando cambies index.html, sube el número de versión (v1 -> v2)
   para que el iPad recoja la versión nueva. */
const CACHE = 'paddockview-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  // Librerías externas: para offline real, descárgalas y sírvelas tú.
  // Mientras uses CDN, se cachean en la primera carga CON internet:
  'https://cdnjs.cloudflare.com/ajax/libs/uPlot/1.6.31/uPlot.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/uPlot/1.6.31/uPlot.iife.min.js'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ).then(() => self.clients.claim()));
});

// Cache-first: si está cacheado lo sirve (offline); si no, va a la red.
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request).catch(() => r))
  );
});

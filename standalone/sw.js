// finggu-life Service Worker
// By Finggu (finggu.com) | github.com/sudarshanpjadhav/finggu-life
// Enables full offline support

const FINGGU_CACHE_NAME  = 'finggu-life-v1.0.0';
const FINGGU_CACHE_URLS  = [
  '/',
  '/index.html',
  '/manifest.json',
  'https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;500;600;700;800&family=Noto+Sans+Devanagari:wght@400;500;600;700&display=swap'
];

// ── Install: cache core assets ────────────────────────────────────────────────
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(FINGGU_CACHE_NAME).then((cache) => {
      console.log('[finggu-life SW] Caching core assets');
      return cache.addAll(FINGGU_CACHE_URLS.map(url => new Request(url, { mode: 'cors' })))
        .catch(err => console.warn('[finggu-life SW] Cache addAll partial failure:', err));
    })
  );
  self.skipWaiting();
});

// ── Activate: clean old caches ────────────────────────────────────────────────
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter(k => k !== FINGGU_CACHE_NAME).map(k => {
          console.log('[finggu-life SW] Deleting old cache:', k);
          return caches.delete(k);
        })
      )
    )
  );
  self.clients.claim();
});

// ── Fetch: cache-first for assets, network-first for data ────────────────────
self.addEventListener('fetch', (event) => {
  // Skip non-GET and chrome-extension requests
  if (event.request.method !== 'GET') return;
  if (event.request.url.startsWith('chrome-extension')) return;

  event.respondWith(
    caches.match(event.request).then((FINGGU_cached) => {
      if (FINGGU_cached) return FINGGU_cached;

      return fetch(event.request)
        .then((FINGGU_response) => {
          // Cache valid responses
          if (FINGGU_response && FINGGU_response.status === 200 && FINGGU_response.type !== 'opaque') {
            const FINGGU_clone = FINGGU_response.clone();
            caches.open(FINGGU_CACHE_NAME).then(cache => cache.put(event.request, FINGGU_clone));
          }
          return FINGGU_response;
        })
        .catch(() => {
          // Offline fallback for navigation
          if (event.request.mode === 'navigate') {
            return caches.match('/index.html');
          }
        });
    })
  );
});

// ── Background sync for deferred saves ───────────────────────────────────────
self.addEventListener('sync', (event) => {
  if (event.tag === 'finggu-sync') {
    console.log('[finggu-life SW] Background sync triggered');
  }
});

// ── Push notifications for bill reminders ────────────────────────────────────
self.addEventListener('push', (event) => {
  const FINGGU_data = event.data?.json() || {};
  event.waitUntil(
    self.registration.showNotification(FINGGU_data.title || 'finggu-life', {
      body:    FINGGU_data.body  || 'You have a bill due soon!',
      icon:    '/icons/icon-192.png',
      badge:   '/icons/icon-72.png',
      vibrate: [200, 100, 200],
      data:    { url: FINGGU_data.url || '/' },
      actions: [
        { action: 'view',   title: 'View' },
        { action: 'dismiss', title: 'Dismiss' }
      ]
    })
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  if (event.action !== 'dismiss') {
    event.waitUntil(clients.openWindow(event.notification.data?.url || '/'));
  }
});

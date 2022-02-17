const cacheName = 'web-groceries-list';
const expectedCaches = [cacheName];
const filesToCache = [
    '/',
    '/index.html',
    '/global.css',
    '/build/bundle.css',
    '/build/bundle.js',
    '/images/web-groceries-logo.png'
];

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function(e) {
    self.skipWaiting();
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            return cache.addAll(filesToCache);
        })
    );
});

/* Remove cached content when new SW activated */
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => Promise.all(
            keys.map(key => {
                if (!expectedCaches.includes(key)) {
                    return caches.delete(key);
                }
            })
        ))
    );
});

/* Serve cached content */
self.addEventListener('fetch', function(e) {
    e.respondWith(
        caches.match(e.request).then(function(response) {
            return response || fetch(e.request);
        })
    );
});
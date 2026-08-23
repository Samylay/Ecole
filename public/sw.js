// Offline shell plus downloaded lesson documents.
const CACHE_NAME = "layaida-offline-v2";
const OFFLINE_SHELL = [
  "/",
  "/offline",
  "/manifest.webmanifest",
  "/logo.png",
  "/icons/layaida-192.png",
  "/icons/layaida-512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(OFFLINE_SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((names) => Promise.all(names.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request).catch(async () => {
        const cache = await caches.open(CACHE_NAME);
        return (await cache.match(request)) || cache.match("/offline");
      })
    );
    return;
  }

  if (!url.pathname.startsWith("/documents/") && !OFFLINE_SHELL.includes(url.pathname)) return;

  event.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
      const cached = await cache.match(request);
      if (cached) return cached;
      try {
        const response = await fetch(request);
        if (response.ok) cache.put(request, response.clone());
        return response;
      } catch (err) {
        if (cached) return cached;
        throw err;
      }
    })
  );
});

const CACHE_NAME = "mis-notas-cache-v1";
const urlsToCache = [
  "index.html",
  "style.css",
  "app.js",
  "https://code.getmdl.io/1.3.0/material.indigo-pink.min.css",
  "https://code.getmdl.io/1.3.0/material.min.js",
  "https://fonts.googleapis.com/icon?family=Material+Icons"
];

// Instalar y cachear recursos
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Estrategia Cache First
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

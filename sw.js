/* TrackHawk service worker — caches the shell so the app opens instantly and
   works offline. Data is never cached here; it lives encrypted in the vault. */
const CACHE = "trackhawk-v7";
const SHELL = [
  "./", "./index.html", "./css/style.css",
  "./js/core.js", "./js/jobs.js", "./js/cards.js", "./js/roadmap.js", "./js/runway.js", "./js/main.js",
  "./manifest.json", "./icons/icon-192.png", "./icons/icon-512.png"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ).then(() => self.clients.claim()));
});

self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  // never touch the API or fonts — those must hit the network
  if (url.origin !== location.origin) return;
  e.respondWith(
    fetch(e.request)
      .then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy)).catch(() => {});
        return res;
      })
      .catch(() => caches.match(e.request).then(r => r || caches.match("./index.html")))
  );
});

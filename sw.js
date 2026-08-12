/* TrackHawk service worker — caches the shell so the app opens instantly and
   works offline. Data is never cached here; it lives encrypted in the vault. */
const CACHE = "trackhawk-v12";
const V = "12";
/* Asset URLs carry ?v=<build>, matching index.html exactly. A build bump therefore
   produces different cache keys, so nothing stale can survive a deploy.        */
const SHELL = [
  "./", "./index.html", `./css/style.css?v=${V}`,
  `./js/core.js?v=${V}`, `./js/jobs.js?v=${V}`, `./js/cards.js?v=${V}`,
  `./js/roadmap.js?v=${V}`, `./js/runway.js?v=${V}`, `./js/main.js?v=${V}`,
  "./manifest.json", "./icons/icon-192.png", "./icons/icon-512.png"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE)
    .then(c => c.addAll(SHELL.map(u => new Request(u, {cache: "reload"}))))
    .then(() => self.skipWaiting()));
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

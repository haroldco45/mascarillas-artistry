const CACHE = 'mascarillas-artistry-v1';
const ASSETS = ['./','index.html','manifest.json','img/icon-192.png','img/icon-512.png',
 'img/vc-modelo.jpg','img/vc-producto.jpg','img/vc-ingredientes.jpg','img/vc-paso1.jpg','img/vc-paso2.jpg','img/vc-paso3.jpg','img/vc-paso4.jpg','img/vc-rutina.jpg',
 'img/om-modelo.jpg','img/om-producto.jpg','img/om-ingredientes.jpg','img/om-sobre.jpg','img/om-paso1.jpg','img/om-paso2.jpg','img/om-paso3.jpg','img/om-rutina.jpg'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS))); self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))); self.clients.claim(); });
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin) return;
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request).then(res => { const cp = res.clone(); caches.open(CACHE).then(c => c.put(e.request, cp)); return res; }).catch(() => caches.match('index.html'))));
});

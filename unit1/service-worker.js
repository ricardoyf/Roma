const CACHE='english-flashcards-v4';
const FILES=['./','./index.html','./manifest.webmanifest','./icon.svg'];

self.addEventListener('install',e=>{
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)));
});

self.addEventListener('activate',e=>{
  e.waitUntil((async()=>{
    const keys=await caches.keys();
    await Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch',e=>{
  const url=new URL(e.request.url);
  const isAppHtml=e.request.mode==='navigate' || url.pathname.endsWith('/unit1/') || url.pathname.endsWith('/unit1/index.html');

  if(isAppHtml){
    e.respondWith((async()=>{
      try{
        const response=await fetch(e.request,{cache:'no-store'});
        const cache=await caches.open(CACHE);
        cache.put('./index.html',response.clone());
        return response;
      }catch(_){
        return (await caches.match('./index.html')) || Response.error();
      }
    })());
    return;
  }

  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));
});

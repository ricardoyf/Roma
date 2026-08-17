const CACHE='unit1-flashcards-v3';
const FILES=['./','./index.html','./manifest.webmanifest','./icon.svg','./fix-card-transition.js'];

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
      let response;
      try{
        response=await fetch(e.request,{cache:'no-store'});
      }catch(_){
        response=await caches.match('./index.html');
      }
      if(!response) return Response.error();
      let html=await response.text();
      if(!html.includes('fix-card-transition.js')){
        html=html.replace('</body>','<script src="./fix-card-transition.js?v=3"></script></body>');
      }
      return new Response(html,{headers:{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store'}});
    })());
    return;
  }

  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));
});

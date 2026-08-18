const CACHE='english-flashcards-pink-v8';
const FILES=['./','./index.html','./manifest.webmanifest','./icon-pink-v2.svg','./pink-theme.css','./category-menu.js'];

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
      html=html.replace('<meta name="theme-color" content="#0f766e">','<meta name="theme-color" content="#e85d9e">');
      html=html.replace('<link rel="icon" href="icon.svg">','<link rel="icon" href="icon-pink-v2.svg?v=8">');
      if(!html.includes('pink-theme.css')){
        html=html.replace('</head>','<link rel="stylesheet" href="./pink-theme.css?v=8"></head>');
      }else{
        html=html.replace(/pink-theme\.css(?:\?v=\d+)?/g,'pink-theme.css?v=8');
      }
      if(!html.includes('category-menu.js')){
        html=html.replace('</body>','<script src="./category-menu.js?v=8"></script></body>');
      }else{
        html=html.replace(/category-menu\.js(?:\?v=\d+)?/g,'category-menu.js?v=8');
      }
      return new Response(html,{headers:{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store'}});
    })());
    return;
  }

  if(url.pathname.endsWith('/unit1/pink-theme.css') || url.pathname.endsWith('/unit1/manifest.webmanifest') || url.pathname.endsWith('/unit1/icon-pink-v2.svg') || url.pathname.endsWith('/unit1/category-menu.js')){
    e.respondWith(fetch(e.request,{cache:'no-store'}).catch(()=>caches.match(e.request)));
    return;
  }

  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));
});

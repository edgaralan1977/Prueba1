var dataCacheName = 'webappAlmacenData-v1';
var cacheName = 'webappAlmacen-v2';
var filesToCache = [
  '/',
  'index.html',
  'manifest.json',
  'images/almacen.png',
  'images/almacenssa.png',  
  'images/logo_salud.png',  
  'bootstrap-3.3.7/bootstrap.min.css',
  'bootstrap-3.3.7/bootstrap.min.js',
  'bootstrap-3.3.7/alert.js',
  'bootstrap-3.3.7/modal.js',
  'bootstrap-3.3.7/dropdown.js',
  'bootstrap-3.3.7/scrollspy.js',
  'bootstrap-3.3.7/tab.js',
  'bootstrap-3.3.7/tooltip.js',
  'bootstrap-3.3.7/popover.js',
  'bootstrap-3.3.7/button.js',
  'bootstrap-3.3.7/collapse.js',
  'bootstrap-3.3.7/carousel.js',
  'bootstrap-3.3.7/bootstrap.js',
  'js/jquery.js',  
  'js/bootstrap-typeahead-fork.js',
  'js/jquery-3.2.1.min.js',
  'dist/jquery.bootgrid.css',
  'dist/jquery.bootgrid.js',
  'styles/inline.css',
  'fonts/glyphicons-halflings-regular.woff2',
  'fonts/glyphicons-halflings-regular.woff',
  'scripts/bd.js',  
  'scripts/app.js',  
  'scripts/login.js',
  'login.html',
  'scripts/login.js',
  'scripts/menu.js',
  'menu.html',
  'scripts/menu.js',     
  'scripts/CodigosdeBarras.js',
  'CodigosdeBarras.html',
  'scripts/ListadeCodigosdeBarras.js',
  'ListadeCodigosdeBarras.html',
  'scripts/Proveedores.js',
  'Proveedores.html',
  'scripts/ListadeProveedores.js',
  'ListadeProveedores.html',
  'scripts/ListadePresentaciones.js',
  'ListadePresentaciones.html',
  'scripts/Presentaciones.js',
  'Presentaciones.html',
  'scripts/ListadeProductos.js',
  'ListadeProductos.html',
  'scripts/Productos.js',
  'Productos.html',
  'scripts/ListadeFacturasdeProveedor.js',
  'ListadeFacturasdeProveedor.html',
  'scripts/FacturaProveedor.js',
  'FacturaProveedor.html',
  'ListadeFacturasdeProveedorDetalle.html',
  'scripts/ListadeFacturasdeProveedorDetalle.js',
  'scripts/FacturaProveedorDetalle.js',
  'FacturaProveedorDetalle.html',
  'FacturaE.html',
  'FacturaEDetADD.html',
  'FacturaEDetFE.html',
  'ListadeFacturasE.html',
  'ListadeFacturasEDetADD.html',
  'ListadeFacturasEDetFE.html',
  'ListadeProveedoresCF.html',
  'scripts/FacturaE.js',
  'scripts/FacturaEDetADD.js',
  'scripts/FacturaEDetFE.js',
  'scripts/ListadeFacturasE.js',
  'scripts/ListadeFacturasEDetADD.js',
  'scripts/ListadeFacturasEDetFE.js',
  'scripts/ListadeProveedoresCF.js'
];



var filesToCacheDesarrollo = [
  '/',
  'index.html'
];


 








self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCacheDesarrollo);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName && key !== dataCacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  console.log('[Service Worker] Fetch', e.request.url);
  var dataUrl = 'https://query.yahooapis.com/v1/public/yql';
  if (e.request.url.indexOf(dataUrl) > -1) {
    /*
     * When the request URL contains dataUrl, the app is asking for fresh
     * weather data. In this case, the service worker always goes to the
     * network and then caches the response. This is called the "Cache then
     * network" strategy:
     * https://jakearchibald.com/2014/offline-cookbook/#cache-then-network
     */
     //console.log('fech no hay conexion 1');
    e.respondWith(
      caches.open(dataCacheName).then(function(cache) {
        return fetch(e.request).then(function(response){
          cache.put(e.request.url, response.clone());
          return response;
        });
      }) 
    ); 
  } else {
    //     console.log('fech si hay conexion 1');
    /*
     * The app is asking for app shell files. In this scenario the app uses the
     * "Cache, falling back to the network" offline strategy:
     * https://jakearchibald.com/2014/offline-cookbook/#cache-falling-back-to-network
     */
     /* 
     */
    e.respondWith(
      caches.match(e.request).then(function(response) {
        return response || fetch(e.request);
      })
    ); 
  }
});



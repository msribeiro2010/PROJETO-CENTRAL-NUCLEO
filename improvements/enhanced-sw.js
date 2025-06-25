// Service Worker Aprimorado para NAPJe
const CACHE_NAME = 'napje-cache-v2';
const STATIC_CACHE = 'napje-static-v2';
const DYNAMIC_CACHE = 'napje-dynamic-v2';

// Recursos estáticos para cache imediato
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/style.css',
    '/modern-styles.css',
    '/card-styles.css',
    '/aniversario-styles.css',
    '/aniversario-responsive.css',
    '/modal-compact.css',
    '/card-customizer.css',
    '/favorites-customizer.css',
    '/notes-styles.css',
    '/script.js',
    '/notes.js',
    '/aniversario-click.js',
    '/aniversario-animation.js',
    '/aniversario-direto.js',
    '/aniversario-fix.js',
    '/aniversario-inline.js',
    '/aniversario-simples.js',
    '/accordion.js',
    '/add-default-favoritos.js',
    '/button-customization.js',
    '/card-customizer.js',
    '/favorites-color.js',
    '/favorites-customizer.js',
    '/footer-calendar.js',
    '/header-clock.js',
    '/recuperar-apps-fixos.js',
    '/trabalho-plantao.css',
    '/favicon.svg',
    '/favicon.png',
    '/logo-trt15.png',
    '/logo.svg'
];

// Recursos externos para cache
const EXTERNAL_ASSETS = [
    'https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css',
    'https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js',
    'https://cdn.jsdelivr.net/npm/sortablejs@1.15.0/Sortable.min.js',
    'https://cdn.jsdelivr.net/npm/flatpickr',
    'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Poppins:wght@400;500;600&family=Dancing+Script:wght@400;500;600&display=swap'
];

// Dados para cache
const DATA_ASSETS = [
    '/aniversarios.json',
    '/feriados.json',
    '/feriados_2025.json',
    '/aniversariantes.json'
];

// Instalação do Service Worker
self.addEventListener('install', event => {
    console.log('Service Worker: Instalando...');
    
    event.waitUntil(
        Promise.all([
            // Cache de recursos estáticos
            caches.open(STATIC_CACHE)
                .then(cache => {
                    console.log('Service Worker: Cacheando recursos estáticos');
                    return cache.addAll(STATIC_ASSETS);
                }),
            
            // Cache de recursos externos
            caches.open(DYNAMIC_CACHE)
                .then(cache => {
                    console.log('Service Worker: Cacheando recursos externos');
                    return cache.addAll(EXTERNAL_ASSETS);
                })
        ])
    );
    
    // Ativar imediatamente
    self.skipWaiting();
});

// Ativação do Service Worker
self.addEventListener('activate', event => {
    console.log('Service Worker: Ativando...');
    
    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        // Limpar caches antigos
                        if (cacheName !== STATIC_CACHE && 
                            cacheName !== DYNAMIC_CACHE && 
                            cacheName !== CACHE_NAME) {
                            console.log('Service Worker: Removendo cache antigo:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
    );
    
    // Tomar controle imediatamente
    self.clients.claim();
});

// Interceptação de requisições
self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Estratégia para recursos estáticos (Cache First)
    if (STATIC_ASSETS.includes(url.pathname) || 
        STATIC_ASSETS.includes(url.pathname + '/')) {
        event.respondWith(cacheFirst(request, STATIC_CACHE));
        return;
    }
    
    // Estratégia para recursos externos (Cache First)
    if (EXTERNAL_ASSETS.includes(request.url)) {
        event.respondWith(cacheFirst(request, DYNAMIC_CACHE));
        return;
    }
    
    // Estratégia para dados (Network First com fallback)
    if (DATA_ASSETS.includes(url.pathname)) {
        event.respondWith(networkFirst(request, DYNAMIC_CACHE));
        return;
    }
    
    // Estratégia para APIs (Network First)
    if (url.pathname.startsWith('/api/')) {
        event.respondWith(networkFirst(request, DYNAMIC_CACHE));
        return;
    }
    
    // Estratégia padrão (Network First)
    event.respondWith(networkFirst(request, DYNAMIC_CACHE));
});

// Estratégia Cache First
async function cacheFirst(request, cacheName) {
    try {
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        
        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
            const cache = await caches.open(cacheName);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        console.log('Service Worker: Erro na estratégia Cache First:', error);
        return new Response('Erro de rede', { status: 503 });
    }
}

// Estratégia Network First
async function networkFirst(request, cacheName) {
    try {
        const networkResponse = await fetch(request);
        
        if (networkResponse.ok) {
            const cache = await caches.open(cacheName);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        console.log('Service Worker: Erro de rede, usando cache:', error);
        
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        
        // Fallback para páginas HTML
        if (request.headers.get('accept').includes('text/html')) {
            return caches.match('/index.html');
        }
        
        return new Response('Conteúdo não disponível offline', { 
            status: 503,
            headers: { 'Content-Type': 'text/plain' }
        });
    }
}

// Sincronização em background
self.addEventListener('sync', event => {
    if (event.tag === 'background-sync') {
        event.waitUntil(doBackgroundSync());
    }
});

async function doBackgroundSync() {
    try {
        // Sincronizar dados quando online
        const cache = await caches.open(DYNAMIC_CACHE);
        
        // Atualizar dados de aniversariantes
        const aniversariosResponse = await fetch('/aniversarios.json');
        if (aniversariosResponse.ok) {
            cache.put('/aniversarios.json', aniversariosResponse);
        }
        
        // Atualizar dados de feriados
        const feriadosResponse = await fetch('/feriados.json');
        if (feriadosResponse.ok) {
            cache.put('/feriados.json', feriadosResponse);
        }
        
        console.log('Service Worker: Sincronização em background concluída');
    } catch (error) {
        console.log('Service Worker: Erro na sincronização:', error);
    }
}

// Notificações push (para futuras implementações)
self.addEventListener('push', event => {
    if (event.data) {
        const data = event.data.json();
        const options = {
            body: data.body,
            icon: '/favicon.png',
            badge: '/favicon.png',
            vibrate: [100, 50, 100],
            data: {
                dateOfArrival: Date.now(),
                primaryKey: 1
            },
            actions: [
                {
                    action: 'explore',
                    title: 'Ver',
                    icon: '/favicon.png'
                },
                {
                    action: 'close',
                    title: 'Fechar',
                    icon: '/favicon.png'
                }
            ]
        };
        
        event.waitUntil(
            self.registration.showNotification(data.title, options)
        );
    }
});

// Clique em notificação
self.addEventListener('notificationclick', event => {
    event.notification.close();
    
    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});

// Mensagens do cliente
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    
    if (event.data && event.data.type === 'GET_VERSION') {
        event.ports[0].postMessage({ version: CACHE_NAME });
    }
}); 
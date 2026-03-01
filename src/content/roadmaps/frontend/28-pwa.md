---
id: "28"
title: "Progressive Web Apps"
description: "Las PWAs son aplicaciones web que proporcionan experiencias similares a apps nativas con soporte offline."
---

# Progressive Web Apps (PWA)

Las PWAs combinan lo mejor de la web y las apps nativas, ofreciendo soporte offline, notificaciones push e instalabilidad.

## Componentes Principales

### Web App Manifest
```json
{
  "name": "Mi PWA",
  "short_name": "PWA",
  "start_url": "/",
  "display": "standalone",
  "theme_color": "#3498db",
  "background_color": "#ffffff",
  "icons": [
    { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

### Service Worker
```javascript
// sw.js
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('v1').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/estilos.css',
        '/app.js'
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
```

## Características de PWA

1. **Soporte offline**: Funciona sin internet
2. **Instalable**: Agregar a pantalla de inicio
3. **Notificaciones push**: Re-enganchar usuarios
4. **Rápido**: Assets cacheados cargan rápido
5. **Responsivo**: Funciona en todos los dispositivos

## Herramientas

- **Workbox**: Librería de PWA de Google
- **Vite PWA Plugin**: Configuración fácil de PWA
- **Lighthouse**: Auditoría de PWA

## Comenzando

```bash
npm install vite-plugin-pwa -D
```

¡Configura en tu archivo de configuración y listo!

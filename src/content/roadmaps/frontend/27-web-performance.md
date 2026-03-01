---
id: "27"
title: "Rendimiento Web"
description: "La optimización del rendimiento web asegura experiencias de usuario rápidas y responsivas."
---

# Rendimiento Web

El rendimiento impacta directamente la experiencia del usuario, rankings SEO y tasas de conversión. Un sitio rápido mantiene a los usuarios comprometidos.

## Core Web Vitals

| Métrica | Qué Mide | Objetivo |
|---------|----------|----------|
| **LCP** | Largest Contentful Paint | < 2.5s |
| **INP** | Interaction to Next Paint | < 200ms |
| **CLS** | Cumulative Layout Shift | < 0.1 |

## Estrategias de Optimización

### Optimización de Imágenes
```html
<!-- Formatos modernos -->
<picture>
  <source srcset="imagen.webp" type="image/webp">
  <img src="imagen.jpg" alt="Descripción" loading="lazy">
</picture>

<!-- Imágenes responsivas -->
<img srcset="pequeña.jpg 300w, mediana.jpg 600w, grande.jpg 1200w"
     sizes="(max-width: 600px) 300px, 600px"
     src="mediana.jpg" alt="">
```

### Code Splitting
```javascript
// Imports dinámicos
const Modal = lazy(() => import('./Modal'));

// Splitting basado en rutas (automático en Next.js/Nuxt)
```

### Caching
```javascript
// Caching con Service Worker
// Headers de cache HTTP
Cache-Control: max-age=31536000
```

## Herramientas de Medición

1. **Lighthouse**: Auditoría en Chrome DevTools
2. **WebPageTest**: Rendimiento del mundo real
3. **Core Web Vitals report**: Google Search Console
4. **Pestaña Performance**: Chrome DevTools

## Victorias Rápidas

1. Comprimir y optimizar imágenes
2. Habilitar compresión gzip/brotli
3. Usar un CDN
4. Lazy load del contenido below-the-fold
5. Minimizar bundles JavaScript
6. Preconnect a orígenes requeridos

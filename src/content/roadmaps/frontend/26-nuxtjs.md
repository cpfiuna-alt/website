---
id: "26"
title: "Nuxt.js"
description: "Nuxt.js es un framework Vue.js para construir aplicaciones web modernas."
---

# Nuxt.js

Nuxt es el equivalente en Vue.js de Next.js, proporcionando SSR, generación de sitios estáticos y una excelente experiencia de desarrollador.

## Características Clave

### Routing Basado en Archivos
```
pages/
├── index.vue         # ruta /
├── about.vue         # ruta /about
└── blog/
    └── [id].vue      # ruta dinámica /blog/:id
```

### Auto-imports
```vue
<script setup>
// Componentes, composables y utilidades se importan automáticamente
const { data } = await useFetch('/api/posts');
</script>
```

### Rutas del Servidor
```typescript
// server/api/hola.ts
export default defineEventHandler((event) => {
  return { mensaje: '¡Hola Mundo!' };
});
```

### Fetching de Datos
```vue
<script setup>
// Se ejecuta en servidor, cacheado
const { data: posts } = await useFetch('/api/posts');

// Con opciones
const { data, pending, error, refresh } = await useFetch('/api/datos', {
  lazy: true,
  server: false
});
</script>
```

## Modos de Renderizado

- **Universal (SSR)**: Renderizado en servidor, luego hidratado
- **SPA**: Solo lado del cliente
- **Estático (SSG)**: Pre-renderizado en build time
- **Híbrido**: Mezcla por ruta

## Comenzando

```bash
npx nuxi init mi-app
```

## Ecosistema

- **Estado**: Pinia (soporte integrado)
- **UI**: Nuxt UI, VueUse
- **Contenido**: Nuxt Content para markdown

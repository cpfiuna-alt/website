---
id: "15"
title: "Caching"
description: "Mejora el rendimiento almacenando datos frecuentemente accedidos en memoria."
---

# Caching

El caching reduce la carga en tu base de datos y mejora tiempos de respuesta.

## Redis

Redis es una base de datos en memoria, perfecta para caching.

```javascript
const Redis = require('ioredis');
const redis = new Redis();

// SET con expiración
await redis.set('user:1', JSON.stringify(user), 'EX', 3600);

// GET
const cached = await redis.get('user:1');
if (cached) {
  return JSON.parse(cached);
}

// DELETE
await redis.del('user:1');
```

## Patrón Cache-Aside

```javascript
async function getUser(id) {
  // 1. Buscar en cache
  const cached = await redis.get(`user:${id}`);
  if (cached) {
    return JSON.parse(cached);
  }

  // 2. Si no está, buscar en DB
  const user = await db.user.findUnique({ where: { id } });

  // 3. Guardar en cache
  await redis.set(`user:${id}`, JSON.stringify(user), 'EX', 3600);

  return user;
}
```

## Estrategias de Invalidación

| Estrategia | Cuándo |
|------------|--------|
| TTL (Time To Live) | Datos que pueden estar desactualizados |
| Write-through | Actualizar cache al escribir DB |
| Event-driven | Invalidar cuando hay cambios |

## HTTP Caching

```javascript
app.get('/api/static-data', (req, res) => {
  res.set('Cache-Control', 'public, max-age=3600');
  res.json(data);
});
```

## Qué cachear

✅ Datos que se leen mucho y cambian poco
✅ Resultados de cálculos costosos
✅ Respuestas de APIs externas
❌ Datos sensibles
❌ Datos que cambian frecuentemente

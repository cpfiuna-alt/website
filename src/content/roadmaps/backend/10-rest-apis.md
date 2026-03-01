---
id: "10"
title: "APIs RESTful"
description: "Diseña APIs siguiendo los principios REST para comunicación cliente-servidor."
---

# APIs RESTful

REST (Representational State Transfer) es un estilo arquitectónico para diseñar APIs.

## Principios REST

1. **Stateless**: Cada request es independiente
2. **Client-Server**: Separación de responsabilidades
3. **Uniform Interface**: Endpoints consistentes
4. **Cacheable**: Respuestas pueden ser cacheadas
5. **Layered System**: Arquitectura en capas

## Diseño de Endpoints

```
GET    /api/usuarios          # Lista de usuarios
GET    /api/usuarios/:id      # Usuario específico
POST   /api/usuarios          # Crear usuario
PUT    /api/usuarios/:id      # Actualizar usuario
PATCH  /api/usuarios/:id      # Actualizar parcialmente
DELETE /api/usuarios/:id      # Eliminar usuario

# Recursos anidados
GET    /api/usuarios/:id/posts    # Posts de un usuario
POST   /api/usuarios/:id/posts    # Crear post para usuario
```

## Ejemplo con Express

```javascript
const express = require('express');
const app = express();
app.use(express.json());

// GET todos los usuarios
app.get('/api/usuarios', async (req, res) => {
  const usuarios = await Usuario.findAll();
  res.json(usuarios);
});

// POST crear usuario
app.post('/api/usuarios', async (req, res) => {
  const usuario = await Usuario.create(req.body);
  res.status(201).json(usuario);
});

// PUT actualizar usuario
app.put('/api/usuarios/:id', async (req, res) => {
  await Usuario.update(req.params.id, req.body);
  res.json({ success: true });
});
```

## Respuestas Estándar

```json
{
  "success": true,
  "data": { ... },
  "meta": {
    "page": 1,
    "total": 100
  }
}
```

## Recursos

- [REST API Best Practices](https://restfulapi.net/)
- [HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)

---
id: "11"
title: "Autenticación"
description: "Verifica la identidad de usuarios con JWT, OAuth, sessions y más."
---

# Autenticación

Autenticación es verificar **quién eres**.

## Métodos de Autenticación

### 1. JWT (JSON Web Tokens)

```javascript
const jwt = require('jsonwebtoken');

// Generar token
const token = jwt.sign(
  { userId: user.id, email: user.email },
  process.env.JWT_SECRET,
  { expiresIn: '24h' }
);

// Verificar token
const decoded = jwt.verify(token, process.env.JWT_SECRET);
```

### Estructura JWT

```
header.payload.signature
eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjF9.signature
```

### 2. Sessions

```javascript
const session = require('express-session');

app.use(session({
  secret: 'mi-secreto',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: true, maxAge: 24 * 60 * 60 * 1000 }
}));

// Login
req.session.userId = user.id;

// Verificar
if (req.session.userId) { ... }
```

## Comparación

| Aspecto | JWT | Sessions |
|---------|-----|----------|
| Almacenamiento | Cliente | Servidor |
| Escalabilidad | Fácil | Requiere Redis |
| Revocación | Difícil | Fácil |
| Stateless | Sí | No |

## Flujo de Login

1. Usuario envía credenciales
2. Servidor verifica contra DB
3. Si válido, genera token/session
4. Cliente almacena token
5. Envía token en cada request

## Seguridad

- Usa **bcrypt** para hashear contraseñas
- Nunca guardes contraseñas en texto plano
- Implementa rate limiting
- Usa HTTPS siempre

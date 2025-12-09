---
id: "12"
title: "Autorización"
description: "Controla qué puede hacer cada usuario después de autenticarse."
---

# Autorización

Autorización es verificar **qué puedes hacer** después de saber quién eres.

## Modelos de Autorización

### 1. RBAC (Role-Based Access Control)

```javascript
const roles = {
  admin: ['read', 'write', 'delete', 'manage_users'],
  editor: ['read', 'write'],
  viewer: ['read']
};

function authorize(role, action) {
  return (req, res, next) => {
    if (roles[req.user.role]?.includes(action)) {
      next();
    } else {
      res.status(403).json({ error: 'No autorizado' });
    }
  };
}

app.delete('/posts/:id', authorize('admin', 'delete'), deletePost);
```

### 2. ABAC (Attribute-Based Access Control)

Decisiones basadas en atributos del usuario, recurso y contexto.

```javascript
function canEditPost(user, post) {
  return user.id === post.authorId || user.role === 'admin';
}
```

## Middleware de Autorización

```javascript
const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) throw new Error('Token requerido');
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId);
    next();
  } catch (error) {
    res.status(401).json({ error: 'No autenticado' });
  }
};

app.use('/api', authMiddleware);
```

## OAuth 2.0

Para login con terceros (Google, GitHub, etc.):

1. Usuario hace clic en "Login con Google"
2. Redirige a Google para autorizar
3. Google redirige de vuelta con código
4. Tu servidor intercambia código por token
5. Obtiene información del usuario

## Recursos

- [OAuth 2.0 Simplified](https://aaronparecki.com/oauth-2-simplified/)
- [Passport.js](http://www.passportjs.org/)

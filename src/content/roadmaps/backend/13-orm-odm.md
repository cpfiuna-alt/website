---
id: "13"
title: "ORM / ODM"
description: "Abstrae la base de datos con Object-Relational Mapping para código más limpio."
---

# ORM y ODM

Los ORMs mapean objetos de tu código a tablas de base de datos.

## ORMs Populares

### Prisma (Node.js - Recomendado)

```javascript
// schema.prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  posts     Post[]
  createdAt DateTime @default(now())
}

model Post {
  id       Int    @id @default(autoincrement())
  title    String
  author   User   @relation(fields: [authorId], references: [id])
  authorId Int
}
```

```javascript
// Uso
const users = await prisma.user.findMany({
  include: { posts: true }
});

const newUser = await prisma.user.create({
  data: { email: 'test@test.com', name: 'Test' }
});
```

### SQLAlchemy (Python)

```python
from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class User(Base):
    __tablename__ = 'users'
    
    id = Column(Integer, primary_key=True)
    name = Column(String(100))
    email = Column(String(255), unique=True)
```

## Ventajas

- Código más limpio y mantenible
- Type safety (con TypeScript)
- Migraciones automáticas
- Protección contra SQL injection

## Desventajas

- Overhead de rendimiento
- Queries complejas pueden ser difíciles
- Abstracción puede ocultar problemas

## Cuándo usar SQL directo

- Queries muy complejas
- Optimización crítica
- Operaciones masivas

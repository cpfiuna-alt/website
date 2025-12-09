---
id: "8"
title: "SQL (PostgreSQL)"
description: "PostgreSQL es la base de datos relacional open source más avanzada del mundo."
---

# SQL con PostgreSQL

PostgreSQL combina potencia, estándares SQL y extensibilidad.

## Operaciones CRUD

```sql
-- CREATE
INSERT INTO usuarios (nombre, email) 
VALUES ('Juan', 'juan@email.com');

-- READ
SELECT * FROM usuarios WHERE activo = true;
SELECT nombre, email FROM usuarios ORDER BY nombre LIMIT 10;

-- UPDATE
UPDATE usuarios SET nombre = 'Juan Carlos' WHERE id = 1;

-- DELETE
DELETE FROM usuarios WHERE id = 1;
```

## Crear Tablas

```sql
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    activo BOOLEAN DEFAULT true
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    contenido TEXT,
    usuario_id INTEGER REFERENCES usuarios(id),
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## JOINs

```sql
-- INNER JOIN
SELECT u.nombre, p.titulo 
FROM usuarios u
INNER JOIN posts p ON u.id = p.usuario_id;

-- LEFT JOIN
SELECT u.nombre, COUNT(p.id) as total_posts
FROM usuarios u
LEFT JOIN posts p ON u.id = p.usuario_id
GROUP BY u.id;
```

## Índices

```sql
CREATE INDEX idx_usuarios_email ON usuarios(email);
CREATE INDEX idx_posts_usuario ON posts(usuario_id);
```

## Recursos

- [PostgreSQL Tutorial](https://www.postgresqltutorial.com/)
- [Documentación Oficial](https://www.postgresql.org/docs/)

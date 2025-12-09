---
id: "7"
title: "SQL"
description: "Consultas de bases de datos relacionales para extraer datos."
---

# SQL para Data Science

La mayoría de los datos empresariales están en bases de datos SQL.

## Consultas Básicas

```sql
-- Seleccionar columnas
SELECT nombre, edad, ciudad
FROM usuarios;

-- Todas las columnas
SELECT * FROM usuarios;

-- Filtrar
SELECT * FROM usuarios
WHERE edad > 25;

-- Ordenar
SELECT * FROM usuarios
ORDER BY edad DESC;

-- Limitar resultados
SELECT * FROM usuarios
LIMIT 10;
```

## Filtros y Condiciones

```sql
-- Múltiples condiciones
SELECT * FROM ventas
WHERE precio > 100 AND categoria = 'electrónica';

-- OR y IN
SELECT * FROM productos
WHERE categoria IN ('ropa', 'accesorios');

-- LIKE para patrones
SELECT * FROM usuarios
WHERE email LIKE '%@gmail.com';

-- BETWEEN
SELECT * FROM ventas
WHERE fecha BETWEEN '2024-01-01' AND '2024-12-31';

-- NULL
SELECT * FROM usuarios
WHERE telefono IS NOT NULL;
```

## Agregaciones

```sql
-- Funciones de agregación
SELECT 
    COUNT(*) as total,
    SUM(precio) as suma_total,
    AVG(precio) as promedio,
    MAX(precio) as maximo,
    MIN(precio) as minimo
FROM ventas;

-- GROUP BY
SELECT 
    categoria,
    COUNT(*) as total,
    AVG(precio) as precio_promedio
FROM productos
GROUP BY categoria
HAVING COUNT(*) > 10;
```

## JOINs

```sql
-- INNER JOIN
SELECT u.nombre, o.producto, o.fecha
FROM usuarios u
INNER JOIN ordenes o ON u.id = o.usuario_id;

-- LEFT JOIN (incluye todos de la izquierda)
SELECT u.nombre, COUNT(o.id) as total_ordenes
FROM usuarios u
LEFT JOIN ordenes o ON u.id = o.usuario_id
GROUP BY u.id;
```

## Python + SQL

```python
import pandas as pd
import sqlite3

conn = sqlite3.connect('database.db')
df = pd.read_sql_query("SELECT * FROM usuarios", conn)
```

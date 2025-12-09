---
id: "7"
title: "Bases de Datos"
description: "Fundamentos de almacenamiento de datos: SQL vs NoSQL, cuándo usar cada uno."
---

# Bases de Datos

Las bases de datos son el corazón de cualquier aplicación backend.

## SQL vs NoSQL

| Característica | SQL | NoSQL |
|---------------|-----|-------|
| Estructura | Esquema fijo | Esquema flexible |
| Escalabilidad | Vertical | Horizontal |
| Relaciones | Excelente | Limitado |
| Consistencia | ACID | Eventual (generalmente) |
| Ejemplo | PostgreSQL | MongoDB |

## Cuándo usar SQL

- Datos estructurados con relaciones claras
- Transacciones complejas
- Reportes y análisis
- Integridad de datos crítica

## Cuándo usar NoSQL

- Datos semi-estructurados o variables
- Escalabilidad masiva
- Desarrollo rápido
- Datos en tiempo real

## Tipos de NoSQL

1. **Documentos**: MongoDB, CouchDB
2. **Clave-Valor**: Redis, DynamoDB
3. **Columnas**: Cassandra, HBase
4. **Grafos**: Neo4j, ArangoDB

## Conceptos Importantes

- **ACID**: Atomicidad, Consistencia, Aislamiento, Durabilidad
- **CAP Theorem**: No puedes tener Consistencia, Disponibilidad y Tolerancia a Particiones simultáneamente
- **Normalización**: Estructurar datos para reducir redundancia
- **Índices**: Optimizar consultas frecuentes

## Recomendación

Empieza con **PostgreSQL**. Es versátil, potente y tiene excelente documentación.

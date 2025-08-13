---
title: "Competitive Programming Platform"
description: "Plataforma educativa para aprender y practicar programación competitiva"
category: "Education"
status: "beta"
version: "0.8.0"
repository: "https://github.com/cpf-fiuna/competitive-programming"
demo: "https://cp.cpf-fiuna.org"
maintainers: ["David Giménez", "Iván Jara"]
tags: ["React", "Python", "Docker", "PostgreSQL"]
lastUpdate: "2025-05-15"
---

# Competitive Programming Platform

Plataforma educativa diseñada para enseñar y practicar programación competitiva, proporcionando un entorno completo de aprendizaje para estudiantes de la FIUNA.

## Características Principales

- **Banco de Problemas**: Más de 500 problemas categorizados por dificultad
- **Judge Automático**: Sistema de evaluación en tiempo real
- **Múltiples Lenguajes**: Soporte para C++, Python, Java, JavaScript
- **Contests**: Competencias programadas y personalizadas
- **Tutoriales**: Guías paso a paso de algoritmos y estructuras de datos
- **Rankings**: Sistema de puntuación y clasificaciones
- **Análisis de Código**: Feedback automático y optimizaciones

## Módulos Educativos

### Algoritmos Fundamentales
- Ordenamiento y búsqueda
- Algoritmos greedy
- Programación dinámica
- Backtracking

### Estructuras de Datos
- Arrays y listas
- Pilas y colas
- Árboles binarios
- Grafos y sus algoritmos

### Matemáticas para CP
- Teoría de números
- Combinatoria
- Geometría computacional
- Álgebra lineal

## Tecnologías Utilizadas

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Python (FastAPI), PostgreSQL
- **Judge**: Docker containers para ejecución segura
- **Caching**: Redis para optimización
- **Deployment**: Kubernetes en Google Cloud

## Arquitectura del Sistema

```
platform/
├── frontend/          # React application
├── backend/           # FastAPI server
├── judge/             # Code execution engine
├── database/          # PostgreSQL schemas
└── infrastructure/    # Kubernetes configs
```

## Roadmap de Desarrollo

### Fase 1 (Completada) ✅
- Sistema básico de problemas
- Judge para C++ y Python
- Interfaz de usuario básica

### Fase 2 (En progreso) 🔄
- Sistema de contests
- Más lenguajes de programación
- Tutoriales interactivos

### Fase 3 (Planeada) 📋
- Sistema de equipos
- Integración con plataformas externas
- Análisis avanzado de rendimiento

## Estado del Proyecto

- **Estado**: Beta - funcional pero en desarrollo activo
- **Versión**: 0.8.0
- **Última actualización**: 15 de mayo, 2025
- **Mantenedores**: David Giménez, Iván Jara

## Cómo Contribuir

1. Revisar issues abiertos en GitHub
2. Proponer nuevos problemas o tutoriales
3. Reportar bugs o sugerir mejoras
4. Contribuir con código siguiendo las guidelines

## Enlaces Importantes

- [Plataforma en vivo](https://cp.cpf-fiuna.org)
- [Repositorio en GitHub](https://github.com/cpf-fiuna/competitive-programming)
- [Roadmap detallado](https://github.com/cpf-fiuna/competitive-programming/projects)
- [Contribuir problemas](https://github.com/cpf-fiuna/competitive-programming/blob/main/CONTRIBUTING.md)

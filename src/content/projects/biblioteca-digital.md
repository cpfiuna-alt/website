
---
id: 5
title: "Biblioteca Digital FIUNA"
description: "Plataforma para organizar y acceder digitalmente a recursos bibliográficos de ingeniería y ciencias."
image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
tags: ["React", "MongoDB", "ElasticSearch", "PDF.js", "REST API"]
githubLink: "https://github.com/cpfiuna/biblioteca-digital"
demoLink: "https://biblioteca.fiuna.edu.py"
category: "web"
featured: false
slug: "biblioteca-digital"
---

# Biblioteca Digital FIUNA

## Visión general

La Biblioteca Digital FIUNA es una plataforma web diseñada para organizar, gestionar y facilitar el acceso a recursos bibliográficos digitales relevantes para estudiantes y docentes de ingeniería. El proyecto fue desarrollado con el objetivo de centralizar recursos educativos, papers científicos, libros técnicos y material de estudio, facilitando la búsqueda y el acceso dentro del ecosistema académico de la facultad.

## Características principales

### Catálogo y búsqueda
- Búsqueda avanzada con filtros por materia, autor, año y tipo de contenido
- Índice completo con metadatos enriquecidos
- Sistema de etiquetado por área de conocimiento y nivel educativo
- Vista previa de documentos sin necesidad de descarga completa
- OCR para búsqueda dentro del contenido de los documentos

### Gestión de colecciones
- Organización por facultades, departamentos y cátedras
- Colecciones personalizadas para usuarios
- Sistema de favoritos y marcadores
- Historial de consultas y accesos

### Funcionalidades para usuarios
- Perfiles personalizados con seguimiento de intereses
- Recomendaciones basadas en historial de lectura
- Anotaciones y subrayado en documentos
- Bibliografías exportables en múltiples formatos (APA, IEEE, etc.)
- Integración con gestores bibliográficos externos

### Administración y curaduría
- Panel de control para bibliotecarios
- Herramientas de catalogación asistida
- Estadísticas de uso y acceso
- Gestión de derechos y permisos
- Sistema de sugerencias para nuevas adquisiciones

## Tecnologías utilizadas

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express
- **Base de datos**: MongoDB (metadatos), AWS S3 (almacenamiento de documentos)
- **Búsqueda**: ElasticSearch
- **Visualización de documentos**: PDF.js
- **OCR y procesamiento**: TesseractJS, Apache Tika
- **Autenticación**: OAuth2, integración con SSO institucional

## Impacto académico

Desde su implementación, la biblioteca digital ha:
- Incrementado el acceso a recursos bibliográficos en un 215%
- Reducido el tiempo promedio de búsqueda de recursos de 25 minutos a 3 minutos
- Permitido la incorporación de más de 12,000 recursos digitales que anteriormente no estaban disponibles
- Facilitado el acceso remoto durante períodos de educación a distancia
- Mejorado la colaboración entre cátedras en la creación y compartición de materiales

## Accesibilidad e inclusión

El sistema ha sido diseñado considerando aspectos de accesibilidad:
- Cumplimiento con WCAG 2.1 nivel AA
- Modo de alto contraste y ajustes de tamaño de texto
- Compatibilidad con lectores de pantalla
- Versión ligera para conexiones de bajo ancho de banda
- Audiolibros para materiales seleccionados

## Estado actual y desarrollo futuro

El proyecto se encuentra en fase de expansión, con planes para:
- Implementación de un sistema de recomendación basado en IA
- Ampliación del catálogo con recursos multimedia
- Desarrollar capacidades de colaboración en tiempo real
- Crear herramientas de análisis de texto para investigación
- Establecer intercambios con bibliotecas digitales de otras instituciones

## Equipo de desarrollo

El sistema fue desarrollado por un equipo de estudiantes del Club de Programación FIUNA en colaboración con la Biblioteca Central y el Centro de Computación.

## Colaboración

El proyecto es de código abierto y aceptamos contribuciones en las siguientes áreas:
- Mejoras en algoritmos de búsqueda y recomendación
- Expansión de formatos soportados
- Desarrollo de herramientas de accesibilidad
- Optimización de rendimiento
- Traducción a lenguas indígenas paraguayas

Para contribuir, visita nuestro repositorio en GitHub o contacta al equipo de desarrollo.

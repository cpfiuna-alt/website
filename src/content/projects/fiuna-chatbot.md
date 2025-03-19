
---
id: 6
title: "FIUNA Chatbot: Asistente Virtual para Estudiantes"
description: "Asistente virtual basado en IA para responder consultas administrativas y académicas de estudiantes."
image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
tags: ["NLP", "Machine Learning", "Python", "React", "FastAPI"]
githubLink: "https://github.com/cpfiuna/fiuna-chatbot"
demoLink: "https://chatbot.fiuna.edu.py"
category: "ml"
featured: false
slug: "fiuna-chatbot"
---

# FIUNA Chatbot: Asistente Virtual para Estudiantes

## Visión general

FIUNA Chatbot es un asistente virtual impulsado por inteligencia artificial diseñado para resolver consultas administrativas y académicas de estudiantes y aspirantes de la Facultad de Ingeniería. El sistema ofrece respuestas inmediatas a preguntas frecuentes, guía a los usuarios a través de procesos administrativos y proporciona información actualizada sobre programas académicos, plazos y eventos.

## Motivación

El desarrollo de este chatbot surgió para abordar varios desafíos identificados en la facultad:

- Alto volumen de consultas repetitivas que saturaban al personal administrativo
- Tiempos de espera prolongados para recibir respuestas a preguntas básicas
- Dificultad para encontrar información actualizada en el sitio web institucional
- Necesidad de asistencia fuera del horario administrativo
- Orientación inconsistente a estudiantes nuevos y aspirantes

## Características principales

### Capacidades conversacionales
- Procesamiento de lenguaje natural en español y guaraní
- Reconocimiento de intención y entidades en consultas
- Manejo de conversaciones multi-turno con memoria contextual
- Detección de sentimiento para escalar consultas complejas o frustrantes

### Dominios de conocimiento
- Procesos de admisión y matrícula
- Información de carreras y mallas curriculares
- Calendarios académicos y fechas importantes
- Requisitos de documentación para trámites
- Ubicación de oficinas y servicios en el campus
- Preguntas frecuentes sobre reglamentos y procedimientos

### Integraciones
- Conexión con sistemas de gestión académica para información personalizada
- Integración con calendario institucional para eventos actualizados
- Vinculación con base de conocimiento mantenida por personal administrativo
- Alerta automática a operadores humanos para casos no resueltos

### Canales de acceso
- Widget en el sitio web institucional
- Aplicación web dedicada
- Integración con WhatsApp y Telegram
- Kioscos interactivos en el campus

## Tecnologías utilizadas

- **Backend NLP**: Python, TensorFlow, spaCy, Rasa
- **API**: FastAPI
- **Frontend**: React, TypeScript
- **Base de datos**: PostgreSQL
- **Despliegue**: Docker, Kubernetes
- **Monitoreo**: Prometheus, Grafana

## Resultados e impacto

Desde su implementación, el chatbot ha logrado:
- Resolver automáticamente el 78% de las consultas recibidas
- Reducir en un 65% las consultas administrativas rutinarias
- Disminuir el tiempo de espera para información básica de 2 días a segundos
- Proporcionar asistencia 24/7, incluyendo fines de semana y periodos de vacaciones
- Mejorar la satisfacción de usuarios, con una calificación promedio de 4.7/5

## Mejora continua

El sistema implementa un ciclo de mejora continua mediante:
- Análisis regular de consultas no resueltas para ampliar la base de conocimiento
- Retroalimentación directa de usuarios para mejorar respuestas
- Entrenamiento periódico con nuevos datos conversacionales
- Actualización automática cuando cambian reglamentos o procedimientos
- Revisión humana de conversaciones seleccionadas para mejorar el modelo

## Consideraciones éticas

El proyecto se desarrolló con atención a aspectos éticos:
- Transparencia sobre la naturaleza no humana del asistente
- Opción fácil de contactar a personal humano
- Protección de datos personales y privacidad
- Auditoría regular para detectar y corregir sesgos en respuestas
- Accesibilidad para personas con discapacidades

## Equipo y colaboración

El chatbot fue desarrollado por estudiantes del Club de Programación FIUNA especializados en NLP e inteligencia artificial, en colaboración con personal administrativo que aportó conocimiento del dominio.

## Próximos pasos

Estamos trabajando en:
- Expansión a nuevos dominios (ej. asistencia académica específica por carrera)
- Integración con sistemas de tutorías
- Capacidades multimodales (reconocimiento y generación de imágenes)
- Personalización avanzada basada en perfiles de estudiantes
- Versión para asistencia a docentes en procesos administrativos

## Contribuciones

El proyecto es de código abierto y acogemos contribuciones, especialmente en:
- Mejora de modelos de lenguaje para español técnico y guaraní
- Desarrollo de nuevos dominios de conocimiento
- Optimización de rendimiento
- Mejoras de accesibilidad
- Nuevos canales de distribución

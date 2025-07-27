---
title: "FIUNA AI Chatbot"
description: "Chatbot inteligente con IA para asistir a estudiantes de la FIUNA"
category: "Artificial Intelligence"
status: "planning"
version: "0.3.0"
repository: "https://github.com/cpf-fiuna/fiuna-chatbot"
maintainers: ["Oscar Alderete"]
tags: ["Python", "OpenAI", "FastAPI", "Langchain"]
lastUpdate: "2025-04-20"
---

# FIUNA AI Chatbot

Asistente virtual inteligente diseñado para responder preguntas sobre la Facultad de Ingeniería de la UNA, utilizando tecnologías de procesamiento de lenguaje natural e inteligencia artificial.

## Objetivo del Proyecto

Crear un chatbot que pueda:
- Responder preguntas sobre carreras, materias y requisitos
- Proporcionar información sobre trámites administrativos
- Asistir con horarios de clases y calendarios académicos
- Ofrecer orientación académica personalizada
- Conectar estudiantes con recursos relevantes

## Características Planificadas

### Funcionalidades Básicas
- **Procesamiento de Lenguaje Natural**: Comprensión de consultas en español
- **Base de Conocimientos**: Información actualizada sobre la FIUNA
- **Respuestas Contextuales**: Conversaciones coherentes y relevantes
- **Integración Multicanal**: WhatsApp, Telegram, Web

### Funcionalidades Avanzadas
- **Recomendaciones Personalizadas**: Basadas en el perfil del estudiante
- **Análisis de Sentimientos**: Detección de frustración o confusión
- **Aprendizaje Continuo**: Mejora basada en interacciones
- **Integración con Sistemas**: Conexión con SIU Guaraní

## Tecnologías Propuestas

- **IA/ML**: OpenAI GPT-4, Langchain
- **Backend**: Python, FastAPI
- **Base de Datos**: Vector Database (Pinecone/Weaviate)
- **Frontend**: React para panel de administración
- **Deployment**: Docker, Google Cloud Run

## Arquitectura Planificada

```
chatbot/
├── core/              # Lógica principal del chatbot
├── knowledge_base/    # Base de conocimientos
├── integrations/      # Conectores con plataformas
├── admin_panel/       # Panel de administración
└── deployment/        # Configuración de deploy
```

## Fases de Desarrollo

### Fase 1: Prototipo (En desarrollo)
- [ ] Setup básico con OpenAI API
- [ ] Procesamiento de preguntas simples
- [ ] Interfaz web básica
- [ ] Base de conocimientos inicial

### Fase 2: MVP
- [ ] Integración con WhatsApp/Telegram
- [ ] Base de conocimientos extendida
- [ ] Sistema de feedback
- [ ] Métricas básicas

### Fase 3: Producción
- [ ] Integración con sistemas FIUNA
- [ ] Análisis avanzado de conversaciones
- [ ] Personalización por carrera
- [ ] Panel de administración completo

## Desafíos Técnicos

### Procesamiento de Lenguaje
- Manejo de jerga estudiantil argentina/paraguaya
- Comprensión de abreviaciones académicas
- Contexto específico de la FIUNA

### Integración de Datos
- APIs limitadas de sistemas universitarios
- Actualización constante de información
- Verificación de datos oficiales

### Escalabilidad
- Manejo de múltiples conversaciones simultáneas
- Optimización de costos de API
- Respuesta en tiempo real

## Estado del Proyecto

- **Estado**: En planificación y desarrollo inicial
- **Versión**: 0.3.0 (prototipo)
- **Última actualización**: 20 de abril, 2025
- **Mantenedor**: Oscar Alderete

## Colaboración

### Necesidades Actuales
- **Desarrolladores Python/IA**: Para implementación del core
- **Especialistas en UX**: Para diseño de conversaciones
- **Estudiantes FIUNA**: Para testing y feedback
- **Administradores**: Para acceso a datos oficiales

### Cómo Contribuir
1. Revisar issues en GitHub
2. Proponer mejoras al flujo conversacional
3. Aportar datos sobre la FIUNA
4. Testing y reportes de bugs

## Enlaces Importantes

- [Repositorio en GitHub](https://github.com/cpf-fiuna/fiuna-chatbot)
- [Roadmap detallado](https://github.com/cpf-fiuna/fiuna-chatbot/projects)
- [Contribuir datos](https://github.com/cpf-fiuna/fiuna-chatbot/blob/main/CONTRIBUTING.md)
- [Demo en desarrollo](https://chatbot-demo.cpf-fiuna.org) (próximamente)

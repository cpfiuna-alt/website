
---
id: 4
title: "Sistema de Reservas del Quincho FIUNA"
description: "Aplicación web para gestionar las reservas y el uso del quincho de la Facultad de Ingeniería de la UNA."
image: "https://images.unsplash.com/photo-1517242810446-cc8951b2be40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
tags: ["React", "Node.js", "MongoDB", "Express", "Tailwind"]
githubLink: "https://github.com/cpfiuna/quincho-reservas"
demoLink: "https://quincho.fiuna.edu.py"
category: "web"
featured: true
status: "Activo"
lastUpdated: "2023-09-15"
team: [
  {"name": "Diego Giménez", "role": "Project Lead", "avatar": "https://i.pravatar.cc/100?img=11"},
  {"name": "Laura Benítez", "role": "Full-stack Developer", "avatar": "https://i.pravatar.cc/100?img=12"},
  {"name": "Martín Acosta", "role": "UI Designer", "avatar": "https://i.pravatar.cc/100?img=13"}
]
githubStats: {
  "stars": 32,
  "forks": 12,
  "issues": 5
}
slug: "quincho-fiuna"
---

# Sistema de Reservas del Quincho FIUNA

## Resumen del proyecto

El Sistema de Reservas del Quincho FIUNA es una aplicación web desarrollada para optimizar y digitalizar el proceso de reserva y administración del quincho de la Facultad de Ingeniería de la Universidad Nacional de Asunción. Este sistema reemplaza el antiguo proceso manual, permitiendo a estudiantes, docentes y personal administrativo realizar reservas de forma eficiente y transparente.

## Características principales

- **Visualización de calendario con disponibilidad en tiempo real**: Permite a los usuarios ver qué fechas y horarios están disponibles para reservar.
- **Reserva de espacios específicos dentro del quincho**: Posibilidad de seleccionar áreas específicas según necesidades.
- **Especificación del motivo y tipo de evento**: Categorización de eventos para mejor organización.
- **Gestión de invitados y estimación de asistentes**: Control de capacidad y planificación.
- **Seguimiento del estado de solicitudes**: Transparencia en el proceso de aprobación.
- **Notificaciones automáticas por email y SMS**: Comunicación efectiva con los usuarios.
- **Cancelaciones y modificaciones de reservas**: Flexibilidad para cambios.

## Tecnologías utilizadas

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express
- **Base de datos**: MongoDB
- **Autenticación**: JWT, integración con sistema de identidad FIUNA
- **Notificaciones**: SendGrid (email), Twilio (SMS)
- **Infraestructura**: Docker, AWS
- **CI/CD**: GitHub Actions

## Desafíos y soluciones de ingeniería

### Gestión de conflictos de reserva

Un desafío significativo fue evitar superposiciones de reservas. Implementamos un algoritmo de verificación de disponibilidad que utiliza índices temporales en MongoDB para realizar búsquedas eficientes de conflictos potenciales. El sistema bloquea automáticamente intentos de reserva que se solapan con eventos ya confirmados.

### Sincronización en tiempo real

Para proporcionar una experiencia de usuario fluida, implementamos sincronización en tiempo real utilizando Socket.IO. Esto permite que múltiples usuarios vean actualizaciones instantáneas en el calendario de disponibilidad, evitando intentos de reserva simultáneos para el mismo espacio.

### Integración con sistemas universitarios

Desarrollamos una API de integración personalizada que se conecta con el sistema de autenticación central de la universidad. Esto elimina la necesidad de credenciales separadas y garantiza que solo usuarios autorizados (estudiantes activos, profesores y personal) puedan realizar reservas.

### Sistema de aprobaciones con múltiples niveles

Creamos un flujo de trabajo configurable que permite diferentes niveles de aprobación según el tipo de evento, cantidad de invitados y duración. Este sistema utiliza una máquina de estados para controlar el ciclo de vida de cada solicitud de reserva.

## Resultado e impacto

Desde su implementación en 2023, el sistema ha:

- **Reducido en un 95% los conflictos de reservas**: Eliminando casi por completo las superposiciones y malentendidos.
- **Aumentado la utilización efectiva del espacio en un 30%**: Mejor planificación y visibilidad han permitido optimizar el uso.
- **Disminuido el tiempo de procesamiento administrativo de 2 días a 10 minutos**: Automatización de aprobaciones para casos estándar.
- **Mejorado la satisfacción de los usuarios**: Las encuestas muestran un aumento de satisfacción de 3.2/5 a 4.7/5.
- **Proporcionado datos valiosos para la planificación**: El análisis de patrones de uso ha informado decisiones sobre mejoras en las instalaciones.

El sistema continúa evolucionando con nuevas funcionalidades basadas en la retroalimentación de usuarios y las necesidades cambiantes de la comunidad universitaria.

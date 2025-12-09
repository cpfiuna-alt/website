---
id: 3
title: "Bot para el servidor de Discord  del Club de Programación FIUNA"
description: "Un bot modular para gestionar el servidor del Club de Programación FIUNA." 
image: "images/projects/discord-bot/cover.png"
tags: ["Herramienta", "Discord.js", "Node.js", "Automatización"]
githubLink: "https://github.com/cpfiuna/discord-bot"
demoLink: "https://discord.gg/UtRpKw2ay4"
category: "tools"
featured: true
demoButtonType: "project"
hideDemoIfMissing: true
status: "Activo"
lastUpdated: "07-12-2025"
team: ["David Giménez", "Iván Jara"]
githubStats: {}
startDate: "02-06-2025"
slug: "discord-bot"
gallery:
  - "/images/projects/discord-bot/cover.png"
  - "/images/projects/discord-bot/commands.png"
---

## El Desafío

El servidor de Discord del Club de Programación FIUNA necesitaba herramientas de administración personalizadas para gestionar contenido oficial y recursos. En lugar de depender de bots genéricos, decidimos construir nuestra propia solución.

El objetivo era doble: crear una herramienta útil para el día a día del club y, al mismo tiempo, generar un proyecto de aprendizaje sobre desarrollo de bots, integración con APIs y deployment en la nube.

## La Solución

Desarrollamos **Bichito**, un bot de Discord modular construido específicamente para las necesidades de nuestro club. No es solo otro bot genérico; es una herramienta diseñada desde cero para resolver nuestros problemas reales de comunicación y administración.

El bot funciona como asistente del equipo administrativo, permitiéndoles enviar anuncios formateados profesionalmente, gestionar archivos multimedia y mantener el orden en los canales, todo a través de comandos intuitivos integrados directamente en Discord.

## Características Principales

- **Mensajes oficiales**  
Permite enviar mensajes en canales específicos (como reglas o información general) directamente desde el bot, manteniendo una presentación uniforme y profesional sin atarlos a la cuenta personal de un administrador.

- **Sistema de gestión de archivos**  
Subida, almacenamiento y distribución de imágenes y recursos directamente desde Discord, con autocompletado para encontrar archivos rápidamente.

- **Seguridad y permisos**  
Todos los comandos sensibles están protegidos por validación de roles, asegurando que solo el personal autorizado pueda ejecutar acciones administrativas.

- **Logs y monitoreo**  
Registro automático de todas las acciones importantes en un canal dedicado, permitiendo auditoría y seguimiento de actividades.

## Stack Tecnológico

El proyecto utiliza un stack moderno enfocado en estabilidad y escalabilidad:

- **Node.js 18+**: Runtime de JavaScript que permite ejecutar el bot con las últimas características del lenguaje, incluyendo soporte nativo para `fetch` y mejor manejo de módulos ES.
- **Discord.js v14**: Librería oficial para la API de Discord que proporciona una interfaz completa para interactuar con servidores, canales, usuarios y eventos. Incluye soporte nativo para slash commands, modales interactivos y autocompletado.
- **PM2**: Gestor de procesos para Node.js en producción. Maneja reinicio automático en caso de fallos, monitoreo de recursos (CPU/RAM), logs centralizados y facilita deployments sin downtime.
- **Azure VM**: Máquina virtual en la nube donde el bot opera 24/7. Proporciona la infraestructura necesaria para mantener el servicio disponible de forma continua con conectividad estable.

## Impacto y Aprendizaje

Más allá de su utilidad práctica en la gestión del servidor, este proyecto ha sido una experiencia valiosa en el desarrollo de aplicaciones serverless, manejo de APIs de terceros y deployment en Azure.

El bot simplifica tareas de moderación diarias y sirve como caso de estudio para miembros del club interesados en desarrollo de bots y arquitectura de servicios en la nube.

## Estado Actual

Bichito está en **producción activa** desde junio de 2025, operando de forma estable en nuestro servidor de Discord. El proyecto continúa evolucionando como plataforma de experimentación para nuevas funcionalidades y técnicas de desarrollo.

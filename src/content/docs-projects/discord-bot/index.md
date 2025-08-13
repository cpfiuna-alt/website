---
title: "CPF Discord Bot"
description: "Bot inteligente para la gestión y moderación del servidor Discord del Club de Programación FIUNA"
category: "Bot Development"
status: "active"
version: "1.5.2"
repository: "https://github.com/cpf-fiuna/discord-bot"
maintainers: ["Iván Jara", "Oscar Alderete"]
tags: ["Discord.js", "Node.js", "TypeScript", "MongoDB"]
lastUpdate: "2025-05-28"
---

# CPF Discord Bot

El bot oficial del servidor Discord del Club de Programación FIUNA, diseñado para mejorar la experiencia de la comunidad a través de automatización y herramientas útiles.

## Características Principales

- **Moderación Automática**: Sistema de filtros y advertencias
- **Gestión de Eventos**: Recordatorios y notificaciones automáticas
- **Sistema de Roles**: Asignación automática basada en actividad
- **Comandos Útiles**: Herramientas para programadores
- **Integración con GitHub**: Notificaciones de commits y releases
- **Sistema de Puntos**: Gamificación para fomentar participación

## Comandos Disponibles

### Comandos Básicos
- `/help` - Muestra ayuda y comandos disponibles
- `/info` - Información sobre el club y servidor
- `/eventos` - Lista próximos eventos

### Comandos de Programación
- `/codigo` - Ejecuta código en diferentes lenguajes
- `/docs` - Busca documentación de tecnologías
- `/github` - Información de repositorios

### Comandos de Moderación
- `/warn` - Advertir a un usuario
- `/mute` - Silenciar temporalmente
- `/kick` - Expulsar del servidor

## Tecnologías Utilizadas

- **Runtime**: Node.js 18+
- **Framework**: Discord.js v14
- **Lenguaje**: TypeScript
- **Base de Datos**: MongoDB
- **Hosting**: Railway/Heroku

## Arquitectura

```
src/
├── commands/           # Comandos del bot
├── events/            # Manejadores de eventos
├── utils/             # Utilidades y helpers
├── database/          # Modelos de base de datos
└── config/            # Configuración del bot
```

## Estado del Proyecto

- **Estado**: Activo y funcionando 24/7
- **Versión**: 1.5.2
- **Última actualización**: 28 de mayo, 2025
- **Mantenedores**: Iván Jara, Oscar Alderete

## Contribución

Para contribuir al desarrollo del bot:

1. Fork el repositorio
2. Crea una rama para tu feature
3. Implementa los cambios
4. Crea un Pull Request

## Enlaces Importantes

- [Repositorio en GitHub](https://github.com/cpf-fiuna/discord-bot)
- [Servidor Discord](https://discord.gg/cpf-fiuna)
- [Issues y sugerencias](https://github.com/cpf-fiuna/discord-bot/issues)

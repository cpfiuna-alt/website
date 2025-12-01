---
title: "CPF Discord Bot"
description: "Bot inteligente para el servidor de Discord del club. Gestiona eventos, modula conversaciones y proporciona utilidades para la comunidad."
category: "bot"
status: "active"
version: "1.0.0"
repository: "https://github.com/cpf-fiuna/discord-bot"
demo: ""
maintainers: ["David Giménez", "Iván Jara"]
tags: ["Discord.js", "Node.js", "JavaScript", "Bot"]
lastUpdate: "2025-11-30"
---

# CPF Discord Bot

Bot oficial del Club de Programación de la Facultad de Ingeniería de la UNA (FIUNA). Sistema modular diseñado para facilitar la gestión y automatización de tareas en el servidor de Discord del club.

## Visión del Proyecto

Crear un bot de Discord robusto y escalable que permita:
- Gestión automatizada de comandos slash
- Sistema modular de eventos para interacciones
- Manejo de bienvenidas a nuevos miembros
- Registro de errores y actividad en canal dedicado
- Fácil despliegue en entornos de producción

## Características Actuales

### Gestión de Comandos
- **Comandos Slash**: Sistema completo de slash commands con Discord.js v14
- **Registro Automático**: Deploy automatizado de comandos locales o globales
- **Modularidad**: Arquitectura que permite agregar comandos fácilmente
- **Manejo de Errores**: Sistema robusto de error handling

### Sistema de Eventos
- **Ready Event**: Inicialización del bot con banner personalizado
- **Guild Member Add**: Bienvenida automática a nuevos miembros
- **Interaction Create**: Manejo centralizado de todas las interacciones
- **Presencia Personalizable**: Estado del bot configurable vía variables de entorno

### Logging y Monitoreo
- **Canal de Logs**: Registro de eventos importantes en canal configurable
- **Error Tracking**: Captura de errores no manejados
- **Instance Identification**: Identificación de instancia (hostname + PID)
- **Startup Notifications**: Notificación automática de inicio del bot

### Comandos Disponibles

#### /ping
Comando de diagnóstico que responde con un embed informativo mostrando que el bot está activo y funcionando correctamente.

**Características:**
- Respuesta inmediata con embed personalizado
- Identifica la instancia del bot
- Manejo robusto de interacciones

## Arquitectura del Sistema

```
discord-bot/
├── src/
│   ├── index.js              # Entry point principal
│   ├── deploy-commands.js    # Script para registrar comandos
│   ├── commands/             # Comandos slash
│   │   ├── commands.js       # Comando de ayuda/lista
│   │   ├── ping.js          # Comando de diagnóstico
│   │   ├── logtest.js       # Comando de prueba de logs
│   │   └── testgreeting.js  # Comando de prueba de bienvenida
│   ├── events/               # Manejadores de eventos
│   │   ├── ready.js         # Evento de inicialización
│   │   ├── guildMemberAdd.js # Bienvenida a nuevos miembros
│   │   └── interactionCreate.js # Manejo de interacciones
│   └── lib/                  # Utilidades y helpers
│       └── logger.js         # Sistema de logging
├── biblioteca-digital/       # Documentación ejemplo
├── discord-bot-docs/         # Documentación del bot
├── package.json
├── .env.example
└── README.md
```

## Stack Tecnológico

### Core
- **Node.js**: v18+ (LTS)
- **Discord.js**: v14.14.1 - Librería principal para interactuar con Discord API
- **dotenv**: v16.3.1 - Gestión de variables de entorno

### Utilidades
- **sqlite3**: v5.1.6 - Base de datos SQLite para persistencia (opcional)
- **node-cron**: v3.0.3 - Tareas programadas
- **axios**: v1.6.2 - Cliente HTTP para APIs externas

### Desarrollo
- **nodemon**: v3.0.2 - Auto-reload en desarrollo

## Estado Actual del Proyecto

**Estado**: ✅ Activo y en producción  
**Versión**: 1.0.0  
**Última actualización**: 30 de noviembre, 2025  
**Mantenedor**: David Gimenez

## Características en Desarrollo

### Fase Actual (v1.0.0)
- [x] Sistema base de comandos slash
- [x] Sistema de eventos modular
- [x] Comando ping funcional
- [x] Sistema de logging
- [x] Deploy automatizado
- [x] Documentación básica

### Próximas Características (v1.1.0)
- [ ] Base de datos SQLite integrada
- [ ] Sistema de permisos por rol
- [ ] Comandos de moderación
- [ ] Sistema de puntos/rankings
- [ ] Comandos de información del club

### Futuro (v2.0.0)
- [ ] Panel web de administración
- [ ] Integración con GitHub para notificaciones
- [ ] Sistema de eventos/calendario
- [ ] Bot multi-servidor
- [ ] Analytics y estadísticas

## Desafíos Técnicos

### Escalabilidad
- Manejo de múltiples servidores simultáneamente
- Optimización de respuestas para reducir latencia
- Gestión eficiente de memoria en despliegue con PM2

### Modularidad
- Sistema de plugins para extensibilidad
- Configuración por servidor
- Hot-reload de comandos sin reiniciar

### Confiabilidad
- Manejo robusto de errores de red
- Recuperación automática ante desconexiones
- Sistema de backups automáticos

## Configuración Requerida

Variables de entorno mínimas necesarias:

```env
# Obligatorias
DISCORD_TOKEN=your_bot_token_here
DISCORD_CLIENT_ID=your_application_id

# Recomendadas
DISCORD_GUILD_ID=your_guild_id_for_dev
LOG_CHANNEL_ID=channel_id_for_logs
GREETING_CHANNEL_ID=channel_id_for_welcomes
BOT_PRESENCE="En línea — usa /"
```

## Despliegue

### Desarrollo Local
```bash
npm install
npm run deploy  # Registra comandos
npm run dev     # Inicia con nodemon
```

### Producción (PM2)
```bash
npm ci --production
npm run deploy
pm2 start --name cpf-bot npm -- start
pm2 save
```

## Oportunidades de Colaboración

### Roles Necesarios
- **Desarrolladores Node.js**: Implementación de nuevos comandos y features
- **DevOps**: Optimización de despliegue y monitoreo
- **Diseñadores**: Diseño de embeds y mensajes visuales
- **Moderadores**: Testing y feedback de funcionalidades

### Cómo Contribuir
1. Fork del repositorio
2. Crear rama de feature (`git checkout -b feature/nuevo-comando`)
3. Implementar cambios con tests
4. Crear Pull Request con descripción detallada
5. Esperar revisión y aprobación

## Enlaces Importantes

- [Repositorio en GitHub](https://github.com/davidgimenezs/discord-bot)
- [Documentación de Discord.js](https://discord.js.org/)
- [Guía de Getting Started](./getting-started.md)
- [Guía de Deployment](./deployment.md)
- [Guía de Contribución](./contributing.md)

## Contacto y Soporte

- **Discord**: Únete al servidor del CPF FIUNA
- **GitHub Issues**: Para reportar bugs o sugerir features
- **Email**: Contacta al mantenedor para consultas directas

---

> **Nota**: Este proyecto está en constante desarrollo. Las contribuciones son bienvenidas y apreciadas.

---
title: "Primeros Pasos"
description: "Guía para configurar y ejecutar el bot de Discord CPF"
chapter: "Configuración"
section: "Instalación Inicial"
order: 1
status: "active"
---

## Getting Started — Desarrollo local (Node.js)

### Requisitos
- Node.js 18+ (LTS recomendado)
- npm 8+ (viene con Node.js)
- Git
- Opcional: servidor Discord de pruebas para registrar comandos con rapidez

### Clonar y preparar el repositorio
```bash
git clone <REPO_URL>
cd discord-bot
npm ci
```

### Configurar variables de entorno
Crear un archivo `.env` con al menos estas variables (no lo incluyas en git):

```text
DISCORD_TOKEN=your_bot_token
DISCORD_CLIENT_ID=your_client_id
DISCORD_GUILD_ID=your_dev_guild_id # opcional para deploy local
LOG_CHANNEL_ID=optional_log_channel_id
GREETING_CHANNEL_ID=optional_greeting_channel
BOT_PRESENCE="En línea — usa /"
```

### Registrar comandos localmente (opcional)
Si querés desplegar los comandos rápido en tu servidor de pruebas:
```bash
npm run deploy
```

### Notas y prácticas
- Mantener `.env` fuera del control de versiones; en producción usar secretos (Azure KeyVault).
- Usá `DISCORD_GUILD_ID` para registrar comandos en un servidor de pruebas y verificar inmediatamente.
- Para producción, seguí `discord-bot/deployment.md` (Azure VM / pm2).

## Next Steps

- [Bot Architecture](./architecture) - Understand the system design
- [Command Development](./commands) - Learn to create custom commands
- [Deployment Guide](./deployment) - Deploy your bot to production

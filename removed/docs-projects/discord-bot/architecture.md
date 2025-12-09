# ---
title: "Arquitectura del Sistema"
description: "Arquitectura modular y escalable del bot de Discord"
chapter: "Arquitectura"
section: "Diseño del Sistema"
order: 1
status: "active"
---

# Arquitectura: resumen rápido

Este proyecto es un bot pequeño y modular construido con `discord.js` (v14) sobre Node.js 18+. El objetivo es mantener comandos y eventos simples y testables.

Estructura esencial:

```
src/
├── commands/
├── events/
├── lib/
├── deploy-commands.js
└── index.js
```

Puntos clave:
- Los comandos exportan `data` (SlashCommandBuilder) y `execute(interaction)`.
- Los eventos exportan `name`, `execute` y `once` (cuando aplica).
- `index.js` orquesta la carga de comandos y eventos y realiza `client.login(process.env.DISCORD_TOKEN)`.
- `lib/logger.js` puede enviar errores/usage a `LOG_CHANNEL_ID` si se configura.

Nota: la base de datos y otros componentes (monitoring, dashboards, integración de terceros) son opcionales y deben documentarse según el caso si se añaden (no están incluidos por defecto en el repositorio actual).

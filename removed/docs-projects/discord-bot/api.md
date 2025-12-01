
---
title: "API y Comandos"
description: "Documentación completa de comandos y API del bot de Discord"
chapter: "Uso"
section: "Comandos y API"
order: 1
status: "active"
---

## Registro de comandos / `deploy-commands.js`

Este proyecto usa la API de Discord para registrar comandos "slash" mediante el script `src/deploy-commands.js` (usa `discord.js` REST + Routes).

Cómo funciona
- El script recorre `src/commands`, lee los objetos exportados que incluyan `data` (un `SlashCommandBuilder`) y `execute`, y registra dichos comandos.
- Para autorizar la petición se usa `DISCORD_TOKEN`; `DISCORD_CLIENT_ID` y `DISCORD_GUILD_ID` son necesarios si querés registrar localmente en un guild (rápido) en lugar de global.

Registro rápido (desarrollo)
1. Crear `.env` con `DISCORD_TOKEN`, `DISCORD_CLIENT_ID` y `DISCORD_GUILD_ID` apuntando al servidor de testing.
2. Ejecutar:

```bash
npm run deploy
```

Notas operativas
- Registrar comandos globalmente (sin `DISCORD_GUILD_ID`) puede demorar hasta una hora en propagarse.
- `deploy-commands.js` ignorará archivos de comandos que no exporten `data` y `execute` y mostrará advertencias en consola.

## Añadir comandos
1. Crear un archivo en `src/commands` que exporte `data` y `execute`.
2. Testear localmente con `DISCORD_GUILD_ID` y `npm run deploy`.
3. Subir a main y aplicar deploy en la VM según sea necesario.

### Ejemplo de archivo de comando (ping)
```javascript
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder().setName('ping').setDescription('Responde con Pong!'),
  async execute(interaction) {
    await interaction.reply('Pong!');
  }
};
```


### Limitaciones y notas
- Este repo actualmente no expone una API REST pública; las secciones de endpoints/API son conceptuales y no están implementadas en el código actual.
- El soporte principal del bot se basa en comandos slash y el script `src/deploy-commands.js`.


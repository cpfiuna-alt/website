---
title: "Guía de Contribución"
description: "Cómo contribuir al desarrollo del bot de Discord CPF"
chapter: "Desarrollo"
section: "Guía de Contribución"
order: 1
status: "active"
---

**Contribuir al proyecto**

Gracias por querer colaborar. A continuación hay pautas para contribuir de forma ordenada:

- Fork y Branching:
  - Hacé un fork del repositorio y trabajá en una branch con nombre descriptivo (`feature/<descripcion>`, `fix/<descripcion>`).

- Estilo de código:
  - Código en JavaScript moderno (Node.js). Preferir `const`/`let`, evitar variables globales.
  - Usar mensajes de commit claros y en inglés o español (ej: `feat: agregar comando /rol`).

- Pull Requests:
  - Abrir PR contra la rama `main` del repositorio original.
  - Describir el objetivo, qué archivos cambian y cómo probar.

- Manejo de secretos:
  - No subir tokens, `.env` ni claves al repositorio. Los secretos se deben inyectar en la VM o en secrets del CI.

- Tests y verificación manual:
  - Probar localmente con `npm run dev` y, si aplica, registrar comandos en un servidor de pruebas con `DISCORD_GUILD_ID`.

Contacto
- Para temas operativos (despliegue, credenciales de la VM), contactá a los administradores del Club de Programación FIUNA.

 
 # Contribuir al Discord Bot

## Cómo Contribuir

¡Gracias por tu interés en contribuir al CPF Discord Bot! Este documento te guiará através del proceso de contribución.

## Configuración del Entorno de Desarrollo

### Prerrequisitos

- Node.js 18.x o superior
- npm 8.x o superior
- Git
- Cuenta de Discord Developer

### Configuración Inicial

1. **Fork del repositorio**
   ```bash
   # Hacer fork en GitHub, luego clonar tu fork
   git clone https://github.com/tu-usuario/discord-bot.git
   cd discord-bot
  # Cómo contribuir

  ¡Gracias por querer colaborar! Este documento describe el workflow recomendado para contribuir al bot.

  ## Reglas rápidas
  - Mantener código limpio: `const/let`, evitar mutaciones globales.
  - Escribir commits descriptivos (ej: `feat: agregar comando /rol`).
  - No subir secretos, tampoco archivos `.env`.

  ## Flujo de trabajo recomendado
  1. Fork del repo y crear una rama descriptiva:

  ```bash
  git clone https://github.com/<tu-usuario>/discord-bot.git
  git checkout -b feature/mi-cambio
  ```

  2. Instalar dependencias y configurar entorno local:

  ```bash
  npm ci
  cp .env.example .env # editar valores locales
  npm run dev
  ```

  3. Desarrollar: crear un nuevo comando en `src/commands` o un event handler en `src/events`.

  4. Registrar comandos localmente (con `DISCORD_GUILD_ID`):

  ```bash
  npm run deploy
  ```

  5. Añadir tests (si aplica) y verificar:

  ```bash
  npm test
  npm run lint
  ```

  6. Hacer PR hacia `main` con una descripción clara de los cambios y cómo probarlos.

  ## Contribución de código
  - Los comandos deben exportar `data` (SlashCommandBuilder) y `execute(interaction)`.
  - Mantener tests y documentar comportamientos nuevos.
  - Aceptamos PRs que cumplan con el estilo del repositorio y tengan pruebas cuando el cambio lo justifique.

  ## Operaciones / Deployment (para administradores)
  - Actualizar dependencias y aplicar cambio en la VM:

  ```bash
  cd /opt/cpf-bot
  git pull origin main
  npm ci --production
  npm run deploy # si se actualizaron comandos
  pm2 restart cpf-bot
  ```

  ---
  Para dudas de administración (credenciales, VM) contactá al equipo responsable.

## Guidelines

### Commits

Usamos [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Tipos:**
- `feat`: Nueva funcionalidad
- `fix`: Bug fix
- `docs`: Cambios en documentación
- `style`: Cambios de formato, no código
- `refactor`: Refactoring de código
- `test`: Añadir o modificar tests
- `chore`: Mantenimiento

**Ejemplos:**
```
feat(commands): añadir comando de estadísticas de usuario
fix(events): corregir error en event handler de mensajes
docs: actualizar guía de contribución
```

### Issues

Al reportar bugs, incluir:

- **Descripción clara** del problema
- **Steps to reproduce** 
- **Comportamiento esperado**
- **Comportamiento actual**
- **Información del entorno** (OS, Node.js version)
- **Logs relevantes**

### Code Review

- Sé respetuoso y constructivo
- Explica el "por qué" en tus comentarios
- Sugiere alternativas cuando sea posible
- Aprende de los comentarios recibidos

## Recursos Adicionales

### Documentation

- [Discord.js Guide](https://discordjs.guide/)
- [Discord API Documentation](https://discord.com/developers/docs)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)

### Tools

- [Discord Developer Portal](https://discord.com/developers/applications)
- [Bot Testing Server](https://discord.gg/cpf-dev) (solicitar acceso)
- (Opcional) [MongoDB Compass](https://www.mongodb.com/products/compass) para BD local

### Community

- **Discord**: [Servidor del CPF](https://discord.gg/cpf-fiuna)
- **Telegram**: [Grupo de desarrollo](https://t.me/cpf_dev)
- **GitHub**: [Discusiones del proyecto](https://github.com/cpf-fiuna/discord-bot/discussions)

## Reconocimientos

### Hall of Fame

Contribuidores destacados:

- **Iván Jara** - Arquitectura inicial y comandos de moderación
- **Oscar Alderete** - Sistema de eventos y integraciones
- **David Giménez** - Sistema de deployment y documentación

### Cómo ser Reconocido

- Mantener contribuciones consistentes
- Ayudar a otros contribuidores
- Mejorar la documentación
- Reportar y corregir bugs importantes
- Proponer mejoras arquitecturales

¡Gracias por contribuir al CPF Discord Bot! 🚀

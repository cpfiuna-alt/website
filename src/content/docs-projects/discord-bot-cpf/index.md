---
title: "Bot de Discord del CPF"
description: "Bot oficial del servidor de Discord del Club de Programacion FIUNA"
category: "bot"
status: "active"
version: "1.0.0"
repository: "https://github.com/cpfiuna/discord-bot"
demo: ""
maintainers: ["David Gimenez", "Ivan Jara"]
tags: ["Discord.js", "Node.js", "JavaScript", "Bot"]
lastUpdate: "2025-12-08"
---

# Bot de Discord del CPF

Bot oficial del Club de Programacion de la Facultad de Ingenieria de la UNA (FIUNA). Un sistema modular disenado para facilitar la gestion y automatizacion de tareas en el servidor de Discord del club.

## 1. Caracteristicas Principales
### 1.1 Comandos Slash
Sistema completo de slash commands con Discord.js v14. Todos los comandos son registrados automaticamente y funcionan con autocompletado.

### 1.2 Sistema de Eventos
Arquitectura modular de eventos que permite manejar interacciones, nuevos miembros y cambios de estado de manera eficiente.

### 1.3 Logging Avanzado
Sistema de logs con soporte para canales de Discord. Registra errores, uso de comandos e informacion de diagnostico.

### 1.4 Recordatorios
Sistema de recordatorios personales y globales con soporte para fechas especificas. Limite de 10 recordatorios activos por usuario.

### 1.5 Salas de Voz Temporales
Creacion automatica de salas de voz que se eliminan tras 1 minuto de estar vacias.

### 1.6 Encuestas Interactivas
Sistema de encuestas con 2-4 opciones usando reacciones para votacion.

### 1.7 Compartir Codigo
Modal para compartir codigo formateado con soporte para 11 lenguajes de programacion.

### 1.8 Bienvenidas Automaticas
Mensaje de bienvenida personalizable para nuevos miembros con fallback a DM.

---

## 2. Comandos Disponibles

### 2.1 Informacion

| Comando | Descripcion |
|---------|-------------|
| `/info` | Informacion del Club de Programacion FIUNA |
| `/links` | Enlaces y redes sociales del club |
| `/help` | Ayuda detallada sobre comandos |

### 2.2 Utilidades

| Comando | Descripcion |
|---------|-------------|
| `/code` | Comparte codigo formateado (limite 4000 caracteres) |
| `/encuesta` | Crea encuestas con 2-4 opciones |
| `/recordar` | Crea recordatorios personales o globales |
| `/ping` | Verifica que el bot este activo |

### 2.3 Salas de Voz

| Comando | Descripcion |
|---------|-------------|
| `/sala crear` | Crea una sala de voz temporal |
| `/sala listar` | Lista todas las salas disponibles |
| `/sala unirse` | Informacion sobre una sala especifica |

### 2.4 Administracion

| Comando | Descripcion |
|---------|-------------|
| `/setpresence` | Cambia el estado del bot |
| `/setgreeting` | Configura mensajes de bienvenida |
| `/setlogchannel` | Configura el canal de logs |
| `/botstats` | Estadisticas del bot (uptime, RAM, CPU) |
| `/serverinfo` | Informacion del servidor |
| `/say` | Envia mensajes formateados |
| `/shutdown` | Apaga el bot de forma segura |

---

## 3. Stack Tecnologico

| Tecnologia | Version | Uso |
|------------|---------|-----|
| Node.js | 18+ LTS | Runtime |
| Discord.js | 14.14.1 | API de Discord |
| dotenv | 16.3.1 | Variables de entorno |
| SQLite3 | 5.1.6 | Base de datos (opcional) |
| node-cron | 3.0.3 | Tareas programadas |
| nodemon | 3.0.2 | Desarrollo |

---

## 4. Arquitectura

```
discord-bot/
    src/
        index.js              # Entry point
        deploy-commands.js    # Registro de comandos
        commands/             # Comandos slash
        events/               # Manejadores de eventos
        lib/                  # Utilidades
    assets/uploads/           # Archivos subidos
    package.json
    .env
```

---

## 5. Instalacion Rapida

```bash
# Clonar el repositorio
git clone https://github.com/cpfiuna/discord-bot.git
cd discord-bot

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales

# Registrar comandos
npm run deploy

# Iniciar en desarrollo
npm run dev
```

---

## 6. Variables de Entorno

```env
# Obligatorio
DISCORD_TOKEN=tu_token_aqui
DISCORD_CLIENT_ID=tu_client_id

# Desarrollo
DISCORD_GUILD_ID=tu_guild_id

# Opcional
LOG_CHANNEL_ID=id_canal_logs
GREETING_CHANNEL_ID=id_canal_bienvenidas
BOT_PRESENCE="Usa /help para ver comandos"
```

---

## 7. Enlaces

- [Repositorio en GitHub](https://github.com/cpfiuna/discord-bot)
- [Documentacion de Discord.js](https://discord.js.org/)
- [Portal de Desarrolladores de Discord](https://discord.com/developers/applications)
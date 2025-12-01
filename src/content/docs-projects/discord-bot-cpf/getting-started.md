---
title: "Getting Started"
description: "Guía completa para comenzar a desarrollar con el CPF Discord Bot"
chapter: "Getting Started"
section: "Inicio Rápido"
order: 1
lastUpdate: "2025-11-30"
---

# Getting Started - CPF Discord Bot

Esta guía te ayudará a configurar tu entorno de desarrollo desde cero y a comenzar a trabajar con el bot del Club de Programación FIUNA.

## Tabla de Contenidos

1. [Prerrequisitos](#prerrequisitos)
2. [Configuración de Discord Developer Portal](#configuración-de-discord-developer-portal)
3. [Instalación Local](#instalación-local)
4. [Configuración del Proyecto](#configuración-del-proyecto)
5. [Registro de Comandos](#registro-de-comandos)
6. [Ejecución del Bot](#ejecución-del-bot)
7. [Estructura del Proyecto](#estructura-del-proyecto)
8. [Primeros Pasos](#primeros-pasos)
9. [Solución de Problemas](#solución-de-problemas)

## Prerrequisitos

### Requisitos del Sistema

- **Node.js 18.x o superior** (recomendado: 18 LTS o 20 LTS)
- **npm 8.x o superior** (viene incluido con Node.js)
- **Git** para control de versiones
- **Editor de código** (recomendado: VS Code)
- **Cuenta de Discord** con permisos de administrador en un servidor de prueba

### Verificar Instalaciones

```powershell
# Verificar versión de Node.js
node --version
# Debe mostrar: v18.x.x o superior

# Verificar versión de npm
npm --version
# Debe mostrar: 8.x.x o superior

# Verificar Git
git --version
# Debe mostrar: git version 2.x.x
```

### Conocimientos Recomendados

- JavaScript básico (ES6+)
- Promesas y async/await
- Conceptos básicos de Discord (servidores, canales, roles)
- Línea de comandos (PowerShell/Bash)

## Configuración de Discord Developer Portal

### 1. Crear una Aplicación de Discord

1. Ve al [Discord Developer Portal](https://discord.com/developers/applications)
2. Haz clic en "New Application"
3. Asigna un nombre (ej: "CPF Bot Development")
4. Acepta los términos y crea la aplicación

### 2. Configurar el Bot

1. En el menú lateral, selecciona "Bot"
2. Haz clic en "Add Bot" → "Yes, do it!"
3. Configura las opciones del bot:
   - **Public Bot**: Desactívalo si solo quieres usarlo en tu servidor
   - **Requires OAuth2 Code Grant**: Déjalo desactivado
   - **Privileged Gateway Intents**: Activa:
     - ✅ **SERVER MEMBERS INTENT** (para detectar nuevos miembros)
     - ✅ **MESSAGE CONTENT INTENT** (si planeas leer mensajes)

### 3. Obtener el Token del Bot

1. En la sección "Bot", haz clic en "Reset Token"
2. Copia el token generado (⚠️ **guárdalo de forma segura, solo se muestra una vez**)
3. **NUNCA** compartas este token públicamente

### 4. Obtener el Client ID

1. Ve a "General Information" en el menú lateral
2. Copia el "Application ID" (también llamado Client ID)

### 5. Invitar el Bot a tu Servidor

1. Ve a "OAuth2" → "URL Generator"
2. Selecciona los siguientes **Scopes**:
   - ✅ `bot`
   - ✅ `applications.commands`
3. Selecciona los siguientes **Bot Permissions**:
   - ✅ Send Messages
   - ✅ Send Messages in Threads
   - ✅ Embed Links
   - ✅ Attach Files
   - ✅ Read Message History
   - ✅ Use Slash Commands
   - ✅ Manage Roles (opcional, para sistemas de roles)
   - ✅ Kick Members (opcional, para moderación)
   - ✅ Ban Members (opcional, para moderación)
4. Copia la URL generada y ábrela en tu navegador
5. Selecciona tu servidor de prueba y autoriza el bot

### 6. Obtener IDs de Servidor y Canales

**Guild ID (ID del Servidor):**
1. En Discord, habilita el "Modo Desarrollador":
   - Configuración de Usuario → Avanzado → Modo Desarrollador (activar)
2. Haz clic derecho en tu servidor → "Copiar ID"

**Channel IDs:**
1. Haz clic derecho en el canal → "Copiar ID"
2. Necesitarás IDs para:
   - Canal de logs (`LOG_CHANNEL_ID`)
   - Canal de bienvenidas (`GREETING_CHANNEL_ID`)

## Instalación Local

### 1. Clonar el Repositorio

```powershell
# Navegar a tu directorio de proyectos
cd C:\Users\TuUsuario\Desktop

# Clonar el repositorio
git clone https://github.com/davidgimenezs/discord-bot.git

# Entrar al directorio
cd discord-bot
```

### 2. Instalar Dependencias

```powershell
# Instalar todas las dependencias
npm install

# O usar npm ci para instalación limpia (recomendado)
npm ci
```

Esto instalará:
- **discord.js**: Librería para interactuar con Discord API
- **dotenv**: Para manejar variables de entorno
- **sqlite3**: Base de datos (opcional)
- **node-cron**: Para tareas programadas
- **axios**: Cliente HTTP
- **nodemon**: Auto-reload en desarrollo

## Configuración del Proyecto

### 1. Crear Archivo de Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```powershell
# Crear archivo .env desde PowerShell
New-Item -Path .env -ItemType File

# O desde CMD
type nul > .env
```

### 2. Configurar Variables de Entorno

Edita el archivo `.env` con la siguiente estructura:

```env
# ====================================
# CONFIGURACIÓN OBLIGATORIA
# ====================================

# Token del bot obtenido del Developer Portal
DISCORD_TOKEN=123456ABCDEF

# Client ID (Application ID) del bot
DISCORD_CLIENT_ID=1234567890123456789

# ====================================
# CONFIGURACIÓN PARA DESARROLLO
# ====================================

# ID del servidor para registrar comandos de prueba (más rápido)
DISCORD_GUILD_ID=1234567890123456789

# ====================================
# CONFIGURACIÓN OPCIONAL
# ====================================

# Canal donde se registrarán los logs del bot
LOG_CHANNEL_ID=1234567890123456789

# Canal donde se enviarán mensajes de bienvenida
GREETING_CHANNEL_ID=1234567890123456789

# Texto del estado del bot (aparece en "Jugando a...")
BOT_PRESENCE="En línea — usa / para comandos"

# Nivel de logging (error, warn, info, debug)
LOG_LEVEL=info

# ====================================
# CONFIGURACIÓN PARA PRODUCCIÓN
# ====================================

# Ambiente de ejecución
NODE_ENV=development

# Puerto para health checks (opcional)
PORT=3000
```

### 3. Verificar Configuración

Crea un script de verificación:

```powershell
# Verificar que las variables estén cargadas
node -e "require('dotenv').config(); console.log('Token:', process.env.DISCORD_TOKEN ? '✅ Configurado' : '❌ Falta'); console.log('Client ID:', process.env.DISCORD_CLIENT_ID ? '✅ Configurado' : '❌ Falta');"
```

## Registro de Comandos

### ¿Por qué Registrar Comandos?

Discord requiere que los comandos slash sean registrados antes de poder usarlos. Hay dos formas de registrarlos:

1. **Guild Commands** (Servidor específico): Rápido, ideal para desarrollo
2. **Global Commands**: Tarda ~1 hora en propagarse, para producción

### Registrar Comandos en Modo Desarrollo

```powershell
# Registra comandos en el servidor especificado en DISCORD_GUILD_ID
npm run deploy
```

Salida esperada:
```
✅ Comando cargado: ping
✅ Comando cargado: commands
✅ Comando cargado: logtest
✅ Comando cargado: testgreeting
🚀 Desplegando 4 comandos en el servidor...
✅ Comandos desplegados exitosamente!
```

### Registrar Comandos Globalmente (Producción)

```powershell
# Registra comandos en todos los servidores (tarda ~1 hora)
npm run deploy-global

# O usar el script directamente
node src/deploy-commands.js --global
```

### Re-registrar Comandos

Si modificas un comando (nombre, descripción, opciones), debes re-registrarlo:

```powershell
npm run deploy
```

## Ejecución del Bot

### Modo Desarrollo

```powershell
# Ejecutar con nodemon (auto-reload al guardar cambios)
npm run dev
```

Salida esperada:
```
[nodemon] starting `node src/index.js`
✅ Comando cargado: ping
✅ Comando cargado: commands
✅ Comando cargado: logtest
✅ Comando cargado: testgreeting
✅ Evento cargado: clientReady
✅ Evento cargado: guildMemberAdd
✅ Evento cargado: interactionCreate
            88                       .o88o.          .o8                     .         
   .dP     .8'                       888 `"         "888                   .o8   Yb    
 .dP      .8'   .ooooo.  oo.ooooo.  o888oo           888oooo.   .ooooo.  .o888oo  `Yb  
dP       .8'   d88' `"Y8  888' `88b  888             d88' `88b d88' `88b   888      `Yb
Yb      .8'    888        888   888  888    8888888  888   888 888   888   888      .dP
 `Yb   .8'     888   .o8  888   888  888             888   888 888   888   888 .  .dP  
   `Yb 88      `Y8bod8P'  888bod8P' o888o            `Y8bod8P' `Y8bod8P'   "888" dP    
                          888                                                          
                         o888o                                                         
¡CPF Bot está conectado y listo!
Instance startup id=DESKTOP-ABC123::12345
```

### Modo Producción

```powershell
# Ejecutar normalmente (sin auto-reload)
npm start
```

### Verificar Funcionamiento

1. Ve a tu servidor de Discord
2. Escribe `/` en cualquier canal
3. Deberías ver los comandos del bot aparecer
4. Ejecuta `/ping` para verificar que responda

## Estructura del Proyecto

```
discord-bot/
├── src/
│   ├── index.js                 # ⚡ Entry point principal
│   ├── deploy-commands.js       # 🚀 Script de registro de comandos
│   │
│   ├── commands/                # 📝 Comandos slash
│   │   ├── ping.js             # Comando de diagnóstico
│   │   ├── commands.js         # Lista de comandos disponibles
│   │   ├── logtest.js          # Prueba de sistema de logs
│   │   └── testgreeting.js     # Prueba de mensaje de bienvenida
│   │
│   ├── events/                  # 🎯 Manejadores de eventos
│   │   ├── ready.js            # Evento de inicialización
│   │   ├── guildMemberAdd.js   # Nuevo miembro en servidor
│   │   └── interactionCreate.js # Manejo de interacciones
│   │
│   └── lib/                     # 🔧 Utilidades
│       └── logger.js           # Sistema de logging
│
├── discord-bot-docs/            # 📚 Documentación del proyecto
│   ├── index.md
│   ├── getting-started.md
│   ├── deployment.md
│   └── contributing.md
│
├── node_modules/                # 📦 Dependencias (no editar)
├── .env                         # 🔒 Variables de entorno (no subir a Git)
├── .env.example                 # 📋 Plantilla de .env
├── .gitignore                   # 🚫 Archivos ignorados por Git
├── package.json                 # 📄 Configuración del proyecto
├── package-lock.json            # 🔒 Versiones exactas de dependencias
└── README.md                    # 📖 Documentación principal
```

### Archivos Clave

#### `src/index.js`
Entry point que:
- Carga variables de entorno
- Inicializa el cliente de Discord
- Carga comandos y eventos dinámicamente
- Maneja errores globales

#### `src/deploy-commands.js`
Script para registrar comandos:
- Lee todos los archivos en `src/commands/`
- Los registra en Discord (local o global)
- Actualiza o elimina comandos existentes

#### `src/commands/[nombre].js`
Estructura de un comando:
```javascript
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('comando')
        .setDescription('Descripción del comando'),
    
    async execute(interaction) {
        await interaction.reply('¡Respuesta!');
    },
};
```

#### `src/events/[nombre].js`
Estructura de un evento:
```javascript
module.exports = {
    name: 'nombreDelEvento',
    once: false, // true si solo se ejecuta una vez
    execute(...args) {
        // Lógica del evento
    },
};
```

## Primeros Pasos

### 1. Probar el Comando Ping

```
/ping
```

Deberías recibir un embed con "🏓 Pong!"

### 2. Listar Comandos Disponibles

```
/commands
```

Muestra todos los comandos registrados y sus descripciones.

### 3. Probar el Sistema de Logs

```
/logtest
```

Envía un mensaje de prueba al canal de logs (si está configurado).

### 4. Probar Bienvenida

```
/testgreeting
```

Simula un mensaje de bienvenida (útil para probar el formato).

### 5. Crear tu Primer Comando

Crea `src/commands/hola.js`:

```javascript
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('hola')
        .setDescription('Saluda al usuario'),
    
    async execute(interaction) {
        await interaction.reply(`¡Hola, ${interaction.user.username}! 👋`);
    },
};
```

Registra el comando:
```powershell
npm run deploy
```

Prueba en Discord:
```
/hola
```

### 6. Agregar Opciones a un Comando

Modifica `src/commands/hola.js` para incluir opciones:

```javascript
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('hola')
        .setDescription('Saluda al usuario')
        .addStringOption(option =>
            option
                .setName('nombre')
                .setDescription('Tu nombre')
                .setRequired(false)
        ),
    
    async execute(interaction) {
        const nombre = interaction.options.getString('nombre') || interaction.user.username;
        await interaction.reply(`¡Hola, ${nombre}! 👋`);
    },
};
```

Re-registra:
```powershell
npm run deploy
```

Prueba:
```
/hola
/hola nombre:David
```

## Solución de Problemas

### Error: "Invalid Token"

**Problema**: El token del bot es inválido o está mal configurado.

**Solución**:
1. Verifica que `DISCORD_TOKEN` en `.env` sea correcto
2. Regenera el token en Discord Developer Portal si es necesario
3. Asegúrate de no tener espacios extra en el `.env`

```powershell
# Verificar token
node -e "require('dotenv').config(); console.log(process.env.DISCORD_TOKEN);"
```

### Error: "Missing Permissions"

**Problema**: El bot no tiene los permisos necesarios en el servidor.

**Solución**:
1. Ve a Discord Developer Portal → OAuth2 → URL Generator
2. Regenera la URL de invitación con los permisos correctos
3. Expulsa el bot del servidor y vuelve a invitarlo

### Error: "Commands not appearing"

**Problema**: Los comandos no aparecen en Discord.

**Solución**:
1. Ejecuta `npm run deploy` nuevamente
2. Espera 1-2 minutos para que Discord cache los comandos
3. Recarga Discord (Ctrl + R)
4. Verifica que `DISCORD_GUILD_ID` esté configurado correctamente

### Error: "Cannot find module"

**Problema**: Falta instalar dependencias.

**Solución**:
```powershell
# Eliminar node_modules y reinstalar
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

### El bot se desconecta constantemente

**Problema**: Posible problema de red o intents faltantes.

**Solución**:
1. Verifica tu conexión a Internet
2. Asegúrate de tener los intents correctos en el Developer Portal
3. Revisa los logs para ver el error específico

```powershell
# Ver logs detallados
npm run dev
```

### Error: "Cannot read property 'execute'"

**Problema**: Estructura incorrecta en un comando o evento.

**Solución**:
Verifica que tu archivo tenga la estructura correcta:

```javascript
// Comando debe exportar 'data' y 'execute'
module.exports = {
    data: new SlashCommandBuilder()...,
    async execute(interaction) { ... }
};

// Evento debe exportar 'name' y 'execute'
module.exports = {
    name: 'eventName',
    execute(...args) { ... }
};
```

### El bot responde pero no aparece en la lista de miembros

**Problema**: El bot está invisible o no tiene presencia configurada.

**Solución**:
Verifica `src/events/ready.js` y asegúrate de que la presencia esté configurada:

```javascript
const { ActivityType } = require('discord.js');
client.user.setActivity('Listo — usa /', { type: ActivityType.Watching });
```

## Próximos Pasos

Ahora que tienes el bot funcionando, puedes:

1. **Explorar comandos existentes**: Revisa `src/commands/` para ver ejemplos
2. **Crear tus propios comandos**: Sigue la estructura de los comandos existentes
3. **Aprender sobre eventos**: Explora `src/events/` para entender cómo responder a acciones
4. **Leer la documentación de Discord.js**: [discord.js.org/docs](https://discord.js.org/docs)
5. **Contribuir al proyecto**: Lee [contributing.md](./contributing.md)

## Recursos Adicionales

- **Discord.js Guide**: [discordjs.guide](https://discordjs.guide/)
- **Discord API Documentation**: [discord.com/developers/docs](https://discord.com/developers/docs)
- **Node.js Documentation**: [nodejs.org/docs](https://nodejs.org/docs)
- **JavaScript MDN**: [developer.mozilla.org](https://developer.mozilla.org/es/docs/Web/JavaScript)

---

¿Tienes problemas? Abre un issue en GitHub o contacta al equipo del CPF FIUNA.

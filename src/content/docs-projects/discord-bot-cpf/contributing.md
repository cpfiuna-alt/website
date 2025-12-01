---
title: "Contributing Guide"
description: "Guía completa para contribuir al CPF Discord Bot"
chapter: "Contributing"
section: "Guía de Contribución"
order: 1
lastUpdate: "2025-11-30"
---

# CPF Discord Bot - Contributing Guide

¡Gracias por tu interés en contribuir al bot de Discord del Club de Programación FIUNA! Esta guía te ayudará a comenzar.

## Tabla de Contenidos

1. [Código de Conducta](#código-de-conducta)
2. [Cómo Contribuir](#cómo-contribuir)
3. [Configuración del Entorno](#configuración-del-entorno)
4. [Estructura del Proyecto](#estructura-del-proyecto)
5. [Desarrollo de Comandos](#desarrollo-de-comandos)
6. [Desarrollo de Eventos](#desarrollo-de-eventos)
7. [Sistema de Logging](#sistema-de-logging)
8. [Estándares de Código](#estándares-de-código)
9. [Testing](#testing)
10. [Pull Request Process](#pull-request-process)
11. [Reportar Bugs](#reportar-bugs)
12. [Sugerir Features](#sugerir-features)

## Código de Conducta

### Nuestro Compromiso

El CPF FIUNA se compromete a proporcionar un ambiente acogedor e inclusivo para todos. Esperamos que todos los colaboradores:

- Usen lenguaje respetuoso e inclusivo
- Sean respetuosos de diferentes puntos de vista
- Acepten críticas constructivas con gracia
- Se enfoquen en lo que es mejor para la comunidad
- Muestren empatía hacia otros miembros

### Comportamiento Inaceptable

- Lenguaje o imágenes sexualizadas
- Comentarios ofensivos, discriminatorios o despectivos
- Acoso público o privado
- Publicar información privada de otros sin permiso
- Cualquier conducta que razonablemente podría considerarse inapropiada

### Reporte de Incidentes

Si presencias o eres víctima de comportamiento inaceptable, por favor contacta a los mantenedores del proyecto.

## Cómo Contribuir

### Tipos de Contribuciones

Aceptamos varios tipos de contribuciones:

1. **Código**
   - Nuevos comandos
   - Nuevos eventos
   - Mejoras de rendimiento
   - Correcciones de bugs

2. **Documentación**
   - Mejorar guías existentes
   - Traducir documentación
   - Agregar ejemplos de código
   - Corregir errores tipográficos

3. **Testing**
   - Escribir tests
   - Reportar bugs
   - Probar nuevas features

4. **Diseño**
   - Mejorar embeds
   - Diseñar mensajes visuales
   - Crear assets (logos, banners)

### Flujo de Trabajo

```
1. Fork del repositorio
   ↓
2. Crear rama de feature
   ↓
3. Hacer commits
   ↓
4. Push a tu fork
   ↓
5. Crear Pull Request
   ↓
6. Code review
   ↓
7. Merge a main
```

## Configuración del Entorno

### 1. Fork y Clone

```bash
# Fork el repositorio en GitHub, luego:
git clone https://github.com/TU_USUARIO/discord-bot.git
cd discord-bot

# Agregar upstream remote
git remote add upstream https://github.com/davidgimenezs/discord-bot.git

# Verificar remotes
git remote -v
```

### 2. Instalar Dependencias

```bash
# Instalar dependencias
npm install

# Crear .env desde plantilla
cp .env.example .env

# Editar .env con tus credenciales de desarrollo
```

### 3. Configurar Bot de Desarrollo

Crea una aplicación de Discord separada para desarrollo:

1. Ve al [Discord Developer Portal](https://discord.com/developers/applications)
2. Crea una nueva aplicación (ej: "CPF Bot Dev")
3. Crea un bot y obtén el token
4. Invita el bot a tu servidor de prueba
5. Configura el token en tu `.env`

### 4. Registrar Comandos

```bash
# Registrar comandos en tu servidor de desarrollo
npm run deploy
```

### 5. Ejecutar en Modo Desarrollo

```bash
# Iniciar con auto-reload
npm run dev
```

## Estructura del Proyecto

```
discord-bot/
├── src/
│   ├── index.js                    # Entry point principal
│   ├── deploy-commands.js          # Script de registro de comandos
│   │
│   ├── commands/                   # 📝 Comandos slash
│   │   ├── ping.js                # Template simple
│   │   ├── commands.js            # Template con embed
│   │   ├── logtest.js             # Template con logging
│   │   └── testgreeting.js        # Template con interacción
│   │
│   ├── events/                     # 🎯 Manejadores de eventos
│   │   ├── ready.js               # Bot ready
│   │   ├── guildMemberAdd.js      # Nuevo miembro
│   │   └── interactionCreate.js   # Manejo de comandos
│   │
│   └── lib/                        # 🔧 Utilidades y helpers
│       └── logger.js              # Sistema de logging
│
├── discord-bot-docs/               # 📚 Documentación
│   ├── index.md
│   ├── getting-started.md
│   ├── deployment.md
│   └── contributing.md
│
├── logs/                           # 📋 Archivos de logs (git-ignored)
├── node_modules/                   # 📦 Dependencias (git-ignored)
│
├── .env                            # 🔒 Variables de entorno (git-ignored)
├── .env.example                    # 📋 Plantilla de .env
├── .gitignore                      # 🚫 Archivos ignorados
├── ecosystem.config.js             # ⚙️ Configuración PM2
├── package.json                    # 📄 Configuración del proyecto
└── README.md                       # 📖 Documentación principal
```

## Desarrollo de Comandos

### Template Básico de Comando

```javascript
// src/commands/ejemplo.js
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    // Definición del comando
    data: new SlashCommandBuilder()
        .setName('ejemplo')
        .setDescription('Descripción breve del comando'),
    
    // Categoría (para organización)
    category: 'utilidad', // utilidad, moderación, diversión, info
    
    // Cooldown en segundos (opcional)
    cooldown: 3,
    
    // Ejecución del comando
    async execute(interaction) {
        // Defer si la operación toma tiempo
        await interaction.deferReply();
        
        try {
            // Lógica del comando
            const resultado = await hacerAlgo();
            
            // Responder con embed
            const embed = new EmbedBuilder()
                .setTitle('Título del Resultado')
                .setDescription(resultado)
                .setColor(0x3C83F6)
                .setTimestamp()
                .setFooter({ text: 'CPF FIUNA' });
            
            await interaction.editReply({ embeds: [embed] });
            
        } catch (error) {
            console.error(`Error en comando ${interaction.commandName}:`, error);
            
            // Responder con error
            await interaction.editReply({
                content: '❌ Ocurrió un error al ejecutar el comando.',
                ephemeral: true
            });
        }
    },
};
```

### Comando con Opciones

```javascript
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('saludar')
        .setDescription('Saluda a alguien')
        .addUserOption(option =>
            option
                .setName('usuario')
                .setDescription('Usuario a saludar')
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName('mensaje')
                .setDescription('Mensaje personalizado')
                .setRequired(false)
        ),
    
    async execute(interaction) {
        const usuario = interaction.options.getUser('usuario');
        const mensaje = interaction.options.getString('mensaje') || '¡Hola!';
        
        await interaction.reply({
            content: `${mensaje} ${usuario}`,
            allowedMentions: { users: [usuario.id] }
        });
    },
};
```

### Comando con Subcomandos

```javascript
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('config')
        .setDescription('Configuración del servidor')
        .addSubcommand(subcommand =>
            subcommand
                .setName('ver')
                .setDescription('Ver configuración actual')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('canal')
                .setDescription('Configurar canal de logs')
                .addChannelOption(option =>
                    option
                        .setName('canal')
                        .setDescription('Canal de logs')
                        .setRequired(true)
                )
        ),
    
    async execute(interaction) {
        const subcommand = interaction.options.getSubcommand();
        
        switch (subcommand) {
            case 'ver':
                await mostrarConfiguracion(interaction);
                break;
            case 'canal':
                await configurarCanal(interaction);
                break;
        }
    },
};

async function mostrarConfiguracion(interaction) {
    // Implementación
}

async function configurarCanal(interaction) {
    // Implementación
}
```

### Comando con Permisos

```javascript
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('limpiar')
        .setDescription('Elimina mensajes')
        .addIntegerOption(option =>
            option
                .setName('cantidad')
                .setDescription('Cantidad de mensajes a eliminar')
                .setRequired(true)
                .setMinValue(1)
                .setMaxValue(100)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
    
    async execute(interaction) {
        // Verificar permisos del bot
        if (!interaction.guild.members.me.permissions.has(PermissionFlagsBits.ManageMessages)) {
            return interaction.reply({
                content: '❌ No tengo permisos para gestionar mensajes.',
                ephemeral: true
            });
        }
        
        const cantidad = interaction.options.getInteger('cantidad');
        
        await interaction.deferReply({ ephemeral: true });
        
        try {
            const mensajes = await interaction.channel.bulkDelete(cantidad, true);
            
            await interaction.editReply({
                content: `✅ Se eliminaron ${mensajes.size} mensajes.`
            });
        } catch (error) {
            console.error('Error al eliminar mensajes:', error);
            await interaction.editReply({
                content: '❌ Error al eliminar mensajes.'
            });
        }
    },
};
```

### Comando con Botones

```javascript
const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('confirmar')
        .setDescription('Solicita confirmación'),
    
    async execute(interaction) {
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('confirmar_si')
                    .setLabel('Sí')
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setCustomId('confirmar_no')
                    .setLabel('No')
                    .setStyle(ButtonStyle.Danger)
            );
        
        await interaction.reply({
            content: '¿Estás seguro?',
            components: [row],
            ephemeral: true
        });
        
        // Collector para botones
        const collector = interaction.channel.createMessageComponentCollector({
            filter: i => i.user.id === interaction.user.id,
            time: 15000
        });
        
        collector.on('collect', async i => {
            if (i.customId === 'confirmar_si') {
                await i.update({ content: '✅ Confirmado', components: [] });
            } else {
                await i.update({ content: '❌ Cancelado', components: [] });
            }
        });
        
        collector.on('end', collected => {
            if (collected.size === 0) {
                interaction.editReply({ content: '⏱️ Tiempo agotado', components: [] });
            }
        });
    },
};
```

## Desarrollo de Eventos

### Template Básico de Evento

```javascript
// src/events/nombreEvento.js
module.exports = {
    // Nombre del evento (ver discord.js docs)
    name: 'nombreEvento',
    
    // Si se ejecuta solo una vez
    once: false,
    
    // Función de ejecución
    execute(...args) {
        // Lógica del evento
        console.log('Evento ejecutado:', args);
    },
};
```

### Ejemplo: Evento de Mensajes

```javascript
// src/events/messageCreate.js
const logger = require('../lib/logger');

module.exports = {
    name: 'messageCreate',
    once: false,
    
    async execute(message) {
        // Ignorar bots
        if (message.author.bot) return;
        
        // Log de mensaje
        logger.info('Nuevo mensaje', {
            author: message.author.tag,
            channel: message.channel.name,
            content: message.content.substring(0, 50)
        });
        
        // Responder a palabras clave
        if (message.content.toLowerCase().includes('hola bot')) {
            await message.reply('¡Hola! 👋');
        }
    },
};
```

### Ejemplo: Evento de Reacciones

```javascript
// src/events/messageReactionAdd.js
module.exports = {
    name: 'messageReactionAdd',
    once: false,
    
    async execute(reaction, user) {
        // Fetch parcial si es necesario
        if (reaction.partial) {
            try {
                await reaction.fetch();
            } catch (error) {
                console.error('Error fetching reaction:', error);
                return;
            }
        }
        
        // Lógica para roles por reacción
        if (reaction.emoji.name === '🎓') {
            const role = reaction.message.guild.roles.cache.find(r => r.name === 'Estudiante');
            if (role) {
                const member = await reaction.message.guild.members.fetch(user.id);
                await member.roles.add(role);
            }
        }
    },
};
```

## Sistema de Logging

### Uso del Logger

```javascript
const logger = require('../lib/logger');

// Niveles de log
logger.info('Información general');
logger.warn('Advertencia');
logger.error('Error', { error: errorObject });
logger.debug('Debug info'); // Solo si LOG_LEVEL=debug
```

### Logger Personalizado

```javascript
// src/lib/logger.js
const fs = require('fs');
const path = require('path');

class Logger {
    constructor() {
        this.logDir = path.join(__dirname, '../../logs');
        this.ensureLogDir();
    }

    ensureLogDir() {
        if (!fs.existsSync(this.logDir)) {
            fs.mkdirSync(this.logDir, { recursive: true });
        }
    }

    formatMessage(level, message, metadata = {}) {
        return JSON.stringify({
            timestamp: new Date().toISOString(),
            level,
            message,
            ...metadata
        }) + '\n';
    }

    log(level, message, metadata = {}) {
        const formatted = this.formatMessage(level, message, metadata);
        
        // Console
        console.log(`[${new Date().toISOString()}] ${level.toUpperCase()}: ${message}`);
        
        // File
        const logFile = path.join(this.logDir, `${level}.log`);
        fs.appendFileSync(logFile, formatted);
    }

    info(message, metadata) {
        this.log('info', message, metadata);
    }

    warn(message, metadata) {
        this.log('warn', message, metadata);
    }

    error(message, metadata) {
        this.log('error', message, metadata);
    }

    debug(message, metadata) {
        if (process.env.LOG_LEVEL === 'debug') {
            this.log('debug', message, metadata);
        }
    }
}

module.exports = new Logger();
```

## Estándares de Código

### Convenciones de Naming

```javascript
// Variables y funciones: camelCase
const nombreVariable = 'valor';
function nombreFuncion() {}

// Clases: PascalCase
class MiClase {}

// Constantes: UPPER_SNAKE_CASE
const API_KEY = 'key';

// Archivos: kebab-case
// mi-archivo.js

// Comandos: lowercase
// /micomando
```

### Estructura de Código

```javascript
// 1. Imports
const { SlashCommandBuilder } = require('discord.js');
const logger = require('../lib/logger');

// 2. Constantes
const MAX_INTENTOS = 3;
const TIMEOUT = 5000;

// 3. Funciones auxiliares
async function funcionAuxiliar() {
    // ...
}

// 4. Export principal
module.exports = {
    data: new SlashCommandBuilder()...,
    async execute(interaction) {
        // ...
    }
};
```

### Comentarios

```javascript
/**
 * Descripción de la función
 * @param {string} param1 - Descripción del parámetro
 * @param {number} param2 - Descripción del parámetro
 * @returns {Promise<void>}
 */
async function miFuncion(param1, param2) {
    // Comentario de línea para lógica compleja
    const resultado = await operacion();
    
    /* 
     * Comentario de bloque para
     * explicaciones más largas
     */
    return resultado;
}
```

### Manejo de Errores

```javascript
// Siempre usar try-catch en operaciones async
try {
    await operacionAsincrona();
} catch (error) {
    console.error('Error descriptivo:', error);
    logger.error('Error descriptivo', { error });
    
    // Notificar al usuario
    await interaction.reply({
        content: '❌ Mensaje de error amigable',
        ephemeral: true
    });
}
```

### Formateo

Usamos 4 espacios para indentación:

```javascript
// ✅ Correcto
if (condicion) {
    hacerAlgo();
    hacerOtraCosa();
}

// ❌ Incorrecto
if (condicion) {
  hacerAlgo();
  hacerOtraCosa();
}
```

## Testing

### Testing Manual

Antes de crear un PR, prueba:

1. **Comando básico**:
   ```
   /tu-comando
   ```

2. **Con opciones**:
   ```
   /tu-comando opcion:valor
   ```

3. **Casos extremos**:
   - Valores mínimos/máximos
   - Valores inválidos
   - Sin permisos

4. **Error handling**:
   - Simula errores
   - Verifica mensajes de error

### Checklist de Testing

- [ ] Comando aparece en la lista de Discord
- [ ] Descripción clara y sin errores
- [ ] Responde correctamente
- [ ] Maneja errores sin crashear
- [ ] Respeta permisos
- [ ] Logs correctos
- [ ] No tiene memory leaks
- [ ] Funciona en DM (si aplica)
- [ ] Funciona en servidor
- [ ] Respuestas son ephemeral donde corresponde

## Pull Request Process

### 1. Crear Rama

```bash
# Actualizar main
git checkout main
git pull upstream main

# Crear rama de feature
git checkout -b feature/nombre-descriptivo

# O para bug fixes
git checkout -b fix/nombre-del-bug
```

### 2. Hacer Commits

```bash
# Commits descriptivos y atómicos
git add .
git commit -m "feat: agregar comando de información del club"

# Más commits si es necesario
git commit -m "docs: actualizar README con nuevo comando"
```

### Convenciones de Commits

Usamos [Conventional Commits](https://www.conventionalcommits.org/):

```
tipo(scope): descripción breve

[cuerpo opcional]

[footer opcional]
```

**Tipos**:
- `feat`: Nueva feature
- `fix`: Corrección de bug
- `docs`: Cambios en documentación
- `style`: Formateo de código
- `refactor`: Refactorización
- `test`: Agregar/modificar tests
- `chore`: Tareas de mantenimiento

**Ejemplos**:
```bash
feat(commands): agregar comando de estadísticas
fix(events): corregir error en bienvenida
docs(readme): actualizar guía de instalación
refactor(logger): mejorar sistema de logging
```

### 3. Push y PR

```bash
# Push a tu fork
git push origin feature/nombre-descriptivo
```

Luego en GitHub:
1. Ve a tu fork
2. Clic en "Compare & pull request"
3. Completa el template de PR
4. Envía el PR

### Template de Pull Request

```markdown
## Descripción
Breve descripción de los cambios realizados.

## Tipo de Cambio
- [ ] Bug fix (cambio que corrige un issue)
- [ ] Nueva feature (cambio que agrega funcionalidad)
- [ ] Breaking change (cambio que rompe compatibilidad)
- [ ] Documentación

## ¿Cómo se ha probado?
Describe las pruebas realizadas.

## Checklist
- [ ] Mi código sigue los estándares del proyecto
- [ ] He realizado auto-review
- [ ] He comentado código complejo
- [ ] He actualizado la documentación
- [ ] Mis cambios no generan nuevas advertencias
- [ ] He probado el comando/feature
- [ ] Funciona en desarrollo y producción
```

### 4. Code Review

Los mantenedores revisarán tu PR:

- **Feedback constructivo**: Responde a comentarios
- **Cambios solicitados**: Realiza los ajustes necesarios
- **Aprobación**: Una vez aprobado, se hará merge

## Reportar Bugs

### Antes de Reportar

1. Busca en issues existentes
2. Verifica que sea reproducible
3. Prueba en la última versión

### Template de Bug Report

```markdown
**Descripción del Bug**
Descripción clara y concisa del problema.

**Reproducir**
Pasos para reproducir:
1. Ejecutar comando '...'
2. Con opciones '...'
3. Ver error

**Comportamiento Esperado**
Qué esperabas que sucediera.

**Screenshots**
Si aplica, agrega capturas de pantalla.

**Entorno**
- OS: [Windows/Linux/Mac]
- Node.js: [versión]
- Discord.js: [versión]
- Bot version: [versión]

**Logs**
```
Pega logs relevantes aquí
```

**Contexto Adicional**
Cualquier otra información relevante.
```

## Sugerir Features

### Template de Feature Request

```markdown
**¿Tu feature está relacionada a un problema?**
Descripción del problema/necesidad.

**Describe la solución que deseas**
Descripción clara de lo que quieres que suceda.

**Describe alternativas consideradas**
Otras soluciones o features que has considerado.

**Mockups/Ejemplos**
Si aplica, agrega ejemplos visuales.

**Contexto Adicional**
Cualquier otra información relevante.
```

## Recursos para Colaboradores

### Documentación

- [Discord.js Guide](https://discordjs.guide/)
- [Discord.js Docs](https://discord.js.org/docs)
- [Discord API Docs](https://discord.com/developers/docs)
- [Node.js Docs](https://nodejs.org/docs)

### Herramientas Útiles

- **VS Code Extensions**:
  - ESLint
  - Discord.js Snippets
  - GitLens
  - Better Comments

- **Discord Dev Tools**:
  - [Discord Embed Visualizer](https://cog-creators.github.io/discord-embed-sandbox/)
  - [Discord Permissions Calculator](https://discordapi.com/permissions.html)

### Comunidad

- **Discord del CPF**: Únete para discusiones en tiempo real
- **GitHub Discussions**: Para preguntas y discusiones
- **Issues**: Para bugs y feature requests

## Reconocimiento

Los contribuidores serán reconocidos en:
- README.md
- Sección de créditos en el bot
- Rol especial en Discord del CPF

## Preguntas Frecuentes

### ¿Puedo trabajar en múltiples features a la vez?

Sí, pero crea ramas separadas para cada feature:
```bash
git checkout -b feature/feature-1
# Trabajar en feature 1
git checkout main
git checkout -b feature/feature-2
# Trabajar en feature 2
```

### ¿Cómo actualizo mi fork?

```bash
# Fetch cambios de upstream
git fetch upstream

# Merge cambios a tu main local
git checkout main
git merge upstream/main

# Push a tu fork
git push origin main
```

### ¿Puedo agregar dependencias?

Sí, pero:
1. Justifica por qué es necesaria
2. Verifica que esté bien mantenida
3. Menciona en el PR

```bash
npm install nueva-dependencia
# Incluir package.json en el commit
```

### ¿Qué hago si mi PR tiene conflictos?

```bash
# Actualizar tu rama
git checkout main
git pull upstream main
git checkout tu-rama
git rebase main

# Resolver conflictos manualmente
# Luego:
git add .
git rebase --continue
git push origin tu-rama --force
```

---

¡Gracias por contribuir al CPF Discord Bot! 🚀

Si tienes preguntas, no dudes en abrir un issue o contactar a los mantenedores.

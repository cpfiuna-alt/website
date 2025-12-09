---
title: "Contribuir"
description: "Como contribuir al desarrollo del bot"
order: 5
---

# Contribuir al Proyecto

Guia para contribuir al desarrollo del CPF Discord Bot.

---

## 1. Requisitos Previos

- Node.js 18+ LTS
- Git
- Cuenta de Discord
- Bot de prueba propio (opcional pero recomendado)

---

## 2. Configurar Entorno de Desarrollo

### 2.1 Hacer Fork del Repositorio

Ir a [github.com/cpfiuna/discord-bot](https://github.com/cpfiuna/discord-bot) y hacer click en "Fork".

### 2.2 Clonar tu Fork

```bash
git clone https://github.com/TU_USUARIO/discord-bot.git
cd discord-bot
```

### 2.3 Instalar Dependencias

```bash
npm install
```

### 2.4 Configurar Variables de Entorno

Copiar el archivo de ejemplo y editar con tus credenciales:

```bash
cp .env.example .env
```

Editar `.env`:

```env
DISCORD_TOKEN=tu_token_de_desarrollo
DISCORD_CLIENT_ID=tu_client_id
DISCORD_GUILD_ID=tu_servidor_de_pruebas
```

### 2.5 Registrar Comandos de Desarrollo

```bash
npm run deploy
```

### 2.6 Iniciar en Modo Desarrollo

```bash
npm run dev
```

El bot se reiniciara automaticamente al guardar cambios gracias a nodemon.

---

## 3. Estructura del Proyecto

```
discord-bot/
    src/
        index.js              # Entry point principal
        deploy-commands.js    # Script para registrar comandos
        commands/             # Todos los comandos slash
            help.js
            ping.js
            ...
        events/               # Manejadores de eventos
            ready.js
            interactionCreate.js
            guildMemberAdd.js
            ...
        lib/                  # Utilidades compartidas
            logger.js
    assets/
        uploads/              # Archivos para /sendfile
    package.json
    .env
```

---

## 4. Agregar un Nuevo Comando

### 4.1 Crear el Archivo

Crear un nuevo archivo en `src/commands/`:

```javascript
// src/commands/micomando.js
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('micomando')
        .setDescription('Descripcion de mi comando'),

    async execute(interaction) {
        await interaction.reply('Respuesta del comando');
    }
};
```

### 4.2 Registrar el Comando

Ejecutar para registrar el nuevo comando:

```bash
npm run deploy
```

### 4.3 Probar

Reiniciar el bot y probar el comando en Discord.

---

## 5. Agregar un Nuevo Evento

### 5.1 Crear el Archivo

Crear un nuevo archivo en `src/events/`:

```javascript
// src/events/miEvento.js
const { Events } = require('discord.js');

module.exports = {
    name: Events.MessageCreate,
    once: false,  // true si solo debe ejecutarse una vez

    async execute(message) {
        // Logica del evento
        console.log('Nuevo mensaje:', message.content);
    }
};
```

### 5.2 Reiniciar el Bot

Los eventos se cargan automaticamente al iniciar.

---

## 6. Buenas Practicas

### 6.1 Codigo

- Usar `async/await` en lugar de callbacks
- Manejar errores con `try/catch`
- Documentar funciones complejas con comentarios
- Seguir el estilo existente del proyecto

### 6.2 Commits

Usar mensajes descriptivos:

```bash
# Bien
git commit -m "feat: agregar comando /encuesta"
git commit -m "fix: corregir validacion de fechas en /recordar"
git commit -m "docs: actualizar README con nuevos comandos"

# Mal
git commit -m "cambios"
git commit -m "fix"
```

### 6.3 Pull Requests

1. Crear una rama para tu feature:
    ```bash
    git checkout -b feature/mi-nueva-funcionalidad
    ```

2. Hacer commits pequenos y descriptivos

3. Asegurarse de que el bot inicia sin errores

4. Crear el Pull Request con descripcion clara

---


## 7. Crear un Bot de Desarrollo

Recomendamos crear tu propio bot para desarrollo:

1. Ir a [Discord Developer Portal](https://discord.com/developers/applications)
2. Click en "New Application"
3. Ir a "Bot" y click en "Add Bot"
4. Copiar el token (usarlo en `.env`)
5. Ir a "OAuth2" > "URL Generator"
6. Seleccionar scopes: `bot`, `applications.commands`
7. Seleccionar permisos necesarios
8. Usar la URL generada para invitar el bot a tu servidor de pruebas

---


## 8. Preguntas Frecuentes

### 8.1 Los comandos no aparecen

- Verificar que ejecutaste `npm run deploy`
- Verificar que `DISCORD_CLIENT_ID` es correcto
- Los comandos globales pueden tardar hasta 1 hora
- Para desarrollo, usar `DISCORD_GUILD_ID` (comandos instantaneos)

### 8.2 El bot no responde

- Verificar el token en `.env`
- Verificar que el bot tiene permisos en el servidor
- Ver logs de la consola para errores

### 8.3 Error al registrar comandos

- Verificar que el bot tiene el scope `applications.commands`
- Verificar permisos de la aplicacion en el servidor

---

## 9. Contacto

Para dudas o sugerencias:

- Abrir un issue en GitHub
- Contactar en el servidor de Discord del CPF
- Enviar email a cpfiuna@gmail.com
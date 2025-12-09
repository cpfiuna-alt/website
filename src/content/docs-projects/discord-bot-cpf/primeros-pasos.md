---
title: "Primeros Pasos"
description: "Configuracion inicial del bot de Discord"
order: 1
---

# Primeros Pasos

Guia para configurar y ejecutar el CPF Discord Bot en tu entorno local.

---

## 1. Requisitos
- Node.js 18 o superior (LTS recomendado)
- npm (incluido con Node.js)
- Cuenta de Discord
- Permisos de administrador en un servidor de Discord

---


## 2. Crear una Aplicacion de Discord

### 2.1 Acceder al Portal de Desarrolladores

Ir a [Discord Developer Portal](https://discord.com/developers/applications) e iniciar sesion.

### 2.2 Crear Nueva Aplicacion

1. Click en "New Application"
2. Ingresar nombre (ej: "CPF Bot Dev")
3. Aceptar terminos de servicio
4. Click en "Create"

### 2.3 Configurar el Bot

1. Ir a la seccion "Bot" en el menu lateral
2. Click en "Add Bot"
3. Confirmar la creacion

### 2.4 Obtener el Token

1. En la seccion "Bot", click en "Reset Token"
2. Copiar el token generado
3. Guardarlo en un lugar seguro (no compartir)

### 2.5 Obtener el Client ID

1. Ir a la seccion "OAuth2" > "General"
2. Copiar el "Client ID"

---


## 3. Instalacion

### 3.1 Clonar el Repositorio

```bash
git clone https://github.com/cpfiuna/discord-bot.git
cd discord-bot
```


### 3.2 Instalar Dependencias

```bash
npm install
```

---


## 4. Configuracion

### 4.1 Variables de Entorno

Crear archivo `.env` en la raiz del proyecto:

```env
# Token del bot (obligatorio)
DISCORD_TOKEN=tu_token_aqui

# Client ID de la aplicacion (obligatorio)
DISCORD_CLIENT_ID=tu_client_id

# ID del servidor para desarrollo (opcional)
# Si se configura, los comandos se registran solo en este servidor
DISCORD_GUILD_ID=tu_guild_id

# Canal de logs (opcional)
LOG_CHANNEL_ID=id_del_canal

# Canal de bienvenidas (opcional)
GREETING_CHANNEL_ID=id_del_canal

# Estado del bot (opcional)
BOT_PRESENCE="Usa /help para ver comandos"
```

---


## 5. Invitar el Bot al Servidor

### 5.1 Generar URL de Invitacion

1. Ir a Discord Developer Portal
2. Seleccionar tu aplicacion
3. Ir a "OAuth2" > "URL Generator"
4. Seleccionar scopes:
    - `bot`
    - `applications.commands`
5. Seleccionar permisos del bot:
    - Send Messages
    - Embed Links
    - Read Message History
    - Add Reactions
    - Manage Channels (para salas temporales)
    - View Channels
6. Copiar la URL generada
7. Abrir la URL en el navegador
8. Seleccionar el servidor y autorizar

---


## 6. Ejecutar el Bot

### 6.1 Registrar Comandos Slash

Antes de iniciar el bot por primera vez, registrar los comandos:

```bash
npm run deploy
```

Este comando registra todos los comandos slash en Discord. Si configuraste `DISCORD_GUILD_ID`, los comandos se registran solo en ese servidor (instantaneo). Sin esa variable, se registran globalmente (puede tardar hasta 1 hora).


### 6.2 Modo Desarrollo

```bash
npm run dev
```

El bot se reinicia automaticamente cuando guardas cambios en los archivos.


### 6.3 Modo Produccion

```bash
npm start
```

---


## 7. Verificar Funcionamiento

1. El bot deberia aparecer en linea en el servidor
2. Escribir `/ping` en cualquier canal
3. El bot deberia responder confirmando que esta activo
4. Escribir `/help` para ver todos los comandos disponibles

---


## 8. Estructura del Proyecto

```text
discord-bot/
    src/
        index.js              # Archivo principal
        deploy-commands.js    # Registro de comandos
        commands/             # Comandos slash (21 archivos)
        events/               # Manejadores de eventos
        lib/                  # Utilidades
    assets/
        uploads/              # Archivos para /sendfile
    package.json
    .env                      # Variables de entorno
```

---


## 9. Problemas Comunes

### 9.1 El bot no aparece en linea

- Verificar que el token es correcto
- Verificar que el bot fue invitado al servidor
- Revisar la consola por errores


### 9.2 Los comandos no aparecen

- Ejecutar `npm run deploy`
- Esperar hasta 1 hora si es registro global
- Verificar que el bot tiene el scope `applications.commands`


### 9.3 Error de permisos

- Verificar que el bot tiene los permisos necesarios
- El rol del bot debe estar por encima de los roles que intenta modificar

---


## 10. Siguiente Paso

Una vez que el bot este funcionando, podes explorar la [Referencia de Comandos](/docs/discord-bot-cpf/general/lista-de-comandos) para ver todas las funcionalidades disponibles.
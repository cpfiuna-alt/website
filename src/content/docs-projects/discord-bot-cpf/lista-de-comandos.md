---
title: "Referencia de Comandos"
description: "Documentacion detallada de todos los comandos slash disponibles"
order: 4
---

# Referencia de Comandos

Documentacion completa de los 21 comandos disponibles del bot.

---

## 1. Comandos de Informacion

### 1.1 /info

Muestra informacion sobre el Club de Programacion FIUNA.

```
/info
```

Presenta un embed con descripcion del club, mision y vision.

---


### 1.2 /links

Muestra todos los enlaces y redes sociales del club.

```
Uso: /links
Permisos: Ninguno
```

Incluye:
- Sitio web oficial
- GitHub
- Redes sociales
- Formularios de inscripcion

---


### 1.3 /help

Muestra ayuda detallada sobre los comandos.

```
Uso: /help [comando]
Permisos: Ninguno
```

**Parametros opcionales:**
- `comando`: Nombre del comando para ver detalles especificos

Sin parametros muestra el menu principal. Con parametro muestra detalles del comando especificado.

---


### 1.4 /adminhelp

Lista de comandos de administracion disponibles.

```
Uso: /adminhelp
Permisos: Administrador
```

Muestra un embed con todos los comandos administrativos y sus descripciones.

---


## 2. Comandos de Utilidades

### 2.1 /ping

Verifica que el bot este activo y funcionando.

```
Uso: /ping
Permisos: Ninguno
```

Responde con un mensaje simple confirmando que el bot esta en linea.

---


### 2.2 /code

Abre un modal para compartir codigo formateado.

```
Uso: /code
Permisos: Ninguno
Limite: 4000 caracteres
```

**Lenguajes soportados:**
- JavaScript, TypeScript, Python
- C, C++, C#, Java
- HTML, CSS
- Bash, SQL

El modal tiene dos campos:
1. Lenguaje de programacion
2. Codigo a compartir

---


### 2.3 /encuesta

Crea una encuesta interactiva con reacciones.

```
Uso: /encuesta <pregunta> <opcion1> <opcion2> [opcion3] [opcion4]
Permisos: Ninguno
```

**Parametros obligatorios:**
- `pregunta`: La pregunta de la encuesta
- `opcion1`: Primera opcion
- `opcion2`: Segunda opcion

**Parametros opcionales:**
- `opcion3`: Tercera opcion
- `opcion4`: Cuarta opcion

Las opciones se representan con reacciones numericas del 1 al 4.

---


### 2.4 /recordar

Sistema de recordatorios personales o globales.

```
Uso: /recordar <tipo> <mensaje> <tiempo>
Permisos: Ninguno
Limite: 10 recordatorios por usuario
```

**Parametros:**
- `tipo`: `personal` o `global`
- `mensaje`: Texto del recordatorio
- `tiempo`: Formato HH:MM o DD/MM/YYYY HH:MM

**Ejemplos:**
```
/recordar personal "Revisar codigo" 14:30
/recordar global "Reunion del club" 25/12/2024 18:00
```

Los recordatorios se envian por DM (personales) o al canal actual (globales).

---


## 3. Comandos de Salas de Voz

### 3.1 /sala crear

Crea una sala de voz temporal.

```
Uso: /sala crear <nombre>
Permisos: Ninguno
```

**Caracteristicas:**
- La sala se elimina automaticamente tras 1 minuto vacia
- El creador puede gestionar la sala
- Solo funciona si existe una categoria de salas configurada

---


### 3.2 /sala listar

Muestra todas las salas de voz disponibles.

```
Uso: /sala listar
Permisos: Ninguno
```

Muestra un embed con:
- Nombre de cada sala
- Cantidad de miembros
- Estado (publica/privada)

---


### 3.3 /sala unirse

Muestra informacion sobre como unirse a una sala.

```
Uso: /sala unirse <sala>
Permisos: Ninguno
```

Proporciona detalles sobre la sala seleccionada.

---


## 4. Comandos de Administracion

### 4.1 /setpresence

Cambia el estado visible del bot.

```
Uso: /setpresence <mensaje>
Permisos: Administrador
```

Actualiza el estado "Jugando a..." del bot con el mensaje especificado.

---


### 4.2 /setgreeting

Configura el mensaje de bienvenida para nuevos miembros.

```
Uso: /setgreeting <mensaje>
Permisos: Administrador
```

**Variables disponibles:**
- `{user}`: Mencion del usuario
- `{username}`: Nombre del usuario
- `{server}`: Nombre del servidor
- `{memberCount}`: Cantidad de miembros

**Ejemplo:**
```
/setgreeting "Bienvenido {user} a {server}! Somos {memberCount} miembros."
```

---


### 4.3 /testgreeting

Prueba el mensaje de bienvenida configurado.

```
Uso: /testgreeting
Permisos: Administrador
```

Envia el mensaje de bienvenida como si fueras un nuevo miembro.

---


### 4.4 /setlogchannel

Configura el canal para recibir logs del bot.

```
Uso: /setlogchannel <canal>
Permisos: Administrador
```

Todos los logs del bot se enviaran al canal especificado.

---


### 4.5 /testlog

Envia un mensaje de prueba al canal de logs.

```
Uso: /testlog
Permisos: Administrador
```

Util para verificar que el canal de logs este configurado correctamente.

---


### 4.6 /botstats

Muestra estadisticas del bot.

```
Uso: /botstats
Permisos: Ninguno
```

Incluye:
- Tiempo activo (uptime)
- Uso de memoria RAM
- Uso de CPU
- Cantidad de servidores
- Cantidad de comandos registrados

---


### 4.7 /serverinfo

Muestra informacion detallada del servidor.

```
Uso: /serverinfo
Permisos: Ninguno
```

Incluye:
- Nombre y descripcion
- Cantidad de miembros
- Cantidad de canales y roles
- Fecha de creacion
- Icono del servidor

---


### 4.8 /say

Envia un mensaje formateado a traves del bot.

```
Uso: /say <mensaje>
Permisos: Administrador
```

El bot envia el mensaje en el canal actual y elimina el comando original.

---


### 4.9 /sendfile

Envia un archivo previamente subido.

```
Uso: /sendfile <archivo>
Permisos: Administrador
```

Permite enviar archivos almacenados en `assets/uploads/`.

---


### 4.10 /listar

Lista los archivos disponibles para enviar.

```
Uso: /listar
Permisos: Administrador
```

Muestra todos los archivos en la carpeta `assets/uploads/`.

---


### 4.11 /emojis

Muestra todos los emojis del servidor.

```
Uso: /emojis
Permisos: Ninguno
```

Lista emojis personalizados con sus IDs para uso en mensajes.

---


### 4.12 /shutdown

Apaga el bot de forma segura.

```
Uso: /shutdown
Permisos: Administrador
```

Cierra todas las conexiones antes de apagar. Util cuando se usa PM2 para reiniciar.
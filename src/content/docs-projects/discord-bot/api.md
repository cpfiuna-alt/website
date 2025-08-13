---
title: "API y Comandos"
description: "Documentación completa de comandos y API del bot de Discord"
chapter: "Uso"
section: "Comandos y API"
order: 1
---

# API y Comandos del Discord Bot

## Comandos Disponibles

### Comandos Generales

#### `/help`
Muestra la lista completa de comandos disponibles.

**Uso:**
```
/help [comando]
```

**Parámetros:**
- `comando` (opcional): Comando específico del que quieres información detallada

**Ejemplo:**
```
/help moderation
```

#### `/info`
Muestra información sobre el bot y el servidor.

**Uso:**
```
/info [tipo]
```

**Parámetros:**
- `tipo` (opcional): `bot`, `server`, `user`

#### `/ping`
Verifica la latencia del bot.

**Uso:**
```
/ping
```

### Comandos de Eventos

#### `/event create`
Crea un nuevo evento para el club.

**Uso:**
```
/event create <nombre> <fecha> <descripción> [max_participantes]
```

**Parámetros:**
- `nombre`: Nombre del evento
- `fecha`: Fecha y hora del evento (formato: DD/MM/YYYY HH:MM)
- `descripción`: Descripción detallada del evento
- `max_participantes` (opcional): Número máximo de participantes

**Permisos requeridos:** Moderador

**Ejemplo:**
```
/event create "Hackathon 2025" "15/06/2025 09:00" "Competencia de programación de 24 horas" 50
```

#### `/event list`
Lista todos los eventos próximos.

**Uso:**
```
/event list [estado]
```

**Parámetros:**
- `estado` (opcional): `upcoming`, `active`, `completed`

#### `/event join`
Te une a un evento existente.

**Uso:**
```
/event join <evento_id>
```

#### `/event leave`
Te retira de un evento.

**Uso:**
```
/event leave <evento_id>
```

### Comandos de Moderación

#### `/warn`
Advierte a un usuario.

**Uso:**
```
/warn <usuario> <razón>
```

**Parámetros:**
- `usuario`: Usuario a advertir (@mention o ID)
- `razón`: Razón de la advertencia

**Permisos requeridos:** Moderador

#### `/kick`
Expulsa a un usuario del servidor.

**Uso:**
```
/kick <usuario> [razón]
```

**Permisos requeridos:** Moderador

#### `/ban`
Banea a un usuario del servidor.

**Uso:**
```
/ban <usuario> [razón] [días]
```

**Parámetros:**
- `días` (opcional): Días de mensajes a eliminar (0-7)

**Permisos requeridos:** Administrador

#### `/timeout`
Pone en timeout a un usuario.

**Uso:**
```
/timeout <usuario> <duración> [razón]
```

**Parámetros:**
- `duración`: Duración en minutos, horas o días (ej: 30m, 2h, 1d)

#### `/warnings`
Muestra las advertencias de un usuario.

**Uso:**
```
/warnings <usuario>
```

### Comandos de Utilidades

#### `/weather`
Muestra el clima actual en Asunción.

**Uso:**
```
/weather [ciudad]
```

#### `/github`
Muestra información de repositorios del club.

**Uso:**
```
/github [repositorio]
```

**Parámetros:**
- `repositorio` (opcional): Nombre específico del repositorio

#### `/poll`
Crea una encuesta rápida.

**Uso:**
```
/poll <pregunta> <opción1> <opción2> [opción3] [opción4]
```

#### `/remind`
Programa un recordatorio.

**Uso:**
```
/remind <tiempo> <mensaje>
```

**Parámetros:**
- `tiempo`: Tiempo hasta el recordatorio (ej: 30m, 2h, 1d)

### Comandos de Programación

#### `/code`
Ejecuta código en diferentes lenguajes.

**Uso:**
```
/code <lenguaje> <código>
```

**Lenguajes soportados:**
- `python`
- `javascript`
- `java`
- `cpp`
- `c`

**Ejemplo:**
```
/code python print("Hola, CPF!")
```

#### `/docs`
Busca documentación de tecnologías.

**Uso:**
```
/docs <tecnología> [término]
```

**Tecnologías soportadas:**
- `react`
- `nodejs`
- `python`
- `java`
- `cpp`

## API REST

### Endpoints Disponibles

#### GET `/api/bot/stats`
Obtiene estadísticas del bot.

**Respuesta:**
```json
{
  "uptime": "2d 14h 32m",
  "guilds": 1,
  "users": 127,
  "commands_executed": 1543,
  "memory_usage": "245MB"
}
```

#### GET `/api/events`
Lista todos los eventos.

**Query Parameters:**
- `status`: Filtrar por estado (`upcoming`, `active`, `completed`)
- `limit`: Límite de resultados (default: 10)
- `offset`: Offset para paginación (default: 0)

**Respuesta:**
```json
{
  "events": [
    {
      "id": "event_123",
      "name": "Hackathon 2025",
      "description": "Competencia de programación",
      "date": "2025-06-15T09:00:00Z",
      "participants": 23,
      "max_participants": 50,
      "status": "upcoming"
    }
  ],
  "total": 5,
  "has_more": false
}
```

#### POST `/api/events`
Crea un nuevo evento.

**Headers:**
```
Authorization: Bearer <bot_token>
Content-Type: application/json
```

**Body:**
```json
{
  "name": "Nuevo Evento",
  "description": "Descripción del evento",
  "date": "2025-07-01T10:00:00Z",
  "max_participants": 30
}
```

#### GET `/api/users/:userId`
Obtiene información de un usuario.

**Respuesta:**
```json
{
  "id": "123456789",
  "username": "usuario#1234",
  "level": 5,
  "experience": 1250,
  "warnings": 0,
  "join_date": "2024-01-15T12:00:00Z"
}
```

### Webhooks

#### GitHub Integration

**Endpoint:** `/webhooks/github`
**Method:** POST

Recibe notificaciones de GitHub cuando hay:
- Nuevos commits
- Pull requests
- Releases
- Issues

#### Calendar Sync

**Endpoint:** `/webhooks/calendar`
**Method:** POST

Sincroniza eventos del calendario externo con el bot.

## Rate Limiting

### Límites por Comando

- **Comandos generales**: 5 por minuto por usuario  
- **Comandos de moderación**: Sin límite para moderadores
- **Comandos de utilidades**: 3 por minuto por usuario
- **Ejecución de código**: 2 por minuto por usuario

### Límites por API

- **GET requests**: 100 por hora por IP
- **POST requests**: 50 por hora por IP
- **Webhooks**: 1000 por hora

## Autenticación

### Bot Token

Para usar la API REST, necesitas incluir el token del bot:

```javascript
const headers = {
  'Authorization': `Bearer ${BOT_TOKEN}`,
  'Content-Type': 'application/json'
};
```

### Permisos de Discord

El bot requiere los siguientes permisos:

- **Send Messages**: Enviar mensajes
- **Embed Links**: Enviar embeds
- **Use Slash Commands**: Usar comandos slash
- **Manage Messages**: Gestionar mensajes (moderación)
- **Kick Members**: Expulsar miembros
- **Ban Members**: Banear miembros
- **Moderate Members**: Timeout de miembros

## SDKs y Wrappers

### JavaScript/Node.js

```javascript
const CPFBot = require('cpf-discord-bot-sdk');

const bot = new CPFBot({
  token: 'your_bot_token',
  baseURL: 'https://api.cpf-bot.com'
});

// Crear evento
const event = await bot.events.create({
  name: 'Nuevo Evento',
  date: '2025-07-01T10:00:00Z',
  description: 'Descripción del evento'
});
```

### Python

```python
from cpf_bot import CPFBot

bot = CPFBot(token='your_bot_token')

# Obtener estadísticas
stats = bot.get_stats()
print(f"Uptime: {stats['uptime']}")
```

## Ejemplos de Uso

### Crear un Evento Automáticamente

```javascript
// Usando la API REST
const response = await fetch('/api/events', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Workshop React',
    description: 'Introducción a React para principiantes',
    date: '2025-07-15T18:00:00Z',
    max_participants: 25
  })
});

const event = await response.json();
console.log('Evento creado:', event.id);
```

### Monitorear Actividad del Bot

```javascript
// Obtener estadísticas cada 5 minutos
setInterval(async () => {
  const stats = await fetch('/api/bot/stats');
  const data = await stats.json();
  
  console.log(`Bot activo por: ${data.uptime}`);
  console.log(`Comandos ejecutados: ${data.commands_executed}`);
}, 5 * 60 * 1000);
```

## Solución de Problemas

### Errores Comunes

#### Error 401: Unauthorized
- Verificar que el token del bot sea correcto
- Asegurar que el bot tenga los permisos necesarios

#### Error 429: Rate Limited
- Reducir la frecuencia de requests
- Implementar retry con backoff exponencial

#### Error 500: Internal Server Error
- Verificar logs del bot
- Contactar al equipo de desarrollo

### Debugging

#### Habilitar Logs Detallados

```env
LOG_LEVEL=debug
DEBUG_COMMANDS=true
```

#### Verificar Estado del Bot

```bash
# Endpoint de health check
curl https://api.cpf-bot.com/health
```

## Contribuir

### Añadir Nuevos Comandos

1. Crear archivo en `/commands/`
2. Implementar la interfaz `Command`
3. Registrar el comando en `commandHandler.js`
4. Añadir tests en `/tests/commands/`
5. Actualizar documentación

### Reportar Bugs

- Usar el issue tracker en GitHub
- Incluir logs relevantes
- Describir pasos para reproducir

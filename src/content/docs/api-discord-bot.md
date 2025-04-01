
---
title: "API del Bot de Discord"
description: "Documentación técnica del API del Bot de Discord del Club"
category: "APIs"
order: 1
author: "Equipo CPF"
updatedAt: "15 de Mayo de 2024"
readTime: "10 min"
githubUrl: "https://github.com/cpfiuna/discord-bot"
resources:
  - title: "Discord.js Documentation"
    url: "https://discord.js.org/"
  - title: "Discord Developer Portal"
    url: "https://discord.com/developers/docs"
  - title: "API Explorer"
    url: "https://cpf.fiuna.edu.py/api-explorer"
---

# API del Bot de Discord

Esta documentación técnica describe el API del Bot de Discord desarrollado por el Club de Programación FIUNA. El bot proporciona diversas funcionalidades para la gestión de la comunidad, incluyendo anuncios automáticos, gestión de eventos, seguimiento de problemas resueltos y más.

## Visión general

El Bot de Discord del CPF está construido utilizando:

- **Discord.js**: Biblioteca para interactuar con la API de Discord
- **Node.js**: Entorno de ejecución de JavaScript
- **MongoDB**: Base de datos para almacenar información de usuarios y configuraciones
- **Express**: Framework web para el panel de administración

## Autenticación

Para interactuar con el API del bot, necesitarás un token de autenticación. Este token se puede obtener a través del panel de administración.

```javascript
// Ejemplo de autenticación
const response = await fetch('https://api.cpfbot.fiuna.edu.py/endpoint', {
  headers: {
    'Authorization': 'Bearer YOUR_API_TOKEN',
    'Content-Type': 'application/json'
  }
});
```

## API Reference

### Gestión de Usuarios

#### Obtener información de un usuario

```
GET /api/users/:discordId
```

Retorna información detallada sobre un usuario específico.

**Parámetros:**
- `discordId`: ID de Discord del usuario

**Respuesta:**
```json
{
  "discordId": "123456789012345678",
  "username": "Usuario#1234",
  "joinedAt": "2023-01-15T14:30:00Z",
  "roles": ["miembro", "competidor"],
  "problemsSolved": 42,
  "lastActive": "2023-04-10T18:22:30Z"
}
```

#### Listar todos los usuarios

```
GET /api/users
```

Retorna una lista de todos los usuarios registrados.

**Parámetros de consulta:**
- `limit`: Número máximo de usuarios a retornar (por defecto: 50)
- `offset`: Número de usuarios a saltar (para paginación, por defecto: 0)
- `role`: Filtrar por rol (opcional)

**Respuesta:**
```json
{
  "total": 120,
  "limit": 50,
  "offset": 0,
  "users": [
    {
      "discordId": "123456789012345678",
      "username": "Usuario#1234",
      "roles": ["miembro"]
    },
    // ... más usuarios
  ]
}
```

### Gestión de Eventos

#### Crear un nuevo evento

```
POST /api/events
```

Crea un nuevo evento y lo anuncia automáticamente en el canal correspondiente.

**Cuerpo de la solicitud:**
```json
{
  "title": "Taller de React",
  "description": "Aprende React desde cero con ejemplos prácticos",
  "date": "2023-05-20T15:00:00Z",
  "duration": 120,
  "location": "Virtual - Discord",
  "maxParticipants": 30
}
```

**Respuesta:**
```json
{
  "id": "event_123456",
  "title": "Taller de React",
  "description": "Aprende React desde cero con ejemplos prácticos",
  "date": "2023-05-20T15:00:00Z",
  "duration": 120,
  "location": "Virtual - Discord",
  "maxParticipants": 30,
  "currentParticipants": 0,
  "messageId": "987654321098765432",
  "channelId": "876543210987654321"
}
```

#### Obtener un evento específico

```
GET /api/events/:eventId
```

Retorna información detallada sobre un evento específico.

**Parámetros:**
- `eventId`: ID del evento

**Respuesta:**
```json
{
  "id": "event_123456",
  "title": "Taller de React",
  "description": "Aprende React desde cero con ejemplos prácticos",
  "date": "2023-05-20T15:00:00Z",
  "duration": 120,
  "location": "Virtual - Discord",
  "maxParticipants": 30,
  "currentParticipants": 12,
  "participants": [
    {
      "discordId": "123456789012345678",
      "username": "Usuario#1234"
    },
    // ... más participantes
  ]
}
```

## Guía

### Comandos del Bot

El bot responde a los siguientes comandos en Discord:

#### `/help`

Muestra la lista de comandos disponibles y su uso.

#### `/registro`

Registra a un nuevo usuario en el sistema del Club.

**Opciones:**
- `carrera`: Carrera que estudias (obligatorio)
- `semestre`: Semestre actual (obligatorio)
- `github`: Usuario de GitHub (opcional)

#### `/problemas`

Gestiona los problemas resueltos por los usuarios.

**Subcomandos:**
- `/problemas añadir <plataforma> <id> <dificultad>`: Registra un nuevo problema resuelto
- `/problemas listar [usuario]`: Lista los problemas resueltos por un usuario
- `/problemas top`: Muestra el ranking de usuarios con más problemas resueltos

#### `/eventos`

Gestiona los eventos del Club.

**Subcomandos:**
- `/eventos próximos`: Muestra los próximos eventos
- `/eventos inscribir <id>`: Inscribe al usuario en un evento
- `/eventos desinscribir <id>`: Cancela la inscripción a un evento

## Manejo de errores

El API utiliza códigos de estado HTTP estándar:

- `200 OK`: La solicitud se completó correctamente
- `201 Created`: El recurso se creó correctamente
- `400 Bad Request`: La solicitud contiene datos inválidos
- `401 Unauthorized`: Falta el token de autenticación o es inválido
- `403 Forbidden`: No tienes permisos para acceder a este recurso
- `404 Not Found`: El recurso solicitado no existe
- `500 Internal Server Error`: Error del servidor

Las respuestas de error incluyen un objeto JSON con información detallada:

```json
{
  "error": true,
  "code": "INVALID_EVENT_DATE",
  "message": "La fecha del evento debe ser posterior a la fecha actual",
  "details": {
    "providedDate": "2022-01-01T00:00:00Z",
    "currentDate": "2023-04-15T10:30:00Z"
  }
}
```

## Ejemplos

### Registrar un nuevo usuario

```javascript
// Usando fetch
const registerUser = async (userData) => {
  const response = await fetch('https://api.cpfbot.fiuna.edu.py/api/users/register', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_TOKEN',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  });
  
  return await response.json();
};

// Ejemplo de uso
const result = await registerUser({
  discordId: '123456789012345678',
  username: 'NuevoUsuario#1234',
  career: 'Ingeniería Informática',
  semester: 6,
  github: 'usuario123'
});

console.log(result);
```

### Obtener próximos eventos

```javascript
// Usando axios
import axios from 'axios';

const getUpcomingEvents = async () => {
  const response = await axios.get('https://api.cpfbot.fiuna.edu.py/api/events/upcoming', {
    headers: {
      'Authorization': 'Bearer YOUR_API_TOKEN'
    }
  });
  
  return response.data;
};

// Ejemplo de uso
const events = await getUpcomingEvents();
events.forEach(event => {
  console.log(`${event.title} - ${new Date(event.date).toLocaleString()}`);
});
```

### Integración con webhook

```javascript
// Configuración de un webhook para recibir notificaciones
const setupWebhook = async () => {
  const response = await fetch('https://api.cpfbot.fiuna.edu.py/api/webhooks', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_TOKEN',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      url: 'https://tu-servidor.com/webhook-endpoint',
      events: ['user.registered', 'event.created'],
      secret: 'tu_secreto_para_verificar_las_solicitudes'
    })
  });
  
  return await response.json();
};

// Ejemplo de un servidor para recibir notificaciones
import express from 'express';
const app = express();
app.use(express.json());

app.post('/webhook-endpoint', (req, res) => {
  const { event, data, timestamp, signature } = req.body;
  
  // Verificar la firma para asegurar que la solicitud es válida
  if (verificarFirma(data, timestamp, signature, 'tu_secreto_para_verificar_las_solicitudes')) {
    console.log(`Evento recibido: ${event}`);
    console.log(data);
    
    // Procesar el evento según su tipo
    switch (event) {
      case 'user.registered':
        // Lógica para manejar nuevo usuario
        break;
      case 'event.created':
        // Lógica para manejar nuevo evento
        break;
    }
    
    res.status(200).send({ success: true });
  } else {
    res.status(401).send({ error: 'Firma inválida' });
  }
});

app.listen(3000, () => {
  console.log('Servidor de webhook ejecutándose en el puerto 3000');
});
```

## Límites de tasa

Para evitar abusos, el API implementa límites de tasa:

- 100 solicitudes por minuto por IP
- 1000 solicitudes por hora por token de API

Si excedes estos límites, recibirás una respuesta `429 Too Many Requests`.

## Soporte

Si encuentras problemas o tienes preguntas sobre el API, contáctanos:

- Discord: Canal #bot-soporte
- Email: bot-support@cpf.fiuna.edu.py
- GitHub: Abre un issue en nuestro [repositorio](https://github.com/cpfiuna/discord-bot)

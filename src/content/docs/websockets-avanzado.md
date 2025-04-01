
---
title: "WebSockets: Comunicación en Tiempo Real"
description: "Guía avanzada de implementación de WebSockets para aplicaciones en tiempo real"
category: "Avanzado"
order: 2
author: "Laura González"
updatedAt: "2024-02-05"
readTime: "18 min"
githubUrl: "https://github.com/clubprogramacion/docs/websockets"
tags: ["WebSockets", "Tiempo Real", "Backend", "JavaScript"]
resources: [
  { 
    "title": "MDN WebSockets API", 
    "url": "https://developer.mozilla.org/es/docs/Web/API/WebSockets_API" 
  },
  { 
    "title": "WebSockets RFC 6455", 
    "url": "https://datatracker.ietf.org/doc/html/rfc6455" 
  },
  { 
    "title": "Socket.IO Documentation", 
    "url": "https://socket.io/docs/v4/" 
  }
]
---

# WebSockets: Comunicación en Tiempo Real

Los WebSockets proporcionan un canal de comunicación bidireccional y persistente entre un cliente y un servidor. Esta tecnología permite crear aplicaciones en tiempo real como chats, juegos multijugador, dashboards en vivo, y mucho más.

## Introducción a WebSockets

A diferencia del modelo tradicional HTTP de solicitud-respuesta, los WebSockets permiten una comunicación bidireccional completa donde tanto el cliente como el servidor pueden iniciar la comunicación en cualquier momento.

### Ventajas sobre HTTP tradicional

- **Conexión persistente**: No es necesario establecer una nueva conexión para cada intercambio de datos.
- **Comunicación bidireccional**: El servidor puede enviar datos al cliente sin esperar una solicitud.
- **Menor sobrecarga**: Los mensajes WebSocket tienen menos sobrecarga que las solicitudes HTTP.
- **Actualización en tiempo real**: Ideal para contenido que cambia frecuentemente.
- **Menor latencia**: Comunicación más rápida al eliminar handshakes repetidos.

### Casos de uso comunes

- **Chats y mensajería**: Entrega instantánea de mensajes.
- **Juegos multijugador**: Sincronización de estados de juego.
- **Colaboración en tiempo real**: Edición colaborativa de documentos.
- **Dashboards en vivo**: Visualización de datos actualizados en tiempo real.
- **Notificaciones push**: Entrega instantánea de alertas y notificaciones.
- **Streaming de datos**: Flujos continuos de información como cotizaciones bursátiles o análisis de redes sociales.

## WebSockets Nativos

### API básica del lado del cliente

```javascript
// Crear una nueva conexión WebSocket
const socket = new WebSocket('ws://ejemplo.com/socket');

// Evento de conexión abierta
socket.addEventListener('open', (event) => {
  console.log('Conexión establecida');
  // Enviar un mensaje al servidor
  socket.send('Hola desde el cliente');
});

// Recibir mensajes
socket.addEventListener('message', (event) => {
  console.log('Mensaje recibido del servidor:', event.data);
});

// Manejar errores
socket.addEventListener('error', (event) => {
  console.error('Error en la conexión WebSocket:', event);
});

// Evento de cierre de conexión
socket.addEventListener('close', (event) => {
  console.log('Conexión cerrada, código:', event.code, 'razón:', event.reason);
});

// Para cerrar la conexión desde el cliente
function closeConnection() {
  socket.close(1000, 'Cierre normal');
}
```

### Implementación básica del servidor (Node.js con ws)

```javascript
const WebSocket = require('ws');

// Crear un servidor WebSocket en el puerto 8080
const wss = new WebSocket.Server({ port: 8080 });

// Evento de conexión de un nuevo cliente
wss.on('connection', (ws) => {
  console.log('Cliente conectado');
  
  // Enviar un mensaje de bienvenida
  ws.send('Bienvenido al servidor WebSocket');
  
  // Recibir mensajes del cliente
  ws.on('message', (message) => {
    console.log('Mensaje recibido:', message.toString());
    
    // Responder al cliente
    ws.send(`Eco: ${message}`);
  });
  
  // Manejo de cierre de conexión
  ws.on('close', () => {
    console.log('Cliente desconectado');
  });
  
  // Enviar un mensaje periódico
  const interval = setInterval(() => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(`Tiempo del servidor: ${new Date().toISOString()}`);
    }
  }, 10000);
  
  // Limpiar el intervalo cuando se cierra la conexión
  ws.on('close', () => {
    clearInterval(interval);
  });
});

console.log('Servidor WebSocket iniciado en ws://localhost:8080');
```

### Manejo del estado de conexión

Los WebSockets tienen 4 estados posibles, representados por la propiedad `readyState`:

- `WebSocket.CONNECTING` (0): La conexión está siendo establecida.
- `WebSocket.OPEN` (1): La conexión está establecida y lista para la comunicación.
- `WebSocket.CLOSING` (2): La conexión está en proceso de cierre.
- `WebSocket.CLOSED` (3): La conexión está cerrada o no pudo ser abierta.

```javascript
// Ejemplo de verificación del estado antes de enviar
function sendIfConnected(socket, message) {
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(message);
    return true;
  } else {
    console.warn('La conexión no está abierta, estado:', socket.readyState);
    return false;
  }
}
```

## Socket.IO

Socket.IO es una biblioteca que facilita la comunicación en tiempo real, bidireccional y basada en eventos. Utiliza WebSockets cuando es posible y recurre a otras soluciones cuando no lo son.

### Características principales

- **Reconexión automática**: Intenta reconectar automáticamente si la conexión se pierde.
- **Detección y recuperación de caídas**: Detecta si la conexión se ha caído y se recupera.
- **Compatibilidad con navegadores antiguos**: Uso de polling como fallback.
- **Multiplexación**: Permite varios "namespaces" sobre una única conexión.
- **Salas**: Agrupa clientes para enviarles mensajes de forma eficiente.
- **Reconocimiento de mensajes**: Confirmación de que un mensaje fue recibido.

### Cliente Socket.IO

```javascript
// Importar la biblioteca (asegúrate de incluirla en tu HTML o instalarla via npm)
import { io } from "socket.io-client";

// Conectar al servidor
const socket = io("http://ejemplo.com");

// Evento de conexión
socket.on("connect", () => {
  console.log("Conectado al servidor");
  console.log("ID de socket:", socket.id);
  
  // Enviar un evento al servidor
  socket.emit("saludo", { nombre: "Usuario" });
});

// Recibir eventos desde el servidor
socket.on("mensaje", (data) => {
  console.log("Mensaje recibido:", data);
});

// Recibir eventos con reconocimiento
socket.emit("operacion_importante", { datos: "..." }, (respuesta) => {
  console.log("El servidor reconoció la operación:", respuesta);
});

// Manejar desconexiones
socket.on("disconnect", (reason) => {
  console.log("Desconectado del servidor:", reason);
  
  if (reason === "io server disconnect") {
    // La desconexión fue iniciada por el servidor, intentar reconectar
    socket.connect();
  }
  // De lo contrario, la reconexión será automática
});

// Manejar errores
socket.on("connect_error", (error) => {
  console.log("Error de conexión:", error.message);
});
```

### Servidor Socket.IO (Node.js)

```javascript
const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "http://ejemplo.com",
    methods: ["GET", "POST"]
  }
});

// Middleware para autenticación
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  // Verificar el token
  if (esTokenValido(token)) {
    // Guardar información del usuario en el objeto socket
    socket.user = obtenerUsuario(token);
    next();
  } else {
    next(new Error("Autenticación fallida"));
  }
});

// Evento de conexión
io.on("connection", (socket) => {
  console.log("Cliente conectado:", socket.id);
  console.log("Usuario:", socket.user?.nombre);
  
  // Unir al usuario a una sala personalizada
  socket.join(`usuario:${socket.user?.id}`);
  
  // Recibir eventos desde el cliente
  socket.on("saludo", (data) => {
    console.log("Saludo recibido:", data);
    
    // Enviar un mensaje sólo a este cliente
    socket.emit("mensaje", { texto: `Hola, ${data.nombre}!` });
  });
  
  // Evento con reconocimiento
  socket.on("operacion_importante", (data, callback) => {
    console.log("Operación importante:", data);
    
    // Procesar datos...
    
    // Enviar reconocimiento
    callback({ estado: "éxito", timestamp: Date.now() });
  });
  
  // Manejar desconexión
  socket.on("disconnect", (reason) => {
    console.log("Cliente desconectado:", socket.id, "razón:", reason);
  });
});

// Enviar mensaje a todos los clientes
function difusionGeneral(mensaje) {
  io.emit("anuncio", { mensaje });
}

// Enviar mensaje a un usuario específico
function mensajePrivado(userId, mensaje) {
  io.to(`usuario:${userId}`).emit("mensaje_privado", { mensaje });
}

// Iniciar el servidor
httpServer.listen(3000, () => {
  console.log("Servidor Socket.IO iniciado en http://localhost:3000");
});
```

### Salas y Namespaces en Socket.IO

#### Namespaces

Los namespaces permiten segregar la aplicación en canales diferentes:

```javascript
// Servidor
const chatNsp = io.of("/chat");
const adminNsp = io.of("/admin");

chatNsp.on("connection", (socket) => {
  // Lógica para el namespace de chat
});

adminNsp.on("connection", (socket) => {
  // Lógica para el namespace de administración
});

// Cliente
const chatSocket = io("/chat");
const adminSocket = io("/admin");
```

#### Salas

Las salas permiten agrupar clientes para enviarles mensajes de forma eficiente:

```javascript
// Servidor
io.on("connection", (socket) => {
  // Unir a una sala
  socket.join("sala1");
  
  // Enviar mensaje a todos en sala1
  io.to("sala1").emit("mensaje_sala", "Hola sala1");
  
  // Unir a múltiples salas
  socket.join(["sala2", "sala3"]);
  
  // Salir de una sala
  socket.leave("sala2");
  
  // Enviar a todas las salas excepto una
  socket.to("sala1").to("sala3").emit("mensaje_multi_sala", "Hola a salas 1 y 3");
  
  // Listado de salas de un socket
  console.log(Array.from(socket.rooms));
});
```

## Optimización de WebSockets

### Estrategias para manejar desconexiones

1. **Implementar heartbeats**:

```javascript
// Servidor (utilizando ws)
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  ws.isAlive = true;
  
  ws.on('pong', () => {
    ws.isAlive = true;
  });
  
  ws.on('message', (message) => {
    // Si el mensaje es un heartbeat, responder
    if (message.toString() === 'heartbeat') {
      ws.send('heartbeat-ack');
    }
  });
});

// Verificar conexiones inactivas periódicamente
const interval = setInterval(() => {
  wss.clients.forEach((ws) => {
    if (ws.isAlive === false) {
      return ws.terminate();
    }
    
    ws.isAlive = false;
    ws.ping(() => {});
  });
}, 30000);

wss.on('close', () => {
  clearInterval(interval);
});
```

2. **Estrategia de reconexión (cliente)**:

```javascript
function conectarWebSocket() {
  const socket = new WebSocket('ws://ejemplo.com/socket');
  
  // Configurar timeouts y reintento exponencial
  let tiempoReconexion = 1000; // Empezar con 1 segundo
  const maxTiempoReconexion = 30000; // Máximo 30 segundos
  let intentosReconexion = 0;
  
  socket.addEventListener('open', () => {
    console.log('Conexión establecida');
    tiempoReconexion = 1000; // Resetear tiempo de reconexión
    intentosReconexion = 0;
    
    // Iniciar heartbeats
    const heartbeatInterval = setInterval(() => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send('heartbeat');
      } else {
        clearInterval(heartbeatInterval);
      }
    }, 15000);
  });
  
  socket.addEventListener('close', (event) => {
    console.log('Conexión cerrada, reintentando...');
    
    // Limpiar intervalos existentes
    
    // Calcular tiempo de reconexión con retroceso exponencial
    tiempoReconexion = Math.min(
      maxTiempoReconexion,
      tiempoReconexion * Math.pow(1.5, intentosReconexion)
    );
    
    intentosReconexion++;
    
    // Programar reconexión
    setTimeout(conectarWebSocket, tiempoReconexion);
  });
  
  // Resto de eventos (message, error, etc.)
  
  return socket;
}

// Iniciar conexión
let socketGlobal = conectarWebSocket();
```

### Rendimiento y escalabilidad

1. **Compresión de mensajes**:

```javascript
// Cliente (usando compression-streams-polyfill para navegadores que no lo soportan)
async function enviarMensajeComprimido(socket, mensaje) {
  const encoder = new TextEncoder();
  const datosOriginales = encoder.encode(JSON.stringify(mensaje));
  
  // Comprimir usando Compression Streams API
  const stream = new Blob([datosOriginales]).stream();
  const comprimido = await new Response(
    stream.pipeThrough(new CompressionStream('gzip'))
  ).blob();
  
  // Enviar datos comprimidos
  socket.send(comprimido);
}

// Si se prefiere una biblioteca establecida:
// import pako from 'pako';
// const comprimido = pako.deflate(JSON.stringify(mensaje));
// socket.send(comprimido);
```

2. **Agrupación de mensajes pequeños (batching)**:

```javascript
class MessageBatcher {
  constructor(socket, maxBatchSize = 10, maxWaitTime = 100) {
    this.socket = socket;
    this.maxBatchSize = maxBatchSize;
    this.maxWaitTime = maxWaitTime;
    this.messageQueue = [];
    this.timer = null;
  }
  
  enqueue(message) {
    this.messageQueue.push(message);
    
    if (this.messageQueue.length >= this.maxBatchSize) {
      this.flush();
    } else if (!this.timer) {
      this.timer = setTimeout(() => this.flush(), this.maxWaitTime);
    }
  }
  
  flush() {
    if (this.messageQueue.length === 0) return;
    
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    
    const batch = {
      type: 'batch',
      messages: [...this.messageQueue]
    };
    
    this.socket.send(JSON.stringify(batch));
    this.messageQueue = [];
  }
}
```

3. **Comunicación binaria eficiente**:

```javascript
// Usando ArrayBuffer para datos binarios compactos
function enviarDatosBinarios(socket, datos) {
  // Ejemplo: enviar un array de coordenadas [x, y] para 3 puntos
  const numPuntos = datos.length;
  const buffer = new ArrayBuffer(numPuntos * 2 * Float32Array.BYTES_PER_ELEMENT);
  const view = new Float32Array(buffer);
  
  for (let i = 0; i < numPuntos; i++) {
    view[i*2] = datos[i].x;
    view[i*2+1] = datos[i].y;
  }
  
  socket.send(buffer);
}

// Alternativamente, usar una biblioteca como MessagePack o Protocol Buffers
```

## Seguridad en WebSockets

### Mejores prácticas de seguridad

1. **Autenticación y autorización**:

```javascript
// Cliente: enviar token en establecimiento de conexión WebSocket
const socket = new WebSocket(`ws://ejemplo.com/socket?token=${authToken}`);

// O con Socket.IO
const socket = io("http://ejemplo.com", {
  auth: {
    token: "abc123"
  }
});

// Servidor (Node.js con ws)
const WebSocket = require('ws');
const jwt = require('jsonwebtoken');
const url = require('url');

const wss = new WebSocket.Server({ 
  noServer: true,
  verifyClient: false // Haremos autenticación personalizada
});

// Manejar upgrade HTTP para autenticación
const server = require('http').createServer();

server.on('upgrade', (request, socket, head) => {
  // Extraer token de la URL
  const { query } = url.parse(request.url, true);
  const token = query.token;
  
  // Verificar token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
      socket.destroy();
      return;
    }
    
    // Guardar la información del usuario para usarla después
    request.user = decoded;
    
    // Continuar con el handshake WebSocket
    wss.handleUpgrade(request, socket, head, (ws) => {
      // Adjuntar información del usuario al socket
      ws.user = request.user;
      wss.emit('connection', ws, request);
    });
  });
});

wss.on('connection', (ws, request) => {
  console.log(`Usuario autenticado: ${ws.user.username}`);
  
  // Verificar permisos antes de cada operación
  ws.on('message', (message) => {
    const data = JSON.parse(message);
    
    // Verificar si el usuario tiene permisos para esta acción
    if (tienePermiso(ws.user, data.action)) {
      // Procesar mensaje...
    } else {
      ws.send(JSON.stringify({
        error: "No tienes permiso para realizar esta acción"
      }));
    }
  });
});

server.listen(8080);
```

2. **Protección contra CSRF**:

```javascript
// Verificar el origen de la conexión
wss.on('connection', (ws, request) => {
  const origin = request.headers.origin;
  
  if (!origenesPermitidos.includes(origin)) {
    ws.close(1003, "Origen no permitido");
    return;
  }
  
  // Continuar con la conexión normal
});

// En el cliente, incluir un token CSRF
const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
const socket = new WebSocket(`ws://ejemplo.com/socket?csrf=${csrfToken}`);
```

3. **Limitación de tasa y protección DoS**:

```javascript
// Implementar limitación de tasa por IP
const rateLimits = new Map();

function limitarTasa(ip, limiteMax = 100, ventanaTiempo = 60000) {
  if (!rateLimits.has(ip)) {
    rateLimits.set(ip, {
      count: 0,
      resetTime: Date.now() + ventanaTiempo
    });
  }
  
  const limitInfo = rateLimits.get(ip);
  
  // Reiniciar contador si pasó la ventana de tiempo
  if (Date.now() > limitInfo.resetTime) {
    limitInfo.count = 0;
    limitInfo.resetTime = Date.now() + ventanaTiempo;
  }
  
  limitInfo.count++;
  
  return limitInfo.count <= limiteMax;
}

// Uso en el servidor WebSocket
server.on('upgrade', (request, socket, head) => {
  const ip = request.headers['x-forwarded-for'] || request.socket.remoteAddress;
  
  if (!limitarTasa(ip)) {
    socket.write('HTTP/1.1 429 Too Many Requests\r\n\r\n');
    socket.destroy();
    return;
  }
  
  // Continuar con el handshake...
});
```

### Encriptación y validación de datos

1. **Validación de mensajes JSON**:

```javascript
// Usando Joi para validación de esquema
const Joi = require('joi');

// Definir esquemas para diferentes tipos de mensajes
const schemas = {
  chat: Joi.object({
    type: Joi.string().valid('chat').required(),
    message: Joi.string().min(1).max(500).required(),
    roomId: Joi.string().required()
  }),
  
  joinRoom: Joi.object({
    type: Joi.string().valid('joinRoom').required(),
    roomId: Joi.string().required()
  })
};

// Validar mensajes entrantes
ws.on('message', (message) => {
  let data;
  
  try {
    data = JSON.parse(message);
  } catch (e) {
    return ws.send(JSON.stringify({ 
      error: "Formato JSON inválido" 
    }));
  }
  
  // Validar según el tipo de mensaje
  const schema = schemas[data.type];
  if (!schema) {
    return ws.send(JSON.stringify({ 
      error: "Tipo de mensaje desconocido" 
    }));
  }
  
  const { error } = schema.validate(data);
  if (error) {
    return ws.send(JSON.stringify({ 
      error: error.details[0].message 
    }));
  }
  
  // Procesar mensaje válido...
});
```

2. **End-to-end encryption para mensajes privados**:

```javascript
// Este es un ejemplo simplificado. En producción, usa bibliotecas establecidas.

// Cliente: Encriptación con la clave pública del receptor
async function enviarMensajeEncriptado(socket, receptor, mensaje) {
  // Obtener clave pública del receptor (almacenada previamente)
  const clavePublicaReceptor = await obtenerClavePublica(receptor);
  
  // Encriptar mensaje
  const mensajeEncriptado = await window.crypto.subtle.encrypt(
    {
      name: "RSA-OAEP"
    },
    clavePublicaReceptor,
    new TextEncoder().encode(JSON.stringify(mensaje))
  );
  
  // Convertir a formato para envío
  const encriptadoBase64 = btoa(
    String.fromCharCode.apply(null, new Uint8Array(mensajeEncriptado))
  );
  
  // Enviar mensaje encriptado
  socket.send(JSON.stringify({
    type: 'encrypted',
    to: receptor,
    data: encriptadoBase64
  }));
}
```

## Arquitecturas para Aplicaciones WebSocket

### Patrones de diseño comunes

1. **Patrón Pub/Sub (Publicación/Suscripción)**:

```javascript
// Servidor
class PubSubManager {
  constructor() {
    this.subscribers = new Map(); // canal -> Set de sockets
  }
  
  subscribe(channel, socket) {
    if (!this.subscribers.has(channel)) {
      this.subscribers.set(channel, new Set());
    }
    
    this.subscribers.get(channel).add(socket);
    console.log(`Cliente ${socket.id} suscrito a ${channel}`);
  }
  
  unsubscribe(channel, socket) {
    if (!this.subscribers.has(channel)) return;
    
    this.subscribers.get(channel).delete(socket);
    console.log(`Cliente ${socket.id} desuscrito de ${channel}`);
    
    // Limpiar canales vacíos
    if (this.subscribers.get(channel).size === 0) {
      this.subscribers.delete(channel);
    }
  }
  
  unsubscribeAll(socket) {
    // Desuscribir de todos los canales cuando el cliente se desconecta
    for (const [channel, subscribers] of this.subscribers.entries()) {
      if (subscribers.has(socket)) {
        this.unsubscribe(channel, socket);
      }
    }
  }
  
  publish(channel, message, exceptSocket = null) {
    if (!this.subscribers.has(channel)) return;
    
    const payload = JSON.stringify({
      channel,
      message
    });
    
    for (const socket of this.subscribers.get(channel)) {
      if (socket !== exceptSocket && socket.readyState === WebSocket.OPEN) {
        socket.send(payload);
      }
    }
    
    console.log(`Mensaje publicado en ${channel} a ${this.subscribers.get(channel).size} clientes`);
  }
}

// Uso
const pubsub = new PubSubManager();

wss.on('connection', (ws) => {
  // Generar ID único para este socket
  ws.id = uuidv4();
  
  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);
      
      switch (data.action) {
        case 'subscribe':
          pubsub.subscribe(data.channel, ws);
          break;
          
        case 'unsubscribe':
          pubsub.unsubscribe(data.channel, ws);
          break;
          
        case 'publish':
          // Opcionalmente verificar permisos antes de publicar
          pubsub.publish(data.channel, data.message);
          break;
      }
    } catch (e) {
      console.error("Error al procesar mensaje:", e);
    }
  });
  
  ws.on('close', () => {
    pubsub.unsubscribeAll(ws);
  });
});
```

2. **Patrón RPC (Llamada a Procedimiento Remoto)**:

```javascript
// Servidor
class RPCServer {
  constructor() {
    this.methods = new Map();
  }
  
  register(methodName, handler) {
    this.methods.set(methodName, handler);
  }
  
  async handleCall(socket, requestId, methodName, params) {
    if (!this.methods.has(methodName)) {
      return socket.send(JSON.stringify({
        type: 'rpc:response',
        id: requestId,
        error: { code: -32601, message: 'Método no encontrado' }
      }));
    }
    
    try {
      const handler = this.methods.get(methodName);
      const result = await handler(params, socket.user);
      
      socket.send(JSON.stringify({
        type: 'rpc:response',
        id: requestId,
        result
      }));
    } catch (e) {
      console.error(`Error en RPC ${methodName}:`, e);
      
      socket.send(JSON.stringify({
        type: 'rpc:response',
        id: requestId,
        error: { code: -32000, message: e.message || 'Error interno' }
      }));
    }
  }
}

// Uso
const rpcServer = new RPCServer();

// Registrar métodos RPC
rpcServer.register('getUsers', async (params, user) => {
  // Verificar permisos
  if (!user.isAdmin) {
    throw new Error('Permiso denegado');
  }
  
  // Obtener datos de usuarios
  const users = await db.users.find({ limit: params.limit || 10 });
  return users.map(u => ({ id: u.id, name: u.name }));
});

rpcServer.register('createTask', async (params, user) => {
  // Validar parámetros
  if (!params.title) {
    throw new Error('El título es requerido');
  }
  
  // Crear tarea
  const task = await db.tasks.create({
    title: params.title,
    description: params.description || '',
    createdBy: user.id
  });
  
  return { id: task.id, title: task.title };
});

// Manejar mensajes WebSocket
ws.on('message', (message) => {
  try {
    const data = JSON.parse(message);
    
    if (data.type === 'rpc:request') {
      rpcServer.handleCall(ws, data.id, data.method, data.params);
    }
  } catch (e) {
    console.error("Error al procesar mensaje:", e);
  }
});
```

### Escalabilidad horizontal

1. **Uso de Redis para sincronización entre instancias**:

```javascript
// Servidor (usando Socket.IO con adaptador Redis)
const { createServer } = require("http");
const { Server } = require("socket.io");
const { createAdapter } = require("@socket.io/redis-adapter");
const { createClient } = require("redis");

const httpServer = createServer();

// Crear clientes Redis
const pubClient = createClient({ url: "redis://localhost:6379" });
const subClient = pubClient.duplicate();

Promise.all([pubClient.connect(), subClient.connect()]).then(() => {
  const io = new Server(httpServer, {
    adapter: createAdapter(pubClient, subClient)
  });

  io.on("connection", (socket) => {
    console.log(`Cliente conectado: ${socket.id}`);
    
    socket.on("message", (data) => {
      // El mensaje se replicará a todas las instancias del servidor
      io.emit("broadcast", data);
    });
    
    socket.on("join-room", (room) => {
      socket.join(room);
      io.to(room).emit("room-update", { room, user: socket.id, joined: true });
    });
  });

  httpServer.listen(3000, () => {
    console.log("Servidor iniciado en puerto 3000");
  });
});
```

2. **Load Balancer Sticky Sessions**:

Ejemplo de configuración para nginx:

```nginx
upstream websocket_servers {
    hash $remote_addr consistent;
    server backend1.ejemplo.com:3000;
    server backend2.ejemplo.com:3000;
    server backend3.ejemplo.com:3000;
}

server {
    listen 80;
    server_name socket.ejemplo.com;

    location / {
        proxy_pass http://websocket_servers;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        
        # Configuración de sticky session basada en IP
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 300s;
        proxy_connect_timeout 75s;
    }
}
```

## Guía

### Planificación de una aplicación WebSocket

#### 1. Definir protocolos de comunicación

```javascript
// Ejemplo de esquema de mensajes
const MESSAGE_TYPES = {
  // Mensajes de sistema
  CONNECT: 'system:connect',
  DISCONNECT: 'system:disconnect',
  ERROR: 'system:error',
  
  // Autenticación
  AUTH_REQUEST: 'auth:request',
  AUTH_RESPONSE: 'auth:response',
  
  // Mensajería
  CHAT_MESSAGE: 'chat:message',
  CHAT_TYPING: 'chat:typing',
  
  // Presencia
  PRESENCE_UPDATE: 'presence:update',
  USER_ONLINE: 'presence:online',
  USER_OFFLINE: 'presence:offline',
  
  // Notificaciones
  NOTIFICATION: 'notification',
  
  // Datos en tiempo real
  DATA_UPDATE: 'data:update'
};

// Formato estándar de mensajes
function createMessage(type, payload, metadata = {}) {
  return {
    type,
    payload,
    metadata: {
      timestamp: Date.now(),
      ...metadata
    }
  };
}
```

#### 2. Estructurar el código de manera modular

```javascript
// estructura de archivos recomendada
// server/
// ├── config/            // Configuración
// ├── middlewares/       // Middlewares WebSocket
// ├── handlers/          // Manejadores de eventos WebSocket
// │   ├── authHandler.js
// │   ├── chatHandler.js
// │   └── presenceHandler.js
// ├── services/          // Lógica de negocio
// ├── models/            // Modelos de datos
// ├── utils/             // Utilidades
// └── server.js          // Punto de entrada

// Ejemplo de manejador modular (chatHandler.js)
const { MESSAGE_TYPES } = require('../utils/constants');
const ChatService = require('../services/chatService');

class ChatHandler {
  constructor(io, socket) {
    this.io = io;
    this.socket = socket;
    this.chatService = new ChatService();
    
    // Vincular métodos
    this.handleMessage = this.handleMessage.bind(this);
    this.handleTyping = this.handleTyping.bind(this);
    
    // Registrar manejadores de eventos
    this.socket.on(MESSAGE_TYPES.CHAT_MESSAGE, this.handleMessage);
    this.socket.on(MESSAGE_TYPES.CHAT_TYPING, this.handleTyping);
  }
  
  async handleMessage(data) {
    try {
      const { roomId, content } = data;
      const userId = this.socket.user.id;
      
      // Guardar mensaje en la base de datos
      const message = await this.chatService.saveMessage(userId, roomId, content);
      
      // Emitir mensaje a todos en la sala
      this.io.to(roomId).emit(MESSAGE_TYPES.CHAT_MESSAGE, {
        id: message.id,
        sender: {
          id: userId,
          name: this.socket.user.name
        },
        content: message.content,
        timestamp: message.createdAt
      });
    } catch (error) {
      console.error('Error manejando mensaje:', error);
      this.socket.emit(MESSAGE_TYPES.ERROR, {
        code: 'chat-error',
        message: 'Error al procesar el mensaje'
      });
    }
  }
  
  handleTyping(data) {
    const { roomId, isTyping } = data;
    const userId = this.socket.user.id;
    
    // Emitir evento de escritura a todos en la sala excepto el remitente
    this.socket.to(roomId).emit(MESSAGE_TYPES.CHAT_TYPING, {
      userId,
      userName: this.socket.user.name,
      isTyping
    });
  }
}

module.exports = ChatHandler;
```

#### 3. Implementación en el servidor principal

```javascript
// server.js
const http = require('http');
const { Server } = require('socket.io');
const AuthMiddleware = require('./middlewares/authMiddleware');
const ChatHandler = require('./handlers/chatHandler');
const PresenceHandler = require('./handlers/presenceHandler');

// Crear servidor HTTP
const server = http.createServer();

// Crear servidor Socket.IO
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Aplicar middleware de autenticación
io.use(AuthMiddleware.verifyToken);

// Manejar conexiones
io.on('connection', (socket) => {
  console.log(`Cliente conectado: ${socket.id}, Usuario: ${socket.user.name}`);
  
  // Inicializar manejadores
  new ChatHandler(io, socket);
  new PresenceHandler(io, socket);
  
  // Manejar desconexión
  socket.on('disconnect', (reason) => {
    console.log(`Cliente desconectado: ${socket.id}, razón: ${reason}`);
  });
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor WebSocket iniciado en puerto ${PORT}`);
});
```

### Solución de problemas comunes

1. **Manejo de reconexión con estado**:

```javascript
// Cliente
class WebSocketClient {
  constructor(url) {
    this.url = url;
    this.socket = null;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 10;
    this.reconnectDelay = 1000;
    this.messageQueue = [];
    this.eventHandlers = new Map();
    this.connectionId = null;
    this.lastEventId = 0;
    
    this.connect();
  }
  
  connect() {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) return;
    
    // Construir URL con información de reconexión si es necesario
    let connectionUrl = this.url;
    if (this.connectionId && this.lastEventId) {
      connectionUrl += `?connectionId=${this.connectionId}&lastEventId=${this.lastEventId}`;
    }
    
    this.socket = new WebSocket(connectionUrl);
    
    this.socket.addEventListener('open', this.handleOpen.bind(this));
    this.socket.addEventListener('message', this.handleMessage.bind(this));
    this.socket.addEventListener('close', this.handleClose.bind(this));
    this.socket.addEventListener('error', this.handleError.bind(this));
  }
  
  handleOpen(event) {
    console.log('Conexión establecida');
    this.reconnectAttempts = 0;
    this.reconnectDelay = 1000;
    
    // Procesar mensajes en cola
    this.procesarColaDeEnvio();
  }
  
  handleMessage(event) {
    try {
      const data = JSON.parse(event.data);
      
      // Almacenar ID de conexión para reconexiones
      if (data.type === 'connection-established') {
        this.connectionId = data.connectionId;
      }
      
      // Actualizar último ID de evento recibido
      if (data.eventId) {
        this.lastEventId = Math.max(this.lastEventId, data.eventId);
      }
      
      // Distribuir el mensaje a los manejadores correspondientes
      if (this.eventHandlers.has(data.type)) {
        this.eventHandlers.get(data.type).forEach(handler => {
          handler(data.payload);
        });
      }
    } catch (error) {
      console.error('Error procesando mensaje:', error);
    }
  }
  
  handleClose(event) {
    console.log(`Conexión cerrada: ${event.code} - ${event.reason}`);
    
    if (event.code !== 1000) { // No es un cierre normal
      this.scheduleReconnect();
    }
  }
  
  handleError(event) {
    console.error('Error en conexión WebSocket:', event);
    // La reconexión se manejará en el evento close
  }
  
  scheduleReconnect() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('Número máximo de intentos de reconexión alcanzado');
      this.emit('reconnect-failed');
      return;
    }
    
    this.reconnectAttempts++;
    const delay = Math.min(30000, this.reconnectDelay * Math.pow(1.5, this.reconnectAttempts - 1));
    
    console.log(`Reintentando conexión en ${delay}ms (intento ${this.reconnectAttempts})`);
    
    setTimeout(() => {
      this.emit('reconnecting', this.reconnectAttempts);
      this.connect();
    }, delay);
  }
  
  send(type, payload) {
    const message = {
      type,
      payload,
      timestamp: Date.now()
    };
    
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(message));
    } else {
      // Poner en cola para enviar cuando la conexión esté disponible
      this.messageQueue.push(message);
    }
  }
  
  procesarColaDeEnvio() {
    if (this.messageQueue.length > 0 && this.socket.readyState === WebSocket.OPEN) {
      console.log(`Procesando ${this.messageQueue.length} mensajes en cola`);
      
      for (const message of this.messageQueue) {
        this.socket.send(JSON.stringify(message));
      }
      
      this.messageQueue = [];
    }
  }
  
  on(event, handler) {
    if (!this.eventHandlers.has(event)) {
      this.eventHandlers.set(event, []);
    }
    
    this.eventHandlers.get(event).push(handler);
  }
  
  off(event, handler) {
    if (!this.eventHandlers.has(event)) return;
    
    if (handler) {
      const handlers = this.eventHandlers.get(event);
      const index = handlers.indexOf(handler);
      if (index !== -1) {
        handlers.splice(index, 1);
      }
    } else {
      this.eventHandlers.delete(event);
    }
  }
  
  emit(event, data) {
    if (this.eventHandlers.has(event)) {
      this.eventHandlers.get(event).forEach(handler => {
        handler(data);
      });
    }
  }
  
  close() {
    if (this.socket) {
      this.socket.close(1000, 'Cierre normal');
    }
  }
}
```

## API Reference

### WebSocket API Nativa

#### Constructor
```javascript
const socket = new WebSocket(url, [protocols]);
```

- **url**: La URL del servidor WebSocket (comienza con ws:// o wss://)
- **protocols** (opcional): Uno o más protocolos WebSocket

#### Propiedades

- **readyState**: Estado actual de la conexión
  - WebSocket.CONNECTING (0)
  - WebSocket.OPEN (1)
  - WebSocket.CLOSING (2)
  - WebSocket.CLOSED (3)
- **bufferedAmount**: Número de bytes en cola no enviados
- **extensions**: Extensiones seleccionadas por el servidor
- **protocol**: Protocolo seleccionado por el servidor
- **url**: URL usada para establecer la conexión

#### Métodos

- **socket.send(data)**: Envía datos al servidor
  - data puede ser: String, ArrayBuffer, Blob, o ArrayBufferView
- **socket.close([code], [reason])**: Cierra la conexión
  - code (opcional): Código de estado (valores permitidos: 1000 o 3000-4999)
  - reason (opcional): Razón del cierre (UTF-8, máx 123 bytes)

#### Eventos

- **open**: Conexión establecida
- **message**: Mensaje recibido del servidor
- **error**: Error en la comunicación
- **close**: Conexión cerrada

### Socket.IO API

#### Cliente

```javascript
// Importar librerías
import { io } from "socket.io-client";

// Crear conexión
const socket = io(url, options);

// Opciones comunes
const options = {
  transports: ['websocket', 'polling'],
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  timeout: 20000,
  auth: {
    token: "auth-token"
  }
};

// Eventos principales
socket.on("connect", () => {});
socket.on("disconnect", (reason) => {});
socket.on("connect_error", (error) => {});

// Enviar eventos
socket.emit(eventName, data, callback);

// Recibir eventos
socket.on(eventName, (data) => {});

// Una vez
socket.once(eventName, (data) => {});

// Espacios de nombres
const adminSocket = io("/admin");
const chatSocket = io("/chat");

// Salas
socket.join("room1");
socket.leave("room1");
socket.to("room1").emit("event", data);

// Desconexión
socket.disconnect();
```

#### Servidor

```javascript
// Importar librerías
const { Server } = require("socket.io");

// Crear servidor
const io = new Server(httpServer, options);

// Opciones comunes
const options = {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  },
  pingTimeout: 60000,
  pingInterval: 25000
};

// Middleware
io.use((socket, next) => {
  // Verificar autenticación, etc.
  next();
});

// Manejar conexiones
io.on("connection", (socket) => {
  // Información del socket
  console.log("ID:", socket.id);
  console.log("IP:", socket.handshake.address);
  
  // Eventos
  socket.on("eventName", (data, callback) => {
    // Procesar evento
    callback("Recibido");
  });
  
  // Salas
  socket.join("room1");
  socket.leave("room1");
  
  // Emitir eventos
  socket.emit("event", data);          // Al cliente actual
  socket.to("room1").emit("event", data); // A todos en room1 excepto el emisor
  io.to("room1").emit("event", data);     // A todos en room1
  io.emit("event", data);              // A todos los clientes
  
  // Desconexión
  socket.on("disconnect", (reason) => {});
});

// Namespaces
const adminIo = io.of("/admin");
adminIo.on("connection", (socket) => {});
```

## Ejemplos

### Chat en tiempo real

Este ejemplo implementa un chat simple en tiempo real con WebSockets.

#### Cliente

```javascript
// chat.js (cliente)
class ChatClient {
  constructor(serverUrl) {
    this.serverUrl = serverUrl;
    this.socket = null;
    this.username = null;
    this.currentRoom = null;
    
    // Referencias DOM
    this.messagesList = document.getElementById('messages');
    this.messageInput = document.getElementById('message-input');
    this.sendButton = document.getElementById('send-button');
    this.roomsList = document.getElementById('rooms-list');
    this.typingIndicator = document.getElementById('typing-indicator');
    
    // Inicializar eventos UI
    this.initUIEvents();
  }
  
  connect(username) {
    return new Promise((resolve, reject) => {
      this.username = username;
      this.socket = new WebSocket(`${this.serverUrl}?username=${encodeURIComponent(username)}`);
      
      // Configurar listeners de WebSocket
      this.socket.addEventListener('open', () => {
        console.log('Conectado al servidor de chat');
        this.initWebSocketEvents();
        resolve();
      });
      
      this.socket.addEventListener('error', (error) => {
        console.error('Error en la conexión:', error);
        reject(error);
      });
    });
  }
  
  initWebSocketEvents() {
    this.socket.addEventListener('message', (event) => {
      const data = JSON.parse(event.data);
      
      switch (data.type) {
        case 'message':
          this.displayMessage(data.username, data.content, data.timestamp);
          break;
          
        case 'user-joined':
          this.displaySystemMessage(`${data.username} se ha unido al chat`);
          break;
          
        case 'user-left':
          this.displaySystemMessage(`${data.username} ha abandonado el chat`);
          break;
          
        case 'room-list':
          this.updateRoomsList(data.rooms);
          break;
          
        case 'user-typing':
          this.showTypingIndicator(data.username, data.isTyping);
          break;
      }
    });
    
    this.socket.addEventListener('close', (event) => {
      this.displaySystemMessage(`Desconectado del servidor: ${event.reason}`);
    });
  }
  
  initUIEvents() {
    // Enviar mensaje
    this.sendButton.addEventListener('click', () => {
      this.sendMessage();
    });
    
    this.messageInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.sendMessage();
      }
      
      // Notificar escritura
      this.sendTypingStatus(true);
    });
    
    // Detección de cuándo el usuario deja de escribir
    let typingTimer;
    this.messageInput.addEventListener('keyup', () => {
      clearTimeout(typingTimer);
      typingTimer = setTimeout(() => {
        this.sendTypingStatus(false);
      }, 1000);
    });
    
    // Cambio de sala
    this.roomsList.addEventListener('click', (e) => {
      if (e.target.classList.contains('room-item')) {
        const roomName = e.target.dataset.room;
        this.joinRoom(roomName);
      }
    });
  }
  
  sendMessage() {
    const content = this.messageInput.value.trim();
    if (content && this.socket && this.socket.readyState === WebSocket.OPEN) {
      const message = {
        type: 'message',
        content,
        room: this.currentRoom
      };
      
      this.socket.send(JSON.stringify(message));
      this.messageInput.value = '';
      
      // Resetear indicador de escritura
      this.sendTypingStatus(false);
    }
  }
  
  sendTypingStatus(isTyping) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      const message = {
        type: 'typing',
        isTyping,
        room: this.currentRoom
      };
      
      this.socket.send(JSON.stringify(message));
    }
  }
  
  joinRoom(roomName) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      // Salir de la sala actual si existe
      if (this.currentRoom) {
        const leaveMessage = {
          type: 'leave-room',
          room: this.currentRoom
        };
        this.socket.send(JSON.stringify(leaveMessage));
      }
      
      // Unirse a la nueva sala
      const joinMessage = {
        type: 'join-room',
        room: roomName
      };
      
      this.socket.send(JSON.stringify(joinMessage));
      this.currentRoom = roomName;
      
      // Limpiar mensajes anteriores
      this.messagesList.innerHTML = '';
      this.displaySystemMessage(`Te has unido a: ${roomName}`);
      
      // Actualizar UI
      document.querySelectorAll('.room-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.room === roomName) {
          item.classList.add('active');
        }
      });
    }
  }
  
  displayMessage(username, content, timestamp) {
    const time = new Date(timestamp).toLocaleTimeString();
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    
    if (username === this.username) {
      messageElement.classList.add('own-message');
    }
    
    messageElement.innerHTML = `
      <span class="message-user">${username}</span>
      <span class="message-content">${this.escapeHTML(content)}</span>
      <span class="message-time">${time}</span>
    `;
    
    this.messagesList.appendChild(messageElement);
    this.scrollToBottom();
  }
  
  displaySystemMessage(content) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('system-message');
    messageElement.textContent = content;
    
    this.messagesList.appendChild(messageElement);
    this.scrollToBottom();
  }
  
  updateRoomsList(rooms) {
    this.roomsList.innerHTML = '';
    
    rooms.forEach(room => {
      const roomElement = document.createElement('div');
      roomElement.classList.add('room-item');
      roomElement.dataset.room = room.name;
      
      if (room.name === this.currentRoom) {
        roomElement.classList.add('active');
      }
      
      roomElement.innerHTML = `
        ${room.name} <span class="user-count">(${room.userCount})</span>
      `;
      
      this.roomsList.appendChild(roomElement);
    });
  }
  
  showTypingIndicator(username, isTyping) {
    if (username === this.username) return;
    
    if (isTyping) {
      this.typingIndicator.textContent = `${username} está escribiendo...`;
      this.typingIndicator.classList.add('active');
    } else {
      this.typingIndicator.classList.remove('active');
    }
  }
  
  scrollToBottom() {
    this.messagesList.scrollTop = this.messagesList.scrollHeight;
  }
  
  escapeHTML(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
  
  disconnect() {
    if (this.socket) {
      this.socket.close(1000, 'Cierre normal');
    }
  }
}

// Inicialización de la aplicación
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const chatContainer = document.getElementById('chat-container');
  
  const chat = new ChatClient('ws://localhost:8080');
  
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username-input').value.trim();
    
    if (username) {
      try {
        await chat.connect(username);
        
        // Mostrar chat y ocultar login
        loginForm.classList.add('hidden');
        chatContainer.classList.remove('hidden');
        
        // Unirse a sala por defecto
        chat.joinRoom('general');
      } catch (error) {
        alert('Error al conectar con el servidor de chat');
        console.error(error);
      }
    }
  });
  
  // Manejar cierre de ventana
  window.addEventListener('beforeunload', () => {
    chat.disconnect();
  });
});
```

#### Servidor 

```javascript
// chat-server.js
const WebSocket = require('ws');
const http = require('http');
const url = require('url');
const uuid = require('uuid').v4;

// Crear servidor HTTP
const server = http.createServer();

// Crear servidor WebSocket
const wss = new WebSocket.Server({ noServer: true });

// Estado del chat
const rooms = new Map();
const clients = new Map();

// Inicializar salas por defecto
['general', 'tecnología', 'random'].forEach(roomName => {
  rooms.set(roomName, { users: new Set() });
});

// Funciones auxiliares
function broadcastToRoom(roomName, message, exceptClient = null) {
  const room = rooms.get(roomName);
  if (!room) return;
  
  const messageStr = JSON.stringify(message);
  
  room.users.forEach(clientId => {
    const client = clients.get(clientId);
    if (client && client.ws !== exceptClient && client.ws.readyState === WebSocket.OPEN) {
      client.ws.send(messageStr);
    }
  });
}

function updateRoomsList() {
  const roomsInfo = Array.from(rooms.entries()).map(([name, room]) => ({
    name,
    userCount: room.users.size
  }));
  
  const message = {
    type: 'room-list',
    rooms: roomsInfo
  };
  
  const messageStr = JSON.stringify(message);
  
  clients.forEach(client => {
    if (client.ws.readyState === WebSocket.OPEN) {
      client.ws.send(messageStr);
    }
  });
}

// Gestión de conexiones HTTP upgrade
server.on('upgrade', (request, socket, head) => {
  const pathname = url.parse(request.url).pathname;
  
  // Verificar ruta
  if (pathname !== '/') {
    socket.write('HTTP/1.1 404 Not Found\r\n\r\n');
    socket.destroy();
    return;
  }
  
  // Extraer parámetros de la URL
  const { query } = url.parse(request.url, true);
  const username = query.username;
  
  if (!username) {
    socket.write('HTTP/1.1 400 Bad Request\r\n\r\n');
    socket.destroy();
    return;
  }
  
  // Continuar con el handshake WebSocket
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request, username);
  });
});

// Gestión de conexiones WebSocket
wss.on('connection', (ws, request, username) => {
  const clientId = uuid();
  
  // Registrar cliente
  clients.set(clientId, {
    ws,
    username,
    rooms: new Set()
  });
  
  console.log(`Usuario conectado: ${username} (${clientId})`);
  
  // Enviar lista de salas
  updateRoomsList();
  
  // Manejar mensajes
  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);
      
      switch (data.type) {
        case 'message':
          // Validar mensaje
          const content = data.content.trim();
          const roomName = data.room;
          
          if (!content || !roomName || !rooms.has(roomName)) break;
          
          // Verificar que el usuario está en la sala
          const client = clients.get(clientId);
          if (!client.rooms.has(roomName)) break;
          
          // Crear mensaje para difusión
          const messageData = {
            type: 'message',
            username: client.username,
            content,
            timestamp: Date.now()
          };
          
          // Enviar a todos en la sala (incluyendo al remitente)
          broadcastToRoom(roomName, messageData);
          break;
          
        case 'join-room':
          const roomToJoin = data.room;
          
          if (!roomToJoin || !rooms.has(roomToJoin)) break;
          
          const clientInfo = clients.get(clientId);
          
          // Añadir usuario a la sala
          rooms.get(roomToJoin).users.add(clientId);
          clientInfo.rooms.add(roomToJoin);
          
          // Notificar a la sala
          broadcastToRoom(roomToJoin, {
            type: 'user-joined',
            username: clientInfo.username,
            timestamp: Date.now()
          });
          
          // Actualizar lista de salas para todos
          updateRoomsList();
          break;
          
        case 'leave-room':
          const roomToLeave = data.room;
          
          if (!roomToLeave || !rooms.has(roomToLeave)) break;
          
          // Eliminar usuario de la sala
          rooms.get(roomToLeave).users.delete(clientId);
          clients.get(clientId).rooms.delete(roomToLeave);
          
          // Notificar a la sala
          broadcastToRoom(roomToLeave, {
            type: 'user-left',
            username: clients.get(clientId).username,
            timestamp: Date.now()
          });
          
          // Actualizar lista de salas para todos
          updateRoomsList();
          break;
          
        case 'typing':
          const typingRoom = data.room;
          const isTyping = data.isTyping;
          
          if (!typingRoom || !rooms.has(typingRoom)) break;
          
          // Notificar a otros en la sala
          broadcastToRoom(typingRoom, {
            type: 'user-typing',
            username: clients.get(clientId).username,
            isTyping
          }, ws);
          break;
      }
    } catch (error) {
      console.error('Error procesando mensaje:', error);
    }
  });
  
  // Manejar desconexión
  ws.on('close', () => {
    const client = clients.get(clientId);
    
    if (client) {
      // Salir de todas las salas
      client.rooms.forEach(roomName => {
        const room = rooms.get(roomName);
        if (room) {
          room.users.delete(clientId);
          
          // Notificar a la sala
          broadcastToRoom(roomName, {
            type: 'user-left',
            username: client.username,
            timestamp: Date.now()
          });
        }
      });
      
      // Eliminar cliente
      clients.delete(clientId);
      
      // Actualizar lista de salas para todos
      updateRoomsList();
      
      console.log(`Usuario desconectado: ${client.username} (${clientId})`);
    }
  });
});

// Iniciar servidor
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Servidor de chat iniciado en puerto ${PORT}`);
});
```

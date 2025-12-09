---
id: "16"
title: "Message Queues"
description: "Procesa tareas de forma asíncrona con colas de mensajes."
---

# Message Queues

Las colas de mensajes permiten procesamiento asíncrono y desacoplado.

## Casos de Uso

- Envío de emails
- Procesamiento de imágenes/videos
- Notificaciones push
- Sincronización de datos
- Tareas programadas

## RabbitMQ

```javascript
const amqp = require('amqplib');

// Productor
async function sendMessage(queue, message) {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  await channel.assertQueue(queue);
  channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
}

// Consumidor
async function consume(queue, handler) {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  await channel.assertQueue(queue);
  
  channel.consume(queue, async (msg) => {
    const data = JSON.parse(msg.content.toString());
    await handler(data);
    channel.ack(msg);
  });
}

// Uso
await sendMessage('emails', { to: 'user@email.com', subject: 'Bienvenido' });

consume('emails', async (data) => {
  await sendEmail(data.to, data.subject);
});
```

## Bull (Redis-based para Node.js)

```javascript
const Queue = require('bull');

const emailQueue = new Queue('emails', 'redis://localhost:6379');

// Agregar trabajo
await emailQueue.add({
  to: 'user@email.com',
  subject: 'Bienvenido'
});

// Procesar trabajos
emailQueue.process(async (job) => {
  await sendEmail(job.data.to, job.data.subject);
});
```

## Patrones

| Patrón | Descripción |
|--------|-------------|
| Work Queue | Un mensaje, un consumidor |
| Pub/Sub | Un mensaje, múltiples consumidores |
| Request/Reply | Comunicación bidireccional |

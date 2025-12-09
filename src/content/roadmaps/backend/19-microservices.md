---
id: "19"
title: "Microservicios"
description: "Arquitectura que divide aplicaciones en servicios pequeños e independientes."
---

# Microservicios

En lugar de un monolito, múltiples servicios pequeños que se comunican entre sí.

## Monolito vs Microservicios

| Monolito | Microservicios |
|----------|----------------|
| Un deployment | Múltiples deployments |
| Una base de datos | DB por servicio |
| Escalado vertical | Escalado horizontal |
| Simple al inicio | Complejo al inicio |
| Difícil a gran escala | Mejor a gran escala |

## Ejemplo de Arquitectura

```
┌─────────────┐     ┌─────────────┐
│   API       │     │   Auth      │
│   Gateway   │────>│   Service   │
└─────────────┘     └─────────────┘
       │
       ├──────────> ┌─────────────┐
       │            │   Users     │
       │            │   Service   │
       │            └─────────────┘
       │
       └──────────> ┌─────────────┐
                    │   Orders    │
                    │   Service   │
                    └─────────────┘
```

## Comunicación

### Síncrona (REST/gRPC)

```javascript
// Servicio A llama a Servicio B
const user = await fetch('http://users-service/users/1');
```

### Asíncrona (Message Queue)

```javascript
// Servicio A publica evento
await queue.publish('user.created', { userId: 1 });

// Servicio B consume evento
queue.subscribe('user.created', async (data) => {
  await sendWelcomeEmail(data.userId);
});
```

## Desafíos

- Complejidad operacional
- Debugging distribuido
- Consistencia eventual
- Network failures

## Cuándo usar

✅ Equipos grandes independientes
✅ Escalado selectivo de componentes
✅ Diferentes tecnologías por servicio

❌ Proyectos pequeños
❌ Equipos pequeños
❌ MVP/Prototipos

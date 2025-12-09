---
id: "1"
title: "Internet & HTTP"
description: "Fundamentos de cómo funciona Internet y el protocolo HTTP, base de toda comunicación web."
---

# Internet & HTTP

Antes de construir aplicaciones backend, es fundamental entender cómo funciona la comunicación en la web.

## Protocolo HTTP

HTTP (Hypertext Transfer Protocol) es el protocolo de comunicación entre clientes y servidores.

### Métodos HTTP

| Método | Descripción | Uso |
|--------|-------------|-----|
| GET | Obtener recursos | Leer datos |
| POST | Crear recursos | Enviar datos |
| PUT | Actualizar recursos | Reemplazar completamente |
| PATCH | Modificar parcialmente | Actualización parcial |
| DELETE | Eliminar recursos | Borrar datos |

### Códigos de Estado

- **2xx**: Éxito (200 OK, 201 Created, 204 No Content)
- **3xx**: Redirección (301 Moved, 304 Not Modified)
- **4xx**: Error del cliente (400 Bad Request, 401 Unauthorized, 404 Not Found)
- **5xx**: Error del servidor (500 Internal Error, 503 Service Unavailable)

## Headers HTTP

```http
Content-Type: application/json
Authorization: Bearer token123
Cache-Control: max-age=3600
```

## HTTPS

HTTPS añade una capa de seguridad SSL/TLS para encriptar la comunicación.

## Recursos

- [MDN HTTP Guide](https://developer.mozilla.org/en-US/docs/Web/HTTP)
- [HTTP Status Codes](https://httpstatuses.com/)

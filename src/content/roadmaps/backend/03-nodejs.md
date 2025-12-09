---
id: "3"
title: "Node.js"
description: "Runtime de JavaScript para el servidor, basado en el motor V8 de Chrome."
---

# Node.js

Node.js permite ejecutar JavaScript fuera del navegador, en el servidor.

## Características Principales

- **Event Loop**: Modelo asíncrono y no bloqueante
- **Single Thread**: Un hilo principal con workers para tareas pesadas
- **npm**: El gestor de paquetes más grande del mundo

## Ejemplo Básico

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'Hola desde Node.js!' }));
});

server.listen(3000, () => {
  console.log('Servidor en http://localhost:3000');
});
```

## Módulos Esenciales

- **fs**: Sistema de archivos
- **path**: Manejo de rutas
- **http/https**: Servidores web
- **events**: Emisores de eventos
- **crypto**: Criptografía

## Async/Await

```javascript
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}
```

## Recursos

- [Documentación Oficial](https://nodejs.org/docs)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)

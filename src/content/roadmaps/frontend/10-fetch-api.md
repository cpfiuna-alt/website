---
id: "10"
title: "Fetch API / AJAX"
description: "La Fetch API proporciona una interfaz moderna para hacer solicitudes HTTP a servidores."
---

# Fetch API y AJAX

AJAX (JavaScript Asíncrono y XML) permite que las páginas web se actualicen de forma asíncrona intercambiando datos con un servidor. La Fetch API es la forma moderna de hacer solicitudes HTTP.

## Fetch Básico

```javascript
fetch("https://api.ejemplo.com/datos")
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error("Error:", error));
```

## Sintaxis Async/Await

```javascript
async function obtenerDatos() {
  try {
    const response = await fetch("https://api.ejemplo.com/datos");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
}
```

## Solicitud POST

```javascript
const crearPost = async (datosPost) => {
  const response = await fetch("/api/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datosPost),
  });
  return response.json();
};
```

## Manejo de Respuestas

```javascript
const response = await fetch(url);

// Verificar estado
if (!response.ok) {
  throw new Error(`¡Error HTTP! Estado: ${response.status}`);
}

// Parsear respuesta
const json = await response.json();
const texto = await response.text();
const blob = await response.blob();
```

## Headers de Solicitud

```javascript
const headers = new Headers({
  "Authorization": "Bearer token123",
  "Content-Type": "application/json"
});

fetch(url, { headers });
```

## Manejo de Errores

Siempre maneja tanto errores de red como errores HTTP correctamente para una aplicación robusta.

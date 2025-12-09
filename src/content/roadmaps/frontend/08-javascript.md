---
id: "8"
title: "JavaScript"
description: "JavaScript es el lenguaje de programación de la web, que permite crear páginas web interactivas y dinámicas."
---

# JavaScript

JavaScript es el lenguaje de programación esencial para el desarrollo web, que se ejecuta en todos los navegadores.

## Conceptos Básicos

### Variables
```javascript
let nombre = "Juan";       // Mutable
const edad = 30;           // Inmutable
var legacy = "forma vieja";  // Evitar
```

### Tipos de Datos
- **Primitivos**: string, number, boolean, null, undefined, symbol, bigint
- **Objetos**: arrays, funciones, objetos, fechas

### Funciones
```javascript
// Declaración de función
function saludar(nombre) {
  return `¡Hola, ${nombre}!`;
}

// Función flecha
const saludar = (nombre) => `¡Hola, ${nombre}!`;
```

### Flujo de Control
```javascript
if (condicion) {
  // código
} else if (otraCondicion) {
  // código
} else {
  // código
}

for (let i = 0; i < 10; i++) {
  console.log(i);
}
```

### Arrays
```javascript
const frutas = ["manzana", "banana", "naranja"];
frutas.push("uva");
frutas.map(fruta => fruta.toUpperCase());
frutas.filter(fruta => fruta.length > 5);
```

### Objetos
```javascript
const persona = {
  nombre: "Juan",
  edad: 30,
  saludar() {
    return `Hola, soy ${this.nombre}`;
  }
};
```

## ¿Qué Sigue?

Después de aprender los fundamentos de JavaScript, profundiza en manipulación del DOM, programación asíncrona y características ES6+.

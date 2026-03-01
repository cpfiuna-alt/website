---
id: "11"
title: "Características ES6+"
description: "Características modernas de JavaScript introducidas en ES6 (2015) y versiones posteriores."
---

# Características ES6+

ECMAScript 6 (ES2015) y versiones posteriores introdujeron características poderosas que modernizaron JavaScript.

## Let y Const
```javascript
let mutable = "puede cambiar";
const inmutable = "no se puede reasignar";
```

## Funciones Flecha
```javascript
const sumar = (a, b) => a + b;
const saludar = nombre => `Hola, ${nombre}`;
```

## Template Literals
```javascript
const nombre = "Mundo";
const saludo = `¡Hola, ${nombre}!`;
const multiLinea = `
  Línea 1
  Línea 2
`;
```

## Destructuring
```javascript
// Objetos
const { nombre, edad } = persona;
const { nombre: nombrePersona } = persona; // Renombrar

// Arrays
const [primero, segundo, ...resto] = array;
```

## Operador Spread
```javascript
const nuevoArray = [...arrayAnterior, nuevoElemento];
const nuevoObjeto = { ...objetoAnterior, nuevaPropiedad: valor };
```

## Módulos
```javascript
// Exportar
export const helper = () => {};
export default ComponentePrincipal;

// Importar
import ComponentePrincipal, { helper } from "./modulo";
```

## Promesas y Async/Await
```javascript
const obtenerDatos = async () => {
  const resultado = await algunaOperacionAsincrona();
  return resultado;
};
```

## Optional Chaining y Nullish Coalescing
```javascript
const valor = obj?.propiedad?.anidada;
const valorPorDefecto = valor ?? "default";
```

## Métodos de Array
```javascript
array.map(x => x * 2);
array.filter(x => x > 5);
array.find(x => x.id === 1);
array.reduce((acc, x) => acc + x, 0);
```

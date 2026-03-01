---
id: 1
title: "Introducción a React: Tu primera aplicación web moderna"
excerpt: "Aprende los fundamentos de React.js y crea tu primera aplicación interactiva desde cero. Una guía completa para principiantes."
date: "2024-01-15"
author: "Gabriel Park"
readTime: "12 min"
tags: ["React", "JavaScript", "Frontend", "Web Development"]
image: "/images/blog/react-intro.jpg"
slug: "introduccion-a-react"
---

# Introducción a React: Tu primera aplicación web moderna

## ¿Qué es React?

React es una biblioteca de JavaScript desarrollada por Facebook para construir interfaces de usuario interactivas y dinámicas. Su enfoque basado en componentes y su modelo de programación declarativa lo han convertido en una de las herramientas más populares para el desarrollo frontend.

## ¿Por qué React?

### Componentes reutilizables
React te permite crear componentes que puedes usar en múltiples partes de tu aplicación, lo que hace que tu código sea más modular y mantenible.

### Virtual DOM
React utiliza un Virtual DOM que optimiza las actualizaciones de la interfaz, resultando en una mejor performance.

### Ecosistema robusto
Con una gran comunidad y un ecosistema maduro, React ofrece soluciones para casi cualquier necesidad de desarrollo.

## Tu primera aplicación React

### Configuración del entorno

```bash
# Instalar Node.js y npm
npm install -g create-react-app

# Crear una nueva aplicación React
npx create-react-app mi-primera-app
cd mi-primera-app
npm start
```

### Estructura del proyecto

Una vez creado el proyecto, verás una estructura similar a esta:

```
mi-primera-app/
├── public/
├── src/
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

### Tu primer componente

```jsx
import React from 'react';

function Saludo({ nombre }) {
  return (
    <div>
      <h1>¡Hola, {nombre}!</h1>
      <p>Bienvenido a React</p>
    </div>
  );
}

export default Saludo;
```

## Conceptos fundamentales

### JSX
JSX es una extensión de sintaxis para JavaScript que permite escribir elementos HTML dentro de JavaScript:

```jsx
const elemento = <h1>¡Hola, mundo!</h1>;
```

### Props
Las props son la forma de pasar datos de un componente padre a un componente hijo:

```jsx
function App() {
  return <Saludo nombre="David" />;
}
```

### Estado (State)
El estado permite que los componentes mantengan y actualicen información:

```jsx
import React, { useState } from 'react';

function Contador() {
  const [contador, setContador] = useState(0);

  return (
    <div>
      <p>Contador: {contador}</p>
      <button onClick={() => setContador(contador + 1)}>
        Incrementar
      </button>
    </div>
  );
}
```

## Hooks básicos

### useState
Para manejar estado en componentes funcionales:

```jsx
const [estado, setEstado] = useState(valorInicial);
```

### useEffect
Para efectos secundarios como llamadas a APIs:

```jsx
import React, { useEffect } from 'react';

function MiComponente() {
  useEffect(() => {
    // Código que se ejecuta después del render
    console.log('Componente montado');
  }, []);

  return <div>Mi componente</div>;
}
```

## Proyecto práctico: Lista de tareas

Vamos a crear una aplicación simple de lista de tareas:

```jsx
import React, { useState } from 'react';

function ListaTareas() {
  const [tareas, setTareas] = useState([]);
  const [nuevaTarea, setNuevaTarea] = useState('');

  const agregarTarea = () => {
    if (nuevaTarea.trim()) {
      setTareas([...tareas, {
        id: Date.now(),
        texto: nuevaTarea,
        completada: false
      }]);
      setNuevaTarea('');
    }
  };

  const toggleTarea = (id) => {
    setTareas(tareas.map(tarea =>
      tarea.id === id
        ? { ...tarea, completada: !tarea.completada }
        : tarea
    ));
  };

  return (
    <div>
      <h1>Mi Lista de Tareas</h1>
      <div>
        <input
          type="text"
          value={nuevaTarea}
          onChange={(e) => setNuevaTarea(e.target.value)}
          placeholder="Escribe una nueva tarea"
        />
        <button onClick={agregarTarea}>Agregar</button>
      </div>
      <ul>
        {tareas.map(tarea => (
          <li key={tarea.id}>
            <input
              type="checkbox"
              checked={tarea.completada}
              onChange={() => toggleTarea(tarea.id)}
            />
            <span style={{
              textDecoration: tarea.completada ? 'line-through' : 'none'
            }}>
              {tarea.texto}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaTareas;
```

## Próximos pasos

Ahora que tienes los fundamentos de React, puedes continuar aprendiendo sobre:

- **React Router** para navegación entre páginas
- **Context API** para manejo de estado global
- **Hooks personalizados** para lógica reutilizable
- **Testing** con React Testing Library
- **Deployment** en plataformas como Vercel o Netlify

## Conclusión

React es una herramienta poderosa que puede parecer abrumadora al principio, pero con práctica y paciencia, pronto estarás creando aplicaciones web increíbles. La clave está en entender los conceptos fundamentales y practicar regularmente.

¡Bienvenido al mundo de React!

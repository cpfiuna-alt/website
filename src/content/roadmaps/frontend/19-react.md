---
id: "19"
title: "React"
description: "React es una librería JavaScript para construir interfaces de usuario con una arquitectura basada en componentes."
---

# React

React es la librería JavaScript más popular para construir interfaces de usuario, creada por Meta.

## Conceptos Fundamentales

### Componentes
```jsx
function Bienvenida({ nombre }) {
  return <h1>¡Hola, {nombre}!</h1>;
}

// Uso
<Bienvenida nombre="Mundo" />
```

### JSX
```jsx
const elemento = (
  <div className="tarjeta">
    <h1>{titulo}</h1>
    <p>{descripcion}</p>
  </div>
);
```

### Estado con Hooks
```jsx
import { useState } from 'react';

function Contador() {
  const [cuenta, setCuenta] = useState(0);
  
  return (
    <button onClick={() => setCuenta(cuenta + 1)}>
      Cuenta: {cuenta}
    </button>
  );
}
```

### Efectos
```jsx
import { useEffect } from 'react';

useEffect(() => {
  // Se ejecuta al montar y cuando cambian las dependencias
  obtenerDatos();
  
  return () => {
    // Limpieza al desmontar
  };
}, [dependencia]);
```

### Props
```jsx
function Tarjeta({ titulo, children }) {
  return (
    <div className="tarjeta">
      <h2>{titulo}</h2>
      {children}
    </div>
  );
}
```

## Ecosistema Clave

- **Routing**: React Router
- **Estado**: Zustand, Redux, Jotai
- **Fetching de Datos**: TanStack Query, SWR
- **Formularios**: React Hook Form
- **UI**: shadcn/ui, Radix UI

## Aprende Más

- Documentación oficial: react.dev
- React Router
- Patrones de gestión de estado
- Server components (React 19+)

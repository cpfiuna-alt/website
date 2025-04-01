
---
title: "React Hooks: Guía Completa"
description: "Explicación detallada de los React Hooks y cómo utilizarlos efectivamente"
category: "Guías"
order: 3
author: "Ana Martínez"
updatedAt: "2023-12-15"
readTime: "15 min"
githubUrl: "https://github.com/clubprogramacion/docs/react-hooks"
tags: ["React", "JavaScript", "Frontend"]
resources: [
  { 
    "title": "Documentación oficial de React Hooks", 
    "url": "https://es.reactjs.org/docs/hooks-intro.html" 
  },
  { 
    "title": "Repositorio de ejemplos de React Hooks", 
    "url": "https://github.com/examples/react-hooks" 
  },
  { 
    "title": "Curso completo de React Hooks", 
    "url": "https://curso-hooks.fiuna.edu" 
  }
]
---

# React Hooks: Guía Completa

Los Hooks son una API añadida en React 16.8 que permite usar estado y otras características de React sin escribir una clase. En esta guía, exploraremos en profundidad los diferentes Hooks que ofrece React, cuándo y cómo usarlos, y las mejores prácticas para cada caso.

## Introducción a los Hooks

Los Hooks resuelven problemas concretos en React. Antes de los Hooks, tenías que usar clases para definir componentes con estado o efectos secundarios. Esto podía volver el código difícil de reutilizar y mantener. Los Hooks permiten:

- Extraer lógica de estado de los componentes
- Reutilizar lógica sin cambiar la jerarquía de componentes
- Usar funciones en lugar de clases para todos los casos de uso

### Reglas de los Hooks

Para usar Hooks correctamente, hay que seguir dos reglas:

1. **Solo llamar Hooks en el nivel superior**: No llames a Hooks dentro de bucles, condiciones o funciones anidadas.
2. **Solo llamar Hooks desde componentes de función de React**: No llames a Hooks desde funciones regulares JavaScript (excepciones: llamar desde Hooks personalizados).

## Hooks Básicos

### useState

El Hook `useState` permite añadir estado a tus componentes de función.

```jsx
import React, { useState } from 'react';

function Counter() {
  // Declara una variable de estado "count" con valor inicial 0
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Has hecho clic {count} veces</p>
      <button onClick={() => setCount(count + 1)}>
        Haz clic
      </button>
    </div>
  );
}
```

#### Consideraciones importantes:

- La función `useState` retorna un par: el valor del estado actual y una función para actualizarlo.
- Puedes usar `useState` múltiples veces en un componente.
- El valor inicial se usa solo en el primer render.

### useEffect

El Hook `useEffect` te permite realizar efectos secundarios en componentes de función.

```jsx
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // Similar a componentDidMount y componentDidUpdate
  useEffect(() => {
    // Actualiza el título del documento usando la API del navegador
    document.title = `Has hecho clic ${count} veces`;
    
    // Función de limpieza (opcional)
    return () => {
      document.title = 'React App';
    };
  }, [count]); // Solo se re-ejecuta si count cambia

  return (
    <div>
      <p>Has hecho clic {count} veces</p>
      <button onClick={() => setCount(count + 1)}>
        Haz clic
      </button>
    </div>
  );
}
```

#### Casos de uso:

- Obtener datos (data fetching)
- Establecer suscripciones (subscriptions)
- Cambiar manualmente el DOM
- Registrar y eliminar event listeners

#### El array de dependencias:

- **Array vacío `[]`**: El efecto solo se ejecuta después del primer render y limpia al desmontar.
- **Con dependencias `[a, b]`**: El efecto se ejecuta cuando alguna dependencia cambia.
- **Sin array**: El efecto se ejecuta después de cada render.

### useContext

`useContext` permite consumir un Context de React sin componentes anidados.

```jsx
import React, { useContext } from 'react';

const ThemeContext = React.createContext('light');

function ThemedButton() {
  const theme = useContext(ThemeContext);
  
  return (
    <button className={`button-${theme}`}>
      Botón con tema {theme}
    </button>
  );
}
```

## Hooks Adicionales

### useReducer

`useReducer` es una alternativa a `useState` para estados complejos.

```jsx
import React, { useReducer } from 'react';

// Reducer
function counterReducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });
  
  return (
    <div>
      <p>Contador: {state.count}</p>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
    </div>
  );
}
```

### useCallback

`useCallback` devuelve una versión memorizada de una función.

```jsx
import React, { useState, useCallback } from 'react';

function ParentComponent() {
  const [count, setCount] = useState(0);
  
  // La función no se recrea a menos que count cambie
  const increment = useCallback(() => {
    setCount(c => c + 1);
  }, []);
  
  return (
    <div>
      <p>Count: {count}</p>
      <ChildComponent onIncrement={increment} />
    </div>
  );
}
```

### useMemo

`useMemo` memoriza el resultado de un cálculo.

```jsx
import React, { useMemo, useState } from 'react';

function ExpensiveCalculation({ list, filter }) {
  // El resultado se memoriza y solo se recalcula cuando list o filter cambian
  const filteredList = useMemo(() => {
    console.log('Filtrando lista...');
    return list.filter(item => item.includes(filter));
  }, [list, filter]);
  
  return (
    <ul>
      {filteredList.map(item => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
```

## Hooks Personalizados

Los Hooks personalizados son el mecanismo para reutilizar lógica con estado entre componentes.

```jsx
import { useState, useEffect } from 'react';

// Hook personalizado para gestionar el tamaño de la ventana
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return windowSize;
}

// Uso del Hook personalizado
function ResponsiveComponent() {
  const { width, height } = useWindowSize();
  
  return (
    <div>
      <p>Ancho de ventana: {width}px</p>
      <p>Alto de ventana: {height}px</p>
    </div>
  );
}
```

## Guía

### Patrones comunes con Hooks

#### Extraer lógica con Hooks personalizados

Los Hooks personalizados son la forma recomendada de extraer lógica de componentes:

```jsx
// Custom hook para formularios
function useFormInput(initialValue) {
  const [value, setValue] = useState(initialValue);
  
  function handleChange(e) {
    setValue(e.target.value);
  }
  
  return {
    value,
    onChange: handleChange
  };
}

// Uso del hook
function LoginForm() {
  const username = useFormInput('');
  const password = useFormInput('');
  
  function handleSubmit(e) {
    e.preventDefault();
    console.log(username.value, password.value);
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Usuario" 
        {...username} 
      />
      <input 
        type="password" 
        placeholder="Contraseña" 
        {...password} 
      />
      <button type="submit">Iniciar sesión</button>
    </form>
  );
}
```

#### Gestión de la carga de datos con useEffect

```jsx
function DataFetcher({ resourceType }) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    
    fetch(`https://api.example.com/${resourceType}`)
      .then(response => response.json())
      .then(data => {
        if (isMounted) {
          setData(data);
          setIsLoading(false);
        }
      })
      .catch(error => {
        if (isMounted) {
          setError(error);
          setIsLoading(false);
        }
      });
      
    return () => {
      isMounted = false;
    };
  }, [resourceType]);

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div>
      {/* Renderizar datos */}
    </div>
  );
}
```

### Buenas prácticas

1. **Nombres de Hooks**: Comienza siempre con "use" para que React pueda verificar si sigues las reglas.
2. **Organización del código**: Mantén los Hooks relacionados juntos.
3. **Evita lógica compleja dentro de componentes**: Extráela a Hooks personalizados.
4. **Cuidado con la lista de dependencias**: Asegúrate de incluir todas las variables que el Hook utiliza.
5. **Evita actualizaciones circulares**: Ten cuidado con efectos que modifican el estado del que dependen.

## API Reference

### useState

```jsx
const [state, setState] = useState(initialState);
```

**Parámetros:**
- `initialState`: El estado inicial. Puede ser un valor o una función que devuelva un valor.

**Retorna:**
- Un array con dos elementos:
  1. El valor actual del estado
  2. Una función para actualizar el estado

### useEffect

```jsx
useEffect(didUpdate, dependencies);
```

**Parámetros:**
- `didUpdate`: Función que contiene código con efectos.
- `dependencies`: (Opcional) Array de valores de los que depende el efecto.

**Comportamiento:**
- Se ejecuta después de cada renderizado (por defecto)
- Puede devolver una función de limpieza

### useContext

```jsx
const value = useContext(MyContext);
```

**Parámetros:**
- `MyContext`: El objeto de contexto creado con `React.createContext`.

**Retorna:**
- El valor actual del contexto.

### useReducer

```jsx
const [state, dispatch] = useReducer(reducer, initialArg, init);
```

**Parámetros:**
- `reducer`: Función (state, action) => newState
- `initialArg`: Argumento para la función de inicialización (o estado inicial)
- `init`: (Opcional) Función para calcular el estado inicial

**Retorna:**
- El estado actual y una función dispatch para enviar acciones

### useCallback

```jsx
const memoizedCallback = useCallback(callback, dependencies);
```

**Parámetros:**
- `callback`: Función a memorizar
- `dependencies`: Array de dependencias

**Retorna:**
- Una versión memorizada de la función que solo cambia si una dependencia cambia

### useMemo

```jsx
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

**Parámetros:**
- `createValue`: Función que crea el valor a memorizar
- `dependencies`: Array de dependencias

**Retorna:**
- Un valor memorizado que solo cambia si una dependencia cambia

## Ejemplos

### Formulario con validación

```jsx
import React, { useState, useCallback } from 'react';

function SignupForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  
  const validateForm = useCallback(() => {
    const newErrors = {};
    
    // Validar nombre de usuario
    if (!formData.username.trim()) {
      newErrors.username = 'El nombre de usuario es obligatorio';
    } else if (formData.username.length < 4) {
      newErrors.username = 'El nombre de usuario debe tener al menos 4 caracteres';
    }
    
    // Validar email
    if (!formData.email) {
      newErrors.email = 'El email es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    
    // Validar contraseña
    if (!formData.password) {
      newErrors.password = 'La contraseña es obligatoria';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }
    
    // Validar confirmación
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);
  
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);
  
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Formulario enviado:', formData);
      // Aquí iría la lógica para enviar los datos al servidor
    }
  }, [formData, validateForm]);
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Usuario</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
        />
        {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
      </div>
      
      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
      </div>
      
      <div>
        <label className="block text-sm font-medium">Contraseña</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
        />
        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
      </div>
      
      <div>
        <label className="block text-sm font-medium">Confirmar Contraseña</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
        />
        {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
      </div>
      
      <button 
        type="submit" 
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Registrarse
      </button>
    </form>
  );
}
```

### Contador con useReducer

```jsx
import React, { useReducer } from 'react';

// Acciones
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';
const RESET = 'RESET';
const SET_VALUE = 'SET_VALUE';

// Reducer
function counterReducer(state, action) {
  switch (action.type) {
    case INCREMENT:
      return { ...state, count: state.count + (action.payload || 1) };
    case DECREMENT:
      return { ...state, count: state.count - (action.payload || 1) };
    case RESET:
      return { ...state, count: 0 };
    case SET_VALUE:
      return { ...state, count: action.payload };
    default:
      return state;
  }
}

// Componente
function AdvancedCounter() {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });
  
  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Contador: {state.count}</h2>
      
      <div className="flex space-x-2">
        <button 
          onClick={() => dispatch({ type: DECREMENT })}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Decrementar
        </button>
        
        <button 
          onClick={() => dispatch({ type: RESET })}
          className="px-4 py-2 bg-gray-500 text-white rounded"
        >
          Reiniciar
        </button>
        
        <button 
          onClick={() => dispatch({ type: INCREMENT })}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Incrementar
        </button>
      </div>
      
      <div className="mt-4">
        <button 
          onClick={() => dispatch({ type: INCREMENT, payload: 5 })}
          className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
        >
          +5
        </button>
        
        <button 
          onClick={() => dispatch({ type: DECREMENT, payload: 5 })}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          -5
        </button>
      </div>
      
      <div className="mt-4">
        <input 
          type="number" 
          className="border p-2 rounded"
          placeholder="Establecer valor"
          onChange={(e) => dispatch({ 
            type: SET_VALUE, 
            payload: Number(e.target.value) 
          })}
        />
      </div>
    </div>
  );
}
```

### Hook personalizado para almacenamiento local

```jsx
import { useState, useEffect } from 'react';

// Hook personalizado para persistencia en localStorage
function useLocalStorage(key, initialValue) {
  // Obtener el valor inicial del localStorage o usar el valor proporcionado
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      // Convertir de JSON si existe, o devolver initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  // Función para actualizar el valor en estado y localStorage
  const setValue = (value) => {
    try {
      // Permitir que value sea una función como en setState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      
      // Guardar en estado
      setStoredValue(valueToStore);
      
      // Guardar en localStorage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  // Efecto para sincronizar con otros tabs/ventanas
  useEffect(() => {
    function handleStorageChange(event) {
      if (event.key === key) {
        try {
          setStoredValue(JSON.parse(event.newValue));
        } catch (error) {
          console.error(error);
        }
      }
    }
    
    // Escuchar cambios en el localStorage
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key]);

  return [storedValue, setValue];
}

// Uso del hook
function Settings() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  const [fontSize, setFontSize] = useLocalStorage('fontSize', 16);
  
  return (
    <div>
      <h2>Configuración</h2>
      
      <div>
        <label>Tema: </label>
        <select 
          value={theme} 
          onChange={(e) => setTheme(e.target.value)}
        >
          <option value="light">Claro</option>
          <option value="dark">Oscuro</option>
          <option value="system">Sistema</option>
        </select>
      </div>
      
      <div>
        <label>Tamaño de fuente: </label>
        <input 
          type="range" 
          min="12" 
          max="24" 
          value={fontSize} 
          onChange={(e) => setFontSize(Number(e.target.value))} 
        />
        <span>{fontSize}px</span>
      </div>
    </div>
  );
}
```

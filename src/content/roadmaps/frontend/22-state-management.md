---
id: "22"
title: "Gestión de Estado"
description: "Las soluciones de gestión de estado ayudan a manejar el estado complejo de la aplicación entre componentes."
---

# Gestión de Estado

A medida que las aplicaciones crecen, gestionar el estado entre componentes se vuelve desafiante. Las librerías de gestión de estado proporcionan patrones y herramientas para manejar esta complejidad.

## Estado Local vs Global

- **Estado Local**: Específico del componente (inputs de formulario, toggles de UI)
- **Estado Global**: Compartido entre componentes (datos de usuario, tema)

## Soluciones de Estado en React

### Zustand
```javascript
import { create } from 'zustand';

const useStore = create((set) => ({
  cuenta: 0,
  incrementar: () => set((state) => ({ cuenta: state.cuenta + 1 })),
}));

// Uso
const { cuenta, incrementar } = useStore();
```

### Redux Toolkit
```javascript
import { createSlice, configureStore } from '@reduxjs/toolkit';

const contadorSlice = createSlice({
  name: 'contador',
  initialState: { valor: 0 },
  reducers: {
    incrementar: (state) => { state.valor += 1; },
  },
});

const store = configureStore({ reducer: contadorSlice.reducer });
```

### Context API
```jsx
const TemaContext = React.createContext('claro');

<TemaContext.Provider value="oscuro">
  <App />
</TemaContext.Provider>

// Consumidor
const tema = useContext(TemaContext);
```

## Estado en Vue: Pinia
```javascript
import { defineStore } from 'pinia';

export const useContadorStore = defineStore('contador', {
  state: () => ({ cuenta: 0 }),
  actions: {
    incrementar() { this.cuenta++; },
  },
});
```

## Cuándo Usar

- Cuando el prop drilling se vuelve inmanejable
- Compartir estado entre componentes no relacionados
- Lógica de estado compleja
- Necesidad de debugging con viaje en el tiempo

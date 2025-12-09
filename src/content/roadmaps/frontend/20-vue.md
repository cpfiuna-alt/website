---
id: "20"
title: "Vue"
description: "Vue es un framework JavaScript progresivo para construir interfaces de usuario."
---

# Vue.js

Vue es un framework JavaScript progresivo conocido por su curva de aprendizaje suave y excelente documentación.

## Conceptos Fundamentales

### Single File Components
```vue
<script setup>
import { ref } from 'vue';

const cuenta = ref(0);
const incrementar = () => cuenta.value++;
</script>

<template>
  <button @click="incrementar">
    Cuenta: {{ cuenta }}
  </button>
</template>

<style scoped>
button {
  padding: 1rem;
}
</style>
```

### Reactividad
```javascript
import { ref, computed, watch } from 'vue';

const cuenta = ref(0);
const doble = computed(() => cuenta.value * 2);

watch(cuenta, (nuevoValor) => {
  console.log('Cuenta cambió:', nuevoValor);
});
```

### Sintaxis de Template
```vue
<template>
  <!-- Condicionales -->
  <div v-if="mostrar">Visible</div>
  <div v-else>Oculto</div>
  
  <!-- Bucles -->
  <li v-for="item in items" :key="item.id">
    {{ item.nombre }}
  </li>
  
  <!-- Manejo de eventos -->
  <button @click="manejarClick">Clic</button>
  
  <!-- Binding bidireccional -->
  <input v-model="mensaje" />
</template>
```

## Características Clave

1. **Composition API**: API moderna y flexible
2. **Options API**: Tradicional, más fácil para principiantes
3. **Single File Components**: HTML, JS, CSS en un archivo
4. **Excelentes DevTools**: Extensión Vue DevTools

## Ecosistema

- **Routing**: Vue Router
- **Estado**: Pinia
- **SSR**: Nuxt.js
- **UI**: Vuetify, PrimeVue

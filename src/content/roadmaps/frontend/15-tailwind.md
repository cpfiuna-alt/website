---
id: "15"
title: "Tailwind CSS"
description: "Tailwind CSS es un framework CSS utility-first para construir diseños personalizados rápidamente."
---

# Tailwind CSS

Tailwind CSS es un framework CSS utility-first que proporciona clases de utilidad de bajo nivel para construir diseños personalizados.

## Conceptos Principales

### Clases de Utilidad
```html
<div class="flex items-center justify-between p-4 bg-blue-500 text-white rounded-lg">
  <h1 class="text-xl font-bold">Título</h1>
  <button class="px-4 py-2 bg-white text-blue-500 rounded">Clic</button>
</div>
```

### Diseño Responsivo
```html
<div class="w-full md:w-1/2 lg:w-1/3">
  <!-- Ancho completo en móvil, mitad en tablet, tercio en escritorio -->
</div>
```

### Hover y Estados
```html
<button class="bg-blue-500 hover:bg-blue-700 focus:ring-2 active:bg-blue-800">
  Botón
</button>
```

### Modo Oscuro
```html
<div class="bg-white dark:bg-gray-800 text-black dark:text-white">
  Contenido
</div>
```

## Personalización

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#3490dc',
      },
      spacing: {
        '128': '32rem',
      }
    }
  }
}
```

## Ventajas

1. **Desarrollo rápido**: Sin cambiar entre archivos CSS
2. **Diseño consistente**: Sistema de diseño predefinido
3. **Tamaño de bundle pequeño**: Purga CSS no usado
4. **Responsivo**: Breakpoints mobile-first integrados
5. **Personalizable**: Extiende o sobrescribe valores fácilmente

## Cuándo Usar

- Prototipado rápido
- Aplicaciones basadas en componentes
- Cuando quieres estilos consistentes y sistemáticos

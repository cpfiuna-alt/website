---
id: "5"
title: "Accesibilidad (a11y)"
description: "La accesibilidad web asegura que los sitios web y aplicaciones sean utilizables por todos, incluyendo personas con discapacidades."
---

# Accesibilidad Web (a11y)

Accesibilidad significa hacer tu sitio web utilizable por la mayor cantidad de personas posible, incluyendo aquellas con discapacidades.

## Principios Clave (POUR)

1. **Perceptible**: La información debe ser presentable de formas que los usuarios puedan percibir
2. **Operable**: Los componentes de la UI deben ser operables por todos los usuarios
3. **Comprensible**: El contenido y la UI deben ser comprensibles
4. **Robusto**: El contenido debe funcionar con varias tecnologías de asistencia

## Prácticas Esenciales

### Imágenes
```html
<img src="foto.jpg" alt="Descripción de la imagen">
```

### Formularios
```html
<label for="email">Email:</label>
<input type="email" id="email" name="email" required>
```

### Navegación por Teclado
- Asegúrate de que todos los elementos interactivos sean enfocables
- Usa `tabindex` apropiadamente
- Indicadores de foco visibles

### Atributos ARIA
```html
<button aria-expanded="false" aria-controls="menu">
  Menú
</button>
```

## Herramientas de Prueba

- Lectores de pantalla (NVDA, VoiceOver)
- Auditoría de accesibilidad Lighthouse
- Extensión de navegador axe DevTools
- Pruebas de navegación solo con teclado

## Problemas Comunes a Evitar

- Texto alternativo faltante en imágenes
- Bajo contraste de colores
- Etiquetas de formulario faltantes
- Componentes personalizados inaccesibles
- Enlaces de salto faltantes

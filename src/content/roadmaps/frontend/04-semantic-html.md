---
id: "4"
title: "HTML Semántico"
description: "El HTML semántico utiliza etiquetas con significado para describir la estructura y contenido de las páginas web."
---

# HTML Semántico

Los elementos HTML semánticos describen claramente su significado tanto para el navegador como para el desarrollador.

## Elementos Semánticos Clave

- **`<header>`** - Contenido introductorio o enlaces de navegación
- **`<nav>`** - Enlaces de navegación
- **`<main>`** - Contenido principal del documento
- **`<article>`** - Contenido autocontenido
- **`<section>`** - Agrupación temática de contenido
- **`<aside>`** - Contenido secundario al contenido principal
- **`<footer>`** - Pie de página de un documento o sección
- **`<figure>` y `<figcaption>`** - Contenido autocontenido con leyenda

## Por Qué Importa el HTML Semántico

1. **Accesibilidad**: Los lectores de pantalla pueden navegar mejor el contenido
2. **SEO**: Los motores de búsqueda entienden la estructura del contenido
3. **Mantenibilidad**: El código es más fácil de leer y mantener
4. **Consistencia**: Los elementos estándar promueven mejores prácticas

## Mejores Prácticas

```html
<article>
  <header>
    <h1>Título del Artículo</h1>
    <time datetime="2024-01-15">15 de Enero, 2024</time>
  </header>
  <p>Contenido del artículo...</p>
  <footer>
    <p>Escrito por Nombre del Autor</p>
  </footer>
</article>
```

---
id: "7"
title: "CSS Grid"
description: "CSS Grid es un sistema de layout bidimensional para crear layouts web complejos."
---

# CSS Grid

CSS Grid Layout es un sistema de layout bidimensional, lo que significa que puede manejar tanto columnas como filas.

## Propiedades del Contenedor

```css
.grid-contenedor {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  gap: 1rem;
}
```

## Definir Columnas y Filas

```css
/* Tamaños fijos */
grid-template-columns: 200px 1fr 2fr;

/* Patrón repetido */
grid-template-columns: repeat(4, 1fr);

/* Auto-fit para responsivo */
grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
```

## Ubicación de Elementos

```css
.elemento {
  grid-column: 1 / 3;    /* Abarca 2 columnas */
  grid-row: 1 / 2;       /* Abarca 1 fila */
  grid-area: header;     /* Área nombrada */
}
```

## Áreas de Plantilla

```css
.contenedor {
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.footer { grid-area: footer; }
```

## Cuándo Usar Grid

- Layouts de página
- Layouts complejos y multidimensionales
- Layouts estilo revista
- Elementos superpuestos
- Cuando necesitas control preciso sobre filas y columnas

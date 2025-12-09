---
id: "6"
title: "CSS Flexbox"
description: "Flexbox es un método de layout unidimensional para organizar elementos en filas o columnas."
---

# CSS Flexbox

Flexbox es un módulo de layout poderoso que facilita el diseño de layouts flexibles y responsivos.

## Propiedades del Contenedor

```css
.contenedor {
  display: flex;
  flex-direction: row | column;
  justify-content: flex-start | center | space-between | space-around;
  align-items: stretch | center | flex-start | flex-end;
  flex-wrap: nowrap | wrap;
  gap: 1rem;
}
```

## Propiedades de los Elementos

```css
.elemento {
  flex-grow: 1;      /* Factor de crecimiento */
  flex-shrink: 0;    /* Factor de reducción */
  flex-basis: 200px; /* Tamaño inicial */
  align-self: center; /* Sobrescribe align-items */
  order: 1;          /* Reordenar elementos */
}
```

## Patrones Comunes

### Centrar Contenido
```css
.centrar {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

### Barra de Navegación
```css
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
```

### Tarjetas de Igual Ancho
```css
.tarjeta {
  flex: 1 1 0;
}
```

## Cuándo Usar Flexbox

- Menús de navegación
- Layouts de tarjetas
- Centrar contenido
- Columnas de altura igual
- Distribuir espacio entre elementos

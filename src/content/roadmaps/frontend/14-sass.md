---
id: "14"
title: "Sass/SCSS"
description: "Sass es un preprocesador CSS que añade características poderosas como variables, anidamiento y mixins."
---

# Sass/SCSS

Sass (Hojas de Estilo Sintácticamente Asombrosas) es el preprocesador CSS más popular, extendiendo CSS con características poderosas.

## Características Principales

### Variables
```scss
$color-primario: #3498db;
$fuente-stack: 'Helvetica', sans-serif;

body {
  font-family: $fuente-stack;
  color: $color-primario;
}
```

### Anidamiento
```scss
nav {
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li { display: inline-block; }

  a {
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
}
```

### Mixins
```scss
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.contenedor {
  @include flex-center;
}
```

### Parciales e Imports
```scss
// _variables.scss
$primario: blue;

// main.scss
@use 'variables';

.boton {
  color: variables.$primario;
}
```

### Funciones
```scss
@function calcular-ancho($cols) {
  @return 100% / $cols;
}

.col {
  width: calcular-ancho(3); // 33.333%
}
```

## ¿Por Qué Usar Sass?

1. Mejor organización del código
2. Estilos reutilizables con mixins
3. Sintaxis de anidamiento más limpia
4. Operaciones matemáticas
5. Mantenimiento más fácil

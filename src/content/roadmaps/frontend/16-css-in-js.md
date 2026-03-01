---
id: "16"
title: "CSS-in-JS"
description: "CSS-in-JS es un enfoque de estilos donde CSS se compone usando JavaScript."
---

# CSS-in-JS

Las librerías CSS-in-JS te permiten escribir CSS directamente en tus archivos JavaScript/TypeScript, encapsulando estilos a componentes.

## Librerías Populares

### Styled Components
```javascript
import styled from 'styled-components';

const Button = styled.button`
  background: ${props => props.primary ? 'blue' : 'white'};
  color: ${props => props.primary ? 'white' : 'blue'};
  padding: 0.5rem 1rem;
  border-radius: 4px;
  
  &:hover {
    opacity: 0.8;
  }
`;

// Uso
<Button primary>Clic Aquí</Button>
```

### Emotion
```javascript
import { css } from '@emotion/react';
import styled from '@emotion/styled';

const estiloBoton = css`
  padding: 1rem;
  background: blue;
  color: white;
`;

const Button = styled.button`
  ${estiloBoton}
`;
```

## Ventajas

1. **Estilos encapsulados**: Sin conflictos de CSS global
2. **Estilos dinámicos**: Usa lógica JavaScript en estilos
3. **Basado en componentes**: Los estilos viven con los componentes
4. **Type safety**: Soporte para TypeScript
5. **Prefijos de vendor automáticos**

## Desventajas

1. **Overhead en tiempo de ejecución**: Estilos calculados en runtime
2. **Tamaño del bundle**: Código de librería adicional
3. **Curva de aprendizaje**: Diferente del CSS tradicional

## Cuándo Usar

- Aplicaciones React
- Librerías de componentes
- Cuando necesitas estilos dinámicos basados en temas
- Cuando quieres eliminar conflictos de CSS global

## Alternativas

- CSS Modules
- Tailwind CSS
- Vanilla Extract (zero-runtime)

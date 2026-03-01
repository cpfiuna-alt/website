---
id: "17"
title: "Herramientas de Build"
description: "Las herramientas de build automatizan tareas como bundling, transpilación y optimización de código para producción."
---

# Herramientas de Build

Las herramientas de build automatizan el flujo de trabajo de desarrollo, transformando el código fuente en bundles optimizados para producción.

## Herramientas Modernas

### Vite
```bash
npm create vite@latest mi-app
```
- Servidor de desarrollo **ultrarrápido**
- Usa ES modules nativos
- Hot Module Replacement (HMR)
- Builds de producción optimizados con Rollup

### Webpack
```javascript
// webpack.config.js
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader' },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
    ],
  },
};
```

### esbuild
- Extremadamente rápido (escrito en Go)
- API simple
- Excelente para bundlear librerías

## Tareas Comunes

1. **Bundling**: Combinar múltiples archivos en uno
2. **Transpilación**: Convertir JS moderno a sintaxis antigua
3. **Minificación**: Reducir tamaño de archivo
4. **Tree shaking**: Eliminar código no usado
5. **Code splitting**: Cargar código bajo demanda
6. **Optimización de assets**: Comprimir imágenes, fuentes

## Desarrollo vs Producción

| Desarrollo | Producción |
|------------|------------|
| Source maps | Código minificado |
| HMR habilitado | Tree shaking |
| Sin minificación | Assets optimizados |
| Rebuilds rápidos | Code splitting |

## Recomendación

Para proyectos nuevos, **Vite** es la opción recomendada:
- Experiencia de desarrollo más rápida
- Excelentes defaults incluidos
- Soporte excepcional para React/Vue/Svelte

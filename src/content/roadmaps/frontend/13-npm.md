---
id: "13"
title: "npm"
description: "npm (Node Package Manager) es el gestor de paquetes predeterminado para Node.js y el registro de software más grande."
---

# npm (Node Package Manager)

npm es el registro de software más grande del mundo y el gestor de paquetes predeterminado para proyectos Node.js.

## Comandos Esenciales

### Configuración del Proyecto
```bash
npm init                    # Inicializar nuevo proyecto
npm init -y                 # Inicio rápido con valores por defecto
```

### Instalar Paquetes
```bash
npm install <paquete>       # Instalar paquete
npm install <paquete> -D    # Instalar como dependencia de desarrollo
npm install                 # Instalar todas las dependencias
npm install <paquete>@1.2.3 # Instalar versión específica
```

### Eliminar Paquetes
```bash
npm uninstall <paquete>     # Eliminar paquete
npm prune                   # Eliminar paquetes no usados
```

### Ejecutar Scripts
```bash
npm run <script>            # Ejecutar script de package.json
npm start                   # Ejecutar script start
npm test                    # Ejecutar script test
npm run build               # Script de build común
```

## package.json

```json
{
  "name": "mi-proyecto",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "test": "vitest"
  },
  "dependencies": {
    "react": "^18.2.0"
  },
  "devDependencies": {
    "vite": "^5.0.0"
  }
}
```

## Alternativas

- **Yarn**: Alternativa rápida y confiable
- **pnpm**: Uso eficiente del espacio en disco
- **Bun**: Runtime de JavaScript todo en uno

## Mejores Prácticas

1. Usa el archivo de lock para instalaciones consistentes
2. Mantén las dependencias actualizadas
3. Audita por vulnerabilidades de seguridad: `npm audit`
4. Usa versionado semántico

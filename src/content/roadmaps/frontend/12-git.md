---
id: "12"
title: "Git"
description: "Git es un sistema de control de versiones distribuido para rastrear cambios en el código fuente."
---

# Control de Versiones con Git

Git es el sistema de control de versiones estándar usado por desarrolladores de todo el mundo para rastrear cambios y colaborar en código.

## Comandos Esenciales

### Configuración
```bash
git init                    # Inicializar nuevo repo
git clone <url>             # Clonar repo remoto
git config --global user.name "Tu Nombre"
git config --global user.email "email@ejemplo.com"
```

### Flujo de Trabajo Básico
```bash
git status                  # Verificar estado
git add <archivo>           # Preparar archivo
git add .                   # Preparar todos los cambios
git commit -m "mensaje"     # Confirmar cambios
git push origin main        # Subir a remoto
git pull origin main        # Bajar desde remoto
```

### Ramas
```bash
git branch                  # Listar ramas
git branch nombre-feature   # Crear rama
git checkout nombre-feature # Cambiar rama
git checkout -b feature     # Crear y cambiar
git merge nombre-feature    # Fusionar rama
git branch -d nombre-feature # Eliminar rama
```

### Ver Historial
```bash
git log                     # Ver historial de commits
git log --oneline           # Vista compacta
git diff                    # Ver cambios
git show <commit>           # Mostrar detalles del commit
```

## Mejores Prácticas

1. **Escribe mensajes de commit significativos**
2. **Haz commits frecuentes, push regularmente**
3. **Usa ramas para features**
4. **Revisa cambios antes de hacer commit**
5. **Mantén los commits atómicos (un cambio por commit)**

## Flujos de Trabajo Comunes

- **Feature Branch Workflow**: Crear una rama para cada feature
- **GitFlow**: Modelo de ramas estructurado
- **Trunk-Based Development**: Ramas de corta duración

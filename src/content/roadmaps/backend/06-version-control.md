---
id: "6"
title: "Control de Versiones"
description: "Git es esencial para todo desarrollador. Aprende a gestionar código de forma profesional."
---

# Control de Versiones con Git

Git es el sistema de control de versiones más utilizado en el mundo.

## Comandos Esenciales

```bash
# Configuración inicial
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"

# Iniciar repositorio
git init
git clone <url>

# Flujo básico
git add .
git commit -m "Mensaje descriptivo"
git push origin main

# Ramas
git branch nueva-feature
git checkout nueva-feature
git checkout -b otra-feature  # Crear y cambiar

# Merge
git checkout main
git merge nueva-feature
```

## Flujo de Trabajo

1. **Main/Master**: Rama principal, siempre estable
2. **Develop**: Rama de desarrollo
3. **Feature branches**: Una rama por feature
4. **Pull Requests**: Code review antes de merge

## Conventional Commits

```
feat: agregar endpoint de usuarios
fix: corregir validación de email
docs: actualizar README
refactor: reorganizar estructura de carpetas
test: agregar tests para auth
```

## .gitignore

```
node_modules/
.env
*.log
dist/
__pycache__/
.venv/
```

## Recursos

- [Git Book](https://git-scm.com/book/es/v2)
- [GitHub Flow](https://guides.github.com/introduction/flow/)

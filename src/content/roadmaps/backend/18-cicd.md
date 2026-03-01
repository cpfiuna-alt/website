---
id: "18"
title: "CI/CD"
description: "Automatiza testing, building y deployment de tu aplicación."
---

# CI/CD

Continuous Integration / Continuous Deployment automatiza tu flujo de trabajo.

## GitHub Actions

```yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
      
      - name: Run linter
        run: npm run lint

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Deploy to production
        run: |
          # Tu script de deployment
          echo "Deploying..."
```

## Pipeline Típico

```
┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐
│  Push   │───>│  Test   │───>│  Build  │───>│ Deploy  │
└─────────┘    └─────────┘    └─────────┘    └─────────┘
```

## Estrategias de Deployment

| Estrategia | Descripción |
|------------|-------------|
| Rolling | Gradual, un servidor a la vez |
| Blue/Green | Dos ambientes, switch instantáneo |
| Canary | Pequeño % de tráfico primero |

## Herramientas

- **CI**: GitHub Actions, GitLab CI, Jenkins
- **Deploy**: Vercel, Railway, Fly.io, AWS
- **Containers**: Docker, Kubernetes

## Mejores Prácticas

- Tests automáticos en cada PR
- Lint y format automáticos
- Environments separados (dev, staging, prod)
- Rollback automático si falla

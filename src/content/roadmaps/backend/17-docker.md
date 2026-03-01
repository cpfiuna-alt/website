---
id: "17"
title: "Docker"
description: "Contenedores para empaquetar y desplegar aplicaciones de forma consistente."
---

# Docker

Docker empaqueta tu aplicación con todas sus dependencias en un contenedor.

## Dockerfile

```dockerfile
# Imagen base
FROM node:20-alpine

# Directorio de trabajo
WORKDIR /app

# Copiar package.json primero (para cacheo de layers)
COPY package*.json ./

# Instalar dependencias
RUN npm ci --only=production

# Copiar código fuente
COPY . .

# Puerto expuesto
EXPOSE 3000

# Comando de inicio
CMD ["node", "src/index.js"]
```

## Comandos Esenciales

```bash
# Construir imagen
docker build -t mi-app .

# Correr contenedor
docker run -p 3000:3000 -d mi-app

# Ver contenedores
docker ps

# Ver logs
docker logs <container_id>

# Entrar al contenedor
docker exec -it <container_id> sh

# Parar contenedor
docker stop <container_id>
```

## Docker Compose

```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgres://postgres:password@db:5432/mydb
    depends_on:
      - db

  db:
    image: postgres:15
    environment:
      POSTGRES_PASSWORD: password
      POSTGRES_DB: mydb
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

```bash
docker-compose up -d
docker-compose down
docker-compose logs -f
```

## Mejores Prácticas

- Usar imágenes Alpine (más pequeñas)
- Multi-stage builds para producción
- No correr como root
- .dockerignore para excluir archivos

---
title: "Configuración del Proyecto"
description: "Guía completa para configurar el entorno de desarrollo de la Biblioteca Digital"
chapter: "Configuración"
section: "Configuración Inicial"
order: 1
---

# Configuración del Proyecto Biblioteca Digital

## Introducción

La Biblioteca Digital es un sistema moderno de gestión de recursos digitales diseñado para la FIUNA. Permite catalogar, organizar, buscar y acceder a libros, papers, documentos académicos y otros recursos educativos de manera eficiente.

## Prerrequisitos

### Requisitos del Sistema

- **Node.js 18.x+** (recomendado LTS)
- **npm 8.x+** o **yarn 1.22+**
- **PostgreSQL 14+** para la base de datos principal
- **Elasticsearch 8.x** para búsqueda avanzada
- **Redis 6.x+** para caché y sesiones
- **Git** para control de versiones

### Cuentas y Servicios Externos

1. **AWS S3** o **MinIO**: Para almacenamiento de archivos
2. **Cloudinary** (opcional): Para optimización de imágenes
3. **SendGrid** (opcional): Para envío de emails
4. **Auth0** (opcional): Para autenticación externa

## Instalación

### 1. Clonar el Repositorio

```bash
git clone https://github.com/cpf-fiuna/biblioteca-digital.git
cd biblioteca-digital
```

### 2. Configurar el Backend

```bash
# Navegar al directorio del backend
cd backend

# Instalar dependencias
npm install

# O con yarn
yarn install
```

### 3. Configurar el Frontend

```bash
# Navegar al directorio del frontend
cd ../frontend

# Instalar dependencias
npm install

# O con yarn
yarn install
```

### 4. Configurar Variables de Entorno

#### Backend (.env)

```bash
cp backend/.env.example backend/.env
```

Editar `backend/.env`:
```env
# Application
NODE_ENV=development
PORT=3000
APP_NAME="Biblioteca Digital FIUNA"
API_PREFIX=/api/v1

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/biblioteca_digital
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=biblioteca_user
DB_PASSWORD=secure_password
DB_NAME=biblioteca_digital

# Redis
REDIS_URL=redis://localhost:6379
REDIS_HOST=localhost
REDIS_PORT=6379

# Elasticsearch
ELASTICSEARCH_URL=http://localhost:9200
ELASTICSEARCH_INDEX=biblioteca_digital

# Authentication
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d
REFRESH_TOKEN_SECRET=your-refresh-token-secret
REFRESH_TOKEN_EXPIRES_IN=30d

# File Storage
STORAGE_TYPE=s3  # 's3' or 'local' or 'minio'
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_S3_BUCKET=biblioteca-digital-files

# MinIO (alternativa a S3)
MINIO_ENDPOINT=localhost:9000
MINIO_ACCESS_KEY=minioadmin
MINIO_SECRET_KEY=minioadmin
MINIO_BUCKET=biblioteca-digital

# Email
MAIL_PROVIDER=sendgrid  # 'sendgrid' or 'smtp'
SENDGRID_API_KEY=your-sendgrid-api-key
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Security
CORS_ORIGIN=http://localhost:3001
RATE_LIMIT_MAX=100
RATE_LIMIT_WINDOW=15  # minutes

# Logging
LOG_LEVEL=info
```

#### Frontend (.env)

```bash
cp frontend/.env.example frontend/.env
```

Editar `frontend/.env`:
```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1
NEXT_PUBLIC_WS_URL=ws://localhost:3000

# Authentication
NEXTAUTH_URL=http://localhost:3001
NEXTAUTH_SECRET=your-nextauth-secret

# External Services
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloudinary-name
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=GA-MEASUREMENT-ID

# Application
NEXT_PUBLIC_APP_NAME="Biblioteca Digital FIUNA"
NEXT_PUBLIC_APP_VERSION=0.2.0
```

## Configuración de Servicios

### 1. PostgreSQL

#### Instalación en Ubuntu/Debian:
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

#### Configuración:
```bash
# Acceder a PostgreSQL
sudo -u postgres psql

# Crear usuario y base de datos
CREATE USER biblioteca_user WITH PASSWORD 'secure_password';
CREATE DATABASE biblioteca_digital OWNER biblioteca_user;
GRANT ALL PRIVILEGES ON DATABASE biblioteca_digital TO biblioteca_user;

# Salir
\q
```

### 2. Elasticsearch

#### Instalación con Docker:
```bash
docker run -d \
  --name elasticsearch \
  -p 9200:9200 \
  -p 9300:9300 \
  -e "discovery.type=single-node" \
  -e "ES_JAVA_OPTS=-Xms512m -Xmx512m" \
  elasticsearch:8.11.0
```

#### Verificar instalación:
```bash
curl http://localhost:9200
```

### 3. Redis

#### Instalación:
```bash
# Ubuntu/Debian
sudo apt install redis-server

# macOS
brew install redis

# Iniciar servicio
sudo systemctl start redis-server
sudo systemctl enable redis-server
```

#### Verificar instalación:
```bash
redis-cli ping
# Debería responder: PONG
```

### 4. MinIO (Opcional, alternativa a S3)

```bash
# Usando Docker
docker run -d \
  --name minio \
  -p 9000:9000 \
  -p 9001:9001 \
  -e "MINIO_ROOT_USER=minioadmin" \
  -e "MINIO_ROOT_PASSWORD=minioadmin" \
  minio/minio server /data --console-address ":9001"
```

## Configuración de la Base de Datos

### 1. Ejecutar Migraciones

```bash
cd backend

# Ejecutar migraciones
npm run migrate

# O con Prisma
npx prisma migrate dev

# Generar cliente de Prisma
npx prisma generate
```

### 2. Seed de Datos

```bash
# Cargar datos de prueba
npm run seed

# O ejecutar seed específico
npm run seed:categories
npm run seed:users
npm run seed:books
```

### 3. Configurar Índices de Elasticsearch

```bash
# Crear índices
npm run es:setup

# Reindexar todo el contenido
npm run es:reindex
```

## Ejecución del Proyecto

### 1. Ejecutar Backend

```bash
cd backend

# Modo desarrollo
npm run dev

# Modo producción
npm run build
npm start

# Con watch para reinicio automático
npm run dev:watch
```

### 2. Ejecutar Frontend

```bash
cd frontend

# Modo desarrollo
npm run dev

# Construir para producción
npm run build
npm start

# Analizar bundle
npm run analyze
```

### 3. Ejecutar Ambos Simultáneamente

```bash
# Desde el directorio raíz
npm run dev

# O usando concurrently
npx concurrently "npm run dev --prefix backend" "npm run dev --prefix frontend"
```

## Estructura del Proyecto

```
biblioteca-digital/
├── backend/
│   ├── src/
│   │   ├── controllers/        # Controladores de API
│   │   ├── services/           # Lógica de negocio
│   │   ├── models/             # Modelos de datos (Prisma)
│   │   ├── middleware/         # Middleware de Express
│   │   ├── routes/             # Definición de rutas
│   │   ├── utils/              # Utilidades
│   │   ├── validators/         # Validadores de entrada
│   │   └── types/              # Tipos TypeScript
│   ├── prisma/
│   │   ├── schema.prisma       # Esquema de base de datos
│   │   ├── migrations/         # Migraciones
│   │   └── seeds/              # Datos de prueba
│   ├── uploads/                # Archivos subidos (desarrollo)
│   └── tests/                  # Tests del backend
├── frontend/
│   ├── src/
│   │   ├── components/         # Componentes React
│   │   ├── pages/              # Páginas Next.js
│   │   ├── hooks/              # Custom hooks
│   │   ├── services/           # Servicios de API
│   │   ├── utils/              # Utilidades
│   │   ├── types/              # Tipos TypeScript
│   │   └── styles/             # Estilos CSS/SCSS
│   ├── public/                 # Archivos estáticos
│   └── tests/                  # Tests del frontend
├── docs/                       # Documentación
├── scripts/                    # Scripts de utilidad
└── docker/                     # Configuración Docker
```

## Desarrollo Local

### 1. Configurar IDE

#### VS Code Extensions:
```bash
# Extensiones esenciales
code --install-extension ms-vscode.vscode-typescript-next
code --install-extension bradlc.vscode-tailwindcss
code --install-extension prisma.prisma
code --install-extension ms-vscode.vscode-json
code --install-extension esbenp.prettier-vscode
```

#### Configuración de VS Code (`.vscode/settings.json`):
```json
{
  "typescript.preferences.includePackageJsonAutoImports": "on",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "files.associations": {
    "*.css": "tailwindcss"
  },
  "emmet.includeLanguages": {
    "javascript": "javascriptreact",
    "typescript": "typescriptreact"
  }
}
```

### 2. Scripts de Desarrollo

```bash
# Verificar lint
npm run lint

# Corregir problemas de lint
npm run lint:fix

# Ejecutar tests
npm run test

# Tests en modo watch
npm run test:watch

# Coverage de tests
npm run test:coverage

# Type checking
npm run type-check
```

## Testing

### 1. Backend Tests

```bash
cd backend

# Tests unitarios
npm run test:unit

# Tests de integración
npm run test:integration

# Tests end-to-end
npm run test:e2e

# Todos los tests
npm test
```

### 2. Frontend Tests

```bash
cd frontend

# Tests de componentes
npm run test:components

# Tests de páginas
npm run test:pages

# Tests de integración
npm run test:integration

# Tests con Playwright
npm run test:e2e
```

## Docker Setup

### 1. Desarrollo con Docker

```bash
# Construir y ejecutar todos los servicios
docker-compose up -d

# Solo base de datos y servicios auxiliares
docker-compose up -d postgres redis elasticsearch minio

# Ver logs
docker-compose logs -f
```

### 2. Docker Compose

```yaml
# docker-compose.yml
version: '3.8'

services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: biblioteca_digital
      POSTGRES_USER: biblioteca_user
      POSTGRES_PASSWORD: secure_password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

  elasticsearch:
    image: elasticsearch:8.11.0
    environment:
      - discovery.type=single-node
      - ES_JAVA_OPTS=-Xms512m -Xmx512m
    ports:
      - "9200:9200"
    volumes:
      - elasticsearch_data:/usr/share/elasticsearch/data

  minio:
    image: minio/minio
    command: server /data --console-address ":9001"
    environment:
      MINIO_ROOT_USER: minioadmin
      MINIO_ROOT_PASSWORD: minioadmin
    ports:
      - "9000:9000"
      - "9001:9001"
    volumes:
      - minio_data:/data

volumes:
  postgres_data:
  elasticsearch_data:
  minio_data:
```

## Configuración de Búsqueda

### 1. Índices de Elasticsearch

```bash
# Crear mapping para libros
curl -X PUT "localhost:9200/books" -H 'Content-Type: application/json' -d'
{
  "mappings": {
    "properties": {
      "title": {
        "type": "text",
        "analyzer": "spanish"
      },
      "author": {
        "type": "text",
        "analyzer": "spanish"
      },
      "content": {
        "type": "text",
        "analyzer": "spanish"
      },
      "isbn": {
        "type": "keyword"
      },
      "category": {
        "type": "keyword"
      },
      "tags": {
        "type": "keyword"
      },
      "published_date": {
        "type": "date"
      }
    }
  }
}'
```

### 2. Sincronización de Datos

```bash
# Script para sincronizar PostgreSQL con Elasticsearch
npm run sync:elasticsearch

# Reindexar todo
npm run reindex:all
```

## Solución de Problemas

### 1. Problemas de Base de Datos

```bash
# Verificar conexión
npm run db:ping

# Resetear base de datos
npm run db:reset

# Ver logs de PostgreSQL
sudo tail -f /var/log/postgresql/postgresql-15-main.log
```

### 2. Problemas de Elasticsearch

```bash
# Verificar estado del cluster
curl localhost:9200/_cluster/health

# Ver todos los índices
curl localhost:9200/_cat/indices

# Eliminar y recrear índice
curl -X DELETE localhost:9200/books
npm run es:setup
```

### 3. Problemas de Memoria

```bash
# Aumentar límite de memoria para Node.js
export NODE_OPTIONS="--max-old-space-size=4096"

# Para Elasticsearch
echo "ES_JAVA_OPTS=-Xms1g -Xmx1g" >> /etc/elasticsearch/jvm.options
```

## Próximos Pasos

### 1. Explorar la Aplicación

1. Acceder a la interfaz web: `http://localhost:3001`
2. Panel de administración: `http://localhost:3001/admin`
3. API documentation: `http://localhost:3000/api/docs`
4. MinIO console: `http://localhost:9001`

### 2. Personalización

1. Configurar categorías y metadatos específicos de la FIUNA
2. Personalizar la interfaz con branding de la universidad
3. Configurar flujos de trabajo para aprobación de contenido
4. Integrar con sistemas existentes de la biblioteca

### 3. Deployment

1. Configurar environment de staging
2. Establecer CI/CD pipeline
3. Configurar backups automáticos
4. Planificar estrategia de scaling

## Recursos Adicionales

- **Next.js Documentation**: https://nextjs.org/docs
- **Prisma Documentation**: https://www.prisma.io/docs
- **Elasticsearch Guide**: https://www.elastic.co/guide/
- **PostgreSQL Documentation**: https://www.postgresql.org/docs/

Para más información y guías avanzadas, consulta la documentación completa en la carpeta `docs/`.

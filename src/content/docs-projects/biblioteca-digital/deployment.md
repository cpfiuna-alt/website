---
title: "Guía de Despliegue"
description: "Guía completa de despliegue para el Sistema de Biblioteca Digital en diferentes entornos y plataformas"
chapter: "Despliegue"
section: "Guía de Despliegue"
order: 1
---
lastUpdate: "2025-01-15"
---

# Biblioteca Digital Deployment Guide

This guide covers the deployment of the Digital Library System across different environments and platforms.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Environment Configuration](#environment-configuration)
3. [Docker Deployment](#docker-deployment)
4. [Cloud Deployment](#cloud-deployment)
5. [Traditional Server Deployment](#traditional-server-deployment)
6. [Production Considerations](#production-considerations)
7. [Monitoring and Logging](#monitoring-and-logging)
8. [Backup and Recovery](#backup-and-recovery)
9. [Troubleshooting](#troubleshooting)

## Prerequisites

### System Requirements

- **CPU**: 4+ cores (8+ recommended for production)
- **RAM**: 8GB minimum (16GB+ recommended)
- **Storage**: 100GB available space (more for document storage)
- **Network**: High-bandwidth connection for file transfers

### Required Services

- Node.js 18+
- PostgreSQL 14+
- Elasticsearch 8.x
- Redis 6+
- MinIO/S3 (for file storage)
- Docker & Docker Compose

## Environment Configuration

### Environment Variables

Create a `.env` file with the following variables:

```env
# Application Configuration
NODE_ENV=production
APP_PORT=3000
APP_URL=https://biblioteca.your-domain.com
API_VERSION=v1

# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/biblioteca_digital
DB_HOST=localhost
DB_PORT=5432
DB_NAME=biblioteca_digital
DB_USER=biblioteca_user
DB_PASSWORD=secure_password

# Redis Configuration
REDIS_URL=redis://localhost:6379
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# Elasticsearch Configuration
ELASTICSEARCH_URL=http://localhost:9200
ELASTICSEARCH_USERNAME=elastic
ELASTICSEARCH_PASSWORD=elastic_password
ELASTICSEARCH_INDEX=biblioteca_documents

# File Storage Configuration
STORAGE_TYPE=s3  # s3, minio, or local
S3_BUCKET=biblioteca-documents
S3_REGION=us-east-1
S3_ACCESS_KEY=your_access_key
S3_SECRET_KEY=your_secret_key
S3_ENDPOINT=  # For MinIO: http://localhost:9000

# Local storage (if STORAGE_TYPE=local)
UPLOAD_PATH=/app/uploads
MAX_FILE_SIZE=104857600  # 100MB

# Authentication
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRATION=7d
SESSION_SECRET=your_session_secret_here

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
FROM_EMAIL=biblioteca@your-domain.com

# External Services
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Security
CORS_ORIGINS=https://biblioteca.your-domain.com,https://admin.biblioteca.your-domain.com
RATE_LIMIT_WINDOW=15  # minutes
RATE_LIMIT_MAX=100    # requests per window

# Monitoring
SENTRY_DSN=your_sentry_dsn_here
LOG_LEVEL=info
METRICS_ENABLED=true

# Search Configuration
SEARCH_RESULTS_LIMIT=50
INDEX_BATCH_SIZE=100
OCR_ENABLED=true
OCR_LANGUAGES=spa,eng

# CDN Configuration
CDN_URL=https://cdn.your-domain.com
CDN_ENABLED=true
```

## Docker Deployment

### Multi-Container Setup

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  # Next.js Application
  app:
    build: 
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://postgres:password@db:5432/biblioteca_digital
      - REDIS_URL=redis://redis:6379
      - ELASTICSEARCH_URL=http://elasticsearch:9200
      - S3_ENDPOINT=http://minio:9000
    depends_on:
      - db
      - redis
      - elasticsearch
      - minio
    volumes:
      - uploads:/app/uploads
    restart: unless-stopped
    networks:
      - biblioteca-network

  # PostgreSQL Database
  db:
    image: postgres:14
    environment:
      POSTGRES_DB: biblioteca_digital
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./scripts/init.sql:/docker-entrypoint-initdb.d/init.sql
    ports:
      - "5432:5432"
    restart: unless-stopped
    networks:
      - biblioteca-network

  # Redis Cache
  redis:
    image: redis:7-alpine
    command: redis-server --appendonly yes --requirepass redis_password
    volumes:
      - redis_data:/data
    ports:
      - "6379:6379"
    restart: unless-stopped
    networks:
      - biblioteca-network

  # Elasticsearch
  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:8.8.0
    environment:
      - discovery.type=single-node
      - "ES_JAVA_OPTS=-Xms2g -Xmx2g"
      - xpack.security.enabled=false
      - xpack.security.http.ssl.enabled=false
    volumes:
      - elasticsearch_data:/usr/share/elasticsearch/data
    ports:
      - "9200:9200"
    restart: unless-stopped
    networks:
      - biblioteca-network
    deploy:
      resources:
        limits:
          memory: 4g

  # MinIO (S3-compatible storage)
  minio:
    image: minio/minio
    command: server /data --console-address ":9001"
    environment:
      MINIO_ROOT_USER: minioadmin
      MINIO_ROOT_PASSWORD: minioadmin123
    volumes:
      - minio_data:/data
    ports:
      - "9000:9000"
      - "9001:9001"
    restart: unless-stopped
    networks:
      - biblioteca-network

  # Nginx Reverse Proxy
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf
      - ./nginx/conf.d:/etc/nginx/conf.d
      - ./ssl:/etc/nginx/ssl
      - uploads:/var/www/uploads:ro
    depends_on:
      - app
    restart: unless-stopped
    networks:
      - biblioteca-network

  # Background Job Worker
  worker:
    build: 
      context: .
      dockerfile: Dockerfile.worker
    environment:
      - DATABASE_URL=postgresql://postgres:password@db:5432/biblioteca_digital
      - REDIS_URL=redis://redis:6379
      - ELASTICSEARCH_URL=http://elasticsearch:9200
    depends_on:
      - db
      - redis
      - elasticsearch
    volumes:
      - uploads:/app/uploads
    restart: unless-stopped
    networks:
      - biblioteca-network

  # Document Processing Service
  processor:
    build:
      context: ./services/document-processor
      dockerfile: Dockerfile
    environment:
      - REDIS_URL=redis://redis:6379
      - OCR_ENABLED=true
    depends_on:
      - redis
    volumes:
      - uploads:/app/uploads
    restart: unless-stopped
    networks:
      - biblioteca-network

volumes:
  postgres_data:
  redis_data:
  elasticsearch_data:
  minio_data:
  uploads:

networks:
  biblioteca-network:
    driver: bridge
```

### Application Dockerfile

```dockerfile
FROM node:18-alpine AS dependencies

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci --only=production

FROM node:18-alpine AS builder

WORKDIR /app

# Copy dependencies
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

# Build application
RUN npm run build

FROM node:18-alpine AS runner

WORKDIR /app

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built application
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Create uploads directory
RUN mkdir -p /app/uploads && chown nextjs:nodejs /app/uploads

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME 0.0.0.0

CMD ["node", "server.js"]
```

### Worker Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

# Install system dependencies for document processing
RUN apk add --no-cache \
    tesseract-ocr \
    tesseract-ocr-data-spa \
    tesseract-ocr-data-eng \
    imagemagick \
    ghostscript \
    poppler-utils

# Install Node.js dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy application code
COPY . .

# Create uploads directory
RUN mkdir -p /app/uploads

CMD ["node", "workers/document-processor.js"]
```

### Deployment Commands

```bash
# Build and start all services
docker-compose up -d --build

# Scale specific services
docker-compose up -d --scale worker=3 --scale processor=2

# View logs
docker-compose logs -f app
docker-compose logs -f worker

# Update specific service
docker-compose up -d --no-deps app

# Stop services
docker-compose down

# Clean up
docker-compose down -v --remove-orphans
```

## Cloud Deployment

### AWS Deployment

#### ECS with Fargate

1. **Create ECR repositories:**

```bash
aws ecr create-repository --repository-name biblioteca-digital-app
aws ecr create-repository --repository-name biblioteca-digital-worker
aws ecr create-repository --repository-name biblioteca-digital-processor
```

2. **Build and push images:**

```bash
# Login to ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 123456789012.dkr.ecr.us-east-1.amazonaws.com

# Build and push main application
docker build -t biblioteca-digital-app .
docker tag biblioteca-digital-app:latest 123456789012.dkr.ecr.us-east-1.amazonaws.com/biblioteca-digital-app:latest
docker push 123456789012.dkr.ecr.us-east-1.amazonaws.com/biblioteca-digital-app:latest

# Build and push worker
docker build -f Dockerfile.worker -t biblioteca-digital-worker .
docker tag biblioteca-digital-worker:latest 123456789012.dkr.ecr.us-east-1.amazonaws.com/biblioteca-digital-worker:latest
docker push 123456789012.dkr.ecr.us-east-1.amazonaws.com/biblioteca-digital-worker:latest
```

3. **Infrastructure as Code (Terraform):**

```hcl
# main.tf
provider "aws" {
  region = "us-east-1"
}

# VPC
module "vpc" {
  source = "terraform-aws-modules/vpc/aws"
  
  name = "biblioteca-digital-vpc"
  cidr = "10.0.0.0/16"
  
  azs             = ["us-east-1a", "us-east-1b"]
  private_subnets = ["10.0.1.0/24", "10.0.2.0/24"]
  public_subnets  = ["10.0.101.0/24", "10.0.102.0/24"]
  
  enable_nat_gateway = true
  enable_vpn_gateway = true
}

# RDS PostgreSQL
resource "aws_db_instance" "biblioteca_db" {
  identifier = "biblioteca-digital-db"
  
  engine         = "postgres"
  engine_version = "14.9"
  instance_class = "db.t3.medium"
  
  allocated_storage     = 100
  max_allocated_storage = 1000
  storage_type         = "gp2"
  storage_encrypted    = true
  
  db_name  = "biblioteca_digital"
  username = "postgres"
  password = var.db_password
  
  vpc_security_group_ids = [aws_security_group.rds.id]
  db_subnet_group_name   = aws_db_subnet_group.biblioteca.name
  
  backup_retention_period = 7
  backup_window          = "03:00-04:00"
  maintenance_window     = "sun:04:00-sun:05:00"
  
  skip_final_snapshot = false
  final_snapshot_identifier = "biblioteca-digital-final-snapshot"
}

# ElastiCache Redis
resource "aws_elasticache_subnet_group" "biblioteca" {
  name       = "biblioteca-digital-cache-subnet"
  subnet_ids = module.vpc.private_subnets
}

resource "aws_elasticache_cluster" "biblioteca_redis" {
  cluster_id           = "biblioteca-digital-redis"
  engine               = "redis"
  node_type            = "cache.t3.micro"
  num_cache_nodes      = 1
  parameter_group_name = "default.redis7"
  port                 = 6379
  subnet_group_name    = aws_elasticache_subnet_group.biblioteca.name
  security_group_ids   = [aws_security_group.redis.id]
}

# Elasticsearch
resource "aws_elasticsearch_domain" "biblioteca_search" {
  domain_name           = "biblioteca-digital-search"
  elasticsearch_version = "7.10"
  
  cluster_config {
    instance_type = "t3.small.elasticsearch"
    instance_count = 2
  }
  
  ebs_options {
    ebs_enabled = true
    volume_type = "gp2"
    volume_size = 20
  }
  
  vpc_options {
    subnet_ids         = module.vpc.private_subnets
    security_group_ids = [aws_security_group.elasticsearch.id]
  }
}

# S3 Bucket for documents
resource "aws_s3_bucket" "biblioteca_documents" {
  bucket = "biblioteca-digital-documents-${random_string.bucket_suffix.result}"
}

resource "aws_s3_bucket_versioning" "biblioteca_documents" {
  bucket = aws_s3_bucket.biblioteca_documents.id
  versioning_configuration {
    status = "Enabled"
  }
}

# ECS Cluster
resource "aws_ecs_cluster" "biblioteca" {
  name = "biblioteca-digital"
}

# Application Load Balancer
resource "aws_lb" "biblioteca" {
  name               = "biblioteca-digital-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.alb.id]
  subnets            = module.vpc.public_subnets
}
```

#### Lambda Functions for Processing

```javascript
// lambda/document-processor/index.js
const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const textract = new AWS.Textract();

exports.handler = async (event) => {
    for (const record of event.Records) {
        const bucket = record.s3.bucket.name;
        const key = record.s3.object.key;
        
        // Start document analysis
        const params = {
            DocumentLocation: {
                S3Object: {
                    Bucket: bucket,
                    Name: key
                }
            },
            FeatureTypes: ['TABLES', 'FORMS']
        };
        
        const result = await textract.startDocumentAnalysis(params).promise();
        
        // Store job ID for later processing
        await storeProcessingJob(key, result.JobId);
    }
    
    return { statusCode: 200, body: 'Processing started' };
};
```

### Google Cloud Platform

#### Cloud Run + Cloud SQL

```yaml
# cloudbuild.yaml
steps:
  # Build main application
  - name: 'gcr.io/cloud-builders/docker'
    args: ['build', '-t', 'gcr.io/$PROJECT_ID/biblioteca-digital-app', '.']
  
  # Push to Container Registry
  - name: 'gcr.io/cloud-builders/docker'
    args: ['push', 'gcr.io/$PROJECT_ID/biblioteca-digital-app']
  
  # Deploy to Cloud Run
  - name: 'gcr.io/cloud-builders/gcloud'
    args:
      - 'run'
      - 'deploy'
      - 'biblioteca-digital'
      - '--image'
      - 'gcr.io/$PROJECT_ID/biblioteca-digital-app'
      - '--region'
      - 'us-central1'
      - '--platform'
      - 'managed'
      - '--allow-unauthenticated'
```

```bash
# Deploy infrastructure
gcloud sql instances create biblioteca-db \
    --database-version=POSTGRES_14 \
    --tier=db-custom-2-7680 \
    --region=us-central1

gcloud redis instances create biblioteca-cache \
    --size=1 \
    --region=us-central1 \
    --redis-version=redis_6_x
```

### Azure Deployment

#### Container Apps + PostgreSQL

```bash
# Create resource group
az group create --name biblioteca-digital --location eastus

# Create PostgreSQL server
az postgres server create \
    --resource-group biblioteca-digital \
    --name biblioteca-db-server \
    --location eastus \
    --admin-user postgres \
    --admin-password SecurePassword123 \
    --sku-name GP_Gen5_2

# Create container app environment
az containerapp env create \
    --name biblioteca-env \
    --resource-group biblioteca-digital \
    --location eastus

# Deploy container app
az containerapp create \
    --name biblioteca-digital \
    --resource-group biblioteca-digital \
    --environment biblioteca-env \
    --image your-registry/biblioteca-digital:latest \
    --target-port 3000 \
    --ingress external
```

## Traditional Server Deployment

### Ubuntu/Debian Setup

1. **Install dependencies:**

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PostgreSQL
sudo apt install -y postgresql postgresql-contrib

# Install Redis
sudo apt install -y redis-server

# Install Elasticsearch
wget -qO - https://artifacts.elastic.co/GPG-KEY-elasticsearch | sudo apt-key add -
echo "deb https://artifacts.elastic.co/packages/8.x/apt stable main" | sudo tee /etc/apt/sources.list.d/elastic-8.x.list
sudo apt update && sudo apt install elasticsearch

# Install Nginx
sudo apt install -y nginx

# Install PM2 for process management
sudo npm install -g pm2
```

2. **Configure services:**

```bash
# PostgreSQL setup
sudo -u postgres psql
CREATE DATABASE biblioteca_digital;
CREATE USER biblioteca_user WITH PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE biblioteca_digital TO biblioteca_user;
\q

# Redis configuration
sudo nano /etc/redis/redis.conf
# Uncomment: requirepass your_redis_password

# Elasticsearch configuration
sudo nano /etc/elasticsearch/elasticsearch.yml
# Add: cluster.name: biblioteca-digital
# Add: network.host: localhost

# Start services
sudo systemctl enable postgresql redis-server elasticsearch
sudo systemctl start postgresql redis-server elasticsearch
```

3. **Deploy application:**

```bash
# Clone repository
git clone https://github.com/your-org/biblioteca-digital.git
cd biblioteca-digital

# Install dependencies
npm install

# Build application
npm run build

# Configure PM2
pm2 ecosystem init
```

4. **PM2 Configuration:**

```javascript
// ecosystem.config.js
module.exports = {
  apps: [
    {
      name: 'biblioteca-digital',
      script: 'server.js',
      instances: 4,
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      error_file: '/var/log/biblioteca-digital/error.log',
      out_file: '/var/log/biblioteca-digital/out.log',
      log_file: '/var/log/biblioteca-digital/combined.log',
      time: true
    },
    {
      name: 'biblioteca-worker',
      script: 'workers/document-processor.js',
      instances: 2,
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
};
```

### Nginx Configuration

```nginx
# /etc/nginx/sites-available/biblioteca-digital
upstream biblioteca_app {
    server 127.0.0.1:3000;
    server 127.0.0.1:3001;
    server 127.0.0.1:3002;
    server 127.0.0.1:3003;
}

server {
    listen 80;
    server_name biblioteca.your-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name biblioteca.your-domain.com;

    ssl_certificate /etc/ssl/certs/biblioteca.crt;
    ssl_certificate_key /etc/ssl/private/biblioteca.key;
    ssl_protocols TLSv1.2 TLSv1.3;

    # Security headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options DENY always;
    add_header X-Content-Type-Options nosniff always;

    # File upload limit
    client_max_body_size 100M;

    # Main application
    location / {
        proxy_pass http://biblioteca_app;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Static files
    location /uploads/ {
        alias /var/www/biblioteca-digital/uploads/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # API rate limiting
    location /api/ {
        limit_req zone=api burst=20 nodelay;
        proxy_pass http://biblioteca_app;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

# Rate limiting configuration
http {
    limit_req_zone $binary_remote_addr zone=api:10m rate=5r/s;
}
```

## Production Considerations

### Security

1. **Environment Security:**

```bash
# Set proper file permissions
sudo chown -R www-data:www-data /var/www/biblioteca-digital
sudo chmod -R 750 /var/www/biblioteca-digital
sudo chmod 600 /var/www/biblioteca-digital/.env

# Configure firewall
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

2. **Database Security:**

```sql
-- Create read-only user for analytics
CREATE USER biblioteca_readonly WITH PASSWORD 'readonly_password';
GRANT CONNECT ON DATABASE biblioteca_digital TO biblioteca_readonly;
GRANT USAGE ON SCHEMA public TO biblioteca_readonly;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO biblioteca_readonly;

-- Enable row-level security
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
CREATE POLICY user_documents ON documents FOR ALL TO biblioteca_user USING (user_id = current_setting('app.current_user_id')::uuid);
```

3. **Application Security:**

```javascript
// security middleware
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "fonts.googleapis.com"],
      fontSrc: ["'self'", "fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"],
      scriptSrc: ["'self'"]
    }
  }
}));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP'
});

app.use('/api/', limiter);
```

### Performance Optimization

1. **Database Optimization:**

```sql
-- Create indexes for better performance
CREATE INDEX CONCURRENTLY idx_documents_user_id ON documents(user_id);
CREATE INDEX CONCURRENTLY idx_documents_created_at ON documents(created_at DESC);
CREATE INDEX CONCURRENTLY idx_documents_category ON documents(category);
CREATE INDEX CONCURRENTLY idx_documents_tags ON documents USING GIN(tags);
CREATE INDEX CONCURRENTLY idx_documents_search ON documents USING GIN(to_tsvector('spanish', title || ' ' || description));

-- Optimize PostgreSQL configuration
-- Add to postgresql.conf:
shared_buffers = 256MB
effective_cache_size = 1GB
maintenance_work_mem = 64MB
checkpoint_completion_target = 0.9
wal_buffers = 16MB
default_statistics_target = 100
```

2. **Caching Strategy:**

```javascript
const redis = require('redis');
const client = redis.createClient(process.env.REDIS_URL);

// Cache frequently accessed documents
async function getCachedDocument(documentId) {
  const cached = await client.get(`document:${documentId}`);
  if (cached) {
    return JSON.parse(cached);
  }
  
  const document = await Document.findById(documentId);
  await client.setex(`document:${documentId}`, 3600, JSON.stringify(document));
  return document;
}

// Cache search results
async function getCachedSearchResults(query, filters) {
  const cacheKey = `search:${hash(query + JSON.stringify(filters))}`;
  const cached = await client.get(cacheKey);
  if (cached) {
    return JSON.parse(cached);
  }
  
  const results = await searchDocuments(query, filters);
  await client.setex(cacheKey, 300, JSON.stringify(results));
  return results;
}
```

3. **CDN Configuration:**

```javascript
// CloudFront distribution for static assets
const cloudfront = {
  origins: [
    {
      domainName: 'biblioteca.your-domain.com',
      originPath: '/uploads',
      customOriginConfig: {
        httpPort: 443,
        httpsPort: 443,
        originProtocolPolicy: 'https-only'
      }
    }
  ],
  defaultCacheBehavior: {
    targetOriginId: 'biblioteca-uploads',
    viewerProtocolPolicy: 'redirect-to-https',
    compress: true,
    cachePolicyId: '4135ea2d-6df8-44a3-9df3-4b5a84be39ad' // Managed caching optimized
  }
};
```

## Monitoring and Logging

### Application Monitoring

```javascript
// Health check endpoint
app.get('/health', async (req, res) => {
  const health = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version,
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    checks: {
      database: await checkDatabase(),
      redis: await checkRedis(),
      elasticsearch: await checkElasticsearch(),
      storage: await checkStorage()
    }
  };
  
  const isHealthy = Object.values(health.checks).every(check => check.status === 'ok');
  res.status(isHealthy ? 200 : 503).json(health);
});
```

### Logging Configuration

```javascript
const winston = require('winston');
const { ElasticsearchTransport } = require('winston-elasticsearch');

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
    new ElasticsearchTransport({
      level: 'info',
      clientOpts: { node: process.env.ELASTICSEARCH_URL },
      index: 'biblioteca-logs'
    })
  ]
});
```

### Metrics Collection

```javascript
const prometheus = require('prom-client');

// Custom metrics
const httpRequestDuration = new prometheus.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code']
});

const documentProcessingTime = new prometheus.Histogram({
  name: 'document_processing_duration_seconds',
  help: 'Time taken to process documents',
  labelNames: ['document_type']
});

const activeConnections = new prometheus.Gauge({
  name: 'websocket_connections_active',
  help: 'Number of active WebSocket connections'
});

// Metrics endpoint
app.get('/metrics', (req, res) => {
  res.set('Content-Type', prometheus.register.contentType);
  res.end(prometheus.register.metrics());
});
```

## Backup and Recovery

### Database Backup

```bash
#!/bin/bash
# backup-db.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups/biblioteca-digital"
DB_NAME="biblioteca_digital"
S3_BUCKET="biblioteca-backups"

# Create backup directory
mkdir -p $BACKUP_DIR

# PostgreSQL backup with compression
pg_dump $DB_NAME | gzip > $BACKUP_DIR/db_backup_$DATE.sql.gz

# Upload to S3
aws s3 cp $BACKUP_DIR/db_backup_$DATE.sql.gz s3://$S3_BUCKET/database/

# Remove local backup older than 7 days
find $BACKUP_DIR -name "*.sql.gz" -mtime +7 -delete

echo "Database backup completed: db_backup_$DATE.sql.gz"
```

### Document Backup

```bash
#!/bin/bash
# backup-documents.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups/biblioteca-digital"
UPLOAD_DIR="/var/www/biblioteca-digital/uploads"
S3_BUCKET="biblioteca-backups"

# Sync documents to S3
aws s3 sync $UPLOAD_DIR s3://$S3_BUCKET/documents/ --delete

# Create incremental backup
rsync -av --link-dest=$BACKUP_DIR/documents-latest $UPLOAD_DIR $BACKUP_DIR/documents-$DATE
ln -nfs documents-$DATE $BACKUP_DIR/documents-latest

echo "Document backup completed: documents-$DATE"
```

### Elasticsearch Backup

```bash
#!/bin/bash
# backup-elasticsearch.sh

DATE=$(date +%Y%m%d_%H%M%S)
ES_URL="http://localhost:9200"
BACKUP_REPO="biblioteca_backup"
S3_BUCKET="biblioteca-backups"

# Create snapshot
curl -X PUT "$ES_URL/_snapshot/$BACKUP_REPO/snapshot_$DATE" -H 'Content-Type: application/json' -d'
{
  "indices": "biblioteca_documents",
  "include_global_state": false
}'

# Monitor snapshot progress
while true; do
  STATUS=$(curl -s "$ES_URL/_snapshot/$BACKUP_REPO/snapshot_$DATE" | jq -r '.snapshots[0].state')
  if [ "$STATUS" = "SUCCESS" ]; then
    echo "Elasticsearch backup completed: snapshot_$DATE"
    break
  elif [ "$STATUS" = "FAILED" ]; then
    echo "Elasticsearch backup failed"
    exit 1
  fi
  sleep 10
done
```

## Troubleshooting

### Common Issues

1. **Memory Issues:**

```bash
# Monitor memory usage
free -h
ps aux --sort=-%mem | head

# Node.js memory optimization
export NODE_OPTIONS="--max-old-space-size=4096"

# PM2 memory monitoring
pm2 monit
pm2 reload all  # Graceful reload to clear memory leaks
```

2. **Database Performance:**

```sql
-- Check slow queries
SELECT query, mean_time, calls, total_time 
FROM pg_stat_statements 
ORDER BY total_time DESC 
LIMIT 10;

-- Check database connections
SELECT * FROM pg_stat_activity WHERE state = 'active';

-- Vacuum and analyze
VACUUM ANALYZE;
```

3. **Elasticsearch Issues:**

```bash
# Check cluster health
curl -X GET "localhost:9200/_cluster/health?pretty"

# Check index statistics
curl -X GET "localhost:9200/biblioteca_documents/_stats?pretty"

# Reindex if needed
curl -X POST "localhost:9200/_reindex" -H 'Content-Type: application/json' -d'
{
  "source": { "index": "biblioteca_documents_old" },
  "dest": { "index": "biblioteca_documents_new" }
}'
```

4. **File Upload Issues:**

```bash
# Check disk space
df -h

# Check upload directory permissions
ls -la /var/www/biblioteca-digital/uploads/

# Monitor file processing queue
redis-cli llen document_processing_queue
```

### Performance Monitoring

```bash
# Application performance
pm2 monit

# System performance
htop
iostat -x 1
sar -u 1 10

# Network monitoring
netstat -tuln
ss -tuln
```

### Emergency Procedures

```bash
# Emergency stop
pm2 stop all
sudo systemctl stop nginx

# Emergency restart
pm2 restart all
sudo systemctl restart postgresql redis-server elasticsearch nginx

# Database emergency recovery
sudo -u postgres pg_resetwal /var/lib/postgresql/14/main

# Clear caches
redis-cli flushall
sudo sync && sudo echo 3 > /proc/sys/vm/drop_caches
```

This comprehensive deployment guide covers all aspects of deploying the Biblioteca Digital system in production environments with proper security, monitoring, and backup procedures.

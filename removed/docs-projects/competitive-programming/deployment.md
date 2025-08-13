---
title: "Guía de Despliegue"
description: "Despliegue de la plataforma en diferentes entornos"
chapter: "Despliegue"
section: "Guía de Despliegue"
order: 1
---

# Deployment Guide

This guide covers deploying the Competitive Programming Platform in various environments, from development to production.

## Prerequisites

- Node.js 18+ and npm/yarn
- Docker and Docker Compose
- PostgreSQL 13+
- Redis 6+
- Nginx (for production)
- SSL certificate (for production)

## Development Deployment

### Local Setup

```bash
# Clone and setup
git clone <repository-url>
cd competitive-programming-platform
npm install

# Setup environment
cp .env.example .env
# Edit .env with your configuration

# Start database services
docker-compose up -d postgres redis

# Run migrations
npm run db:migrate
npm run db:seed

# Start development server
npm run dev
```

### Using Docker Compose

```bash
# Start all services
docker-compose -f docker-compose.dev.yml up

# Access application
# Frontend: http://localhost:3000
# Backend API: http://localhost:3001
# Admin Panel: http://localhost:3002
```

## Production Deployment

### Using Docker

#### 1. Prepare Environment

```bash
# Create production directory
mkdir /opt/competitive-platform
cd /opt/competitive-platform

# Copy configuration files
cp docker-compose.prod.yml docker-compose.yml
cp .env.production .env
```

#### 2. Configure Environment Variables

```bash
# .env.production
NODE_ENV=production
PORT=3001
DATABASE_URL=postgresql://user:password@postgres:5432/competitive_db
REDIS_URL=redis://redis:6379
JWT_SECRET=your-super-secure-jwt-secret
JUDGE_QUEUE_CONCURRENCY=4
MAX_EXECUTION_TIME=30
MAX_MEMORY_LIMIT=256
```

#### 3. Deploy with Docker Compose

```yaml
# docker-compose.prod.yml
version: '3.8'

services:
  frontend:
    image: competitive-platform/frontend:latest
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=https://api.yourplatform.com
    depends_on:
      - backend

  backend:
    image: competitive-platform/backend:latest
    ports:
      - "3001:3001"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=${DATABASE_URL}
      - REDIS_URL=${REDIS_URL}
    depends_on:
      - postgres
      - redis
    volumes:
      - ./uploads:/app/uploads
      - ./logs:/app/logs

  judge:
    image: competitive-platform/judge:latest
    environment:
      - REDIS_URL=${REDIS_URL}
      - MAX_EXECUTION_TIME=30
      - MAX_MEMORY_LIMIT=256
    depends_on:
      - redis
    volumes:
      - ./judge-temp:/tmp/judge
    security_opt:
      - seccomp:unconfined
    cap_add:
      - SYS_PTRACE

  postgres:
    image: postgres:13
    environment:
      - POSTGRES_DB=competitive_db
      - POSTGRES_USER=${DB_USER}
      - POSTGRES_PASSWORD=${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./backups:/backups

  redis:
    image: redis:6-alpine
    command: redis-server --appendonly yes
    volumes:
      - redis_data:/data

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - frontend
      - backend

volumes:
  postgres_data:
  redis_data:
```

#### 4. Start Production Services

```bash
# Build and start services
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f
```

### Traditional Server Deployment

#### 1. Server Setup (Ubuntu 20.04+)

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PostgreSQL
sudo apt-get install -y postgresql postgresql-contrib

# Install Redis
sudo apt-get install -y redis-server

# Install Nginx
sudo apt-get install -y nginx

# Install PM2 for process management
sudo npm install -g pm2
```

#### 2. Database Setup

```bash
# Configure PostgreSQL
sudo -u postgres psql
CREATE DATABASE competitive_db;
CREATE USER competitive_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE competitive_db TO competitive_user;
\q

# Configure Redis
sudo systemctl enable redis-server
sudo systemctl start redis-server
```

#### 3. Application Setup

```bash
# Create application directory
sudo mkdir /opt/competitive-platform
sudo chown $USER:$USER /opt/competitive-platform
cd /opt/competitive-platform

# Clone and build application
git clone <repository-url> .
npm install
npm run build

# Setup environment
cp .env.production .env
# Edit .env with your configuration

# Run database migrations
npm run db:migrate
npm run db:seed
```

#### 4. Process Management with PM2

```bash
# Create PM2 ecosystem file
cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [
    {
      name: 'competitive-backend',
      script: './dist/server.js',
      instances: 2,
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3001
      }
    },
    {
      name: 'competitive-judge',
      script: './dist/judge/worker.js',
      instances: 2,
      env: {
        NODE_ENV: 'production'
      }
    },
    {
      name: 'competitive-scheduler',
      script: './dist/scheduler.js',
      instances: 1,
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
};
EOF

# Start applications
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

#### 5. Nginx Configuration

```nginx
# /etc/nginx/sites-available/competitive-platform
server {
    listen 80;
    server_name yourplatform.com www.yourplatform.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourplatform.com www.yourplatform.com;

    ssl_certificate /etc/nginx/ssl/cert.pem;
    ssl_certificate_key /etc/nginx/ssl/key.pem;
    
    # Security headers
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains";

    # Frontend
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # API
    location /api/ {
        proxy_pass http://localhost:3001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        client_max_body_size 10M;
    }

    # WebSocket for real-time updates
    location /ws {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Static files
    location /static/ {
        alias /opt/competitive-platform/public/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/competitive-platform /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## Cloud Deployment

### AWS Deployment

#### Using ECS with Fargate

```yaml
# docker-compose.aws.yml
version: '3.8'

services:
  competitive-platform:
    image: your-ecr-repo/competitive-platform:latest
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=${RDS_DATABASE_URL}
      - REDIS_URL=${ELASTICACHE_URL}
      - AWS_REGION=${AWS_REGION}
    logging:
      driver: awslogs
      options:
        awslogs-group: /ecs/competitive-platform
        awslogs-region: us-east-1
        awslogs-stream-prefix: ecs
```

#### Terraform Configuration

```hcl
# main.tf
resource "aws_ecs_cluster" "competitive_platform" {
  name = "competitive-platform"
}

resource "aws_rds_instance" "postgres" {
  identifier        = "competitive-db"
  engine           = "postgres"
  engine_version   = "13.7"
  instance_class   = "db.t3.micro"
  allocated_storage = 20
  
  db_name  = "competitive_db"
  username = var.db_username
  password = var.db_password
  
  skip_final_snapshot = true
}

resource "aws_elasticache_cluster" "redis" {
  cluster_id           = "competitive-redis"
  engine               = "redis"
  node_type            = "cache.t3.micro"
  num_cache_nodes      = 1
  parameter_group_name = "default.redis6.x"
}
```

### Google Cloud Platform

```yaml
# cloudbuild.yaml
steps:
  - name: 'gcr.io/cloud-builders/docker'
    args: ['build', '-t', 'gcr.io/$PROJECT_ID/competitive-platform', '.']
  - name: 'gcr.io/cloud-builders/docker'
    args: ['push', 'gcr.io/$PROJECT_ID/competitive-platform']
  - name: 'gcr.io/cloud-builders/gcloud'
    args: ['run', 'deploy', 'competitive-platform', 
           '--image', 'gcr.io/$PROJECT_ID/competitive-platform',
           '--platform', 'managed',
           '--region', 'us-central1',
           '--allow-unauthenticated']
```

## Monitoring and Logging

### Application Monitoring

```javascript
// monitoring/health.js
const express = require('express');
const router = express.Router();

router.get('/health', async (req, res) => {
  const health = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    services: {
      database: await checkDatabase(),
      redis: await checkRedis(),
      judge: await checkJudgeSystem()
    }
  };
  
  res.json(health);
});

async function checkDatabase() {
  try {
    await db.raw('SELECT 1');
    return { status: 'healthy' };
  } catch (error) {
    return { status: 'unhealthy', error: error.message };
  }
}
```

### Logging Configuration

```javascript
// config/logger.js
const winston = require('winston');

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
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ]
});

module.exports = logger;
```

## Backup and Recovery

### Database Backup

```bash
#!/bin/bash
# backup.sh
BACKUP_DIR="/backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
DB_NAME="competitive_db"

# Create backup
pg_dump $DB_NAME > "$BACKUP_DIR/backup_$TIMESTAMP.sql"

# Compress backup
gzip "$BACKUP_DIR/backup_$TIMESTAMP.sql"

# Clean old backups (keep last 7 days)
find $BACKUP_DIR -name "backup_*.sql.gz" -mtime +7 -delete

echo "Backup completed: backup_$TIMESTAMP.sql.gz"
```

### Automated Backup with Cron

```bash
# Add to crontab
crontab -e

# Backup database daily at 2 AM
0 2 * * * /opt/competitive-platform/scripts/backup.sh

# Backup uploaded files daily at 3 AM
0 3 * * * rsync -av /opt/competitive-platform/uploads /backups/files/
```

## Troubleshooting

### Common Issues

1. **High Memory Usage**
   - Monitor judge container memory
   - Adjust `MAX_MEMORY_LIMIT` setting
   - Scale judge workers horizontally

2. **Slow Database Queries**
   - Check query execution plans
   - Add database indexes
   - Enable query logging

3. **WebSocket Connection Issues**
   - Check nginx WebSocket configuration
   - Verify firewall settings
   - Monitor connection limits

### Performance Optimization

```javascript
// Optimize database connections
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  max: 20, // Maximum connections
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Redis connection optimization
const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  retryDelayOnFailover: 100,
  maxRetriesPerRequest: 3,
  lazyConnect: true
});
```

### Log Analysis

```bash
# Monitor application logs
tail -f /opt/competitive-platform/logs/combined.log

# Check for errors
grep -i error /opt/competitive-platform/logs/combined.log

# Monitor system resources
htop
iotop
nethogs
```

## Security Considerations

- Use HTTPS in production
- Implement rate limiting
- Sanitize user inputs
- Keep dependencies updated
- Use strong passwords and JWT secrets
- Enable database SSL connections
- Implement proper CORS policies
- Monitor for suspicious activities

This deployment guide provides comprehensive instructions for deploying the Competitive Programming Platform in various environments with proper monitoring, backup strategies, and security considerations.

# FIUNA Chatbot Deployment Guide

This guide covers the deployment of the FIUNA AI Chatbot across different environments and platforms.

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

- **CPU**: 2+ cores (4+ recommended for production)
- **RAM**: 4GB minimum (8GB+ recommended)
- **Storage**: 20GB available space
- **Network**: Stable internet connection for AI API calls

### Required Services

- Python 3.8+
- PostgreSQL 12+
- Redis 6+
- Node.js 16+ (for frontend)
- OpenAI API key
- Elasticsearch (optional, for advanced search)

## Environment Configuration

### Environment Variables

Create a `.env` file with the following variables:

```env
# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/fiuna_chatbot
REDIS_URL=redis://localhost:6379

# AI Configuration
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-4
MAX_TOKENS=2048
TEMPERATURE=0.7

# Authentication
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRATION=24h

# Application Configuration
APP_ENV=production
APP_PORT=8000
FRONTEND_URL=https://your-domain.com

# File Storage
UPLOAD_MAX_SIZE=10485760  # 10MB
STORAGE_PATH=/app/uploads

# Rate Limiting
RATE_LIMIT_PER_MINUTE=60
RATE_LIMIT_PER_HOUR=1000

# Monitoring
SENTRY_DSN=your_sentry_dsn_here
LOG_LEVEL=info

# Email Configuration (for notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

## Docker Deployment

### Multi-Container Setup

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  # Backend API
  api:
    build: 
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql://postgres:password@db:5432/fiuna_chatbot
      - REDIS_URL=redis://redis:6379
    depends_on:
      - db
      - redis
    volumes:
      - ./uploads:/app/uploads
    restart: unless-stopped

  # Frontend
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - REACT_APP_API_URL=http://api:8000
    depends_on:
      - api
    restart: unless-stopped

  # Database
  db:
    image: postgres:14
    environment:
      POSTGRES_DB: fiuna_chatbot
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./scripts/init.sql:/docker-entrypoint-initdb.d/init.sql
    restart: unless-stopped

  # Redis Cache
  redis:
    image: redis:7-alpine
    command: redis-server --appendonly yes
    volumes:
      - redis_data:/data
    restart: unless-stopped

  # Nginx Reverse Proxy
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - api
      - frontend
    restart: unless-stopped

volumes:
  postgres_data:
  redis_data:
```

### Backend Dockerfile

```dockerfile
FROM python:3.9-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Create uploads directory
RUN mkdir -p /app/uploads

# Run database migrations
RUN python manage.py migrate

EXPOSE 8000

CMD ["gunicorn", "--bind", "0.0.0.0:8000", "--workers", "4", "app:app"]
```

### Frontend Dockerfile

```dockerfile
FROM node:16-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Build application
COPY . .
RUN npm run build

# Production image
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
```

### Deployment Commands

```bash
# Build and start containers
docker-compose up -d --build

# View logs
docker-compose logs -f

# Scale services
docker-compose up -d --scale api=3

# Stop services
docker-compose down
```

## Cloud Deployment

### AWS Deployment

#### ECS with Fargate

1. **Create ECR repositories:**

```bash
aws ecr create-repository --repository-name fiuna-chatbot-api
aws ecr create-repository --repository-name fiuna-chatbot-frontend
```

2. **Build and push images:**

```bash
# Login to ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 123456789012.dkr.ecr.us-east-1.amazonaws.com

# Build and push API
docker build -t fiuna-chatbot-api ./backend
docker tag fiuna-chatbot-api:latest 123456789012.dkr.ecr.us-east-1.amazonaws.com/fiuna-chatbot-api:latest
docker push 123456789012.dkr.ecr.us-east-1.amazonaws.com/fiuna-chatbot-api:latest

# Build and push frontend
docker build -t fiuna-chatbot-frontend ./frontend
docker tag fiuna-chatbot-frontend:latest 123456789012.dkr.ecr.us-east-1.amazonaws.com/fiuna-chatbot-frontend:latest
docker push 123456789012.dkr.ecr.us-east-1.amazonaws.com/fiuna-chatbot-frontend:latest
```

3. **Create ECS task definition:**

```json
{
  "family": "fiuna-chatbot",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "1024",
  "memory": "2048",
  "executionRoleArn": "arn:aws:iam::123456789012:role/ecsTaskExecutionRole",
  "containerDefinitions": [
    {
      "name": "api",
      "image": "123456789012.dkr.ecr.us-east-1.amazonaws.com/fiuna-chatbot-api:latest",
      "portMappings": [
        {
          "containerPort": 8000,
          "protocol": "tcp"
        }
      ],
      "environment": [
        {
          "name": "DATABASE_URL",
          "value": "postgresql://username:password@rds-endpoint:5432/fiuna_chatbot"
        }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/fiuna-chatbot",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "ecs"
        }
      }
    }
  ]
}
```

#### RDS Database Setup

```bash
# Create RDS instance
aws rds create-db-instance \
    --db-instance-identifier fiuna-chatbot-db \
    --db-instance-class db.t3.micro \
    --engine postgres \
    --master-username postgres \
    --master-user-password yourpassword \
    --allocated-storage 20 \
    --vpc-security-group-ids sg-12345678
```

### Google Cloud Platform

#### Cloud Run Deployment

1. **Build and deploy API:**

```bash
# Build image
gcloud builds submit --tag gcr.io/PROJECT_ID/fiuna-chatbot-api ./backend

# Deploy to Cloud Run
gcloud run deploy fiuna-chatbot-api \
    --image gcr.io/PROJECT_ID/fiuna-chatbot-api \
    --platform managed \
    --region us-central1 \
    --allow-unauthenticated \
    --set-env-vars DATABASE_URL=postgresql://username:password@host:5432/fiuna_chatbot
```

2. **Set up Cloud SQL:**

```bash
# Create Cloud SQL instance
gcloud sql instances create fiuna-chatbot-db \
    --database-version=POSTGRES_13 \
    --tier=db-f1-micro \
    --region=us-central1

# Create database
gcloud sql databases create fiuna_chatbot --instance=fiuna-chatbot-db
```

### Azure Deployment

#### Container Instances

```bash
# Create resource group
az group create --name fiuna-chatbot --location eastus

# Deploy container
az container create \
    --resource-group fiuna-chatbot \
    --name fiuna-chatbot-api \
    --image your-registry/fiuna-chatbot-api:latest \
    --ports 8000 \
    --environment-variables DATABASE_URL=postgresql://username:password@host:5432/fiuna_chatbot
```

## Traditional Server Deployment

### Ubuntu/Debian Setup

1. **Install dependencies:**

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Python and PostgreSQL
sudo apt install -y python3 python3-pip postgresql postgresql-contrib redis-server nginx

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt install -y nodejs
```

2. **Setup database:**

```bash
# Switch to postgres user
sudo -u postgres psql

# Create database and user
CREATE DATABASE fiuna_chatbot;
CREATE USER chatbot_user WITH PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE fiuna_chatbot TO chatbot_user;
\q
```

3. **Deploy application:**

```bash
# Clone repository
git clone https://github.com/your-org/fiuna-chatbot.git
cd fiuna-chatbot

# Setup backend
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Setup frontend
cd ../frontend
npm install
npm run build

# Setup systemd service
sudo cp deployment/fiuna-chatbot.service /etc/systemd/system/
sudo systemctl enable fiuna-chatbot
sudo systemctl start fiuna-chatbot
```

### Nginx Configuration

```nginx
server {
    listen 80;
    server_name your-domain.com;

    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com;

    ssl_certificate /etc/ssl/certs/your-domain.crt;
    ssl_certificate_key /etc/ssl/private/your-domain.key;

    # Frontend
    location / {
        root /var/www/fiuna-chatbot/frontend/dist;
        try_files $uri $uri/ /index.html;
    }

    # API
    location /api/ {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # WebSocket support
    location /ws/ {
        proxy_pass http://127.0.0.1:8000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
    }
}
```

## Production Considerations

### Security

1. **SSL/TLS Configuration:**

```bash
# Install Certbot for Let's Encrypt
sudo apt install certbot python3-certbot-nginx

# Obtain SSL certificate
sudo certbot --nginx -d your-domain.com
```

2. **Firewall Setup:**

```bash
# Configure UFW
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

3. **API Security:**

```python
# Rate limiting configuration
RATELIMIT_STORAGE_URL = 'redis://localhost:6379'
RATELIMIT_DEFAULT = "100/hour"

# CORS configuration
CORS_ALLOWED_ORIGINS = [
    "https://your-domain.com",
    "https://www.your-domain.com"
]
```

### Performance Optimization

1. **Database optimization:**

```sql
-- Create indexes for better performance
CREATE INDEX idx_conversations_user_id ON conversations(user_id);
CREATE INDEX idx_messages_conversation_id ON messages(conversation_id);
CREATE INDEX idx_messages_timestamp ON messages(created_at);
```

2. **Caching strategy:**

```python
# Redis caching configuration
CACHE_CONFIG = {
    'USER_SESSIONS': 3600,  # 1 hour
    'API_RESPONSES': 300,   # 5 minutes
    'KNOWLEDGE_BASE': 86400 # 24 hours
}
```

### Scaling Configuration

1. **Horizontal scaling:**

```yaml
# docker-compose.override.yml for scaling
version: '3.8'
services:
  api:
    deploy:
      replicas: 3
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
```

2. **Load balancer setup:**

```nginx
upstream api_backend {
    server api_1:8000;
    server api_2:8000;
    server api_3:8000;
}

server {
    location /api/ {
        proxy_pass http://api_backend;
    }
}
```

## Monitoring and Logging

### Application Monitoring

1. **Health check endpoint:**

```python
@app.route('/health')
def health_check():
    return {
        'status': 'healthy',
        'timestamp': datetime.utcnow().isoformat(),
        'version': app.config.get('VERSION', '1.0.0'),
        'database': check_database_connection(),
        'redis': check_redis_connection()
    }
```

2. **Prometheus metrics:**

```python
from prometheus_client import Counter, Histogram, generate_latest

REQUEST_COUNT = Counter('http_requests_total', 'Total HTTP requests', ['method', 'endpoint'])
REQUEST_DURATION = Histogram('http_request_duration_seconds', 'HTTP request duration')

@app.route('/metrics')
def metrics():
    return generate_latest()
```

### Logging Configuration

```python
LOGGING_CONFIG = {
    'version': 1,
    'formatters': {
        'default': {
            'format': '[%(asctime)s] %(levelname)s in %(module)s: %(message)s',
        }
    },
    'handlers': {
        'file': {
            'level': 'INFO',
            'class': 'logging.handlers.RotatingFileHandler',
            'filename': '/var/log/fiuna-chatbot/app.log',
            'maxBytes': 10485760,  # 10MB
            'backupCount': 5,
            'formatter': 'default'
        }
    },
    'root': {
        'level': 'INFO',
        'handlers': ['file']
    }
}
```

### Monitoring Stack

```yaml
# monitoring/docker-compose.yml
version: '3.8'
services:
  prometheus:
    image: prom/prometheus
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml

  grafana:
    image: grafana/grafana
    ports:
      - "3001:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin
    volumes:
      - grafana_data:/var/lib/grafana

volumes:
  grafana_data:
```

## Backup and Recovery

### Database Backup

```bash
#!/bin/bash
# backup.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups/fiuna-chatbot"
DB_NAME="fiuna_chatbot"

# Create backup directory
mkdir -p $BACKUP_DIR

# PostgreSQL backup
pg_dump $DB_NAME > $BACKUP_DIR/db_backup_$DATE.sql

# Compress backup
gzip $BACKUP_DIR/db_backup_$DATE.sql

# Remove backups older than 30 days
find $BACKUP_DIR -name "*.gz" -mtime +30 -delete

echo "Backup completed: db_backup_$DATE.sql.gz"
```

### File Backup

```bash
#!/bin/bash
# file-backup.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups/fiuna-chatbot"
APP_DIR="/var/www/fiuna-chatbot"

# Backup uploaded files
tar -czf $BACKUP_DIR/files_backup_$DATE.tar.gz $APP_DIR/uploads

# Backup configuration
tar -czf $BACKUP_DIR/config_backup_$DATE.tar.gz $APP_DIR/.env $APP_DIR/nginx

echo "File backup completed: files_backup_$DATE.tar.gz"
```

### Automated Backup with Cron

```bash
# Add to crontab (crontab -e)
0 2 * * * /scripts/backup.sh
0 3 * * * /scripts/file-backup.sh
```

### Recovery Procedures

```bash
# Database recovery
gunzip db_backup_20240604_020000.sql.gz
psql fiuna_chatbot < db_backup_20240604_020000.sql

# File recovery
tar -xzf files_backup_20240604_030000.tar.gz -C /var/www/fiuna-chatbot/
```

## Troubleshooting

### Common Issues

1. **Database Connection Issues:**

```bash
# Check database status
sudo systemctl status postgresql

# Check connection
psql -h localhost -U chatbot_user -d fiuna_chatbot -c "SELECT 1;"

# Check logs
sudo tail -f /var/log/postgresql/postgresql-13-main.log
```

2. **Redis Connection Issues:**

```bash
# Check Redis status
sudo systemctl status redis-server

# Test connection
redis-cli ping

# Check logs
sudo tail -f /var/log/redis/redis-server.log
```

3. **OpenAI API Issues:**

```python
# Test API connection
import openai

try:
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": "Hello"}],
        max_tokens=10
    )
    print("API connection successful")
except Exception as e:
    print(f"API error: {e}")
```

4. **High Memory Usage:**

```bash
# Monitor memory usage
htop
free -h

# Check application memory
ps aux | grep python

# Optimize Python memory
export PYTHONOPTIMIZE=2
export PYTHON_GC_GENERATIONS="700,10,10"
```

5. **Slow Response Times:**

```bash
# Check system load
uptime
iostat 1 5

# Monitor database queries
sudo -u postgres psql -c "SELECT query, state, query_start FROM pg_stat_activity WHERE state != 'idle';"

# Check Redis performance
redis-cli --latency
```

### Log Analysis

```bash
# Application logs
tail -f /var/log/fiuna-chatbot/app.log | grep ERROR

# Nginx logs
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log

# System logs
journalctl -u fiuna-chatbot -f
```

### Performance Tuning

```python
# Database connection pool
SQLALCHEMY_ENGINE_OPTIONS = {
    'pool_size': 10,
    'pool_recycle': 3600,
    'pool_pre_ping': True,
    'max_overflow': 20
}

# Redis connection pool
REDIS_CONNECTION_POOL = redis.ConnectionPool(
    host='localhost',
    port=6379,
    max_connections=20
)
```

### Emergency Procedures

```bash
# Emergency stop
sudo systemctl stop fiuna-chatbot
sudo systemctl stop nginx

# Emergency restart
sudo systemctl restart fiuna-chatbot
sudo systemctl restart nginx
sudo systemctl restart postgresql
sudo systemctl restart redis-server

# Check service status
sudo systemctl status fiuna-chatbot nginx postgresql redis-server
```

This deployment guide provides comprehensive instructions for deploying the FIUNA Chatbot across various environments with production-ready configurations, monitoring, and troubleshooting procedures.

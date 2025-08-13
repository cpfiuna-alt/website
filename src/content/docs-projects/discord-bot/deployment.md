---
title: "Guía de Despliegue"
description: "Despliegue del bot de Discord CPF en diferentes entornos"
chapter: "Despliegue"
section: "Guía de Despliegue"
order: 1
---

# Deployment del Discord Bot

## Preparación para Deployment

### Requisitos del Sistema

**Servidor mínimo recomendado:**
- CPU: 1 vCore
- RAM: 512MB
- Almacenamiento: 5GB SSD
- OS: Ubuntu 20.04 LTS o superior

**Para producción:**
- CPU: 2 vCores
- RAM: 2GB
- Almacenamiento: 20GB SSD
- OS: Ubuntu 22.04 LTS

### Dependencias del Sistema

```bash
# Actualizar el sistema
sudo apt update && sudo apt upgrade -y

# Instalar Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Instalar PM2 para gestión de procesos
sudo npm install -g pm2

# Instalar Git
sudo apt-get install -y git

# Instalar MongoDB (opcional, si usas base de datos local)
sudo apt-get install -y mongodb
```

## Configuración del Entorno

### Variables de Entorno

Crear archivo `.env` en el directorio raíz:

```env
# Bot Configuration
DISCORD_TOKEN=your_discord_bot_token
DISCORD_CLIENT_ID=your_bot_client_id
DISCORD_GUILD_ID=your_server_id

# Database
MONGODB_URI=mongodb://localhost:27017/cpf-discord-bot
# o para MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/cpf-discord-bot

# Application
NODE_ENV=production
LOG_LEVEL=info
PORT=3000

# External APIs
GITHUB_TOKEN=your_github_token
WEATHER_API_KEY=your_weather_api_key

# Security
JWT_SECRET=your_jwt_secret_key
ENCRYPTION_KEY=your_32_character_encryption_key

# Rate Limiting
RATE_LIMIT_WINDOW=60000
RATE_LIMIT_MAX=100

# Monitoring
SENTRY_DSN=your_sentry_dsn
```

### Configuración de Seguridad

```bash
# Crear usuario para el bot
sudo useradd -m -s /bin/bash cpfbot
sudo usermod -aG sudo cpfbot

# Configurar firewall
sudo ufw allow 22/tcp   # SSH
sudo ufw allow 80/tcp   # HTTP
sudo ufw allow 443/tcp  # HTTPS
sudo ufw enable

# Configurar fail2ban para proteger SSH
sudo apt-get install -y fail2ban
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
```

## Deployment con Docker

### Dockerfile

```dockerfile
FROM node:18-alpine

# Crear directorio de la aplicación
WORKDIR /usr/src/app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias de producción
RUN npm ci --only=production && npm cache clean --force

# Copiar código fuente
COPY . .

# Crear usuario no-root
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

# Cambiar permisos
RUN chown -R nodejs:nodejs /usr/src/app
USER nodejs

# Exponer puerto
EXPOSE 3000

# Definir health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node healthcheck.js

# Comando de inicio
CMD ["node", "index.js"]
```

### Docker Compose

```yaml
version: '3.8'

services:
  cpf-discord-bot:
    build: .
    container_name: cpf-discord-bot
    restart: unless-stopped
    environment:
      - NODE_ENV=production
    env_file:
      - .env
    volumes:
      - ./logs:/usr/src/app/logs
    networks:
      - cpf-network
    depends_on:
      - mongodb
    healthcheck:
      test: ["CMD", "node", "healthcheck.js"]
      interval: 30s
      timeout: 10s
      retries: 3

  mongodb:
    image: mongo:6.0
    container_name: cpf-mongodb
    restart: unless-stopped
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: ${MONGO_PASSWORD}
      MONGO_INITDB_DATABASE: cpf-discord-bot
    volumes:
      - mongodb_data:/data/db
      - ./mongo-init.js:/docker-entrypoint-initdb.d/mongo-init.js:ro
    networks:
      - cpf-network
    ports:
      - "27017:27017"

  nginx:
    image: nginx:alpine
    container_name: cpf-nginx
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - ./ssl:/etc/nginx/ssl:ro
    networks:
      - cpf-network
    depends_on:
      - cpf-discord-bot

volumes:
  mongodb_data:

networks:
  cpf-network:
    driver: bridge
```

### Comandos de Deployment

```bash
# Construir y ejecutar
docker-compose up -d

# Ver logs
docker-compose logs -f cpf-discord-bot

# Actualizar aplicación
docker-compose pull
docker-compose up -d --force-recreate

# Backup de base de datos
docker exec cpf-mongodb mongodump --out /backup
```

## Deployment Tradicional

### Clonación y Configuración

```bash
# Cambiar al usuario del bot
sudo su - cpfbot

# Clonar repositorio
git clone https://github.com/cpf-fiuna/discord-bot.git
cd discord-bot

# Instalar dependencias
npm ci --production

# Configurar variables de entorno
cp .env.example .env
nano .env  # Editar con los valores correctos

# Verificar configuración
npm run validate-config
```

### Configuración de PM2

Crear archivo `ecosystem.config.js`:

```javascript
module.exports = {
  apps: [{
    name: 'cpf-discord-bot',
    script: './index.js',
    instances: 1,
    exec_mode: 'fork',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    env_production: {
      NODE_ENV: 'production'
    },
    log_file: './logs/combined.log',
    out_file: './logs/out.log',
    error_file: './logs/error.log',
    time: true,
    max_memory_restart: '500M',
    restart_delay: 4000,
    max_restarts: 10,
    min_uptime: '10s',
    watch: false,
    ignore_watch: [
      'node_modules',
      'logs',
      '.git'
    ]
  }]
};
```

### Iniciar con PM2

```bash
# Iniciar aplicación
pm2 start ecosystem.config.js --env production

# Guardar configuración de PM2
pm2 save

# Configurar PM2 para arrancar al boot
pm2 startup
# Ejecutar el comando que muestra PM2

# Ver estado
pm2 status

# Ver logs
pm2 logs cpf-discord-bot

# Reiniciar aplicación
pm2 restart cpf-discord-bot
```

## Configuración de Nginx

### Nginx Configuration

```nginx
events {
    worker_connections 1024;
}

http {
    upstream cpf_bot {
        server localhost:3000;
    }

    # Rate limiting
    limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;

    server {
        listen 80;
        server_name bot.cpf-fiuna.org;
        
        # Redirect HTTP to HTTPS
        return 301 https://$server_name$request_uri;
    }

    server {
        listen 443 ssl http2;
        server_name bot.cpf-fiuna.org;

        # SSL Configuration
        ssl_certificate /etc/nginx/ssl/cert.pem;
        ssl_certificate_key /etc/nginx/ssl/key.pem;
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers HIGH:!aNULL:!MD5;
        ssl_prefer_server_ciphers on;

        # Security headers
        add_header X-Frame-Options DENY;
        add_header X-Content-Type-Options nosniff;
        add_header X-XSS-Protection "1; mode=block";
        add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

        # API endpoints
        location /api/ {
            limit_req zone=api burst=20 nodelay;
            proxy_pass http://cpf_bot;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        # Webhooks
        location /webhooks/ {
            proxy_pass http://cpf_bot;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        # Health check
        location /health {
            proxy_pass http://cpf_bot;
            access_log off;
        }

        # Static files (si tienes dashboard web)
        location / {
            root /var/www/cpf-bot-dashboard;
            try_files $uri $uri/ /index.html;
        }
    }
}
```

## SSL/TLS Configuration

### Certificado con Let's Encrypt

```bash
# Instalar Certbot
sudo apt-get install -y certbot python3-certbot-nginx

# Obtener certificado
sudo certbot --nginx -d bot.cpf-fiuna.org

# Verificar renovación automática
sudo certbot renew --dry-run

# Configurar cron para renovación automática
echo "0 12 * * * /usr/bin/certbot renew --quiet" | sudo crontab -
```

## Monitoreo y Logging

### Configuración de Logs

```javascript
// logger.js
const winston = require('winston');
const path = require('path');

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'cpf-discord-bot' },
  transports: [
    new winston.transports.File({ 
      filename: path.join(__dirname, 'logs', 'error.log'), 
      level: 'error' 
    }),
    new winston.transports.File({ 
      filename: path.join(__dirname, 'logs', 'combined.log') 
    })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

module.exports = logger;
```

### Health Check Endpoint

```javascript
// healthcheck.js
const http = require('http');

const options = {
  hostname: 'localhost',
  port: process.env.PORT || 3000,
  path: '/health',
  method: 'GET',
  timeout: 2000
};

const req = http.request(options, (res) => {
  if (res.statusCode === 200) {
    process.exit(0);
  } else {
    process.exit(1);
  }
});

req.on('error', () => {
  process.exit(1);
});

req.on('timeout', () => {
  req.destroy();
  process.exit(1);
});

req.end();
```

### Monitoreo con Sentry

```javascript
// Configuración de Sentry
const Sentry = require('@sentry/node');

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
});

// En tu aplicación principal
process.on('unhandledRejection', (reason, promise) => {
  Sentry.captureException(reason);
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
  Sentry.captureException(error);
  logger.error('Uncaught Exception:', error);
  process.exit(1);
});
```

## Backup y Recuperación

### Script de Backup Automático

```bash
#!/bin/bash
# backup.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/home/cpfbot/backups"
DB_NAME="cpf-discord-bot"

# Crear directorio de backup
mkdir -p $BACKUP_DIR

# Backup de la base de datos
mongodump --db $DB_NAME --out $BACKUP_DIR/db_$DATE

# Backup de archivos de configuración
tar -czf $BACKUP_DIR/config_$DATE.tar.gz .env ecosystem.config.js

# Backup de logs
tar -czf $BACKUP_DIR/logs_$DATE.tar.gz logs/

# Eliminar backups antiguos (más de 7 días)
find $BACKUP_DIR -name "*.tar.gz" -mtime +7 -delete
find $BACKUP_DIR -name "db_*" -mtime +7 -exec rm -rf {} \;

echo "Backup completado: $DATE"
```

### Configurar Cron para Backups

```bash
# Editar crontab
crontab -e

# Añadir línea para backup diario a las 2 AM
0 2 * * * /home/cpfbot/backup.sh >> /home/cpfbot/backup.log 2>&1
```

## Actualizaciones

### Script de Actualización

```bash
#!/bin/bash
# update.sh

echo "Iniciando actualización del bot..."

# Detener el bot
pm2 stop cpf-discord-bot

# Backup actual
./backup.sh

# Actualizar código
git pull origin main

# Instalar dependencias
npm ci --production

# Ejecutar migraciones si existen
npm run migrate

# Reiniciar bot
pm2 start cpf-discord-bot

# Verificar que esté funcionando
sleep 10
pm2 status cpf-discord-bot

echo "Actualización completada"
```

## Solución de Problemas

### Problemas Comunes

#### Bot no se conecta a Discord
```bash
# Verificar token
echo $DISCORD_TOKEN

# Verificar logs
pm2 logs cpf-discord-bot --lines 50

# Verificar conectividad
curl -I https://discord.com/api/v10/gateway
```

#### Alto uso de memoria
```bash
# Verificar uso de memoria
pm2 monit

# Reiniciar si es necesario
pm2 restart cpf-discord-bot

# Verificar memory leaks
npm install -g clinic
clinic doctor -- node index.js
```

#### Base de datos no conecta
```bash
# Verificar estado de MongoDB
sudo systemctl status mongodb

# Verificar conexión
mongo $MONGODB_URI --eval "db.runCommand('ping')"

# Ver logs de MongoDB
sudo tail -f /var/log/mongodb/mongod.log
```

### Comandos de Debugging

```bash
# Ver estado de todos los servicios
pm2 status

# Ver logs en tiempo real
pm2 logs --lines 100

# Reiniciar aplicación
pm2 restart cpf-discord-bot

# Ver uso de recursos
pm2 monit

# Verificar configuración de PM2
pm2 show cpf-discord-bot
```

## Mejores Prácticas

### Seguridad

1. **Nunca commitear tokens** en el repositorio
2. **Usar variables de entorno** para configuración sensible
3. **Mantener dependencias actualizadas** regularmente
4. **Configurar firewall** apropiadamente
5. **Usar HTTPS** para todas las comunicaciones

### Performance

1. **Monitorear uso de memoria** y CPU
2. **Implementar rate limiting** para APIs
3. **Usar conexión pool** para la base de datos
4. **Optimizar consultas** de base de datos
5. **Cachear datos** frecuentemente accedidos

### Mantenimiento

1. **Configurar backups automáticos**
2. **Monitorear logs** regularmente  
3. **Establecer alertas** para errores críticos
4. **Documentar cambios** en changelog
5. **Probar actualizaciones** en ambiente de staging primero

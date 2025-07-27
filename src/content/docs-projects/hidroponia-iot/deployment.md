---
title: "Guía de Despliegue"
description: "Despliegue completo del sistema de hidroponía IoT"
chapter: "Despliegue"
section: "Guía de Despliegue"
order: 1
---

# Deployment Guide - Hidroponia IoT System

This comprehensive guide covers deploying the Hidroponia IoT system across different environments, from development to production, including hardware setup, software deployment, and monitoring.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Hardware Deployment](#hardware-deployment)
- [Software Deployment](#software-deployment)
- [Cloud Deployment](#cloud-deployment)
- [Monitoring and Maintenance](#monitoring-and-maintenance)
- [Troubleshooting](#troubleshooting)
- [Security Considerations](#security-considerations)

## Prerequisites

### Hardware Requirements

#### Minimum Hardware
- **Microcontroller**: ESP32 or Arduino Uno with WiFi module
- **Sensors**: pH, EC, temperature, humidity, water level
- **Actuators**: Water pumps, fans, LED lights
- **Power Supply**: 12V DC adapter (minimum 3A)
- **Network**: WiFi router with internet access

#### Recommended Hardware
- **Microcontroller**: ESP32-WROOM-32 or ESP32-S3
- **Sensors**: Industrial-grade pH probe, EC probe, DHT22, ultrasonic sensor
- **Actuators**: Peristaltic pumps, PWM fans, full-spectrum LED strips
- **Power Supply**: 12V DC 5A adapter with UPS backup
- **Network**: Dedicated IoT network segment

### Software Requirements

#### Development Environment
- Arduino IDE 2.0+ or PlatformIO
- Node.js 18+
- Python 3.8+
- Docker and Docker Compose
- Git

#### Production Environment
- Linux server (Ubuntu 20.04+ recommended)
- Docker runtime
- Nginx web server
- SSL certificate
- Domain name (recommended)

## Hardware Deployment

### 1. Sensor Calibration and Setup

#### pH Sensor Calibration

```cpp
// pH sensor calibration code
#include <WiFi.h>
#include <ArduinoJson.h>

const int PH_PIN = A0;
float phValue = 0;
float phCalibration = 0.0; // Calibration offset

void calibratePHSensor() {
  Serial.println("Starting pH sensor calibration...");
  
  // Calibration with pH 7.0 buffer solution
  Serial.println("Place sensor in pH 7.0 buffer solution");
  Serial.println("Press any key when ready...");
  while (!Serial.available()) delay(100);
  
  float sum = 0;
  for (int i = 0; i < 50; i++) {
    sum += analogRead(PH_PIN);
    delay(100);
  }
  
  float avgReading = sum / 50;
  phCalibration = 7.0 - (avgReading * 3.3/4096 * 3.5); // Calibration formula
  
  Serial.print("Calibration complete. Offset: ");
  Serial.println(phCalibration);
  
  // Save calibration to EEPROM
  saveCalibrationToEEPROM();
}
```

#### EC Sensor Calibration

```cpp
// EC sensor calibration
const int EC_PIN = A1;
float ecCalibration = 1.0; // Calibration multiplier

void calibrateECSensor() {
  Serial.println("Starting EC sensor calibration...");
  
  // Calibration with known EC solution (e.g., 1413 μS/cm)
  Serial.println("Place sensor in 1413 μS/cm calibration solution");
  Serial.println("Press any key when ready...");
  while (!Serial.available()) delay(100);
  
  float sum = 0;
  for (int i = 0; i < 50; i++) {
    sum += analogRead(EC_PIN);
    delay(100);
  }
  
  float avgReading = sum / 50;
  float rawEC = avgReading * 3.3/4096 * 1000; // Convert to μS/cm
  ecCalibration = 1413.0 / rawEC; // Calibration multiplier
  
  Serial.print("EC Calibration complete. Multiplier: ");
  Serial.println(ecCalibration);
  
  saveCalibrationToEEPROM();
}
```

### 2. Hardware Assembly

#### Wiring Diagram

```text
ESP32 Pin Configuration:
- GPIO 32 (A0) -> pH Sensor Signal
- GPIO 33 (A1) -> EC Sensor Signal
- GPIO 25 -> DHT22 Data Pin
- GPIO 26 -> Water Level Sensor Trigger
- GPIO 27 -> Water Level Sensor Echo
- GPIO 14 -> Water Pump Relay
- GPIO 12 -> Nutrient Pump A Relay
- GPIO 13 -> Nutrient Pump B Relay
- GPIO 2 -> LED Status Indicator
- 3.3V -> Sensor VCC
- GND -> Sensor GND
```

#### Power Management

```cpp
// Power management and sleep modes
#include <esp_sleep.h>

void setupDeepSleep() {
  // Configure wake-up sources
  esp_sleep_enable_timer_wakeup(60 * 1000000); // Wake up every minute
  esp_sleep_enable_ext0_wakeup(GPIO_NUM_0, 0); // Wake up on button press
  
  Serial.println("Entering deep sleep mode...");
  esp_deep_sleep_start();
}

void powerManagement() {
  // Reduce CPU frequency to save power
  setCpuFrequencyMhz(80); // Reduce from 240MHz to 80MHz
  
  // Disable unused peripherals
  WiFi.setSleep(true);
  
  // Use deep sleep during inactive periods
  if (systemInactive()) {
    setupDeepSleep();
  }
}
```

### 3. Firmware Deployment

#### Over-the-Air (OTA) Updates

```cpp
// OTA update implementation
#include <ArduinoOTA.h>
#include <WiFi.h>

void setupOTA() {
  ArduinoOTA.setHostname("hidroponia-iot");
  ArduinoOTA.setPassword("your-ota-password");
  
  ArduinoOTA.onStart([]() {
    String type = (ArduinoOTA.getCommand() == U_FLASH) ? "sketch" : "filesystem";
    Serial.println("Start updating " + type);
  });
  
  ArduinoOTA.onEnd([]() {
    Serial.println("\nEnd");
  });
  
  ArduinoOTA.onProgress([](unsigned int progress, unsigned int total) {
    Serial.printf("Progress: %u%%\r", (progress / (total / 100)));
  });
  
  ArduinoOTA.onError([](ota_error_t error) {
    Serial.printf("Error[%u]: ", error);
    if (error == OTA_AUTH_ERROR) Serial.println("Auth Failed");
    else if (error == OTA_BEGIN_ERROR) Serial.println("Begin Failed");
    else if (error == OTA_CONNECT_ERROR) Serial.println("Connect Failed");
    else if (error == OTA_RECEIVE_ERROR) Serial.println("Receive Failed");
    else if (error == OTA_END_ERROR) Serial.println("End Failed");
  });
  
  ArduinoOTA.begin();
}

void loop() {
  ArduinoOTA.handle();
  // Other loop code...
}
```

## Software Deployment

### 1. Development Environment

#### Local Development Setup

```bash
# Clone repository
git clone https://github.com/your-org/hidroponia-iot.git
cd hidroponia-iot

# Setup backend
cd backend
npm install
cp .env.example .env.development

# Setup frontend
cd ../frontend
npm install
cp .env.example .env.local

# Setup database
cd ../
docker-compose up -d postgres redis influxdb

# Run migrations
cd backend
npm run db:migrate
npm run db:seed

# Start development servers
npm run dev
```

#### Environment Configuration

```bash
# .env.development
NODE_ENV=development
PORT=3001
DATABASE_URL=postgresql://postgres:password@localhost:5432/hidroponia_dev
INFLUXDB_URL=http://localhost:8086
INFLUXDB_TOKEN=your-development-token
INFLUXDB_ORG=hidroponia
INFLUXDB_BUCKET=sensor_data
REDIS_URL=redis://localhost:6379
MQTT_BROKER_URL=mqtt://localhost:1883
JWT_SECRET=your-jwt-secret
```

### 2. Staging Deployment

#### Docker Compose Setup

```yaml
# docker-compose.staging.yml
version: '3.8'

services:
  hidroponia-backend:
    build: 
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "3001:3001"
    environment:
      - NODE_ENV=staging
      - DATABASE_URL=${DATABASE_URL}
      - INFLUXDB_URL=${INFLUXDB_URL}
      - REDIS_URL=${REDIS_URL}
      - MQTT_BROKER_URL=${MQTT_BROKER_URL}
    depends_on:
      - postgres
      - influxdb
      - redis
      - mosquitto
    volumes:
      - ./logs:/app/logs
      - ./uploads:/app/uploads

  hidroponia-frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=http://hidroponia-backend:3001
      - NEXT_PUBLIC_WS_URL=ws://hidroponia-backend:3001
    depends_on:
      - hidroponia-backend

  postgres:
    image: postgres:13
    environment:
      - POSTGRES_DB=hidroponia_staging
      - POSTGRES_USER=${DB_USER}
      - POSTGRES_PASSWORD=${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  influxdb:
    image: influxdb:2.7
    environment:
      - INFLUXDB_DB=hidroponia
      - INFLUXDB_ADMIN_USER=${INFLUX_USER}
      - INFLUXDB_ADMIN_PASSWORD=${INFLUX_PASSWORD}
    volumes:
      - influxdb_data:/var/lib/influxdb2
    ports:
      - "8086:8086"

  redis:
    image: redis:7-alpine
    command: redis-server --appendonly yes
    volumes:
      - redis_data:/data
    ports:
      - "6379:6379"

  mosquitto:
    image: eclipse-mosquitto:2.0
    volumes:
      - ./mosquitto/config:/mosquitto/config
      - ./mosquitto/data:/mosquitto/data
      - ./mosquitto/log:/mosquitto/log
    ports:
      - "1883:1883"
      - "9001:9001"

volumes:
  postgres_data:
  influxdb_data:
  redis_data:
```

### 3. Production Deployment

#### Production Docker Compose

```yaml
# docker-compose.prod.yml
version: '3.8'

services:
  hidroponia-backend:
    image: hidroponia/backend:latest
    restart: unless-stopped
    environment:
      - NODE_ENV=production
      - DATABASE_URL=${DATABASE_URL}
      - INFLUXDB_URL=${INFLUXDB_URL}
      - REDIS_URL=${REDIS_URL}
      - MQTT_BROKER_URL=${MQTT_BROKER_URL}
    depends_on:
      - postgres
      - influxdb
      - redis
      - mosquitto
    volumes:
      - ./logs:/app/logs
      - ./uploads:/app/uploads
      - ./certs:/app/certs:ro
    networks:
      - hidroponia-network

  hidroponia-frontend:
    image: hidroponia/frontend:latest
    restart: unless-stopped
    environment:
      - NEXT_PUBLIC_API_URL=https://api.hidroponia.com
      - NEXT_PUBLIC_WS_URL=wss://api.hidroponia.com
    depends_on:
      - hidroponia-backend
    networks:
      - hidroponia-network

  nginx:
    image: nginx:alpine
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf
      - ./nginx/ssl:/etc/nginx/ssl
    depends_on:
      - hidroponia-frontend
      - hidroponia-backend
    networks:
      - hidroponia-network

  postgres:
    image: postgres:13
    restart: unless-stopped
    environment:
      - POSTGRES_DB=hidroponia_prod
      - POSTGRES_USER=${DB_USER}
      - POSTGRES_PASSWORD=${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./backups:/backups
    networks:
      - hidroponia-network

  influxdb:
    image: influxdb:2.7
    restart: unless-stopped
    environment:
      - INFLUXDB_DB=hidroponia
      - INFLUXDB_ADMIN_USER=${INFLUX_USER}
      - INFLUXDB_ADMIN_PASSWORD=${INFLUX_PASSWORD}
    volumes:
      - influxdb_data:/var/lib/influxdb2
      - ./influxdb-backups:/backups
    networks:
      - hidroponia-network

  redis:
    image: redis:7-alpine
    restart: unless-stopped
    command: redis-server --appendonly yes --requirepass ${REDIS_PASSWORD}
    volumes:
      - redis_data:/data
    networks:
      - hidroponia-network

  mosquitto:
    image: eclipse-mosquitto:2.0
    restart: unless-stopped
    volumes:
      - ./mosquitto/config:/mosquitto/config
      - ./mosquitto/data:/mosquitto/data
      - ./mosquitto/log:/mosquitto/log
    ports:
      - "1883:1883"
      - "8883:8883"  # SSL/TLS port
    networks:
      - hidroponia-network

networks:
  hidroponia-network:
    driver: bridge

volumes:
  postgres_data:
  influxdb_data:
  redis_data:
```

#### Nginx Configuration

```nginx
# nginx/nginx.conf
events {
    worker_connections 1024;
}

http {
    upstream backend {
        server hidroponia-backend:3001;
    }

    upstream frontend {
        server hidroponia-frontend:3000;
    }

    # Redirect HTTP to HTTPS
    server {
        listen 80;
        server_name hidroponia.com www.hidroponia.com;
        return 301 https://$server_name$request_uri;
    }

    # Main HTTPS server
    server {
        listen 443 ssl http2;
        server_name hidroponia.com www.hidroponia.com;

        ssl_certificate /etc/nginx/ssl/cert.pem;
        ssl_certificate_key /etc/nginx/ssl/key.pem;
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers HIGH:!aNULL:!MD5;
        ssl_prefer_server_ciphers on;

        # Security headers
        add_header X-Frame-Options DENY;
        add_header X-Content-Type-Options nosniff;
        add_header X-XSS-Protection "1; mode=block";
        add_header Strict-Transport-Security "max-age=31536000; includeSubDomains";

        # Frontend
        location / {
            proxy_pass http://frontend;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        # API
        location /api/ {
            proxy_pass http://backend;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            client_max_body_size 10M;
        }

        # WebSocket
        location /ws {
            proxy_pass http://backend;
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
            alias /var/www/static/;
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
}
```

#### Production Deployment Script

```bash
#!/bin/bash
# deploy.sh

set -e

echo "Starting Hidroponia IoT deployment..."

# Backup existing data
echo "Creating backup..."
./scripts/backup.sh

# Pull latest images
echo "Pulling latest Docker images..."
docker-compose -f docker-compose.prod.yml pull

# Stop services
echo "Stopping services..."
docker-compose -f docker-compose.prod.yml down

# Start services
echo "Starting services..."
docker-compose -f docker-compose.prod.yml up -d

# Wait for services to be ready
echo "Waiting for services to start..."
sleep 30

# Run health checks
echo "Running health checks..."
./scripts/health-check.sh

# Update firmware if needed
echo "Checking for firmware updates..."
./scripts/update-firmware.sh

echo "Deployment completed successfully!"
```

## Cloud Deployment

### 1. AWS Deployment

#### Using AWS IoT Core

```javascript
// AWS IoT integration
const AWS = require('aws-sdk');
const iot = new AWS.Iot({
  region: 'us-east-1'
});

const iotData = new AWS.IotData({
  endpoint: 'your-iot-endpoint.amazonaws.com'
});

// Register IoT device
async function registerDevice(deviceId, certificateArn) {
  const params = {
    thingName: deviceId,
    thingTypeName: 'HidroponiaDevice',
    attributePayload: {
      attributes: {
        'deviceType': 'hidroponia-controller',
        'version': '1.0.0'
      }
    }
  };

  try {
    const result = await iot.createThing(params).promise();
    console.log('Device registered:', result);
    return result;
  } catch (error) {
    console.error('Error registering device:', error);
    throw error;
  }
}

// Handle device shadow updates
async function updateDeviceShadow(deviceId, state) {
  const params = {
    thingName: deviceId,
    payload: JSON.stringify({
      state: {
        desired: state
      }
    })
  };

  try {
    await iotData.updateThingShadow(params).promise();
    console.log('Shadow updated for device:', deviceId);
  } catch (error) {
    console.error('Error updating shadow:', error);
    throw error;
  }
}
```

#### Terraform Configuration

```hcl
# main.tf
resource "aws_iot_thing_type" "hidroponia_device" {
  name = "HidroponiaDevice"
  
  properties {
    description = "Hidroponia IoT Device"
    searchable_attributes = ["deviceType", "location", "version"]
  }
}

resource "aws_iot_policy" "hidroponia_policy" {
  name = "HidroponiaPolicy"
  
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "iot:Connect",
          "iot:Publish",
          "iot:Subscribe",
          "iot:Receive"
        ]
        Resource = [
          "arn:aws:iot:${var.aws_region}:${var.account_id}:client/${var.device_prefix}*",
          "arn:aws:iot:${var.aws_region}:${var.account_id}:topic/${var.topic_prefix}/*",
          "arn:aws:iot:${var.aws_region}:${var.account_id}:topicfilter/${var.topic_prefix}/*"
        ]
      }
    ]
  })
}

resource "aws_ecs_cluster" "hidroponia_cluster" {
  name = "hidroponia-cluster"
}

resource "aws_ecs_service" "hidroponia_service" {
  name            = "hidroponia-service"
  cluster         = aws_ecs_cluster.hidroponia_cluster.id
  task_definition = aws_ecs_task_definition.hidroponia_task.arn
  desired_count   = 2

  load_balancer {
    target_group_arn = aws_lb_target_group.hidroponia_tg.arn
    container_name   = "hidroponia-backend"
    container_port   = 3001
  }
}
```

### 2. Google Cloud Platform

```yaml
# gcp-deploy.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: hidroponia-backend
spec:
  replicas: 3
  selector:
    matchLabels:
      app: hidroponia-backend
  template:
    metadata:
      labels:
        app: hidroponia-backend
    spec:
      containers:
      - name: hidroponia-backend
        image: gcr.io/PROJECT_ID/hidroponia-backend:latest
        ports:
        - containerPort: 3001
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: hidroponia-secrets
              key: database-url
        - name: INFLUXDB_URL
          valueFrom:
            secretKeyRef:
              name: hidroponia-secrets
              key: influxdb-url
---
apiVersion: v1
kind: Service
metadata:
  name: hidroponia-backend-service
spec:
  selector:
    app: hidroponia-backend
  ports:
  - protocol: TCP
    port: 80
    targetPort: 3001
  type: LoadBalancer
```

## Monitoring and Maintenance

### 1. System Monitoring

#### Prometheus Configuration

```yaml
# prometheus.yml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'hidroponia-backend'
    static_configs:
      - targets: ['localhost:3001']
    metrics_path: '/metrics'
    scrape_interval: 10s

  - job_name: 'hidroponia-devices'
    static_configs:
      - targets: ['device1.local:8080', 'device2.local:8080']
    metrics_path: '/metrics'
    scrape_interval: 30s

  - job_name: 'postgres'
    static_configs:
      - targets: ['postgres-exporter:9187']

  - job_name: 'redis'
    static_configs:
      - targets: ['redis-exporter:9121']
```

#### Grafana Dashboard

```json
{
  "dashboard": {
    "title": "Hidroponia IoT Dashboard",
    "panels": [
      {
        "title": "System Temperature",
        "type": "graph",
        "targets": [
          {
            "expr": "hidroponia_temperature_celsius",
            "legendFormat": "{{device_id}}"
          }
        ]
      },
      {
        "title": "pH Level",
        "type": "stat",
        "targets": [
          {
            "expr": "hidroponia_ph_level",
            "legendFormat": "pH"
          }
        ]
      },
      {
        "title": "Nutrient Levels",
        "type": "graph",
        "targets": [
          {
            "expr": "hidroponia_ec_level",
            "legendFormat": "EC (μS/cm)"
          }
        ]
      }
    ]
  }
}
```

### 2. Automated Backups

```bash
#!/bin/bash
# backup.sh

BACKUP_DIR="/backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

# PostgreSQL backup
echo "Backing up PostgreSQL..."
pg_dump -h localhost -U postgres hidroponia_prod > "$BACKUP_DIR/postgres_$TIMESTAMP.sql"

# InfluxDB backup
echo "Backing up InfluxDB..."
influx backup "$BACKUP_DIR/influxdb_$TIMESTAMP" \
  --host http://localhost:8086 \
  --token your-token \
  --org hidroponia

# Redis backup
echo "Backing up Redis..."
redis-cli --rdb "$BACKUP_DIR/redis_$TIMESTAMP.rdb"

# Compress backups
echo "Compressing backups..."
tar -czf "$BACKUP_DIR/hidroponia_backup_$TIMESTAMP.tar.gz" \
  "$BACKUP_DIR/postgres_$TIMESTAMP.sql" \
  "$BACKUP_DIR/influxdb_$TIMESTAMP" \
  "$BACKUP_DIR/redis_$TIMESTAMP.rdb"

# Clean up individual files
rm -f "$BACKUP_DIR/postgres_$TIMESTAMP.sql"
rm -rf "$BACKUP_DIR/influxdb_$TIMESTAMP"
rm -f "$BACKUP_DIR/redis_$TIMESTAMP.rdb"

# Keep only last 7 days of backups
find "$BACKUP_DIR" -name "hidroponia_backup_*.tar.gz" -mtime +7 -delete

echo "Backup completed: hidroponia_backup_$TIMESTAMP.tar.gz"
```

### 3. Health Monitoring

```javascript
// health-check.js
const http = require('http');
const { Pool } = require('pg');
const Redis = require('redis');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

const redis = Redis.createClient({
  url: process.env.REDIS_URL
});

async function checkHealth() {
  const health = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    services: {}
  };

  try {
    // Check database
    await pool.query('SELECT 1');
    health.services.database = { status: 'healthy' };
  } catch (error) {
    health.services.database = { status: 'unhealthy', error: error.message };
    health.status = 'unhealthy';
  }

  try {
    // Check Redis
    await redis.ping();
    health.services.redis = { status: 'healthy' };
  } catch (error) {
    health.services.redis = { status: 'unhealthy', error: error.message };
    health.status = 'unhealthy';
  }

  return health;
}

module.exports = { checkHealth };
```

## Troubleshooting

### Common Issues

#### 1. Device Connectivity Issues

```bash
# Check device connectivity
ping device-ip-address

# Check MQTT broker connectivity
mosquitto_sub -h broker-ip -t "hidroponia/+/status" -v

# Check WiFi signal strength
iwconfig wlan0 | grep Signal
```

#### 2. Sensor Reading Issues

```cpp
// Sensor diagnostic code
void diagnosticMode() {
  Serial.println("=== DIAGNOSTIC MODE ===");
  
  // Test all sensors
  Serial.print("pH Sensor: ");
  float ph = readPHSensor();
  Serial.println(ph);
  
  Serial.print("EC Sensor: ");
  float ec = readECSensor();
  Serial.println(ec);
  
  Serial.print("Temperature: ");
  float temp = readTemperature();
  Serial.println(temp);
  
  Serial.print("Humidity: ");
  float humidity = readHumidity();
  Serial.println(humidity);
  
  // Test actuators
  Serial.println("Testing pumps...");
  digitalWrite(PUMP_PIN, HIGH);
  delay(1000);
  digitalWrite(PUMP_PIN, LOW);
  
  Serial.println("Diagnostic complete");
}
```

#### 3. Database Performance Issues

```sql
-- Check slow queries
SELECT query, mean_time, calls, total_time
FROM pg_stat_statements
ORDER BY mean_time DESC
LIMIT 10;

-- Check database connections
SELECT * FROM pg_stat_activity;

-- Check table sizes
SELECT schemaname, tablename, pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as size
FROM pg_tables
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
```

## Security Considerations

### 1. Network Security

```bash
# Firewall configuration
ufw allow 22/tcp    # SSH
ufw allow 80/tcp    # HTTP
ufw allow 443/tcp   # HTTPS
ufw allow 1883/tcp  # MQTT
ufw allow 8883/tcp  # MQTT over SSL
ufw enable

# Fail2ban configuration for SSH protection
apt-get install fail2ban
```

### 2. Device Security

```cpp
// Secure device communication
#include <WiFiClientSecure.h>
#include <ArduinoJson.h>

WiFiClientSecure client;

void setupSecureConnection() {
  // Use certificate pinning for HTTPS
  client.setCACert(ca_cert);
  client.setCertificate(client_cert);
  client.setPrivateKey(client_key);
}

void sendSecureData(JsonObject data) {
  if (client.connect("api.hidroponia.com", 443)) {
    client.println("POST /api/sensor-data HTTP/1.1");
    client.println("Host: api.hidroponia.com");
    client.println("Content-Type: application/json");
    client.println("Authorization: Bearer " + String(jwt_token));
    client.print("Content-Length: ");
    client.println(measureJson(data));
    client.println();
    serializeJson(data, client);
    client.stop();
  }
}
```

### 3. Data Encryption

```javascript
// Encrypt sensitive data
const crypto = require('crypto');

const encrypt = (text, key) => {
  const cipher = crypto.createCipher('aes-256-cbc', key);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
};

const decrypt = (encryptedText, key) => {
  const decipher = crypto.createDecipher('aes-256-cbc', key);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};
```

This comprehensive deployment guide covers all aspects of deploying the Hidroponia IoT system, from hardware setup to cloud deployment, monitoring, and maintenance. Follow the appropriate sections based on your deployment environment and requirements.

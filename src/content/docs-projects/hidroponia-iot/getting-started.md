---
title: "Configuración Inicial"
description: "Guía para configurar el sistema de hidroponía IoT"
chapter: "Configuración"
section: "Setup del Hardware"
order: 1
---

# Configuración del Sistema Hidroponía IoT

## Introducción

El Sistema Hidroponía IoT es una solución integral para monitoreo y control automático de cultivos hidropónicos. Combina sensores IoT, microcontroladores, y una plataforma web en tiempo real para optimizar el crecimiento de plantas sin suelo.

## Prerrequisitos

### Hardware Necesario
- **Arduino Uno R3** o **ESP32** (recomendado)
- **Sensores:**
  - pH sensor (PH-4502C)
  - TDS/EC sensor (Conductividad)
  - Sensor de temperatura DS18B20
  - Sensor de nivel de agua ultrasónico
  - Sensor de luz LDR o fotocelda
- **Actuadores:**
  - Bombas de agua (12V)
  - Válvulas solenoides
  - LEDs de crecimiento
  - Ventiladores
- **Módulos:**
  - Módulo WiFi ESP8266 (si usas Arduino)
  - Relé de 8 canales
  - Protoboard y cables
  - Fuente de alimentación 12V/5V

### Software y Servicios
- **Arduino IDE** 1.8.19+
- **Node.js** 18+
- **Docker** y **Docker Compose**
- **Cuenta en InfluxDB Cloud** (opcional, para producción)
- **Cuenta MQTT Broker** (HiveMQ, Mosquitto local)

## Instalación

### 1. Clonar el Repositorio

```bash
git clone https://github.com/cpf-fiuna/hidroponia-iot.git
cd hidroponia-iot
```

### 2. Configurar el Backend

```bash
# Navegar al directorio del servidor
cd server

# Instalar dependencias
npm install

# Crear archivo de configuración
cp .env.example .env
```

### 3. Configurar el Dashboard Web

```bash
# Navegar al dashboard
cd ../dashboard

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
```

### 4. Configurar Variables de Entorno

#### Servidor Backend (.env)

```bash
# MQTT Configuration
MQTT_BROKER_URL=mqtt://localhost:1883
MQTT_USERNAME=hidroponia_user
MQTT_PASSWORD=secure_password

# InfluxDB Configuration
INFLUXDB_URL=http://localhost:8086
INFLUXDB_TOKEN=your-influxdb-token
INFLUXDB_ORG=cpf-fiuna
INFLUXDB_BUCKET=hidroponia-data

# API Configuration
API_PORT=3001
API_HOST=0.0.0.0
JWT_SECRET=your-super-secret-jwt-key

# Alert Configuration
ALERT_EMAIL_FROM=hidroponia@cpf-fiuna.org
ALERT_WEBHOOK_URL=https://your-webhook-url.com

# Thresholds (default values)
PH_MIN=5.5
PH_MAX=6.5
EC_MIN=800
EC_MAX=1200
TEMP_MIN=18
TEMP_MAX=26
WATER_LEVEL_MIN=20
```

#### Dashboard Frontend (.env)

```bash
# API Configuration
REACT_APP_API_URL=http://localhost:3001/api
REACT_APP_WS_URL=ws://localhost:3001

# MQTT Configuration (for direct connection)
REACT_APP_MQTT_BROKER=ws://localhost:9001
REACT_APP_MQTT_USERNAME=hidroponia_user
REACT_APP_MQTT_PASSWORD=secure_password

# Application
REACT_APP_NAME=Hidroponía IoT Dashboard
REACT_APP_VERSION=1.2.0
```

### 5. Configurar Arduino/ESP32

#### Librerías Necesarias

Instalar las siguientes librerías en Arduino IDE:

```cpp
// En Arduino IDE, ir a Tools > Manage Libraries
// Buscar e instalar:
- WiFi by Arduino
- PubSubClient by Nick O'Leary
- ArduinoJson by Benoit Blanchon
- OneWire by Paul Stoffregen
- DallasTemperature by Miles Burton
- NewPing by Tim Eckel
```

#### Configuración del Código Arduino

Editar `arduino/config.h`:

```cpp
// WiFi Configuration
#define WIFI_SSID "Tu_Red_WiFi"
#define WIFI_PASSWORD "tu_password_wifi"

// MQTT Configuration
#define MQTT_BROKER "192.168.1.100"  // IP de tu servidor
#define MQTT_PORT 1883
#define MQTT_USERNAME "hidroponia_user"
#define MQTT_PASSWORD "secure_password"
#define DEVICE_ID "hidroponia_001"

// Sensor Pins
#define PH_SENSOR_PIN A0
#define TDS_SENSOR_PIN A1
#define TEMP_SENSOR_PIN 2
#define WATER_LEVEL_TRIG_PIN 7
#define WATER_LEVEL_ECHO_PIN 8
#define LIGHT_SENSOR_PIN A2

// Actuator Pins
#define WATER_PUMP_PIN 3
#define NUTRIENT_PUMP_PIN 4
#define PH_UP_PUMP_PIN 5
#define PH_DOWN_PUMP_PIN 6
#define GROW_LIGHTS_PIN 9
#define FAN_PIN 10

// Thresholds
#define PH_TARGET 6.0
#define PH_TOLERANCE 0.3
#define EC_TARGET 1000
#define EC_TOLERANCE 100
#define TEMP_TARGET 22
#define WATER_LEVEL_MIN 15  // cm
```

## Configuración de Servicios

### 1. InfluxDB (Base de Datos de Series Temporales)

#### Con Docker:

```bash
# Crear docker-compose.yml
version: '3.8'
services:
  influxdb:
    image: influxdb:2.7
    ports:
      - "8086:8086"
    environment:
      - DOCKER_INFLUXDB_INIT_MODE=setup
      - DOCKER_INFLUXDB_INIT_USERNAME=admin
      - DOCKER_INFLUXDB_INIT_PASSWORD=adminpassword
      - DOCKER_INFLUXDB_INIT_ORG=cpf-fiuna
      - DOCKER_INFLUXDB_INIT_BUCKET=hidroponia-data
    volumes:
      - influxdb-data:/var/lib/influxdb2
volumes:
  influxdb-data:
```

#### Instalación Manual:

```bash
# Ubuntu/Debian
wget -qO- https://repos.influxdata.com/influxdb.key | sudo apt-key add -
echo "deb https://repos.influxdata.com/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/influxdb.list
sudo apt update && sudo apt install influxdb2

# Inicializar InfluxDB
sudo systemctl start influxdb
influx setup
```

### 2. MQTT Broker (Mosquitto)

#### Con Docker:

```bash
# Agregar al docker-compose.yml
  mosquitto:
    image: eclipse-mosquitto:2.0
    ports:
      - "1883:1883"
      - "9001:9001"
    volumes:
      - ./mosquitto/config:/mosquitto/config
      - ./mosquitto/data:/mosquitto/data
      - ./mosquitto/log:/mosquitto/log
```

Crear configuración en `mosquitto/config/mosquitto.conf`:

```conf
# Mosquitto configuration
persistence true
persistence_location /mosquitto/data/
log_dest file /mosquitto/log/mosquitto.log

# MQTT over TCP
listener 1883

# MQTT over WebSockets
listener 9001
protocol websockets

# Authentication
allow_anonymous false
password_file /mosquitto/config/passwords
```

#### Instalación Manual:

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install mosquitto mosquitto-clients

# Crear usuario
sudo mosquitto_passwd -c /etc/mosquitto/passwd hidroponia_user

# Configurar /etc/mosquitto/mosquitto.conf
sudo systemctl restart mosquitto
```

### 3. Configurar Base de Datos

```bash
cd server

# Ejecutar migraciones (si existen)
npm run migrate

# Cargar configuración inicial
npm run seed
```

## Ejecución del Proyecto

### 1. Desarrollo Local

```bash
# Terminal 1: Iniciar servicios (Docker)
docker-compose up -d

# Terminal 2: Iniciar servidor backend
cd server
npm run dev

# Terminal 3: Iniciar dashboard
cd dashboard
npm start

# Terminal 4: Cargar código al Arduino
# Abrir Arduino IDE y cargar arduino/hidroponia_controller/hidroponia_controller.ino
```

### 2. Verificar Conexiones

#### MQTT:

```bash
# Subscribirse a todos los topics
mosquitto_sub -h localhost -t "hidroponia/+/+"

# Publicar mensaje de prueba
mosquitto_pub -h localhost -t "hidroponia/sensor/ph" -m '{"value": 6.2, "timestamp": "2025-01-01T12:00:00Z"}'
```

#### InfluxDB:

```bash
# Verificar datos en InfluxDB UI
# Abrir http://localhost:8086
# Login: admin / adminpassword
```

#### Dashboard:

```bash
# Abrir http://localhost:3000
# Debería mostrar datos en tiempo real
```

## Estructura del Proyecto

```
hidroponia-iot/
├── arduino/
│   ├── hidroponia_controller/      # Código principal del Arduino
│   │   ├── hidroponia_controller.ino
│   │   ├── sensors.cpp
│   │   ├── actuators.cpp
│   │   ├── mqtt_client.cpp
│   │   └── config.h
│   ├── libraries/                  # Librerías personalizadas
│   └── docs/                      # Esquemas y diagramas
├── server/
│   ├── src/
│   │   ├── controllers/           # Controladores API
│   │   ├── services/              # Lógica de negocio
│   │   ├── models/                # Modelos de datos
│   │   ├── mqtt/                  # Cliente MQTT
│   │   ├── influxdb/              # Cliente InfluxDB
│   │   ├── alerts/                # Sistema de alertas
│   │   └── websockets/            # WebSocket server
│   ├── tests/                     # Tests del servidor
│   └── docs/                      # Documentación API
├── dashboard/
│   ├── src/
│   │   ├── components/            # Componentes React
│   │   │   ├── charts/           # Gráficos en tiempo real
│   │   │   ├── controls/         # Controles de actuadores
│   │   │   ├── alerts/           # Sistema de alertas
│   │   │   └── settings/         # Configuración
│   │   ├── services/             # Servicios de API
│   │   ├── hooks/                # Custom hooks
│   │   └── utils/                # Utilidades
│   └── public/                   # Archivos estáticos
├── docs/
│   ├── hardware/                 # Documentación de hardware
│   ├── api/                      # Documentación API
│   └── deployment/               # Guías de despliegue
└── scripts/
    ├── setup.sh                  # Script de configuración
    ├── backup.sh                 # Script de backup
    └── monitor.sh                # Script de monitoreo
```

## Configuración Avanzada

### 1. Calibración de Sensores

#### Sensor de pH:

```cpp
// En Arduino IDE, cargar sketch de calibración
// arduino/calibration/ph_calibration.ino

// Proceso de calibración:
// 1. Sumergir en solución pH 7.0
// 2. Anotar valor analógico
// 3. Sumergir en solución pH 4.0
// 4. Anotar valor analógico
// 5. Calcular pendiente y offset
```

#### Sensor TDS/EC:

```cpp
// arduino/calibration/tds_calibration.ino

// Usar solución estándar 1413 µS/cm
// Ajustar factor de calibración en config.h
#define TDS_CALIBRATION_FACTOR 0.5
```

### 2. Configuración de Alertas

Editar `server/config/alerts.json`:

```json
{
  "ph": {
    "min": 5.5,
    "max": 6.5,
    "critical_min": 5.0,
    "critical_max": 7.0
  },
  "ec": {
    "min": 800,
    "max": 1200,
    "critical_min": 600,
    "critical_max": 1500
  },
  "temperature": {
    "min": 18,
    "max": 26,
    "critical_min": 15,
    "critical_max": 30
  },
  "water_level": {
    "min": 20,
    "critical_min": 10
  }
}
```

### 3. Programación de Automatización

Editar `server/config/automation.json`:

```json
{
  "schedules": {
    "lights": {
      "on": "06:00",
      "off": "22:00"
    },
    "nutrient_feeding": {
      "intervals": ["08:00", "14:00", "20:00"],
      "duration": 300
    }
  },
  "conditions": {
    "ph_correction": {
      "enabled": true,
      "check_interval": 300
    },
    "water_refill": {
      "enabled": true,
      "trigger_level": 15
    }
  }
}
```

## Testing

### 1. Tests del Servidor

```bash
cd server

# Tests unitarios
npm run test:unit

# Tests de integración
npm run test:integration

# Tests de MQTT
npm run test:mqtt

# Tests de alertas
npm run test:alerts
```

### 2. Tests del Dashboard

```bash
cd dashboard

# Tests de componentes
npm run test

# Tests end-to-end con Cypress
npm run cypress:open
```

### 3. Tests de Hardware

```bash
# Cargar sketch de prueba
# arduino/tests/sensor_test.ino

# Verificar todas las conexiones:
# - Sensores reportan valores coherentes
# - Actuadores responden a comandos
# - Conectividad WiFi estable
# - Comunicación MQTT funcional
```

## Docker Setup

### 1. Desarrollo Completo con Docker

```yaml
# docker-compose.dev.yml
version: '3.8'
services:
  influxdb:
    image: influxdb:2.7
    ports:
      - "8086:8086"
    environment:
      DOCKER_INFLUXDB_INIT_MODE: setup
      DOCKER_INFLUXDB_INIT_USERNAME: admin
      DOCKER_INFLUXDB_INIT_PASSWORD: adminpassword
      DOCKER_INFLUXDB_INIT_ORG: cpf-fiuna
      DOCKER_INFLUXDB_INIT_BUCKET: hidroponia-data
    volumes:
      - influxdb-data:/var/lib/influxdb2

  mosquitto:
    image: eclipse-mosquitto:2.0
    ports:
      - "1883:1883"
      - "9001:9001"
    volumes:
      - ./mosquitto:/mosquitto/config

  server:
    build: 
      context: ./server
      dockerfile: Dockerfile.dev
    ports:
      - "3001:3001"
    environment:
      - NODE_ENV=development
    volumes:
      - ./server:/app
      - /app/node_modules
    depends_on:
      - influxdb
      - mosquitto

  dashboard:
    build:
      context: ./dashboard
      dockerfile: Dockerfile.dev
    ports:
      - "3000:3000"
    volumes:
      - ./dashboard:/app
      - /app/node_modules
    depends_on:
      - server

volumes:
  influxdb-data:
```

### 2. Comandos Docker

```bash
# Desarrollo
docker-compose -f docker-compose.dev.yml up -d

# Producción
docker-compose -f docker-compose.prod.yml up -d

# Ver logs
docker-compose logs -f server
docker-compose logs -f dashboard

# Reiniciar servicio
docker-compose restart server
```

## Monitoreo y Mantenimiento

### 1. Logs del Sistema

```bash
# Ver logs en tiempo real
tail -f server/logs/application.log
tail -f server/logs/mqtt.log
tail -f server/logs/alerts.log

# Logs de Arduino (Serial Monitor)
# Tools > Serial Monitor en Arduino IDE
```

### 2. Métricas Importantes

- **pH**: Debe estar entre 5.5-6.5
- **EC**: 800-1200 µS/cm para vegetales de hoja
- **Temperatura**: 18-26°C
- **Nivel de agua**: >20cm
- **Luz**: 12-16 horas diarias

### 3. Backups

```bash
# Backup automático de InfluxDB
./scripts/backup.sh

# Backup manual
influx backup /backup/path --org cpf-fiuna --bucket hidroponia-data
```

## Solución de Problemas

### 1. Arduino No Se Conecta a WiFi

```cpp
// Verificar credenciales en config.h
// Verificar potencia de señal WiFi
// Usar Serial Monitor para debug:

Serial.begin(115200);
Serial.println("Conectando a WiFi...");
Serial.println(WiFi.status());
```

### 2. Datos No Llegan a InfluxDB

```bash
# Verificar logs del servidor
docker-compose logs server

# Verificar conectividad MQTT
mosquitto_sub -h localhost -t "hidroponia/+/+"

# Verificar InfluxDB
curl -v http://localhost:8086/ping
```

### 3. Sensores dan Valores Incorrectos

```cpp
// Re-calibrar sensores
// Verificar conexiones físicas
// Verificar voltaje de alimentación
// Usar multímetro para verificar señales
```

### 4. Dashboard No Actualiza

```bash
# Verificar WebSocket connection
# Abrir Developer Tools > Network > WS
# Verificar que hay conexión a ws://localhost:3001

# Reiniciar servidor
docker-compose restart server
```

## Próximos Pasos

### 1. Expansión del Sistema

1. **Más sensores**: CO2, humedad relativa, oxígeno disuelto
2. **Control de clima**: Calefacción, refrigeración, humidificación
3. **Múltiples cultivos**: Soporte para diferentes tipos de plantas
4. **Visión artificial**: Detección de plagas y enfermedades

### 2. Mejoras de Software

1. **Machine Learning**: Predicción de crecimiento y optimización
2. **App móvil**: Control remoto desde dispositivos móviles
3. **Integración IoT**: Compatibilidad con Google Home, Alexa
4. **Blockchain**: Trazabilidad de productos

### 3. Mejoras de Hardware

1. **PCB personalizado**: Diseño de placa específica
2. **Sensores más precisos**: Instrumentos de laboratorio
3. **Redundancia**: Múltiples sensores por parámetro
4. **Energía solar**: Sistema autosuficiente energéticamente

## Recursos Adicionales

- **Arduino Reference**: https://www.arduino.cc/reference/
- **ESP32 Documentation**: https://docs.espressif.com/projects/esp-idf/
- **InfluxDB Documentation**: https://docs.influxdata.com/influxdb/
- **MQTT Essentials**: https://www.hivemq.com/mqtt-essentials/
- **Hydroponics Guide**: https://extension.oregonstate.edu/gardening/techniques/hydroponic-gardening

Para más información técnica y guías avanzadas, consulta la documentación completa en la carpeta `docs/`.

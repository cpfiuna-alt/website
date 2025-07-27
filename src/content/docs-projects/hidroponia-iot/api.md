---
title: "API Reference"
description: "Documentación completa de la API del sistema hidroponía IoT"
chapter: "API"
section: "Endpoints y Métodos"
order: 1
---

# API del Sistema Hidroponía IoT

## Visión General

La API del Sistema Hidroponía IoT proporciona endpoints RESTful y comunicación en tiempo real para interactuar con sensores, actuadores y datos del sistema. La API está construida con Node.js, Express y sigue principios REST con autenticación JWT y validación robusta.

## Base URL y Autenticación

### Base URL
```
Desarrollo: http://localhost:3001/api/v1
Producción: https://hidroponia.cpf-fiuna.org/api/v1
```

### Autenticación

La API utiliza JWT (JSON Web Tokens) para autenticación:

```bash
# Obtener token de acceso
curl -X POST http://localhost:3001/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "tu_password"
  }'

# Respuesta
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "admin",
    "role": "admin"
  }
}

# Usar token en requests
curl -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  http://localhost:3001/api/v1/sensors/current
```

### Roles de Usuario

- **admin**: Acceso completo al sistema
- **operator**: Control de actuadores y configuración
- **viewer**: Solo lectura de datos y estado

## Endpoints de Autenticación

### POST /auth/login
Iniciar sesión en el sistema.

```bash
curl -X POST /api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "password123"
  }'
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "admin",
    "email": "admin@cpf-fiuna.org",
    "role": "admin",
    "lastLogin": "2025-01-01T12:00:00Z"
  }
}
```

### POST /auth/refresh
Renovar token de acceso.

```bash
curl -X POST /api/v1/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }'
```

### POST /auth/logout
Cerrar sesión y invalidar tokens.

```bash
curl -X POST /api/v1/auth/logout \
  -H "Authorization: Bearer <token>"
```

## Endpoints de Sensores

### GET /sensors/current
Obtener lecturas actuales de todos los sensores.

```bash
curl -H "Authorization: Bearer <token>" \
  /api/v1/sensors/current
```

**Respuesta:**
```json
{
  "success": true,
  "data": {
    "ph": {
      "value": 6.2,
      "unit": "pH",
      "timestamp": "2025-01-01T12:00:00Z",
      "device": "sensor_node_1",
      "status": "normal"
    },
    "ec": {
      "value": 1150,
      "unit": "µS/cm",
      "timestamp": "2025-01-01T12:00:00Z",
      "device": "sensor_node_1",
      "status": "normal"
    },
    "temperature": {
      "value": 23.5,
      "unit": "°C",
      "timestamp": "2025-01-01T12:00:00Z",
      "device": "sensor_node_1",
      "status": "normal"
    },
    "water_level": {
      "value": 25.8,
      "unit": "cm",
      "timestamp": "2025-01-01T12:00:00Z",
      "device": "sensor_node_1",
      "status": "normal"
    },
    "light": {
      "value": 45000,
      "unit": "lux",
      "timestamp": "2025-01-01T12:00:00Z",
      "device": "sensor_node_1",
      "status": "normal"
    }
  },
  "lastUpdate": "2025-01-01T12:00:00Z"
}
```

### GET /sensors/{type}/history
Obtener historial de un tipo de sensor específico.

**Parámetros de query:**
- `range`: Rango de tiempo (1h, 6h, 24h, 7d, 30d)
- `interval`: Intervalo de agregación (1m, 5m, 1h, 1d)
- `device`: Filtrar por dispositivo específico

```bash
curl -H "Authorization: Bearer <token>" \
  "/api/v1/sensors/ph/history?range=24h&interval=1h"
```

**Respuesta:**
```json
{
  "success": true,
  "data": [
    {
      "timestamp": "2025-01-01T00:00:00Z",
      "value": 6.1,
      "device": "sensor_node_1"
    },
    {
      "timestamp": "2025-01-01T01:00:00Z",
      "value": 6.2,
      "device": "sensor_node_1"
    }
  ],
  "meta": {
    "sensorType": "ph",
    "range": "24h",
    "interval": "1h",
    "count": 24,
    "average": 6.15,
    "min": 5.9,
    "max": 6.4
  }
}
```

### GET /sensors/statistics
Obtener estadísticas de todos los sensores.

**Parámetros de query:**
- `period`: Período para calcular estadísticas (24h, 7d, 30d)

```bash
curl -H "Authorization: Bearer <token>" \
  "/api/v1/sensors/statistics?period=24h"
```

**Respuesta:**
```json
{
  "success": true,
  "data": {
    "ph": {
      "current": 6.2,
      "average": 6.15,
      "min": 5.9,
      "max": 6.4,
      "trend": "stable",
      "readings_count": 1440
    },
    "ec": {
      "current": 1150,
      "average": 1125,
      "min": 1050,
      "max": 1200,
      "trend": "increasing",
      "readings_count": 1440
    }
  },
  "period": "24h",
  "generated_at": "2025-01-01T12:00:00Z"
}
```

## Endpoints de Control

### POST /control/pump
Activar una bomba específica.

**Roles requeridos:** operator, admin

```bash
curl -X POST /api/v1/control/pump \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "device": "controller_1",
    "pumpType": "water",
    "duration": 30000,
    "reason": "Manual watering"
  }'
```

**Tipos de bomba válidos:**
- `water`: Bomba de agua
- `nutrient`: Bomba de nutrientes
- `ph_up`: Bomba pH Up
- `ph_down`: Bomba pH Down

**Respuesta:**
```json
{
  "success": true,
  "data": {
    "commandId": "cmd_123456789",
    "device": "controller_1",
    "action": "activate_pump",
    "parameters": {
      "pumpType": "water",
      "duration": 30000
    },
    "status": "sent",
    "timestamp": "2025-01-01T12:00:00Z"
  }
}
```

### POST /control/lights
Controlar sistema de iluminación.

```bash
curl -X POST /api/v1/control/lights \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "device": "controller_1",
    "intensity": 80,
    "schedule": {
      "enabled": true,
      "onTime": "06:00",
      "offTime": "22:00"
    }
  }'
```

**Respuesta:**
```json
{
  "success": true,
  "data": {
    "commandId": "cmd_123456790",
    "device": "controller_1",
    "action": "set_lights",
    "parameters": {
      "intensity": 80,
      "schedule": {
        "enabled": true,
        "onTime": "06:00",
        "offTime": "22:00"
      }
    },
    "status": "sent",
    "timestamp": "2025-01-01T12:00:00Z"
  }
}
```

### POST /control/emergency-stop
Detener todos los actuadores inmediatamente.

**Roles requeridos:** operator, admin

```bash
curl -X POST /api/v1/control/emergency-stop \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "device": "controller_1",
    "reason": "Emergency maintenance"
  }'
```

### GET /control/status
Obtener estado de todos los actuadores.

```bash
curl -H "Authorization: Bearer <token>" \
  /api/v1/control/status
```

**Respuesta:**
```json
{
  "success": true,
  "data": {
    "pumps": {
      "water": {
        "status": "idle",
        "lastActivation": "2025-01-01T11:30:00Z",
        "totalRuntime": 1800000,
        "cyclesCount": 45
      },
      "nutrient": {
        "status": "running",
        "activatedAt": "2025-01-01T11:58:00Z",
        "remainingTime": 45000,
        "totalRuntime": 3600000,
        "cyclesCount": 120
      }
    },
    "lights": {
      "status": "on",
      "intensity": 80,
      "schedule": {
        "enabled": true,
        "onTime": "06:00",
        "offTime": "22:00"
      },
      "dailyRuntime": 57600000
    },
    "fans": {
      "status": "auto",
      "speed": 65,
      "mode": "temperature_controlled"
    }
  }
}
```

## Endpoints de Dispositivos

### GET /devices
Listar todos los dispositivos conectados.

```bash
curl -H "Authorization: Bearer <token>" \
  /api/v1/devices
```

**Respuesta:**
```json
{
  "success": true,
  "data": [
    {
      "id": "sensor_node_1",
      "name": "Nodo Sensores Principal",
      "type": "sensor_node",
      "status": "online",
      "location": "Invernadero A",
      "lastSeen": "2025-01-01T12:00:00Z",
      "firmwareVersion": "1.2.0",
      "ipAddress": "192.168.1.101",
      "sensors": ["ph", "ec", "temperature", "water_level", "light"],
      "batteryLevel": null,
      "signalStrength": -45
    },
    {
      "id": "controller_1",
      "name": "Controlador Principal",
      "type": "controller",
      "status": "online",
      "location": "Invernadero A",
      "lastSeen": "2025-01-01T12:00:00Z",
      "firmwareVersion": "1.2.0",
      "ipAddress": "192.168.1.102",
      "actuators": ["water_pump", "nutrient_pump", "ph_pumps", "lights", "fans"],
      "batteryLevel": null,
      "signalStrength": -42
    }
  ]
}
```

### GET /devices/{deviceId}
Obtener información detallada de un dispositivo.

```bash
curl -H "Authorization: Bearer <token>" \
  /api/v1/devices/sensor_node_1
```

### POST /devices/{deviceId}/reboot
Reiniciar un dispositivo.

**Roles requeridos:** operator, admin

```bash
curl -X POST /api/v1/devices/sensor_node_1/reboot \
  -H "Authorization: Bearer <token>"
```

### PUT /devices/{deviceId}/config
Actualizar configuración de un dispositivo.

**Roles requeridos:** admin

```bash
curl -X PUT /api/v1/devices/sensor_node_1/config \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "location": "Invernadero B",
    "sensors": {
      "ph": {
        "calibration": {
          "slope": 3.5,
          "offset": 0.2
        },
        "threshold_min": 5.5,
        "threshold_max": 6.5
      }
    }
  }'
```

## Endpoints de Alertas

### GET /alerts
Obtener todas las alertas.

**Parámetros de query:**
- `status`: Filtrar por estado (active, acknowledged, resolved)
- `severity`: Filtrar por severidad (info, warning, critical)
- `limit`: Número máximo de resultados (default: 50)
- `offset`: Offset para paginación

```bash
curl -H "Authorization: Bearer <token>" \
  "/api/v1/alerts?status=active&severity=critical&limit=10"
```

**Respuesta:**
```json
{
  "success": true,
  "data": [
    {
      "id": 123,
      "title": "pH Crítico Detectado",
      "message": "El nivel de pH está fuera del rango seguro: 4.8",
      "severity": "critical",
      "status": "active",
      "sensorType": "ph",
      "deviceId": "sensor_node_1",
      "currentValue": 4.8,
      "threshold": {
        "min": 5.5,
        "max": 6.5
      },
      "createdAt": "2025-01-01T12:00:00Z",
      "acknowledgedAt": null,
      "acknowledgedBy": null,
      "recommendedActions": [
        "Verificar calibración del sensor de pH",
        "Revisar sistema de dosificación",
        "Considerar cambio de solución nutritiva"
      ]
    }
  ],
  "meta": {
    "total": 1,
    "limit": 10,
    "offset": 0,
    "hasMore": false
  }
}
```

### POST /alerts/{alertId}/acknowledge
Reconocer una alerta.

```bash
curl -X POST /api/v1/alerts/123/acknowledge \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "note": "Revisando sistema de calibración"
  }'
```

### POST /alerts/{alertId}/resolve
Resolver una alerta.

```bash
curl -X POST /api/v1/alerts/123/resolve \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "resolution": "Sensor recalibrado, niveles normalizados",
    "preventiveActions": "Programar calibración semanal"
  }'
```

## Endpoints de Automatización

### GET /automation/rules
Obtener todas las reglas de automatización.

```bash
curl -H "Authorization: Bearer <token>" \
  /api/v1/automation/rules
```

**Respuesta:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Corrección Automática de pH",
      "description": "Ajusta pH automáticamente cuando está fuera del rango",
      "isActive": true,
      "priority": 1,
      "conditions": {
        "ph": {
          "min": 5.5,
          "max": 6.5
        }
      },
      "actions": [
        {
          "type": "activate_pump",
          "device": "controller_1",
          "parameters": {
            "pumpType": "ph_up",
            "duration": 5000,
            "condition": "ph < 5.5"
          }
        },
        {
          "type": "activate_pump",
          "device": "controller_1",
          "parameters": {
            "pumpType": "ph_down",
            "duration": 5000,
            "condition": "ph > 6.5"
          }
        }
      ],
      "lastExecuted": "2025-01-01T11:45:00Z",
      "executionCount": 15,
      "createdAt": "2025-01-01T00:00:00Z"
    }
  ]
}
```

### POST /automation/rules
Crear nueva regla de automatización.

**Roles requeridos:** admin

```bash
curl -X POST /api/v1/automation/rules \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Riego Automático Nocturno",
    "description": "Activa riego automático durante la noche",
    "conditions": {
      "time": {
        "start": "02:00",
        "end": "04:00"
      },
      "water_level": {
        "min": 20
      }
    },
    "actions": [
      {
        "type": "activate_pump",
        "device": "controller_1",
        "parameters": {
          "pumpType": "water",
          "duration": 300000
        }
      }
    ],
    "priority": 2,
    "isActive": true
  }'
```

### PUT /automation/rules/{ruleId}
Actualizar regla de automatización.

### DELETE /automation/rules/{ruleId}
Eliminar regla de automatización.

### POST /automation/rules/{ruleId}/toggle
Activar/desactivar regla.

```bash
curl -X POST /api/v1/automation/rules/1/toggle \
  -H "Authorization: Bearer <token>"
```

## WebSocket API

### Conexión
```javascript
const ws = new WebSocket('ws://localhost:3001');

// Autenticación
ws.onopen = () => {
  ws.send(JSON.stringify({
    type: 'auth',
    token: 'your_jwt_token'
  }));
};
```

### Eventos en Tiempo Real

#### Datos de Sensores
```javascript
{
  "type": "sensor_data",
  "data": {
    "sensorType": "ph",
    "deviceId": "sensor_node_1",
    "value": 6.2,
    "timestamp": "2025-01-01T12:00:00Z"
  }
}
```

#### Estado de Actuadores
```javascript
{
  "type": "actuator_status",
  "data": {
    "deviceId": "controller_1",
    "actuatorType": "water_pump",
    "status": "active",
    "remainingTime": 45000,
    "timestamp": "2025-01-01T12:00:00Z"
  }
}
```

#### Alertas
```javascript
{
  "type": "alert",
  "data": {
    "id": 124,
    "title": "Nivel de Agua Bajo",
    "severity": "warning",
    "sensorType": "water_level",
    "currentValue": 15.2,
    "timestamp": "2025-01-01T12:00:00Z"
  }
}
```

#### Estado de Dispositivos
```javascript
{
  "type": "device_status",
  "data": {
    "deviceId": "sensor_node_1",
    "status": "offline",
    "lastSeen": "2025-01-01T11:55:00Z",
    "timestamp": "2025-01-01T12:00:00Z"
  }
}
```

### Comandos WebSocket

#### Suscribirse a Eventos
```javascript
ws.send(JSON.stringify({
  type: 'subscribe',
  events: ['sensor_data', 'alerts', 'device_status']
}));
```

#### Desuscribirse
```javascript
ws.send(JSON.stringify({
  type: 'unsubscribe',
  events: ['sensor_data']
}));
```

## Códigos de Estado HTTP

| Código | Descripción |
|--------|-------------|
| 200 | OK - Solicitud exitosa |
| 201 | Created - Recurso creado exitosamente |
| 400 | Bad Request - Datos de entrada inválidos |
| 401 | Unauthorized - Autenticación requerida |
| 403 | Forbidden - Permisos insuficientes |
| 404 | Not Found - Recurso no encontrado |
| 409 | Conflict - Conflicto de recursos |
| 422 | Unprocessable Entity - Datos válidos pero no procesables |
| 429 | Too Many Requests - Límite de velocidad excedido |
| 500 | Internal Server Error - Error interno del servidor |
| 502 | Bad Gateway - Error de comunicación con servicios |
| 503 | Service Unavailable - Servicio temporalmente no disponible |

## Rate Limiting

La API implementa limitación de velocidad por endpoint:

| Endpoint | Límite | Ventana |
|----------|--------|---------|
| `/auth/*` | 5 requests | 15 minutos |
| `/sensors/current` | 60 requests | 1 minuto |
| `/sensors/*/history` | 30 requests | 1 minuto |
| `/control/*` | 10 requests | 1 minuto |
| `/alerts/*` | 30 requests | 1 minuto |
| Otros endpoints | 100 requests | 15 minutos |

**Headers de respuesta:**
```
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 59
X-RateLimit-Reset: 1640995200
```

## Manejo de Errores

### Formato de Error Estándar
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Los datos proporcionados no son válidos",
    "details": [
      {
        "field": "duration",
        "message": "Duración debe ser mayor a 0 y menor a 300000"
      }
    ],
    "timestamp": "2025-01-01T12:00:00Z",
    "requestId": "req_123456789"
  }
}
```

### Códigos de Error Comunes

| Código | Descripción |
|--------|-------------|
| `VALIDATION_ERROR` | Error de validación de datos |
| `AUTHENTICATION_FAILED` | Fallo de autenticación |
| `INSUFFICIENT_PERMISSIONS` | Permisos insuficientes |
| `DEVICE_OFFLINE` | Dispositivo no disponible |
| `COMMAND_TIMEOUT` | Tiempo de espera de comando agotado |
| `SENSOR_ERROR` | Error de lectura de sensor |
| `ACTUATOR_ERROR` | Error de actuador |
| `RATE_LIMIT_EXCEEDED` | Límite de velocidad excedido |

## SDKs y Librerías

### JavaScript/TypeScript SDK

```bash
npm install @cpf-fiuna/hidroponia-iot-sdk
```

```javascript
import { HidroponiaAPI } from '@cpf-fiuna/hidroponia-iot-sdk';

const api = new HidroponiaAPI({
  baseUrl: 'http://localhost:3001/api/v1',
  token: 'your_jwt_token'
});

// Obtener datos actuales
const currentData = await api.sensors.getCurrent();

// Activar bomba
await api.control.activatePump('controller_1', 'water', 30000);

// Suscribirse a eventos
api.on('sensor_data', (data) => {
  console.log('Nueva lectura:', data);
});

api.connect();
```

### Python SDK

```bash
pip install hidroponia-iot-sdk
```

```python
from hidroponia_iot import HidroponiaAPI

api = HidroponiaAPI(
    base_url='http://localhost:3001/api/v1',
    token='your_jwt_token'
)

# Obtener datos actuales
current_data = api.sensors.get_current()

# Activar bomba
api.control.activate_pump('controller_1', 'water', 30000)

# Callback para eventos
def on_sensor_data(data):
    print(f"Nueva lectura: {data}")

api.on('sensor_data', on_sensor_data)
api.connect()
```

### Arduino/ESP32 Library

```cpp
#include <HidroponiaIoT.h>

HidroponiaIoT hidroponia("device_id", "wifi_ssid", "wifi_password");

void setup() {
  Serial.begin(115200);
  
  hidroponia.begin();
  hidroponia.setMqttServer("192.168.1.100", 1883);
  hidroponia.setCredentials("mqtt_user", "mqtt_password");
  
  // Configurar sensores
  hidroponia.addSensor("ph", A0, PH_SENSOR);
  hidroponia.addSensor("ec", A1, EC_SENSOR);
  hidroponia.addSensor("temperature", 2, TEMP_SENSOR);
  
  // Configurar actuadores
  hidroponia.addActuator("water_pump", 3, RELAY);
  hidroponia.addActuator("nutrient_pump", 4, RELAY);
  
  hidroponia.connect();
}

void loop() {
  hidroponia.loop();
  delay(1000);
}
```

## Webhooks

### Configuración de Webhooks

```bash
curl -X POST /api/v1/webhooks \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://your-app.com/webhook/hidroponia",
    "events": ["alert", "device_offline", "critical_sensor"],
    "secret": "webhook_secret_key",
    "isActive": true
  }'
```

### Ejemplo de Payload Webhook

```json
{
  "event": "alert",
  "timestamp": "2025-01-01T12:00:00Z",
  "data": {
    "id": 123,
    "title": "pH Crítico Detectado",
    "severity": "critical",
    "sensorType": "ph",
    "currentValue": 4.8,
    "deviceId": "sensor_node_1"
  },
  "signature": "sha256=abc123..."
}
```

### Verificación de Webhook

```javascript
const crypto = require('crypto');

function verifyWebhook(payload, signature, secret) {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload, 'utf8')
    .digest('hex');
  
  return `sha256=${expectedSignature}` === signature;
}
```

## Ejemplos de Integración

### Integración con Home Assistant

```yaml
# configuration.yaml
sensor:
  - platform: rest
    name: hidroponia_ph
    resource: http://localhost:3001/api/v1/sensors/current
    headers:
      Authorization: Bearer YOUR_TOKEN
    value_template: '{{ value_json.data.ph.value }}'
    unit_of_measurement: 'pH'

switch:
  - platform: rest
    name: hidroponia_water_pump
    resource: http://localhost:3001/api/v1/control/pump
    headers:
      Authorization: Bearer YOUR_TOKEN
    body_on: '{"device": "controller_1", "pumpType": "water", "duration": 30000}'
    body_off: '{"device": "controller_1", "pumpType": "water", "duration": 0}'
```

### Integración con Grafana

```json
{
  "dashboard": {
    "title": "Hidroponía IoT Dashboard",
    "panels": [
      {
        "title": "pH en Tiempo Real",
        "type": "graph",
        "targets": [
          {
            "expr": "hidroponia_sensor_value{sensor_type=\"ph\"}",
            "refId": "A"
          }
        ]
      }
    ]
  }
}
```

### Integración con Node-RED

```json
[
  {
    "id": "http_request",
    "type": "http request",
    "url": "http://localhost:3001/api/v1/sensors/current",
    "method": "GET",
    "headers": {
      "Authorization": "Bearer YOUR_TOKEN"
    }
  },
  {
    "id": "function_node",
    "type": "function",
    "func": "if (msg.payload.data.ph.value < 5.5) {\n  return { payload: 'pH bajo detectado' };\n}\nreturn null;"
  }
]
```

## Monitoreo y Observabilidad

### Métricas Disponibles

```bash
# Endpoint de métricas Prometheus
curl http://localhost:3001/metrics
```

**Métricas principales:**
- `hidroponia_sensor_readings_total`: Total de lecturas de sensores
- `hidroponia_commands_executed_total`: Total de comandos ejecutados
- `hidroponia_alerts_triggered_total`: Total de alertas disparadas
- `hidroponia_api_requests_duration_seconds`: Duración de requests HTTP
- `hidroponia_websocket_connections`: Conexiones WebSocket activas

### Health Check

```bash
curl http://localhost:3001/health
```

**Respuesta:**
```json
{
  "status": "healthy",
  "timestamp": "2025-01-01T12:00:00Z",
  "version": "1.2.0",
  "uptime": 86400,
  "services": {
    "database": "healthy",
    "mqtt": "healthy",
    "influxdb": "healthy",
    "redis": "healthy"
  },
  "statistics": {
    "total_devices": 2,
    "online_devices": 2,
    "active_alerts": 0,
    "commands_pending": 0
  }
}
```

Esta documentación proporciona una referencia completa para integrar y utilizar la API del Sistema Hidroponía IoT de manera efectiva y segura.

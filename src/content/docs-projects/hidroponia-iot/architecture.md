# Arquitectura del Sistema Hidroponía IoT

## Visión General

El Sistema Hidroponía IoT es una arquitectura distribuida que combina dispositivos IoT, servicios de backend, y interfaces de usuario para crear un sistema completo de monitoreo y control de cultivos hidropónicos. La arquitectura está diseñada para ser escalable, confiable y mantenible.

## Arquitectura del Sistema

### Diagrama de Arquitectura General

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLOUD SERVICES                          │
├─────────────────────────────────────────────────────────────────┤
│  InfluxDB Cloud  │  Alert Services  │  Mobile Push  │  Analytics │
└─────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────┐
│                       LOCAL NETWORK                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────┐    ┌─────────────────┐    ┌──────────────┐ │
│  │   Web Dashboard │    │   Mobile App    │    │  Admin Panel │ │
│  │     (React)     │    │   (React Native)│    │   (React)    │ │
│  └─────────────────┘    └─────────────────┘    └──────────────┘ │
│           │                       │                      │     │
│           └───────────────┬───────────────────────────────┘     │
│                           │                                     │
│  ┌─────────────────────────▼─────────────────────────────────┐   │
│  │                  API GATEWAY                            │   │
│  │              (Node.js + Express)                       │   │
│  └─────────────────────────┬─────────────────────────────────┘   │
│                           │                                     │
│  ┌─────────────────────────▼─────────────────────────────────┐   │
│  │                 CORE SERVICES                           │   │
│  │  ┌─────────────┐ ┌──────────────┐ ┌─────────────────┐   │   │
│  │  │ Data Service│ │ Alert Service│ │ Control Service │   │   │
│  │  │             │ │              │ │                 │   │   │
│  │  └─────────────┘ └──────────────┘ └─────────────────┘   │   │
│  └─────────────────────────┬─────────────────────────────────┘   │
│                           │                                     │
│  ┌─────────────────────────▼─────────────────────────────────┐   │
│  │                DATA LAYER                               │   │
│  │  ┌─────────────┐ ┌──────────────┐ ┌─────────────────┐   │   │
│  │  │  InfluxDB   │ │   PostgreSQL │ │      Redis      │   │   │
│  │  │(Time Series)│ │ (Relational) │ │    (Cache)      │   │   │
│  │  └─────────────┘ └──────────────┘ └─────────────────┘   │   │
│  └─────────────────────────┬─────────────────────────────────┘   │
│                           │                                     │
│  ┌─────────────────────────▼─────────────────────────────────┐   │
│  │               COMMUNICATION LAYER                       │   │
│  │  ┌─────────────┐ ┌──────────────┐ ┌─────────────────┐   │   │
│  │  │MQTT Broker  │ │  WebSockets  │ │   HTTP/REST     │   │   │
│  │  │(Mosquitto)  │ │              │ │                 │   │   │
│  │  └─────────────┘ └──────────────┘ └─────────────────┘   │   │
│  └─────────────────────────┬─────────────────────────────────┘   │
└─────────────────────────────┼─────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                      HARDWARE LAYER                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────┐    ┌─────────────────┐    ┌──────────────┐ │
│  │   ESP32 Node 1  │    │   ESP32 Node 2  │    │ Arduino Node │ │
│  │  ┌───────────┐  │    │  ┌───────────┐  │    │ ┌──────────┐ │ │
│  │  │ Sensors   │  │    │  │ Actuators │  │    │ │ Backup   │ │ │
│  │  │ - pH      │  │    │  │ - Pumps   │  │    │ │ Systems  │ │ │
│  │  │ - EC/TDS  │  │    │  │ - Valves  │  │    │ │          │ │ │
│  │  │ - Temp    │  │    │  │ - Lights  │  │    │ │          │ │ │
│  │  │ - Level   │  │    │  │ - Fans    │  │    │ │          │ │ │
│  │  └───────────┘  │    │  └───────────┘  │    │ └──────────┘ │ │
│  └─────────────────┘    └─────────────────┘    └──────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

## Componentes de Hardware

### 1. Microcontroladores

#### ESP32 (Principal)
```cpp
// Especificaciones técnicas
- CPU: Dual-core Xtensa 32-bit LX6
- Memoria: 320KB SRAM, 4MB Flash
- WiFi: 802.11 b/g/n
- Bluetooth: v4.2 BR/EDR and BLE
- GPIO: 34 pines programables
- ADC: 12-bit, hasta 18 canales
- PWM: 16 canales
- Comunicación: UART, SPI, I2C

// Configuración de pines
#define SENSOR_PH_PIN       36
#define SENSOR_TDS_PIN      39
#define SENSOR_TEMP_PIN     4
#define SENSOR_LEVEL_TRIG   5
#define SENSOR_LEVEL_ECHO   18
#define SENSOR_LIGHT_PIN    34

#define PUMP_WATER_PIN      25
#define PUMP_NUTRIENT_PIN   26
#define PUMP_PH_UP_PIN      27
#define PUMP_PH_DOWN_PIN    14
#define RELAY_LIGHTS_PIN    12
#define RELAY_FAN_PIN       13
```

#### Arduino Uno R3 (Backup/Legacy)
```cpp
// Sistema de respaldo para funciones críticas
- Microcontrolador: ATmega328P
- Memoria: 2KB SRAM, 32KB Flash
- GPIO: 14 pines digitales, 6 análogos
- Comunicación: UART, SPI, I2C
- Uso: Sistema de seguridad y backup
```

### 2. Sensores

#### Sensor de pH (PH-4502C)
```cpp
class PhSensor {
private:
    int pin;
    float calibration_offset;
    float calibration_slope;
    
public:
    PhSensor(int _pin) : pin(_pin) {
        calibration_offset = 0.0;
        calibration_slope = 3.5;  // mV/pH
    }
    
    float readPH() {
        int sensorValue = analogRead(pin);
        float voltage = sensorValue * (3.3 / 4095.0);  // ESP32 ADC
        float ph = 7.0 - ((voltage - 1.65) / calibration_slope);
        return constrain(ph, 0.0, 14.0);
    }
    
    void calibrate(float ph4_voltage, float ph7_voltage) {
        calibration_slope = (ph7_voltage - ph4_voltage) / (7.0 - 4.0);
        calibration_offset = ph7_voltage - (7.0 * calibration_slope);
    }
};
```

#### Sensor TDS/EC (Conductividad)
```cpp
class TdsSensor {
private:
    int pin;
    float kValue;
    float temperature;
    
public:
    TdsSensor(int _pin) : pin(_pin), kValue(1.0), temperature(25.0) {}
    
    float readTDS() {
        int sensorValue = analogRead(pin);
        float voltage = sensorValue * (3.3 / 4095.0);
        
        // Compensación por temperatura
        float compensationCoef = 1.0 + 0.02 * (temperature - 25.0);
        float compensationVoltage = voltage / compensationCoef;
        
        // Conversión a TDS
        float tdsValue = (133.42 * pow(compensationVoltage, 3) 
                         - 255.86 * pow(compensationVoltage, 2) 
                         + 857.39 * compensationVoltage) * kValue;
        
        return tdsValue;
    }
    
    float readEC() {
        return readTDS() * 2.0;  // Aproximación TDS a EC
    }
    
    void setTemperature(float temp) {
        temperature = temp;
    }
};
```

#### Sensor de Temperatura (DS18B20)
```cpp
#include <OneWire.h>
#include <DallasTemperature.h>

class TemperatureSensor {
private:
    OneWire oneWire;
    DallasTemperature sensors;
    
public:
    TemperatureSensor(int pin) : oneWire(pin), sensors(&oneWire) {
        sensors.begin();
    }
    
    float readTemperature() {
        sensors.requestTemperatures();
        float temp = sensors.getTempCByIndex(0);
        return (temp != DEVICE_DISCONNECTED_C) ? temp : -999;
    }
    
    int getDeviceCount() {
        return sensors.getDeviceCount();
    }
};
```

### 3. Actuadores

#### Sistema de Bombas
```cpp
class PumpController {
private:
    struct Pump {
        int pin;
        bool isActive;
        unsigned long activationTime;
        unsigned long maxRunTime;
    };
    
    Pump pumps[4];  // agua, nutrientes, pH+, pH-
    
public:
    PumpController() {
        pumps[0] = {PUMP_WATER_PIN, false, 0, 300000};      // 5 min max
        pumps[1] = {PUMP_NUTRIENT_PIN, false, 0, 60000};    // 1 min max
        pumps[2] = {PUMP_PH_UP_PIN, false, 0, 10000};       // 10 seg max
        pumps[3] = {PUMP_PH_DOWN_PIN, false, 0, 10000};     // 10 seg max
        
        for(int i = 0; i < 4; i++) {
            pinMode(pumps[i].pin, OUTPUT);
            digitalWrite(pumps[i].pin, LOW);
        }
    }
    
    void activatePump(int pumpId, unsigned long duration) {
        if(pumpId < 0 || pumpId >= 4) return;
        
        Pump& pump = pumps[pumpId];
        if(duration > pump.maxRunTime) duration = pump.maxRunTime;
        
        pump.isActive = true;
        pump.activationTime = millis();
        digitalWrite(pump.pin, HIGH);
        
        Serial.printf("Pump %d activated for %lu ms\n", pumpId, duration);
    }
    
    void update() {
        for(int i = 0; i < 4; i++) {
            Pump& pump = pumps[i];
            if(pump.isActive && (millis() - pump.activationTime) > pump.maxRunTime) {
                pump.isActive = false;
                digitalWrite(pump.pin, LOW);
                Serial.printf("Pump %d auto-stopped\n", i);
            }
        }
    }
};
```

## Backend Architecture

### 1. API Gateway

```typescript
// src/gateway/app.ts
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
    credentials: true
}));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Service routing
app.use('/api/data', createProxyMiddleware({
    target: 'http://data-service:3001',
    changeOrigin: true,
    pathRewrite: { '^/api/data': '' }
}));

app.use('/api/control', createProxyMiddleware({
    target: 'http://control-service:3002',
    changeOrigin: true,
    pathRewrite: { '^/api/control': '' }
}));

app.use('/api/alerts', createProxyMiddleware({
    target: 'http://alert-service:3003',
    changeOrigin: true,
    pathRewrite: { '^/api/alerts': '' }
}));

export default app;
```

### 2. Data Service

```typescript
// src/services/data/dataService.ts
import { InfluxDB, Point } from '@influxdata/influxdb-client';
import { MqttClient } from './mqttClient';

export class DataService {
    private influxDB: InfluxDB;
    private writeClient: WriteApi;
    private queryClient: QueryApi;
    private mqttClient: MqttClient;

    constructor() {
        this.influxDB = new InfluxDB({
            url: process.env.INFLUXDB_URL!,
            token: process.env.INFLUXDB_TOKEN!
        });
        
        this.writeClient = this.influxDB.getWriteApi(
            process.env.INFLUXDB_ORG!,
            process.env.INFLUXDB_BUCKET!
        );
        
        this.queryClient = this.influxDB.getQueryApi(process.env.INFLUXDB_ORG!);
        this.mqttClient = new MqttClient(this.handleSensorData.bind(this));
    }

    private async handleSensorData(topic: string, payload: any) {
        const [, sensorType, deviceId] = topic.split('/');
        
        const point = new Point('sensor_data')
            .tag('sensor_type', sensorType)
            .tag('device_id', deviceId)
            .floatField('value', payload.value)
            .timestamp(new Date(payload.timestamp));

        this.writeClient.writePoint(point);
        
        // Real-time broadcast
        this.broadcastToClients({
            type: 'sensor_update',
            sensorType,
            deviceId,
            value: payload.value,
            timestamp: payload.timestamp
        });
    }

    async getSensorHistory(sensorType: string, timeRange: string = '1h') {
        const query = `
            from(bucket: "${process.env.INFLUXDB_BUCKET}")
            |> range(start: -${timeRange})
            |> filter(fn: (r) => r._measurement == "sensor_data")
            |> filter(fn: (r) => r.sensor_type == "${sensorType}")
            |> aggregateWindow(every: 1m, fn: mean, createEmpty: false)
        `;

        const result = await this.queryClient.collectRows(query);
        return result.map(row => ({
            time: row._time,
            value: row._value,
            device: row.device_id
        }));
    }

    async getLatestReadings() {
        const sensors = ['ph', 'ec', 'temperature', 'water_level', 'light'];
        const latest = {};

        for (const sensor of sensors) {
            const query = `
                from(bucket: "${process.env.INFLUXDB_BUCKET}")
                |> range(start: -5m)
                |> filter(fn: (r) => r._measurement == "sensor_data")
                |> filter(fn: (r) => r.sensor_type == "${sensor}")
                |> last()
            `;

            const result = await this.queryClient.collectRows(query);
            if (result.length > 0) {
                latest[sensor] = {
                    value: result[0]._value,
                    timestamp: result[0]._time,
                    device: result[0].device_id
                };
            }
        }

        return latest;
    }
}
```

### 3. Control Service

```typescript
// src/services/control/controlService.ts
import { MqttClient } from '../shared/mqttClient';
import { DataService } from '../data/dataService';

export class ControlService {
    private mqttClient: MqttClient;
    private dataService: DataService;
    private automationRules: AutomationRule[];

    constructor() {
        this.mqttClient = new MqttClient();
        this.dataService = new DataService();
        this.automationRules = this.loadAutomationRules();
        this.startAutomationEngine();
    }

    async executeCommand(deviceId: string, action: string, parameters: any) {
        const command = {
            action,
            parameters,
            timestamp: new Date().toISOString(),
            commandId: this.generateCommandId()
        };

        const topic = `hidroponia/commands/${deviceId}`;
        await this.mqttClient.publish(topic, JSON.stringify(command));

        // Log command execution
        console.log(`Command sent to ${deviceId}: ${action}`, parameters);
        
        return { success: true, commandId: command.commandId };
    }

    async activatePump(deviceId: string, pumpType: string, duration: number) {
        return this.executeCommand(deviceId, 'activate_pump', {
            pump_type: pumpType,
            duration: Math.min(duration, this.getMaxPumpDuration(pumpType))
        });
    }

    async setLights(deviceId: string, intensity: number, schedule?: any) {
        return this.executeCommand(deviceId, 'set_lights', {
            intensity: Math.max(0, Math.min(100, intensity)),
            schedule
        });
    }

    private startAutomationEngine() {
        setInterval(async () => {
            const readings = await this.dataService.getLatestReadings();
            
            for (const rule of this.automationRules) {
                if (await rule.shouldExecute(readings)) {
                    await rule.execute(this);
                }
            }
        }, 30000); // Check every 30 seconds
    }

    private getMaxPumpDuration(pumpType: string): number {
        const maxDurations = {
            'water': 300000,     // 5 minutes
            'nutrient': 60000,   // 1 minute
            'ph_up': 10000,      // 10 seconds
            'ph_down': 10000     // 10 seconds
        };
        return maxDurations[pumpType] || 60000;
    }
}

// Automation rules
interface AutomationRule {
    name: string;
    shouldExecute(readings: any): Promise<boolean>;
    execute(controller: ControlService): Promise<void>;
}

class PhCorrectionRule implements AutomationRule {
    name = 'pH Correction';

    async shouldExecute(readings: any): Promise<boolean> {
        if (!readings.ph) return false;
        
        const phValue = readings.ph.value;
        return phValue < 5.5 || phValue > 6.5;
    }

    async execute(controller: ControlService): Promise<void> {
        const readings = await controller.dataService.getLatestReadings();
        const phValue = readings.ph.value;
        
        if (phValue < 5.5) {
            await controller.activatePump('main_controller', 'ph_up', 5000);
        } else if (phValue > 6.5) {
            await controller.activatePump('main_controller', 'ph_down', 5000);
        }
        
        console.log(`pH correction executed: ${phValue}`);
    }
}
```

### 4. Alert Service

```typescript
// src/services/alerts/alertService.ts
import nodemailer from 'nodemailer';
import { WebhookClient } from 'discord.js';

export class AlertService {
    private emailTransporter: nodemailer.Transporter;
    private discordWebhook: WebhookClient;
    private alertRules: AlertRule[];

    constructor() {
        this.setupEmailTransporter();
        this.setupDiscordWebhook();
        this.alertRules = this.loadAlertRules();
        this.startAlertMonitoring();
    }

    private startAlertMonitoring() {
        setInterval(async () => {
            const readings = await this.getLatestReadings();
            
            for (const rule of this.alertRules) {
                if (await rule.shouldTrigger(readings)) {
                    await this.sendAlert(rule.createAlert(readings));
                }
            }
        }, 60000); // Check every minute
    }

    async sendAlert(alert: Alert) {
        // Prevent spam - check if similar alert was sent recently
        if (await this.wasRecentlySent(alert)) {
            return;
        }

        // Send via multiple channels
        await Promise.all([
            this.sendEmailAlert(alert),
            this.sendDiscordAlert(alert),
            this.sendWebhookAlert(alert)
        ]);

        // Log alert
        console.log(`Alert sent: ${alert.title}`, alert);
        await this.logAlert(alert);
    }

    private async sendEmailAlert(alert: Alert) {
        if (!process.env.ALERT_EMAIL_TO) return;

        const mailOptions = {
            from: process.env.ALERT_EMAIL_FROM,
            to: process.env.ALERT_EMAIL_TO,
            subject: `🌱 Hidroponia Alert: ${alert.title}`,
            html: this.generateEmailTemplate(alert)
        };

        await this.emailTransporter.sendMail(mailOptions);
    }

    private async sendDiscordAlert(alert: Alert) {
        if (!this.discordWebhook) return;

        const embed = {
            title: alert.title,
            description: alert.message,
            color: this.getAlertColor(alert.severity),
            fields: [
                { name: 'Severity', value: alert.severity, inline: true },
                { name: 'Sensor', value: alert.sensorType, inline: true },
                { name: 'Value', value: alert.currentValue?.toString(), inline: true }
            ],
            timestamp: new Date().toISOString()
        };

        await this.discordWebhook.send({ embeds: [embed] });
    }

    private generateEmailTemplate(alert: Alert): string {
        return `
            <div style="font-family: Arial, sans-serif; max-width: 600px;">
                <h2 style="color: ${this.getAlertColor(alert.severity)};">
                    ${alert.title}
                </h2>
                <p><strong>Mensaje:</strong> ${alert.message}</p>
                <p><strong>Severidad:</strong> ${alert.severity}</p>
                <p><strong>Sensor:</strong> ${alert.sensorType}</p>
                <p><strong>Valor actual:</strong> ${alert.currentValue}</p>
                <p><strong>Timestamp:</strong> ${alert.timestamp}</p>
                
                <div style="margin-top: 20px; padding: 10px; background-color: #f0f0f0;">
                    <h3>Acciones recomendadas:</h3>
                    <ul>
                        ${alert.recommendedActions?.map(action => `<li>${action}</li>`).join('') || '<li>Revisar el sistema</li>'}
                    </ul>
                </div>
                
                <p style="margin-top: 20px;">
                    <a href="${process.env.DASHBOARD_URL}" 
                       style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
                        Ver Dashboard
                    </a>
                </p>
            </div>
        `;
    }
}

// Alert rules
class CriticalPhRule implements AlertRule {
    name = 'Critical pH Level';

    async shouldTrigger(readings: any): Promise<boolean> {
        if (!readings.ph) return false;
        
        const phValue = readings.ph.value;
        return phValue < 4.5 || phValue > 8.0;
    }

    createAlert(readings: any): Alert {
        const phValue = readings.ph.value;
        return {
            id: `critical_ph_${Date.now()}`,
            title: 'pH Crítico Detectado',
            message: `El nivel de pH está fuera del rango seguro: ${phValue}`,
            severity: 'critical',
            sensorType: 'pH',
            currentValue: phValue,
            timestamp: new Date(),
            recommendedActions: [
                'Verificar calibración del sensor de pH',
                'Revisar sistema de dosificación',
                'Considerar cambio de solución nutritiva'
            ]
        };
    }
}
```

## Frontend Architecture

### 1. Dashboard Components

```tsx
// src/components/Dashboard/Dashboard.tsx
import React, { useState, useEffect } from 'react';
import { useWebSocket } from '../hooks/useWebSocket';
import { SensorGrid } from './SensorGrid';
import { ControlPanel } from './ControlPanel';
import { ChartsGrid } from './ChartsGrid';
import { AlertsPanel } from './AlertsPanel';

export const Dashboard: React.FC = () => {
    const [sensorData, setSensorData] = useState({});
    const [alerts, setAlerts] = useState([]);
    const { lastMessage, sendMessage, connectionStatus } = useWebSocket(
        process.env.REACT_APP_WS_URL || 'ws://localhost:3001'
    );

    useEffect(() => {
        if (lastMessage?.data) {
            const message = JSON.parse(lastMessage.data);
            
            switch (message.type) {
                case 'sensor_update':
                    setSensorData(prev => ({
                        ...prev,
                        [message.sensorType]: {
                            value: message.value,
                            timestamp: message.timestamp,
                            device: message.deviceId
                        }
                    }));
                    break;
                    
                case 'alert':
                    setAlerts(prev => [message.alert, ...prev.slice(0, 9)]);
                    break;
            }
        }
    }, [lastMessage]);

    const handleControlAction = async (action: string, parameters: any) => {
        try {
            const response = await fetch('/api/control/execute', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action, parameters })
            });
            
            if (response.ok) {
                console.log('Control action executed:', action);
            }
        } catch (error) {
            console.error('Control action failed:', error);
        }
    };

    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <h1>Sistema Hidroponía IoT</h1>
                <div className={`connection-status ${connectionStatus}`}>
                    {connectionStatus === 'Connected' ? '🟢' : '🔴'} {connectionStatus}
                </div>
            </header>

            <div className="dashboard-grid">
                <SensorGrid sensorData={sensorData} />
                <ControlPanel onAction={handleControlAction} />
                <ChartsGrid sensorData={sensorData} />
                <AlertsPanel alerts={alerts} />
            </div>
        </div>
    );
};
```

### 2. Real-time Charts

```tsx
// src/components/Charts/RealTimeChart.tsx
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    TimeScale
} from 'chart.js';
import 'chartjs-adapter-date-fns';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    TimeScale
);

interface RealTimeChartProps {
    sensorType: string;
    currentValue?: number;
    timeRange?: string;
}

export const RealTimeChart: React.FC<RealTimeChartProps> = ({
    sensorType,
    currentValue,
    timeRange = '1h'
}) => {
    const [historicalData, setHistoricalData] = useState([]);
    const [chartData, setChartData] = useState({
        datasets: []
    });

    useEffect(() => {
        fetchHistoricalData();
        const interval = setInterval(fetchHistoricalData, 60000); // Update every minute
        return () => clearInterval(interval);
    }, [sensorType, timeRange]);

    useEffect(() => {
        if (currentValue !== undefined) {
            addCurrentValueToChart();
        }
    }, [currentValue]);

    const fetchHistoricalData = async () => {
        try {
            const response = await fetch(`/api/data/history/${sensorType}?range=${timeRange}`);
            const data = await response.json();
            setHistoricalData(data);
            updateChartData(data);
        } catch (error) {
            console.error('Failed to fetch historical data:', error);
        }
    };

    const updateChartData = (data: any[]) => {
        setChartData({
            datasets: [{
                label: getSensorLabel(sensorType),
                data: data.map(point => ({
                    x: new Date(point.time),
                    y: point.value
                })),
                borderColor: getSensorColor(sensorType),
                backgroundColor: getSensorColor(sensorType, 0.1),
                tension: 0.1,
                pointRadius: 2,
                pointHoverRadius: 5
            }]
        });
    };

    const addCurrentValueToChart = () => {
        setChartData(prevData => {
            const newDataPoint = {
                x: new Date(),
                y: currentValue
            };

            const updatedDatasets = [...prevData.datasets];
            if (updatedDatasets[0]) {
                const newData = [...updatedDatasets[0].data, newDataPoint];
                
                // Keep only last 100 points for real-time view
                if (newData.length > 100) {
                    newData.shift();
                }
                
                updatedDatasets[0] = {
                    ...updatedDatasets[0],
                    data: newData
                };
            }

            return { ...prevData, datasets: updatedDatasets };
        });
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: `${getSensorLabel(sensorType)} - Tiempo Real`,
            },
        },
        scales: {
            x: {
                type: 'time' as const,
                time: {
                    displayFormats: {
                        minute: 'HH:mm',
                        hour: 'HH:mm'
                    }
                },
                title: {
                    display: true,
                    text: 'Tiempo'
                }
            },
            y: {
                title: {
                    display: true,
                    text: getSensorUnit(sensorType)
                },
                min: getSensorMinValue(sensorType),
                max: getSensorMaxValue(sensorType)
            }
        },
        animation: {
            duration: 0 // Disable animation for real-time updates
        }
    };

    return (
        <div className="real-time-chart">
            <Line data={chartData} options={options} />
            {currentValue !== undefined && (
                <div className="current-value">
                    Valor actual: {currentValue.toFixed(2)} {getSensorUnit(sensorType)}
                </div>
            )}
        </div>
    );
};

// Helper functions
const getSensorLabel = (sensorType: string): string => {
    const labels = {
        'ph': 'pH',
        'ec': 'Conductividad Eléctrica',
        'temperature': 'Temperatura',
        'water_level': 'Nivel de Agua',
        'light': 'Intensidad de Luz'
    };
    return labels[sensorType] || sensorType;
};

const getSensorColor = (sensorType: string, alpha: number = 1): string => {
    const colors = {
        'ph': `rgba(255, 99, 132, ${alpha})`,
        'ec': `rgba(54, 162, 235, ${alpha})`,
        'temperature': `rgba(255, 205, 86, ${alpha})`,
        'water_level': `rgba(75, 192, 192, ${alpha})`,
        'light': `rgba(153, 102, 255, ${alpha})`
    };
    return colors[sensorType] || `rgba(128, 128, 128, ${alpha})`;
};

const getSensorUnit = (sensorType: string): string => {
    const units = {
        'ph': 'pH',
        'ec': 'µS/cm',
        'temperature': '°C',
        'water_level': 'cm',
        'light': 'lux'
    };
    return units[sensorType] || '';
};

const getSensorMinValue = (sensorType: string): number => {
    const mins = {
        'ph': 0,
        'ec': 0,
        'temperature': 0,
        'water_level': 0,
        'light': 0
    };
    return mins[sensorType] || 0;
};

const getSensorMaxValue = (sensorType: string): number => {
    const maxs = {
        'ph': 14,
        'ec': 3000,
        'temperature': 40,
        'water_level': 50,
        'light': 100000
    };
    return maxs[sensorType] || 100;
};
```

## Database Schema

### 1. InfluxDB (Time Series Data)

```sql
-- Measurement: sensor_data
-- Tags: sensor_type, device_id, location
-- Fields: value (float)
-- Time: timestamp

-- Example queries:

-- Get last 24 hours of pH data
FROM 
  bucket: "hidroponia-data"
|> range(start: -24h)
|> filter(fn: (r) => r._measurement == "sensor_data")
|> filter(fn: (r) => r.sensor_type == "ph")
|> aggregateWindow(every: 5m, fn: mean, createEmpty: false)

-- Get average values per hour for all sensors
FROM 
  bucket: "hidroponia-data"
|> range(start: -7d)
|> filter(fn: (r) => r._measurement == "sensor_data")
|> aggregateWindow(every: 1h, fn: mean, createEmpty: false)
|> pivot(rowKey:["_time"], columnKey: ["sensor_type"], valueColumn: "_value")

-- Detect anomalies (values outside normal range)
FROM 
  bucket: "hidroponia-data"
|> range(start: -1h)
|> filter(fn: (r) => r._measurement == "sensor_data")
|> filter(fn: (r) => r.sensor_type == "ph")
|> filter(fn: (r) => r._value < 5.5 or r._value > 6.5)
```

### 2. PostgreSQL (Configuration and Metadata)

```sql
-- Users and authentication
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP
);

-- Devices and nodes
CREATE TABLE devices (
    id SERIAL PRIMARY KEY,
    device_id VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    type VARCHAR(50) NOT NULL, -- 'sensor_node', 'controller', 'actuator'
    location VARCHAR(100),
    status VARCHAR(20) DEFAULT 'active',
    last_seen TIMESTAMP,
    firmware_version VARCHAR(20),
    ip_address INET,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sensor configuration
CREATE TABLE sensors (
    id SERIAL PRIMARY KEY,
    device_id INTEGER REFERENCES devices(id),
    sensor_type VARCHAR(50) NOT NULL,
    pin_number INTEGER,
    calibration_data JSONB,
    threshold_min FLOAT,
    threshold_max FLOAT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Actuator configuration
CREATE TABLE actuators (
    id SERIAL PRIMARY KEY,
    device_id INTEGER REFERENCES devices(id),
    actuator_type VARCHAR(50) NOT NULL,
    pin_number INTEGER,
    max_runtime_ms INTEGER,
    safety_timeout_ms INTEGER,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Automation rules
CREATE TABLE automation_rules (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    conditions JSONB NOT NULL,
    actions JSONB NOT NULL,
    is_active BOOLEAN DEFAULT true,
    priority INTEGER DEFAULT 0,
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_executed TIMESTAMP
);

-- Alert configuration
CREATE TABLE alert_configs (
    id SERIAL PRIMARY KEY,
    sensor_type VARCHAR(50) NOT NULL,
    alert_type VARCHAR(50) NOT NULL, -- 'warning', 'critical'
    condition_min FLOAT,
    condition_max FLOAT,
    cooldown_minutes INTEGER DEFAULT 60,
    notification_channels JSONB, -- ['email', 'discord', 'webhook']
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Alert log
CREATE TABLE alerts (
    id SERIAL PRIMARY KEY,
    alert_config_id INTEGER REFERENCES alert_configs(id),
    sensor_type VARCHAR(50) NOT NULL,
    device_id VARCHAR(50),
    alert_level VARCHAR(20) NOT NULL,
    message TEXT NOT NULL,
    sensor_value FLOAT,
    acknowledged BOOLEAN DEFAULT false,
    acknowledged_by INTEGER REFERENCES users(id),
    acknowledged_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Command log
CREATE TABLE commands (
    id SERIAL PRIMARY KEY,
    device_id VARCHAR(50) NOT NULL,
    command_type VARCHAR(50) NOT NULL,
    parameters JSONB,
    status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'sent', 'confirmed', 'failed'
    sent_by INTEGER REFERENCES users(id),
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    confirmed_at TIMESTAMP,
    error_message TEXT
);

-- System configuration
CREATE TABLE system_config (
    id SERIAL PRIMARY KEY,
    config_key VARCHAR(100) UNIQUE NOT NULL,
    config_value JSONB NOT NULL,
    description TEXT,
    updated_by INTEGER REFERENCES users(id),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_sensors_device_type ON sensors(device_id, sensor_type);
CREATE INDEX idx_actuators_device_type ON actuators(device_id, actuator_type);
CREATE INDEX idx_alerts_created_at ON alerts(created_at DESC);
CREATE INDEX idx_commands_device_status ON commands(device_id, status);
CREATE INDEX idx_devices_status ON devices(status);
```

### 3. Redis (Caching and Session Management)

```redis
# Session storage
SET session:user:123 '{"userId": 123, "username": "admin", "role": "admin"}'
EXPIRE session:user:123 3600

# Real-time sensor cache (latest values)
HSET sensors:latest ph 6.2
HSET sensors:latest ec 1100
HSET sensors:latest temperature 23.5
HSET sensors:latest water_level 25.8

# Device status cache
HSET devices:status sensor_node_1 '{"status": "online", "last_seen": "2025-01-01T12:00:00Z"}'
HSET devices:status controller_1 '{"status": "online", "last_seen": "2025-01-01T12:00:00Z"}'

# Alert cooldown tracking
SET alert:cooldown:ph:critical true
EXPIRE alert:cooldown:ph:critical 3600

# Command queue
LPUSH commands:pending '{"device": "controller_1", "action": "activate_pump", "params": {"type": "water", "duration": 30000}}'

# Rate limiting
INCR rate_limit:api:192.168.1.100
EXPIRE rate_limit:api:192.168.1.100 3600
```

## Security

### 1. Network Security

```yaml
# Network segmentation
networks:
  iot_network:
    driver: bridge
    ipam:
      config:
        - subnet: 172.20.0.0/16
          gateway: 172.20.0.1

# Firewall rules (iptables)
# Allow only necessary ports
-A INPUT -p tcp --dport 3000 -j ACCEPT  # Dashboard
-A INPUT -p tcp --dport 3001 -j ACCEPT  # API
-A INPUT -p tcp --dport 1883 -j ACCEPT  # MQTT
-A INPUT -p tcp --dport 8086 -j ACCEPT  # InfluxDB
-A INPUT -j DROP  # Drop all other traffic
```

### 2. Authentication and Authorization

```typescript
// JWT authentication middleware
import jwt from 'jsonwebtoken';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.JWT_SECRET!, (err: any, user: any) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// Role-based access control
export const requireRole = (role: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (req.user.role !== role && req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Insufficient permissions' });
        }
        next();
    };
};

// MQTT authentication
const mqttAuth = (username: string, password: string): boolean => {
    const validUsers = {
        'hidroponia_sensor': process.env.MQTT_SENSOR_PASSWORD,
        'hidroponia_controller': process.env.MQTT_CONTROLLER_PASSWORD,
        'hidroponia_dashboard': process.env.MQTT_DASHBOARD_PASSWORD
    };

    return validUsers[username] === password;
};
```

### 3. Data Validation

```typescript
// Input validation schemas
import Joi from 'joi';

export const sensorDataSchema = Joi.object({
    sensor_type: Joi.string().valid('ph', 'ec', 'temperature', 'water_level', 'light').required(),
    value: Joi.number().min(0).max(10000).required(),
    device_id: Joi.string().pattern(/^[a-zA-Z0-9_]+$/).required(),
    timestamp: Joi.date().iso().required()
});

export const controlCommandSchema = Joi.object({
    device_id: Joi.string().pattern(/^[a-zA-Z0-9_]+$/).required(),
    action: Joi.string().valid('activate_pump', 'set_lights', 'emergency_stop').required(),
    parameters: Joi.object().required()
});

// Rate limiting per endpoint
const createRateLimiter = (windowMs: number, max: number) => {
    return rateLimit({
        windowMs,
        max,
        message: 'Too many requests, please try again later.',
        standardHeaders: true,
        legacyHeaders: false
    });
};

export const sensorDataLimiter = createRateLimiter(60 * 1000, 60); // 60 requests per minute
export const controlLimiter = createRateLimiter(60 * 1000, 10);    // 10 requests per minute
```

## Scalability and Performance

### 1. Horizontal Scaling

```yaml
# docker-compose.scale.yml
version: '3.8'
services:
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
    depends_on:
      - api-service

  api-service:
    build: ./server
    environment:
      - NODE_ENV=production
      - REDIS_URL=redis://redis-cluster:6379
    deploy:
      replicas: 3
    depends_on:
      - redis-cluster
      - postgres-cluster

  redis-cluster:
    image: redis:7-alpine
    deploy:
      replicas: 3

  postgres-cluster:
    image: postgres:15
    deploy:
      replicas: 2
```

### 2. Data Retention and Archival

```typescript
// Data retention policies
const retentionPolicies = {
    raw_data: '30d',        // Raw sensor data: 30 days
    hourly_aggregates: '1y', // Hourly averages: 1 year
    daily_aggregates: '5y',  // Daily averages: 5 years
    alerts: '2y',           // Alert history: 2 years
    commands: '6m'          // Command history: 6 months
};

// Automated cleanup job
const cleanupOldData = async () => {
    // Clean InfluxDB
    for (const [bucket, retention] of Object.entries(retentionPolicies)) {
        await influxDB.deleteAPI.postDelete({
            org: process.env.INFLUXDB_ORG!,
            bucket: bucket,
            start: new Date(Date.now() - parseRetention(retention)),
            stop: new Date()
        });
    }
    
    // Clean PostgreSQL
    await db.query('DELETE FROM alerts WHERE created_at < NOW() - INTERVAL $1', ['2 years']);
    await db.query('DELETE FROM commands WHERE sent_at < NOW() - INTERVAL $1', ['6 months']);
};

// Schedule cleanup job
cron.schedule('0 2 * * *', cleanupOldData); // Run daily at 2 AM
```

### 3. Monitoring and Metrics

```typescript
// Prometheus metrics
import client from 'prom-client';

const httpRequestDuration = new client.Histogram({
    name: 'http_request_duration_seconds',
    help: 'Duration of HTTP requests in seconds',
    labelNames: ['method', 'route', 'status_code']
});

const sensorReadingsTotal = new client.Counter({
    name: 'sensor_readings_total',
    help: 'Total number of sensor readings received',
    labelNames: ['sensor_type', 'device_id']
});

const mqttMessagesTotal = new client.Counter({
    name: 'mqtt_messages_total',
    help: 'Total number of MQTT messages processed',
    labelNames: ['topic', 'direction']
});

const alertsTriggeredTotal = new client.Counter({
    name: 'alerts_triggered_total',
    help: 'Total number of alerts triggered',
    labelNames: ['alert_type', 'severity']
});

// Health check endpoint
app.get('/health', (req, res) => {
    const health = {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        services: {
            database: checkDatabaseHealth(),
            mqtt: checkMqttHealth(),
            influxdb: checkInfluxHealth()
        }
    };
    
    res.json(health);
});
```

## Deployment Strategies

### 1. Production Deployment

```bash
#!/bin/bash
# deploy.sh

# Build and deploy to production
docker-compose -f docker-compose.prod.yml build
docker-compose -f docker-compose.prod.yml up -d

# Run database migrations
docker-compose exec api-service npm run migrate

# Set up monitoring
docker-compose -f monitoring.yml up -d

# Configure SSL certificates
certbot --nginx -d hidroponia.cpf-fiuna.org

# Set up automated backups
crontab -e
# 0 2 * * * /opt/hidroponia/scripts/backup.sh
```

### 2. CI/CD Pipeline

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production
on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm test

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Build Docker images
        run: |
          docker build -t hidroponia/api:${{ github.sha }} ./server
          docker build -t hidroponia/dashboard:${{ github.sha }} ./dashboard

  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - name: Deploy to production
        run: |
          ssh ${{ secrets.PRODUCTION_HOST }} "
            cd /opt/hidroponia &&
            docker-compose pull &&
            docker-compose up -d --no-deps api dashboard
          "
```

Esta arquitectura proporciona una base sólida y escalable para el Sistema Hidroponía IoT, con consideraciones completas de seguridad, rendimiento y mantenibilidad.

---
title: "Guía de Contribución"
description: "Cómo contribuir al desarrollo del sistema de hidroponía IoT"
chapter: "Desarrollo"
section: "Guía de Contribución"
order: 1
---

# Contributing to Hidroponia IoT System

Thank you for your interest in contributing to the Hidroponia IoT system! This guide will help you get started with contributing to our open-source hydroponics automation platform.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Contributing Areas](#contributing-areas)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Hardware Contributions](#hardware-contributions)
- [Documentation](#documentation)
- [Pull Request Process](#pull-request-process)
- [Community Guidelines](#community-guidelines)

## Getting Started

### What is Hidroponia IoT?

Hidroponia IoT is an open-source hydroponics automation system that includes:
- **Hardware**: ESP32-based controllers with sensors and actuators
- **Backend**: Node.js API with real-time data processing
- **Frontend**: React dashboard for monitoring and control
- **Mobile**: Cross-platform mobile application
- **AI**: Machine learning models for optimization

### Prerequisites

Before contributing, ensure you have:

- **Hardware Knowledge**: Basic understanding of electronics and sensors
- **Programming Skills**: JavaScript/TypeScript, C++ (for Arduino), Python (for ML)
- **Development Tools**: Arduino IDE, Node.js, Docker, Git
- **Hardware Access**: ESP32 or Arduino (for hardware development)

### Types of Contributions

We welcome contributions in:

1. **Hardware Development** - Circuit design, sensor integration, 3D models
2. **Firmware Development** - Arduino/ESP32 code, sensor drivers, communication protocols
3. **Backend Development** - API endpoints, data processing, automation algorithms
4. **Frontend Development** - UI/UX, dashboards, data visualizations
5. **Mobile Development** - React Native app features and improvements
6. **Machine Learning** - Prediction models, optimization algorithms
7. **Documentation** - User guides, API docs, hardware assembly guides
8. **Testing** - Hardware testing, software testing, integration testing

## Development Setup

### 1. Repository Setup

```bash
# Fork and clone the repository
git clone https://github.com/YOUR_USERNAME/hidroponia-iot.git
cd hidroponia-iot

# Add upstream remote
git remote add upstream https://github.com/ORIGINAL_OWNER/hidroponia-iot.git

# Install dependencies
npm install
```

### 2. Hardware Development Setup

#### Required Hardware

```text
Minimum Hardware for Development:
- ESP32 development board
- Breadboard and jumper wires
- pH sensor (analog)
- TDS/EC sensor
- DHT22 temperature/humidity sensor
- Ultrasonic sensor (HC-SR04)
- 12V water pump
- Relay modules
- Power supply (12V, 3A)

Recommended Hardware:
- PCB prototyping board
- Industrial-grade sensors
- Peristaltic pumps
- LED grow lights
- Fan for ventilation
- UPS backup power
```

#### Arduino IDE Setup

```cpp
// Install required libraries
// Tools -> Manage Libraries -> Install:
// - WiFi by Arduino
// - ArduinoJson by Benoit Blanchon
// - PubSubClient by Nick O'Leary
// - DHT sensor library by Adafruit
// - OneWire by Jim Studt
// - DallasTemperature by Miles Burton

// Board configuration in Arduino IDE:
// Board: "ESP32 Dev Module"
// Upload Speed: "921600"
// CPU Frequency: "240MHz (WiFi/BT)"
// Flash Frequency: "80MHz"
// Flash Mode: "QIO"
// Flash Size: "4MB (32Mb)"
// Partition Scheme: "Default 4MB with spiffs"
```

### 3. Software Development Setup

#### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Setup environment
cp .env.example .env.development

# Start database services
docker-compose up -d postgres redis influxdb mosquitto

# Run database migrations
npm run db:migrate
npm run db:seed

# Start development server
npm run dev
```

#### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Setup environment
cp .env.example .env.local

# Start development server
npm run dev
```

#### Mobile Setup

```bash
# Navigate to mobile directory
cd mobile

# Install dependencies
npm install

# Install iOS dependencies (macOS only)
cd ios && pod install && cd ..

# Start Metro bundler
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android
```

### 4. Environment Configuration

```bash
# .env.development
NODE_ENV=development
PORT=3001

# Database
DATABASE_URL=postgresql://postgres:password@localhost:5432/hidroponia_dev
REDIS_URL=redis://localhost:6379

# Time Series Database
INFLUXDB_URL=http://localhost:8086
INFLUXDB_TOKEN=your-development-token
INFLUXDB_ORG=hidroponia
INFLUXDB_BUCKET=sensor_data

# MQTT Broker
MQTT_BROKER_URL=mqtt://localhost:1883
MQTT_USERNAME=hidroponia
MQTT_PASSWORD=your-mqtt-password

# Security
JWT_SECRET=your-jwt-secret-for-development
ENCRYPTION_KEY=your-encryption-key

# External APIs
OPENWEATHER_API_KEY=your-openweather-api-key
TELEGRAM_BOT_TOKEN=your-telegram-bot-token
```

## Contributing Areas

### 1. Hardware Development

#### Circuit Design

```cpp
// Example sensor driver contribution
class PhSensorDriver {
private:
  int analogPin;
  float calibrationOffset;
  float calibrationSlope;
  
public:
  PhSensorDriver(int pin) : analogPin(pin) {
    calibrationOffset = 0.0;
    calibrationSlope = 1.0;
  }
  
  void calibrate(float knownPh, int samples = 50) {
    float sum = 0;
    for (int i = 0; i < samples; i++) {
      sum += analogRead(analogPin);
      delay(10);
    }
    float avgReading = sum / samples;
    float voltage = avgReading * 3.3 / 4096;
    
    // Calculate calibration parameters
    calibrationOffset = knownPh - (voltage * calibrationSlope);
  }
  
  float readPh() {
    int rawValue = analogRead(analogPin);
    float voltage = rawValue * 3.3 / 4096;
    float ph = voltage * calibrationSlope + calibrationOffset;
    
    // Validate reading
    if (ph < 0 || ph > 14) {
      return -1; // Invalid reading
    }
    
    return ph;
  }
};
```

#### 3D Models and CAD Files

```text
Contributing 3D Models:
1. Use open formats (STL, STEP, FreeCAD)
2. Include print settings and material recommendations
3. Test print before submitting
4. Document assembly instructions
5. Include photos of printed parts

Directory Structure:
hardware/
  3d-models/
    enclosures/
      controller-box.stl
      sensor-housing.stl
    mounting/
      pump-bracket.stl
      sensor-mount.stl
  pcb/
    schematics/
    gerber-files/
  documentation/
    assembly-guide.md
    bom.xlsx
```

### 2. Firmware Development

#### Sensor Integration

```cpp
// Contributing new sensor support
#include "sensors/BaseSensor.h"

class NewSensorType : public BaseSensor {
private:
  int dataPin;
  int clockPin;
  
public:
  NewSensorType(int data, int clock) : dataPin(data), clockPin(clock) {}
  
  bool initialize() override {
    pinMode(dataPin, INPUT);
    pinMode(clockPin, OUTPUT);
    
    // Sensor-specific initialization
    return testSensorConnection();
  }
  
  SensorReading read() override {
    SensorReading reading;
    reading.timestamp = millis();
    reading.sensorType = "new_sensor";
    
    // Implement sensor-specific reading logic
    reading.value = readSensorValue();
    reading.unit = "sensor_unit";
    reading.isValid = validateReading(reading.value);
    
    return reading;
  }
  
  bool calibrate(CalibrationData data) override {
    // Implement calibration logic
    return true;
  }
};
```

#### Communication Protocols

```cpp
// Example MQTT message handler
void handleMqttMessage(char* topic, byte* payload, unsigned int length) {
  StaticJsonDocument<512> doc;
  deserializeJson(doc, payload, length);
  
  String topicStr = String(topic);
  
  if (topicStr.endsWith("/commands/pump")) {
    bool enable = doc["enable"];
    int duration = doc["duration"];
    
    if (enable) {
      activatePump(duration);
    } else {
      deactivatePump();
    }
    
    // Send acknowledgment
    publishAcknowledgment(topicStr, "pump_command_executed");
  }
  else if (topicStr.endsWith("/commands/calibrate")) {
    String sensorType = doc["sensor"];
    float referenceValue = doc["reference"];
    
    calibrateSensor(sensorType, referenceValue);
  }
}
```

### 3. Backend Development

#### API Endpoints

```javascript
// Example new API endpoint
const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();

// GET /api/analytics/growth-predictions
router.get('/growth-predictions/:deviceId', async (req, res) => {
  try {
    const { deviceId } = req.params;
    const { days = 7 } = req.query;
    
    // Validate device ownership
    const device = await Device.findByIdAndUserId(deviceId, req.user.id);
    if (!device) {
      return res.status(404).json({ error: 'Device not found' });
    }
    
    // Get historical data
    const historicalData = await SensorData.getHistoricalData(deviceId, days * 2);
    
    // Generate predictions using ML model
    const predictions = await MLService.predictGrowth(historicalData, days);
    
    res.json({
      deviceId,
      predictionPeriod: days,
      predictions: predictions.map(p => ({
        date: p.date,
        expectedHeight: p.height,
        confidence: p.confidence,
        recommendations: p.recommendations
      }))
    });
  } catch (error) {
    logger.error('Growth prediction failed', { error, deviceId: req.params.deviceId });
    res.status(500).json({ error: 'Failed to generate predictions' });
  }
});

// POST /api/automation/rules
router.post('/rules', [
  body('deviceId').isUUID(),
  body('name').isLength({ min: 1, max: 100 }),
  body('conditions').isArray(),
  body('actions').isArray()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  try {
    const { deviceId, name, conditions, actions, enabled = true } = req.body;
    
    // Validate conditions and actions
    const validationResult = validateAutomationRule({ conditions, actions });
    if (!validationResult.isValid) {
      return res.status(400).json({ error: validationResult.error });
    }
    
    const rule = await AutomationRule.create({
      deviceId,
      userId: req.user.id,
      name,
      conditions,
      actions,
      enabled
    });
    
    res.status(201).json({ rule });
  } catch (error) {
    logger.error('Failed to create automation rule', { error });
    res.status(500).json({ error: 'Failed to create rule' });
  }
});

module.exports = router;
```

#### Data Processing Services

```javascript
// Real-time data processing service
class SensorDataProcessor {
  constructor() {
    this.subscribers = new Map();
    this.anomalyDetector = new AnomalyDetector();
  }
  
  async processSensorData(deviceId, sensorData) {
    // Store raw data
    await this.storeRawData(deviceId, sensorData);
    
    // Process and validate data
    const processedData = await this.processData(sensorData);
    
    // Detect anomalies
    const anomalies = await this.anomalyDetector.detect(processedData);
    if (anomalies.length > 0) {
      await this.handleAnomalies(deviceId, anomalies);
    }
    
    // Update real-time aggregates
    await this.updateAggregates(deviceId, processedData);
    
    // Notify subscribers
    this.notifySubscribers(deviceId, processedData);
    
    // Trigger automation rules
    await this.evaluateAutomationRules(deviceId, processedData);
  }
  
  async evaluateAutomationRules(deviceId, data) {
    const rules = await AutomationRule.findActiveByDevice(deviceId);
    
    for (const rule of rules) {
      const shouldTrigger = this.evaluateConditions(rule.conditions, data);
      
      if (shouldTrigger) {
        await this.executeActions(rule.actions, deviceId);
        
        // Log rule execution
        await RuleExecution.create({
          ruleId: rule.id,
          deviceId,
          triggeredAt: new Date(),
          data: data
        });
      }
    }
  }
}
```

### 4. Frontend Development

#### React Components

```tsx
// Example dashboard component
import React, { useState, useEffect } from 'react';
import { Card, Grid, Typography, Switch, Slider } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface PlantGrowthDashboardProps {
  deviceId: string;
}

export const PlantGrowthDashboard: React.FC<PlantGrowthDashboardProps> = ({ deviceId }) => {
  const [growthData, setGrowthData] = useState<GrowthData[]>([]);
  const [automationEnabled, setAutomationEnabled] = useState(true);
  const [lightIntensity, setLightIntensity] = useState(80);
  
  useEffect(() => {
    fetchGrowthData();
    const interval = setInterval(fetchGrowthData, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, [deviceId]);
  
  const fetchGrowthData = async () => {
    try {
      const response = await api.get(`/analytics/growth-data/${deviceId}`);
      setGrowthData(response.data.data);
    } catch (error) {
      console.error('Failed to fetch growth data:', error);
    }
  };
  
  const handleAutomationToggle = async (enabled: boolean) => {
    try {
      await api.put(`/devices/${deviceId}/automation`, { enabled });
      setAutomationEnabled(enabled);
    } catch (error) {
      console.error('Failed to update automation:', error);
    }
  };
  
  const handleLightIntensityChange = async (value: number) => {
    setLightIntensity(value);
    try {
      await api.put(`/devices/${deviceId}/controls/light`, { intensity: value });
    } catch (error) {
      console.error('Failed to update light intensity:', error);
    }
  };
  
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8}>
        <Card sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Plant Growth Progress
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={growthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="height" 
                stroke="#2196f3" 
                strokeWidth={2}
                dot={{ fill: '#2196f3', strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="predicted" 
                stroke="#ff9800" 
                strokeDasharray="5 5"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </Grid>
      
      <Grid item xs={12} md={4}>
        <Card sx={{ p: 3, mb: 2 }}>
          <Typography variant="h6" gutterBottom>
            Automation Control
          </Typography>
          <Switch
            checked={automationEnabled}
            onChange={(e) => handleAutomationToggle(e.target.checked)}
            color="primary"
          />
          <Typography variant="body2" color="textSecondary">
            {automationEnabled ? 'Automated' : 'Manual'} mode
          </Typography>
        </Card>
        
        <Card sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Light Intensity
          </Typography>
          <Slider
            value={lightIntensity}
            onChange={(_, value) => handleLightIntensityChange(value as number)}
            min={0}
            max={100}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `${value}%`}
          />
        </Card>
      </Grid>
    </Grid>
  );
};
```

### 5. Machine Learning Contributions

#### Predictive Models

```python
# Example ML model for growth prediction
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, r2_score

class PlantGrowthPredictor:
    def __init__(self):
        self.model = RandomForestRegressor(
            n_estimators=100,
            max_depth=10,
            random_state=42
        )
        self.feature_columns = [
            'ph_level', 'ec_level', 'temperature', 'humidity',
            'light_intensity', 'light_duration', 'nutrient_a_ppm',
            'nutrient_b_ppm', 'days_since_planting'
        ]
    
    def prepare_features(self, sensor_data):
        """Prepare features from sensor data"""
        df = pd.DataFrame(sensor_data)
        
        # Add derived features
        df['light_daily_integral'] = df['light_intensity'] * df['light_duration']
        df['vpd'] = self.calculate_vpd(df['temperature'], df['humidity'])
        df['nutrient_balance'] = df['nutrient_a_ppm'] / df['nutrient_b_ppm']
        
        # Add temporal features
        df['day_of_week'] = pd.to_datetime(df['timestamp']).dt.dayofweek
        df['hour_of_day'] = pd.to_datetime(df['timestamp']).dt.hour
        
        return df[self.feature_columns]
    
    def train(self, training_data):
        """Train the growth prediction model"""
        X = self.prepare_features(training_data)
        y = training_data['plant_height']
        
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42
        )
        
        self.model.fit(X_train, y_train)
        
        # Evaluate model
        y_pred = self.model.predict(X_test)
        mae = mean_absolute_error(y_test, y_pred)
        r2 = r2_score(y_test, y_pred)
        
        return {
            'mae': mae,
            'r2_score': r2,
            'feature_importance': dict(zip(
                self.feature_columns, 
                self.model.feature_importances_
            ))
        }
    
    def predict_growth(self, current_data, days_ahead=7):
        """Predict plant growth for the next N days"""
        predictions = []
        
        for day in range(1, days_ahead + 1):
            # Prepare features for prediction
            features = self.prepare_features([current_data])
            
            # Predict growth
            predicted_height = self.model.predict(features)[0]
            
            # Calculate confidence interval
            predictions_ensemble = []
            for tree in self.model.estimators_:
                predictions_ensemble.append(tree.predict(features)[0])
            
            confidence = np.std(predictions_ensemble)
            
            predictions.append({
                'day': day,
                'predicted_height': predicted_height,
                'confidence_interval': confidence,
                'date': (datetime.now() + timedelta(days=day)).isoformat()
            })
            
            # Update current_data for next prediction
            current_data['days_since_planting'] += 1
        
        return predictions
    
    def calculate_vpd(self, temperature, humidity):
        """Calculate Vapor Pressure Deficit"""
        # Saturation vapor pressure (kPa)
        svp = 0.6108 * np.exp(17.27 * temperature / (temperature + 237.3))
        
        # Actual vapor pressure (kPa)
        avp = svp * humidity / 100
        
        # VPD (kPa)
        vpd = svp - avp
        
        return vpd
```

## Development Workflow

### Branch Strategy

```bash
# Feature development
git checkout main
git pull upstream main
git checkout -b feature/sensor-calibration-ui

# Make changes and commit
git add .
git commit -m "feat: add sensor calibration interface

- Add calibration wizard component
- Implement step-by-step calibration process
- Add validation for calibration values
- Update sensor driver with calibration support

Closes #456"

# Push and create PR
git push origin feature/sensor-calibration-ui
```

### Commit Message Format

```text
<type>(<scope>): <description>

<body>

<footer>

Types:
- feat: New feature
- fix: Bug fix
- docs: Documentation
- style: Formatting, missing semi colons, etc
- refactor: Code restructuring
- test: Adding tests
- chore: Maintenance

Examples:
feat(hardware): add support for new pH sensor model
fix(api): resolve sensor data validation issue  
docs(hardware): update assembly guide with new diagrams
```

## Testing Guidelines

### Hardware Testing

```cpp
// Hardware test suite
class SensorTestSuite {
public:
  static bool runAllTests() {
    bool allPassed = true;
    
    allPassed &= testPhSensor();
    allPassed &= testEcSensor();
    allPassed &= testTemperatureSensor();
    allPassed &= testPumpOperation();
    allPassed &= testWifiConnection();
    allPassed &= testMqttCommunication();
    
    return allPassed;
  }
  
private:
  static bool testPhSensor() {
    Serial.println("Testing pH sensor...");
    
    PhSensor sensor(PH_SENSOR_PIN);
    sensor.initialize();
    
    // Test with known buffer solutions
    float ph7Reading = sensor.read(); // Should be ~7.0
    delay(1000);
    
    if (abs(ph7Reading - 7.0) < 0.5) {
      Serial.println("✓ pH sensor test passed");
      return true;
    } else {
      Serial.println("✗ pH sensor test failed");
      return false;
    }
  }
  
  static bool testPumpOperation() {
    Serial.println("Testing pump operation...");
    
    WaterPump pump(PUMP_PIN);
    
    // Test pump activation
    pump.activate(1000); // Run for 1 second
    delay(1100);
    
    if (!pump.isActive()) {
      Serial.println("✓ Pump test passed");
      return true;
    } else {
      Serial.println("✗ Pump test failed - still active");
      return false;
    }
  }
};

void runDiagnosticTests() {
  Serial.println("=== HARDWARE DIAGNOSTIC TESTS ===");
  
  bool testsPass = SensorTestSuite::runAllTests();
  
  if (testsPass) {
    Serial.println("All tests passed ✓");
    digitalWrite(STATUS_LED, HIGH);
  } else {
    Serial.println("Some tests failed ✗");
    // Blink LED to indicate failure
    for (int i = 0; i < 5; i++) {
      digitalWrite(STATUS_LED, HIGH);
      delay(200);
      digitalWrite(STATUS_LED, LOW);
      delay(200);
    }
  }
}
```

### Software Testing

```javascript
// Backend API tests
describe('Sensor Data API', () => {
  let authToken;
  let testDevice;
  
  beforeAll(async () => {
    authToken = await getTestAuthToken();
    testDevice = await createTestDevice();
  });
  
  afterAll(async () => {
    await cleanupTestData();
  });
  
  describe('POST /api/sensor-data', () => {
    it('should accept valid sensor data', async () => {
      const sensorData = {
        deviceId: testDevice.id,
        timestamp: new Date().toISOString(),
        sensors: [
          { type: 'ph', value: 6.5, unit: 'pH' },
          { type: 'ec', value: 1200, unit: 'μS/cm' },
          { type: 'temperature', value: 22.5, unit: '°C' }
        ]
      };
      
      const response = await request(app)
        .post('/api/sensor-data')
        .set('Authorization', `Bearer ${authToken}`)
        .send(sensorData);
      
      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
    });
    
    it('should reject invalid sensor values', async () => {
      const invalidData = {
        deviceId: testDevice.id,
        sensors: [
          { type: 'ph', value: 15, unit: 'pH' } // Invalid pH value
        ]
      };
      
      const response = await request(app)
        .post('/api/sensor-data')
        .set('Authorization', `Bearer ${authToken}`)
        .send(invalidData);
      
      expect(response.status).toBe(400);
      expect(response.body.error).toContain('Invalid pH value');
    });
  });
});

// Frontend component tests
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SensorDashboard } from '../components/SensorDashboard';

describe('SensorDashboard', () => {
  it('displays sensor readings correctly', async () => {
    const mockData = {
      ph: 6.5,
      ec: 1200,
      temperature: 22.5,
      humidity: 65
    };
    
    render(<SensorDashboard deviceId="test-device" />);
    
    await waitFor(() => {
      expect(screen.getByText('pH: 6.5')).toBeInTheDocument();
      expect(screen.getByText('EC: 1200 μS/cm')).toBeInTheDocument();
      expect(screen.getByText('Temperature: 22.5°C')).toBeInTheDocument();
    });
  });
  
  it('handles pump control correctly', async () => {
    render(<SensorDashboard deviceId="test-device" />);
    
    const pumpButton = screen.getByRole('button', { name: /activate pump/i });
    fireEvent.click(pumpButton);
    
    await waitFor(() => {
      expect(screen.getByText(/pump activated/i)).toBeInTheDocument();
    });
  });
});
```

## Pull Request Process

### PR Checklist

- [ ] Code follows project style guidelines
- [ ] All tests pass (hardware and software)
- [ ] New functionality includes appropriate tests
- [ ] Documentation is updated
- [ ] Hardware changes include assembly instructions
- [ ] Commit messages follow conventional format
- [ ] PR description is clear and complete

### Review Process

1. **Automated Checks** - CI/CD pipeline runs tests
2. **Hardware Review** - For hardware changes, review schematics and BOMs
3. **Code Review** - At least two maintainers review the code
4. **Testing** - Manual testing in development environment
5. **Documentation Review** - Ensure documentation is updated
6. **Approval** - PR approved by maintainers
7. **Merge** - PR merged into main branch

## Community Guidelines

### Code of Conduct

- **Be Respectful** - Treat all community members with respect
- **Be Helpful** - Help newcomers and share knowledge
- **Be Constructive** - Provide useful feedback and suggestions
- **Be Patient** - Understand that people have different skill levels
- **Be Safe** - Follow safety guidelines when working with hardware

### Communication Channels

- **GitHub Issues** - Bug reports and feature requests
- **GitHub Discussions** - General questions and discussions
- **Discord Server** - Real-time chat and community support
- **Forum** - Long-form discussions and project showcases

### Safety Guidelines

**Electrical Safety:**
- Always disconnect power before wiring
- Use appropriate fuses and circuit protection
- Follow local electrical codes
- Double-check connections before powering on

**Chemical Safety:**
- Wear gloves when handling pH buffer solutions
- Store chemicals properly
- Dispose of solutions according to local regulations
- Keep MSDS sheets for all chemicals

## Getting Help

If you need assistance:

1. **Check Documentation** - Review existing guides and API docs
2. **Search Issues** - Look for similar problems in GitHub issues
3. **Ask in Discord** - Get help from the community
4. **Create Discussion** - Start a GitHub discussion for complex topics
5. **Contact Maintainers** - Reach out directly for urgent issues

Thank you for contributing to the Hidroponia IoT system! Your contributions help advance sustainable agriculture and make hydroponics accessible to everyone.

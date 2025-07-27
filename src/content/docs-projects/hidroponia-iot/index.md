---
title: "Sistema Hidroponía IoT"
description: "Sistema IoT para monitoreo y control automático de cultivos hidropónicos"
category: "IoT"
status: "active"
version: "1.2.0"
repository: "https://github.com/cpf-fiuna/hidroponia-iot"
demo: "https://hidroponia.cpf-fiuna.org"
maintainers: ["Iván Jara", "Oscar Alderete"]
tags: ["Arduino", "React", "MQTT", "InfluxDB"]
lastUpdate: "2025-05-22"
---

# Sistema Hidroponía IoT

Proyecto de investigación y desarrollo que combina agricultura hidropónica con Internet of Things (IoT) para crear un sistema automatizado de cultivo sostenible.

## Objetivo del Proyecto

Desarrollar un sistema inteligente que permita:
- Monitoreo continuo de cultivos hidropónicos
- Automatización de riego y nutrición
- Optimización del crecimiento mediante datos
- Reducción del consumo de agua y energía
- Educación en tecnologías sostenibles

## Características del Sistema

### Sensores y Monitoreo
- **pH del agua**: Medición continua para optimización
- **Conductividad eléctrica**: Control de nutrientes
- **Temperatura ambiente**: Monitoreo de condiciones
- **Humedad relativa**: Control del microclima
- **Nivel de agua**: Prevención de problemas
- **Luz ambiente**: Optimización de iluminación LED

### Actuadores y Control
- **Bombas de agua**: Riego automatizado
- **Bombas de nutrientes**: Dosificación precisa
- **Válvulas solenoides**: Control de flujo
- **LEDs de crecimiento**: Iluminación suplementaria
- **Ventiladores**: Control de temperatura
- **Sistema de pH**: Ajuste automático

### Dashboard y Análisis
- **Tiempo Real**: Visualización en vivo de datos
- **Históricos**: Análisis de tendencias
- **Alertas**: Notificaciones de problemas
- **Control Remoto**: Actuación desde la web
- **Reportes**: Análisis de crecimiento

## Tecnologías Utilizadas

### Hardware
- **Microcontrolador**: ESP32 con WiFi
- **Sensores**: Atlas Scientific para pH/EC
- **Actuadores**: Relés, bombas peristálticas
- **Comunicación**: MQTT sobre WiFi

### Software
- **Firmware**: C++ con Arduino Framework
- **Backend**: Node.js con Express
- **Frontend**: React con Chart.js
- **Base de Datos**: InfluxDB para series temporales
- **Broker MQTT**: Mosquitto

### Infraestructura
- **Hosting**: Raspberry Pi local + Ngrok
- **Dashboard**: Grafana para visualización
- **Alertas**: Telegram Bot para notificaciones

## Arquitectura del Sistema

```
hidroponia-iot/
├── firmware/          # Código para ESP32
├── backend/           # API y lógica de negocio
├── frontend/          # Dashboard web
├── hardware/          # Esquemas y PCBs
├── docs/              # Documentación técnica
└── datasets/          # Datos de experimentos
```

## Resultados y Logros

### Métricas de Eficiencia
- **Ahorro de agua**: 60% vs cultivo tradicional
- **Crecimiento**: 40% más rápido en lechugas
- **Uptime**: 99.2% de disponibilidad del sistema
- **Precisión**: ±0.1 pH, ±50ppm EC

### Reconocimientos
- 🏆 Primer lugar en Innovando Paraguay 2024
- 📱 Featured en IoT World Congress
- 🌱 Proyecto destacado en IEEE XTREME

## Instalación del Proyecto

### Instalación Física
1. Ensamblar estructura hidropónica
2. Conectar sensores según esquema
3. Instalar ESP32 y configurar red
4. Calibrar sensores iniciales

### Instalación de Software
1. Configurar Raspberry Pi
2. Instalar InfluxDB y Mosquitto
3. Deploy del backend y frontend
4. Configurar alertas Telegram

## Estado del Proyecto

- **Estado**: Activo y en producción
- **Versión**: 1.2.0
- **Última actualización**: 22 de mayo, 2025
- **Mantenedores**: Iván Jara, Oscar Alderete

## Próximas Mejoras

### v1.3.0 (Julio 2025)
- [ ] Integración con cámaras para computer vision
- [ ] Predicción de cosecha con IA
- [ ] App móvil nativa
- [ ] Soporte para más tipos de cultivos

### v2.0.0 (Q4 2025)
- [ ] Sistema multi-tanque
- [ ] Análisis de crecimiento con ML
- [ ] Integración con sensores climáticos
- [ ] Marketplace de datos agrícolas

## Colaboración y Educación

### Talleres Realizados
- Workshop IoT para estudiantes (50+ participantes)
- Curso de hidroponía básica
- Seminario de agricultura sostenible

### Oportunidades de Contribución
- **Desarrolladores**: Mejoras en dashboard y ML
- **Ingenieros**: Optimización de hardware
- **Estudiantes**: Investigación y testing
- **Agricultores**: Feedback y validación

## Enlaces Importantes

- [Demo en vivo](https://hidroponia.cpf-fiuna.org)
- [Repositorio en GitHub](https://github.com/cpf-fiuna/hidroponia-iot)
- [Documentación técnica](https://github.com/cpf-fiuna/hidroponia-iot/wiki)
- [Video demonstrativo](https://youtube.com/watch?v=hidroponia-demo)
- [Paper de investigación](https://arxiv.org/hidroponia-iot-paper)

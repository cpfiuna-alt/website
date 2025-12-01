---
title: "Deployment Guide"
description: "Guía completa de despliegue del CPF Discord Bot en diferentes entornos"
chapter: "Deployment"
section: "Guía de Despliegue"
order: 1
lastUpdate: "2025-11-30"
---

# CPF Discord Bot - Deployment Guide

Esta guía cubre el despliegue del bot de Discord del CPF en diferentes entornos, desde desarrollo local hasta producción en servidores cloud.

## Tabla de Contenidos

1. [Resumen](#resumen)
2. [Configuración de PM2](#configuración-de-pm2)
3. [Despliegue en Azure VM](#despliegue-en-azure-vm)
4. [Configuración de Producción](#configuración-de-producción)
5. [Monitoreo y Logging](#monitoreo-y-logging)
6. [Actualizaciones y Mantenimiento](#actualizaciones-y-mantenimiento)
7. [Troubleshooting](#troubleshooting)

## Resumen

El CPF Discord Bot está desplegado en **Azure VM** utilizando **PM2** como process manager. Esta configuración proporciona alta disponibilidad, fácil gestión y excelente rendimiento para las necesidades del bot.

### Arquitectura de Producción

- **Plataforma**: Azure Virtual Machine (Ubuntu 22.04 LTS)
- **Process Manager**: PM2 para gestión y auto-restart
- **Tamaño de VM**: Standard B1s o B2s (según necesidad)
- **Uptime**: 99.95% garantizado por Azure
- **Costo aproximado**: ~$15/mes

## Configuración de PM2

PM2 es el process manager utilizado en Azure VM para mantener el bot ejecutándose 24/7, con auto-restart y logging.

### Instalación de PM2

```bash
# Instalar PM2 globalmente
sudo npm install -g pm2

# Verificar instalación
pm2 --version
```

### Configuración de PM2

Crea `ecosystem.config.js` en la raíz del proyecto:

```javascript
module.exports = {
  apps: [
    {
      name: 'cpf-discord-bot',
      script: 'src/index.js',
      instances: 1,
      exec_mode: 'fork',
      
      // Restart policies
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
      
      // Environment variables
      env: {
        NODE_ENV: 'production',
      },
      
      // Logging
      error_file: 'logs/error.log',
      out_file: 'logs/out.log',
      log_file: 'logs/combined.log',
      time: true,
      
      // Advanced features
      min_uptime: '10s',
      max_restarts: 10,
      restart_delay: 4000,
    }
  ]
};
```

### Comandos de PM2

```bash
# Iniciar el bot
pm2 start ecosystem.config.js

# Ver estado
pm2 status

# Ver logs en tiempo real
pm2 logs cpf-discord-bot

# Ver logs solo de errores
pm2 logs cpf-discord-bot --err

# Ver monitoreo en tiempo real
pm2 monit

# Reiniciar bot
pm2 restart cpf-discord-bot

# Detener bot
pm2 stop cpf-discord-bot

# Eliminar proceso
pm2 delete cpf-discord-bot

# Guardar configuración actual
pm2 save

# Ver información detallada
pm2 info cpf-discord-bot
```

### Auto-start en Boot

```bash
# Generar script de inicio
pm2 startup systemd

# Ejecutar el comando que PM2 te muestre (algo como):
sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u usuario --hp /home/usuario

# Guardar procesos actuales
pm2 save
```

## Despliegue en Azure VM

### 1. Crear VM en Azure

```bash
# Instalar Azure CLI
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash

# Login en Azure
az login

# Crear grupo de recursos
az group create --name cpf-bot-rg --location eastus

# Crear VM Ubuntu
az vm create \
  --resource-group cpf-bot-rg \
  --name cpf-bot-vm \
  --image UbuntuLTS \
  --size Standard_B1s \
  --admin-username azureuser \
  --generate-ssh-keys \
  --public-ip-sku Standard

# Abrir puerto 22 para SSH
az vm open-port --port 22 --resource-group cpf-bot-rg --name cpf-bot-vm
```

### 2. Configurar VM

```bash
# Conectar a la VM
ssh azureuser@<VM_PUBLIC_IP>

# Actualizar sistema
sudo apt update && sudo apt upgrade -y

# Instalar Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Instalar Git
sudo apt install -y git

# Verificar instalaciones
node --version
npm --version
git --version
```

### 3. Desplegar Bot

```bash
# Crear directorio para el bot
sudo mkdir -p /opt/cpf-bot
sudo chown $USER:$USER /opt/cpf-bot
cd /opt/cpf-bot

# Clonar repositorio
git clone https://github.com/davidgimenezs/discord-bot.git .

# Instalar dependencias (solo producción)
npm ci --production

# Crear archivo .env
nano .env
# Pegar configuración de producción

# Instalar PM2
sudo npm install -g pm2

# Registrar comandos
npm run deploy-global

# Iniciar bot con PM2
pm2 start ecosystem.config.js

# Configurar auto-start
pm2 startup systemd
pm2 save
```

### 4. Configurar Firewall (Opcional)

```bash
# Instalar UFW
sudo apt install -y ufw

# Permitir SSH
sudo ufw allow 22/tcp

# Habilitar firewall
sudo ufw enable

# Verificar estado
sudo ufw status
```

## Comandos Útiles de Gestión

### Comandos PM2 en Azure VM

```bash
# Ver estado de todos los procesos
pm2 status

# Ver logs en tiempo real
pm2 logs cpf-bot

# Ver logs solo de errores
pm2 logs cpf-bot --err

# Monitoreo de recursos
pm2 monit

# Información detallada del bot
pm2 info cpf-bot

# Reiniciar el bot
pm2 restart cpf-bot

# Detener el bot
pm2 stop cpf-bot

# Ver logs históricos
pm2 logs cpf-bot --lines 100
```

### Gestión del Sistema

```bash
# Ver uso de recursos
htop

# Ver espacio en disco
df -h

# Ver uso de memoria
free -h

# Verificar estado de servicios
systemctl status

# Reiniciar la VM (si es necesario)
sudo reboot
```

## Configuración de Producción

### Variables de Entorno para Producción

```env
# ====================================
# PRODUCCIÓN
# ====================================

NODE_ENV=production

# Discord Configuration
DISCORD_TOKEN=your_production_token
DISCORD_CLIENT_ID=your_production_client_id

# Channels (IDs reales de producción)
LOG_CHANNEL_ID=987654321098765432
GREETING_CHANNEL_ID=123456789012345678

# Bot Presence
BOT_PRESENCE="🎓 CPF FIUNA | /help"

# Logging
LOG_LEVEL=info

# ====================================
# NO INCLUIR EN PRODUCCIÓN
# ====================================

# DISCORD_GUILD_ID (solo para dev)
```

### Optimizaciones de Producción

#### 1. package.json

```json
{
  "scripts": {
    "start": "NODE_ENV=production node src/index.js",
    "deploy": "node src/deploy-commands.js",
    "deploy-global": "node src/deploy-commands.js --global",
    "pm2:start": "pm2 start ecosystem.config.js",
    "pm2:restart": "pm2 restart cpf-discord-bot",
    "pm2:logs": "pm2 logs cpf-discord-bot",
    "pm2:monit": "pm2 monit"
  },
  "engines": {
    "node": ">=18.0.0",
    "npm": ">=8.0.0"
  }
}
```

#### 2. Optimizar Memoria

```javascript
// src/index.js - Agregar al inicio
if (process.env.NODE_ENV === 'production') {
    // Limitar uso de memoria
    if (process.env.MAX_MEMORY) {
        const maxMemory = parseInt(process.env.MAX_MEMORY);
        process.on('beforeExit', () => {
            const usage = process.memoryUsage();
            if (usage.heapUsed > maxMemory) {
                console.log('Memory limit exceeded, restarting...');
                process.exit(1);
            }
        });
    }
}
```

## Monitoreo y Logging

### Configuración de Logs

```javascript
// src/lib/logger.js
const fs = require('fs');
const path = require('path');

class Logger {
    constructor() {
        this.logDir = path.join(__dirname, '../../logs');
        if (!fs.existsSync(this.logDir)) {
            fs.mkdirSync(this.logDir, { recursive: true });
        }
    }

    log(level, message, metadata = {}) {
        const timestamp = new Date().toISOString();
        const logEntry = {
            timestamp,
            level,
            message,
            ...metadata
        };

        // Console output
        console.log(`[${timestamp}] ${level.toUpperCase()}: ${message}`);

        // File output
        const logFile = path.join(
            this.logDir,
            `${level}-${new Date().toISOString().split('T')[0]}.log`
        );
        fs.appendFileSync(logFile, JSON.stringify(logEntry) + '\n');
    }

    info(message, metadata) {
        this.log('info', message, metadata);
    }

    error(message, metadata) {
        this.log('error', message, metadata);
    }

    warn(message, metadata) {
        this.log('warn', message, metadata);
    }

    debug(message, metadata) {
        if (process.env.LOG_LEVEL === 'debug') {
            this.log('debug', message, metadata);
        }
    }
}

module.exports = new Logger();
```

### Monitoreo con PM2

```bash
# Ver métricas en tiempo real
pm2 monit

# Ver información de CPU/memoria
pm2 list

# Generar reporte
pm2 report
```

### Logs Rotation

```bash
# Instalar pm2-logrotate
pm2 install pm2-logrotate

# Configurar rotación
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7
pm2 set pm2-logrotate:compress true
```

### Alertas (Opcional)

Integración con servicios de monitoreo:

#### UptimeRobot

1. Crea una cuenta en [UptimeRobot](https://uptimerobot.com)
2. Agrega un monitor HTTP (si tienes endpoint de health)
3. Configura alertas por email/SMS

#### Discord Webhook para Alertas

```javascript
// src/lib/alerts.js
const axios = require('axios');

async function sendAlert(title, message, color = 0xFF0000) {
    const webhookUrl = process.env.ALERT_WEBHOOK_URL;
    if (!webhookUrl) return;

    try {
        await axios.post(webhookUrl, {
            embeds: [{
                title,
                description: message,
                color,
                timestamp: new Date().toISOString()
            }]
        });
    } catch (error) {
        console.error('Failed to send alert:', error);
    }
}

module.exports = { sendAlert };
```

## Actualizaciones y Mantenimiento

### Script de Actualización

Crea `scripts/update.sh`:

```bash
#!/bin/bash

echo "🔄 Actualizando CPF Discord Bot..."

# Navegar al directorio del bot
cd /opt/cpf-bot

# Hacer backup de .env
cp .env .env.backup

# Pull de cambios
git pull origin main

# Instalar/actualizar dependencias
npm ci --production

# Re-registrar comandos si es necesario
npm run deploy-global

# Reiniciar con PM2
pm2 restart cpf-discord-bot

echo "✅ Actualización completada!"

# Ver logs
pm2 logs cpf-discord-bot --lines 50
```

Hacer ejecutable:

```bash
chmod +x scripts/update.sh
```

### Actualización Manual

```bash
# 1. Detener bot
pm2 stop cpf-discord-bot

# 2. Hacer backup
cp -r /opt/cpf-bot /opt/cpf-bot-backup-$(date +%Y%m%d)

# 3. Actualizar código
cd /opt/cpf-bot
git pull origin main

# 4. Actualizar dependencias
npm ci --production

# 5. Re-registrar comandos (si hay cambios)
npm run deploy-global

# 6. Reiniciar
pm2 restart cpf-discord-bot

# 7. Verificar
pm2 logs cpf-discord-bot --lines 20
```

### Rollback en Caso de Error

```bash
# Detener bot actual
pm2 stop cpf-discord-bot

# Restaurar backup
rm -rf /opt/cpf-bot
cp -r /opt/cpf-bot-backup-YYYYMMDD /opt/cpf-bot

# Reiniciar
cd /opt/cpf-bot
pm2 restart cpf-discord-bot
```

## Troubleshooting

### Bot No Inicia

**Verificar logs:**
```bash
pm2 logs cpf-discord-bot --err
```

**Errores comunes:**
- Token inválido: Verifica `.env`
- Puerto en uso: Cambia el puerto en configuración
- Permisos: Verifica permisos de archivos

### Alto Uso de Memoria

```bash
# Ver uso de memoria
pm2 monit

# Reiniciar si excede límite
pm2 restart cpf-discord-bot
```

**Configurar límite:**
```javascript
// ecosystem.config.js
max_memory_restart: '500M'
```

### Bot Se Reinicia Constantemente

```bash
# Ver intentos de restart
pm2 info cpf-discord-bot

# Ver logs de errores
pm2 logs cpf-discord-bot --err --lines 100
```

**Solución:**
- Revisa logs para identificar el error
- Verifica que todas las variables de entorno estén configuradas
- Asegúrate de que el bot tenga los permisos necesarios en Discord

### Comandos No Se Actualizan

```bash
# Re-registrar comandos globalmente
npm run deploy-global

# Esperar ~1 hora para propagación
# Mientras tanto, prueba en un servidor específico:
DISCORD_GUILD_ID=tu_guild_id npm run deploy
```

### Error de Conexión a Discord

**Verificar:**
1. Conexión a Internet
2. Discord API status: https://discordstatus.com
3. Firewall/antivirus no esté bloqueando

```bash
# Test de conectividad
ping discord.com
curl -I https://discord.com/api/v10
```

## Checklist de Pre-Producción

Antes de desplegar en producción:

- [ ] Variables de entorno configuradas correctamente
- [ ] Token de producción generado y guardado de forma segura
- [ ] Comandos registrados globalmente
- [ ] PM2 configurado con auto-restart
- [ ] Logs configurados y funcionando
- [ ] Canal de logs creado y configurado
- [ ] Canal de bienvenidas creado y configurado
- [ ] Permisos del bot verificados en Discord
- [ ] Backup del código y configuración
- [ ] Monitoreo configurado (PM2, UptimeRobot, etc.)
- [ ] Documentación actualizada
- [ ] Plan de rollback definido

## Recursos Adicionales

- **PM2 Documentation**: [pm2.keymetrics.io/docs](https://pm2.keymetrics.io/docs)
- **Azure VM Guide**: [docs.microsoft.com/azure/virtual-machines](https://docs.microsoft.com/en-us/azure/virtual-machines/)
- **AWS EC2 Guide**: [docs.aws.amazon.com/ec2](https://docs.aws.amazon.com/ec2/)
- **Docker Documentation**: [docs.docker.com](https://docs.docker.com/)
- **Discord.js Guide**: [discordjs.guide](https://discordjs.guide/)

---

¿Problemas con el despliegue? Abre un issue en GitHub o contacta al equipo del CPF FIUNA.

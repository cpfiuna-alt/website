---
title: "Guía de Despliegue"
description: "Despliegue del bot de Discord CPF en diferentes entornos"
chapter: "Despliegue"
section: "Guía de Despliegue"
order: 1
status: "active"
---

## Despliegue en VM de Azure (Guía práctica)

### Supuestos
- La VM es Linux (Ubuntu 22.04+ recomendado). Adaptá los pasos a tu distribución si es necesario.
- La VM ya tiene una cuenta con acceso SSH, git y permisos para instalar paquetes.
- Usamos `pm2` para mantener el proceso en ejecución y habilitar arranque automático.

### 1) Conexión a la VM
```powershell
ssh usuario@IP_VM
```

### 2) Preparar la VM (Node.js 18+ y utilidades)
```bash
sudo apt update; sudo apt upgrade -y
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs git build-essential
node -v; npm -v
```

### 3) Clonar el repo y configurar directorio de la app
```bash
cd /opt
sudo mkdir cpf-bot && sudo chown $(whoami) cpf-bot
cd cpf-bot
git clone <REPO_URL> .
npm ci --production
```

### 4) Configurar variables de entorno
Crear el archivo `.env` con al menos:
```text
DISCORD_TOKEN=your_bot_token
DISCORD_CLIENT_ID=your_client_id
# Opcional para progresar rapido en desarrollo
DISCORD_GUILD_ID=your_dev_guild_id
LOG_CHANNEL_ID=optional_channel_id
GREETING_CHANNEL_ID=optional_greeting_channel
BOT_PRESENCE="En línea — usa /"
```

Consejo de seguridad: usar Azure KeyVault o algún mecanismo de secretos para producción en lugar de dejar `.env` en disco plano.

### 5) Registrar comandos slash (opcional/mantenimiento)
Para registrar los comandos en un servidor de prueba o actualizar su esquema, ejecutá en la VM:
```bash
npm run deploy
```

> Nota: Si no proveés `DISCORD_GUILD_ID`, los comandos se registrarán de forma global y puede tardar hasta 1 hora en reflejarse.

### 6) Instalar y usar `pm2` para gestión del proceso
```bash
sudo npm install -g pm2
# Iniciar con npm (usa script `start` del package.json)
pm2 start --name cpf-bot --interpreter node -- node ./src/index.js
pm2 save
pm2 startup systemd -u $(whoami) --hp $(eval echo ~$USER)
# Ejecutar el comando que pm2 muestra (usar sudo si lo requiere)
```

Ejemplo de `ecosystem.config.js` (opcional):
```javascript
module.exports = {
  apps: [{
    name: 'cpf-bot',
    script: './src/index.js',
    instances: 1,
    exec_mode: 'fork',
    env: { NODE_ENV: 'production' },
    watch: false,
    max_memory_restart: '500M'
  }]
};

Si usás el `ecosystem.config.js` del repo, iniciá con:
```bash
pm2 start ecosystem.config.js --env production
```
```

Comandos útiles de `pm2`:
- `pm2 status` — Ver estado
- `pm2 logs cpf-bot` — Ver logs en vivo
- `pm2 restart cpf-bot` — Reiniciar
- `pm2 stop cpf-bot` — Detener
- `pm2 delete cpf-bot` — Eliminar el proceso

### 7) Actualizar la aplicación en la VM (01) — procedimiento seguro
1. Hacer `git pull` y verificar cambios en main.
2. Instalar dependencias o reconstruir `npm ci`.
3. Registrar comandos si se modificaron (/registrar). (opcional)
4. Reiniciar con pm2.

```bash
cd /opt/cpf-bot
git pull --ff-only origin main
npm ci --production
npm run deploy # solo si se actualizaron comandos
pm2 restart cpf-bot
```

#### Uso rápido desde `scripts/deploy.sh`
Si el repositorio contiene `scripts/deploy.sh`, podés usarlo (adaptar permisos) para realizar el proceso de actualización y reinicio:
```bash
chmod +x scripts/deploy.sh
REGISTER_COMMANDS=1 ./scripts/deploy.sh main
```

### 8) Strategias de rollback/prevención
- Mantener tags/versions en el repo y el flujo de CI: `git tag -a vX.Y.Z -m "release vX.Y.Z"`.
- Antes de reiniciar, verificar logs (`pm2 logs cpf-bot --lines 200`) y los cambios.
- Para rollback rápido, `git checkout <old-commit-or-tag> && npm ci --production && pm2 restart cpf-bot`.

### 9) Troubleshooting rápido
- Si `pm2` no inicia: ver `pm2 logs cpf-bot` y `journalctl -u pm2-<user>` o `systemctl status pm2-$(whoami)` si instalaste startup.
- Si el bot no responde: comprobar `DISCORD_TOKEN`, verificar que el bot está invitado al servidor con permisos correctos.
- Si `npm run deploy` falla: verificar `DISCORD_CLIENT_ID` y permiso de aplicación en portal de Discord.


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

### Backup y Recuperación (opcional)

Si usás una base de datos (por ejemplo MongoDB), considerá backups regulares. El siguiente script es un ejemplo que hace backup de archivos y (opcionalmente) de una base de datos MongoDB.

```bash
#!/bin/bash
# backup.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/home/cpfbot/backups"

# Crear directorio de backup
mkdir -p $BACKUP_DIR

# Backup de archivos de configuración
tar -czf $BACKUP_DIR/config_$DATE.tar.gz .env ecosystem.config.js

# Backup de logs
tar -czf $BACKUP_DIR/logs_$DATE.tar.gz logs/

# (Opcional) Backup de la base de datos si usás MongoDB
if command -v mongodump >/dev/null 2>&1; then
  # Ajustá DB_NAME y MONGODB_URI si aplica
  DB_NAME="cpf-discord-bot"
  mongodump --db "$DB_NAME" --out "$BACKUP_DIR/db_$DATE" || true
fi

# Eliminar backups antiguos (más de 7 días)
find $BACKUP_DIR -name "*.tar.gz" -mtime +7 -delete
find $BACKUP_DIR -name "db_*" -mtime +7 -exec rm -rf {} \;

echo "Backup completado: $DATE"
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

#### Base de datos no conecta (si usas una base de datos)
```
# Verificar estado de MongoDB (si aplica)
sudo systemctl status mongodb

# Verificar conexión (ajustar según el cliente y DB usada)
mongo $MONGODB_URI --eval "db.runCommand('ping')" || true

# Ver logs de MongoDB
sudo tail -f /var/log/mongodb/mongod.log || true
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

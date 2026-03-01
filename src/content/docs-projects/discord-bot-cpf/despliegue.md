---
title: "Despliegue"
description: "Configuracion de produccion con PM2 en Azure VM"
order: 3
---

# Despliegue en Produccion

El bot esta desplegado en una maquina virtual de Azure usando PM2 como gestor de procesos.

---

## 1. Requisitos del Servidor

### 1.1 Hardware Minimo
- 1 vCPU
- 512 MB RAM
- 10 GB almacenamiento

### 1.2 Software
- Ubuntu 20.04+ o Windows Server
- Node.js 18+ LTS
- PM2 (gestor de procesos)
- Git

---

## 2. Instalacion de PM2

```bash
# Instalar PM2 globalmente
npm install -g pm2

# Verificar instalacion
pm2 --version
```

---

## 3. Configuracion del Bot

### 3.1 Clonar el Repositorio

```bash
# Clonar
git clone https://github.com/cpfiuna/discord-bot.git
cd discord-bot

# Instalar dependencias de produccion
npm install --production
```

### 3.2 Variables de Entorno

Crear archivo `.env` en la raiz del proyecto:

```env
# Obligatorio
DISCORD_TOKEN=tu_token_de_produccion
DISCORD_CLIENT_ID=tu_client_id

# Opcional
LOG_CHANNEL_ID=id_del_canal_de_logs
GREETING_CHANNEL_ID=id_del_canal_de_bienvenidas
BOT_PRESENCE="Usa /help para ver comandos"
```

---

## 4. Iniciar con PM2

### 4.1 Comando Basico

```bash
# Iniciar el bot
pm2 start src/index.js --name "discord-bot"

# Ver estado
pm2 status
```

### 4.2 Configuracion Avanzada

Crear archivo `ecosystem.config.js`:

```javascript
module.exports = {
  apps: [{
    name: 'discord-bot',
    script: 'src/index.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '200M',
    env: {
      NODE_ENV: 'production'
    }
  }]
};
```

Iniciar con archivo de configuracion:

```bash
pm2 start ecosystem.config.js
```

---

## 5. Comandos Utiles de PM2

### 5.1 Gestion del Proceso

```bash
# Ver logs en tiempo real
pm2 logs discord-bot

# Reiniciar el bot
pm2 restart discord-bot

# Detener el bot
pm2 stop discord-bot

# Eliminar de PM2
pm2 delete discord-bot
```

### 5.2 Monitoreo

```bash
# Panel de monitoreo
pm2 monit

# Ver metricas
pm2 info discord-bot

# Ver uso de recursos
pm2 status
```

### 5.3 Persistencia

```bash
# Guardar lista de procesos actual
pm2 save

# Configurar inicio automatico al reiniciar el servidor
pm2 startup
# Ejecutar el comando que muestra

# Verificar que se guardaron
pm2 list
```

---


## 6. Despliegue en Azure VM

### 6.1 Crear la Maquina Virtual

En el portal de Azure:
1. Crear recurso > Maquina Virtual
2. Seleccionar Ubuntu 22.04 LTS
3. Tamano B1s (1 vCPU, 1 GB RAM) es suficiente
4. Configurar SSH o contrasena
5. Abrir puerto 22 (SSH)

### 6.2 Conectarse por SSH

```bash
ssh usuario@tu-ip-de-azure
```

### 6.3 Instalar Dependencias

```bash
# Actualizar sistema
sudo apt update && sudo apt upgrade -y

# Instalar Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Verificar
node --version
npm --version

# Instalar PM2
sudo npm install -g pm2
```

### 6.4 Configurar el Bot

```bash
# Clonar repositorio
git clone https://github.com/cpfiuna/discord-bot.git
cd discord-bot

# Instalar dependencias
npm install --production

# Crear archivo de entorno
nano .env
# Agregar variables de entorno
```
# Registrar comandos
npm run deploy

# Iniciar con PM2
pm2 start src/index.js --name "discord-bot"

# Guardar y configurar inicio automatico
pm2 save
pm2 startup
```

---


## 7. Actualizaciones

### 7.1 Actualizar el Bot

```bash
cd discord-bot

# Detener el bot
pm2 stop discord-bot

# Obtener cambios
git pull origin main

# Instalar nuevas dependencias
npm install --production

# Si hay nuevos comandos
npm run deploy

# Reiniciar
pm2 restart discord-bot
```

### 7.2 Script de Actualizacion

Crear archivo `update.sh`:

```bash
#!/bin/bash
cd /ruta/a/discord-bot
pm2 stop discord-bot
git pull origin main
npm install --production
pm2 restart discord-bot
echo "Bot actualizado correctamente"
```

Dar permisos de ejecucion:

```bash
chmod +x update.sh
```

---


## 8. Respaldo

### 8.1 Archivos Importantes

- `.env` - Variables de entorno
- `assets/uploads/` - Archivos subidos
- Logs de PM2: `~/.pm2/logs/`

### 8.2 Crear Respaldo

```bash
# Crear directorio de respaldo
mkdir -p ~/backups

# Respaldar archivos importantes
tar -czf ~/backups/discord-bot-backup.tar.gz \
  discord-bot/.env \
  discord-bot/assets/uploads/
```

---


## 9. Solucion de Problemas

### 9.1 El bot no inicia

```bash
# Ver logs de error
pm2 logs discord-bot --err --lines 50

# Verificar variables de entorno
cat .env

# Verificar permisos del token
# Ir a Discord Developer Portal y regenerar si es necesario
```

### 9.2 El bot se reinicia constantemente

```bash
# Ver patron de reinicios
pm2 show discord-bot

# Aumentar memoria si es necesario
pm2 delete discord-bot
pm2 start src/index.js --name "discord-bot" --max-memory-restart 300M
```

### 9.3 Comandos no aparecen

```bash
# Reregistrar comandos
npm run deploy

# Verificar DISCORD_CLIENT_ID en .env
```

---

## 10. Seguridad

### 10.1 Buenas Practicas

1. **Nunca compartir el token** - Si se filtra, regenerarlo inmediatamente
2. **Usar variables de entorno** - No hardcodear credenciales
3. **Mantener actualizado** - Node.js, PM2 y dependencias
4. **Limitar permisos** - El bot solo necesita los permisos que usa

### 10.2 Firewall en Azure

Solo mantener abierto el puerto 22 para SSH. El bot no necesita puertos adicionales ya que se conecta a Discord por WebSocket saliente.
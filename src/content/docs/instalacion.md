
---
title: "Instalación"
description: "Guía de instalación para proyectos del Club de Programación FIUNA"
category: "Guías"
order: 3
---

# Guía de Instalación

Esta guía te ayudará a configurar tu entorno de desarrollo para trabajar con los proyectos del Club de Programación FIUNA. Cubriremos la instalación de las herramientas necesarias y la configuración de los proyectos principales.

## Requisitos previos

Antes de comenzar, asegúrate de tener instalado:

- **Git**: Sistema de control de versiones
- **Node.js**: Versión LTS (16.x o superior)
- **Python**: Versión 3.8 o superior
- **Java**: JDK 11 o superior (para algunos proyectos específicos)

## Instalación de herramientas básicas

### Git

Git es esencial para colaborar en nuestros proyectos.

**Windows**:
1. Descarga el instalador desde [git-scm.com](https://git-scm.com/)
2. Ejecuta el instalador con las opciones predeterminadas
3. Verifica la instalación con `git --version`

**macOS**:
```bash
# Usando Homebrew
brew install git

# Verifica la instalación
git --version
```

**Linux (Ubuntu/Debian)**:
```bash
sudo apt update
sudo apt install git

# Verifica la instalación
git --version
```

### Node.js

Necesario para proyectos frontend y algunos proyectos backend.

**Windows**:
1. Descarga el instalador LTS desde [nodejs.org](https://nodejs.org/)
2. Ejecuta el instalador con las opciones predeterminadas
3. Verifica la instalación con `node --version` y `npm --version`

**macOS**:
```bash
# Usando Homebrew
brew install node

# Verifica la instalación
node --version
npm --version
```

**Linux (Ubuntu/Debian)**:
```bash
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verifica la instalación
node --version
npm --version
```

### Python

Utilizado para varios proyectos, especialmente los relacionados con algoritmos y ciencia de datos.

**Windows**:
1. Descarga el instalador desde [python.org](https://www.python.org/downloads/)
2. Ejecuta el instalador, activando la opción "Add Python to PATH"
3. Verifica la instalación con `python --version`

**macOS**:
```bash
# Usando Homebrew
brew install python

# Verifica la instalación
python3 --version
```

**Linux (Ubuntu/Debian)**:
```bash
sudo apt update
sudo apt install python3 python3-pip

# Verifica la instalación
python3 --version
pip3 --version
```

## Configuración de proyectos específicos

### Sitio web del Club

Nuestro sitio web está construido con React, TypeScript y Tailwind CSS.

```bash
# Clona el repositorio
git clone https://github.com/cpfiuna/cpf-website.git
cd cpf-website

# Instala las dependencias
npm install

# Inicia el servidor de desarrollo
npm run dev
```

El sitio estará disponible en `http://localhost:5173`.

### Bot de Discord

Nuestro bot de Discord está construido con Node.js y Discord.js.

```bash
# Clona el repositorio
git clone https://github.com/cpfiuna/cpf-discord-bot.git
cd cpf-discord-bot

# Instala las dependencias
npm install

# Configura las variables de entorno
cp .env.example .env
# Edita el archivo .env con tu editor preferido

# Inicia el bot en modo desarrollo
npm run dev
```

### Plataforma de competencias

Nuestra plataforma de competencias utiliza Django en el backend y React en el frontend.

**Backend**:
```bash
# Clona el repositorio
git clone https://github.com/cpfiuna/cpf-competitions-api.git
cd cpf-competitions-api

# Crea un entorno virtual
python -m venv venv

# Activa el entorno virtual
# En Windows:
venv\Scripts\activate
# En macOS/Linux:
source venv/bin/activate

# Instala las dependencias
pip install -r requirements.txt

# Configura la base de datos
python manage.py migrate

# Inicia el servidor
python manage.py runserver
```

El API estará disponible en `http://localhost:8000`.

**Frontend**:
```bash
# Clona el repositorio
git clone https://github.com/cpfiuna/cpf-competitions-frontend.git
cd cpf-competitions-frontend

# Instala las dependencias
npm install

# Inicia el servidor de desarrollo
npm run dev
```

El frontend estará disponible en `http://localhost:5173`.

## Docker (Alternativa)

Para facilitar la configuración del entorno, muchos de nuestros proyectos incluyen archivos Docker que permiten ejecutar todo en contenedores.

**Requisitos**:
- Docker
- Docker Compose

**Ejemplo de uso**:
```bash
# Clona el repositorio
git clone https://github.com/cpfiuna/nombre-del-proyecto.git
cd nombre-del-proyecto

# Inicia los contenedores
docker-compose up -d

# Detener los contenedores
docker-compose down
```

## Solución de problemas comunes

### Problemas con permisos en npm (Linux/macOS)

Si encuentras errores de permisos al instalar paquetes globales con npm:

```bash
# Opción 1: Cambiar la ubicación del directorio de npm
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.profile
source ~/.profile

# Opción 2: Usar NVM (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
# Cierra y vuelve a abrir la terminal
nvm install --lts
```

### Problemas con Python en Windows

Si tienes problemas al ejecutar scripts de Python en Windows:

1. Asegúrate de que Python está en tu PATH
2. Si tienes múltiples versiones de Python, usa `py` en lugar de `python`
3. Utiliza `python -m pip install` en lugar de `pip install`

## Siguientes pasos

Una vez que hayas configurado tu entorno, te recomendamos:

1. **Revisar la documentación específica** de cada proyecto
2. **Unirte a nuestro servidor de Discord** para obtener ayuda
3. **Explorar los issues** en GitHub para encontrar tareas en las que puedas contribuir

¡Feliz codificación!

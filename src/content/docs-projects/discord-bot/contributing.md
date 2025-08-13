---
title: "Guía de Contribución"
description: "Cómo contribuir al desarrollo del bot de Discord CPF"
chapter: "Desarrollo"
section: "Guía de Contribución"
order: 1
---

# Contribuir al Discord Bot

## Cómo Contribuir

¡Gracias por tu interés en contribuir al CPF Discord Bot! Este documento te guiará através del proceso de contribución.

## Configuración del Entorno de Desarrollo

### Prerrequisitos

- Node.js 18.x o superior
- npm 8.x o superior
- Git
- MongoDB (local o conexión remota)
- Cuenta de Discord Developer

### Configuración Inicial

1. **Fork del repositorio**
   ```bash
   # Hacer fork en GitHub, luego clonar tu fork
   git clone https://github.com/tu-usuario/discord-bot.git
   cd discord-bot
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp .env.example .env
   # Editar .env con tus valores de desarrollo
   ```

4. **Configurar bot de desarrollo**
   - Crear nueva aplicación en [Discord Developer Portal](https://discord.com/developers/applications)
   - Crear bot y copiar token
   - Invitar bot a servidor de pruebas con permisos necesarios

5. **Inicializar base de datos**
   ```bash
   npm run db:setup
   npm run db:seed  # Datos de prueba
   ```

6. **Ejecutar en modo desarrollo**
   ```bash
   npm run dev
   ```

## Estructura del Proyecto

```
discord-bot/
├── src/
│   ├── commands/           # Comandos del bot
│   │   ├── general/       # Comandos generales
│   │   ├── moderation/    # Comandos de moderación
│   │   ├── events/        # Comandos de eventos
│   │   └── utils/         # Comandos de utilidades
│   ├── events/            # Event handlers
│   ├── models/            # Modelos de base de datos
│   ├── services/          # Servicios y lógica de negocio
│   ├── utils/             # Utilidades y helpers
│   └── config/            # Configuración
├── tests/                 # Tests unitarios y de integración
├── docs/                  # Documentación adicional
└── scripts/               # Scripts de utilidad
```

## Convenciones de Código

### Estilo de Código

Usamos ESLint y Prettier para mantener consistencia:

```bash
# Verificar estilo
npm run lint

# Corregir automáticamente
npm run lint:fix

# Formatear código
npm run format
```

### Naming Conventions

- **Archivos**: kebab-case (`user-service.js`)
- **Clases**: PascalCase (`UserService`)
- **Funciones y variables**: camelCase (`getUserData`)
- **Constantes**: UPPER_SNAKE_CASE (`MAX_RETRIES`)
- **Comandos**: kebab-case (`user-info`)

### Comentarios y Documentación

```javascript
/**
 * Obtiene información de un usuario
 * @param {string} userId - ID del usuario de Discord
 * @param {boolean} includeStats - Si incluir estadísticas
 * @returns {Promise<Object>} Información del usuario
 */
async function getUserInfo(userId, includeStats = false) {
  // Implementación
}
```

## Desarrollo de Nuevas Funcionalidades

### Crear un Nuevo Comando

1. **Crear archivo del comando**
   ```javascript
   // src/commands/general/ejemplo.js
   const { SlashCommandBuilder } = require('discord.js');

   module.exports = {
     data: new SlashCommandBuilder()
       .setName('ejemplo')
       .setDescription('Comando de ejemplo')
       .addStringOption(option =>
         option.setName('texto')
           .setDescription('Texto de ejemplo')
           .setRequired(true)
       ),
     
     async execute(interaction) {
       const texto = interaction.options.getString('texto');
       await interaction.reply(`¡Hola! Tu texto: ${texto}`);
     },
     
     // Opcional: permisos requeridos
     permissions: ['SendMessages'],
     
     // Opcional: cooldown en segundos
     cooldown: 5
   };
   ```

2. **Registrar el comando**
   Los comandos se registran automáticamente al cargar desde el directorio `commands/`.

3. **Añadir tests**
   ```javascript
   // tests/commands/ejemplo.test.js
   const { expect } = require('chai');
   const ejemploCommand = require('../../src/commands/general/ejemplo');

   describe('Comando Ejemplo', () => {
     it('debe responder correctamente', async () => {
       // Test implementation
     });
   });
   ```

### Crear un Event Handler

```javascript
// src/events/nuevo-evento.js
module.exports = {
  name: 'messageCreate',
  once: false, // true si es un evento que se ejecuta una sola vez
  
  async execute(message) {
    // Lógica del evento
    if (message.author.bot) return;
    
    // Procesar mensaje
  }
};
```

### Trabajar con la Base de Datos

#### Crear un Nuevo Modelo

```javascript
// src/models/Ejemplo.js
const mongoose = require('mongoose');

const ejemploSchema = new mongoose.Schema({
  discordId: {
    type: String,
    required: true,
    unique: true
  },
  datos: {
    type: Object,
    default: {}
  },
  fechaCreacion: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Ejemplo', ejemploSchema);
```

#### Usar el Modelo

```javascript
const Ejemplo = require('../models/Ejemplo');

// Crear
const nuevoEjemplo = new Ejemplo({
  discordId: '123456789',
  datos: { nombre: 'Test' }
});
await nuevoEjemplo.save();

// Buscar
const ejemplo = await Ejemplo.findOne({ discordId: '123456789' });

// Actualizar
await Ejemplo.updateOne(
  { discordId: '123456789' },
  { $set: { datos: { nombre: 'Actualizado' } } }
);
```

## Testing

### Ejecutar Tests

```bash
# Todos los tests
npm test

# Tests específicos
npm test -- --grep "Comando Ejemplo"

# Tests con coverage
npm run test:coverage

# Tests en modo watch
npm run test:watch
```

### Escribir Tests

#### Test de Comando

```javascript
const { expect } = require('chai');
const sinon = require('sinon');
const command = require('../../src/commands/general/ping');

describe('Comando Ping', () => {
  let interaction;

  beforeEach(() => {
    interaction = {
      reply: sinon.stub(),
      options: {
        getString: sinon.stub(),
        getUser: sinon.stub()
      }
    };
  });

  it('debe responder con pong', async () => {
    await command.execute(interaction);
    
    expect(interaction.reply.calledOnce).to.be.true;
    expect(interaction.reply.firstCall.args[0]).to.include('Pong!');
  });
});
```

#### Test de Servicio

```javascript
const { expect } = require('chai');
const UserService = require('../../src/services/user-service');

describe('UserService', () => {
  describe('getUserLevel', () => {
    it('debe calcular el nivel correctamente', () => {
      const level = UserService.getUserLevel(1000);
      expect(level).to.equal(5);
    });
  });
});
```

## Proceso de Contribución

### 1. Preparación

- Asegúrate de que tu fork esté actualizado
- Crea una rama para tu feature/fix
- Escribe tests para tu código

```bash
# Actualizar fork
git checkout main
git pull upstream main
git push origin main

# Crear rama
git checkout -b feature/nueva-funcionalidad
```

### 2. Desarrollo

- Sigue las convenciones de código
- Escribe commits descriptivos
- Mantén los cambios enfocados

```bash
# Commits claros y descriptivos
git commit -m "feat: añadir comando de información de usuario

- Implementa comando /user-info
- Incluye estadísticas de actividad
- Añade tests unitarios"
```

### 3. Testing

```bash
# Ejecutar todos los tests
npm test

# Verificar linting
npm run lint

# Verificar funcionamiento con bot real
npm run dev
```

### 4. Pull Request

1. **Push a tu fork**
   ```bash
   git push origin feature/nueva-funcionalidad
   ```

2. **Crear Pull Request en GitHub**
   - Título descriptivo
   - Descripción detallada de los cambios
   - Mencionar issues relacionados
   - Incluir screenshots si es relevante

3. **Template de PR**
   ```markdown
   ## Descripción
   Breve descripción de los cambios realizados.

   ## Tipo de cambio
   - [ ] Bug fix
   - [ ] Nueva funcionalidad
   - [ ] Breaking change
   - [ ] Documentación

   ## Checklist
   - [ ] Los tests pasan
   - [ ] El código sigue las convenciones de estilo
   - [ ] Se añadieron tests para las nuevas funcionalidades
   - [ ] Se actualizó la documentación si es necesario

   ## Testing
   Describe cómo testear los cambios.

   ## Screenshots
   Si aplica, añadir screenshots.
   ```

## Tipos de Contribuciones

### 🐛 Bug Fixes

- Reportar bugs usando GitHub Issues
- Incluir steps to reproduce
- Proporcionar información del entorno
- Crear tests que reproduzcan el bug

### ✨ Nuevas Features

- Discutir la feature en GitHub Issues primero
- Seguir el proceso de desarrollo
- Documentar la nueva funcionalidad
- Añadir tests comprehensivos

### 📚 Documentación

- Mejorar README y documentación
- Añadir ejemplos de uso
- Corregir typos y errores
- Traducir documentación

### 🎨 Mejoras de UI/UX

- Mejorar embeds y mensajes
- Optimizar flujos de usuario
- Añadir reacciones y interacciones
- Mejorar accesibilidad

## Guidelines

### Commits

Usamos [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Tipos:**
- `feat`: Nueva funcionalidad
- `fix`: Bug fix
- `docs`: Cambios en documentación
- `style`: Cambios de formato, no código
- `refactor`: Refactoring de código
- `test`: Añadir o modificar tests
- `chore`: Mantenimiento

**Ejemplos:**
```
feat(commands): añadir comando de estadísticas de usuario
fix(events): corregir error en event handler de mensajes
docs: actualizar guía de contribución
```

### Issues

Al reportar bugs, incluir:

- **Descripción clara** del problema
- **Steps to reproduce** 
- **Comportamiento esperado**
- **Comportamiento actual**
- **Información del entorno** (OS, Node.js version)
- **Logs relevantes**

### Code Review

- Sé respetuoso y constructivo
- Explica el "por qué" en tus comentarios
- Sugiere alternativas cuando sea posible
- Aprende de los comentarios recibidos

## Recursos Adicionales

### Documentation

- [Discord.js Guide](https://discordjs.guide/)
- [Discord API Documentation](https://discord.com/developers/docs)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)

### Tools

- [Discord Developer Portal](https://discord.com/developers/applications)
- [Bot Testing Server](https://discord.gg/cpf-dev) (solicitar acceso)
- [MongoDB Compass](https://www.mongodb.com/products/compass) para BD

### Community

- **Discord**: [Servidor del CPF](https://discord.gg/cpf-fiuna)
- **Telegram**: [Grupo de desarrollo](https://t.me/cpf_dev)
- **GitHub**: [Discusiones del proyecto](https://github.com/cpf-fiuna/discord-bot/discussions)

## Reconocimientos

### Hall of Fame

Contribuidores destacados:

- **Iván Jara** - Arquitectura inicial y comandos de moderación
- **Oscar Alderete** - Sistema de eventos y integraciones
- **David Giménez** - Sistema de deployment y documentación

### Cómo ser Reconocido

- Mantener contribuciones consistentes
- Ayudar a otros contribuidores
- Mejorar la documentación
- Reportar y corregir bugs importantes
- Proponer mejoras arquitecturales

¡Gracias por contribuir al CPF Discord Bot! 🚀

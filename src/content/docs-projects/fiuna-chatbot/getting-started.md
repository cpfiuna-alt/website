# Configuración del Proyecto FIUNA Chatbot

## Introducción

El FIUNA AI Chatbot es un asistente virtual inteligente diseñado para ayudar a estudiantes, profesores y visitantes de la FIUNA con información académica, procedimientos administrativos y consultas generales sobre la facultad.

## Prerrequisitos

### Requisitos del Sistema

- **Python 3.9+** (recomendado 3.11)
- **pip** o **poetry** para gestión de paquetes
- **Git** para control de versiones
- **OpenAI API Key** para funcionalidades de IA
- **4GB+ RAM** para ejecutar modelos locales (opcional)

### Cuentas y APIs Necesarias

1. **OpenAI API**: Para el motor principal de IA
2. **Pinecone** (opcional): Para búsqueda vectorial
3. **Firebase** (opcional): Para analytics y logging
4. **Telegram Bot API** (opcional): Para integración con Telegram

## Instalación

### 1. Clonar el Repositorio

```bash
git clone https://github.com/cpf-fiuna/fiuna-chatbot.git
cd fiuna-chatbot
```

### 2. Configurar Entorno Virtual

#### Con venv:
```bash
python -m venv venv

# En Windows:
venv\Scripts\activate

# En Linux/Mac:
source venv/bin/activate
```

#### Con poetry (recomendado):
```bash
# Instalar poetry si no lo tienes
curl -sSL https://install.python-poetry.org | python3 -

# Instalar dependencias
poetry install
poetry shell
```

### 3. Instalar Dependencias

```bash
# Con pip
pip install -r requirements.txt

# Con poetry
poetry install
```

### 4. Configurar Variables de Entorno

Copiar archivo de configuración:
```bash
cp .env.example .env
```

Editar `.env` con tus credenciales:
```env
# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-3.5-turbo

# Application Settings
APP_NAME="FIUNA AI Chatbot"
DEBUG=True
LOG_LEVEL=INFO

# Database (opcional para desarrollo)
DATABASE_URL=sqlite:///./chatbot.db

# Vector Database (opcional)
PINECONE_API_KEY=your_pinecone_key
PINECONE_ENVIRONMENT=us-west1-gcp-free

# External APIs
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
DISCORD_WEBHOOK_URL=your_discord_webhook

# Security
SECRET_KEY=your-secret-key-here
ALLOWED_HOSTS=localhost,127.0.0.1

# Rate Limiting
RATE_LIMIT_PER_MINUTE=10
RATE_LIMIT_PER_HOUR=100
```

### 5. Configurar Base de Datos

```bash
# Inicializar base de datos
python manage.py init-db

# Cargar datos de muestra
python manage.py seed-data

# Crear índices vectoriales (si usas Pinecone)
python manage.py create-embeddings
```

## Configuración del Entorno de Desarrollo

### 1. Estructura del Proyecto

```
fiuna-chatbot/
├── src/
│   ├── chatbot/
│   │   ├── core/           # Lógica principal del chatbot
│   │   ├── models/         # Modelos de datos
│   │   ├── handlers/       # Handlers para diferentes plataformas
│   │   ├── knowledge/      # Base de conocimiento
│   │   └── utils/          # Utilidades
│   ├── api/                # API REST
│   ├── web/                # Interfaz web (opcional)
│   └── tests/              # Tests
├── data/
│   ├── knowledge_base/     # Archivos de conocimiento
│   ├── training/           # Datos de entrenamiento
│   └── models/             # Modelos guardados
├── config/                 # Archivos de configuración
└── scripts/                # Scripts de utilidad
```

### 2. Configurar IDE

#### VS Code (recomendado)

Instalar extensiones:
```bash
# Python extension pack
code --install-extension ms-python.python
code --install-extension ms-python.pylint
code --install-extension ms-python.black-formatter

# Otras útiles
code --install-extension ms-python.isort
code --install-extension charliermarsh.ruff
```

Configuración en `.vscode/settings.json`:
```json
{
  "python.defaultInterpreterPath": "./venv/bin/python",
  "python.linting.enabled": true,
  "python.linting.pylintEnabled": true,
  "python.formatting.provider": "black",
  "python.sortImports.args": ["--profile", "black"],
  "editor.formatOnSave": true,
  "python.testing.pytestEnabled": true,
  "python.testing.pytestArgs": ["tests/"]
}
```

### 3. Configurar Pre-commit Hooks

```bash
# Instalar pre-commit
pip install pre-commit

# Configurar hooks
pre-commit install
```

Crear `.pre-commit-config.yaml`:
```yaml
repos:
  - repo: https://github.com/psf/black
    rev: 23.1.0
    hooks:
      - id: black
        language_version: python3

  - repo: https://github.com/pycqa/isort
    rev: 5.12.0
    hooks:
      - id: isort
        args: ["--profile", "black"]

  - repo: https://github.com/pycqa/flake8
    rev: 6.0.0
    hooks:
      - id: flake8

  - repo: https://github.com/pre-commit/mirrors-mypy
    rev: v1.0.1
    hooks:
      - id: mypy
```

## Ejecución del Proyecto

### 1. Modo Desarrollo

```bash
# Activar entorno virtual
source venv/bin/activate  # o poetry shell

# Ejecutar en modo desarrollo
python -m src.main --dev

# O usar el script de desarrollo
./scripts/dev.sh
```

### 2. Modo Producción

```bash
# Usando gunicorn
gunicorn src.api.app:app --bind 0.0.0.0:8000 --workers 4

# O usando uvicorn (para FastAPI)
uvicorn src.api.app:app --host 0.0.0.0 --port 8000 --workers 4
```

### 3. Usando Docker

```bash
# Construir imagen
docker build -t fiuna-chatbot .

# Ejecutar contenedor
docker run -p 8000:8000 --env-file .env fiuna-chatbot

# O usar docker-compose
docker-compose up -d
```

## Configuración de la Base de Conocimiento

### 1. Estructura de Conocimiento

Crear archivos en `data/knowledge_base/`:

```
knowledge_base/
├── academico/
│   ├── carreras.md
│   ├── materias.md
│   ├── horarios.md
│   └── requisitos.md
├── administrativo/
│   ├── tramites.md
│   ├── procedimientos.md
│   └── contactos.md
├── general/
│   ├── ubicacion.md
│   ├── historia.md
│   └── noticias.md
└── faq/
    ├── estudiantes.md
    ├── profesores.md
    └── visitantes.md
```

### 2. Formato de Contenido

Ejemplo de `carreras.md`:
```markdown
---
title: "Carreras de Grado"
category: "academico"
tags: ["carreras", "grado", "ingenieria"]
last_updated: "2025-01-15"
---

# Carreras de Grado en FIUNA

## Ingeniería en Informática

**Duración**: 5 años
**Título**: Ingeniero en Informática

### Plan de Estudios
- Primer año: Matemática I, Física I, Programación I...
- Segundo año: Matemática II, Estructuras de Datos...

### Perfil del Egresado
El egresado será capaz de...

## Ingeniería Civil

**Duración**: 5 años
**Título**: Ingeniero Civil

### Áreas de Especialización
- Estructuras
- Geotecnia
- Hidráulica
```

### 3. Procesar Conocimiento

```bash
# Procesar archivos markdown y crear embeddings
python scripts/process_knowledge.py

# Actualizar índice de búsqueda
python scripts/update_index.py

# Validar conocimiento
python scripts/validate_knowledge.py
```

## Testing

### 1. Ejecutar Tests

```bash
# Todos los tests
pytest

# Tests específicos
pytest tests/test_chatbot.py

# Tests con coverage
pytest --cov=src tests/

# Tests de integración
pytest tests/integration/
```

### 2. Tests Manuales

```bash
# Probar chatbot en consola
python -m src.chatbot.cli

# Probar API
curl -X POST http://localhost:8000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "¿Qué carreras tiene la FIUNA?"}'
```

## Integración con Plataformas

### 1. Telegram Bot

```bash
# Configurar webhook
python scripts/setup_telegram.py

# Ejecutar bot
python -m src.handlers.telegram_handler
```

### 2. Discord Bot

```bash
# Registrar comandos slash
python scripts/register_discord_commands.py

# Ejecutar bot
python -m src.handlers.discord_handler
```

### 3. Web Interface

```bash
# Ejecutar interfaz web
python -m src.web.app

# Acceder en http://localhost:5000
```

## Monitoreo y Logging

### 1. Configurar Logging

```python
# config/logging.py
import logging
import structlog

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)

structlog.configure(
    processors=[
        structlog.stdlib.filter_by_level,
        structlog.stdlib.add_logger_name,
        structlog.stdlib.add_log_level,
        structlog.stdlib.PositionalArgumentsFormatter(),
        structlog.processors.TimeStamper(fmt="iso"),
        structlog.processors.StackInfoRenderer(),
        structlog.processors.format_exc_info,
        structlog.processors.UnicodeDecoder(),
        structlog.processors.JSONRenderer()
    ],
    context_class=dict,
    logger_factory=structlog.stdlib.LoggerFactory(),
    wrapper_class=structlog.stdlib.BoundLogger,
    cache_logger_on_first_use=True,
)
```

### 2. Métricas

```bash
# Instalar prometheus client
pip install prometheus-client

# Ejecutar endpoint de métricas
python scripts/metrics_server.py
```

## Solución de Problemas Comunes

### 1. Error de API Key

```bash
# Verificar variable de entorno
echo $OPENAI_API_KEY

# Verificar en Python
python -c "import os; print(os.getenv('OPENAI_API_KEY'))"
```

### 2. Problemas de Dependencias

```bash
# Limpiar cache de pip
pip cache purge

# Reinstalar dependencias
pip uninstall -r requirements.txt -y
pip install -r requirements.txt

# Con poetry
poetry cache clear pypi --all
poetry install --no-cache
```

### 3. Problemas de Base de Datos

```bash
# Recrear base de datos
rm chatbot.db
python manage.py init-db

# Verificar conexión
python -c "from src.models import db; db.connect(); print('DB OK')"
```

### 4. Problemas de Memoria

```bash
# Monitorear uso de memoria
python scripts/monitor_memory.py

# Configurar límites
export PYTHONMALLOC=debug
export PYTHONASYNCIODEBUG=1
```

## Próximos Pasos

### 1. Desarrollo Local

1. Explorar la interfaz web en `http://localhost:5000`
2. Probar diferentes consultas para entender las capacidades
3. Revisar logs para entender el flujo de procesamiento
4. Experimentar con diferentes configuraciones

### 2. Personalización

1. Añadir más contenido a la base de conocimiento
2. Ajustar parámetros del modelo de IA
3. Personalizar respuestas para diferentes contextos
4. Integrar con sistemas existentes de la FIUNA

### 3. Deployment

1. Configurar entorno de producción
2. Establecer CI/CD pipeline
3. Configurar monitoreo y alertas
4. Planificar estrategia de backup

## Recursos Adicionales

- **Documentación de OpenAI**: https://platform.openai.com/docs
- **LangChain Documentation**: https://python.langchain.com/
- **FastAPI Docs**: https://fastapi.tiangolo.com/
- **Telegram Bot API**: https://core.telegram.org/bots/api

## Contribuir

Para contribuir al proyecto, consulta la [guía de contribución](./contributing.md) y sigue las mejores prácticas establecidas.

---
id: "4"
title: "Python"
description: "Lenguaje versátil con sintaxis clara, popular para backend y data science."
---

# Python para Backend

Python es conocido por su legibilidad y productividad.

## Sintaxis Básica

```python
# Variables y tipos
nombre = "Python"
version = 3.12
es_genial = True

# Funciones
def saludar(nombre: str) -> str:
    return f"Hola, {nombre}!"

# Clases
class Usuario:
    def __init__(self, nombre: str):
        self.nombre = nombre
    
    def presentar(self) -> str:
        return f"Soy {self.nombre}"
```

## Frameworks Backend

### FastAPI (Moderno y Rápido)
```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hola Mundo"}

@app.get("/usuarios/{usuario_id}")
async def leer_usuario(usuario_id: int):
    return {"usuario_id": usuario_id}
```

### Django (Baterías Incluidas)
- ORM completo
- Panel de administración
- Sistema de autenticación
- Excelente para proyectos grandes

### Flask (Minimalista)
- Micro-framework
- Flexible y extensible
- Ideal para APIs pequeñas

## Virtual Environments

```bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows
pip install fastapi uvicorn
```

## Recursos

- [Python Docs](https://docs.python.org/3/)
- [FastAPI Tutorial](https://fastapi.tiangolo.com/tutorial/)

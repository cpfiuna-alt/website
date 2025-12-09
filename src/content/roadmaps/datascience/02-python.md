---
id: "2"
title: "Python para Data"
description: "Python es el lenguaje más popular para ciencia de datos."
---

# Python para Data Science

Python es el lenguaje preferido por su ecosistema de librerías.

## Configuración del entorno

```bash
# Instalar con Anaconda (recomendado)
# O con pip
pip install numpy pandas matplotlib seaborn scikit-learn jupyter
```

## Jupyter Notebooks

El entorno interactivo estándar para data science.

```bash
jupyter notebook
# O JupyterLab
jupyter lab
```

## Sintaxis básica de Python

```python
# Variables
nombre = "Juan"
edad = 25
precio = 19.99
activo = True

# Listas
numeros = [1, 2, 3, 4, 5]
numeros.append(6)

# Diccionarios
persona = {
    "nombre": "Ana",
    "edad": 30,
    "ciudad": "Asunción"
}

# List comprehensions
cuadrados = [x**2 for x in range(10)]
pares = [x for x in range(20) if x % 2 == 0]

# Funciones
def calcular_media(numeros):
    return sum(numeros) / len(numeros)
```

## Librerías esenciales

| Librería | Propósito |
|----------|-----------|
| NumPy | Arrays y operaciones matemáticas |
| Pandas | DataFrames y manipulación de datos |
| Matplotlib | Visualización básica |
| Seaborn | Visualización estadística |
| Scikit-learn | Machine Learning |

## Recursos

- [Python para Todos](https://www.py4e.com/) - Libro gratuito
- [Real Python](https://realpython.com/) - Tutoriales
- [Kaggle Learn](https://www.kaggle.com/learn) - Cursos prácticos

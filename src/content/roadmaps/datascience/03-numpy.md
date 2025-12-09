---
id: "3"
title: "NumPy"
description: "Computación numérica eficiente con arrays multidimensionales."
---

# NumPy

NumPy es la base de todo el stack de data science en Python.

## Arrays

```python
import numpy as np

# Crear arrays
arr = np.array([1, 2, 3, 4, 5])
zeros = np.zeros((3, 4))  # matriz 3x4 de ceros
ones = np.ones((2, 3))
rango = np.arange(0, 10, 2)  # [0, 2, 4, 6, 8]
linspace = np.linspace(0, 1, 5)  # 5 valores entre 0 y 1
random = np.random.rand(3, 3)  # valores aleatorios
```

## Operaciones vectorizadas

```python
a = np.array([1, 2, 3])
b = np.array([4, 5, 6])

# Operaciones elemento a elemento
suma = a + b        # [5, 7, 9]
producto = a * b    # [4, 10, 18]
cuadrados = a ** 2  # [1, 4, 9]

# Mucho más rápido que loops!
```

## Indexación y slicing

```python
arr = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])

arr[0, 1]      # 2 (fila 0, columna 1)
arr[0]         # [1, 2, 3] (primera fila)
arr[:, 0]      # [1, 4, 7] (primera columna)
arr[0:2, 1:3]  # submatriz

# Indexación booleana
arr[arr > 5]   # [6, 7, 8, 9]
```

## Funciones estadísticas

```python
arr = np.array([1, 2, 3, 4, 5])

np.mean(arr)    # 3.0
np.median(arr)  # 3.0
np.std(arr)     # desviación estándar
np.var(arr)     # varianza
np.min(arr)     # 1
np.max(arr)     # 5
np.sum(arr)     # 15
```

## Reshape y broadcasting

```python
arr = np.arange(12)
matriz = arr.reshape(3, 4)  # 3 filas, 4 columnas

# Broadcasting: operar arrays de diferentes tamaños
matriz + 10  # suma 10 a todos los elementos
```

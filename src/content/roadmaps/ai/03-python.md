---
id: "3"
title: "Python para IA"
description: "Python y sus librerías esenciales para inteligencia artificial."
---

# Python para IA

Python es el lenguaje dominante en IA por su ecosistema de librerías.

## Stack Básico

```bash
pip install numpy pandas matplotlib scikit-learn jupyter
```

## NumPy - Arrays numéricos

```python
import numpy as np

# Arrays
arr = np.array([1, 2, 3, 4, 5])
matriz = np.random.randn(3, 4)  # matriz 3x4

# Operaciones vectorizadas (rápidas)
resultado = arr * 2 + 1

# Broadcasting
matriz + arr  # funciona automáticamente

# Reshaping
arr.reshape(5, 1)
matriz.flatten()
```

## Pandas - Datos tabulares

```python
import pandas as pd

df = pd.read_csv('datos.csv')
df.head()
df.describe()
df['columna'].value_counts()
```

## Matplotlib/Seaborn - Visualización

```python
import matplotlib.pyplot as plt
import seaborn as sns

plt.figure(figsize=(10, 6))
plt.plot(x, y)
plt.title('Mi gráfico')
plt.show()

sns.heatmap(correlaciones, annot=True)
```

## Scikit-learn - ML clásico

```python
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

modelo = RandomForestClassifier()
modelo.fit(X_train, y_train)
predicciones = modelo.predict(X_test)
```

## Deep Learning

| Librería | Descripción |
|----------|-------------|
| PyTorch | Flexible, preferido en investigación |
| TensorFlow/Keras | Producción, Google |
| JAX | Alto rendimiento, diferenciación automática |

## Jupyter Notebooks

El entorno interactivo estándar para experimentación.

```bash
jupyter lab
```

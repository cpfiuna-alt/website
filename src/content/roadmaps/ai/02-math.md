---
id: "2"
title: "Matemáticas para IA"
description: "Fundamentos matemáticos esenciales: álgebra lineal, cálculo, probabilidad."
---

# Matemáticas para IA

Las matemáticas son el lenguaje de la IA.

## Álgebra Lineal

### Vectores y Matrices

```python
import numpy as np

# Vector
v = np.array([1, 2, 3])

# Matriz
A = np.array([
    [1, 2, 3],
    [4, 5, 6]
])

# Operaciones
producto_punto = np.dot(v1, v2)
producto_matriz = A @ B
transpuesta = A.T
```

### Conceptos clave

| Concepto | Uso en ML |
|----------|-----------|
| Vectores | Representar datos |
| Matrices | Pesos de redes neuronales |
| Producto punto | Similitud entre vectores |
| Normas | Regularización |
| Eigenvalues | PCA, reducción dimensional |

## Cálculo

### Derivadas

Esenciales para optimización (gradient descent).

```python
# f(x) = x²
# f'(x) = 2x

# En redes neuronales
# ∂Loss/∂weights → ajustar pesos
```

### Gradientes

Vector de derivadas parciales.

```
∇f = [∂f/∂x₁, ∂f/∂x₂, ..., ∂f/∂xₙ]
```

## Probabilidad y Estadística

### Distribuciones

```python
from scipy import stats

# Normal
normal = stats.norm(loc=0, scale=1)
normal.pdf(0)  # densidad de probabilidad

# Bernoulli
# Para clasificación binaria
```

### Teorema de Bayes

```
P(A|B) = P(B|A) * P(A) / P(B)
```

Fundamental para:
- Naive Bayes
- Redes bayesianas
- Inferencia probabilística

## Recursos

- [3Blue1Brown - Linear Algebra](https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab)
- [Khan Academy - Cálculo](https://www.khanacademy.org/math/calculus-1)
- "Mathematics for Machine Learning" - Libro gratuito

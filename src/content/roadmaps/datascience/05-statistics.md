---
id: "5"
title: "Estadística Básica"
description: "Fundamentos de estadística descriptiva e inferencial."
---

# Estadística para Data Science

La estadística es el lenguaje de la ciencia de datos.

## Estadística Descriptiva

### Medidas de tendencia central

```python
import numpy as np
from scipy import stats

data = [23, 45, 67, 32, 56, 78, 43, 55, 66]

media = np.mean(data)      # Promedio
mediana = np.median(data)  # Valor central
moda = stats.mode(data)    # Más frecuente
```

### Medidas de dispersión

```python
varianza = np.var(data)            # Varianza
desv_std = np.std(data)            # Desviación estándar
rango = np.max(data) - np.min(data)

# Percentiles
q1 = np.percentile(data, 25)
q3 = np.percentile(data, 75)
iqr = q3 - q1  # Rango intercuartílico
```

## Distribuciones

| Distribución | Uso |
|-------------|-----|
| Normal | Datos continuos naturales |
| Binomial | Éxitos en n intentos |
| Poisson | Eventos en un intervalo |
| Uniforme | Todos los valores equiprobables |

```python
# Generar datos de distribución normal
from scipy.stats import norm

datos_normal = norm.rvs(loc=0, scale=1, size=1000)  # media=0, std=1
```

## Correlación

```python
import pandas as pd

df = pd.DataFrame({
    'x': [1, 2, 3, 4, 5],
    'y': [2, 4, 5, 4, 5]
})

# Correlación de Pearson
correlacion = df['x'].corr(df['y'])

# Matriz de correlación
df.corr()
```

## Pruebas de hipótesis

- **H₀**: Hipótesis nula (no hay efecto)
- **H₁**: Hipótesis alternativa
- **p-value**: Probabilidad de obtener resultados si H₀ es verdadera

```python
from scipy.stats import ttest_ind

grupo_a = [23, 25, 28, 24, 26]
grupo_b = [30, 32, 29, 31, 33]

stat, p_value = ttest_ind(grupo_a, grupo_b)
# Si p < 0.05, rechazamos H₀
```

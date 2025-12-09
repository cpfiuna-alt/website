---
id: "8"
title: "Limpieza de Datos"
description: "Preprocesamiento y limpieza de datos reales (que siempre están sucios)."
---

# Limpieza de Datos

El 80% del tiempo en data science es limpiar datos.

## Problemas comunes

| Problema | Solución |
|----------|----------|
| Valores faltantes | Eliminar o imputar |
| Duplicados | Eliminar |
| Tipos incorrectos | Convertir |
| Outliers | Analizar, a veces remover |
| Inconsistencias | Estandarizar |

## Valores faltantes

```python
import pandas as pd
import numpy as np

# Detectar
df.isnull().sum()
df.isna().sum()

# Eliminar filas con NaN
df.dropna()

# Eliminar si columna específica es NaN
df.dropna(subset=['columna'])

# Imputar con valor
df['edad'].fillna(df['edad'].mean(), inplace=True)
df['categoria'].fillna('Desconocido', inplace=True)

# Forward/backward fill
df.fillna(method='ffill')
df.fillna(method='bfill')
```

## Duplicados

```python
# Detectar
df.duplicated().sum()

# Eliminar
df.drop_duplicates()

# Por columnas específicas
df.drop_duplicates(subset=['email'])
```

## Conversión de tipos

```python
# String a numérico
df['precio'] = pd.to_numeric(df['precio'], errors='coerce')

# String a fecha
df['fecha'] = pd.to_datetime(df['fecha'])

# Categorías
df['genero'] = df['genero'].astype('category')
```

## Estandarización de texto

```python
# Mayúsculas/minúsculas
df['nombre'] = df['nombre'].str.lower()
df['nombre'] = df['nombre'].str.strip()

# Reemplazar valores
df['pais'].replace({
    'PY': 'Paraguay',
    'py': 'Paraguay',
    'Py': 'Paraguay'
}, inplace=True)
```

## Outliers

```python
# Detectar con IQR
Q1 = df['valor'].quantile(0.25)
Q3 = df['valor'].quantile(0.75)
IQR = Q3 - Q1

# Filtrar outliers
df_clean = df[
    (df['valor'] >= Q1 - 1.5*IQR) & 
    (df['valor'] <= Q3 + 1.5*IQR)
]
```

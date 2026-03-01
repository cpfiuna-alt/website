---
id: "10"
title: "Feature Engineering"
description: "Crear y transformar variables para mejorar modelos."
---

# Feature Engineering

Las features (variables) que usas determinan el éxito de tu modelo.

## Transformaciones numéricas

```python
import numpy as np
from sklearn.preprocessing import StandardScaler, MinMaxScaler

# Log transform (para distribuciones sesgadas)
df['log_precio'] = np.log1p(df['precio'])

# Estandarización (media=0, std=1)
scaler = StandardScaler()
df['precio_std'] = scaler.fit_transform(df[['precio']])

# Normalización (0 a 1)
minmax = MinMaxScaler()
df['precio_norm'] = minmax.fit_transform(df[['precio']])

# Bins/Buckets
df['grupo_edad'] = pd.cut(df['edad'], 
    bins=[0, 18, 35, 50, 100], 
    labels=['joven', 'adulto', 'maduro', 'mayor'])
```

## Variables categóricas

```python
from sklearn.preprocessing import LabelEncoder, OneHotEncoder

# Label Encoding (para ordinales)
le = LabelEncoder()
df['ciudad_encoded'] = le.fit_transform(df['ciudad'])

# One-Hot Encoding
df_encoded = pd.get_dummies(df, columns=['ciudad'])

# Target Encoding
city_means = df.groupby('ciudad')['target'].mean()
df['ciudad_target_enc'] = df['ciudad'].map(city_means)
```

## Features de fechas

```python
df['fecha'] = pd.to_datetime(df['fecha'])

df['año'] = df['fecha'].dt.year
df['mes'] = df['fecha'].dt.month
df['dia'] = df['fecha'].dt.day
df['dia_semana'] = df['fecha'].dt.dayofweek
df['es_fin_semana'] = df['dia_semana'].isin([5, 6])
df['trimestre'] = df['fecha'].dt.quarter
```

## Features de texto

```python
# Longitud
df['longitud_texto'] = df['texto'].str.len()
df['num_palabras'] = df['texto'].str.split().str.len()

# Contiene palabra
df['contiene_urgente'] = df['texto'].str.contains('urgente', case=False)
```

## Interacciones

```python
# Productos
df['precio_cantidad'] = df['precio'] * df['cantidad']

# Ratios
df['precio_por_unidad'] = df['precio'] / df['cantidad']

# Agregaciones por grupo
df['precio_promedio_ciudad'] = df.groupby('ciudad')['precio'].transform('mean')
```

## Tips

- Entiende el dominio del problema
- Crea features que tengan sentido
- Valida que no haya data leakage
- Prueba y mide impacto en el modelo

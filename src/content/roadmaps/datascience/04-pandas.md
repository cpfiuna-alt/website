---
id: "4"
title: "Pandas"
description: "Manipulación y análisis de datos con DataFrames."
---

# Pandas

Pandas es la herramienta esencial para manipular datos tabulares.

## DataFrames

```python
import pandas as pd

# Crear DataFrame
df = pd.DataFrame({
    'nombre': ['Ana', 'Juan', 'María'],
    'edad': [25, 30, 28],
    'ciudad': ['Asunción', 'Luque', 'San Lorenzo']
})

# Leer archivos
df = pd.read_csv('datos.csv')
df = pd.read_excel('datos.xlsx')
df = pd.read_json('datos.json')
```

## Exploración básica

```python
df.head()        # primeras 5 filas
df.tail()        # últimas 5 filas
df.shape         # (filas, columnas)
df.columns       # nombres de columnas
df.dtypes        # tipos de datos
df.info()        # resumen del DataFrame
df.describe()    # estadísticas descriptivas
```

## Selección de datos

```python
# Columnas
df['nombre']          # una columna
df[['nombre', 'edad']] # múltiples columnas

# Filas
df.loc[0]             # por etiqueta
df.iloc[0]            # por posición
df.loc[0:2, 'nombre'] # filas y columnas

# Filtros
df[df['edad'] > 25]
df[(df['edad'] > 25) & (df['ciudad'] == 'Asunción')]
```

## Manipulación

```python
# Nueva columna
df['mayor_edad'] = df['edad'] >= 18

# Ordenar
df.sort_values('edad', ascending=False)

# Eliminar duplicados
df.drop_duplicates()

# Valores faltantes
df.dropna()
df.fillna(0)

# Group by
df.groupby('ciudad')['edad'].mean()
```

## Merge y concatenación

```python
# Unir DataFrames
pd.merge(df1, df2, on='id')
pd.concat([df1, df2])
```

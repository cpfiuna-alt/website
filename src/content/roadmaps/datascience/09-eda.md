---
id: "9"
title: "EDA"
description: "Exploratory Data Analysis: descubre patrones antes de modelar."
---

# Exploratory Data Analysis (EDA)

EDA es el proceso de entender tus datos antes de modelar.

## Preguntas clave

- ¿Cuántas filas y columnas?
- ¿Qué tipos de datos hay?
- ¿Hay valores faltantes?
- ¿Cuál es la distribución de cada variable?
- ¿Hay outliers?
- ¿Qué correlaciones existen?

## Paso 1: Vista general

```python
import pandas as pd

df = pd.read_csv('datos.csv')

print(f"Shape: {df.shape}")
print(f"Columnas: {df.columns.tolist()}")

df.info()
df.describe()
df.head(10)
```

## Paso 2: Variables numéricas

```python
import matplotlib.pyplot as plt
import seaborn as sns

# Distribución
fig, axes = plt.subplots(2, 3, figsize=(15, 10))
for i, col in enumerate(numeric_cols):
    ax = axes[i // 3, i % 3]
    sns.histplot(df[col], kde=True, ax=ax)
    ax.set_title(col)
plt.tight_layout()
plt.show()

# Boxplots para outliers
df[numeric_cols].boxplot(figsize=(12, 6))
```

## Paso 3: Variables categóricas

```python
# Conteo de valores
for col in categorical_cols:
    print(f"\n{col}:")
    print(df[col].value_counts())

# Gráficos de barras
for col in categorical_cols:
    plt.figure(figsize=(10, 5))
    df[col].value_counts().plot(kind='bar')
    plt.title(f'Distribución de {col}')
    plt.show()
```

## Paso 4: Correlaciones

```python
# Matriz de correlación
corr_matrix = df[numeric_cols].corr()

plt.figure(figsize=(12, 10))
sns.heatmap(corr_matrix, annot=True, cmap='coolwarm', center=0)
plt.title('Matriz de Correlación')
plt.show()

# Pairplot
sns.pairplot(df[numeric_cols])
```

## Paso 5: Relaciones con la variable objetivo

```python
# Si es clasificación
for col in numeric_cols:
    sns.boxplot(data=df, x='target', y=col)
    plt.show()

# Si es regresión
for col in numeric_cols:
    sns.scatterplot(data=df, x=col, y='target')
    plt.show()
```

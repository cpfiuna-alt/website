---
id: "6"
title: "Visualización"
description: "Crear gráficos efectivos con Matplotlib y Seaborn."
---

# Visualización de Datos

Una buena visualización comunica insights de forma clara.

## Matplotlib

```python
import matplotlib.pyplot as plt

# Gráfico de línea
x = [1, 2, 3, 4, 5]
y = [2, 4, 6, 8, 10]

plt.figure(figsize=(10, 6))
plt.plot(x, y, color='blue', marker='o', label='Datos')
plt.xlabel('Eje X')
plt.ylabel('Eje Y')
plt.title('Mi primer gráfico')
plt.legend()
plt.grid(True)
plt.show()
```

## Tipos de gráficos básicos

```python
# Scatter plot
plt.scatter(x, y, c='red', alpha=0.5)

# Bar chart
plt.bar(['A', 'B', 'C'], [10, 20, 15])

# Histograma
plt.hist(datos, bins=30, edgecolor='black')

# Pie chart
plt.pie([30, 20, 50], labels=['A', 'B', 'C'], autopct='%1.1f%%')
```

## Seaborn

Más fácil para visualizaciones estadísticas.

```python
import seaborn as sns

# Configuración
sns.set_style('whitegrid')

# Distribución
sns.histplot(df['edad'], kde=True)

# Relación entre variables
sns.scatterplot(data=df, x='edad', y='salario', hue='genero')

# Boxplot
sns.boxplot(data=df, x='categoria', y='valor')

# Heatmap de correlación
sns.heatmap(df.corr(), annot=True, cmap='coolwarm')

# Pairplot
sns.pairplot(df, hue='categoria')
```

## Cuándo usar cada gráfico

| Tipo | Uso |
|------|-----|
| Línea | Tendencias en el tiempo |
| Scatter | Relación entre dos variables |
| Bar | Comparar categorías |
| Histograma | Distribución de una variable |
| Boxplot | Distribución y outliers |
| Heatmap | Correlaciones |

## Tips

- Menos es más
- Títulos claros
- Evitar 3D innecesario
- Elegir colores accesibles

---
id: "11"
title: "Intro ML"
description: "Introducción a Machine Learning: conceptos fundamentales."
---

# Introducción a Machine Learning

Machine Learning es enseñar a las computadoras a aprender de datos.

## Tipos de Machine Learning

### Aprendizaje Supervisado
Datos etiquetados: input → output conocido

- **Clasificación**: Predecir categorías (spam/no spam)
- **Regresión**: Predecir valores continuos (precio)

### Aprendizaje No Supervisado
Sin etiquetas: descubrir patrones

- **Clustering**: Agrupar datos similares
- **Reducción dimensional**: Comprimir información

### Aprendizaje por Refuerzo
Aprender por prueba y error con recompensas

## Flujo de trabajo ML

```
1. Recopilar datos
2. Limpiar y preparar
3. Dividir train/test
4. Entrenar modelo
5. Evaluar
6. Ajustar (iterar)
7. Desplegar
```

## Train/Test Split

```python
from sklearn.model_selection import train_test_split

X = df.drop('target', axis=1)
y = df['target']

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)
```

## Overfitting vs Underfitting

| Problema | Síntoma | Solución |
|----------|---------|----------|
| Overfitting | Train ✅, Test ❌ | Más datos, regularización, modelo simple |
| Underfitting | Train ❌, Test ❌ | Modelo más complejo, más features |

## Ejemplo Simple

```python
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score

# Crear y entrenar modelo
modelo = LogisticRegression()
modelo.fit(X_train, y_train)

# Predecir
y_pred = modelo.predict(X_test)

# Evaluar
accuracy = accuracy_score(y_test, y_pred)
print(f"Accuracy: {accuracy:.2%}")
```

## Conceptos clave

- **Features (X)**: Variables de entrada
- **Target (y)**: Lo que queremos predecir
- **Entrenamiento**: El modelo aprende patrones
- **Inferencia**: Hacer predicciones nuevas

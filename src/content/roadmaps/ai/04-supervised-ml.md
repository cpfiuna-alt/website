---
id: "4"
title: "ML Supervisado"
description: "Aprendizaje supervisado: regresión y clasificación."
---

# Aprendizaje Supervisado

Aprender de datos etiquetados: input (X) → output (y).

## Tipos

| Tipo | Output | Ejemplo |
|------|--------|---------|
| Regresión | Número continuo | Predecir precio |
| Clasificación | Categoría | Spam o no spam |

## Regresión

### Regresión Lineal

```python
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score

model = LinearRegression()
model.fit(X_train, y_train)

y_pred = model.predict(X_test)
mse = mean_squared_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)
```

### Random Forest Regressor

```python
from sklearn.ensemble import RandomForestRegressor

rf = RandomForestRegressor(n_estimators=100)
rf.fit(X_train, y_train)
```

## Clasificación

### Regresión Logística

```python
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report

model = LogisticRegression()
model.fit(X_train, y_train)

y_pred = model.predict(X_test)
print(classification_report(y_test, y_pred))
```

### SVM (Support Vector Machine)

```python
from sklearn.svm import SVC

svm = SVC(kernel='rbf')
svm.fit(X_train, y_train)
```

## Flujo de trabajo

```
1. Cargar datos
2. Exploración (EDA)
3. Preprocesamiento
4. Train/test split
5. Entrenar modelo
6. Evaluar
7. Ajustar hiperparámetros
8. Evaluar en test final
```

## Métricas

| Problema | Métricas |
|----------|----------|
| Regresión | MSE, RMSE, MAE, R² |
| Clasificación | Accuracy, Precision, Recall, F1, AUC |

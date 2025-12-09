---
id: "12"
title: "Regresión"
description: "Modelos de regresión para predecir valores continuos."
---

# Modelos de Regresión

Predecir valores numéricos continuos.

## Regresión Lineal

```python
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score
import numpy as np

# Crear y entrenar
modelo = LinearRegression()
modelo.fit(X_train, y_train)

# Predecir
y_pred = modelo.predict(X_test)

# Evaluar
mse = mean_squared_error(y_test, y_pred)
rmse = np.sqrt(mse)
r2 = r2_score(y_test, y_pred)

print(f"RMSE: {rmse:.2f}")
print(f"R²: {r2:.2f}")

# Coeficientes
print(f"Intercepto: {modelo.intercept_}")
print(f"Coeficientes: {modelo.coef_}")
```

## Regresión Polinomial

```python
from sklearn.preprocessing import PolynomialFeatures

poly = PolynomialFeatures(degree=2)
X_poly = poly.fit_transform(X)

modelo = LinearRegression()
modelo.fit(X_poly, y)
```

## Regularización

Para evitar overfitting:

```python
from sklearn.linear_model import Ridge, Lasso, ElasticNet

# Ridge (L2)
ridge = Ridge(alpha=1.0)
ridge.fit(X_train, y_train)

# Lasso (L1) - puede hacer feature selection
lasso = Lasso(alpha=1.0)
lasso.fit(X_train, y_train)

# ElasticNet (L1 + L2)
elastic = ElasticNet(alpha=1.0, l1_ratio=0.5)
```

## Métricas de Regresión

| Métrica | Descripción |
|---------|-------------|
| MAE | Error absoluto medio |
| MSE | Error cuadrático medio |
| RMSE | Raíz del MSE (mismas unidades que y) |
| R² | Varianza explicada (0-1) |
| MAPE | Error porcentual |

```python
from sklearn.metrics import mean_absolute_error

mae = mean_absolute_error(y_test, y_pred)
mape = np.mean(np.abs((y_test - y_pred) / y_test)) * 100
```

## Random Forest Regressor

```python
from sklearn.ensemble import RandomForestRegressor

rf = RandomForestRegressor(n_estimators=100, random_state=42)
rf.fit(X_train, y_train)
y_pred = rf.predict(X_test)

# Feature importance
importances = rf.feature_importances_
```

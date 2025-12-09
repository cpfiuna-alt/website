---
id: "19"
title: "Time Series"
description: "Análisis y predicción de series temporales."
---

# Series Temporales

Datos ordenados en el tiempo con patrones temporales.

## Componentes

- **Tendencia**: Dirección general a largo plazo
- **Estacionalidad**: Patrones que se repiten
- **Ruido**: Variaciones aleatorias

## Visualización

```python
import pandas as pd
import matplotlib.pyplot as plt

# Leer con índice de fecha
df = pd.read_csv('datos.csv', parse_dates=['fecha'], index_col='fecha')

# Plot básico
df['ventas'].plot(figsize=(12, 5))
plt.title('Ventas en el tiempo')
plt.show()

# Descomposición
from statsmodels.tsa.seasonal import seasonal_decompose

decomposition = seasonal_decompose(df['ventas'], model='additive', period=12)
decomposition.plot()
plt.show()
```

## Preparación de datos

```python
# Resampling
df_mensual = df.resample('M').mean()
df_semanal = df.resample('W').sum()

# Rolling statistics
df['media_movil'] = df['ventas'].rolling(window=7).mean()
df['std_movil'] = df['ventas'].rolling(window=7).std()

# Lag features
df['ventas_lag1'] = df['ventas'].shift(1)
df['ventas_lag7'] = df['ventas'].shift(7)

# Diferenciación
df['diff'] = df['ventas'].diff()
```

## ARIMA

```python
from statsmodels.tsa.arima.model import ARIMA

# Entrenar
model = ARIMA(df['ventas'], order=(1, 1, 1))
fitted = model.fit()

# Pronóstico
forecast = fitted.forecast(steps=30)
```

## Prophet (Facebook)

```python
from prophet import Prophet

# Formato requerido: ds (fecha) y y (valor)
df_prophet = df.reset_index()
df_prophet.columns = ['ds', 'y']

model = Prophet()
model.fit(df_prophet)

# Futuro
future = model.make_future_dataframe(periods=30)
forecast = model.predict(future)

model.plot(forecast)
```

## ML para Series Temporales

```python
# Crear features de tiempo
df['mes'] = df.index.month
df['dia_semana'] = df.index.dayofweek
df['es_fin_mes'] = df.index.is_month_end

# Usar modelo tradicional con features temporales
from sklearn.ensemble import RandomForestRegressor

X = df[['mes', 'dia_semana', 'ventas_lag1', 'ventas_lag7']]
y = df['ventas']

# ¡Importante! Train/test split temporal
train_size = int(len(df) * 0.8)
X_train, X_test = X[:train_size], X[train_size:]
```

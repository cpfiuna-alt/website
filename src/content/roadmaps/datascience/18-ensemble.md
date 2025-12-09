---
id: "18"
title: "Ensemble Methods"
description: "Combinar múltiples modelos para mejor rendimiento."
---

# Ensemble Methods

Combinar modelos para obtener mejores predicciones.

## Bagging (Bootstrap Aggregating)

Entrena modelos en subconjuntos aleatorios y promedia.

```python
from sklearn.ensemble import BaggingClassifier, RandomForestClassifier

# Random Forest es bagging de árboles
rf = RandomForestClassifier(n_estimators=100, random_state=42)

# Bagging genérico
bagging = BaggingClassifier(
    estimator=DecisionTreeClassifier(),
    n_estimators=100,
    max_samples=0.8,
    max_features=0.8,
    random_state=42
)
```

## Boosting

Modelos secuenciales que corrigen errores anteriores.

### Gradient Boosting

```python
from sklearn.ensemble import GradientBoostingClassifier

gb = GradientBoostingClassifier(
    n_estimators=100,
    learning_rate=0.1,
    max_depth=3,
    random_state=42
)
gb.fit(X_train, y_train)
```

### XGBoost

```python
import xgboost as xgb

xgb_model = xgb.XGBClassifier(
    n_estimators=100,
    learning_rate=0.1,
    max_depth=5,
    random_state=42
)
xgb_model.fit(X_train, y_train)
```

### LightGBM (Más rápido)

```python
import lightgbm as lgb

lgb_model = lgb.LGBMClassifier(
    n_estimators=100,
    learning_rate=0.1,
    num_leaves=31,
    random_state=42
)
lgb_model.fit(X_train, y_train)
```

## Stacking

Usa predicciones de modelos como features para otro modelo.

```python
from sklearn.ensemble import StackingClassifier

estimators = [
    ('rf', RandomForestClassifier(n_estimators=100)),
    ('gb', GradientBoostingClassifier(n_estimators=100)),
    ('lr', LogisticRegression())
]

stacking = StackingClassifier(
    estimators=estimators,
    final_estimator=LogisticRegression(),
    cv=5
)

stacking.fit(X_train, y_train)
```

## Voting

```python
from sklearn.ensemble import VotingClassifier

voting = VotingClassifier(
    estimators=[
        ('rf', RandomForestClassifier(n_estimators=100)),
        ('gb', GradientBoostingClassifier(n_estimators=100))
    ],
    voting='soft'  # usa probabilidades
)
```

## Comparación

| Método | Ventaja |
|--------|---------|
| Bagging | Reduce varianza, paralelizable |
| Boosting | Reduce bias, más preciso |
| Stacking | Combina fortalezas de modelos |

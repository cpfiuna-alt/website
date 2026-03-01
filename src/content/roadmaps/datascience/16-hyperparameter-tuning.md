---
id: "16"
title: "Hyperparameter Tuning"
description: "Optimizar los parámetros del modelo para mejor rendimiento."
---

# Hyperparameter Tuning

Encontrar los mejores parámetros para tu modelo.

## Grid Search

Prueba todas las combinaciones.

```python
from sklearn.model_selection import GridSearchCV
from sklearn.ensemble import RandomForestClassifier

param_grid = {
    'n_estimators': [100, 200, 300],
    'max_depth': [5, 10, 15, None],
    'min_samples_split': [2, 5, 10],
    'min_samples_leaf': [1, 2, 4]
}

rf = RandomForestClassifier(random_state=42)

grid_search = GridSearchCV(
    rf, param_grid, cv=5, 
    scoring='accuracy', 
    n_jobs=-1,  # usar todos los cores
    verbose=1
)

grid_search.fit(X_train, y_train)

print(f"Mejores parámetros: {grid_search.best_params_}")
print(f"Mejor score: {grid_search.best_score_:.3f}")

# Usar el mejor modelo
best_model = grid_search.best_estimator_
```

## Random Search

Más eficiente para muchos parámetros.

```python
from sklearn.model_selection import RandomizedSearchCV
from scipy.stats import randint, uniform

param_dist = {
    'n_estimators': randint(50, 500),
    'max_depth': randint(3, 20),
    'min_samples_split': randint(2, 20),
    'min_samples_leaf': randint(1, 10),
    'max_features': uniform(0.1, 0.9)
}

random_search = RandomizedSearchCV(
    rf, param_dist, 
    n_iter=100,  # número de combinaciones a probar
    cv=5, 
    scoring='accuracy',
    random_state=42,
    n_jobs=-1
)

random_search.fit(X_train, y_train)
```

## Optuna (Avanzado)

Búsqueda bayesiana inteligente.

```python
import optuna

def objective(trial):
    params = {
        'n_estimators': trial.suggest_int('n_estimators', 50, 500),
        'max_depth': trial.suggest_int('max_depth', 3, 20),
        'min_samples_split': trial.suggest_int('min_samples_split', 2, 20)
    }
    
    model = RandomForestClassifier(**params, random_state=42)
    scores = cross_val_score(model, X_train, y_train, cv=5)
    return scores.mean()

study = optuna.create_study(direction='maximize')
study.optimize(objective, n_trials=100)

print(f"Mejores parámetros: {study.best_params}")
```

## Tips

- Empieza con Random Search
- Usa GridSearch para refinar
- No olvides el CV dentro de la búsqueda
- Evalúa en test set solo al final

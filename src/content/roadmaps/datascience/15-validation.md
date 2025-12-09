---
id: "15"
title: "Validación"
description: "Cross-validation y técnicas para evaluar modelos correctamente."
---

# Validación de Modelos

Evitar overfitting y obtener estimaciones confiables del rendimiento.

## Cross-Validation

```python
from sklearn.model_selection import cross_val_score, KFold

# K-Fold Cross Validation
kfold = KFold(n_splits=5, shuffle=True, random_state=42)

scores = cross_val_score(modelo, X, y, cv=kfold, scoring='accuracy')

print(f"Scores: {scores}")
print(f"Media: {scores.mean():.3f} ± {scores.std():.3f}")
```

## Stratified K-Fold

Mantiene proporciones de clases (para clasificación).

```python
from sklearn.model_selection import StratifiedKFold

skfold = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)

scores = cross_val_score(modelo, X, y, cv=skfold)
```

## Validación Temporal

Para series de tiempo (no mezclar futuro con pasado).

```python
from sklearn.model_selection import TimeSeriesSplit

tscv = TimeSeriesSplit(n_splits=5)

for train_idx, test_idx in tscv.split(X):
    X_train, X_test = X[train_idx], X[test_idx]
    y_train, y_test = y[train_idx], y[test_idx]
```

## Train/Validation/Test Split

```python
# 60% train, 20% validation, 20% test
X_train, X_temp, y_train, y_temp = train_test_split(
    X, y, test_size=0.4, random_state=42
)
X_val, X_test, y_val, y_test = train_test_split(
    X_temp, y_temp, test_size=0.5, random_state=42
)
```

## Curvas de Aprendizaje

```python
from sklearn.model_selection import learning_curve
import numpy as np

train_sizes, train_scores, val_scores = learning_curve(
    modelo, X, y, cv=5, 
    train_sizes=np.linspace(0.1, 1.0, 10)
)

plt.plot(train_sizes, train_scores.mean(axis=1), label='Train')
plt.plot(train_sizes, val_scores.mean(axis=1), label='Validation')
plt.xlabel('Tamaño del training set')
plt.ylabel('Score')
plt.legend()
plt.show()
```

## Tips

- **Nunca** evalúes en datos de entrenamiento
- Usa stratified para clasificación desbalanceada
- Cross-validation > single split
- Guarda el test set para evaluación final

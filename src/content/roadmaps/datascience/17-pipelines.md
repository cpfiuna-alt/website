---
id: "17"
title: "Pipelines"
description: "Automatizar preprocesamiento y modelado con scikit-learn Pipelines."
---

# Pipelines en Scikit-learn

Encadenar transformaciones y modelos de forma limpia y reproducible.

## Pipeline Básico

```python
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression

pipeline = Pipeline([
    ('scaler', StandardScaler()),
    ('classifier', LogisticRegression())
])

# Fit y predict como un solo objeto
pipeline.fit(X_train, y_train)
y_pred = pipeline.predict(X_test)
```

## Column Transformer

Para diferentes transformaciones por columna.

```python
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.impute import SimpleImputer

numeric_features = ['edad', 'salario', 'experiencia']
categorical_features = ['ciudad', 'educacion']

preprocessor = ColumnTransformer(
    transformers=[
        ('num', Pipeline([
            ('imputer', SimpleImputer(strategy='median')),
            ('scaler', StandardScaler())
        ]), numeric_features),
        
        ('cat', Pipeline([
            ('imputer', SimpleImputer(strategy='constant', fill_value='missing')),
            ('encoder', OneHotEncoder(handle_unknown='ignore'))
        ]), categorical_features)
    ]
)

# Pipeline completo
full_pipeline = Pipeline([
    ('preprocessor', preprocessor),
    ('classifier', RandomForestClassifier())
])

full_pipeline.fit(X_train, y_train)
```

## Con GridSearch

```python
from sklearn.model_selection import GridSearchCV

param_grid = {
    'preprocessor__num__imputer__strategy': ['mean', 'median'],
    'classifier__n_estimators': [100, 200],
    'classifier__max_depth': [5, 10, None]
}

grid_search = GridSearchCV(full_pipeline, param_grid, cv=5)
grid_search.fit(X_train, y_train)
```

## Custom Transformers

```python
from sklearn.base import BaseEstimator, TransformerMixin

class LogTransformer(BaseEstimator, TransformerMixin):
    def fit(self, X, y=None):
        return self
    
    def transform(self, X):
        return np.log1p(X)

# Usar en pipeline
pipeline = Pipeline([
    ('log', LogTransformer()),
    ('scaler', StandardScaler()),
    ('model', LogisticRegression())
])
```

## Guardar Pipeline

```python
import joblib

# Guardar
joblib.dump(pipeline, 'modelo_completo.pkl')

# Cargar
pipeline_cargado = joblib.load('modelo_completo.pkl')
```

## Ventajas

- Evita data leakage
- Código más limpio
- Fácil de reproducir
- GridSearch integrado

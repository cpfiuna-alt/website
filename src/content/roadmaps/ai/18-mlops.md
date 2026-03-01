---
id: "18"
title: "MLOps"
description: "Llevar modelos de ML a producción de forma confiable."
---

# MLOps

Prácticas para desplegar y mantener modelos de ML en producción.

## El ciclo MLOps

```
Datos → Entrenamiento → Evaluación → Deployment → Monitoreo
  ↑______________________________________________|
```

## Versionado de datos

```python
# DVC (Data Version Control)
# dvc init
# dvc add datos.csv
# git add datos.csv.dvc
# git commit -m "Add dataset v1"
```

## Experiment Tracking

### MLflow

```python
import mlflow

mlflow.set_experiment("mi_experimento")

with mlflow.start_run():
    # Entrenar modelo
    model.fit(X_train, y_train)
    
    # Log parámetros
    mlflow.log_param("n_estimators", 100)
    mlflow.log_param("max_depth", 5)
    
    # Log métricas
    mlflow.log_metric("accuracy", accuracy)
    mlflow.log_metric("f1_score", f1)
    
    # Log modelo
    mlflow.sklearn.log_model(model, "model")
```

### Weights & Biases

```python
import wandb

wandb.init(project="mi_proyecto")
wandb.config.learning_rate = 0.001

for epoch in range(epochs):
    train_loss = train()
    wandb.log({"loss": train_loss, "epoch": epoch})

wandb.finish()
```

## Model Registry

```python
# MLflow Model Registry
mlflow.register_model(
    "runs:/run_id/model",
    "mi_modelo"
)

# Promover a producción
client = mlflow.tracking.MlflowClient()
client.transition_model_version_stage(
    name="mi_modelo",
    version=1,
    stage="Production"
)
```

## Deployment

### FastAPI

```python
from fastapi import FastAPI
import joblib

app = FastAPI()
model = joblib.load("model.pkl")

@app.post("/predict")
def predict(data: dict):
    features = [data["feature1"], data["feature2"]]
    prediction = model.predict([features])
    return {"prediction": prediction[0]}
```

## Monitoreo

- Data drift
- Model drift
- Performance degradation
- Logging y alertas

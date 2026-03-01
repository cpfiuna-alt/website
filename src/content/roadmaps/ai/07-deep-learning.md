---
id: "7"
title: "Deep Learning"
description: "Redes neuronales profundas y frameworks modernos."
---

# Deep Learning

Redes neuronales con múltiples capas que aprenden representaciones jerárquicas.

## Por qué "Deep"

- Más capas = representaciones más abstractas
- Capa 1: bordes
- Capa 2: formas
- Capa 3: partes de objetos
- Capa 4: objetos completos

## Frameworks

### PyTorch

```python
import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader, TensorDataset

# Modelo
model = nn.Sequential(
    nn.Linear(784, 256),
    nn.ReLU(),
    nn.Dropout(0.2),
    nn.Linear(256, 128),
    nn.ReLU(),
    nn.Linear(128, 10)
)

# Mover a GPU si está disponible
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
model = model.to(device)
```

### TensorFlow/Keras

```python
import tensorflow as tf
from tensorflow import keras

model = keras.Sequential([
    keras.layers.Dense(256, activation='relu', input_shape=(784,)),
    keras.layers.Dropout(0.2),
    keras.layers.Dense(128, activation='relu'),
    keras.layers.Dense(10, activation='softmax')
])

model.compile(
    optimizer='adam',
    loss='categorical_crossentropy',
    metrics=['accuracy']
)

model.fit(X_train, y_train, epochs=10, batch_size=32, validation_split=0.2)
```

## Técnicas importantes

### Regularización

```python
# Dropout
nn.Dropout(0.5)

# L2 regularization
optimizer = optim.Adam(model.parameters(), weight_decay=1e-5)

# Batch Normalization
nn.BatchNorm1d(256)
```

### Learning Rate Scheduling

```python
scheduler = optim.lr_scheduler.StepLR(optimizer, step_size=10, gamma=0.1)
```

## GPUs

```python
# PyTorch
if torch.cuda.is_available():
    model = model.cuda()
    data = data.cuda()

# TensorFlow
# Detecta GPUs automáticamente
```

## Transfer Learning

Usar modelos pre-entrenados.

```python
from torchvision import models

resnet = models.resnet50(pretrained=True)
# Congelar capas
for param in resnet.parameters():
    param.requires_grad = False
```

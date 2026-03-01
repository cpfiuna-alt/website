---
id: "6"
title: "Redes Neuronales"
description: "Fundamentos de redes neuronales artificiales."
---

# Redes Neuronales

Modelos inspirados en el cerebro humano.

## Estructura básica

```
Input Layer → Hidden Layers → Output Layer
```

### Neurona artificial

```python
# Una neurona
output = activation(sum(inputs * weights) + bias)

# Funciones de activación
# ReLU: max(0, x)
# Sigmoid: 1 / (1 + e^-x)
# Tanh: (e^x - e^-x) / (e^x + e^-x)
```

## Red con PyTorch

```python
import torch
import torch.nn as nn

class MiRed(nn.Module):
    def __init__(self, input_size, hidden_size, output_size):
        super().__init__()
        self.fc1 = nn.Linear(input_size, hidden_size)
        self.relu = nn.ReLU()
        self.fc2 = nn.Linear(hidden_size, output_size)
    
    def forward(self, x):
        x = self.fc1(x)
        x = self.relu(x)
        x = self.fc2(x)
        return x

modelo = MiRed(784, 128, 10)
```

## Entrenamiento

### Forward pass
Calcular predicción.

### Backward pass (Backpropagation)
Calcular gradientes y actualizar pesos.

```python
criterion = nn.CrossEntropyLoss()
optimizer = torch.optim.Adam(modelo.parameters(), lr=0.001)

for epoch in range(epochs):
    for X_batch, y_batch in dataloader:
        # Forward
        outputs = modelo(X_batch)
        loss = criterion(outputs, y_batch)
        
        # Backward
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()
```

## Hiperparámetros

| Parámetro | Descripción |
|-----------|-------------|
| Learning rate | Velocidad de aprendizaje |
| Batch size | Ejemplos por actualización |
| Epochs | Pasadas por el dataset |
| Arquitectura | Número y tamaño de capas |

## Problemas comunes

- **Overfitting**: Usa dropout, regularización
- **Vanishing gradients**: Usa ReLU, batch norm
- **Entrenamiento lento**: Ajusta learning rate

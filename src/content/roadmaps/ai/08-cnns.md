---
id: "8"
title: "CNNs"
description: "Redes Neuronales Convolucionales para visión por computadora."
---

# CNNs - Convolutional Neural Networks

Diseñadas para procesar datos con estructura de grilla (imágenes).

## Arquitectura

```
Input → [Conv → ReLU → Pool] × n → Flatten → FC → Output
```

### Convolución

```python
import torch.nn as nn

# Capa convolucional
conv = nn.Conv2d(
    in_channels=3,      # RGB
    out_channels=32,    # filtros
    kernel_size=3,      # 3x3
    stride=1,
    padding=1
)
```

### Pooling

Reduce dimensionalidad, extrae features importantes.

```python
pool = nn.MaxPool2d(kernel_size=2, stride=2)
# 28x28 → 14x14
```

## Ejemplo completo

```python
class CNN(nn.Module):
    def __init__(self):
        super().__init__()
        self.conv1 = nn.Conv2d(1, 32, 3, padding=1)
        self.conv2 = nn.Conv2d(32, 64, 3, padding=1)
        self.pool = nn.MaxPool2d(2, 2)
        self.fc1 = nn.Linear(64 * 7 * 7, 128)
        self.fc2 = nn.Linear(128, 10)
        self.relu = nn.ReLU()
        
    def forward(self, x):
        x = self.pool(self.relu(self.conv1(x)))  # 28→14
        x = self.pool(self.relu(self.conv2(x)))  # 14→7
        x = x.view(-1, 64 * 7 * 7)  # flatten
        x = self.relu(self.fc1(x))
        x = self.fc2(x)
        return x
```

## Arquitecturas famosas

| Arquitectura | Año | Innovación |
|--------------|-----|------------|
| LeNet | 1998 | Primera CNN práctica |
| AlexNet | 2012 | Deep CNN, ReLU, Dropout |
| VGG | 2014 | Capas pequeñas (3x3) apiladas |
| ResNet | 2015 | Skip connections |
| EfficientNet | 2019 | Escalado eficiente |

## Transfer Learning

```python
from torchvision import models

# Cargar modelo pre-entrenado
resnet = models.resnet50(pretrained=True)

# Modificar última capa
resnet.fc = nn.Linear(resnet.fc.in_features, num_clases)
```

## Data Augmentation

```python
from torchvision import transforms

transform = transforms.Compose([
    transforms.RandomHorizontalFlip(),
    transforms.RandomRotation(10),
    transforms.ColorJitter(brightness=0.2),
    transforms.ToTensor()
])
```

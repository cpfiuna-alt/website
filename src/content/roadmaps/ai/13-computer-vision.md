---
id: "13"
title: "Computer Vision"
description: "Visión por computadora: clasificación, detección, segmentación."
---

# Computer Vision

Enseñar a las máquinas a "ver" y entender imágenes.

## Tareas principales

| Tarea | Descripción |
|-------|-------------|
| Clasificación | ¿Qué hay en la imagen? |
| Detección | ¿Dónde están los objetos? |
| Segmentación | ¿Qué píxeles pertenecen a qué? |
| Pose Estimation | ¿Dónde están las articulaciones? |

## Clasificación de imágenes

```python
from torchvision import models, transforms
from PIL import Image

# Modelo pre-entrenado
model = models.resnet50(pretrained=True)
model.eval()

# Preprocesar imagen
transform = transforms.Compose([
    transforms.Resize(256),
    transforms.CenterCrop(224),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406],
                         std=[0.229, 0.224, 0.225])
])

img = Image.open("gato.jpg")
img_tensor = transform(img).unsqueeze(0)

# Predecir
with torch.no_grad():
    outputs = model(img_tensor)
    _, predicted = outputs.max(1)
```

## Detección de objetos con YOLO

```python
from ultralytics import YOLO

# Cargar modelo
model = YOLO('yolov8n.pt')

# Detectar
results = model('imagen.jpg')

# Visualizar
results[0].show()

# Acceder a detecciones
for box in results[0].boxes:
    print(f"Clase: {box.cls}, Confianza: {box.conf}")
```

## Hugging Face para Vision

```python
from transformers import pipeline

# Clasificación
classifier = pipeline("image-classification")
result = classifier("imagen.jpg")

# Object Detection
detector = pipeline("object-detection")
objects = detector("imagen.jpg")

# Image Captioning
captioner = pipeline("image-to-text")
caption = captioner("imagen.jpg")
```

## OpenCV

```python
import cv2

# Leer imagen
img = cv2.imread('imagen.jpg')

# Convertir a gris
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

# Detectar bordes
edges = cv2.Canny(gray, 100, 200)

# Mostrar
cv2.imshow('Edges', edges)
cv2.waitKey(0)
```

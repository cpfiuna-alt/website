---
id: "10"
title: "Transformers"
description: "La arquitectura que revolucionó la IA moderna."
---

# Transformers

La arquitectura detrás de GPT, BERT, y la IA moderna.

## Attention is All You Need

Los Transformers reemplazan recurrencia con **atención**.

### Self-Attention

Cada token "atiende" a todos los demás tokens.

```
Attention(Q, K, V) = softmax(QK^T / √d_k) V
```

## Arquitectura

```
Input → Embedding + Positional Encoding
      → [Multi-Head Attention → Feed Forward] × N
      → Output
```

### Componentes

| Componente | Función |
|------------|---------|
| Embedding | Tokens a vectores |
| Positional Encoding | Información de posición |
| Multi-Head Attention | Atención en paralelo |
| Feed Forward | Transformación no lineal |
| Layer Norm | Estabiliza entrenamiento |

## Uso con Hugging Face

```python
from transformers import AutoTokenizer, AutoModel

# Cargar modelo pre-entrenado
tokenizer = AutoTokenizer.from_pretrained('bert-base-uncased')
model = AutoModel.from_pretrained('bert-base-uncased')

# Tokenizar texto
inputs = tokenizer("Hello, world!", return_tensors="pt")

# Forward pass
outputs = model(**inputs)
embeddings = outputs.last_hidden_state
```

## Modelos importantes

### Encoders (BERT-style)
Para entender texto: clasificación, NER, Q&A

```python
from transformers import pipeline

classifier = pipeline('sentiment-analysis')
result = classifier("I love this movie!")
```

### Decoders (GPT-style)
Para generar texto

```python
generator = pipeline('text-generation')
result = generator("Once upon a time")
```

### Encoder-Decoder (T5, BART)
Para traducción, resumen

## Fine-tuning

```python
from transformers import Trainer, TrainingArguments

training_args = TrainingArguments(
    output_dir='./results',
    num_train_epochs=3,
    per_device_train_batch_size=16
)

trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=train_dataset
)

trainer.train()
```

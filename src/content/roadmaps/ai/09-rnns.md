---
id: "9"
title: "RNNs y Secuencias"
description: "Redes Recurrentes para datos secuenciales."
---

# RNNs - Recurrent Neural Networks

Para datos secuenciales: texto, series de tiempo, audio.

## Idea básica

La salida depende de inputs anteriores (memoria).

```
h_t = f(h_{t-1}, x_t)
```

## RNN Simple

```python
import torch.nn as nn

class SimpleRNN(nn.Module):
    def __init__(self, input_size, hidden_size, output_size):
        super().__init__()
        self.rnn = nn.RNN(input_size, hidden_size, batch_first=True)
        self.fc = nn.Linear(hidden_size, output_size)
    
    def forward(self, x):
        out, hidden = self.rnn(x)
        out = self.fc(out[:, -1, :])  # último timestep
        return out
```

## Problemas de RNN

- **Vanishing gradients**: No puede recordar dependencias largas
- **Exploding gradients**: Gradientes crecen sin control

## LSTM (Long Short-Term Memory)

Resuelve vanishing gradients con "gates".

```python
class LSTMModel(nn.Module):
    def __init__(self, vocab_size, embed_size, hidden_size, num_classes):
        super().__init__()
        self.embedding = nn.Embedding(vocab_size, embed_size)
        self.lstm = nn.LSTM(embed_size, hidden_size, batch_first=True)
        self.fc = nn.Linear(hidden_size, num_classes)
    
    def forward(self, x):
        x = self.embedding(x)
        out, (h_n, c_n) = self.lstm(x)
        out = self.fc(h_n[-1])
        return out
```

## GRU (Gated Recurrent Unit)

Versión simplificada de LSTM.

```python
self.gru = nn.GRU(input_size, hidden_size, batch_first=True)
```

## Comparación

| Modelo | Parámetros | Memoria | Velocidad |
|--------|------------|---------|-----------|
| RNN | Menos | Corta | Rápido |
| LSTM | Más | Larga | Lento |
| GRU | Medio | Larga | Medio |

## Aplicaciones

- Clasificación de texto
- Traducción automática (seq2seq)
- Generación de texto
- Predicción de series temporales
- Reconocimiento de voz

---
id: "11"
title: "LLMs"
description: "Large Language Models: GPT, LLaMA, y modelos de lenguaje masivos."
---

# Large Language Models (LLMs)

Modelos de lenguaje con billones de parámetros.

## ¿Qué son?

LLMs son Transformers entrenados en cantidades masivas de texto.

```
GPT-3: 175 billion parámetros
GPT-4: ~1 trillion parámetros (estimado)
LLaMA 2: 7B - 70B parámetros
```

## Modelos importantes

| Modelo | Empresa | Acceso |
|--------|---------|--------|
| GPT-4 | OpenAI | API de pago |
| Claude | Anthropic | API |
| LLaMA 2 | Meta | Open source |
| Gemini | Google | API |
| Mistral | Mistral AI | Open source |

## Usando la API de OpenAI

```python
from openai import OpenAI

client = OpenAI(api_key="tu-api-key")

response = client.chat.completions.create(
    model="gpt-4",
    messages=[
        {"role": "system", "content": "Eres un asistente útil."},
        {"role": "user", "content": "Explica qué es machine learning"}
    ]
)

print(response.choices[0].message.content)
```

## Modelos locales con Ollama

```bash
# Instalar Ollama
ollama run llama2

# En Python
import ollama

response = ollama.chat(model='llama2', messages=[
    {'role': 'user', 'content': 'Hola, ¿cómo estás?'}
])
```

## Prompt Engineering

El arte de escribir buenos prompts.

```python
# Malo
prompt = "Escribe un email"

# Bueno
prompt = """
Eres un profesional de marketing. Escribe un email promocional para:
- Producto: Curso de Python
- Audiencia: Principiantes
- Tono: Amigable pero profesional
- Longitud: 150 palabras máximo
"""
```

## Técnicas

- **Zero-shot**: Sin ejemplos
- **Few-shot**: Con ejemplos
- **Chain of Thought**: Paso a paso
- **RAG**: Retrieval Augmented Generation

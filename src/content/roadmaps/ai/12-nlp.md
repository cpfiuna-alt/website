---
id: "12"
title: "NLP"
description: "Procesamiento de Lenguaje Natural con técnicas modernas."
---

# NLP - Natural Language Processing

Hacer que las máquinas entiendan y generen lenguaje humano.

## Tareas de NLP

| Tarea | Descripción |
|-------|-------------|
| Clasificación | Sentimiento, spam, categorías |
| NER | Identificar entidades (nombres, lugares) |
| Q&A | Responder preguntas |
| Traducción | Idioma a idioma |
| Resumen | Texto largo a corto |
| Generación | Crear texto nuevo |

## Tokenización

```python
from transformers import AutoTokenizer

tokenizer = AutoTokenizer.from_pretrained('bert-base-uncased')

text = "Hello, how are you?"
tokens = tokenizer.tokenize(text)
# ['hello', ',', 'how', 'are', 'you', '?']

ids = tokenizer.encode(text)
# [101, 7592, 1010, 2129, 2024, 2017, 136, 102]
```

## Clasificación de texto

```python
from transformers import pipeline

classifier = pipeline("sentiment-analysis")
result = classifier("I love this product!")
# [{'label': 'POSITIVE', 'score': 0.9998}]

# Clasificación personalizada
classifier = pipeline("zero-shot-classification")
result = classifier(
    "Este artículo habla sobre economía",
    candidate_labels=["política", "deportes", "economía", "tecnología"]
)
```

## Named Entity Recognition

```python
ner = pipeline("ner", grouped_entities=True)
text = "Steve Jobs fundó Apple en California"
entities = ner(text)
# [{'entity_group': 'PER', 'word': 'Steve Jobs'},
#  {'entity_group': 'ORG', 'word': 'Apple'},
#  {'entity_group': 'LOC', 'word': 'California'}]
```

## Embeddings

```python
from sentence_transformers import SentenceTransformer

model = SentenceTransformer('all-MiniLM-L6-v2')

sentences = ["Hola mundo", "Hello world"]
embeddings = model.encode(sentences)

# Similitud semántica
from sklearn.metrics.pairwise import cosine_similarity
similarity = cosine_similarity([embeddings[0]], [embeddings[1]])
```

## spaCy

```python
import spacy

nlp = spacy.load("es_core_news_sm")
doc = nlp("Apple fue fundada por Steve Jobs")

for token in doc:
    print(token.text, token.pos_, token.dep_)
```

---
id: "15"
title: "RAG"
description: "Retrieval Augmented Generation: combinar búsqueda con generación."
---

# RAG - Retrieval Augmented Generation

Combinar conocimiento externo con LLMs para respuestas precisas.

## ¿Por qué RAG?

Los LLMs tienen limitaciones:
- Conocimiento desactualizado (cutoff date)
- Alucinaciones
- No conocen tus datos privados

RAG resuelve esto buscando información relevante antes de generar.

## Arquitectura

```
Query → Embedding → Vector Search → Contexto → LLM → Respuesta
```

## Implementación con LangChain

```python
from langchain.document_loaders import TextLoader
from langchain.text_splitter import CharacterTextSplitter
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import Chroma
from langchain.chains import RetrievalQA
from langchain.llms import OpenAI

# 1. Cargar documentos
loader = TextLoader('documento.txt')
documents = loader.load()

# 2. Dividir en chunks
splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
texts = splitter.split_documents(documents)

# 3. Crear embeddings y vector store
embeddings = OpenAIEmbeddings()
vectorstore = Chroma.from_documents(texts, embeddings)

# 4. Crear cadena de Q&A
qa = RetrievalQA.from_chain_type(
    llm=OpenAI(),
    chain_type="stuff",
    retriever=vectorstore.as_retriever()
)

# 5. Hacer preguntas
response = qa.run("¿Cuál es el tema principal del documento?")
```

## Vector Databases

| Base de datos | Características |
|---------------|-----------------|
| Chroma | Simple, local |
| Pinecone | Cloud, escalable |
| Weaviate | Open source, features avanzados |
| Qdrant | Rust, rápido |

## Embeddings

```python
from sentence_transformers import SentenceTransformer

model = SentenceTransformer('all-MiniLM-L6-v2')
embeddings = model.encode(["texto 1", "texto 2"])
```

## Tips

- Chunk size importa (experimenta)
- Overlap evita perder contexto
- Metadata ayuda a filtrar
- Evalúa calidad de retrieval

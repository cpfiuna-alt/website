---
id: "20"
title: "NLP Básico"
description: "Introducción al procesamiento de lenguaje natural."
---

# NLP - Natural Language Processing

Trabajar con datos de texto.

## Preprocesamiento de Texto

```python
import re
import nltk
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer

nltk.download('stopwords')
nltk.download('wordnet')

def limpiar_texto(texto):
    # Minúsculas
    texto = texto.lower()
    
    # Remover caracteres especiales
    texto = re.sub(r'[^a-záéíóúñ\s]', '', texto)
    
    # Tokenizar
    tokens = texto.split()
    
    # Remover stopwords
    stop_words = set(stopwords.words('spanish'))
    tokens = [t for t in tokens if t not in stop_words]
    
    # Lematización
    lemmatizer = WordNetLemmatizer()
    tokens = [lemmatizer.lemmatize(t) for t in tokens]
    
    return ' '.join(tokens)
```

## Bag of Words

```python
from sklearn.feature_extraction.text import CountVectorizer

vectorizer = CountVectorizer(max_features=1000)
X = vectorizer.fit_transform(textos)

# Ver vocabulario
print(vectorizer.get_feature_names_out())
```

## TF-IDF

Pondera palabras por importancia.

```python
from sklearn.feature_extraction.text import TfidfVectorizer

tfidf = TfidfVectorizer(max_features=1000, ngram_range=(1, 2))
X = tfidf.fit_transform(textos)
```

## Clasificación de Texto

```python
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import Pipeline

# Pipeline completo
text_clf = Pipeline([
    ('tfidf', TfidfVectorizer()),
    ('clf', MultinomialNB())
])

text_clf.fit(X_train, y_train)
predictions = text_clf.predict(X_test)
```

## Análisis de Sentimientos

```python
from textblob import TextBlob

def get_sentiment(text):
    blob = TextBlob(text)
    return blob.sentiment.polarity  # -1 a 1

df['sentimiento'] = df['texto'].apply(get_sentiment)
```

## Word Embeddings

Representaciones densas de palabras.

```python
from gensim.models import Word2Vec

# Entrenar
sentences = [texto.split() for texto in textos]
model = Word2Vec(sentences, vector_size=100, window=5, min_count=2)

# Vector de una palabra
vector = model.wv['python']

# Palabras similares
similares = model.wv.most_similar('python')
```

## Librerías Modernas

- **spaCy**: NLP industrial
- **Hugging Face**: Modelos pre-entrenados (BERT, GPT)
- **NLTK**: Educativo y completo

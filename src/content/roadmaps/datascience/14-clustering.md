---
id: "14"
title: "Clustering"
description: "Aprendizaje no supervisado para agrupar datos similares."
---

# Clustering

Agrupar datos sin etiquetas previas.

## K-Means

El algoritmo más popular.

```python
from sklearn.cluster import KMeans
import matplotlib.pyplot as plt

# Crear modelo
kmeans = KMeans(n_clusters=3, random_state=42)
kmeans.fit(X)

# Etiquetas asignadas
labels = kmeans.labels_
centroids = kmeans.cluster_centers_

# Visualizar (2D)
plt.scatter(X[:, 0], X[:, 1], c=labels, cmap='viridis')
plt.scatter(centroids[:, 0], centroids[:, 1], 
            c='red', marker='X', s=200)
plt.show()
```

## Elegir número de clusters

### Método del Codo

```python
inertias = []
K_range = range(1, 11)

for k in K_range:
    kmeans = KMeans(n_clusters=k, random_state=42)
    kmeans.fit(X)
    inertias.append(kmeans.inertia_)

plt.plot(K_range, inertias, 'bo-')
plt.xlabel('Número de clusters')
plt.ylabel('Inercia')
plt.title('Método del Codo')
plt.show()
```

### Silhouette Score

```python
from sklearn.metrics import silhouette_score

for k in range(2, 11):
    kmeans = KMeans(n_clusters=k, random_state=42)
    labels = kmeans.fit_predict(X)
    score = silhouette_score(X, labels)
    print(f"k={k}: Silhouette = {score:.3f}")
```

## DBSCAN

Encuentra clusters de forma arbitraria, detecta outliers.

```python
from sklearn.cluster import DBSCAN

dbscan = DBSCAN(eps=0.5, min_samples=5)
labels = dbscan.fit_predict(X)

# -1 significa outlier
n_outliers = (labels == -1).sum()
print(f"Outliers: {n_outliers}")
```

## Hierarchical Clustering

```python
from sklearn.cluster import AgglomerativeClustering
from scipy.cluster.hierarchy import dendrogram, linkage

# Dendrograma
Z = linkage(X, method='ward')
plt.figure(figsize=(12, 5))
dendrogram(Z)
plt.show()

# Clustering
hc = AgglomerativeClustering(n_clusters=3)
labels = hc.fit_predict(X)
```

## Comparación

| Algoritmo | Ventajas | Desventajas |
|-----------|----------|-------------|
| K-Means | Rápido, escalable | Requiere K, clusters esféricos |
| DBSCAN | Detecta outliers, formas arbitrarias | Sensible a parámetros |
| Hierarchical | No requiere K, dendrograma | Lento para datos grandes |

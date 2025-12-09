---
id: "5"
title: "ML No Supervisado"
description: "Aprendizaje no supervisado: clustering y reducción dimensional."
---

# Aprendizaje No Supervisado

Encontrar patrones en datos sin etiquetas.

## Clustering

Agrupar datos similares.

### K-Means

```python
from sklearn.cluster import KMeans

kmeans = KMeans(n_clusters=3, random_state=42)
clusters = kmeans.fit_predict(X)

# Centroides
centroids = kmeans.cluster_centers_
```

### Elegir número de clusters

```python
# Método del codo
inertias = []
for k in range(1, 11):
    km = KMeans(n_clusters=k)
    km.fit(X)
    inertias.append(km.inertia_)

plt.plot(range(1, 11), inertias, 'bo-')
plt.xlabel('k')
plt.ylabel('Inertia')
plt.show()
```

### DBSCAN

```python
from sklearn.cluster import DBSCAN

dbscan = DBSCAN(eps=0.5, min_samples=5)
labels = dbscan.fit_predict(X)
# -1 = outliers
```

## Reducción Dimensional

Reducir el número de features manteniendo información.

### PCA (Principal Component Analysis)

```python
from sklearn.decomposition import PCA

pca = PCA(n_components=2)
X_reduced = pca.fit_transform(X)

# Varianza explicada
print(pca.explained_variance_ratio_)
```

### t-SNE (Visualización)

```python
from sklearn.manifold import TSNE

tsne = TSNE(n_components=2, random_state=42)
X_tsne = tsne.fit_transform(X)

plt.scatter(X_tsne[:, 0], X_tsne[:, 1], c=labels)
plt.show()
```

## Detección de Anomalías

```python
from sklearn.ensemble import IsolationForest

iso = IsolationForest(contamination=0.1)
outliers = iso.fit_predict(X)
# -1 = anomalía
```

## Aplicaciones

| Técnica | Uso |
|---------|-----|
| Clustering | Segmentación de clientes |
| PCA | Compresión, visualización |
| Anomaly Detection | Fraude, fallas |

---
id: "14"
title: "Shortest Path"
description: "Algoritmos de camino más corto: Dijkstra, Bellman-Ford, Floyd-Warshall."
---

# Shortest Path

Encontrar el camino más corto entre nodos.

## Dijkstra (Pesos no negativos)

O((V + E) log V) con priority queue.

```cpp
vector<long long> dijkstra(int start) {
    vector<long long> dist(n, LLONG_MAX);
    priority_queue<pair<long long, int>, 
                   vector<pair<long long, int>>,
                   greater<pair<long long, int>>> pq;
    
    dist[start] = 0;
    pq.push({0, start});
    
    while (!pq.empty()) {
        auto [d, u] = pq.top();
        pq.pop();
        
        if (d > dist[u]) continue;  // ya procesado con menor dist
        
        for (auto [v, w] : adj[u]) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                pq.push({dist[v], v});
            }
        }
    }
    
    return dist;
}
```

## Bellman-Ford (Permite pesos negativos)

O(V * E). Detecta ciclos negativos.

```cpp
vector<long long> bellmanFord(int start) {
    vector<long long> dist(n, LLONG_MAX);
    dist[start] = 0;
    
    for (int i = 0; i < n - 1; i++) {
        for (auto [u, v, w] : edges) {
            if (dist[u] != LLONG_MAX && dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
            }
        }
    }
    
    // Detectar ciclo negativo
    for (auto [u, v, w] : edges) {
        if (dist[u] != LLONG_MAX && dist[u] + w < dist[v]) {
            // Hay ciclo negativo
        }
    }
    
    return dist;
}
```

## Floyd-Warshall (Todos a todos)

O(V³). Útil para grafos pequeños.

```cpp
// dist[i][j] = peso de i a j, INF si no hay arista
for (int k = 0; k < n; k++) {
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            if (dist[i][k] != INF && dist[k][j] != INF) {
                dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]);
            }
        }
    }
}
```

## Cuándo usar cada uno

| Algoritmo | Cuando |
|-----------|--------|
| BFS | Sin pesos |
| Dijkstra | Pesos ≥ 0 |
| Bellman-Ford | Pesos negativos |
| Floyd-Warshall | Todos a todos, n ≤ 400 |

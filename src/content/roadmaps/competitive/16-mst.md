---
id: "16"
title: "MST"
description: "Minimum Spanning Tree con Kruskal y Prim."
---

# Minimum Spanning Tree (MST)

Conectar todos los nodos con el mínimo costo total.

## Propiedades

- Árbol con n-1 aristas para n nodos
- Suma de pesos mínima
- Puede haber múltiples MSTs con mismo peso

## Kruskal's Algorithm

Ordena aristas y une si no crea ciclo. O(E log E).

```cpp
long long kruskal(int n, vector<tuple<int, int, int>>& edges) {
    // edges = {u, v, weight}
    sort(edges.begin(), edges.end(), [](auto& a, auto& b) {
        return get<2>(a) < get<2>(b);
    });
    
    DSU dsu(n);
    long long mstWeight = 0;
    
    for (auto [u, v, w] : edges) {
        if (dsu.unite(u, v)) {
            mstWeight += w;
        }
    }
    
    return mstWeight;
}
```

## Prim's Algorithm

Crece el árbol desde un nodo. O((V + E) log V) con heap.

```cpp
long long prim(int n, vector<vector<pair<int, int>>>& adj) {
    vector<bool> inMST(n, false);
    priority_queue<pair<int, int>, 
                   vector<pair<int, int>>,
                   greater<pair<int, int>>> pq;
    
    pq.push({0, 0});  // {weight, node}
    long long mstWeight = 0;
    int nodesInMST = 0;
    
    while (!pq.empty() && nodesInMST < n) {
        auto [w, u] = pq.top();
        pq.pop();
        
        if (inMST[u]) continue;
        
        inMST[u] = true;
        mstWeight += w;
        nodesInMST++;
        
        for (auto [v, weight] : adj[u]) {
            if (!inMST[v]) {
                pq.push({weight, v});
            }
        }
    }
    
    return mstWeight;
}
```

## Cuándo usar cada uno

| Kruskal | Prim |
|---------|------|
| Grafo sparse | Grafo denso |
| Lista de aristas | Lista de adyacencia |
| Fácil con DSU | Más complejo |

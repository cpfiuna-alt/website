---
id: "15"
title: "Union-Find"
description: "Disjoint Set Union para componentes conexas dinámicas."
---

# Union-Find (DSU)

Maneja conjuntos disjuntos eficientemente. Operaciones casi O(1).

## Implementación

```cpp
class DSU {
public:
    vector<int> parent, rank;
    
    DSU(int n) {
        parent.resize(n);
        rank.resize(n, 0);
        for (int i = 0; i < n; i++) {
            parent[i] = i;
        }
    }
    
    int find(int x) {
        if (parent[x] != x) {
            parent[x] = find(parent[x]);  // path compression
        }
        return parent[x];
    }
    
    bool unite(int x, int y) {
        int px = find(x), py = find(y);
        if (px == py) return false;  // ya conectados
        
        // union by rank
        if (rank[px] < rank[py]) swap(px, py);
        parent[py] = px;
        if (rank[px] == rank[py]) rank[px]++;
        
        return true;
    }
    
    bool connected(int x, int y) {
        return find(x) == find(y);
    }
};
```

## Uso

```cpp
DSU dsu(n);

// Unir nodos
dsu.unite(0, 1);
dsu.unite(2, 3);
dsu.unite(1, 2);

// Verificar conexión
if (dsu.connected(0, 3)) {
    cout << "Conectados!\n";
}
```

## Kruskal's MST

```cpp
// Árbol de expansión mínima
long long kruskal(vector<tuple<int, int, int>>& edges, int n) {
    sort(edges.begin(), edges.end(), [](auto& a, auto& b) {
        return get<2>(a) < get<2>(b);  // ordenar por peso
    });
    
    DSU dsu(n);
    long long mstWeight = 0;
    int edgesUsed = 0;
    
    for (auto [u, v, w] : edges) {
        if (dsu.unite(u, v)) {
            mstWeight += w;
            edgesUsed++;
            if (edgesUsed == n - 1) break;
        }
    }
    
    return mstWeight;
}
```

## Aplicaciones

- Componentes conexas dinámicas
- Kruskal's MST
- Detectar ciclos
- Problemas de conectividad offline

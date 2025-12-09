---
id: "12"
title: "Grafos Intro"
description: "Introducción a grafos: representación y conceptos básicos."
---

# Grafos - Introducción

Un grafo G = (V, E) tiene vértices (nodos) y aristas (conexiones).

## Tipos de Grafos

| Tipo | Descripción |
|------|-------------|
| Dirigido | Aristas tienen dirección (A → B) |
| No dirigido | Aristas bidireccionales |
| Ponderado | Aristas tienen peso |
| Árbol | Grafo conexo sin ciclos |
| DAG | Directed Acyclic Graph |

## Representaciones

### Lista de Adyacencia (Recomendada)

```cpp
int n, m;  // n nodos, m aristas
vector<vector<int>> adj(n);

// Leer aristas (no dirigido)
for (int i = 0; i < m; i++) {
    int u, v;
    cin >> u >> v;
    u--; v--;  // 0-indexed
    adj[u].push_back(v);
    adj[v].push_back(u);
}

// Con pesos
vector<vector<pair<int, int>>> adj(n);  // {vecino, peso}
adj[u].push_back({v, w});
```

### Matriz de Adyacencia

```cpp
vector<vector<int>> adj(n, vector<int>(n, 0));
adj[u][v] = 1;  // o el peso

// Útil para grafos densos
// O(n²) espacio
```

### Lista de Aristas

```cpp
vector<tuple<int, int, int>> edges;  // {u, v, peso}
edges.push_back({u, v, w});

// Útil para Kruskal
```

## Terminología

- **Grado**: Número de aristas de un nodo
- **Camino**: Secuencia de nodos conectados
- **Ciclo**: Camino que empieza y termina en el mismo nodo
- **Componente conexa**: Subgrafo donde todos están conectados

## Problemas Comunes

- Recorridos (BFS, DFS)
- Camino más corto
- Árbol de expansión mínima
- Detección de ciclos
- Ordenamiento topológico

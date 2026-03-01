---
id: "13"
title: "BFS / DFS"
description: "Recorridos fundamentales: Breadth-First y Depth-First Search."
---

# BFS y DFS

Los dos recorridos fundamentales de grafos.

## DFS (Depth-First Search)

Explora lo más profundo posible antes de retroceder.

```cpp
vector<bool> visited(n, false);

void dfs(int u) {
    visited[u] = true;
    // Procesar nodo u
    
    for (int v : adj[u]) {
        if (!visited[v]) {
            dfs(v);
        }
    }
}

// Llamar
dfs(0);
```

### DFS Iterativo

```cpp
void dfsIterative(int start) {
    stack<int> st;
    st.push(start);
    
    while (!st.empty()) {
        int u = st.top();
        st.pop();
        
        if (visited[u]) continue;
        visited[u] = true;
        
        for (int v : adj[u]) {
            if (!visited[v]) {
                st.push(v);
            }
        }
    }
}
```

## BFS (Breadth-First Search)

Explora por niveles, encuentra camino más corto en grafos sin peso.

```cpp
vector<int> bfs(int start) {
    vector<int> dist(n, -1);
    queue<int> q;
    
    dist[start] = 0;
    q.push(start);
    
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        
        for (int v : adj[u]) {
            if (dist[v] == -1) {
                dist[v] = dist[u] + 1;
                q.push(v);
            }
        }
    }
    
    return dist;
}
```

## Comparación

| Aspecto | DFS | BFS |
|---------|-----|-----|
| Estructura | Stack (recursión) | Queue |
| Espacio | O(h) altura | O(ancho) |
| Camino corto | ❌ | ✅ (sin peso) |
| Ciclos | ✅ | ✅ |
| Componentes | ✅ | ✅ |

## Contar Componentes Conexas

```cpp
int countComponents() {
    int count = 0;
    vector<bool> visited(n, false);
    
    for (int i = 0; i < n; i++) {
        if (!visited[i]) {
            dfs(i);  // o bfs(i)
            count++;
        }
    }
    
    return count;
}
```

---
id: "5"
title: "STL"
description: "Standard Template Library de C++: estructuras de datos esenciales."
---

# STL - Standard Template Library

La STL es tu mejor amiga en competencias.

## Contenedores Secuenciales

```cpp
// Vector - array dinámico
vector<int> v = {1, 2, 3};
v.push_back(4);      // O(1) amortizado
v.pop_back();        // O(1)
v[0];                // O(1)
v.size();            // O(1)

// String
string s = "hello";
s += " world";       // concatenar
s.substr(0, 5);      // "hello"
s.find("lo");        // 3

// Deque - doble cola
deque<int> dq;
dq.push_front(1);    // O(1)
dq.push_back(2);     // O(1)
```

## Contenedores Asociativos

```cpp
// Set - elementos únicos ordenados
set<int> s;
s.insert(5);         // O(log n)
s.count(5);          // O(log n), retorna 0 o 1
s.erase(5);          // O(log n)

// Map - key-value ordenado
map<string, int> m;
m["uno"] = 1;
m["dos"] = 2;
for (auto& [key, val] : m) { ... }

// Unordered (hash) - O(1) promedio
unordered_set<int> us;
unordered_map<string, int> um;
```

## Otros Contenedores

```cpp
// Priority Queue (max-heap por defecto)
priority_queue<int> pq;
pq.push(5);
pq.top();  // máximo
pq.pop();

// Min-heap
priority_queue<int, vector<int>, greater<int>> minPq;

// Stack y Queue
stack<int> st;
queue<int> q;
```

## Algoritmos Útiles

```cpp
sort(v.begin(), v.end());
reverse(v.begin(), v.end());
*max_element(v.begin(), v.end());
*min_element(v.begin(), v.end());
accumulate(v.begin(), v.end(), 0LL);
binary_search(v.begin(), v.end(), x);
lower_bound(v.begin(), v.end(), x);
upper_bound(v.begin(), v.end(), x);
```

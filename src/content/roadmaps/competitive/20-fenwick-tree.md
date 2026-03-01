---
id: "20"
title: "Fenwick Tree"
description: "Binary Indexed Tree para sumas de prefijos eficientes."
---

# Fenwick Tree (BIT)

Más simple que Segment Tree para ciertos problemas. O(log n) para query y update.

## Implementación

```cpp
class BIT {
    vector<long long> tree;
    int n;
    
public:
    BIT(int n) : n(n), tree(n + 1, 0) {}
    
    // Suma val a la posición i (1-indexed)
    void update(int i, long long val) {
        for (; i <= n; i += i & (-i)) {
            tree[i] += val;
        }
    }
    
    // Suma del prefijo [1, i]
    long long query(int i) {
        long long sum = 0;
        for (; i > 0; i -= i & (-i)) {
            sum += tree[i];
        }
        return sum;
    }
    
    // Suma del rango [l, r] (1-indexed)
    long long query(int l, int r) {
        return query(r) - query(l - 1);
    }
};
```

## Construcción desde Array

```cpp
// O(n log n)
BIT bit(n);
for (int i = 0; i < n; i++) {
    bit.update(i + 1, arr[i]);  // 1-indexed
}

// O(n) más eficiente
BIT(vector<int>& arr) {
    n = arr.size();
    tree.resize(n + 1, 0);
    for (int i = 1; i <= n; i++) {
        tree[i] += arr[i-1];
        int j = i + (i & (-i));
        if (j <= n) tree[j] += tree[i];
    }
}
```

## Comparación con Segment Tree

| Aspecto | BIT | Segment Tree |
|---------|-----|--------------|
| Código | Muy corto | Más largo |
| Memoria | n | 4n |
| Operaciones | Suma prefijo | Cualquiera |
| Range update | Con 2 BITs | Lazy propagation |

## Aplicaciones

- Sumas de prefijos dinámicas
- Contar inversiones
- Queries de frecuencia

## Contar Inversiones

```cpp
long long countInversions(vector<int>& arr) {
    int n = arr.size();
    // Coordinate compression
    vector<int> sorted = arr;
    sort(sorted.begin(), sorted.end());
    sorted.erase(unique(sorted.begin(), sorted.end()), sorted.end());
    
    map<int, int> comp;
    for (int i = 0; i < sorted.size(); i++) {
        comp[sorted[i]] = i + 1;
    }
    
    BIT bit(sorted.size());
    long long inversions = 0;
    
    for (int i = n - 1; i >= 0; i--) {
        inversions += bit.query(comp[arr[i]] - 1);
        bit.update(comp[arr[i]], 1);
    }
    
    return inversions;
}
```

---
id: "19"
title: "Segment Tree"
description: "Estructura de datos para queries y updates en rangos."
---

# Segment Tree

Queries y updates en rangos en O(log n).

## Segment Tree Básico

```cpp
class SegmentTree {
    vector<long long> tree;
    int n;
    
public:
    SegmentTree(vector<int>& arr) {
        n = arr.size();
        tree.resize(4 * n);
        build(arr, 1, 0, n - 1);
    }
    
    void build(vector<int>& arr, int v, int tl, int tr) {
        if (tl == tr) {
            tree[v] = arr[tl];
        } else {
            int tm = (tl + tr) / 2;
            build(arr, 2*v, tl, tm);
            build(arr, 2*v+1, tm+1, tr);
            tree[v] = tree[2*v] + tree[2*v+1];
        }
    }
    
    long long query(int v, int tl, int tr, int l, int r) {
        if (l > r) return 0;
        if (l == tl && r == tr) return tree[v];
        
        int tm = (tl + tr) / 2;
        return query(2*v, tl, tm, l, min(r, tm)) +
               query(2*v+1, tm+1, tr, max(l, tm+1), r);
    }
    
    void update(int v, int tl, int tr, int pos, int val) {
        if (tl == tr) {
            tree[v] = val;
        } else {
            int tm = (tl + tr) / 2;
            if (pos <= tm) {
                update(2*v, tl, tm, pos, val);
            } else {
                update(2*v+1, tm+1, tr, pos, val);
            }
            tree[v] = tree[2*v] + tree[2*v+1];
        }
    }
    
    // Wrappers
    long long query(int l, int r) {
        return query(1, 0, n-1, l, r);
    }
    
    void update(int pos, int val) {
        update(1, 0, n-1, pos, val);
    }
};
```

## Uso

```cpp
vector<int> arr = {1, 3, 5, 7, 9, 11};
SegmentTree st(arr);

cout << st.query(1, 3) << "\n";  // 3+5+7 = 15
st.update(2, 10);                 // arr[2] = 10
cout << st.query(1, 3) << "\n";  // 3+10+7 = 20
```

## Variantes

| Variante | Uso |
|----------|-----|
| Sum | Suma de rango |
| Min/Max | Mínimo/máximo de rango |
| Lazy Propagation | Range updates |
| 2D | Matrices |

## Lazy Propagation

Para range updates en O(log n).

```cpp
// Agregar valor a todos en rango [l, r]
void rangeUpdate(int v, int tl, int tr, int l, int r, int val) {
    if (l > r) return;
    if (l == tl && tr == r) {
        tree[v] += val;
        lazy[v] += val;
    } else {
        pushDown(v);
        int tm = (tl + tr) / 2;
        rangeUpdate(2*v, tl, tm, l, min(r, tm), val);
        rangeUpdate(2*v+1, tm+1, tr, max(l, tm+1), r, val);
        tree[v] = tree[2*v] + tree[2*v+1];
    }
}
```

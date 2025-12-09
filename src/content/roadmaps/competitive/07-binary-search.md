---
id: "7"
title: "Binary Search"
description: "Búsqueda binaria: la técnica más importante en CP."
---

# Binary Search

Reduce el espacio de búsqueda a la mitad en cada paso. O(log n).

## Búsqueda Clásica

```cpp
// Buscar x en array ordenado
int binarySearch(vector<int>& arr, int x) {
    int l = 0, r = arr.size() - 1;
    
    while (l <= r) {
        int mid = l + (r - l) / 2;  // evita overflow
        
        if (arr[mid] == x) return mid;
        if (arr[mid] < x) l = mid + 1;
        else r = mid - 1;
    }
    
    return -1;  // no encontrado
}
```

## Lower/Upper Bound

```cpp
vector<int> v = {1, 2, 2, 2, 5, 7};

// Primer elemento >= x
auto it = lower_bound(v.begin(), v.end(), 2);
// *it = 2, índice = 1

// Primer elemento > x
auto it2 = upper_bound(v.begin(), v.end(), 2);
// *it2 = 5, índice = 4

// Contar elementos == x
int count = upper_bound(..., x) - lower_bound(..., x);
```

## Binary Search on Answer

¡El patrón más poderoso!

```cpp
// "¿Cuál es el mínimo k tal que check(k) es true?"
int l = MIN_ANSWER, r = MAX_ANSWER;

while (l < r) {
    int mid = (l + r) / 2;
    if (check(mid)) {
        r = mid;      // mid podría ser la respuesta
    } else {
        l = mid + 1;  // necesitamos algo mayor
    }
}

// l es la respuesta
```

## Ejemplo: Dividir Array

```cpp
// Mínimo máximo de suma al dividir en k partes
bool canDivide(vector<int>& arr, int k, long long maxSum) {
    int parts = 1;
    long long currentSum = 0;
    for (int x : arr) {
        if (currentSum + x > maxSum) {
            parts++;
            currentSum = x;
        } else {
            currentSum += x;
        }
    }
    return parts <= k;
}
```

## Tips

- Cuidado con overflow: usa `l + (r - l) / 2`
- Define claramente qué busca: ≥, >, primer true, etc.
- Verifica los casos borde (l y r iniciales)

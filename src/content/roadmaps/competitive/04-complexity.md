---
id: "4"
title: "Complejidad"
description: "Análisis de complejidad temporal y espacial de algoritmos."
---

# Complejidad Algorítmica

Entender Big O es fundamental para saber si tu solución pasará.

## Notación Big O

| Complejidad | Nombre | n = 10⁶ |
|-------------|--------|---------|
| O(1) | Constante | ✅ Instantáneo |
| O(log n) | Logarítmica | ✅ ~20 ops |
| O(n) | Lineal | ✅ 10⁶ ops |
| O(n log n) | Linearítmica | ✅ ~2×10⁷ ops |
| O(n²) | Cuadrática | ❌ 10¹² ops |
| O(2ⁿ) | Exponencial | ❌ Imposible |

## Regla del 10⁸

Una computadora hace ~10⁸ operaciones por segundo.

```
Si n = 10⁵ y tiempo = 1s:
- O(n²) = 10¹⁰ → TLE ❌
- O(n log n) = ~10⁶ → OK ✅
```

## Ejemplos

```cpp
// O(n)
for (int i = 0; i < n; i++) {
    // operación simple
}

// O(n²)
for (int i = 0; i < n; i++) {
    for (int j = 0; j < n; j++) {
        // operación
    }
}

// O(log n) - Binary search
while (l < r) {
    int mid = (l + r) / 2;
    if (check(mid)) r = mid;
    else l = mid + 1;
}

// O(n log n) - Sorting
sort(arr.begin(), arr.end());
```

## Qué complejidad usar según n

| n máximo | Complejidad máxima |
|----------|-------------------|
| n ≤ 10 | O(n!) |
| n ≤ 20 | O(2ⁿ) |
| n ≤ 500 | O(n³) |
| n ≤ 5000 | O(n²) |
| n ≤ 10⁶ | O(n log n) |
| n ≤ 10⁸ | O(n) |

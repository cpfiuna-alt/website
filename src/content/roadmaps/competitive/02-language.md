---
id: "2"
title: "Lenguaje"
description: "Elige tu lenguaje para competencias: C++, Python, o Java."
---

# Lenguaje de Programación

La elección del lenguaje importa en competencias.

## C++ (Recomendado)

El estándar de la industria competitiva.

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    int n;
    cin >> n;
    
    vector<int> arr(n);
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
    }
    
    sort(arr.begin(), arr.end());
    
    for (int x : arr) {
        cout << x << " ";
    }
    
    return 0;
}
```

### Ventajas de C++
- Más rápido (crucial en tiempo límite)
- STL: estructuras de datos listas
- Estándar en ICPC y la mayoría de contests

## Python

Bueno para prototipar, pero puede ser lento.

```python
n = int(input())
arr = list(map(int, input().split()))
arr.sort()
print(*arr)
```

## Comparación

| Aspecto | C++ | Python | Java |
|---------|-----|--------|------|
| Velocidad | ⚡ Rápido | 🐢 Lento | 🚀 Medio |
| Sintaxis | Verbose | Limpia | Verbose |
| STL/Libs | Excelente | Buena | Buena |
| Uso en ICPC | 90%+ | Raro | ~10% |

## Recomendación

Aprende **C++** para competencias serias. Usa Python para problemas donde el tiempo no es crítico.

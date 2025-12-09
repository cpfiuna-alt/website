---
id: "22"
title: "Contests"
description: "Estrategias y consejos para competencias reales."
---

# Estrategias para Contests

Consejos para maximizar tu rendimiento en competencias.

## Antes del Contest

- Dormir bien la noche anterior
- Tener tu template listo
- Ambiente sin distracciones
- Agua y snacks cerca

## Durante el Contest

### Los primeros minutos

1. **Lee TODOS los problemas** (al menos títulos y restricciones)
2. Identifica los más fáciles (generalmente A y B)
3. Empieza por el más fácil para ti

### Gestión del tiempo

| Tiempo restante | Acción |
|----------------|--------|
| 100% | Leer todo, empezar fáciles |
| 75% | Seguir resolviendo |
| 50% | Evaluar si cambiar de problema |
| 25% | Enfocar en casi-resueltos |
| 10% | Último intento, submit todo |

### Cuando estés atascado

- Lee el problema de nuevo (¡literalmente!)
- Revisa los ejemplos con cuidado
- Prueba casos edge (n=1, todo igual, etc.)
- Cambia de problema temporalmente

## Template Básico

```cpp
#include <bits/stdc++.h>
using namespace std;

#define ll long long
#define vi vector<int>
#define vll vector<long long>
#define pii pair<int, int>
#define pb push_back
#define all(x) x.begin(), x.end()

void solve() {
    
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    int t;
    cin >> t;
    while (t--) {
        solve();
    }
    
    return 0;
}
```

## Debugging

```cpp
#define dbg(x) cerr << #x << " = " << x << endl
// dbg(variable); → "variable = valor"
```

## Después del Contest

- **Upsolving**: Resuelve los que no pudiste
- Lee los editorials
- Practica problemas similares

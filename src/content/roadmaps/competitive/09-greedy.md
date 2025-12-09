---
id: "9"
title: "Greedy"
description: "Algoritmos voraces: toma la mejor decisión local en cada paso."
---

# Algoritmos Greedy

Toma la decisión óptima en cada paso, esperando llegar al óptimo global.

## Cuándo funciona Greedy

- Optimal substructure
- Greedy choice property
- No hay que reconsiderar decisiones pasadas

## Ejemplo Clásico: Activity Selection

```cpp
// Seleccionar máximo número de actividades no solapadas
struct Activity {
    int start, end;
};

int maxActivities(vector<Activity>& acts) {
    // Ordenar por tiempo de fin
    sort(acts.begin(), acts.end(), [](auto& a, auto& b) {
        return a.end < b.end;
    });
    
    int count = 1;
    int lastEnd = acts[0].end;
    
    for (int i = 1; i < acts.size(); i++) {
        if (acts[i].start >= lastEnd) {
            count++;
            lastEnd = acts[i].end;
        }
    }
    
    return count;
}
```

## Problema del Cambio (Coin Change Greedy)

```cpp
// Solo funciona con ciertas denominaciones (ej: 1, 5, 10, 25)
int minCoins(vector<int>& coins, int amount) {
    sort(coins.rbegin(), coins.rend());  // mayor a menor
    
    int count = 0;
    for (int coin : coins) {
        count += amount / coin;
        amount %= coin;
    }
    
    return amount == 0 ? count : -1;
}
```

## Fractional Knapsack

```cpp
double fractionalKnapsack(vector<pair<int, int>>& items, int capacity) {
    // {value, weight}
    // Ordenar por valor/peso (ratio)
    sort(items.begin(), items.end(), [](auto& a, auto& b) {
        return (double)a.first / a.second > (double)b.first / b.second;
    });
    
    double totalValue = 0;
    for (auto& [v, w] : items) {
        if (capacity >= w) {
            capacity -= w;
            totalValue += v;
        } else {
            totalValue += (double)v * capacity / w;
            break;
        }
    }
    
    return totalValue;
}
```

## Tips

- Ordena los datos (por tiempo, valor, ratio, etc.)
- Si greedy no funciona, considera DP
- Demuestra (o intuye) por qué funciona

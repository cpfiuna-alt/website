---
id: "6"
title: "Sorting"
description: "Algoritmos de ordenamiento y técnicas de sorting en competencias."
---

# Sorting

El ordenamiento es fundamental en muchos problemas.

## std::sort

```cpp
vector<int> v = {5, 2, 8, 1, 9};

// Ascendente
sort(v.begin(), v.end());
// {1, 2, 5, 8, 9}

// Descendente
sort(v.begin(), v.end(), greater<int>());
// {9, 8, 5, 2, 1}
```

## Custom Comparator

```cpp
// Ordenar por segundo elemento
vector<pair<int, int>> v = {{1, 5}, {3, 2}, {2, 8}};

sort(v.begin(), v.end(), [](auto& a, auto& b) {
    return a.second < b.second;
});
// {{3, 2}, {1, 5}, {2, 8}}

// Ordenar structs
struct Person {
    string name;
    int age;
};

vector<Person> people;
sort(people.begin(), people.end(), [](auto& a, auto& b) {
    if (a.age != b.age) return a.age < b.age;
    return a.name < b.name;
});
```

## Stable Sort

Mantiene el orden relativo de elementos iguales.

```cpp
stable_sort(v.begin(), v.end());
```

## Partial Sort

Solo ordena los primeros k elementos.

```cpp
// Ordenar solo los 3 menores
partial_sort(v.begin(), v.begin() + 3, v.end());
```

## nth_element

Encuentra el n-ésimo elemento en O(n).

```cpp
// Poner la mediana en su posición
nth_element(v.begin(), v.begin() + n/2, v.end());
int median = v[n/2];
```

## Counting Sort

Para rangos pequeños de valores, O(n + k).

```cpp
vector<int> count(MAX_VAL + 1, 0);
for (int x : arr) count[x]++;
// Reconstruir ordenado
```

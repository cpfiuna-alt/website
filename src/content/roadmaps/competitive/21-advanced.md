---
id: "21"
title: "Técnicas Avanzadas"
description: "Divide and conquer, sqrt decomposition, y más."
---

# Técnicas Avanzadas

Técnicas para problemas más difíciles.

## Divide and Conquer

```cpp
// Merge Sort con conteo de inversiones
long long mergeSort(vector<int>& arr, int l, int r) {
    if (l >= r) return 0;
    
    int mid = (l + r) / 2;
    long long inv = 0;
    
    inv += mergeSort(arr, l, mid);
    inv += mergeSort(arr, mid + 1, r);
    inv += merge(arr, l, mid, r);
    
    return inv;
}
```

## Square Root Decomposition

Divide array en √n bloques.

```cpp
class SqrtDecomp {
    vector<int> arr, blocks;
    int blockSize;
    
public:
    SqrtDecomp(vector<int>& a) : arr(a) {
        int n = a.size();
        blockSize = sqrt(n);
        blocks.resize((n + blockSize - 1) / blockSize, 0);
        
        for (int i = 0; i < n; i++) {
            blocks[i / blockSize] += arr[i];
        }
    }
    
    void update(int i, int val) {
        blocks[i / blockSize] += val - arr[i];
        arr[i] = val;
    }
    
    long long query(int l, int r) {
        long long sum = 0;
        int bl = l / blockSize, br = r / blockSize;
        
        if (bl == br) {
            for (int i = l; i <= r; i++) sum += arr[i];
        } else {
            for (int i = l; i < (bl + 1) * blockSize; i++) sum += arr[i];
            for (int b = bl + 1; b < br; b++) sum += blocks[b];
            for (int i = br * blockSize; i <= r; i++) sum += arr[i];
        }
        
        return sum;
    }
};
```

## Mo's Algorithm

Para queries offline en O((N + Q) * √N).

```cpp
struct Query {
    int l, r, idx;
};

int blockSize;

bool cmp(Query& a, Query& b) {
    if (a.l / blockSize != b.l / blockSize)
        return a.l / blockSize < b.l / blockSize;
    return a.r < b.r;
}

// Ordenar queries y procesarlas con add/remove
```

## Coordinate Compression

```cpp
vector<int> compress(vector<int>& arr) {
    vector<int> sorted = arr;
    sort(sorted.begin(), sorted.end());
    sorted.erase(unique(sorted.begin(), sorted.end()), sorted.end());
    
    vector<int> result(arr.size());
    for (int i = 0; i < arr.size(); i++) {
        result[i] = lower_bound(sorted.begin(), sorted.end(), arr[i]) 
                    - sorted.begin();
    }
    return result;
}
```

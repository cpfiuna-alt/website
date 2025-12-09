---
id: "8"
title: "Two Pointers"
description: "Técnica de dos punteros para arrays y strings."
---

# Two Pointers

Usa dos punteros que se mueven por el array para resolver problemas en O(n).

## Patrón: Dos extremos

```cpp
// ¿Existe par que sume target? (array ordenado)
bool twoSum(vector<int>& arr, int target) {
    int l = 0, r = arr.size() - 1;
    
    while (l < r) {
        int sum = arr[l] + arr[r];
        if (sum == target) return true;
        if (sum < target) l++;
        else r--;
    }
    
    return false;
}
```

## Patrón: Sliding Window

```cpp
// Máxima suma de subarray de tamaño k
int maxSumK(vector<int>& arr, int k) {
    int n = arr.size();
    int sum = 0;
    
    // Ventana inicial
    for (int i = 0; i < k; i++) {
        sum += arr[i];
    }
    
    int maxSum = sum;
    
    // Deslizar ventana
    for (int i = k; i < n; i++) {
        sum += arr[i] - arr[i - k];
        maxSum = max(maxSum, sum);
    }
    
    return maxSum;
}
```

## Patrón: Ventana Variable

```cpp
// Subarray más corto con suma >= target
int minLengthSubarray(vector<int>& arr, int target) {
    int n = arr.size();
    int l = 0, sum = 0;
    int minLen = INT_MAX;
    
    for (int r = 0; r < n; r++) {
        sum += arr[r];
        
        while (sum >= target) {
            minLen = min(minLen, r - l + 1);
            sum -= arr[l];
            l++;
        }
    }
    
    return minLen == INT_MAX ? -1 : minLen;
}
```

## Ejemplo: Merge Two Sorted Arrays

```cpp
vector<int> merge(vector<int>& a, vector<int>& b) {
    vector<int> result;
    int i = 0, j = 0;
    
    while (i < a.size() && j < b.size()) {
        if (a[i] <= b[j]) result.push_back(a[i++]);
        else result.push_back(b[j++]);
    }
    
    while (i < a.size()) result.push_back(a[i++]);
    while (j < b.size()) result.push_back(b[j++]);
    
    return result;
}
```

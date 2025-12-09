---
id: "18"
title: "Strings"
description: "Algoritmos de strings: hashing, KMP, y más."
---

# Algoritmos de Strings

Técnicas esenciales para problemas de strings.

## Hashing de Strings

Convierte string a número para comparación O(1).

```cpp
const long long MOD = 1e9 + 9;
const long long BASE = 31;

long long computeHash(string& s) {
    long long hash = 0;
    long long pow = 1;
    
    for (char c : s) {
        hash = (hash + (c - 'a' + 1) * pow) % MOD;
        pow = pow * BASE % MOD;
    }
    
    return hash;
}
```

## Rolling Hash (Rabin-Karp)

Para buscar patrones en texto.

```cpp
vector<int> rabinKarp(string& text, string& pattern) {
    int n = text.size(), m = pattern.size();
    long long patHash = computeHash(pattern);
    
    vector<long long> h(n + 1, 0), pw(n + 1, 1);
    for (int i = 0; i < n; i++) {
        h[i + 1] = (h[i] + (text[i] - 'a' + 1) * pw[i]) % MOD;
        pw[i + 1] = pw[i] * BASE % MOD;
    }
    
    auto getHash = [&](int l, int r) {
        return (h[r + 1] - h[l] + MOD) % MOD * 
               modInverse(pw[l], MOD) % MOD;
    };
    
    vector<int> matches;
    for (int i = 0; i + m <= n; i++) {
        if (getHash(i, i + m - 1) == patHash) {
            matches.push_back(i);
        }
    }
    
    return matches;
}
```

## KMP (Knuth-Morris-Pratt)

Búsqueda de patrón en O(n + m).

```cpp
vector<int> computeLPS(string& pattern) {
    int m = pattern.size();
    vector<int> lps(m, 0);
    
    int len = 0, i = 1;
    while (i < m) {
        if (pattern[i] == pattern[len]) {
            lps[i++] = ++len;
        } else if (len > 0) {
            len = lps[len - 1];
        } else {
            lps[i++] = 0;
        }
    }
    
    return lps;
}

vector<int> kmpSearch(string& text, string& pattern) {
    vector<int> lps = computeLPS(pattern);
    vector<int> matches;
    
    int i = 0, j = 0;
    while (i < text.size()) {
        if (text[i] == pattern[j]) {
            i++; j++;
            if (j == pattern.size()) {
                matches.push_back(i - j);
                j = lps[j - 1];
            }
        } else if (j > 0) {
            j = lps[j - 1];
        } else {
            i++;
        }
    }
    
    return matches;
}
```

## Z-Function

```cpp
vector<int> zFunction(string& s) {
    int n = s.size();
    vector<int> z(n, 0);
    int l = 0, r = 0;
    
    for (int i = 1; i < n; i++) {
        if (i < r) {
            z[i] = min(r - i, z[i - l]);
        }
        while (i + z[i] < n && s[z[i]] == s[i + z[i]]) {
            z[i]++;
        }
        if (i + z[i] > r) {
            l = i;
            r = i + z[i];
        }
    }
    
    return z;
}
```

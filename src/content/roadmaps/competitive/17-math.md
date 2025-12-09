---
id: "17"
title: "Matemáticas"
description: "Teoría de números y matemáticas esenciales para CP."
---

# Matemáticas para CP

Conceptos matemáticos que aparecen frecuentemente.

## GCD y LCM

```cpp
// C++17
int g = __gcd(a, b);
// O manualmente:
int gcd(int a, int b) {
    return b == 0 ? a : gcd(b, a % b);
}

long long lcm(long long a, long long b) {
    return a / __gcd(a, b) * b;  // evita overflow
}
```

## Exponenciación Rápida

O(log n) en vez de O(n).

```cpp
long long power(long long base, long long exp, long long mod) {
    long long result = 1;
    base %= mod;
    
    while (exp > 0) {
        if (exp & 1) {
            result = result * base % mod;
        }
        base = base * base % mod;
        exp >>= 1;
    }
    
    return result;
}
```

## Inverso Modular

Para dividir en aritmética modular. a⁻¹ ≡ a^(p-2) mod p (p primo).

```cpp
long long modInverse(long long a, long long mod) {
    return power(a, mod - 2, mod);
}

// División modular
long long modDivide(long long a, long long b, long long mod) {
    return a * modInverse(b, mod) % mod;
}
```

## Criba de Eratóstenes

Encontrar todos los primos hasta n.

```cpp
vector<bool> sieve(int n) {
    vector<bool> isPrime(n + 1, true);
    isPrime[0] = isPrime[1] = false;
    
    for (int i = 2; i * i <= n; i++) {
        if (isPrime[i]) {
            for (int j = i * i; j <= n; j += i) {
                isPrime[j] = false;
            }
        }
    }
    
    return isPrime;
}
```

## Combinatoria

```cpp
const int MOD = 1e9 + 7;
const int MAXN = 2e5;

long long fact[MAXN], invFact[MAXN];

void precompute() {
    fact[0] = 1;
    for (int i = 1; i < MAXN; i++) {
        fact[i] = fact[i-1] * i % MOD;
    }
    invFact[MAXN-1] = power(fact[MAXN-1], MOD - 2, MOD);
    for (int i = MAXN - 2; i >= 0; i--) {
        invFact[i] = invFact[i+1] * (i+1) % MOD;
    }
}

long long C(int n, int r) {
    if (r < 0 || r > n) return 0;
    return fact[n] * invFact[r] % MOD * invFact[n-r] % MOD;
}
```

---
id: "10"
title: "DP Básico"
description: "Introducción a Programación Dinámica: divide, memoriza, conquista."
---

# Programación Dinámica (DP)

DP resuelve problemas dividiéndolos en subproblemas y memorizando resultados.

## Fibonacci - El ejemplo clásico

```cpp
// Sin DP: O(2^n) - muy lento
int fibSlow(int n) {
    if (n <= 1) return n;
    return fibSlow(n-1) + fibSlow(n-2);
}

// Con DP (Top-down / Memoization): O(n)
vector<int> memo(n+1, -1);
int fibMemo(int n) {
    if (n <= 1) return n;
    if (memo[n] != -1) return memo[n];
    return memo[n] = fibMemo(n-1) + fibMemo(n-2);
}

// Con DP (Bottom-up / Tabulation): O(n)
int fibTab(int n) {
    vector<int> dp(n+1);
    dp[0] = 0; dp[1] = 1;
    for (int i = 2; i <= n; i++) {
        dp[i] = dp[i-1] + dp[i-2];
    }
    return dp[n];
}
```

## Pasos para resolver DP

1. **Definir estado**: ¿Qué representa dp[i]?
2. **Relación de recurrencia**: dp[i] = f(dp[j]...)
3. **Caso base**: dp[0], dp[1]...
4. **Orden de cálculo**: ¿De menor a mayor?
5. **Respuesta**: ¿dp[n]? ¿max(dp)?

## Coin Change

```cpp
// Mínimo número de monedas para amount
int coinChange(vector<int>& coins, int amount) {
    vector<int> dp(amount + 1, INT_MAX);
    dp[0] = 0;
    
    for (int i = 1; i <= amount; i++) {
        for (int coin : coins) {
            if (coin <= i && dp[i - coin] != INT_MAX) {
                dp[i] = min(dp[i], dp[i - coin] + 1);
            }
        }
    }
    
    return dp[amount] == INT_MAX ? -1 : dp[amount];
}
```

## Climbing Stairs

```cpp
// Formas de subir n escalones (1 o 2 pasos)
int climbStairs(int n) {
    if (n <= 2) return n;
    int prev2 = 1, prev1 = 2;
    for (int i = 3; i <= n; i++) {
        int curr = prev1 + prev2;
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}
```

## Tips

- Si ves "mínimo/máximo" + "opciones", piensa en DP
- Dibuja el árbol de recursión
- Identifica subproblemas repetidos

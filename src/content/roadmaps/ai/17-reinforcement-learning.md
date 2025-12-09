---
id: "17"
title: "Reinforcement Learning"
description: "Aprendizaje por refuerzo: aprender mediante prueba y error."
---

# Reinforcement Learning

Un agente aprende a tomar decisiones para maximizar recompensas.

## Conceptos clave

| Concepto | Descripción |
|----------|-------------|
| Agente | El que aprende y toma decisiones |
| Ambiente | El mundo donde opera el agente |
| Estado | Situación actual |
| Acción | Lo que puede hacer el agente |
| Recompensa | Feedback del ambiente |
| Política | Estrategia del agente |

## El loop de RL

```
Estado → Agente → Acción → Ambiente → Recompensa + Nuevo Estado
         ↑__________________________________|
```

## Ejemplo con Gym

```python
import gymnasium as gym

# Crear ambiente
env = gym.make('CartPole-v1')

# Loop básico
state, info = env.reset()
done = False

while not done:
    action = env.action_space.sample()  # acción aleatoria
    next_state, reward, terminated, truncated, info = env.step(action)
    done = terminated or truncated
    state = next_state

env.close()
```

## Q-Learning

Aprender valores Q para pares (estado, acción).

```python
import numpy as np

Q = np.zeros([num_states, num_actions])
alpha = 0.1  # learning rate
gamma = 0.99  # discount factor
epsilon = 0.1  # exploration

for episode in range(num_episodes):
    state = env.reset()
    done = False
    
    while not done:
        # Epsilon-greedy
        if np.random.random() < epsilon:
            action = env.action_space.sample()
        else:
            action = np.argmax(Q[state])
        
        next_state, reward, done, _ = env.step(action)
        
        # Update Q-value
        Q[state, action] += alpha * (
            reward + gamma * np.max(Q[next_state]) - Q[state, action]
        )
        
        state = next_state
```

## Deep RL

Usar redes neuronales para aproximar la función de valor.

- **DQN**: Deep Q-Network
- **PPO**: Proximal Policy Optimization
- **A3C**: Asynchronous Advantage Actor-Critic

## Aplicaciones

- Juegos (AlphaGo, Atari)
- Robótica
- Sistemas de recomendación
- Trading
- Control de sistemas

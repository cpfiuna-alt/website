---
id: "20"
title: "Agentes de IA"
description: "Sistemas autónomos que planifican y ejecutan tareas."
---

# Agentes de IA

Sistemas que pueden razonar, planificar y usar herramientas.

## ¿Qué es un agente?

Un agente es un LLM que puede:
1. Razonar sobre tareas
2. Usar herramientas
3. Mantener memoria
4. Iterar hasta completar objetivos

## ReAct Pattern

Reasoning + Acting

```
Pensamiento: Necesito buscar información sobre X
Acción: Buscar[X]
Observación: Resultados de búsqueda...
Pensamiento: Ahora puedo responder
Respuesta: ...
```

## LangChain Agents

```python
from langchain.agents import initialize_agent, load_tools
from langchain.llms import OpenAI

llm = OpenAI(temperature=0)
tools = load_tools(["serpapi", "llm-math"], llm=llm)

agent = initialize_agent(
    tools, 
    llm, 
    agent="zero-shot-react-description",
    verbose=True
)

result = agent.run("¿Cuántos años tiene el presidente de Francia?")
```

## Herramientas personalizadas

```python
from langchain.tools import BaseTool

class MiHerramienta(BaseTool):
    name = "Mi Herramienta"
    description = "Útil para X"
    
    def _run(self, query: str) -> str:
        # Lógica de la herramienta
        return resultado
```

## AutoGPT-style Agents

```python
# Agente autónomo que planifica
from langchain.experimental import AutoGPT

agent = AutoGPT.from_llm_and_tools(
    ai_name="Asistente",
    ai_role="Investigador",
    tools=tools,
    llm=llm,
    memory=memory
)

agent.run(["Investiga sobre energías renovables y crea un resumen"])
```

## Frameworks

| Framework | Características |
|-----------|-----------------|
| LangChain | Flexible, popular |
| AutoGPT | Autónomo |
| CrewAI | Multi-agente |
| Semantic Kernel | Microsoft |

## Casos de uso

- Asistentes de investigación
- Automatización de tareas
- Customer service
- Coding assistants
- Data analysis

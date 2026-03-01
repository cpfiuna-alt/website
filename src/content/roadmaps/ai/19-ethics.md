---
id: "19"
title: "Ética en IA"
description: "Consideraciones éticas y responsables en el desarrollo de IA."
---

# Ética en IA

Con gran poder viene gran responsabilidad.

## Problemas éticos principales

### Bias (Sesgo)

Los modelos pueden perpetuar o amplificar sesgos de los datos.

```python
# Detectar bias
from aif360.datasets import BinaryLabelDataset
from aif360.metrics import BinaryLabelDatasetMetric

metric = BinaryLabelDatasetMetric(dataset,
    privileged_groups=[{'gender': 1}],
    unprivileged_groups=[{'gender': 0}])

print(f"Disparate Impact: {metric.disparate_impact()}")
```

### Privacidad

- Datos personales en entrenamiento
- Ataques de membership inference
- Datos sensibles en outputs

### Transparencia

- ¿Cómo toma decisiones el modelo?
- ¿Quién es responsable de los errores?
- ¿Los usuarios saben que interactúan con IA?

## Frameworks éticos

| Framework | Organización |
|-----------|--------------|
| AI Ethics Guidelines | European Union |
| Responsible AI | Microsoft |
| AI Principles | Google |
| Ethical AI | UNESCO |

## Interpretabilidad

```python
# SHAP
import shap

explainer = shap.TreeExplainer(model)
shap_values = explainer.shap_values(X)
shap.summary_plot(shap_values, X)

# LIME
from lime import lime_tabular

explainer = lime_tabular.LimeTabularExplainer(X_train)
exp = explainer.explain_instance(X_test[0], model.predict_proba)
```

## Buenas prácticas

1. **Diversidad en datos**: Representar a todos los grupos
2. **Auditorías**: Evaluar bias regularmente
3. **Transparencia**: Documentar limitaciones
4. **Consentimiento**: Ser claro sobre uso de datos
5. **Human-in-the-loop**: Humanos en decisiones críticas

## Regulación

- EU AI Act
- GDPR (derecho a explicación)
- Leyes locales emergentes

## Preguntas que hacer

- ¿A quién beneficia esta IA?
- ¿A quién podría perjudicar?
- ¿Qué pasa si falla?
- ¿Es realmente necesaria la IA aquí?

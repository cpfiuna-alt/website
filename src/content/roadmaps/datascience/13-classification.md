---
id: "13"
title: "Clasificación"
description: "Modelos de clasificación para predecir categorías."
---

# Modelos de Clasificación

Predecir categorías (clases).

## Regresión Logística

```python
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report, confusion_matrix

# Entrenar
modelo = LogisticRegression()
modelo.fit(X_train, y_train)

# Predecir
y_pred = modelo.predict(X_test)
y_prob = modelo.predict_proba(X_test)[:, 1]  # probabilidades

# Evaluar
print(classification_report(y_test, y_pred))
print(confusion_matrix(y_test, y_pred))
```

## Decision Trees

```python
from sklearn.tree import DecisionTreeClassifier
import matplotlib.pyplot as plt
from sklearn import tree

dt = DecisionTreeClassifier(max_depth=5, random_state=42)
dt.fit(X_train, y_train)

# Visualizar
plt.figure(figsize=(20,10))
tree.plot_tree(dt, feature_names=X.columns, filled=True)
plt.show()
```

## Random Forest

```python
from sklearn.ensemble import RandomForestClassifier

rf = RandomForestClassifier(n_estimators=100, random_state=42)
rf.fit(X_train, y_train)

# Feature importance
importances = pd.DataFrame({
    'feature': X.columns,
    'importance': rf.feature_importances_
}).sort_values('importance', ascending=False)
```

## Métricas de Clasificación

| Métrica | Descripción |
|---------|-------------|
| Accuracy | % correctos |
| Precision | De los predichos +, cuántos son + |
| Recall | De los reales +, cuántos predije + |
| F1-Score | Promedio armónico P y R |
| AUC-ROC | Área bajo la curva ROC |

```python
from sklearn.metrics import roc_auc_score, roc_curve

auc = roc_auc_score(y_test, y_prob)
fpr, tpr, thresholds = roc_curve(y_test, y_prob)

plt.plot(fpr, tpr, label=f'AUC = {auc:.2f}')
plt.plot([0, 1], [0, 1], 'k--')
plt.xlabel('False Positive Rate')
plt.ylabel('True Positive Rate')
plt.title('ROC Curve')
plt.legend()
plt.show()
```

## Matriz de Confusión

```
              Predicho
              Neg  Pos
Real Neg  [[TN,  FP],
     Pos   [FN,  TP]]
```

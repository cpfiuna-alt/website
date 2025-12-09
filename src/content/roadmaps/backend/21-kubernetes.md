---
id: "21"
title: "Kubernetes"
description: "Orquestación de contenedores para deployment y escalado automático."
---

# Kubernetes (K8s)

Kubernetes orquesta contenedores Docker a escala.

## Conceptos Básicos

| Concepto | Descripción |
|----------|-------------|
| Pod | Unidad mínima, uno o más contenedores |
| Deployment | Gestiona réplicas de pods |
| Service | Expone pods a la red |
| Ingress | Enrutamiento HTTP externo |
| ConfigMap | Configuración |
| Secret | Datos sensibles |

## Deployment YAML

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mi-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: mi-app
  template:
    metadata:
      labels:
        app: mi-app
    spec:
      containers:
        - name: mi-app
          image: mi-app:latest
          ports:
            - containerPort: 3000
          env:
            - name: DATABASE_URL
              valueFrom:
                secretKeyRef:
                  name: db-secret
                  key: url
```

## Service

```yaml
apiVersion: v1
kind: Service
metadata:
  name: mi-app-service
spec:
  selector:
    app: mi-app
  ports:
    - port: 80
      targetPort: 3000
  type: LoadBalancer
```

## Comandos kubectl

```bash
# Ver recursos
kubectl get pods
kubectl get deployments
kubectl get services

# Aplicar configuración
kubectl apply -f deployment.yaml

# Ver logs
kubectl logs <pod-name>

# Escalar
kubectl scale deployment mi-app --replicas=5
```

## Cuándo usar

✅ Múltiples servicios
✅ Necesitas alta disponibilidad
✅ Auto-scaling

❌ Aplicaciones simples
❌ No tienes experiencia en operaciones

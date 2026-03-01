---
id: "22"
title: "Cloud (AWS/GCP)"
description: "Servicios en la nube para hosting, bases de datos, y más."
---

# Cloud Computing

Los proveedores cloud ofrecen infraestructura y servicios bajo demanda.

## Principales Proveedores

| Servicio | AWS | GCP | Azure |
|----------|-----|-----|-------|
| Compute | EC2 | Compute Engine | VMs |
| Serverless | Lambda | Cloud Functions | Functions |
| Database | RDS | Cloud SQL | SQL Database |
| Storage | S3 | Cloud Storage | Blob Storage |
| Containers | ECS/EKS | GKE | AKS |

## AWS Servicios Comunes

### EC2 (Servidores)
```bash
# Conectar a instancia
ssh -i key.pem ec2-user@ip-address
```

### S3 (Almacenamiento)
```javascript
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

// Subir archivo
await s3.upload({
  Bucket: 'mi-bucket',
  Key: 'archivo.pdf',
  Body: fileBuffer
}).promise();
```

### Lambda (Serverless)
```javascript
exports.handler = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Hola desde Lambda!' })
  };
};
```

## Serverless vs Containers

| Serverless | Containers |
|------------|------------|
| Pay per invocation | Pay for uptime |
| Auto-scaling | Configure scaling |
| Cold starts | Always warm |
| Limited runtime | Full control |

## Mejores Prácticas

- Infrastructure as Code (Terraform, CDK)
- Environments separados (dev, staging, prod)
- Monitoring y alertas
- Backups automáticos
- Principle of least privilege

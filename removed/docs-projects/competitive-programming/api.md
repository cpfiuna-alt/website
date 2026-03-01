---
title: "API Reference"
description: "Documentación completa de la API de la plataforma"
chapter: "API"
section: "Endpoints y Métodos"
order: 1
---

# API de la Plataforma de Programación Competitiva

## Endpoints de la API

### Autenticación

#### POST `/api/auth/register`
Registra un nuevo usuario en la plataforma.

**Request Body:**
```json
{
  "username": "usuario123",
  "email": "usuario@ejemplo.com",
  "password": "contraseña_segura",
  "fullName": "Nombre Completo"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid-here",
      "username": "usuario123",
      "email": "usuario@ejemplo.com",
      "rating": 1200,
      "createdAt": "2025-01-15T10:00:00Z"
    },
    "token": "jwt-token-here"
  }
}
```

#### POST `/api/auth/login`
Autentica un usuario existente.

**Request Body:**
```json
{
  "email": "usuario@ejemplo.com",
  "password": "contraseña_segura"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid-here",
      "username": "usuario123",
      "email": "usuario@ejemplo.com",
      "rating": 1350,
      "solvedCount": 25
    },
    "token": "jwt-token-here"
  }
}
```

#### POST `/api/auth/refresh`
Renueva un token JWT.

**Headers:**
```
Authorization: Bearer <refresh_token>
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "token": "new-jwt-token-here",
    "refreshToken": "new-refresh-token-here"
  }
}
```

### Problemas

#### GET `/api/problems`
Obtiene lista de problemas con filtros y paginación.

**Query Parameters:**
- `page`: Página (default: 1)
- `limit`: Elementos por página (default: 20, max: 100)
- `difficulty`: Filtrar por dificultad (`easy`, `medium`, `hard`)
- `category`: Filtrar por categoría
- `search`: Buscar en título y descripción
- `solved`: Solo problemas resueltos por el usuario (`true`/`false`)

**Example:**
```
GET /api/problems?page=1&limit=10&difficulty=medium&category=algorithms
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "problems": [
      {
        "id": "problem-uuid",
        "title": "Two Sum",
        "difficulty": "easy",
        "category": "arrays",
        "solvedCount": 1250,
        "isSolved": false,
        "tags": ["array", "hash-table"],
        "createdAt": "2025-01-10T15:30:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 150,
      "pages": 15,
      "hasNext": true,
      "hasPrev": false
    }
  }
}
```

#### GET `/api/problems/:id`
Obtiene detalles completos de un problema específico.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "problem-uuid",
    "title": "Two Sum",
    "description": "Descripción completa del problema...",
    "difficulty": "easy",
    "category": "arrays",
    "timeLimit": 1000,
    "memoryLimit": 256000,
    "tags": ["array", "hash-table"],
    "sampleTestCases": [
      {
        "input": "nums = [2,7,11,15], target = 9",
        "output": "[0,1]",
        "explanation": "nums[0] + nums[1] = 2 + 7 = 9"
      }
    ],
    "constraints": [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9"
    ],
    "statistics": {
      "totalSubmissions": 5420,
      "acceptedSubmissions": 2840,
      "acceptanceRate": 52.4,
      "averageRating": 1285
    },
    "userStats": {
      "isSolved": false,
      "bestSubmission": null,
      "attempts": 0
    }
  }
}
```

#### POST `/api/problems` (Admin)
Crea un nuevo problema.

**Headers:**
```
Authorization: Bearer <admin_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Nuevo Problema",
  "description": "Descripción detallada...",
  "difficulty": "medium",
  "category": "dynamic-programming",
  "timeLimit": 2000,
  "memoryLimit": 512000,
  "tags": ["dp", "arrays"],
  "testCases": [
    {
      "input": "input data",
      "output": "expected output",
      "isSample": true
    }
  ],
  "constraints": ["1 <= n <= 10^5"],
  "hints": ["Consider using dynamic programming"]
}
```

### Envíos de Soluciones

#### POST `/api/submissions`
Envía una solución para evaluación.

**Headers:**
```
Authorization: Bearer <user_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "problemId": "problem-uuid",
  "language": "cpp",
  "sourceCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    // Solution code\n    return 0;\n}"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "submissionId": "submission-uuid",
    "status": "queued",
    "queuePosition": 3,
    "estimatedTime": "30 seconds"
  }
}
```

#### GET `/api/submissions/:id`
Obtiene el resultado de un envío específico.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "submission-uuid",
    "problemId": "problem-uuid",
    "problemTitle": "Two Sum",
    "language": "cpp",
    "verdict": "AC",
    "executionTime": 245,
    "memoryUsed": 1024,
    "submittedAt": "2025-01-15T14:30:00Z",
    "judgedAt": "2025-01-15T14:30:15Z",
    "testCaseResults": [
      {
        "testCase": 1,
        "verdict": "AC",
        "executionTime": 45,
        "memoryUsed": 512
      }
    ],
    "sourceCode": "// Only visible to problem author",
    "score": 100
  }
}
```

#### GET `/api/submissions`
Obtiene historial de envíos del usuario.

**Query Parameters:**
- `page`: Página (default: 1)
- `limit`: Elementos por página (default: 20)
- `problemId`: Filtrar por problema específico
- `language`: Filtrar por lenguaje
- `verdict`: Filtrar por veredicto (`AC`, `WA`, `TLE`, etc.)

**Response (200):**
```json
{
  "success": true,
  "data": {
    "submissions": [
      {
        "id": "submission-uuid",
        "problemId": "problem-uuid",
        "problemTitle": "Two Sum",
        "language": "cpp",
        "verdict": "AC",
        "executionTime": 245,
        "memoryUsed": 1024,
        "submittedAt": "2025-01-15T14:30:00Z",
        "score": 100
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 85,
      "pages": 5
    }
  }
}
```

### Usuarios y Estadísticas

#### GET `/api/users/profile`
Obtiene perfil del usuario autenticado.

**Headers:**
```
Authorization: Bearer <user_token>
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "user-uuid",
    "username": "usuario123",
    "email": "usuario@ejemplo.com",
    "fullName": "Nombre Completo",
    "rating": 1350,
    "maxRating": 1420,
    "rank": "Expert",
    "solvedCount": 25,
    "submissionCount": 87,
    "acceptanceRate": 28.7,
    "streakDays": 5,
    "joinedAt": "2024-08-15T10:00:00Z",
    "lastActiveAt": "2025-01-15T16:30:00Z",
    "badges": [
      {
        "id": "first-solve",
        "name": "First Blood",
        "description": "First to solve a problem"
      }
    ]
  }
}
```

#### GET `/api/users/:id/stats`
Obtiene estadísticas detalladas de un usuario.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user-uuid",
      "username": "usuario123",
      "rating": 1350,
      "rank": "Expert"
    },
    "statistics": {
      "ratingHistory": [
        {
          "date": "2025-01-01",
          "rating": 1200,
          "contest": "New Year Contest"
        }
      ],
      "problemsSolved": {
        "easy": 15,
        "medium": 8,
        "hard": 2
      },
      "languageStats": {
        "cpp": 65,
        "python": 15,
        "java": 7
      },
      "categoryStats": {
        "arrays": 12,
        "dynamic-programming": 8,
        "graphs": 5
      },
      "submissionTrend": [
        {
          "date": "2025-01-15",
          "submissions": 5,
          "accepted": 3
        }
      ]
    }
  }
}
```

#### GET `/api/leaderboard`
Obtiene tabla de clasificación.

**Query Parameters:**
- `type`: Tipo de leaderboard (`global`, `monthly`, `contest`)
- `limit`: Número de usuarios (default: 50, max: 100)

**Response (200):**
```json
{
  "success": true,
  "data": {
    "leaderboard": [
      {
        "rank": 1,
        "userId": "user-uuid",
        "username": "topCoder",
        "rating": 2150,
        "solvedCount": 156,
        "change": "+25"
      }
    ],
    "userRank": {
      "rank": 45,
      "rating": 1350
    }
  }
}
```

### Concursos

#### GET `/api/contests`
Obtiene lista de concursos.

**Query Parameters:**
- `status`: Estado del concurso (`upcoming`, `running`, `finished`)
- `page`: Página
- `limit`: Elementos por página

**Response (200):**
```json
{
  "success": true,
  "data": {
    "contests": [
      {
        "id": "contest-uuid",
        "title": "Weekly Contest #1",
        "description": "Concurso semanal de práctica",
        "startTime": "2025-01-20T18:00:00Z",
        "endTime": "2025-01-20T20:00:00Z",
        "duration": 7200,
        "participantCount": 245,
        "problemCount": 4,
        "isRegistered": false,
        "status": "upcoming"
      }
    ]
  }
}
```

#### POST `/api/contests/:id/register`
Registrarse en un concurso.

**Headers:**
```
Authorization: Bearer <user_token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Successfully registered for contest"
}
```

#### GET `/api/contests/:id/problems`
Obtiene problemas de un concurso específico.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "problems": [
      {
        "id": "problem-uuid",
        "alias": "A",
        "title": "Simple Addition",
        "difficulty": "easy",
        "points": 500,
        "solvedCount": 180,
        "isSolved": false
      }
    ]
  }
}
```

### Notificaciones

#### GET `/api/notifications`
Obtiene notificaciones del usuario.

**Headers:**
```
Authorization: Bearer <user_token>
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "notifications": [
      {
        "id": "notification-uuid",
        "type": "submission_result",
        "title": "Submission Judged",
        "message": "Your solution for 'Two Sum' was accepted!",
        "data": {
          "submissionId": "submission-uuid",
          "verdict": "AC"
        },
        "isRead": false,
        "createdAt": "2025-01-15T14:30:20Z"
      }
    ],
    "unreadCount": 3
  }
}
```

#### POST `/api/notifications/:id/read`
Marca una notificación como leída.

**Response (200):**
```json
{
  "success": true,
  "message": "Notification marked as read"
}
```

## WebSocket API

### Conexión en Tiempo Real

#### Conectar al WebSocket
```javascript
const socket = io('wss://api.cpf-cp.org', {
  auth: {
    token: 'user-jwt-token'
  }
});
```

#### Eventos de Envío
```javascript
// Escuchar actualizaciones de envío
socket.on('submission:update', (data) => {
  console.log('Submission update:', data);
  // { submissionId, status, verdict, progress }
});

// Escuchar posición en cola
socket.on('submission:queue', (data) => {
  console.log('Queue position:', data.position);
});
```

#### Eventos de Concurso
```javascript
// Actualizaciones de leaderboard en tiempo real
socket.on('contest:leaderboard', (data) => {
  console.log('Leaderboard update:', data);
});

// Notificaciones del concurso
socket.on('contest:announcement', (data) => {
  console.log('Contest announcement:', data.message);
});
```

## Códigos de Error

### Códigos HTTP
- `200`: OK
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `409`: Conflict
- `422`: Unprocessable Entity
- `429`: Too Many Requests
- `500`: Internal Server Error

### Errores Específicos

#### Error Response Format
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ]
  }
}
```

#### Códigos de Error Comunes

| Código | Descripción |
|--------|------------|
| `VALIDATION_ERROR` | Error de validación de datos |
| `AUTHENTICATION_FAILED` | Credenciales inválidas |
| `INSUFFICIENT_PERMISSIONS` | Permisos insuficientes |
| `RESOURCE_NOT_FOUND` | Recurso no encontrado |
| `DUPLICATE_RESOURCE` | Recurso ya existe |
| `RATE_LIMIT_EXCEEDED` | Límite de requests excedido |
| `SUBMISSION_QUEUE_FULL` | Cola de envíos llena |
| `CONTEST_NOT_ACTIVE` | Concurso no activo |
| `LANGUAGE_NOT_SUPPORTED` | Lenguaje no soportado |

## Rate Limiting

### Límites por Endpoint

| Endpoint | Límite | Ventana |
|----------|--------|---------|
| `/api/auth/login` | 5 requests | 15 minutos |
| `/api/submissions` | 10 requests | 5 minutos |
| `/api/problems` | 100 requests | 1 hora |
| `/api/users/*` | 60 requests | 1 hora |

### Headers de Rate Limiting
```
X-RateLimit-Limit: 10
X-RateLimit-Remaining: 7
X-RateLimit-Reset: 1642681200
```

## Paginación

### Query Parameters
- `page`: Número de página (inicio en 1)
- `limit`: Elementos por página
- `sort`: Campo de ordenamiento
- `order`: Dirección (`asc` o `desc`)

### Response Format
```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "pages": 8,
    "hasNext": true,
    "hasPrev": false
  }
}
```

## Filtros y Búsqueda

### Operadores de Filtro
- `eq`: Igual a
- `ne`: Diferente de
- `gt`: Mayor que
- `gte`: Mayor o igual que
- `lt`: Menor que
- `lte`: Menor o igual que
- `in`: En la lista
- `like`: Contiene (búsqueda parcial)

### Ejemplo de Filtros Avanzados
```
GET /api/problems?difficulty=in:easy,medium&rating=gte:1200&title=like:array
```

## SDKs y Ejemplos

### JavaScript/TypeScript SDK

```typescript
import { CPCompetitiveAPI } from 'cp-competitive-api';

const api = new CPCompetitiveAPI({
  baseURL: 'https://api.cpf-cp.org',
  apiKey: 'your-api-key'
});

// Obtener problemas
const problems = await api.problems.list({
  difficulty: 'medium',
  page: 1,
  limit: 10
});

// Enviar solución
const submission = await api.submissions.create({
  problemId: 'problem-uuid',
  language: 'cpp',
  sourceCode: 'solution code here'
});

// Escuchar resultados en tiempo real
api.subscribeToSubmission(submission.id, (result) => {
  console.log('Verdict:', result.verdict);
});
```

### Python SDK

```python
from cp_competitive import CPCompetitiveAPI

api = CPCompetitiveAPI(
    base_url='https://api.cpf-cp.org',
    api_key='your-api-key'
)

# Obtener problemas
problems = api.problems.list(
    difficulty='medium',
    page=1,
    limit=10
)

# Enviar solución
submission = api.submissions.create(
    problem_id='problem-uuid',
    language='python',
    source_code='solution code here'
)

# Obtener resultado
result = api.submissions.get(submission['id'])
print(f"Verdict: {result['verdict']}")
```

## Webhook Notifications

### Configurar Webhooks

```json
POST /api/webhooks
{
  "url": "https://your-app.com/webhooks/cp",
  "events": ["submission.judged", "contest.started"],
  "secret": "webhook-secret"
}
```

### Eventos Disponibles

- `submission.created`
- `submission.judged`
- `contest.started`
- `contest.ended`
- `user.solved_first_problem`
- `user.rating_changed`

### Formato de Webhook

```json
{
  "event": "submission.judged",
  "timestamp": "2025-01-15T14:30:20Z",
  "data": {
    "submissionId": "submission-uuid",
    "userId": "user-uuid",
    "problemId": "problem-uuid",
    "verdict": "AC",
    "executionTime": 245,
    "memoryUsed": 1024
  }
}
```

## Documentación Interactiva

La API cuenta con documentación interactiva Swagger/OpenAPI disponible en:

- **Swagger UI**: https://api.cpf-cp.org/docs
- **ReDoc**: https://api.cpf-cp.org/redoc
- **OpenAPI Spec**: https://api.cpf-cp.org/openapi.json

Esta documentación permite probar endpoints directamente desde el navegador y explorar todos los schemas de datos disponibles.

---
title: "Arquitectura del Sistema"
description: "Diseño arquitectónico de la plataforma de programación competitiva"
chapter: "Arquitectura"
section: "Diseño del Sistema"
order: 1
---

# Arquitectura de la Plataforma de Programación Competitiva

## Visión General

La Plataforma de Programación Competitiva está diseñada con una arquitectura moderna, escalable y modular que permite el aprendizaje progresivo y la evaluación automática de soluciones.

## Arquitectura del Sistema

### Componentes Principales

```
Competitive Programming Platform
├── Frontend (React + TypeScript)
├── Backend API (Node.js + Express)
├── Judge System (Python + Docker)
├── Database Layer (PostgreSQL)
├── File Storage (MinIO/S3)
├── Cache Layer (Redis)
└── Monitoring (Prometheus + Grafana)
```

### Flujo de Datos

1. **Submission Flow**:
   - Usuario envía solución → Frontend
   - Frontend → API Backend
   - API → Judge Queue (Redis)
   - Judge System → Execution Environment (Docker)
   - Results → Database
   - Real-time updates → WebSocket → Frontend

2. **Problem Management**:
   - Admin crea problema → Backend API
   - Test cases → File Storage
   - Metadata → PostgreSQL
   - Search Index → Elasticsearch

## Frontend Architecture

### Tecnologías Utilizadas

- **React 18** con Hooks y Context API
- **TypeScript** para type safety
- **Vite** como build tool
- **Tailwind CSS** para styling
- **React Query** para state management y caching
- **React Router** para navegación
- **Monaco Editor** para editor de código

### Estructura de Componentes

```
src/
├── components/
│   ├── common/           # Componentes reutilizables
│   ├── problem/          # Componentes específicos de problemas
│   ├── submission/       # Componentes de envío de soluciones
│   ├── contest/          # Componentes de concursos
│   └── dashboard/        # Componentes del dashboard
├── pages/                # Páginas principales
├── hooks/                # Custom hooks
├── services/             # API services
├── utils/                # Utilidades
└── types/                # Definiciones de tipos TypeScript
```

### State Management

```typescript
// Context para autenticación
export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => Promise.resolve(),
  logout: () => {},
  isLoading: false
});

// Context para problemas
export const ProblemsContext = createContext<ProblemsContextType>({
  problems: [],
  currentProblem: null,
  fetchProblems: () => Promise.resolve(),
  submitSolution: () => Promise.resolve()
});
```

## Backend Architecture

### API Structure

```
backend/
├── src/
│   ├── controllers/      # Request handlers
│   ├── services/         # Business logic
│   ├── models/           # Data models (Sequelize)
│   ├── middleware/       # Express middleware
│   ├── routes/           # API routes
│   ├── utils/            # Utilities
│   └── validators/       # Input validation
├── migrations/           # Database migrations
├── seeders/              # Database seeders
└── tests/                # API tests
```

### Core Services

#### User Service
```typescript
export class UserService {
  async createUser(userData: CreateUserDto): Promise<User> {
    // Hash password, validate data, create user
  }
  
  async authenticateUser(email: string, password: string): Promise<string> {
    // Verify credentials, return JWT token
  }
  
  async getUserStats(userId: string): Promise<UserStats> {
    // Calculate user statistics (solved problems, rating, etc.)
  }
}
```

#### Problem Service
```typescript
export class ProblemService {
  async createProblem(problemData: CreateProblemDto): Promise<Problem> {
    // Create problem with test cases
  }
  
  async getProblems(filters: ProblemFilters): Promise<Problem[]> {
    // Get filtered and paginated problems
  }
  
  async validateTestCases(testCases: TestCase[]): Promise<boolean> {
    // Validate test case format and constraints
  }
}
```

#### Submission Service
```typescript
export class SubmissionService {
  async submitSolution(submissionData: SubmissionDto): Promise<Submission> {
    // Queue submission for judging
  }
  
  async getSubmissionResults(submissionId: string): Promise<SubmissionResult> {
    // Get judging results
  }
  
  async getLeaderboard(problemId: string): Promise<LeaderboardEntry[]> {
    // Calculate and return leaderboard
  }
}
```

## Judge System

### Arquitectura del Judge

El sistema de juez está diseñado para ser seguro, escalable y preciso:

```
Judge System
├── Queue Manager (Redis)
├── Execution Engine (Docker)
├── Security Sandbox
├── Resource Monitor
└── Result Processor
```

### Flujo de Evaluación

1. **Queue Processing**:
   ```python
   class JudgeWorker:
       def process_submission(self, submission):
           # 1. Download source code
           # 2. Compile if necessary
           # 3. Run against test cases
           # 4. Measure time and memory
           # 5. Return verdict
   ```

2. **Execution Environment**:
   ```dockerfile
   FROM alpine:latest
   
   # Install language runtimes
   RUN apk add --no-cache python3 gcc g++ openjdk11
   
   # Security restrictions
   RUN adduser -D -s /bin/sh judge
   USER judge
   
   # Resource limits
   ULIMIT -t 1   # CPU time limit
   ULIMIT -v 256000  # Memory limit
   ```

### Supported Languages

```json
{
  "languages": {
    "cpp": {
      "compile": "g++ -o solution solution.cpp -std=c++17",
      "execute": "./solution",
      "extension": ".cpp"
    },
    "python": {
      "execute": "python3 solution.py",
      "extension": ".py"
    },
    "java": {
      "compile": "javac Solution.java",
      "execute": "java Solution",
      "extension": ".java"
    }
  }
}
```

## Database Schema

### Core Tables

#### Users
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    rating INTEGER DEFAULT 1200,
    solved_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

#### Problems
```sql
CREATE TABLE problems (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    difficulty ENUM('easy', 'medium', 'hard') NOT NULL,
    time_limit INTEGER NOT NULL, -- milliseconds
    memory_limit INTEGER NOT NULL, -- KB
    category VARCHAR(100),
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT NOW()
);
```

#### Submissions
```sql
CREATE TABLE submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    problem_id UUID REFERENCES problems(id),
    language VARCHAR(20) NOT NULL,
    source_code TEXT NOT NULL,
    verdict VARCHAR(20) DEFAULT 'pending',
    execution_time INTEGER, -- milliseconds
    memory_used INTEGER, -- KB
    submitted_at TIMESTAMP DEFAULT NOW()
);
```

#### Test Cases
```sql
CREATE TABLE test_cases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    problem_id UUID REFERENCES problems(id),
    input_data TEXT NOT NULL,
    expected_output TEXT NOT NULL,
    is_sample BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW()
);
```

### Indexes for Performance

```sql
-- Optimize problem queries
CREATE INDEX idx_problems_difficulty ON problems(difficulty);
CREATE INDEX idx_problems_category ON problems(category);

-- Optimize submission queries
CREATE INDEX idx_submissions_user_id ON submissions(user_id);
CREATE INDEX idx_submissions_problem_id ON submissions(problem_id);
CREATE INDEX idx_submissions_verdict ON submissions(verdict);

-- Optimize leaderboard queries
CREATE INDEX idx_users_rating ON users(rating DESC);
CREATE INDEX idx_users_solved_count ON users(solved_count DESC);
```

## Caching Strategy

### Redis Cache Structure

```typescript
// Cache problem data
await redis.setex(
  `problem:${problemId}`, 
  3600, // 1 hour
  JSON.stringify(problemData)
);

// Cache user statistics
await redis.setex(
  `user:stats:${userId}`,
  1800, // 30 minutes
  JSON.stringify(userStats)
);

// Cache leaderboard
await redis.setex(
  'leaderboard:global',
  600, // 10 minutes
  JSON.stringify(leaderboard)
);
```

### Cache Invalidation

```typescript
class CacheService {
  async invalidateUserCache(userId: string) {
    await redis.del(`user:stats:${userId}`);
    await redis.del('leaderboard:global');
  }
  
  async invalidateProblemCache(problemId: string) {
    await redis.del(`problem:${problemId}`);
    await redis.del(`problem:list:*`);
  }
}
```

## Security Architecture

### Authentication & Authorization

```typescript
// JWT Authentication
const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

// Role-based authorization
const requireRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    next();
  };
};
```

### Code Execution Security

```python
import subprocess
import tempfile
import os
import resource

class SecureJudge:
    def execute_code(self, source_code: str, language: str, input_data: str):
        # Create temporary directory
        with tempfile.TemporaryDirectory() as temp_dir:
            # Write source code to file
            source_file = os.path.join(temp_dir, f"solution.{language}")
            with open(source_file, 'w') as f:
                f.write(source_code)
            
            # Set resource limits
            def set_limits():
                resource.setrlimit(resource.RLIMIT_CPU, (1, 1))  # 1 second CPU
                resource.setrlimit(resource.RLIMIT_AS, (64*1024*1024, 64*1024*1024))  # 64MB memory
            
            # Execute in sandboxed environment
            try:
                result = subprocess.run(
                    [self.get_command(language, source_file)],
                    input=input_data,
                    capture_output=True,
                    text=True,
                    timeout=5,
                    preexec_fn=set_limits
                )
                return result
            except subprocess.TimeoutExpired:
                return {'verdict': 'TLE'}  # Time Limit Exceeded
```

## Performance Optimization

### Database Optimization

```sql
-- Partitioning large tables
CREATE TABLE submissions_2024 PARTITION OF submissions
FOR VALUES FROM ('2024-01-01') TO ('2025-01-01');

-- Materialized views for analytics
CREATE MATERIALIZED VIEW user_rankings AS
SELECT 
    user_id,
    username,
    rating,
    solved_count,
    ROW_NUMBER() OVER (ORDER BY rating DESC) as rank
FROM users
WHERE rating > 0;

-- Refresh periodically
REFRESH MATERIALIZED VIEW user_rankings;
```

### API Performance

```typescript
// Response compression
app.use(compression());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Pagination for large result sets
const getProblems = async (page: number = 1, limit: number = 20) => {
  const offset = (page - 1) * limit;
  
  const problems = await Problem.findAndCountAll({
    limit,
    offset,
    order: [['created_at', 'DESC']]
  });
  
  return {
    problems: problems.rows,
    pagination: {
      page,
      limit,
      total: problems.count,
      pages: Math.ceil(problems.count / limit)
    }
  };
};
```

## Monitoring and Analytics

### Metrics Collection

```typescript
// Prometheus metrics
const promClient = require('prom-client');

const submissionCounter = new promClient.Counter({
  name: 'submissions_total',
  help: 'Total number of submissions',
  labelNames: ['language', 'verdict']
});

const judgeTime = new promClient.Histogram({
  name: 'judge_execution_time_seconds',
  help: 'Time taken to judge submissions',
  buckets: [0.1, 0.5, 1, 2, 5, 10]
});

// Usage
submissionCounter.inc({ language: 'cpp', verdict: 'AC' });
judgeTime.observe(executionTime);
```

### Health Checks

```typescript
app.get('/health', async (req, res) => {
  const health = {
    uptime: process.uptime(),
    timestamp: Date.now(),
    status: 'OK',
    services: {
      database: await checkDatabaseHealth(),
      redis: await checkRedisHealth(),
      judge: await checkJudgeHealth()
    }
  };
  
  res.json(health);
});
```

## Scalability Considerations

### Horizontal Scaling

```yaml
# Docker Compose for scaling
version: '3.8'
services:
  api:
    image: cp-platform-api
    deploy:
      replicas: 3
    environment:
      - DATABASE_URL=${DATABASE_URL}
      - REDIS_URL=${REDIS_URL}
  
  judge:
    image: cp-platform-judge
    deploy:
      replicas: 5
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
```

### Load Balancing

```nginx
upstream api_servers {
    server api-1:3000;
    server api-2:3000;
    server api-3:3000;
}

upstream judge_servers {
    server judge-1:5000;
    server judge-2:5000;
    server judge-3:5000;
}

server {
    location /api/ {
        proxy_pass http://api_servers;
    }
    
    location /judge/ {
        proxy_pass http://judge_servers;
    }
}
```

## Future Architecture Improvements

### Microservices Migration

```
Current Monolith → Microservices
├── User Service
├── Problem Service  
├── Submission Service
├── Judge Service
├── Contest Service
└── Notification Service
```

### Event-Driven Architecture

```typescript
// Event bus for decoupling services
class EventBus {
  async publish(event: string, data: any) {
    await redis.publish(event, JSON.stringify(data));
  }
  
  async subscribe(event: string, handler: (data: any) => void) {
    const subscriber = redis.duplicate();
    subscriber.subscribe(event);
    subscriber.on('message', (channel, message) => {
      if (channel === event) {
        handler(JSON.parse(message));
      }
    });
  }
}

// Usage
eventBus.publish('submission.created', { submissionId, userId });
eventBus.subscribe('submission.judged', (data) => {
  // Update leaderboard, send notifications, etc.
});
```

Esta arquitectura proporciona una base sólida y escalable para la plataforma de programación competitiva, permitiendo el crecimiento futuro y el mantenimiento eficiente del sistema.

---
title: "Primeros Pasos"
description: "Configuración inicial de la plataforma de programación competitiva"
chapter: "Configuración"
section: "Instalación y Setup"
order: 1
---

# Getting Started with Competitive Programming Platform

## Overview

The CPF Competitive Programming Platform is a comprehensive web application designed to help students practice, learn, and compete in programming contests. It features problem sets, contest simulation, performance tracking, and educational resources.

## Prerequisites

- **Node.js** (v16 or higher)
- **Python** (v3.8 or higher)
- **PostgreSQL** database
- **Redis** for caching and session management
- **Docker** (optional, for containerized deployment)
- Basic knowledge of React, FastAPI, and competitive programming

## Architecture Overview

The platform consists of:
- **Frontend**: React + TypeScript application
- **Backend**: FastAPI Python application
- **Database**: PostgreSQL for data persistence
- **Cache**: Redis for performance optimization
- **Judge System**: Sandboxed code execution environment

## Quick Setup

### 1. Clone the Repository

```bash
git clone https://github.com/CPF-FIUNA/competitive-programming.git
cd competitive-programming
```

### 2. Environment Setup

Create `.env` file in the root directory:

```env
# Database Configuration
DATABASE_URL=postgresql://username:password@localhost/cp_platform
REDIS_URL=redis://localhost:6379

# API Configuration
API_SECRET_KEY=your-secret-key-here
API_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# Judge System
JUDGE_CONTAINER_MEMORY_LIMIT=128m
JUDGE_CONTAINER_TIME_LIMIT=5
JUDGE_TEMP_DIR=/tmp/judge

# External APIs
CODEFORCES_API_KEY=your_codeforces_api_key
ATCODER_USERNAME=your_atcoder_username
ATCODER_PASSWORD=your_atcoder_password

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your_email@gmail.com
SMTP_PASSWORD=your_app_password

# Frontend Configuration
REACT_APP_API_URL=http://localhost:8000
REACT_APP_JUDGE_URL=ws://localhost:8001
```

### 3. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Initialize database
alembic upgrade head

# Create admin user
python scripts/create_admin.py

# Start backend server
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### 4. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

### 5. Judge System Setup

```bash
# Navigate to judge directory
cd judge

# Install dependencies
pip install -r requirements.txt

# Start judge server
python judge_server.py
```

## Project Structure

```
competitive-programming/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── services/        # API service layer
│   │   ├── utils/           # Utility functions
│   │   └── types/           # TypeScript type definitions
│   ├── public/              # Static assets
│   └── package.json         # Frontend dependencies
├── backend/                 # FastAPI backend application
│   ├── app/
│   │   ├── api/             # API route handlers
│   │   ├── core/            # Core functionality
│   │   ├── models/          # Database models
│   │   ├── schemas/         # Pydantic schemas
│   │   ├── services/        # Business logic
│   │   └── utils/           # Utility functions
│   ├── alembic/             # Database migrations
│   ├── tests/               # Backend tests
│   └── requirements.txt     # Backend dependencies
├── judge/                   # Code execution judge system
│   ├── sandbox/             # Sandboxing utilities
│   ├── languages/           # Language-specific configurations
│   ├── queue/               # Job queue management
│   └── judge_server.py      # Judge server entry point
├── database/                # Database schema and migrations
├── docs/                    # Documentation
├── docker-compose.yml       # Docker configuration
└── README.md               # Project README
```

## Key Features

### 1. Problem Management

- **Problem Creation**: Rich text editor with LaTeX support
- **Test Case Management**: Multiple test cases with expected outputs
- **Difficulty Levels**: Beginner to Expert categorization
- **Tags and Categories**: Organized problem classification
- **Editorial System**: Solution explanations and hints

### 2. Contest System

- **Contest Creation**: Flexible contest scheduling
- **Contest Types**: ICPC-style, IOI-style, and custom formats
- **Real-time Leaderboard**: Live rankings during contests
- **Penalty System**: Time-based scoring with penalties
- **Team Contests**: Support for team participation

### 3. Judge System

- **Multi-language Support**: C++, Python, Java, JavaScript, and more
- **Secure Execution**: Sandboxed code execution
- **Resource Limits**: Memory and time constraints
- **Compilation Errors**: Detailed error reporting
- **Custom Checker**: Support for special judge problems

### 4. User Management

- **User Profiles**: Detailed user statistics and achievements
- **Rating System**: ELO-based rating calculation
- **Progress Tracking**: Problem-solving history and analytics
- **Social Features**: Friend system and user interactions

### 5. Educational Resources

- **Tutorials**: Step-by-step learning materials
- **Algorithm Library**: Common algorithms and data structures
- **Practice Plans**: Structured learning paths
- **Discussion Forums**: Community-driven problem discussions

## Basic Usage

### Creating Your First Problem

1. **Login as Admin**:
   ```bash
   # Use the admin credentials created during setup
   Username: admin
   Password: [password set during setup]
   ```

2. **Navigate to Problem Creation**:
   - Go to `/admin/problems/create`
   - Fill in problem details
   - Add test cases
   - Set constraints and limits

3. **Problem Format**:
   ```markdown
   # Problem Title
   
   ## Description
   Given an array of integers, find the maximum sum of any contiguous subarray.
   
   ## Input Format
   First line contains integer n (1 ≤ n ≤ 10^5)
   Second line contains n integers (-10^9 ≤ ai ≤ 10^9)
   
   ## Output Format
   Print the maximum subarray sum.
   
   ## Sample Input
   5
   -2 -3 4 -1 -2 1 5 -3
   
   ## Sample Output
   7
   ```

### Submitting Solutions

1. **Choose Problem**: Browse available problems
2. **Select Language**: Choose your preferred programming language
3. **Write Code**: Use the integrated code editor
4. **Submit**: Submit your solution for judging

### Creating Contests

1. **Contest Setup**:
   ```json
   {
     "title": "CPF Weekly Contest #1",
     "description": "Weekly practice contest",
     "start_time": "2024-01-15T10:00:00Z",
     "duration": 180,
     "type": "ICPC",
     "problems": ["problem1", "problem2", "problem3"]
   }
   ```

2. **Registration**: Users can register before contest starts
3. **Participation**: Real-time problem solving with leaderboard

## Development Workflow

### Backend Development

```bash
# Run backend with hot reload
cd backend
uvicorn main:app --reload

# Run tests
pytest

# Create database migration
alembic revision --autogenerate -m "description"

# Apply migrations
alembic upgrade head

# Format code
black .
isort .

# Lint code
flake8 .
```

### Frontend Development

```bash
# Start development server
cd frontend
npm start

# Run tests
npm test

# Build for production
npm run build

# Lint code
npm run lint

# Format code
npm run format
```

### Judge System Development

```bash
# Test judge with sample submission
cd judge
python test_judge.py

# Monitor judge performance
python monitor_judge.py

# Update language configurations
vim languages/cpp.json
```

## Testing

### Backend Testing

```python
# tests/test_problems.py
import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_create_problem():
    problem_data = {
        "title": "Test Problem",
        "description": "A test problem",
        "difficulty": "easy",
        "time_limit": 1000,
        "memory_limit": 256
    }
    response = client.post("/api/problems/", json=problem_data)
    assert response.status_code == 201
    assert response.json()["title"] == "Test Problem"

def test_submit_solution():
    submission_data = {
        "problem_id": 1,
        "language": "cpp",
        "code": "#include<iostream>\nint main(){std::cout<<\"Hello\";return 0;}"
    }
    response = client.post("/api/submissions/", json=submission_data)
    assert response.status_code == 201
```

### Frontend Testing

```tsx
// src/components/__tests__/ProblemList.test.tsx
import { render, screen } from '@testing-library/react';
import { ProblemList } from '../ProblemList';

const mockProblems = [
  {
    id: 1,
    title: 'Two Sum',
    difficulty: 'easy',
    solvedCount: 150,
    totalCount: 200
  }
];

test('renders problem list correctly', () => {
  render(<ProblemList problems={mockProblems} />);
  
  expect(screen.getByText('Two Sum')).toBeInTheDocument();
  expect(screen.getByText('easy')).toBeInTheDocument();
  expect(screen.getByText('150/200')).toBeInTheDocument();
});
```

### Judge System Testing

```python
# judge/tests/test_judge_cpp.py
import pytest
from judge.core import Judge
from judge.languages import CPPLanguage

def test_cpp_compilation():
    judge = Judge(CPPLanguage())
    code = """
    #include <iostream>
    int main() {
        std::cout << "Hello World" << std::endl;
        return 0;
    }
    """
    
    result = judge.compile(code)
    assert result.success == True
    assert result.executable_path is not None

def test_cpp_execution():
    judge = Judge(CPPLanguage())
    code = """
    #include <iostream>
    int main() {
        int a, b;
        std::cin >> a >> b;
        std::cout << a + b << std::endl;
        return 0;
    }
    """
    
    result = judge.run(code, input_data="5 10")
    assert result.output.strip() == "15"
    assert result.verdict == "AC"
```

## Docker Setup

### Docker Compose Configuration

```yaml
version: '3.8'

services:
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      - REACT_APP_API_URL=http://localhost:8000
    depends_on:
      - backend

  backend:
    build: ./backend
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql://postgres:password@db:5432/cp_platform
      - REDIS_URL=redis://redis:6379
    depends_on:
      - db
      - redis

  judge:
    build: ./judge
    ports:
      - "8001:8001"
    volumes:
      - /tmp/judge:/tmp/judge
    privileged: true
    depends_on:
      - redis

  db:
    image: postgres:13
    environment:
      - POSTGRES_DB=cp_platform
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:6-alpine
    ports:
      - "6379:6379"

volumes:
  postgres_data:
```

### Running with Docker

```bash
# Build and start all services
docker-compose up --build

# Run in background
docker-compose up -d

# View logs
docker-compose logs -f backend

# Stop all services
docker-compose down
```

## API Usage Examples

### Authentication

```python
import requests

# Login
response = requests.post('http://localhost:8000/api/auth/login', json={
    'username': 'your_username',
    'password': 'your_password'
})
token = response.json()['access_token']

# Use token for authenticated requests
headers = {'Authorization': f'Bearer {token}'}
```

### Problem Management

```python
# Get all problems
response = requests.get('http://localhost:8000/api/problems/', headers=headers)
problems = response.json()

# Get specific problem
response = requests.get('http://localhost:8000/api/problems/1', headers=headers)
problem = response.json()

# Submit solution
response = requests.post('http://localhost:8000/api/submissions/', 
    json={
        'problem_id': 1,
        'language': 'cpp',
        'code': '#include<iostream>\nint main(){...}'
    }, 
    headers=headers
)
```

### Contest Participation

```python
# Get upcoming contests
response = requests.get('http://localhost:8000/api/contests/', headers=headers)
contests = response.json()

# Register for contest
response = requests.post('http://localhost:8000/api/contests/1/register', headers=headers)

# Get contest leaderboard
response = requests.get('http://localhost:8000/api/contests/1/leaderboard', headers=headers)
leaderboard = response.json()
```

## Troubleshooting

### Common Issues

1. **Database Connection Errors**:
   ```bash
   # Check database status
   docker-compose ps db
   
   # Reset database
   docker-compose down -v
   docker-compose up db
   ```

2. **Judge System Not Working**:
   ```bash
   # Check judge logs
   docker-compose logs judge
   
   # Verify sandboxing permissions
   docker exec -it judge_container ls -la /tmp/judge
   ```

3. **Frontend Build Errors**:
   ```bash
   # Clear node modules and reinstall
   cd frontend
   rm -rf node_modules package-lock.json
   npm install
   ```

4. **Memory Issues in Judge**:
   ```bash
   # Increase container memory limits
   docker-compose up --scale judge=2
   ```

## Performance Optimization

### Database Optimization

```sql
-- Create indexes for frequently queried columns
CREATE INDEX idx_problems_difficulty ON problems(difficulty);
CREATE INDEX idx_submissions_user_id ON submissions(user_id);
CREATE INDEX idx_submissions_problem_id ON submissions(problem_id);
CREATE INDEX idx_contests_start_time ON contests(start_time);
```

### Caching Strategy

```python
# Backend caching with Redis
import redis
import json

redis_client = redis.Redis.from_url(os.getenv('REDIS_URL'))

def get_cached_problems():
    cached = redis_client.get('problems:all')
    if cached:
        return json.loads(cached)
    
    # Fetch from database and cache
    problems = fetch_problems_from_db()
    redis_client.setex('problems:all', 300, json.dumps(problems))
    return problems
```

## Next Steps

- [Platform Architecture](./architecture) - Understand the system design
- [Problem Creation Guide](./problems) - Learn to create and manage problems
- [Contest Management](./contests) - Set up and run contests
- [Judge System](./judge) - Deep dive into code execution
- [API Reference](./api) - Complete API documentation
- [Deployment Guide](./deployment) - Deploy to production

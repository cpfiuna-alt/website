---
title: "Guía de Contribución"
description: "Cómo contribuir al desarrollo de la plataforma de programación competitiva"
chapter: "Desarrollo"
section: "Guía de Contribución"
order: 1
---

# Contributing to Competitive Programming Platform

Thank you for your interest in contributing to our competitive programming platform! This guide will help you get started with contributing code, documentation, and other improvements.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Contributing Workflow](#contributing-workflow)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Documentation](#documentation)
- [Issue Reporting](#issue-reporting)
- [Pull Request Process](#pull-request-process)
- [Community Guidelines](#community-guidelines)

## Getting Started

### Prerequisites

Before contributing, ensure you have:

- Node.js 18+ and npm/yarn
- Git knowledge
- Basic understanding of React, Node.js, and PostgreSQL
- Docker for local development (recommended)

### Areas for Contribution

We welcome contributions in these areas:

1. **Backend Development** - API endpoints, judge system, database optimization
2. **Frontend Development** - React components, UI/UX improvements, responsive design
3. **Judge System** - Language support, optimization, security improvements
4. **Testing** - Unit tests, integration tests, end-to-end tests
5. **Documentation** - Code documentation, user guides, API documentation
6. **DevOps** - Deployment scripts, monitoring, performance optimization
7. **Problem Sets** - Contest problems, test cases, editorial content

## Development Setup

### 1. Fork and Clone

```bash
# Fork the repository on GitHub, then clone your fork
git clone https://github.com/YOUR_USERNAME/competitive-programming-platform.git
cd competitive-programming-platform

# Add upstream remote
git remote add upstream https://github.com/ORIGINAL_OWNER/competitive-programming-platform.git
```

### 2. Environment Setup

```bash
# Install dependencies
npm install

# Copy environment configuration
cp .env.example .env.development

# Edit configuration file
nano .env.development
```

### 3. Database Setup

Using Docker (Recommended):
```bash
# Start database services
docker-compose up -d postgres redis

# Run migrations and seed data
npm run db:migrate
npm run db:seed
```

Manual Setup:
```bash
# Create PostgreSQL database
createdb competitive_programming_dev

# Install and start Redis
# (Installation varies by OS)

# Run migrations
npm run db:migrate
npm run db:seed
```

### 4. Start Development Server

```bash
# Start all services
npm run dev

# Or start services separately
npm run dev:backend    # Backend API (port 3001)
npm run dev:frontend   # Frontend (port 3000)
npm run dev:judge      # Judge system
```

### 5. Verify Setup

Visit `http://localhost:3000` and verify:
- Login works with seeded user accounts
- Problem submission works
- Real-time updates function properly

## Contributing Workflow

### 1. Create a Feature Branch

```bash
# Update your fork
git checkout main
git pull upstream main

# Create feature branch
git checkout -b feature/your-feature-name
```

### 2. Make Changes

Follow our coding standards and write tests for new functionality.

### 3. Test Your Changes

```bash
# Run all tests
npm test

# Run specific test suites
npm run test:unit
npm run test:integration
npm run test:e2e

# Run linting
npm run lint
npm run lint:fix
```

### 4. Commit Changes

```bash
# Stage changes
git add .

# Commit with descriptive message
git commit -m "feat: add user rating system

- Implement ELO rating calculation
- Add rating history tracking
- Update user profile with rating display
- Add rating-based leaderboard

Closes #123"
```

### 5. Push and Create Pull Request

```bash
# Push to your fork
git push origin feature/your-feature-name

# Create pull request on GitHub
```

## Coding Standards

### General Principles

- Write clean, readable, and maintainable code
- Follow the existing code style and patterns
- Write self-documenting code with clear variable names
- Add comments for complex logic
- Keep functions small and focused

### JavaScript/TypeScript Standards

```javascript
// Use TypeScript for type safety
interface UserProfile {
  id: number;
  username: string;
  rating: number;
  contests_participated: number;
}

// Use meaningful variable names
const calculateUserRating = (submissions: Submission[]): number => {
  // Implementation
};

// Use async/await instead of callbacks
const fetchUserData = async (userId: number): Promise<UserProfile> => {
  try {
    const user = await db.users.findById(userId);
    return user;
  } catch (error) {
    logger.error('Failed to fetch user data', { userId, error });
    throw new Error('User not found');
  }
};
```

### React Component Standards

```tsx
// Use functional components with hooks
import React, { useState, useEffect } from 'react';
import { User } from '../types';

interface UserProfileProps {
  userId: number;
  onUpdate?: (user: User) => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({ userId, onUpdate }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser();
  }, [userId]);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const userData = await api.getUser(userId);
      setUser(userData);
    } catch (error) {
      console.error('Error fetching user:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!user) return <div>User not found</div>;

  return (
    <div className="user-profile">
      <h2>{user.username}</h2>
      <p>Rating: {user.rating}</p>
      {/* Component JSX */}
    </div>
  );
};
```

### Backend API Standards

```javascript
// Use express-validator for input validation
const { body, validationResult } = require('express-validator');

const submitSolution = [
  body('problemId').isInt({ min: 1 }),
  body('language').isIn(['cpp', 'java', 'python', 'javascript']),
  body('sourceCode').isLength({ min: 1, max: 10000 }),
  
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { problemId, language, sourceCode } = req.body;
      const userId = req.user.id;

      const submission = await submissionService.create({
        userId,
        problemId,
        language,
        sourceCode
      });

      // Queue for judging
      await judgeQueue.add('judge-submission', { submissionId: submission.id });

      res.status(201).json({ submission });
    } catch (error) {
      logger.error('Submission failed', { error, userId: req.user.id });
      res.status(500).json({ error: 'Internal server error' });
    }
  }
];
```

### Database Standards

```javascript
// Use migrations for schema changes
exports.up = function(knex) {
  return knex.schema.createTable('contest_participants', function(table) {
    table.increments('id').primary();
    table.integer('contest_id').unsigned().references('contests.id').onDelete('CASCADE');
    table.integer('user_id').unsigned().references('users.id').onDelete('CASCADE');
    table.timestamp('registered_at').defaultTo(knex.fn.now());
    table.integer('rank').nullable();
    table.integer('score').defaultTo(0);
    
    table.unique(['contest_id', 'user_id']);
    table.index(['contest_id', 'rank']);
  });
};

// Use parameterized queries to prevent SQL injection
const getUserSubmissions = async (userId, limit = 50) => {
  return await db('submissions')
    .where('user_id', userId)
    .orderBy('created_at', 'desc')
    .limit(limit);
};
```

## Testing Guidelines

### Unit Tests

```javascript
// Use Jest for unit testing
describe('RatingCalculator', () => {
  describe('calculateNewRating', () => {
    it('should increase rating for better performance', () => {
      const oldRating = 1500;
      const performance = 1600;
      const newRating = RatingCalculator.calculateNewRating(oldRating, performance);
      
      expect(newRating).toBeGreaterThan(oldRating);
      expect(newRating).toBeLessThan(1600);
    });

    it('should handle edge cases', () => {
      expect(() => {
        RatingCalculator.calculateNewRating(-100, 1500);
      }).toThrow('Invalid rating');
    });
  });
});
```

### Integration Tests

```javascript
// Test API endpoints
describe('Submission API', () => {
  let server;
  let authToken;

  beforeAll(async () => {
    server = await createTestServer();
    authToken = await getTestAuthToken();
  });

  afterAll(async () => {
    await cleanupTestData();
    await server.close();
  });

  it('should submit solution successfully', async () => {
    const response = await request(server)
      .post('/api/submissions')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        problemId: 1,
        language: 'cpp',
        sourceCode: '#include <iostream>\nint main() { return 0; }'
      });

    expect(response.status).toBe(201);
    expect(response.body.submission).toBeDefined();
    expect(response.body.submission.status).toBe('pending');
  });
});
```

### End-to-End Tests

```javascript
// Use Playwright or Cypress
describe('Contest Participation', () => {
  it('should allow user to join contest and submit solution', async () => {
    await page.goto('/contests/1');
    await page.click('[data-testid="join-contest"]');
    
    await page.click('[data-testid="problem-1"]');
    await page.fill('[data-testid="code-editor"]', sampleSolution);
    await page.click('[data-testid="submit-button"]');
    
    await expect(page.locator('[data-testid="submission-status"]')).toContainText('Submitted');
  });
});
```

## Documentation

### Code Documentation

```javascript
/**
 * Calculates new user rating based on contest performance
 * @param {number} currentRating - User's current rating
 * @param {number} performance - User's performance rating in contest
 * @param {number} contestWeight - Weight of the contest (default: 1.0)
 * @returns {number} New calculated rating
 * @throws {Error} When ratings are invalid
 */
function calculateNewRating(currentRating, performance, contestWeight = 1.0) {
  if (currentRating < 0 || performance < 0) {
    throw new Error('Ratings must be non-negative');
  }
  
  // ELO-based calculation with contest weight
  const K = 32 * contestWeight;
  const expected = 1 / (1 + Math.pow(10, (performance - currentRating) / 400));
  
  return Math.round(currentRating + K * (1 - expected));
}
```

### API Documentation

Use OpenAPI/Swagger format:

```yaml
# openapi.yml
paths:
  /api/submissions:
    post:
      summary: Submit solution to problem
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                problemId:
                  type: integer
                  example: 1
                language:
                  type: string
                  enum: [cpp, java, python, javascript]
                sourceCode:
                  type: string
      responses:
        '201':
          description: Solution submitted successfully
        '400':
          description: Invalid input
        '401':
          description: Authentication required
```

## Issue Reporting

### Bug Reports

Use this template:

```markdown
## Bug Description
Brief description of the bug

## Steps to Reproduce
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

## Expected Behavior
What you expected to happen

## Actual Behavior
What actually happened

## Environment
- OS: [e.g. Windows 10, macOS 12, Ubuntu 20.04]
- Browser: [e.g. Chrome 95, Firefox 94]
- Platform Version: [e.g. v1.2.3]

## Additional Context
Screenshots, logs, or other relevant information
```

### Feature Requests

```markdown
## Feature Description
Clear description of the requested feature

## Use Case
Why is this feature needed? What problem does it solve?

## Proposed Solution
How would you like this feature to work?

## Alternatives Considered
Any alternative solutions you've considered

## Additional Context
Mockups, examples, or related features
```

## Pull Request Process

### PR Checklist

Before submitting a PR, ensure:

- [ ] Code follows project style guidelines
- [ ] All tests pass (`npm test`)
- [ ] New functionality includes tests
- [ ] Documentation is updated
- [ ] Commit messages are descriptive
- [ ] PR description explains changes
- [ ] Breaking changes are documented

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update
- [ ] Performance improvement

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] Manual testing completed

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No breaking changes (or documented)

## Screenshots (if applicable)
Add screenshots for UI changes
```

### Review Process

1. **Automated Checks** - CI/CD pipeline runs tests and linting
2. **Code Review** - At least one maintainer reviews the code
3. **Testing** - Changes are tested in staging environment
4. **Approval** - PR is approved by maintainers
5. **Merge** - PR is merged into main branch

## Community Guidelines

### Code of Conduct

We are committed to providing a welcoming and inclusive environment:

- **Be respectful** - Treat everyone with respect and kindness
- **Be constructive** - Provide helpful feedback and suggestions
- **Be patient** - Help newcomers and be patient with questions
- **Be collaborative** - Work together to improve the platform

### Communication Channels

- **GitHub Issues** - Bug reports and feature requests
- **GitHub Discussions** - General discussions and questions
- **Discord Server** - Real-time chat and community interaction
- **Email** - Direct contact with maintainers

### Recognition

Contributors are recognized through:

- Contributor credits in documentation
- GitHub contributor stats
- Special roles in Discord community
- Acknowledgment in release notes

## Getting Help

If you need help with contributing:

1. Check existing documentation and issues
2. Join our Discord community
3. Create a GitHub discussion
4. Reach out to maintainers

Thank you for contributing to our competitive programming platform! Your contributions help make competitive programming more accessible and enjoyable for everyone.

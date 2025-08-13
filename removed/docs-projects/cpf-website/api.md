---
title: "Integración de APIs"
description: "Guía de integración con APIs externas y servicios"
chapter: "Desarrollo"
section: "APIs y Servicios"
order: 1
---

# API Integration Guide

## Overview

The CPF Website integrates with several external APIs and services to provide dynamic functionality while maintaining a static site architecture.

## External Service Integrations

### EmailJS Integration

EmailJS enables client-side email sending without a backend server.

#### Setup

1. **Create EmailJS Account**
   - Visit [EmailJS.com](https://www.emailjs.com/)
   - Create account and verify email

2. **Configure Email Service**
   ```javascript
   // Email service configuration
   const emailConfig = {
     serviceId: process.env.REACT_APP_EMAILJS_SERVICE_ID,
     templateId: process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
     publicKey: process.env.REACT_APP_EMAILJS_PUBLIC_KEY
   };
   ```

3. **Environment Variables**
   ```env
   REACT_APP_EMAILJS_SERVICE_ID=service_xxxxxxx
   REACT_APP_EMAILJS_TEMPLATE_ID=template_xxxxxxx
   REACT_APP_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxx
   ```

#### Implementation

```tsx
// src/services/emailService.ts
import emailjs from '@emailjs/browser';

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export class EmailService {
  private static serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID!;
  private static templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID!;
  private static publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY!;

  static async sendContactMessage(data: ContactFormData): Promise<void> {
    try {
      const result = await emailjs.send(
        this.serviceId,
        this.templateId,
        {
          from_name: data.name,
          from_email: data.email,
          subject: data.subject,
          message: data.message,
          to_email: 'contact@cpf-fiuna.org'
        },
        this.publicKey
      );

      if (result.status !== 200) {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('EmailJS Error:', error);
      throw new Error('Failed to send message. Please try again.');
    }
  }

  static async sendEventRegistration(eventData: {
    eventId: string;
    participantName: string;
    participantEmail: string;
    additionalInfo?: string;
  }): Promise<void> {
    try {
      await emailjs.send(
        this.serviceId,
        'template_event_registration',
        {
          event_id: eventData.eventId,
          participant_name: eventData.participantName,
          participant_email: eventData.participantEmail,
          additional_info: eventData.additionalInfo || 'N/A',
          to_email: 'events@cpf-fiuna.org'
        },
        this.publicKey
      );
    } catch (error) {
      console.error('Event registration error:', error);
      throw new Error('Failed to register for event');
    }
  }
}
```

#### Usage in Components

```tsx
// src/components/sections/Contact.tsx
import { useState } from 'react';
import { EmailService, ContactFormData } from '../../services/emailService';

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await EmailService.sendContactMessage(formData);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Form fields */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      {/* More form fields... */}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>

      {submitStatus === 'success' && (
        <p className="text-green-600">Message sent successfully!</p>
      )}
      {submitStatus === 'error' && (
        <p className="text-red-600">Failed to send message. Please try again.</p>
      )}
    </form>
  );
};
```

### Firebase Integration

Firebase provides authentication, hosting, and analytics capabilities.

#### Setup

```bash
npm install firebase
```

```typescript
// src/config/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
```

#### Authentication Service

```typescript
// src/services/authService.ts
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  User 
} from 'firebase/auth';
import { auth } from '../config/firebase';

export class AuthService {
  static async signIn(email: string, password: string): Promise<User> {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  }

  static async signUp(email: string, password: string): Promise<User> {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  }

  static async signOut(): Promise<void> {
    await signOut(auth);
  }

  static getCurrentUser(): User | null {
    return auth.currentUser;
  }
}
```

### GitHub API Integration

For fetching repository information and project statistics.

```typescript
// src/services/githubService.ts
interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  updated_at: string;
}

export class GitHubService {
  private static readonly BASE_URL = 'https://api.github.com';
  private static readonly ORG_NAME = 'CPF-FIUNA';

  static async getOrganizationRepos(): Promise<GitHubRepo[]> {
    try {
      const response = await fetch(`${this.BASE_URL}/orgs/${this.ORG_NAME}/repos`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch repositories');
      }

      const repos = await response.json();
      return repos.filter((repo: GitHubRepo) => !repo.name.includes('private'));
    } catch (error) {
      console.error('GitHub API Error:', error);
      return [];
    }
  }

  static async getRepositoryInfo(repoName: string): Promise<GitHubRepo | null> {
    try {
      const response = await fetch(`${this.BASE_URL}/repos/${this.ORG_NAME}/${repoName}`);
      
      if (!response.ok) {
        return null;
      }

      return await response.json();
    } catch (error) {
      console.error('GitHub API Error:', error);
      return null;
    }
  }

  static async getContributors(repoName: string): Promise<any[]> {
    try {
      const response = await fetch(`${this.BASE_URL}/repos/${this.ORG_NAME}/${repoName}/contributors`);
      
      if (!response.ok) {
        return [];
      }

      return await response.json();
    } catch (error) {
      console.error('GitHub API Error:', error);
      return [];
    }
  }
}
```

## Content Management APIs

### Markdown Content Loading

```typescript
// src/services/contentService.ts
export class ContentService {
  private static readonly CONTENT_BASE_URL = '/content';

  static async loadMarkdownContent(path: string): Promise<string> {
    try {
      const response = await fetch(`${this.CONTENT_BASE_URL}/${path}.md`);
      
      if (!response.ok) {
        throw new Error(`Failed to load content: ${path}`);
      }

      return await response.text();
    } catch (error) {
      console.error('Content loading error:', error);
      return '';
    }
  }

  static async loadProjectDocs(projectId: string): Promise<any> {
    try {
      const response = await fetch(`${this.CONTENT_BASE_URL}/docs-projects/${projectId}/index.md`);
      
      if (!response.ok) {
        throw new Error(`Failed to load project docs: ${projectId}`);
      }

      const content = await response.text();
      return this.parseMarkdownWithFrontmatter(content);
    } catch (error) {
      console.error('Project docs loading error:', error);
      return null;
    }
  }

  private static parseMarkdownWithFrontmatter(content: string) {
    const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
    const match = content.match(frontmatterRegex);

    if (!match) {
      return { frontmatter: {}, content };
    }

    const [, frontmatterYaml, markdownContent] = match;
    
    // Simple YAML parsing for frontmatter
    const frontmatter: any = {};
    frontmatterYaml.split('\n').forEach(line => {
      const [key, ...valueParts] = line.split(':');
      if (key && valueParts.length > 0) {
        frontmatter[key.trim()] = valueParts.join(':').trim();
      }
    });

    return { frontmatter, content: markdownContent };
  }
}
```

## API Error Handling

### Centralized Error Handler

```typescript
// src/utils/errorHandler.ts
export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export class ErrorHandler {
  static handle(error: unknown): ApiError {
    if (error instanceof ApiError) {
      return error;
    }

    if (error instanceof Error) {
      return new ApiError(error.message);
    }

    return new ApiError('An unexpected error occurred');
  }

  static async handleResponse(response: Response): Promise<Response> {
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new ApiError(
        errorMessage || 'Request failed',
        response.status
      );
    }

    return response;
  }
}
```

### React Hook for API Calls

```typescript
// src/hooks/useApi.ts
import { useState, useEffect } from 'react';
import { ErrorHandler, ApiError } from '../utils/errorHandler';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: ApiError | null;
}

export function useApi<T>(
  apiCall: () => Promise<T>,
  dependencies: any[] = []
): UseApiState<T> {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    let isCancelled = false;

    const fetchData = async () => {
      setState(prev => ({ ...prev, loading: true, error: null }));

      try {
        const result = await apiCall();
        
        if (!isCancelled) {
          setState({
            data: result,
            loading: false,
            error: null
          });
        }
      } catch (error) {
        if (!isCancelled) {
          setState({
            data: null,
            loading: false,
            error: ErrorHandler.handle(error)
          });
        }
      }
    };

    fetchData();

    return () => {
      isCancelled = true;
    };
  }, dependencies);

  return state;
}
```

## Rate Limiting and Caching

### Request Caching

```typescript
// src/utils/cache.ts
interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

export class ApiCache {
  private static cache = new Map<string, CacheEntry<any>>();

  static set<T>(key: string, data: T, ttlMinutes: number = 30): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl: ttlMinutes * 60 * 1000
    });
  }

  static get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    
    if (!entry) {
      return null;
    }

    if (Date.now() - entry.timestamp > entry.ttl) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }

  static clear(): void {
    this.cache.clear();
  }
}
```

### Rate Limited API Service

```typescript
// src/services/rateLimitedApiService.ts
export class RateLimitedApiService {
  private static requestQueue: Array<() => Promise<any>> = [];
  private static isProcessing = false;
  private static readonly RATE_LIMIT_DELAY = 1000; // 1 second between requests

  static async queueRequest<T>(apiCall: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.requestQueue.push(async () => {
        try {
          const result = await apiCall();
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });

      this.processQueue();
    });
  }

  private static async processQueue(): Promise<void> {
    if (this.isProcessing || this.requestQueue.length === 0) {
      return;
    }

    this.isProcessing = true;

    while (this.requestQueue.length > 0) {
      const request = this.requestQueue.shift();
      if (request) {
        await request();
        await this.delay(this.RATE_LIMIT_DELAY);
      }
    }

    this.isProcessing = false;
  }

  private static delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
```

## Testing API Integrations

### Mock Services for Testing

```typescript
// src/services/__mocks__/emailService.ts
export class EmailService {
  static async sendContactMessage(data: any): Promise<void> {
    console.log('Mock: Sending email', data);
    // Simulate success
  }

  static async sendEventRegistration(data: any): Promise<void> {
    console.log('Mock: Registering for event', data);
    // Simulate success
  }
}
```

### Integration Tests

```typescript
// src/services/__tests__/emailService.test.ts
import { EmailService } from '../emailService';

describe('EmailService', () => {
  beforeEach(() => {
    // Setup test environment
    process.env.REACT_APP_EMAILJS_SERVICE_ID = 'test_service';
    process.env.REACT_APP_EMAILJS_TEMPLATE_ID = 'test_template';
    process.env.REACT_APP_EMAILJS_PUBLIC_KEY = 'test_key';
  });

  it('should send contact message successfully', async () => {
    const mockData = {
      name: 'Test User',
      email: 'test@example.com',
      subject: 'Test Subject',
      message: 'Test message'
    };

    // Mock emailjs
    jest.mock('@emailjs/browser', () => ({
      send: jest.fn().mockResolvedValue({ status: 200 })
    }));

    await expect(EmailService.sendContactMessage(mockData)).resolves.not.toThrow();
  });
});
```

## Security Best Practices

### API Key Management

```typescript
// src/utils/config.ts
export class Config {
  static validateRequiredEnvVars(): void {
    const required = [
      'REACT_APP_EMAILJS_SERVICE_ID',
      'REACT_APP_EMAILJS_TEMPLATE_ID',
      'REACT_APP_EMAILJS_PUBLIC_KEY'
    ];

    const missing = required.filter(key => !process.env[key]);

    if (missing.length > 0) {
      throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
    }
  }

  static getEmailJSConfig() {
    return {
      serviceId: process.env.REACT_APP_EMAILJS_SERVICE_ID!,
      templateId: process.env.REACT_APP_EMAILJS_TEMPLATE_ID!,
      publicKey: process.env.REACT_APP_EMAILJS_PUBLIC_KEY!
    };
  }
}
```

### Input Validation

```typescript
// src/utils/validation.ts
export class Validator {
  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static sanitizeInput(input: string): string {
    return input.trim().replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  }

  static validateContactForm(data: any): string[] {
    const errors: string[] = [];

    if (!data.name || data.name.length < 2) {
      errors.push('Name must be at least 2 characters long');
    }

    if (!data.email || !this.isValidEmail(data.email)) {
      errors.push('Valid email is required');
    }

    if (!data.message || data.message.length < 10) {
      errors.push('Message must be at least 10 characters long');
    }

    return errors;
  }
}
```

# Deployment and Maintenance Guide

## Overview

This guide covers the deployment process, maintenance procedures, and operational aspects of the CPF Website. It's designed for developers, system administrators, and project maintainers who need to deploy, monitor, and maintain the website infrastructure.

## Table of Contents

1. [Deployment Architecture](#deployment-architecture)
2. [Environment Setup](#environment-setup)
3. [Deployment Process](#deployment-process)
4. [Monitoring and Analytics](#monitoring-and-analytics)
5. [Maintenance Procedures](#maintenance-procedures)
6. [Performance Optimization](#performance-optimization)
7. [Security Considerations](#security-considerations)
8. [Backup and Recovery](#backup-and-recovery)
9. [Troubleshooting](#troubleshooting)
10. [Scaling Considerations](#scaling-considerations)

## Deployment Architecture

### Current Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   GitHub Repo   │───▶│   Build Process │───▶│   Hosting CDN   │
│                 │    │   (CI/CD)       │    │   (Vercel/      │
│ Source Code     │    │                 │    │    Netlify)     │
│ Content Files   │    │ - Build Assets  │    │                 │
│ Configuration   │    │ - Optimize      │    │ - Global CDN    │
└─────────────────┘    │ - Deploy        │    │ - SSL/TLS       │
                       └─────────────────┘    │ - Custom Domain │
                                              └─────────────────┘
```

### Recommended Production Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   GitHub Repo   │───▶│   CI/CD Pipeline│───▶│   Edge Network  │
│                 │    │                 │    │                 │
│ - Source Code   │    │ - Automated     │    │ - Global CDN    │
│ - Content       │    │   Testing       │    │ - Edge Caching  │
│ - Config        │    │ - Build Process │    │ - DDoS Protection│
└─────────────────┘    │ - Deployment    │    │ - SSL/TLS       │
                       │ - Notifications │    └─────────────────┘
                       └─────────────────┘              │
                                                       ▼
                       ┌─────────────────┐    ┌─────────────────┐
                       │   Monitoring    │    │   Analytics     │
                       │                 │    │                 │
                       │ - Uptime        │    │ - User Behavior │
                       │ - Performance   │    │ - Performance   │
                       │ - Error Tracking│    │ - Conversion    │
                       └─────────────────┘    └─────────────────┘
```

## Environment Setup

### Development Environment

#### Prerequisites
```bash
# Node.js (v18 or higher)
node --version

# Bun (recommended) or npm
bun --version

# Git
git --version
```

#### Setup Commands
```bash
# Clone repository
git clone https://github.com/club-programacion-fiuna/cpf-website.git
cd cpf-website

# Install dependencies
bun install

# Start development server
bun dev
```

#### Environment Variables
Create `.env.local` file:
```env
# Analytics
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
VITE_HOTJAR_ID=xxxxxxx

# Optional: API endpoints
VITE_API_BASE_URL=https://api.cpf-fiuna.com
VITE_CONTACT_FORM_ENDPOINT=https://formspree.io/your-form-id

# Optional: Feature flags
VITE_ENABLE_BLOG_COMMENTS=true
VITE_ENABLE_SEARCH=true
```

### Staging Environment

#### Vercel Setup
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

#### Netlify Setup
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy to preview
netlify deploy

# Deploy to production
netlify deploy --prod
```

## Deployment Process

### Automated Deployment (Recommended)

#### GitHub Actions Workflow
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Bun
        uses: oven-sh/setup-bun@v1
        with:
          bun-version: latest
          
      - name: Install dependencies
        run: bun install
        
      - name: Run type check
        run: bun run type-check
        
      - name: Run linting
        run: bun run lint
        
      - name: Build project
        run: bun run build
        
      - name: Run tests
        run: bun test

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Bun
        uses: oven-sh/setup-bun@v1
        
      - name: Install dependencies
        run: bun install
        
      - name: Build project
        run: bun run build
        env:
          VITE_GA_MEASUREMENT_ID: ${{ secrets.GA_MEASUREMENT_ID }}
          VITE_HOTJAR_ID: ${{ secrets.HOTJAR_ID }}
          
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

#### Vercel Configuration
Create `vercel.json`:

```json
{
  "buildCommand": "bun run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "installCommand": "bun install",
  "devCommand": "bun dev",
  "functions": {
    "app/api/**/*.ts": {
      "runtime": "nodejs18.x"
    }
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    },
    {
      "source": "/static/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ],
  "redirects": [
    {
      "source": "/old-page",
      "destination": "/new-page",
      "permanent": true
    }
  ]
}
```

### Manual Deployment

#### Build and Deploy Steps
```bash
# 1. Update dependencies
bun update

# 2. Run quality checks
bun run lint
bun run type-check
bun test

# 3. Build for production
bun run build

# 4. Preview build locally
bun run preview

# 5. Deploy to staging
vercel

# 6. Test staging deployment
# Run manual tests and checks

# 7. Deploy to production
vercel --prod

# 8. Verify production deployment
curl -I https://cpf-fiuna.com
```

#### Pre-deployment Checklist
- [ ] All tests pass
- [ ] No TypeScript errors
- [ ] No linting errors
- [ ] Build completes successfully
- [ ] Preview works correctly
- [ ] Environment variables are set
- [ ] Analytics tracking is configured
- [ ] Performance is acceptable
- [ ] SEO metadata is correct
- [ ] Images are optimized

## Monitoring and Analytics

### Performance Monitoring

#### Web Vitals Tracking
```typescript
// src/utils/analytics.ts
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

function sendToAnalytics({ name, delta, value, id }: Metric) {
  // Send to Google Analytics
  gtag('event', name, {
    event_category: 'Web Vitals',
    value: Math.round(name === 'CLS' ? delta * 1000 : delta),
    event_label: id,
    non_interaction: true,
  });

  // Send to monitoring service
  fetch('/api/analytics', {
    method: 'POST',
    body: JSON.stringify({ name, delta, value, id }),
    headers: { 'Content-Type': 'application/json' },
  });
}

// Measure all Web Vitals
getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);
```

#### Error Tracking
```typescript
// src/utils/errorTracking.ts
import { captureException } from '@sentry/react';

window.addEventListener('error', (event) => {
  captureException(event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  captureException(event.reason);
});

// React Error Boundary
export class ErrorBoundary extends Component {
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    captureException(error, { contexts: { react: errorInfo } });
  }
}
```

### Analytics Setup

#### Google Analytics 4
```typescript
// src/utils/gtag.ts
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

export function gtag(...args: any[]) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(arguments);
}

export function initGA() {
  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID, {
    page_title: document.title,
    page_location: window.location.href,
  });
}

// Track page views
export function trackPageView(path: string, title: string) {
  gtag('config', GA_MEASUREMENT_ID, {
    page_path: path,
    page_title: title,
  });
}

// Track events
export function trackEvent(action: string, category: string, label?: string, value?: number) {
  gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
}
```

### Uptime Monitoring

#### Health Check Endpoint
```typescript
// public/health.json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00Z",
  "version": "1.0.0",
  "environment": "production"
}
```

#### Monitoring Services
- **Uptime Robot**: Basic uptime monitoring
- **Pingdom**: Advanced monitoring with alerts
- **StatusPage**: Public status page for users
- **New Relic**: Application performance monitoring

## Maintenance Procedures

### Regular Maintenance Tasks

#### Daily Tasks
- [ ] Check deployment status
- [ ] Review error logs
- [ ] Monitor performance metrics
- [ ] Check uptime status

#### Weekly Tasks
- [ ] Update dependencies
- [ ] Review analytics data
- [ ] Check security alerts
- [ ] Backup content and configuration
- [ ] Review and merge content updates

#### Monthly Tasks
- [ ] Performance audit
- [ ] Security review
- [ ] Content audit and cleanup
- [ ] Update documentation
- [ ] Review and optimize build processes

#### Quarterly Tasks
- [ ] Major dependency updates
- [ ] Infrastructure review
- [ ] Performance optimization
- [ ] Security penetration testing
- [ ] Disaster recovery testing

### Dependency Management

#### Update Strategy
```bash
# Check for outdated packages
bun outdated

# Update to latest compatible versions
bun update

# Update to latest versions (potentially breaking)
bun update --latest

# Update specific package
bun update react@latest
```

#### Security Updates
```bash
# Check for security vulnerabilities
bun audit

# Fix vulnerabilities automatically
bun audit --fix

# Review security advisories
npm audit report
```

### Content Maintenance

#### Content Review Process
1. **Automated Checks**: Link validation, image optimization
2. **Manual Review**: Content relevance and accuracy
3. **SEO Audit**: Search performance and optimization
4. **User Feedback**: Incorporate user suggestions

#### Content Backup
```bash
# Backup content directory
tar -czf content-backup-$(date +%Y%m%d).tar.gz src/content/

# Backup to cloud storage
aws s3 cp content-backup-$(date +%Y%m%d).tar.gz s3://cpf-backups/content/

# Database backup (if applicable)
mysqldump -u user -p database > backup-$(date +%Y%m%d).sql
```

## Performance Optimization

### Build Optimization

#### Vite Configuration
```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
});
```

#### Image Optimization
```bash
# Install image optimization tools
bun add -D imagemin imagemin-webp imagemin-mozjpeg imagemin-pngquant

# Optimize images during build
bun run optimize-images
```

### Runtime Optimization

#### Code Splitting
```typescript
// Lazy load pages
const BlogPage = lazy(() => import('./pages/BlogPage'));
const EventsPage = lazy(() => import('./pages/EventsPage'));

// Lazy load components
const HeavyComponent = lazy(() => import('./components/HeavyComponent'));
```

#### Caching Strategy
```typescript
// Service Worker for caching
self.addEventListener('fetch', (event) => {
  if (event.request.destination === 'image') {
    event.respondWith(
      caches.open('images').then((cache) => {
        return cache.match(event.request).then((response) => {
          return response || fetch(event.request).then((fetchResponse) => {
            cache.put(event.request, fetchResponse.clone());
            return fetchResponse;
          });
        });
      })
    );
  }
});
```

## Security Considerations

### Content Security Policy

#### CSP Header Configuration
```
Content-Security-Policy: 
  default-src 'self';
  script-src 'self' 'unsafe-inline' https://www.googletagmanager.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com;
  img-src 'self' data: https:;
  connect-src 'self' https://www.google-analytics.com;
  frame-ancestors 'none';
```

### Security Headers
```typescript
// Security headers in deployment configuration
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" },
        { "key": "Referrer-Policy", "value": "origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" }
      ]
    }
  ]
}
```

### Dependency Security
```bash
# Regular security audits
bun audit

# Automated dependency updates
# Use Dependabot or Renovate Bot

# Security scanning in CI/CD
npm audit --audit-level high
```

## Backup and Recovery

### Backup Strategy

#### Automated Backups
```bash
#!/bin/bash
# backup.sh - Automated backup script

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups/cpf-website"

# Create backup directory
mkdir -p $BACKUP_DIR

# Backup source code
git clone https://github.com/club-programacion-fiuna/cpf-website.git $BACKUP_DIR/source-$DATE

# Backup content
tar -czf $BACKUP_DIR/content-$DATE.tar.gz src/content/

# Backup configuration
cp -r .env* $BACKUP_DIR/config-$DATE/

# Upload to cloud storage
aws s3 sync $BACKUP_DIR s3://cpf-backups/website/

# Clean up old backups (keep last 30 days)
find $BACKUP_DIR -name "*.tar.gz" -mtime +30 -delete
```

#### Recovery Procedures
```bash
# Restore from backup
cd /recovery
aws s3 sync s3://cpf-backups/website/latest ./

# Restore source code
git clone backup-repo
cd cpf-website

# Restore dependencies
bun install

# Restore configuration
cp ../config/.env.production .env

# Build and deploy
bun run build
vercel --prod
```

### Disaster Recovery Plan

#### Recovery Time Objectives (RTO)
- **Website Down**: 15 minutes
- **Content Loss**: 1 hour
- **Complete Infrastructure**: 4 hours

#### Recovery Point Objectives (RPO)
- **Code Changes**: Real-time (Git)
- **Content Changes**: 1 hour
- **Configuration**: 24 hours

## Troubleshooting

### Common Issues

#### Build Failures
```bash
# Clear cache and rebuild
rm -rf node_modules
rm -rf dist
rm bun.lockb
bun install
bun run build
```

#### Performance Issues
```bash
# Analyze bundle size
bun run build --analyze

# Check for unused dependencies
bunx depcheck

# Profile build performance
bun run build --profile
```

#### Memory Issues
```bash
# Increase Node.js memory limit
export NODE_OPTIONS="--max-old-space-size=4096"
bun run build
```

### Debugging Tools

#### Development Debugging
```typescript
// Debug mode configuration
if (import.meta.env.DEV) {
  // Enable React DevTools
  window.__REACT_DEVTOOLS_GLOBAL_HOOK__ = window.__REACT_DEVTOOLS_GLOBAL_HOOK__ || {};
  
  // Performance debugging
  import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
    getCLS(console.log);
    getFID(console.log);
    getFCP(console.log);
    getLCP(console.log);
    getTTFB(console.log);
  });
}
```

#### Production Debugging
```typescript
// Error reporting
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.MODE,
  beforeSend(event) {
    // Filter out non-critical errors
    if (event.exception) {
      const error = event.exception.values?.[0];
      if (error?.type === 'ChunkLoadError') {
        return null; // Don't report chunk load errors
      }
    }
    return event;
  },
});
```

## Scaling Considerations

### Traffic Scaling

#### CDN Configuration
- **Global Distribution**: Multiple edge locations
- **Cache Optimization**: Appropriate cache headers
- **Image Optimization**: WebP format, responsive images
- **Compression**: Gzip/Brotli compression

#### Performance Monitoring
- **Core Web Vitals**: LCP, FID, CLS tracking
- **Real User Monitoring**: Actual user experience data
- **Synthetic Monitoring**: Automated performance tests

### Content Scaling

#### Content Delivery
- **Pagination**: Large content lists
- **Search Integration**: Full-text search capabilities
- **Content Caching**: Intelligent cache invalidation

#### Content Management
- **Headless CMS**: Scalable content management
- **API Integration**: Dynamic content loading
- **Workflow Automation**: Content publication workflows

### Infrastructure Scaling

#### Horizontal Scaling
- **Multiple Environments**: Dev, staging, production
- **Geographic Distribution**: Regional deployments
- **Load Balancing**: Traffic distribution

#### Monitoring and Alerting
- **Application Monitoring**: Performance metrics
- **Infrastructure Monitoring**: Server resources
- **Alert Configuration**: Proactive issue detection

This comprehensive deployment and maintenance guide ensures the CPF Website remains reliable, performant, and secure while providing clear procedures for ongoing operations and growth.

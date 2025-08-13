---
title: "Guía de Despliegue"
description: "Despliegue del sitio web CPF en diferentes plataformas"
chapter: "Despliegue"
section: "Guía de Despliegue"
order: 1
---

# Deployment Guide

## Overview

The CPF Website is designed to be deployed as a static site with multiple hosting options. This guide covers deployment to various platforms and best practices for production deployments.

## Pre-Deployment Checklist

### 1. Environment Configuration

Ensure all environment variables are properly configured:

```env
# Production environment variables
REACT_APP_EMAILJS_SERVICE_ID=service_production_id
REACT_APP_EMAILJS_TEMPLATE_ID=template_production_id
REACT_APP_EMAILJS_PUBLIC_KEY=production_public_key
REACT_APP_FIREBASE_API_KEY=firebase_production_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-firebase-project
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789
REACT_APP_FIREBASE_APP_ID=1:123456789:web:abcdef123456
REACT_APP_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

### 2. Build Optimization

```bash
# Clean previous builds
rm -rf build/

# Install dependencies
npm ci

# Run tests
npm test -- --coverage --ci

# Build for production
npm run build

# Analyze bundle size
npm run analyze
```

### 3. Performance Audit

```bash
# Install lighthouse CLI
npm install -g lighthouse

# Run lighthouse audit
lighthouse http://localhost:3000 --output html --output-path ./lighthouse-report.html
```

## Deployment Platforms

### Vercel (Recommended)

Vercel provides excellent support for React applications with automatic deployments from Git.

#### Setup

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   # First deployment
   vercel

   # Production deployment
   vercel --prod
   ```

#### Configuration

Create `vercel.json` in the project root:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "build"
      }
    }
  ],
  "routes": [
    {
      "src": "/static/(.*)",
      "headers": {
        "cache-control": "public, max-age=31536000, immutable"
      }
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ],
  "env": {
    "REACT_APP_EMAILJS_SERVICE_ID": "@emailjs-service-id",
    "REACT_APP_EMAILJS_TEMPLATE_ID": "@emailjs-template-id",
    "REACT_APP_EMAILJS_PUBLIC_KEY": "@emailjs-public-key"
  }
}
```

#### Environment Variables in Vercel

```bash
# Set environment variables
vercel env add REACT_APP_EMAILJS_SERVICE_ID
vercel env add REACT_APP_EMAILJS_TEMPLATE_ID
vercel env add REACT_APP_EMAILJS_PUBLIC_KEY
```

### Netlify

Netlify offers another excellent option for static site hosting.

#### Setup

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login**
   ```bash
   netlify login
   ```

3. **Deploy**
   ```bash
   # Build and deploy
   npm run build
   netlify deploy --prod --dir=build
   ```

#### Configuration

Create `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = "build"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[context.production.environment]
  REACT_APP_EMAILJS_SERVICE_ID = "production_service_id"
  REACT_APP_EMAILJS_TEMPLATE_ID = "production_template_id"
  REACT_APP_EMAILJS_PUBLIC_KEY = "production_public_key"

[[headers]]
  for = "/static/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.js"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.css"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

### Firebase Hosting

Firebase Hosting integrates well with other Firebase services.

#### Setup

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login**
   ```bash
   firebase login
   ```

3. **Initialize**
   ```bash
   firebase init hosting
   ```

4. **Deploy**
   ```bash
   npm run build
   firebase deploy
   ```

#### Configuration

`firebase.json`:

```json
{
  "hosting": {
    "public": "build",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ],
    "headers": [
      {
        "source": "/static/**",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "public, max-age=31536000, immutable"
          }
        ]
      }
    ]
  }
}
```

### GitHub Pages

Free hosting option for open-source projects.

#### Setup with GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v3

    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'

    - name: Install dependencies
      run: npm ci

    - name: Run tests
      run: npm test -- --coverage --ci

    - name: Build
      run: npm run build
      env:
        REACT_APP_EMAILJS_SERVICE_ID: ${{ secrets.EMAILJS_SERVICE_ID }}
        REACT_APP_EMAILJS_TEMPLATE_ID: ${{ secrets.EMAILJS_TEMPLATE_ID }}
        REACT_APP_EMAILJS_PUBLIC_KEY: ${{ secrets.EMAILJS_PUBLIC_KEY }}

    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      if: github.ref == 'refs/heads/main'
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./build
```

## Custom Server Deployment

### Docker Deployment

For containerized deployments:

```dockerfile
# Dockerfile
FROM node:18-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

```nginx
# nginx.conf
server {
    listen 80;
    server_name localhost;

    location / {
        root /usr/share/nginx/html;
        index index.html index.htm;
        try_files $uri $uri/ /index.html;
    }

    location /static/ {
        root /usr/share/nginx/html;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private must-revalidate auth;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/javascript
        application/xml+rss;
}
```

### Build and Deploy

```bash
# Build Docker image
docker build -t cpf-website .

# Run container
docker run -p 80:80 cpf-website
```

## CI/CD Pipeline

### GitHub Actions Workflow

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

env:
  NODE_VERSION: '18'

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: ${{ env.NODE_VERSION }}
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run linting
      run: npm run lint
    
    - name: Run type checking
      run: npm run type-check
    
    - name: Run tests
      run: npm test -- --coverage --ci
    
    - name: Upload coverage to Codecov
      uses: codecov/codecov-action@v3
      with:
        file: ./coverage/lcov.info

  build:
    needs: test
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: ${{ env.NODE_VERSION }}
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build application
      run: npm run build
      env:
        REACT_APP_EMAILJS_SERVICE_ID: ${{ secrets.EMAILJS_SERVICE_ID }}
        REACT_APP_EMAILJS_TEMPLATE_ID: ${{ secrets.EMAILJS_TEMPLATE_ID }}
        REACT_APP_EMAILJS_PUBLIC_KEY: ${{ secrets.EMAILJS_PUBLIC_KEY }}
    
    - name: Upload build artifacts
      uses: actions/upload-artifact@v3
      with:
        name: build-files
        path: build/

  deploy-staging:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/develop'
    environment: staging
    
    steps:
    - name: Download build artifacts
      uses: actions/download-artifact@v3
      with:
        name: build-files
        path: build/
    
    - name: Deploy to staging
      run: |
        # Deploy to staging environment
        echo "Deploying to staging..."

  deploy-production:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    environment: production
    
    steps:
    - name: Download build artifacts
      uses: actions/download-artifact@v3
      with:
        name: build-files
        path: build/
    
    - name: Deploy to production
      run: |
        # Deploy to production environment
        echo "Deploying to production..."
```

## Environment-Specific Configurations

### Development Environment

```javascript
// src/config/environment.ts
const developmentConfig = {
  apiUrl: 'http://localhost:3001',
  enableDebugMode: true,
  enableAnalytics: false,
  logLevel: 'debug'
};
```

### Staging Environment

```javascript
const stagingConfig = {
  apiUrl: 'https://api-staging.cpf-fiuna.org',
  enableDebugMode: true,
  enableAnalytics: false,
  logLevel: 'info'
};
```

### Production Environment

```javascript
const productionConfig = {
  apiUrl: 'https://api.cpf-fiuna.org',
  enableDebugMode: false,
  enableAnalytics: true,
  logLevel: 'error'
};
```

## Performance Optimization

### Bundle Optimization

```javascript
// webpack.config.js optimizations
module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
};
```

### Asset Optimization

```bash
# Image optimization
npm install --save-dev imagemin imagemin-webp

# Compress images during build
npm run optimize-images
```

### Service Worker

```javascript
// public/sw.js
const CACHE_NAME = 'cpf-website-v1';
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});
```

## Monitoring and Analytics

### Error Tracking

```javascript
// src/utils/errorTracking.ts
class ErrorTracker {
  static init() {
    window.addEventListener('error', this.handleError);
    window.addEventListener('unhandledrejection', this.handlePromiseRejection);
  }

  static handleError(event) {
    console.error('Global error:', event.error);
    // Send to error tracking service
  }

  static handlePromiseRejection(event) {
    console.error('Unhandled promise rejection:', event.reason);
    // Send to error tracking service
  }
}
```

### Performance Monitoring

```javascript
// src/utils/performanceMonitoring.ts
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

function sendToAnalytics(metric) {
  // Send metrics to analytics service
  console.log(metric);
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);
```

## Security Considerations

### Content Security Policy

```html
<!-- In public/index.html -->
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com; 
               style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; 
               font-src 'self' https://fonts.gstatic.com; 
               img-src 'self' data: https:; 
               connect-src 'self' https://api.emailjs.com https://api.github.com;">
```

### HTTPS Configuration

```javascript
// Redirect HTTP to HTTPS in production
if (process.env.NODE_ENV === 'production' && window.location.protocol !== 'https:') {
  window.location.href = window.location.href.replace('http:', 'https:');
}
```

## Rollback Strategy

### Blue-Green Deployment

```bash
# Deploy to green environment
vercel --prod --target=green

# Test green environment
npm run e2e-test --env=green

# Switch traffic to green
vercel alias set green-deployment.vercel.app cpf-website.com

# Keep blue as backup
vercel alias set blue-deployment.vercel.app cpf-website-backup.com
```

### Database Backup (if applicable)

```bash
# Backup before deployment
npm run backup-data

# Deploy
npm run deploy

# Rollback if needed
npm run restore-data
```

## Post-Deployment Checklist

1. **Verify deployment**
   - [ ] Site loads correctly
   - [ ] All pages accessible
   - [ ] Contact form works
   - [ ] No console errors

2. **Performance check**
   - [ ] Page load times acceptable
   - [ ] Lighthouse score > 90
   - [ ] No broken links

3. **SEO verification**
   - [ ] Meta tags present
   - [ ] Sitemap accessible
   - [ ] Robots.txt configured

4. **Analytics setup**
   - [ ] Google Analytics working
   - [ ] Error tracking active
   - [ ] Performance monitoring enabled

5. **Security check**
   - [ ] HTTPS enforced
   - [ ] CSP headers present
   - [ ] No sensitive data exposed

## Troubleshooting Common Issues

### Build Failures

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Check for conflicting dependencies
npm ls
```

### Environment Variable Issues

```bash
# Verify environment variables
echo $REACT_APP_EMAILJS_SERVICE_ID

# Check build logs for missing variables
npm run build 2>&1 | grep -i "environment"
```

### Routing Issues

```javascript
// Ensure proper routing configuration
{
  "rewrites": [
    {
      "source": "**",
      "destination": "/index.html"
    }
  ]
}
```

---
title: "Guía de Contribución"
description: "Guía completa para contribuir al proyecto Biblioteca Digital"
chapter: "Desarrollo"
section: "Guía de Contribución"
order: 1
---

# Biblioteca Digital Contributing Guide

Welcome to the Biblioteca Digital project! This guide will help you understand how to contribute to our digital library system.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Development Environment](#development-environment)
3. [Project Structure](#project-structure)
4. [Development Workflow](#development-workflow)
5. [Frontend Development](#frontend-development)
6. [Backend Development](#backend-development)
7. [Database Development](#database-development)
8. [Search & Indexing](#search--indexing)
9. [Document Processing](#document-processing)
10. [Testing Guidelines](#testing-guidelines)
11. [Code Style & Standards](#code-style--standards)
12. [Documentation](#documentation)
13. [Pull Request Process](#pull-request-process)
14. [Community Guidelines](#community-guidelines)

## Getting Started

### Prerequisites

Before contributing, make sure you have:

- Node.js 18+ installed
- Docker and Docker Compose
- Git configured with your GitHub account
- PostgreSQL 14+ (for local development)
- Basic knowledge of Next.js, React, and TypeScript

### First Time Setup

1. **Fork the repository:**

```bash
# Fork the repo on GitHub, then clone your fork
git clone https://github.com/your-username/biblioteca-digital.git
cd biblioteca-digital

# Add upstream remote
git remote add upstream https://github.com/original-org/biblioteca-digital.git
```

2. **Set up development environment:**

```bash
# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local

# Start development services
docker-compose -f docker-compose.dev.yml up -d

# Run database migrations
npm run db:migrate

# Seed development data
npm run db:seed

# Start development server
npm run dev
```

3. **Verify setup:**

Visit `http://localhost:3000` to confirm the application is running correctly.

## Development Environment

### Docker Development Stack

```yaml
# docker-compose.dev.yml
version: '3.8'

services:
  postgres:
    image: postgres:14
    environment:
      POSTGRES_DB: biblioteca_dev
      POSTGRES_USER: dev_user
      POSTGRES_PASSWORD: dev_password
    ports:
      - "5432:5432"
    volumes:
      - postgres_dev_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:8.8.0
    environment:
      - discovery.type=single-node
      - xpack.security.enabled=false
    ports:
      - "9200:9200"

  minio:
    image: minio/minio
    command: server /data --console-address ":9001"
    environment:
      MINIO_ROOT_USER: dev_access_key
      MINIO_ROOT_PASSWORD: dev_secret_key
    ports:
      - "9000:9000"
      - "9001:9001"

volumes:
  postgres_dev_data:
```

### Environment Configuration

```env
# .env.local (for development)
NODE_ENV=development
DATABASE_URL=postgresql://dev_user:dev_password@localhost:5432/biblioteca_dev
REDIS_URL=redis://localhost:6379
ELASTICSEARCH_URL=http://localhost:9200
S3_ENDPOINT=http://localhost:9000
S3_ACCESS_KEY=dev_access_key
S3_SECRET_KEY=dev_secret_key
S3_BUCKET=biblioteca-dev
NEXTAUTH_SECRET=development-secret
NEXTAUTH_URL=http://localhost:3000
```

### Development Scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint --fix",
    "type-check": "tsc --noEmit",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "db:migrate": "prisma migrate dev",
    "db:seed": "prisma db seed",
    "db:studio": "prisma studio",
    "db:reset": "prisma migrate reset",
    "elasticsearch:setup": "node scripts/setup-elasticsearch.js",
    "format": "prettier --write .",
    "prepare": "husky install"
  }
}
```

## Project Structure

```
biblioteca-digital/
├── components/           # Reusable React components
│   ├── ui/              # Basic UI components
│   ├── forms/           # Form components
│   ├── layout/          # Layout components
│   └── features/        # Feature-specific components
├── pages/               # Next.js pages
│   ├── api/            # API routes
│   ├── auth/           # Authentication pages
│   ├── documents/      # Document-related pages
│   └── admin/          # Admin panel pages
├── lib/                 # Utility libraries
│   ├── auth/           # Authentication logic
│   ├── database/       # Database utilities
│   ├── elasticsearch/  # Search functionality
│   ├── storage/        # File storage utilities
│   └── utils/          # General utilities
├── hooks/              # Custom React hooks
├── types/              # TypeScript type definitions
├── styles/             # Global styles and themes
├── public/             # Static assets
├── prisma/             # Database schema and migrations
├── tests/              # Test files
├── scripts/            # Build and deployment scripts
└── docs/               # Documentation
```

## Development Workflow

### Git Workflow

We use a modified Git Flow workflow:

1. **Branch naming conventions:**

```bash
# Feature branches
feature/document-upload-ui
feature/advanced-search

# Bug fixes
fix/search-pagination-bug
fix/file-upload-error

# Documentation
docs/api-documentation
docs/setup-guide

# Hotfixes
hotfix/security-vulnerability
```

2. **Commit message format:**

```
type(scope): brief description

Detailed explanation of changes made.

- List specific changes
- Include breaking changes
- Reference issues (#123)

Closes #123
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

3. **Development process:**

```bash
# Create feature branch
git checkout -b feature/document-categories

# Make changes and commit
git add -A
git commit -m "feat(documents): add category filtering system

- Add category model and migrations
- Implement category selection UI
- Update search filters to include categories

Closes #45"

# Push and create PR
git push origin feature/document-categories
# Create PR on GitHub
```

## Frontend Development

### Component Development

#### Component Structure

```typescript
// components/documents/DocumentCard.tsx
import { Document } from '@/types/document';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface DocumentCardProps {
  document: Document;
  onEdit?: (document: Document) => void;
  onDelete?: (id: string) => void;
  className?: string;
}

export function DocumentCard({ 
  document, 
  onEdit, 
  onDelete, 
  className 
}: DocumentCardProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <h3 className="text-lg font-semibold">{document.title}</h3>
        <div className="flex gap-2">
          {document.tags.map(tag => (
            <Badge key={tag} variant="secondary">{tag}</Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">{document.description}</p>
        <div className="mt-4 flex justify-between">
          <span className="text-sm text-gray-500">
            {new Date(document.createdAt).toLocaleDateString()}
          </span>
          <div className="flex gap-2">
            {onEdit && (
              <button 
                onClick={() => onEdit(document)}
                className="text-blue-600 hover:text-blue-800"
              >
                Edit
              </button>
            )}
            {onDelete && (
              <button 
                onClick={() => onDelete(document.id)}
                className="text-red-600 hover:text-red-800"
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
```

#### Custom Hooks

```typescript
// hooks/useDocuments.ts
import { useState, useEffect } from 'react';
import { Document, DocumentFilters } from '@/types/document';
import { api } from '@/lib/api';

export function useDocuments(filters: DocumentFilters = {}) {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDocuments();
  }, [filters]);

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const response = await api.documents.list(filters);
      setDocuments(response.data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const createDocument = async (data: Partial<Document>) => {
    const response = await api.documents.create(data);
    setDocuments(prev => [response.data, ...prev]);
    return response.data;
  };

  const updateDocument = async (id: string, data: Partial<Document>) => {
    const response = await api.documents.update(id, data);
    setDocuments(prev => 
      prev.map(doc => doc.id === id ? response.data : doc)
    );
    return response.data;
  };

  const deleteDocument = async (id: string) => {
    await api.documents.delete(id);
    setDocuments(prev => prev.filter(doc => doc.id !== id));
  };

  return {
    documents,
    loading,
    error,
    createDocument,
    updateDocument,
    deleteDocument,
    refetch: fetchDocuments
  };
}
```

### State Management

```typescript
// lib/store/documents.ts
import { create } from 'zustand';
import { Document, DocumentFilters } from '@/types/document';

interface DocumentStore {
  documents: Document[];
  filters: DocumentFilters;
  selectedDocument: Document | null;
  
  setDocuments: (documents: Document[]) => void;
  setFilters: (filters: DocumentFilters) => void;
  setSelectedDocument: (document: Document | null) => void;
  addDocument: (document: Document) => void;
  updateDocument: (id: string, updates: Partial<Document>) => void;
  removeDocument: (id: string) => void;
}

export const useDocumentStore = create<DocumentStore>((set) => ({
  documents: [],
  filters: {},
  selectedDocument: null,
  
  setDocuments: (documents) => set({ documents }),
  setFilters: (filters) => set({ filters }),
  setSelectedDocument: (selectedDocument) => set({ selectedDocument }),
  
  addDocument: (document) => 
    set((state) => ({ documents: [document, ...state.documents] })),
  
  updateDocument: (id, updates) =>
    set((state) => ({
      documents: state.documents.map(doc => 
        doc.id === id ? { ...doc, ...updates } : doc
      )
    })),
    
  removeDocument: (id) =>
    set((state) => ({
      documents: state.documents.filter(doc => doc.id !== id)
    }))
}));
```

## Backend Development

### API Route Development

```typescript
// pages/api/documents/index.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { prisma } from '@/lib/database';
import { documentsSchema } from '@/lib/validations/documents';
import { withAuth } from '@/lib/middleware/auth';
import { withRateLimit } from '@/lib/middleware/rate-limit';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  switch (req.method) {
    case 'GET':
      return handleGet(req, res, session);
    case 'POST':
      return handlePost(req, res, session);
    default:
      return res.status(405).json({ error: 'Method not allowed' });
  }
}

async function handleGet(req: NextApiRequest, res: NextApiResponse, session: any) {
  try {
    const { page = 1, limit = 20, category, tags, search } = req.query;
    
    const where = {
      userId: session.user.id,
      ...(category && { category: category as string }),
      ...(tags && { 
        tags: { 
          hasSome: Array.isArray(tags) ? tags : [tags] 
        } 
      }),
      ...(search && {
        OR: [
          { title: { contains: search as string, mode: 'insensitive' } },
          { description: { contains: search as string, mode: 'insensitive' } }
        ]
      })
    };

    const [documents, total] = await Promise.all([
      prisma.document.findMany({
        where,
        skip: (Number(page) - 1) * Number(limit),
        take: Number(limit),
        orderBy: { createdAt: 'desc' },
        include: {
          user: { select: { name: true, email: true } },
          _count: { select: { views: true, downloads: true } }
        }
      }),
      prisma.document.count({ where })
    ]);

    res.json({
      data: documents,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    console.error('Error fetching documents:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function handlePost(req: NextApiRequest, res: NextApiResponse, session: any) {
  try {
    const validation = documentsSchema.safeParse(req.body);
    
    if (!validation.success) {
      return res.status(400).json({ 
        error: 'Validation failed',
        details: validation.error.issues 
      });
    }

    const document = await prisma.document.create({
      data: {
        ...validation.data,
        userId: session.user.id
      },
      include: {
        user: { select: { name: true, email: true } }
      }
    });

    // Index document for search
    await indexDocument(document);

    res.status(201).json({ data: document });
  } catch (error) {
    console.error('Error creating document:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export default withRateLimit(withAuth(handler));
```

### Database Operations

```typescript
// lib/database/documents.ts
import { Prisma } from '@prisma/client';
import { prisma } from './client';

export class DocumentRepository {
  async findById(id: string, userId?: string) {
    return prisma.document.findFirst({
      where: {
        id,
        ...(userId && { userId })
      },
      include: {
        user: { select: { name: true, email: true } },
        tags: true,
        categories: true
      }
    });
  }

  async search(query: string, filters: DocumentFilters, userId?: string) {
    const where: Prisma.DocumentWhereInput = {
      ...(userId && { userId }),
      ...(filters.category && { category: filters.category }),
      ...(filters.dateFrom && { 
        createdAt: { gte: new Date(filters.dateFrom) } 
      }),
      ...(filters.dateTo && { 
        createdAt: { lte: new Date(filters.dateTo) } 
      }),
      AND: query ? [
        {
          OR: [
            { title: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } },
            { content: { contains: query, mode: 'insensitive' } }
          ]
        }
      ] : undefined
    };

    return prisma.document.findMany({
      where,
      include: {
        user: { select: { name: true, email: true } },
        _count: { select: { views: true, downloads: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async incrementViews(id: string) {
    return prisma.document.update({
      where: { id },
      data: {
        views: { increment: 1 },
        lastViewedAt: new Date()
      }
    });
  }

  async updateMetadata(id: string, metadata: Record<string, any>) {
    return prisma.document.update({
      where: { id },
      data: { metadata }
    });
  }
}

export const documentRepository = new DocumentRepository();
```

## Database Development

### Migration Guidelines

```sql
-- migrations/001_create_documents_table.sql
CREATE TABLE documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    content TEXT,
    file_path VARCHAR(500),
    file_size BIGINT,
    mime_type VARCHAR(100),
    category VARCHAR(100),
    tags TEXT[],
    metadata JSONB DEFAULT '{}',
    user_id UUID NOT NULL REFERENCES users(id),
    views INTEGER DEFAULT 0,
    downloads INTEGER DEFAULT 0,
    last_viewed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_documents_user_id ON documents(user_id);
CREATE INDEX idx_documents_category ON documents(category);
CREATE INDEX idx_documents_created_at ON documents(created_at DESC);
CREATE INDEX idx_documents_tags ON documents USING GIN(tags);
CREATE INDEX idx_documents_search ON documents USING GIN(to_tsvector('spanish', title || ' ' || COALESCE(description, '') || ' ' || COALESCE(content, '')));
CREATE INDEX idx_documents_metadata ON documents USING GIN(metadata);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_documents_updated_at 
    BEFORE UPDATE ON documents 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
```

### Prisma Schema

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id            String    @id @default(cuid())
  name          String?
  email         String    @unique
  emailVerified DateTime?
  image         String?
  role          Role      @default(USER)
  documents     Document[]
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  @@map("users")
}

model Document {
  id            String    @id @default(cuid())
  title         String
  description   String?
  content       String?
  filePath      String?   @map("file_path")
  fileSize      BigInt?   @map("file_size")
  mimeType      String?   @map("mime_type")
  category      String?
  tags          String[]
  metadata      Json      @default("{}")
  userId        String    @map("user_id")
  user          User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  views         Int       @default(0)
  downloads     Int       @default(0)
  lastViewedAt  DateTime? @map("last_viewed_at")
  createdAt     DateTime  @default(now()) @map("created_at")
  updatedAt     DateTime  @updatedAt @map("updated_at")

  @@index([userId])
  @@index([category])
  @@index([createdAt(sort: Desc)])
  @@map("documents")
}

enum Role {
  USER
  ADMIN
}
```

## Search & Indexing

### Elasticsearch Integration

```typescript
// lib/elasticsearch/client.ts
import { Client } from '@elastic/elasticsearch';

export const elasticsearch = new Client({
  node: process.env.ELASTICSEARCH_URL || 'http://localhost:9200',
  auth: process.env.ELASTICSEARCH_USERNAME ? {
    username: process.env.ELASTICSEARCH_USERNAME,
    password: process.env.ELASTICSEARCH_PASSWORD!
  } : undefined
});

// Index mapping
export const documentMapping = {
  properties: {
    title: {
      type: 'text',
      analyzer: 'spanish',
      fields: {
        keyword: { type: 'keyword' }
      }
    },
    description: {
      type: 'text',
      analyzer: 'spanish'
    },
    content: {
      type: 'text',
      analyzer: 'spanish'
    },
    category: { type: 'keyword' },
    tags: { type: 'keyword' },
    userId: { type: 'keyword' },
    createdAt: { type: 'date' },
    fileType: { type: 'keyword' },
    fileSize: { type: 'long' }
  }
};
```

```typescript
// lib/elasticsearch/documents.ts
import { elasticsearch, documentMapping } from './client';

export class DocumentSearchService {
  private index = 'biblioteca_documents';

  async indexDocument(document: any) {
    try {
      await elasticsearch.index({
        index: this.index,
        id: document.id,
        body: {
          title: document.title,
          description: document.description,
          content: document.content,
          category: document.category,
          tags: document.tags,
          userId: document.userId,
          createdAt: document.createdAt,
          fileType: document.mimeType,
          fileSize: document.fileSize
        }
      });
    } catch (error) {
      console.error('Error indexing document:', error);
      throw error;
    }
  }

  async searchDocuments(query: string, filters: any = {}, userId?: string) {
    const must = [];
    const filter = [];

    if (query) {
      must.push({
        multi_match: {
          query,
          fields: ['title^3', 'description^2', 'content'],
          type: 'best_fields',
          fuzziness: 'AUTO'
        }
      });
    }

    if (userId) {
      filter.push({ term: { userId } });
    }

    if (filters.category) {
      filter.push({ term: { category: filters.category } });
    }

    if (filters.tags) {
      filter.push({ terms: { tags: filters.tags } });
    }

    if (filters.dateFrom || filters.dateTo) {
      const range: any = {};
      if (filters.dateFrom) range.gte = filters.dateFrom;
      if (filters.dateTo) range.lte = filters.dateTo;
      filter.push({ range: { createdAt: range } });
    }

    const searchBody = {
      query: {
        bool: {
          must: must.length > 0 ? must : [{ match_all: {} }],
          filter
        }
      },
      highlight: {
        fields: {
          title: {},
          description: {},
          content: { fragment_size: 150, number_of_fragments: 3 }
        }
      },
      sort: [{ createdAt: { order: 'desc' } }],
      size: filters.limit || 20,
      from: ((filters.page || 1) - 1) * (filters.limit || 20)
    };

    const response = await elasticsearch.search({
      index: this.index,
      body: searchBody
    });

    return {
      documents: response.body.hits.hits.map((hit: any) => ({
        id: hit._id,
        score: hit._score,
        highlight: hit.highlight,
        ...hit._source
      })),
      total: response.body.hits.total.value,
      maxScore: response.body.hits.max_score
    };
  }

  async deleteDocument(id: string) {
    try {
      await elasticsearch.delete({
        index: this.index,
        id
      });
    } catch (error) {
      if (error.statusCode !== 404) {
        console.error('Error deleting document from index:', error);
        throw error;
      }
    }
  }
}

export const documentSearchService = new DocumentSearchService();
```

## Document Processing

### File Upload Handler

```typescript
// lib/storage/upload.ts
import multer from 'multer';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { createReadStream } from 'fs';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

const s3Client = new S3Client({
  endpoint: process.env.S3_ENDPOINT,
  region: process.env.S3_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY!,
    secretAccessKey: process.env.S3_SECRET_KEY!
  }
});

export const uploadMiddleware = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE || '104857600') // 100MB
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain',
      'image/jpeg',
      'image/png'
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('File type not allowed'));
    }
  }
});

export async function uploadToS3(file: Express.Multer.File, folder: string = 'documents') {
  const fileExtension = path.extname(file.originalname);
  const fileName = `${folder}/${uuidv4()}${fileExtension}`;
  
  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET!,
    Key: fileName,
    Body: file.buffer,
    ContentType: file.mimetype,
    Metadata: {
      originalName: file.originalname,
      uploadedAt: new Date().toISOString()
    }
  });
  
  await s3Client.send(command);
  
  return {
    key: fileName,
    url: `${process.env.S3_ENDPOINT}/${process.env.S3_BUCKET}/${fileName}`,
    size: file.size,
    mimeType: file.mimetype,
    originalName: file.originalname
  };
}
```

### Document Text Extraction

```typescript
// lib/processing/text-extraction.ts
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import fs from 'fs/promises';

const execAsync = promisify(exec);

export class TextExtractionService {
  async extractText(filePath: string, mimeType: string): Promise<string> {
    switch (mimeType) {
      case 'application/pdf':
        return this.extractFromPDF(filePath);
      case 'application/msword':
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        return this.extractFromWord(filePath);
      case 'text/plain':
        return this.extractFromText(filePath);
      case 'image/jpeg':
      case 'image/png':
        return this.extractFromImage(filePath);
      default:
        throw new Error(`Unsupported file type: ${mimeType}`);
    }
  }

  private async extractFromPDF(filePath: string): Promise<string> {
    try {
      const { stdout } = await execAsync(`pdftotext "${filePath}" -`);
      return stdout.trim();
    } catch (error) {
      console.error('Error extracting text from PDF:', error);
      return '';
    }
  }

  private async extractFromWord(filePath: string): Promise<string> {
    try {
      // Using mammoth for Word documents
      const mammoth = await import('mammoth');
      const result = await mammoth.extractRawText({ path: filePath });
      return result.value;
    } catch (error) {
      console.error('Error extracting text from Word document:', error);
      return '';
    }
  }

  private async extractFromText(filePath: string): Promise<string> {
    try {
      const content = await fs.readFile(filePath, 'utf-8');
      return content;
    } catch (error) {
      console.error('Error reading text file:', error);
      return '';
    }
  }

  private async extractFromImage(filePath: string): Promise<string> {
    try {
      // Using Tesseract OCR
      const { stdout } = await execAsync(`tesseract "${filePath}" stdout -l spa+eng`);
      return stdout.trim();
    } catch (error) {
      console.error('Error extracting text from image:', error);
      return '';
    }
  }
}

export const textExtractionService = new TextExtractionService();
```

### Background Job Processing

```typescript
// workers/document-processor.ts
import Queue from 'bull';
import { documentRepository } from '@/lib/database/documents';
import { textExtractionService } from '@/lib/processing/text-extraction';
import { documentSearchService } from '@/lib/elasticsearch/documents';

const documentQueue = new Queue('document processing', process.env.REDIS_URL!);

interface ProcessDocumentJob {
  documentId: string;
  filePath: string;
  mimeType: string;
}

documentQueue.process('extract-text', async (job) => {
  const { documentId, filePath, mimeType } = job.data as ProcessDocumentJob;
  
  try {
    // Extract text content
    const content = await textExtractionService.extractText(filePath, mimeType);
    
    // Update document with extracted content
    const document = await documentRepository.updateMetadata(documentId, {
      extractedText: content,
      processedAt: new Date().toISOString(),
      processingStatus: 'completed'
    });
    
    // Index document for search
    await documentSearchService.indexDocument(document);
    
    job.progress(100);
    return { success: true, contentLength: content.length };
  } catch (error) {
    console.error(`Error processing document ${documentId}:`, error);
    
    // Update document with error status
    await documentRepository.updateMetadata(documentId, {
      processingStatus: 'failed',
      processingError: error.message,
      processedAt: new Date().toISOString()
    });
    
    throw error;
  }
});

// Add job to queue
export function queueDocumentProcessing(documentId: string, filePath: string, mimeType: string) {
  return documentQueue.add('extract-text', {
    documentId,
    filePath,
    mimeType
  }, {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 2000
    }
  });
}

export default documentQueue;
```

## Testing Guidelines

### Unit Testing

```typescript
// tests/lib/documents.test.ts
import { documentRepository } from '@/lib/database/documents';
import { prismaMock } from '../__mocks__/prisma';

jest.mock('@/lib/database/client', () => ({
  prisma: prismaMock
}));

describe('DocumentRepository', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('findById', () => {
    it('should return document with user information', async () => {
      const mockDocument = {
        id: '1',
        title: 'Test Document',
        userId: 'user1',
        user: { name: 'Test User', email: 'test@example.com' }
      };

      prismaMock.document.findFirst.mockResolvedValue(mockDocument);

      const result = await documentRepository.findById('1', 'user1');

      expect(result).toEqual(mockDocument);
      expect(prismaMock.document.findFirst).toHaveBeenCalledWith({
        where: { id: '1', userId: 'user1' },
        include: {
          user: { select: { name: true, email: true } },
          tags: true,
          categories: true
        }
      });
    });

    it('should return null if document not found', async () => {
      prismaMock.document.findFirst.mockResolvedValue(null);

      const result = await documentRepository.findById('nonexistent', 'user1');

      expect(result).toBeNull();
    });
  });
});
```

### Integration Testing

```typescript
// tests/api/documents.test.ts
import { createMocks } from 'node-mocks-http';
import handler from '@/pages/api/documents';
import { getServerSession } from 'next-auth';

jest.mock('next-auth');
jest.mock('@/lib/database');

const mockGetServerSession = getServerSession as jest.MockedFunction<typeof getServerSession>;

describe('/api/documents', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET', () => {
    it('should return documents for authenticated user', async () => {
      mockGetServerSession.mockResolvedValue({
        user: { id: 'user1', email: 'test@example.com' }
      });

      const { req, res } = createMocks({
        method: 'GET',
        query: { page: '1', limit: '10' }
      });

      await handler(req, res);

      expect(res._getStatusCode()).toBe(200);
      expect(JSON.parse(res._getData())).toHaveProperty('data');
      expect(JSON.parse(res._getData())).toHaveProperty('pagination');
    });

    it('should return 401 for unauthenticated requests', async () => {
      mockGetServerSession.mockResolvedValue(null);

      const { req, res } = createMocks({ method: 'GET' });

      await handler(req, res);

      expect(res._getStatusCode()).toBe(401);
    });
  });
});
```

### Component Testing

```typescript
// tests/components/DocumentCard.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { DocumentCard } from '@/components/documents/DocumentCard';

const mockDocument = {
  id: '1',
  title: 'Test Document',
  description: 'Test description',
  tags: ['tag1', 'tag2'],
  createdAt: new Date('2024-01-01').toISOString(),
  userId: 'user1'
};

describe('DocumentCard', () => {
  it('should render document information', () => {
    render(<DocumentCard document={mockDocument} />);

    expect(screen.getByText('Test Document')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
    expect(screen.getByText('tag1')).toBeInTheDocument();
    expect(screen.getByText('tag2')).toBeInTheDocument();
  });

  it('should call onEdit when edit button is clicked', () => {
    const onEdit = jest.fn();
    render(<DocumentCard document={mockDocument} onEdit={onEdit} />);

    fireEvent.click(screen.getByText('Edit'));

    expect(onEdit).toHaveBeenCalledWith(mockDocument);
  });

  it('should call onDelete when delete button is clicked', () => {
    const onDelete = jest.fn();
    render(<DocumentCard document={mockDocument} onDelete={onDelete} />);

    fireEvent.click(screen.getByText('Delete'));

    expect(onDelete).toHaveBeenCalledWith('1');
  });
});
```

### E2E Testing

```typescript
// tests/e2e/document-upload.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Document Upload', () => {
  test.beforeEach(async ({ page }) => {
    // Login as test user
    await page.goto('/auth/signin');
    await page.fill('[name="email"]', 'test@example.com');
    await page.fill('[name="password"]', 'testpassword');
    await page.click('button[type="submit"]');
    await page.waitForURL('/dashboard');
  });

  test('should upload a document successfully', async ({ page }) => {
    await page.goto('/documents/upload');

    // Upload file
    await page.setInputFiles('[name="file"]', 'tests/fixtures/sample.pdf');
    await page.fill('[name="title"]', 'Test Document');
    await page.fill('[name="description"]', 'This is a test document');
    await page.selectOption('[name="category"]', 'Research');

    await page.click('button[type="submit"]');

    // Wait for success message
    await expect(page.locator('.success-message')).toBeVisible();
    await expect(page.locator('.success-message')).toContainText('Document uploaded successfully');

    // Verify document appears in list
    await page.goto('/documents');
    await expect(page.locator('text=Test Document')).toBeVisible();
  });

  test('should show error for invalid file type', async ({ page }) => {
    await page.goto('/documents/upload');

    await page.setInputFiles('[name="file"]', 'tests/fixtures/invalid.exe');
    await page.fill('[name="title"]', 'Invalid Document');

    await page.click('button[type="submit"]');

    await expect(page.locator('.error-message')).toBeVisible();
    await expect(page.locator('.error-message')).toContainText('File type not allowed');
  });
});
```

## Code Style & Standards

### ESLint Configuration

```json
{
  "extends": [
    "next/core-web-vitals",
    "@typescript-eslint/recommended",
    "prettier"
  ],
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/explicit-function-return-type": "warn",
    "@typescript-eslint/no-explicit-any": "warn",
    "prefer-const": "error",
    "no-console": ["warn", { "allow": ["warn", "error"] }],
    "react-hooks/exhaustive-deps": "error",
    "import/order": [
      "error",
      {
        "groups": [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index"
        ],
        "alphabetize": { "order": "asc" }
      }
    ]
  }
}
```

### Prettier Configuration

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false
}
```

### TypeScript Standards

```typescript
// Good practices for type definitions
export interface Document {
  readonly id: string;
  title: string;
  description?: string;
  content?: string;
  readonly createdAt: Date;
  updatedAt: Date;
}

// Use discriminated unions for different states
export type ProcessingStatus = 
  | { status: 'pending' }
  | { status: 'processing'; progress: number }
  | { status: 'completed'; result: string }
  | { status: 'failed'; error: string };

// Use generic types for reusable interfaces
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

// Use utility types
export type CreateDocumentRequest = Omit<Document, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateDocumentRequest = Partial<Pick<Document, 'title' | 'description'>>;
```

## Documentation

### Code Documentation

```typescript
/**
 * Uploads a document file and processes it for text extraction and indexing.
 * 
 * @param file - The uploaded file from multer
 * @param userId - The ID of the user uploading the document
 * @param metadata - Additional metadata for the document
 * @returns Promise resolving to the created document with processing status
 * 
 * @throws {ValidationError} If file validation fails
 * @throws {StorageError} If file upload to S3 fails
 * @throws {DatabaseError} If document creation in database fails
 * 
 * @example
 * ```typescript
 * const document = await uploadDocument(file, 'user123', {
 *   title: 'Research Paper',
 *   category: 'academic'
 * });
 * console.log(`Document created with ID: ${document.id}`);
 * ```
 */
export async function uploadDocument(
  file: Express.Multer.File,
  userId: string,
  metadata: DocumentMetadata
): Promise<Document> {
  // Implementation...
}
```

### API Documentation

```typescript
/**
 * @swagger
 * /api/documents:
 *   get:
 *     summary: Get user's documents
 *     tags: [Documents]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 20
 *         description: Number of documents per page
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category
 *     responses:
 *       200:
 *         description: Successfully retrieved documents
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Document'
 *                 pagination:
 *                   $ref: '#/components/schemas/Pagination'
 *       401:
 *         description: Unauthorized
 */
```

## Pull Request Process

### PR Template

```markdown
## Description
Brief description of changes made.

## Type of Change
- [ ] Bug fix (non-breaking change that fixes an issue)
- [ ] New feature (non-breaking change that adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] E2E tests pass (if applicable)
- [ ] Manual testing completed

## Screenshots (if applicable)
Include screenshots or recordings of UI changes.

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Code is commented appropriately
- [ ] Documentation updated (if necessary)
- [ ] No new warnings or errors introduced
- [ ] Related issue linked
```

### Review Guidelines

**For Authors:**
1. Keep PRs focused and reasonably sized
2. Write clear commit messages
3. Include tests for new functionality
4. Update documentation as needed
5. Self-review before requesting review

**For Reviewers:**
1. Review for functionality, performance, and security
2. Check code quality and adherence to standards
3. Verify tests are comprehensive
4. Provide constructive feedback
5. Approve only when confident in changes

## Community Guidelines

### Communication

- Be respectful and inclusive
- Use clear, descriptive language
- Ask questions when uncertain
- Share knowledge and help others
- Give credit where due

### Issue Reporting

When reporting bugs:
1. Search existing issues first
2. Use the issue template
3. Provide reproduction steps
4. Include environment details
5. Add relevant logs or screenshots

### Feature Requests

When requesting features:
1. Explain the use case
2. Describe expected behavior
3. Consider implementation complexity
4. Discuss with maintainers first for large features

### Code of Conduct

We follow the [Contributor Covenant](https://www.contributor-covenant.org/) code of conduct. In summary:

- Use welcoming and inclusive language
- Be respectful of differing viewpoints
- Accept constructive criticism gracefully
- Focus on what's best for the community
- Show empathy towards other community members

## Getting Help

- **Documentation**: Check the docs folder for detailed guides
- **Issues**: Create an issue for bugs or feature requests
- **Discussions**: Use GitHub Discussions for questions
- **Discord**: Join our Discord server for real-time chat
- **Email**: Contact maintainers directly for sensitive issues

Thank you for contributing to Biblioteca Digital! 🚀

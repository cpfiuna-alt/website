# Contributing to FIUNA AI Chatbot

Thank you for your interest in contributing to the FIUNA AI Chatbot! This guide will help you get started with contributing to our intelligent academic assistant platform.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Contributing Areas](#contributing-areas)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Knowledge Base Contributions](#knowledge-base-contributions)
- [AI Model Improvements](#ai-model-improvements)
- [Documentation](#documentation)
- [Pull Request Process](#pull-request-process)
- [Community Guidelines](#community-guidelines)

## Getting Started

### What is FIUNA AI Chatbot?

FIUNA AI Chatbot is an intelligent academic assistant that helps students, faculty, and staff at FIUNA (Facultad de Ingeniería - Universidad Nacional de Asunción) with:

- **Academic Information** - Course details, schedules, requirements
- **Administrative Procedures** - Enrollment, documentation, policies
- **Research Assistance** - Literature search, project guidance
- **Campus Services** - Facilities, events, announcements
- **Technical Support** - Programming help, engineering concepts

### Prerequisites

Before contributing, ensure you have:

- **Python Knowledge** - Python 3.8+, FastAPI, async programming
- **AI/ML Understanding** - Basic knowledge of NLP, RAG systems, vector databases
- **API Development** - REST APIs, authentication, error handling
- **Database Skills** - PostgreSQL, vector databases (Pinecone/Weaviate)
- **Frontend Knowledge** - React, TypeScript (for web interface)

### Types of Contributions

We welcome contributions in:

1. **AI/ML Development** - Model improvements, prompt engineering, RAG optimization
2. **Backend Development** - API endpoints, database design, integration services
3. **Frontend Development** - Chat interface, admin panels, user dashboards
4. **Knowledge Base** - Academic content, FAQs, documentation updates
5. **Data Processing** - Document parsing, knowledge extraction, data pipelines
6. **Integration** - University systems, LMS integration, external APIs
7. **Testing** - Unit tests, integration tests, AI model validation
8. **Documentation** - User guides, API docs, deployment instructions

## Development Setup

### 1. Repository Setup

```bash
# Fork and clone the repository
git clone https://github.com/YOUR_USERNAME/fiuna-chatbot.git
cd fiuna-chatbot

# Add upstream remote
git remote add upstream https://github.com/ORIGINAL_OWNER/fiuna-chatbot.git

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
pip install -r requirements-dev.txt
```

### 2. Environment Configuration

```bash
# Copy environment file
cp .env.example .env

# Edit configuration
nano .env
```

```bash
# .env
# Application
ENVIRONMENT=development
DEBUG=True
SECRET_KEY=your-secret-key-for-development
API_VERSION=v1

# Database
DATABASE_URL=postgresql://postgres:password@localhost:5432/fiuna_chatbot_dev
REDIS_URL=redis://localhost:6379/0

# AI Services
OPENAI_API_KEY=your-openai-api-key
OPENAI_MODEL=gpt-4-turbo-preview
ANTHROPIC_API_KEY=your-anthropic-api-key  # Optional alternative
EMBEDDING_MODEL=text-embedding-3-large

# Vector Database
PINECONE_API_KEY=your-pinecone-api-key
PINECONE_ENVIRONMENT=gcp-starter
PINECONE_INDEX_NAME=fiuna-knowledge

# University Systems
UNIVERSITY_API_BASE_URL=https://api.fiuna.edu.py
UNIVERSITY_API_KEY=your-university-api-key
LMS_INTEGRATION_URL=https://moodle.fiuna.edu.py

# File Storage
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_S3_BUCKET=fiuna-chatbot-documents
AWS_REGION=us-east-1

# Monitoring
SENTRY_DSN=your-sentry-dsn  # Optional
LOGGING_LEVEL=DEBUG
```

### 3. Database Setup

```bash
# Start database services
docker-compose up -d postgres redis

# Install Alembic (database migrations)
pip install alembic

# Run database migrations
alembic upgrade head

# Seed initial data
python scripts/seed_database.py
```

### 4. Knowledge Base Setup

```bash
# Process initial knowledge base documents
python scripts/process_knowledge_base.py

# Create vector embeddings
python scripts/create_embeddings.py

# Test knowledge retrieval
python scripts/test_knowledge_retrieval.py
```

### 5. Start Development Server

```bash
# Start FastAPI backend
uvicorn app.main:app --reload --port 8000

# Start frontend (in another terminal)
cd frontend
npm install
npm run dev

# Start background workers
celery -A app.worker worker --loglevel=info
```

### 6. Verify Setup

```bash
# Test API endpoints
curl http://localhost:8000/health
curl http://localhost:8000/api/v1/chat/test

# Test knowledge retrieval
python -m pytest tests/test_knowledge_retrieval.py -v
```

## Contributing Areas

### 1. AI/ML Development

#### Prompt Engineering

```python
# Contributing to prompt templates
class PromptTemplates:
    ACADEMIC_ASSISTANT = """
    You are FIUNA Assistant, an AI helper for engineering students and faculty at 
    Universidad Nacional de Asunción. You have access to academic information about 
    courses, schedules, policies, and procedures.

    Context from knowledge base:
    {context}

    User question: {question}

    Guidelines:
    - Provide accurate, helpful responses based on the context
    - If information is not in the context, say so clearly
    - Use Spanish primarily, but support English when needed
    - Be concise but thorough
    - Include relevant course codes, dates, or references when applicable
    - If asked about procedures, provide step-by-step instructions

    Response:
    """

    COURSE_RECOMMENDATION = """
    Based on the student's profile and interests, recommend appropriate courses:

    Student Profile:
    - Current semester: {semester}
    - Completed courses: {completed_courses}
    - Interests: {interests}
    - Career track: {career_track}

    Available courses: {available_courses}

    Provide 3-5 course recommendations with explanations for each choice.
    Consider prerequisites, difficulty level, and career relevance.
    """

    RESEARCH_ASSISTANT = """
    Help with research and academic projects:

    Research Topic: {topic}
    Academic Level: {level}
    Subject Area: {subject}

    Available Resources: {resources}

    Provide:
    1. Key concepts and terminology
    2. Relevant research directions
    3. Suggested resources and references
    4. Methodological approaches
    """
```

#### RAG System Improvements

```python
# Enhanced retrieval system
from typing import List, Dict, Any
from sentence_transformers import SentenceTransformer
import numpy as np

class EnhancedKnowledgeRetriever:
    def __init__(self):
        self.embedding_model = SentenceTransformer('all-MiniLM-L6-v2')
        self.reranker_model = SentenceTransformer('cross-encoder/ms-marco-TinyBERT-L-2-v2')
    
    async def retrieve_with_reranking(
        self, 
        query: str, 
        top_k: int = 10,
        rerank_top_k: int = 3
    ) -> List[Dict[str, Any]]:
        """
        Enhanced retrieval with semantic search and reranking
        """
        # Initial retrieval
        initial_results = await self.semantic_search(query, top_k)
        
        # Rerank results
        if len(initial_results) > rerank_top_k:
            reranked_results = await self.rerank_results(
                query, initial_results, rerank_top_k
            )
        else:
            reranked_results = initial_results
        
        # Add metadata and confidence scores
        enhanced_results = []
        for i, result in enumerate(reranked_results):
            enhanced_results.append({
                **result,
                'rank': i + 1,
                'confidence': self.calculate_confidence(query, result),
                'source_type': self.identify_source_type(result),
                'relevance_explanation': self.explain_relevance(query, result)
            })
        
        return enhanced_results
    
    async def hybrid_search(
        self, 
        query: str, 
        filters: Dict[str, Any] = None
    ) -> List[Dict[str, Any]]:
        """
        Combine semantic search with keyword search and filtering
        """
        # Semantic search
        semantic_results = await self.semantic_search(query)
        
        # Keyword search
        keyword_results = await self.keyword_search(query)
        
        # Apply filters
        if filters:
            semantic_results = self.apply_filters(semantic_results, filters)
            keyword_results = self.apply_filters(keyword_results, filters)
        
        # Combine and deduplicate
        combined_results = self.combine_results(semantic_results, keyword_results)
        
        return combined_results
    
    def identify_source_type(self, result: Dict[str, Any]) -> str:
        """
        Identify the type of source document
        """
        source = result.get('metadata', {}).get('source', '')
        
        if 'syllabus' in source.lower():
            return 'syllabus'
        elif 'regulation' in source.lower() or 'reglamento' in source.lower():
            return 'regulation'
        elif 'manual' in source.lower():
            return 'manual'
        elif 'course' in source.lower() or 'materia' in source.lower():
            return 'course_info'
        elif 'event' in source.lower() or 'evento' in source.lower():
            return 'event'
        else:
            return 'general'
```

#### Model Fine-tuning

```python
# Fine-tuning pipeline for domain-specific models
import torch
from transformers import (
    AutoTokenizer, AutoModelForCausalLM, 
    TrainingArguments, Trainer
)
from datasets import Dataset

class FIUNAModelFineTuner:
    def __init__(self, base_model: str = "microsoft/DialoGPT-medium"):
        self.base_model = base_model
        self.tokenizer = AutoTokenizer.from_pretrained(base_model)
        self.model = AutoModelForCausalLM.from_pretrained(base_model)
        
        # Add special tokens for academic context
        special_tokens = {
            "additional_special_tokens": [
                "[COURSE]", "[SEMESTER]", "[PROFESSOR]", 
                "[REQUIREMENT]", "[DEADLINE]", "[PROCEDURE]"
            ]
        }
        self.tokenizer.add_special_tokens(special_tokens)
        self.model.resize_token_embeddings(len(self.tokenizer))
    
    def prepare_training_data(self, conversations: List[Dict]):
        """
        Prepare conversation data for fine-tuning
        """
        training_examples = []
        
        for conv in conversations:
            # Format conversation with special tokens
            formatted_conv = self.format_conversation(conv)
            training_examples.append(formatted_conv)
        
        return Dataset.from_list(training_examples)
    
    def format_conversation(self, conversation: Dict) -> Dict:
        """
        Format conversation with context and special tokens
        """
        context = conversation.get('context', {})
        messages = conversation.get('messages', [])
        
        formatted_text = ""
        
        # Add context tokens
        if 'course' in context:
            formatted_text += f"[COURSE] {context['course']} "
        if 'semester' in context:
            formatted_text += f"[SEMESTER] {context['semester']} "
        
        # Add conversation
        for message in messages:
            if message['role'] == 'user':
                formatted_text += f"Usuario: {message['content']} "
            else:
                formatted_text += f"Asistente: {message['content']} "
        
        return {
            'input_ids': self.tokenizer.encode(
                formatted_text, 
                truncation=True, 
                max_length=512
            )
        }
    
    def fine_tune(self, training_data: Dataset, output_dir: str):
        """
        Fine-tune the model on FIUNA-specific data
        """
        training_args = TrainingArguments(
            output_dir=output_dir,
            overwrite_output_dir=True,
            num_train_epochs=3,
            per_device_train_batch_size=4,
            gradient_accumulation_steps=2,
            warmup_steps=100,
            logging_steps=50,
            save_steps=500,
            evaluation_strategy="steps",
            eval_steps=500,
            save_total_limit=2,
            prediction_loss_only=True,
        )
        
        trainer = Trainer(
            model=self.model,
            args=training_args,
            train_dataset=training_data,
            tokenizer=self.tokenizer,
        )
        
        trainer.train()
        trainer.save_model()
```

### 2. Backend Development

#### API Endpoints

```python
# Example new API endpoint
from fastapi import APIRouter, Depends, HTTPException, status
from typing import List, Optional
from app.models import User, Conversation
from app.schemas import ChatRequest, ChatResponse, ConversationSummary
from app.services import ChatService, KnowledgeService

router = APIRouter(prefix="/api/v1/chat", tags=["chat"])

@router.post("/conversation", response_model=ChatResponse)
async def create_conversation(
    request: ChatRequest,
    current_user: User = Depends(get_current_user),
    chat_service: ChatService = Depends(get_chat_service)
):
    """
    Create a new conversation or continue existing one
    """
    try:
        # Validate request
        if not request.message.strip():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Message cannot be empty"
            )
        
        # Get or create conversation
        conversation = await chat_service.get_or_create_conversation(
            user_id=current_user.id,
            conversation_id=request.conversation_id
        )
        
        # Process message with context
        response = await chat_service.process_message(
            conversation=conversation,
            message=request.message,
            context=request.context,
            user_profile=current_user.profile
        )
        
        return ChatResponse(
            conversation_id=conversation.id,
            message=response.message,
            sources=response.sources,
            confidence=response.confidence,
            suggestions=response.suggestions,
            timestamp=response.timestamp
        )
        
    except Exception as e:
        logger.error(f"Chat processing failed: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to process message"
        )

@router.get("/conversations", response_model=List[ConversationSummary])
async def get_user_conversations(
    current_user: User = Depends(get_current_user),
    limit: int = 20,
    offset: int = 0
):
    """
    Get user's conversation history
    """
    conversations = await Conversation.get_by_user(
        user_id=current_user.id,
        limit=limit,
        offset=offset
    )
    
    summaries = []
    for conv in conversations:
        summary = await chat_service.generate_conversation_summary(conv)
        summaries.append(ConversationSummary(
            id=conv.id,
            title=summary.title,
            preview=summary.preview,
            message_count=conv.message_count,
            last_updated=conv.updated_at,
            topics=summary.topics
        ))
    
    return summaries

@router.post("/feedback")
async def submit_feedback(
    conversation_id: str,
    message_id: str,
    rating: int,
    feedback: Optional[str] = None,
    current_user: User = Depends(get_current_user)
):
    """
    Submit feedback for chatbot responses
    """
    if rating < 1 or rating > 5:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Rating must be between 1 and 5"
        )
    
    await chat_service.submit_feedback(
        conversation_id=conversation_id,
        message_id=message_id,
        user_id=current_user.id,
        rating=rating,
        feedback=feedback
    )
    
    return {"message": "Feedback submitted successfully"}
```

#### Knowledge Management Service

```python
# Knowledge management and processing
from typing import List, Dict, Any
import asyncio
from pathlib import Path
from app.core.config import settings
from app.services.embedding import EmbeddingService
from app.services.document_processor import DocumentProcessor

class KnowledgeManagementService:
    def __init__(self):
        self.embedding_service = EmbeddingService()
        self.document_processor = DocumentProcessor()
        self.vector_store = None  # Initialize with Pinecone/Weaviate
    
    async def add_document(
        self, 
        file_path: Path, 
        metadata: Dict[str, Any]
    ) -> Dict[str, Any]:
        """
        Add a new document to the knowledge base
        """
        try:
            # Process document
            processed_doc = await self.document_processor.process(
                file_path, metadata
            )
            
            # Generate embeddings
            embeddings = await self.embedding_service.create_embeddings(
                processed_doc.chunks
            )
            
            # Store in vector database
            doc_id = await self.vector_store.add_document(
                chunks=processed_doc.chunks,
                embeddings=embeddings,
                metadata=metadata
            )
            
            # Update search index
            await self.update_search_index(processed_doc)
            
            return {
                "document_id": doc_id,
                "chunks_created": len(processed_doc.chunks),
                "status": "success"
            }
            
        except Exception as e:
            logger.error(f"Failed to add document: {str(e)}")
            raise
    
    async def update_document(
        self, 
        document_id: str, 
        file_path: Path, 
        metadata: Dict[str, Any]
    ):
        """
        Update existing document in knowledge base
        """
        # Remove old document
        await self.vector_store.delete_document(document_id)
        
        # Add updated document
        return await self.add_document(file_path, metadata)
    
    async def search_knowledge(
        self, 
        query: str, 
        filters: Dict[str, Any] = None,
        top_k: int = 5
    ) -> List[Dict[str, Any]]:
        """
        Search knowledge base with filtering
        """
        # Generate query embedding
        query_embedding = await self.embedding_service.create_embedding(query)
        
        # Search vector store
        results = await self.vector_store.search(
            query_embedding=query_embedding,
            filters=filters,
            top_k=top_k
        )
        
        # Post-process results
        processed_results = []
        for result in results:
            processed_results.append({
                'content': result['content'],
                'metadata': result['metadata'],
                'score': result['score'],
                'source': self.format_source(result['metadata']),
                'highlights': self.extract_highlights(query, result['content'])
            })
        
        return processed_results
    
    async def get_knowledge_statistics(self) -> Dict[str, Any]:
        """
        Get statistics about the knowledge base
        """
        stats = await self.vector_store.get_statistics()
        
        return {
            'total_documents': stats['document_count'],
            'total_chunks': stats['chunk_count'],
            'total_embeddings': stats['embedding_count'],
            'knowledge_coverage': await self.calculate_coverage(),
            'last_updated': stats['last_updated'],
            'index_health': await self.check_index_health()
        }
```

### 3. Frontend Development

#### Chat Interface Components

```tsx
// Enhanced chat interface
import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, TextField, Button, Paper, Typography, 
  Chip, Avatar, CircularProgress, Fade 
} from '@mui/material';
import { Send, AttachFile, Mic, Stop } from '@mui/icons-material';

interface Message {
  id: string;
  content: string;
  type: 'user' | 'assistant';
  timestamp: Date;
  sources?: Source[];
  confidence?: number;
  suggestions?: string[];
}

interface ChatInterfaceProps {
  conversationId?: string;
  onNewConversation?: (id: string) => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  conversationId,
  onNewConversation
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(scrollToBottom, [messages]);
  
  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      type: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    
    try {
      const response = await chatApi.sendMessage({
        message: inputValue,
        conversationId: conversationId,
        context: await gatherContext()
      });
      
      const assistantMessage: Message = {
        id: response.messageId,
        content: response.message,
        type: 'assistant',
        timestamp: new Date(response.timestamp),
        sources: response.sources,
        confidence: response.confidence,
        suggestions: response.suggestions
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      
      if (!conversationId && response.conversationId) {
        onNewConversation?.(response.conversationId);
      }
      
    } catch (error) {
      console.error('Failed to send message:', error);
      // Handle error state
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleVoiceInput = async () => {
    if (isRecording) {
      // Stop recording
      setIsRecording(false);
      // Process voice input
    } else {
      // Start recording
      setIsRecording(true);
      // Implement voice recognition
    }
  };
  
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Messages Container */}
      <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
        {messages.map((message) => (
          <MessageBubble 
            key={message.id} 
            message={message}
            onSourceClick={handleSourceClick}
          />
        ))}
        {isLoading && (
          <Fade in={isLoading}>
            <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
              <Avatar sx={{ mr: 2 }}>🤖</Avatar>
              <CircularProgress size={24} />
              <Typography sx={{ ml: 2 }}>Pensando...</Typography>
            </Box>
          </Fade>
        )}
        <div ref={messagesEndRef} />
      </Box>
      
      {/* Input Area */}
      <Paper sx={{ p: 2, borderRadius: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 1 }}>
          <TextField
            fullWidth
            multiline
            maxRows={4}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Escribe tu pregunta sobre FIUNA..."
            variant="outlined"
            disabled={isLoading}
          />
          <Button
            variant="contained"
            onClick={handleVoiceInput}
            sx={{ minWidth: 48, height: 48 }}
            color={isRecording ? 'error' : 'primary'}
          >
            {isRecording ? <Stop /> : <Mic />}
          </Button>
          <Button
            variant="contained"
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            sx={{ minWidth: 48, height: 48 }}
          >
            <Send />
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

// Message bubble component
const MessageBubble: React.FC<{
  message: Message;
  onSourceClick: (source: Source) => void;
}> = ({ message, onSourceClick }) => {
  const isUser = message.type === 'user';
  
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        mb: 2
      }}
    >
      {!isUser && (
        <Avatar sx={{ mr: 2, mt: 0.5 }}>🤖</Avatar>
      )}
      
      <Box sx={{ maxWidth: '70%' }}>
        <Paper
          sx={{
            p: 2,
            bgcolor: isUser ? 'primary.main' : 'grey.100',
            color: isUser ? 'primary.contrastText' : 'text.primary'
          }}
        >
          <Typography variant="body1">
            {message.content}
          </Typography>
          
          {message.confidence && (
            <Box sx={{ mt: 1 }}>
              <Typography variant="caption" color="textSecondary">
                Confianza: {Math.round(message.confidence * 100)}%
              </Typography>
            </Box>
          )}
          
          {message.sources && message.sources.length > 0 && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="caption" color="textSecondary" gutterBottom>
                Fuentes:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {message.sources.map((source, index) => (
                  <Chip
                    key={index}
                    label={source.title}
                    size="small"
                    onClick={() => onSourceClick(source)}
                    clickable
                  />
                ))}
              </Box>
            </Box>
          )}
          
          {message.suggestions && message.suggestions.length > 0 && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="caption" color="textSecondary" gutterBottom>
                Preguntas relacionadas:
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                {message.suggestions.map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="text"
                    size="small"
                    onClick={() => handleSuggestionClick(suggestion)}
                    sx={{ justifyContent: 'flex-start' }}
                  >
                    {suggestion}
                  </Button>
                ))}
              </Box>
            </Box>
          )}
        </Paper>
        
        <Typography variant="caption" color="textSecondary" sx={{ mt: 0.5 }}>
          {message.timestamp.toLocaleTimeString()}
        </Typography>
      </Box>
      
      {isUser && (
        <Avatar sx={{ ml: 2, mt: 0.5 }}>👤</Avatar>
      )}
    </Box>
  );
};
```

## Testing Guidelines

### AI Model Testing

```python
# Test AI responses and knowledge retrieval
import pytest
from app.services.chat_service import ChatService
from app.services.knowledge_service import KnowledgeService

class TestChatService:
    @pytest.fixture
    async def chat_service(self):
        return ChatService()
    
    @pytest.fixture
    async def sample_questions(self):
        return [
            "¿Cuáles son los horarios de clases de Algoritmos y Programación?",
            "¿Cómo me inscribo en materias electivas?",
            "¿Cuáles son los requisitos para graduación?",
            "¿Dónde puedo encontrar información sobre becas?",
            "¿Quién es el profesor de Matemática Discreta?",
        ]
    
    async def test_basic_responses(self, chat_service, sample_questions):
        """Test that the chatbot provides relevant responses to common questions"""
        for question in sample_questions:
            response = await chat_service.process_message(question)
            
            # Check response quality
            assert response.message is not None
            assert len(response.message) > 10  # Meaningful response
            assert response.confidence > 0.3  # Reasonable confidence
            
            # Check for relevant information
            if "horarios" in question.lower():
                assert any(keyword in response.message.lower() 
                          for keyword in ["horario", "clase", "lunes", "martes"])
            
            if "inscrib" in question.lower():
                assert any(keyword in response.message.lower() 
                          for keyword in ["inscripción", "matrícula", "procedimiento"])
    
    async def test_knowledge_retrieval_accuracy(self, chat_service):
        """Test accuracy of knowledge retrieval"""
        test_cases = [
            {
                "question": "¿Cuántos créditos necesito para graduarme?",
                "expected_keywords": ["créditos", "graduación", "título"],
                "expected_sources": ["reglamento", "plan de estudios"]
            },
            {
                "question": "¿Cuál es el reglamento de exámenes?",
                "expected_keywords": ["examen", "evaluación", "calificación"],
                "expected_sources": ["reglamento académico"]
            }
        ]
        
        for case in test_cases:
            response = await chat_service.process_message(case["question"])
            
            # Check if expected keywords are present
            response_lower = response.message.lower()
            keyword_present = any(keyword in response_lower 
                                for keyword in case["expected_keywords"])
            assert keyword_present, f"Missing keywords in response for: {case['question']}"
            
            # Check if sources are relevant
            if response.sources:
                source_relevant = any(
                    any(expected in source.title.lower() 
                        for expected in case["expected_sources"])
                    for source in response.sources
                )
                assert source_relevant, f"Irrelevant sources for: {case['question']}"
    
    async def test_conversation_context(self, chat_service):
        """Test multi-turn conversation handling"""
        conversation_id = "test-conversation"
        
        # First message
        response1 = await chat_service.process_message(
            "¿Qué materias puedo cursar este semestre?",
            conversation_id=conversation_id
        )
        
        # Follow-up message
        response2 = await chat_service.process_message(
            "¿Cuáles de esas tienen laboratorio?",
            conversation_id=conversation_id
        )
        
        # Check that context is maintained
        assert response2.message is not None
        assert "laboratorio" in response2.message.lower()
        
    async def test_error_handling(self, chat_service):
        """Test handling of unclear or invalid queries"""
        unclear_questions = [
            "",  # Empty question
            "asdfghjkl",  # Nonsense
            "¿Qué?",  # Too vague
            "a" * 1000,  # Too long
        ]
        
        for question in unclear_questions:
            response = await chat_service.process_message(question)
            
            # Should handle gracefully
            assert response.message is not None
            assert response.confidence < 0.5  # Low confidence for unclear questions
```

### API Testing

```python
# Test API endpoints
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_chat_endpoint():
    """Test the main chat endpoint"""
    response = client.post(
        "/api/v1/chat/conversation",
        json={
            "message": "¿Cuáles son los horarios de clases?",
            "context": {
                "user_semester": 3,
                "user_career": "Ingeniería Informática"
            }
        },
        headers={"Authorization": "Bearer test-token"}
    )
    
    assert response.status_code == 200
    data = response.json()
    assert "message" in data
    assert "confidence" in data
    assert "sources" in data

def test_knowledge_search():
    """Test knowledge search functionality"""
    response = client.get(
        "/api/v1/knowledge/search",
        params={
            "query": "requisitos graduación",
            "top_k": 5
        },
        headers={"Authorization": "Bearer test-token"}
    )
    
    assert response.status_code == 200
    data = response.json()
    assert "results" in data
    assert len(data["results"]) <= 5

def test_conversation_history():
    """Test conversation history retrieval"""
    response = client.get(
        "/api/v1/chat/conversations",
        headers={"Authorization": "Bearer test-token"}
    )
    
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
```

## Knowledge Base Contributions

### Document Processing

```python
# Guidelines for adding new documents to knowledge base
class DocumentContributionGuidelines:
    """
    Guidelines for contributing documents to the FIUNA knowledge base
    """
    
    SUPPORTED_FORMATS = [
        'pdf', 'docx', 'txt', 'md', 'html'
    ]
    
    REQUIRED_METADATA = [
        'title',           # Document title
        'category',        # academic, administrative, research, etc.
        'source',          # department, office, or author
        'last_updated',    # Date of last update
        'language',        # es, en, or both
        'access_level'     # public, student, faculty, admin
    ]
    
    CATEGORIES = {
        'academic': [
            'syllabi', 'course_descriptions', 'degree_requirements',
            'academic_calendar', 'grading_policies'
        ],
        'administrative': [
            'enrollment_procedures', 'graduation_requirements',
            'student_services', 'financial_aid', 'regulations'
        ],
        'research': [
            'research_guidelines', 'thesis_requirements',
            'laboratory_procedures', 'publication_guidelines'
        ],
        'campus': [
            'facilities', 'events', 'announcements',
            'emergency_procedures', 'contact_information'
        ]
    }
    
    @staticmethod
    def validate_document(file_path: Path, metadata: Dict) -> List[str]:
        """Validate document and metadata before adding to knowledge base"""
        errors = []
        
        # Check file format
        if file_path.suffix.lower()[1:] not in DocumentContributionGuidelines.SUPPORTED_FORMATS:
            errors.append(f"Unsupported file format: {file_path.suffix}")
        
        # Check required metadata
        for field in DocumentContributionGuidelines.REQUIRED_METADATA:
            if field not in metadata:
                errors.append(f"Missing required metadata field: {field}")
        
        # Validate category
        if 'category' in metadata:
            if metadata['category'] not in DocumentContributionGuidelines.CATEGORIES:
                errors.append(f"Invalid category: {metadata['category']}")
        
        # Check document size
        if file_path.stat().st_size > 10 * 1024 * 1024:  # 10MB limit
            errors.append("Document size exceeds 10MB limit")
        
        return errors
```

### Content Quality Guidelines

```markdown
## Content Quality Standards

### Academic Content
- **Accuracy**: All information must be current and accurate
- **Completeness**: Include all relevant details (prerequisites, schedules, contact info)
- **Clarity**: Use clear, concise language appropriate for students
- **Structure**: Organize content with headers, lists, and clear sections

### Language Requirements
- **Primary Language**: Spanish (official university language)
- **Secondary Language**: English (for international content)
- **Terminology**: Use official university terminology consistently
- **Abbreviations**: Define abbreviations on first use

### Metadata Standards
```yaml
# Example document metadata
title: "Reglamento de Exámenes - Facultad de Ingeniería"
category: "academic"
subcategory: "regulations"
source: "Decanato FIUNA"
last_updated: "2024-03-15"
language: "es"
access_level: "public"
tags: ["exámenes", "evaluación", "reglamento"]
related_documents: ["plan_estudios", "calendario_academico"]
version: "2024.1"
```

## Pull Request Process

### PR Guidelines

1. **Branch Naming**
   ```bash
   feature/ai-model-improvements
   fix/knowledge-retrieval-bug
   docs/api-documentation-update
   knowledge/course-schedules-update
   ```

2. **Commit Messages**
   ```bash
   feat(ai): improve response accuracy for academic queries
   fix(api): resolve authentication issue in chat endpoint
   docs(knowledge): add new course descriptions for 2024
   test(ai): add comprehensive tests for knowledge retrieval
   ```

3. **Testing Requirements**
   - All new code must include tests
   - AI responses must be validated with test cases
   - Knowledge base updates must be tested for accuracy
   - API changes require integration tests

4. **Documentation Updates**
   - Update API documentation for new endpoints
   - Document new AI model features
   - Update knowledge base guidelines
   - Include deployment instructions for changes

## Community Guidelines

### Code of Conduct

- **Respectful Communication** - Treat all contributors with respect
- **Academic Integrity** - Ensure all information is accurate and properly sourced
- **Privacy Protection** - Protect student and faculty privacy in all contributions
- **Inclusive Environment** - Welcome contributors of all skill levels

### Communication Channels

- **GitHub Issues** - Bug reports and feature requests
- **GitHub Discussions** - Technical discussions and questions
- **University Email** - Official communications with FIUNA staff
- **Discord Server** - Real-time collaboration and support

### Recognition

Contributors are recognized through:
- Contributor acknowledgments in documentation
- GitHub contributor statistics
- University recognition for significant contributions
- Academic credit opportunities (where applicable)

## Getting Help

For assistance with contributing:

1. **Check Documentation** - Review existing guides and API docs
2. **Search Issues** - Look for similar problems or questions
3. **Ask in Discussions** - Start a GitHub discussion for help
4. **Contact Maintainers** - Reach out for urgent or sensitive issues
5. **University Contacts** - Contact FIUNA IT department for system integration questions

Thank you for contributing to the FIUNA AI Chatbot! Your contributions help improve the academic experience for the entire FIUNA community.

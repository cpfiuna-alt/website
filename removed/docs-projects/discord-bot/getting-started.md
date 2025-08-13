---
title: "Primeros Pasos"
description: "Guía para configurar y ejecutar el bot de Discord CPF"
chapter: "Configuración"
section: "Instalación Inicial"
order: 1
---

# Getting Started with CPF Discord Bot

## Overview

The CPF Discord Bot is a Python-based bot designed to enhance the CPF FIUNA Discord server experience with moderation tools, event management, competitive programming utilities, and community engagement features.

## Prerequisites

Before setting up the Discord bot, ensure you have:

- **Python 3.8+** installed
- **Discord Developer Account** with bot permissions
- **PostgreSQL** or **SQLite** database
- **Git** for version control
- Basic knowledge of Python and Discord.py

## Quick Setup

### 1. Clone the Repository

```bash
git clone https://github.com/CPF-FIUNA/discord-bot.git
cd discord-bot
```

### 2. Create Virtual Environment

```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows
venv\Scripts\activate
# On macOS/Linux
source venv/bin/activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Environment Configuration

Create a `.env` file in the root directory:

```env
# Discord Configuration
DISCORD_TOKEN=your_bot_token_here
DISCORD_GUILD_ID=your_guild_id
DISCORD_PREFIX=!

# Database Configuration
DATABASE_URL=postgresql://username:password@localhost/cpf_bot
# Or for SQLite
# DATABASE_URL=sqlite:///cpf_bot.db

# API Keys
CODEFORCES_API_KEY=your_codeforces_api_key
ATCODER_USERNAME=your_atcoder_username
ATCODER_PASSWORD=your_atcoder_password

# Logging
LOG_LEVEL=INFO
LOG_FILE=bot.log

# Feature Flags
ENABLE_MODERATION=true
ENABLE_COMPETITIVE_PROGRAMMING=true
ENABLE_EVENT_MANAGEMENT=true
ENABLE_MUSIC=false
```

### 5. Database Setup

```bash
# Initialize database
python -m bot.database.init_db

# Run migrations
python -m bot.database.migrate
```

### 6. Discord Bot Setup

1. **Create Discord Application**:
   - Go to [Discord Developer Portal](https://discord.com/developers/applications)
   - Click "New Application"
   - Name your application "CPF Bot"

2. **Create Bot User**:
   - Go to "Bot" section
   - Click "Add Bot"
   - Copy the bot token to your `.env` file

3. **Set Bot Permissions**:
   Required permissions:
   - Send Messages
   - Manage Messages
   - Manage Roles
   - Kick Members
   - Ban Members
   - Read Message History
   - Use Slash Commands
   - Embed Links
   - Attach Files

4. **Invite Bot to Server**:
   ```
   https://discord.com/api/oauth2/authorize?client_id=YOUR_CLIENT_ID&permissions=8&scope=bot%20applications.commands
   ```

### 7. Run the Bot

```bash
python main.py
```

## Project Structure

```
discord-bot/
├── bot/
│   ├── cogs/                 # Bot command modules
│   │   ├── moderation.py     # Moderation commands
│   │   ├── competitive.py    # Competitive programming
│   │   ├── events.py         # Event management
│   │   ├── general.py        # General commands
│   │   └── admin.py          # Admin commands
│   ├── database/             # Database models and utilities
│   │   ├── models.py         # SQLAlchemy models
│   │   ├── init_db.py        # Database initialization
│   │   └── migrate.py        # Database migrations
│   ├── utils/                # Utility functions
│   │   ├── checks.py         # Permission checks
│   │   ├── formatters.py     # Message formatting
│   │   ├── validators.py     # Input validation
│   │   └── api_clients.py    # External API clients
│   ├── config/               # Configuration files
│   │   ├── settings.py       # Bot settings
│   │   └── logging.py        # Logging configuration
│   └── main.py              # Bot entry point
├── tests/                   # Test files
├── docs/                    # Documentation
├── requirements.txt         # Python dependencies
├── Dockerfile              # Docker configuration
├── docker-compose.yml      # Docker Compose setup
└── README.md               # Project README
```

## Key Features

### 1. Moderation System

- **Auto-moderation** for spam and inappropriate content
- **Warning system** with escalating consequences
- **Temporary and permanent bans**
- **Message logging** and audit trails
- **Role management** commands

### 2. Competitive Programming

- **Contest notifications** from Codeforces, AtCoder, etc.
- **Problem recommendations** based on user rating
- **Rating tracking** and progress visualization
- **Team formation** for contests
- **Problem discussion** channels

### 3. Event Management

- **Event creation** and scheduling
- **RSVP system** with automatic role assignment
- **Event reminders** and notifications
- **Calendar integration**
- **Attendance tracking**

### 4. Community Features

- **Welcome messages** for new members
- **Level system** with experience points
- **Custom commands** and responses
- **Poll creation** and voting
- **Study group coordination**

## Basic Commands

### General Commands

```bash
# Get bot information
!info

# Show help for commands
!help

# Check user profile
!profile [@user]

# Show server statistics
!stats
```

### Moderation Commands

```bash
# Warn a user
!warn @user [reason]

# Kick a user
!kick @user [reason]

# Ban a user
!ban @user [reason]

# Clear messages
!clear [amount]

# Show user warnings
!warnings @user
```

### Competitive Programming Commands

```bash
# Register Codeforces handle
!cf register [handle]

# Show user rating
!cf rating [@user]

# Get problem recommendation
!cf problem [difficulty]

# Show upcoming contests
!contests

# Create team for contest
!team create [contest_id] [team_name]
```

### Event Commands

```bash
# Create event
!event create [title] [date] [description]

# List upcoming events
!events

# RSVP to event
!rsvp [event_id]

# Cancel RSVP
!cancel [event_id]
```

## Development Workflow

### 1. Setting Up Development Environment

```bash
# Install development dependencies
pip install -r requirements-dev.txt

# Set up pre-commit hooks
pre-commit install

# Run tests
pytest

# Run linting
flake8 bot/
black bot/
```

### 2. Creating New Commands

```python
# bot/cogs/example.py
import discord
from discord.ext import commands

class ExampleCog(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    @commands.command(name='hello')
    async def hello_command(self, ctx):
        """Say hello to the user"""
        await ctx.send(f'Hello {ctx.author.mention}!')

    @commands.slash_command(name='greet')
    async def greet_slash(self, ctx, user: discord.Member):
        """Greet a specific user"""
        await ctx.respond(f'Hello {user.mention}!')

def setup(bot):
    bot.add_cog(ExampleCog(bot))
```

### 3. Database Operations

```python
# bot/database/models.py
from sqlalchemy import Column, Integer, String, DateTime, Boolean
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class User(Base):
    __tablename__ = 'users'
    
    id = Column(Integer, primary_key=True)
    discord_id = Column(String, unique=True, nullable=False)
    username = Column(String, nullable=False)
    join_date = Column(DateTime, nullable=False)
    is_active = Column(Boolean, default=True)
    
    def __repr__(self):
        return f'<User {self.username}>'
```

### 4. Configuration Management

```python
# bot/config/settings.py
import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    # Discord settings
    DISCORD_TOKEN = os.getenv('DISCORD_TOKEN')
    DISCORD_GUILD_ID = int(os.getenv('DISCORD_GUILD_ID', 0))
    DISCORD_PREFIX = os.getenv('DISCORD_PREFIX', '!')
    
    # Database settings
    DATABASE_URL = os.getenv('DATABASE_URL')
    
    # Feature flags
    ENABLE_MODERATION = os.getenv('ENABLE_MODERATION', 'true').lower() == 'true'
    ENABLE_COMPETITIVE_PROGRAMMING = os.getenv('ENABLE_COMPETITIVE_PROGRAMMING', 'true').lower() == 'true'
    
    @classmethod
    def validate(cls):
        """Validate required settings"""
        if not cls.DISCORD_TOKEN:
            raise ValueError("DISCORD_TOKEN is required")
        if not cls.DATABASE_URL:
            raise ValueError("DATABASE_URL is required")
```

### 5. Testing

```python
# tests/test_commands.py
import pytest
import discord.ext.test as dpytest
from bot.main import bot

@pytest.fixture
async def setup_bot():
    await dpytest.empty_queue()

class TestGeneralCommands:
    @pytest.mark.asyncio
    async def test_info_command(self, setup_bot):
        await dpytest.message("!info")
        assert dpytest.verify().message().contains("CPF Discord Bot")

    @pytest.mark.asyncio
    async def test_help_command(self, setup_bot):
        await dpytest.message("!help")
        assert dpytest.verify().message().contains("Available commands")
```

## Docker Setup

### Dockerfile

```dockerfile
FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["python", "main.py"]
```

### Docker Compose

```yaml
version: '3.8'

services:
  bot:
    build: .
    environment:
      - DISCORD_TOKEN=${DISCORD_TOKEN}
      - DATABASE_URL=postgresql://postgres:password@db:5432/cpf_bot
    depends_on:
      - db
    restart: unless-stopped

  db:
    image: postgres:13
    environment:
      - POSTGRES_DB=cpf_bot
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped

volumes:
  postgres_data:
```

### Running with Docker

```bash
# Build and run
docker-compose up --build

# Run in background
docker-compose up -d

# View logs
docker-compose logs -f bot

# Stop services
docker-compose down
```

## Monitoring and Logging

### Logging Configuration

```python
# bot/config/logging.py
import logging
import sys
from pathlib import Path

def setup_logging(log_level: str = 'INFO', log_file: str = None):
    """Configure logging for the bot"""
    
    # Create formatter
    formatter = logging.Formatter(
        '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
    )
    
    # Console handler
    console_handler = logging.StreamHandler(sys.stdout)
    console_handler.setFormatter(formatter)
    
    # File handler (if specified)
    handlers = [console_handler]
    if log_file:
        file_handler = logging.FileHandler(log_file)
        file_handler.setFormatter(formatter)
        handlers.append(file_handler)
    
    # Configure logging
    logging.basicConfig(
        level=getattr(logging, log_level.upper()),
        handlers=handlers
    )
    
    # Set discord.py logging level
    logging.getLogger('discord').setLevel(logging.WARNING)
```

### Health Checks

```python
# bot/utils/health.py
import asyncio
import aiohttp
from datetime import datetime

class HealthChecker:
    def __init__(self, bot):
        self.bot = bot
        self.last_heartbeat = datetime.now()
    
    async def start_health_checks(self):
        """Start periodic health checks"""
        while not self.bot.is_closed():
            await self.check_database()
            await self.check_api_endpoints()
            await self.update_heartbeat()
            await asyncio.sleep(60)  # Check every minute
    
    async def check_database(self):
        """Check database connectivity"""
        try:
            # Perform simple database query
            pass
        except Exception as e:
            logging.error(f"Database health check failed: {e}")
    
    async def update_heartbeat(self):
        """Update heartbeat timestamp"""
        self.last_heartbeat = datetime.now()
```

## Troubleshooting

### Common Issues

1. **Bot not responding to commands**:
   - Check bot permissions in Discord server
   - Verify bot token is correct
   - Ensure bot is online and connected

2. **Database connection errors**:
   - Verify database URL in environment variables
   - Check database server is running
   - Ensure database exists and is accessible

3. **API rate limiting**:
   - Implement rate limiting in bot commands
   - Use proper error handling for API calls
   - Consider caching API responses

4. **Memory issues**:
   - Monitor bot memory usage
   - Implement proper cleanup for long-running tasks
   - Use database for persistent storage instead of memory

### Debug Mode

```python
# Enable debug logging
import logging
logging.basicConfig(level=logging.DEBUG)

# Enable discord.py debug logging
logging.getLogger('discord').setLevel(logging.DEBUG)
```

## Next Steps

- [Bot Architecture](./architecture) - Understand the system design
- [Command Development](./commands) - Learn to create custom commands
- [Database Management](./database) - Work with the database layer
- [API Integration](./api) - Integrate with external APIs
- [Deployment Guide](./deployment) - Deploy your bot to production

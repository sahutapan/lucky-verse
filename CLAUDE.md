# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

LuckyVerse is a Turborepo monorepo for a gaming platform with skill-based and luck-based games, virtual currency (LVC), and real-time multiplayer.

## Common Commands

### Root-level (Turborepo)
```bash
npm run dev          # Start all apps in development mode
npm run build        # Build all apps
npm run lint         # Lint all apps
npm run format       # Format with Prettier
```

### Backend (apps/backend)
```bash
cd apps/backend
poetry install                                              # Install dependencies
poetry run uvicorn app.main:app --reload                   # Run dev server (port 8000)
poetry run alembic revision --autogenerate -m "message"    # Create migration
poetry run alembic upgrade head                            # Apply migrations
poetry run pytest                                          # Run tests
poetry run pytest tests/test_file.py::test_name            # Run single test
```

### Frontend (apps/frontend)
```bash
cd apps/frontend
npm run dev      # Start Vite dev server (port 5173)
npm run build    # Build for production
npm run lint     # Run ESLint
```

### Docker
```bash
docker-compose up --build    # Start full stack (Postgres, Redis, backend, frontend)
```

## Architecture

### Backend (FastAPI + Python)
- **Framework**: FastAPI with async SQLAlchemy ORM
- **Database**: PostgreSQL (asyncpg driver)
- **Cache/Realtime**: Redis for pub/sub, matchmaking queues, and game state
- **Migrations**: Alembic
- **Auth**: JWT tokens with OAuth2 support

Backend structure:
- `app/api/` - Route handlers (endpoints)
- `app/core/` - Config, security, database connection
- `app/models/` - SQLAlchemy models (User, Wallet, Transaction, MatchHistory)
- `app/schemas/` - Pydantic request/response schemas
- `app/services/` - Business logic (auth, wallet, game engines)
- `app/utils/` - Helpers and dependencies

### Frontend (React + Vite)
- **Framework**: React 19 with TypeScript
- **Build**: Vite
- **State**: Zustand
- **Routing**: React Router
- **Styling**: Tailwind CSS
- **HTTP**: Axios

Frontend structure:
- `src/components/` - Shared UI components
- `src/modules/` - Feature modules (auth, games, wallet)
- `src/hooks/` - Custom React hooks
- `src/services/` - API clients
- `src/lib/` - Utilities (cn, etc.)

### Shared Packages
- `packages/shared-types/` - TypeScript interfaces shared across frontend
- `packages/eslint-config/` - Shared ESLint configuration

## Environment Variables

Root `.env` file is used by docker-compose. Backend has its own `.env` at `apps/backend/.env` with:
- `DATABASE_URL` - PostgreSQL connection string
- `REDIS_URL` - Redis connection string
- `SECRET_KEY` - JWT signing key

## Key Entities

- **User**: Authentication, profile, Elo rating
- **Wallet**: LVC balance per user
- **Transaction**: Deposit/withdrawal/wager/win records
- **MatchHistory**: Game results and state

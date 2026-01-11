# Monorepo Structure

We will use **TurboRepo** to manage the monorepo.

## Folder Structure

```
lucky-verse/
├── apps/
│   ├── frontend/          # React + Vite application
│   │   ├── src/
│   │   ├── public/
│   │   ├── package.json
│   │   └── vite.config.ts
│   └── backend/           # FastAPI application
│       ├── app/
│       │   ├── api/       # Route handlers
│       │   ├── core/      # Config, security, database
│       │   ├── models/    # Database models
│       │   ├── schemas/   # Pydantic schemas
│       │   ├── services/  # Business logic (Game engines)
│       │   └── main.py
│       ├── tests/
│       ├── Dockerfile
│       └── pyproject.toml
├── packages/
│   ├── shared-types/      # Shared TypeScript interfaces (for frontend)
│   │   ├── index.ts
│   │   └── package.json
│   └── eslint-config/     # Shared ESLint configuration
│       └── package.json
├── docs/                  # Project documentation
├── docker-compose.yml     # Local development orchestration
├── turbo.json             # TurboRepo configuration
└── package.json           # Root package.json
```

## Workspaces
- `apps/*`
- `packages/*`

## Key Decisions
- **Frontend**: React + Vite + MUI/Tailwind.
- **Backend**: FastAPI + Poetry (for Python dependency management).
- **Shared**: We will generate TypeScript types from Pydantic models (using `datamodel-code-generator` or similar) and place them in `packages/shared-types` to ensure type safety across the stack.

# LuckyVerse Architecture

## 1. High-Level Architecture

```mermaid
graph TD
    Client[Client (Browser/Mobile)] -->|HTTPS/WSS| LB[Load Balancer / Nginx]
    LB -->|/api| API[FastAPI Backend]
    LB -->|/ws| WS[WebSocket Manager]
    LB -->|Static Assets| CDN[CDN / Frontend Host]

    subgraph "Backend Services"
        API --> Auth[Auth Service]
        API --> Game[Game Engine]
        API --> Wallet[Wallet & Payment Service]
        WS --> Match[Matchmaking Service]
        WS --> Game
    end

    subgraph "Data Layer"
        API --> DB[(PostgreSQL)]
        WS --> Redis[(Redis Pub/Sub & Cache)]
        Match --> Redis
    end

    subgraph "External Services"
        Auth --> OAuth[Google OAuth]
    end
```

## 2. Backend Architecture (FastAPI)

The backend is built with **FastAPI** and follows a modular architecture.

### Core Modules
- **Auth**: Handles user authentication (OAuth2, JWT) and session management.
- **Game Engine**:
    - **Skill Engine**: Deterministic logic for games like Chess, Tic-Tac-Toe.
    - **Luck Engine**: Probabilistic logic with server-side seeding for verifiable randomness.
- **Wallet & Payments**: Manages `LVC` (LuckyVerse Coins) and simulates payment gateways.
- **Real-time Service**: Manages WebSocket connections, rooms, and state synchronization using Redis Pub/Sub.

### Technology Stack
- **Framework**: FastAPI (Python)
- **ORM**: SQLAlchemy (Async) or TortoiseORM
- **Task Queue**: Celery or ARQ (for background tasks like transaction processing)
- **Real-time**: Python `websockets` + Redis

## 3. Frontend Architecture (React + Vite)

The frontend is a Single Page Application (SPA) built with **React**.

### Key Components
- **State Management**: Zustand or Redux Toolkit (for global state like user profile, wallet balance).
- **Routing**: React Router.
- **UI Library**: Material UI (MUI) or Tailwind CSS.
- **Real-time Client**: Custom hook wrapping `WebSocket` for game events.

### Folder Structure (Conceptual)
```
apps/frontend/
├── src/
│   ├── components/       # Shared UI components
│   ├── modules/         # Feature-based modules (Auth, Game, Wallet)
│   ├── hooks/            # Custom hooks (useSocket, useAuth)
│   ├── pages/            # Route pages
│   ├── services/         # API clients
│   ├── store/            # Global state
│   └── utils/            # Helper functions
```

## 4. Game Engine Flow

### Skill-Based Game (e.g., Tic-Tac-Toe)
1.  **Matchmaking**: User requests a game -> Added to Redis Queue -> Matched with opponent.
2.  **Game Start**: Room created in Redis -> `game_start` event sent to both clients.
3.  **Gameplay**:
    - Client A sends `move` (x, y).
    - Server validates move (is turn? is valid?).
    - Server updates state in Redis.
    - Server broadcasts `state_update` to both clients.
4.  **Game Over**:
    - Server detects win/draw condition.
    - Server calculates rating change (Elo).
    - Server updates wallet balances (if wagered).
    - Server persists match history to PostgreSQL.
    - Server sends `game_over` event.

### Luck-Based Game (e.g., Slot Machine)
1.  **Spin Request**: Client sends `spin` request with wager.
2.  **Validation**: Server checks balance.
3.  **RNG**: Server generates random result using a seeded RNG (for provable fairness).
4.  **Result**: Server calculates winnings.
5.  **Update**: Server updates wallet and logs transaction.
6.  **Response**: Server sends result (symbols, win amount) to client.

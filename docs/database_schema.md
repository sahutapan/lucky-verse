# Database Schema Design

## 1. PostgreSQL Schema (ER Diagram)

```mermaid
erDiagram
    User ||--o{ Wallet : has
    User ||--o{ MatchHistory : plays
    User ||--o{ Transaction : initiates
    User ||--o{ Session : has
    User {
        uuid id PK
        string username
        string email
        string password_hash
        string provider "google/local"
        int elo_rating
        timestamp created_at
    }
    Wallet {
        uuid id PK
        uuid user_id FK
        decimal balance
        string currency "LVC"
        timestamp updated_at
    }
    Transaction {
        uuid id PK
        uuid wallet_id FK
        string type "deposit/withdrawal/wager/win"
        decimal amount
        string status "pending/success/failed"
        string reference_id
        timestamp created_at
    }
    MatchHistory {
        uuid id PK
        uuid player1_id FK
        uuid player2_id FK
        string game_type
        uuid winner_id FK
        jsonb game_state
        timestamp started_at
        timestamp ended_at
    }
    Session {
        uuid id PK
        uuid user_id FK
        string token
        timestamp expires_at
    }
```

## 2. Redis Key Structure

Redis is used for real-time state, matchmaking queues, and caching.

### Matchmaking
- `queue:{game_type}`: List of user IDs waiting for a match.
  - Example: `queue:tic-tac-toe` -> `["user1", "user2"]`

### Game State
- `game:{room_id}:state`: Hash storing the current game board/status.
  - Example: `game:123:state` -> `{ "board": ".........", "turn": "user1" }`
- `game:{room_id}:players`: Set of player IDs in the room.

### Pub/Sub Channels
- `channel:game:{room_id}`: Messages for a specific game room.
- `channel:user:{user_id}`: Private notifications for a user.
- `channel:global`: System-wide announcements.

### Caching
- `cache:user:{user_id}`: Cached user profile data.
- `cache:leaderboard:{game_type}`: Sorted set for leaderboard rankings.

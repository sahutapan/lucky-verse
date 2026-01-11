# API & WebSocket Specifications

## 1. REST API (OpenAPI Draft)

### Authentication
- `POST /auth/login`: Login with email/password.
- `POST /auth/register`: Register new user.
- `GET /auth/google`: Initiate Google OAuth.


### User & Wallet
- `GET /users/me`: Get current user profile.
- `GET /wallet/balance`: Get current wallet balance.
- `POST /wallet/deposit`: Simulate a deposit (Sandbox).
- `POST /wallet/withdraw`: Simulate a withdrawal (Sandbox).

### Games
- `GET /games`: List available games.
- `POST /games/matchmaking/join`: Join matchmaking queue.
- `POST /games/matchmaking/cancel`: Leave matchmaking queue.

## 2. WebSocket Message Contracts

All WebSocket messages follow a standard JSON format:
```json
{
  "type": "message_type",
  "payload": { ... }
}
```

### Client -> Server

#### Join Game
```json
{
  "type": "join_game",
  "payload": {
    "game_type": "tic-tac-toe"
  }
}
```

#### Game Move (Skill)
```json
{
  "type": "move",
  "payload": {
    "room_id": "uuid",
    "action": { "x": 1, "y": 2 }
  }
}
```

#### Spin (Luck)
```json
{
  "type": "spin",
  "payload": {
    "game_type": "slots",
    "wager": 100
  }
}
```

### Server -> Client

#### Match Found
```json
{
  "type": "match_found",
  "payload": {
    "room_id": "uuid",
    "opponent": { "username": "player2", "elo": 1200 }
  }
}
```

#### Game State Update
```json
{
  "type": "state_update",
  "payload": {
    "board": [[null, "X", null], ...],
    "turn": "player2"
  }
}
```

#### Game Result
```json
{
  "type": "game_over",
  "payload": {
    "winner": "player1",
    "reason": "checkmate",
    "rewards": { "xp": 50, "lvc": 10 }
  }
}
```

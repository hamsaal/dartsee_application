# Backend Documentation

## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Architecture](#architecture)
- [Error Handling](#error-handling)

---

## Overview

The backend is a REST API built with Node.js, Express 5 and TypeScript. It connects to a PostgreSQL database and serves dart game statistics.

---

## Getting Started

```bash
cd backend
pnpm install
pnpm dev
```

### URLs

| Service      | URL                            |
| ------------ | ------------------------------ |
| API Root     | http://localhost:3000          |
| Health Check | http://localhost:3000/health   |
| Swagger UI   | http://localhost:3000/api-docs |

---

## Project Structure

```
backend/
└── src/
    ├── config/
    │   ├── env.ts                        ← Reads and validates environment variables
    │   ├── swagger.ts                    ← Swagger configuration
    │   └── swagger/                      ← Swagger YAML docs — one file per module
    │       ├── games.yaml
    │       ├── statistics.yaml
    │       └── player.yaml
    ├── db/
    │   └── index.ts                      ← PostgreSQL connection pool
    ├── middleware/
    │   ├── error.middleware.ts            ← Global error handler + AppError class
    │   └── logger.middleware.ts           ← Logs every request with method, url, status, duration
    ├── modules/
    │   ├── games/
    │   │   ├── common/
    │   │   │   └── types.ts              ← Shared Game interface
    │   │   ├── list/
    │   │   │   ├── types.ts              ← GamesListResponse
    │   │   │   ├── queries.ts            ← SQL queries for listing games
    │   │   │   ├── repository.ts         ← Database access
    │   │   │   ├── service.ts            ← Business logic
    │   │   │   └── controller.ts         ← HTTP handler
    │   │   ├── detail/
    │   │   │   ├── types.ts              ← PlayerRow, Player, GameDetail
    │   │   │   ├── queries.ts            ← SQL queries for game detail
    │   │   │   ├── repository.ts         ← Database access
    │   │   │   ├── service.ts            ← Business logic (score calculation)
    │   │   │   └── controller.ts         ← HTTP handler
    │   │   └── routes.ts                 ← Registers list and detail routes
    │   ├── statistics/
    │   │   ├── game-types/
    │   │   │   ├── types.ts              ← GameTypeStats
    │   │   │   ├── queries.ts            ← SQL queries
    │   │   │   ├── repository.ts         ← Database access
    │   │   │   ├── service.ts            ← Business logic
    │   │   │   └── controller.ts         ← HTTP handler
    │   │   └── routes.ts                 ← Registers statistics routes
    │   └── player/
    │       ├── analysis/
    │       │   ├── types.ts              ← ThrowData, PlayerAnalysisResponse
    │       │   ├── queries.ts            ← SQL queries
    │       │   ├── repository.ts         ← Database access
    │       │   ├── service.ts            ← Business logic
    │       │   └── controller.ts         ← HTTP handler
    │       └── routes.ts                 ← Registers player routes
    ├── app.ts                            ← Express app — registers middleware and routes
    └── server.ts                         ← Entry point — starts the server
```

---

## Environment Variables

| Variable     | Description                                             |
| ------------ | ------------------------------------------------------- |
| DATABASE_URL | PostgreSQL connection string — required                 |
| PORT         | Server port — default 3000                              |
| CORS_ORIGIN  | Allowed frontend origin — default http://localhost:5173 |
| NODE_ENV     | Environment — default development                       |

---

## API Endpoints

| Method | Endpoint                                  | Description                                        |
| ------ | ----------------------------------------- | -------------------------------------------------- |
| GET    | /health                                   | Health check                                       |
| GET    | /api/v1/games                             | List all games — supports `?page=1&limit=20`       |
| GET    | /api/v1/games/:id                         | Game detail with players, avg score and miss count |
| GET    | /api/v1/statistics/game-types             | Game type distribution                             |
| GET    | /api/v1/player/analysis/:gameId/:playerId | Player throw data with coordinates                 |
| GET    | /api-docs                                 | Swagger UI                                         |

---

## Architecture

### Layer Pattern

```
Request → Controller → Service → Repository → Database
Response ← Controller ← Service ← Repository ← Database
```

| Layer      | Responsibility                               |
| ---------- | -------------------------------------------- |
| Controller | Handle HTTP — parse request, return response |
| Service    | Business logic — calculations, validations   |
| Repository | Database queries only — SQL lives here       |

### Module Structure

Each module is organized by feature with nested subfolders. Shared types live in a `common/` folder at the module root. Each subfeature follows the same layered pattern:

```
modules/games/
├── common/
│   └── types.ts          ← Shared interfaces used across subfeatures
├── list/
│   ├── types.ts          ← Feature-specific interfaces
│   ├── queries.ts        ← SQL query strings
│   ├── repository.ts     ← Database access
│   ├── service.ts        ← Business logic
│   └── controller.ts     ← HTTP handler
├── detail/
│   ├── types.ts
│   ├── queries.ts
│   ├── repository.ts
│   ├── service.ts
│   └── controller.ts
└── routes.ts             ← Registers all routes for the module
```

## Error Handling

- **Repository** — wraps queries in try/catch, throws `AppError`
- **Express 5** — catches async errors automatically
- **Error middleware** — returns consistent JSON response
- **Development** — exposes stack traces for debugging

### AppError

```typescript
throw new AppError(404, 'Game not found')
// returns: { status: 'error', message: 'Game not found' } with status 404
```

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
    │   ├── env.ts               ← reads and validates environment variables
    │   ├── swagger.ts           ← swagger configuration
    │   └── swagger/             ← swagger YAML docs — one file per module
    │       └── games.yaml
    │       └── statistics.yaml
    ├── db/
    │   └── index.ts             ← PostgreSQL connection pool
    ├── middleware/
    │   ├── error.middleware.ts  ← global error handler + AppError class
    │   └── logger.middleware.ts ← logs every request with method, url, status, duration
    ├── modules/
    │   ├── games/
    │   │   ├── games.queries.ts    ← SQL query strings
    │   │   ├── games.types.ts      ← TypeScript interfaces
    │   │   ├── games.repository.ts ← database queries
    │   │   ├── games.service.ts    ← business logic
    │   │   ├── games.controller.ts ← HTTP handlers
    │   │   └── games.routes.ts     ← route definitions
    │   └── statistics/
    │       ├── statistics.queries.ts
    │       ├── statistics.types.ts
    │       ├── statistics.repository.ts
    │       ├── statistics.service.ts
    │       ├── statistics.controller.ts
    │       └── statistics.routes.ts
    ├── app.ts                   ← Express app — registers middleware and routes
    └── server.ts                ← entry point — starts the server
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

| Method | Endpoint                      | Description                                        |
| ------ | ----------------------------- | -------------------------------------------------- |
| GET    | /health                       | Health check                                       |
| GET    | /api/v1/games                 | List all games — supports `?page=1&limit=20`       |
| GET    | /api/v1/games/:id             | Game detail with players, avg score and miss count |
| GET    | /api/v1/statistics/game-types | Game type distribution                             |
| GET    | /api-docs                     | Swagger UI                                         |

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

Each feature is a self-contained module:

```
modules/games/
├── games.types.ts      ← interfaces used across the module
├── games.repository.ts ← only file that touches the database
├── games.service.ts    ← only file with business logic
├── games.controller.ts ← only file that handles HTTP
└── games.routes.ts     ← registers routes, no logic
```

---

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

# Dartsee Application

A full-stack web application for visualising dart game statistics collected by Dartsee auto-scoring systems.

---

## Table of Contents

- [What is this project](#what-is-this-project)
- [Tech Stack](#tech-stack)
- [Monorepo Structure](#monorepo-structure)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Features](#features)
- [Documentation](#documentation)
- [Troubleshooting](#troubleshooting)

---

## What is this project

Dartsee is a dart auto-scoring system. This application reads anonymised game data collected by the system and presents it in a visual, easy to navigate web interface.

The application allows users to:

- Browse all recorded dart games
- View detailed statistics per game including player scores and miss counts
- See a breakdown of game types played

---

## Tech Stack

| Layer    | Technology                               | Status      |
| -------- | ---------------------------------------- | ----------- |
| Backend  | Node.js, Express 5, TypeScript           | in progress |
| Database | PostgreSQL (Docker)                      | done        |
| Frontend | React 19, Vite, TypeScript, MUI          | coming soon |
| API Docs | Swagger UI                               | in progress |
| Tooling  | pnpm workspaces, ESLint, Prettier, Husky | done        |

---

## Monorepo Structure

This project uses **pnpm workspaces** — a single repository containing multiple packages that share tooling.

### Root level commands

| Command                  | Description                       |
| ------------------------ | --------------------------------- |
| `pnpm --parallel -r dev` | Start all packages in parallel    |
| `pnpm -r build`          | Build all packages                |
| `pnpm -r test`           | Run tests across all packages     |
| `pnpm lint`              | Lint all packages                 |
| `pnpm format`            | Format all packages with Prettier |

To run backend or frontend individually refer to their respective documentation:

- [Backend](docs/backend.md)
- [Frontend](docs/frontend.md) (coming soon)

---

## Getting Started

### Prerequisites

- Node.js v22+
- pnpm v10+
- Docker Desktop

> **Windows users:** Enable WSL2 integration in Docker Desktop.
> Settings → Resources → WSL Integration → enable your Ubuntu distro.

### Setup

```bash
# 1. Clone the repo
git clone git@github.com:YOURUSERNAME/dartsee_application.git
cd dartsee_application

# 2. Enable Corepack (ensures correct pnpm version)
corepack enable

# 3. Copy env file
cp .env.example .env

```

> **Important:** Before continuing, you must set up the database SQL files.
> Follow the [Database Setup Guide](docs/database.md#setup) and return here when done.

```bash

# 4. Install dependencies
pnpm install

# 5. Start all packages in parallel
pnpm --parallel -r dev
```

---

## Project Structure

```
dartsee_application/
├── backend/              ← Node.js + Express API
├── frontend/             ← React application (coming soon)
├── docs/                 ← Detailed documentation
├── database/             ← SQL files
├── .husky/
├── .vscode/              ← Editor settings and extension recommendations
├── .env                  ← Environment variables
├── .env.example          ← Environment variable template
├── .gitignore
├── .prettierignore
├── .prettierrc.yml       ← Prettier formatting rules
├── docker-compose.yml    ← PostgreSQL container
├── eslint.config.js      ← ESLint rules for all packages
├── package.json          ← Root package with shared scripts
├── pnpm-lock.yaml
├── pnpm-workspace.yaml   ← Defines monorepo packages
└── README.md
├── .node-version         ← Node version
├── .npmrc                ← engine strict mode
```

---

## Features

- [ ] Games list — browse all recorded dart games
- [ ] Game detail — view players, average score per round, miss count
- [ ] Game statistics — pie chart showing game type distribution

---

## Documentation

- [Backend](docs/backend.md) (coming soon)
- [Frontend](docs/frontend.md) (coming soon)
- [Database](docs/database.md) — schema reference

---

## Troubleshooting

### Database tables not found

The SQL files are loaded automatically on first container start. If tables are missing:

```bash
docker compose down -v
docker compose up -d
```

### pnpm install fails

Make sure you are using the correct pnpm version:

```bash
pnpm --version  # should be 10.32.1
```

### ESLint errors on commit

Husky runs ESLint before every commit. Fix the errors shown in the terminal before committing.

### Wrong pnpm or Node version

The project enforces specific versions. If you get an engine compatibility error:

1. Make sure Corepack is enabled: `corepack enable`
2. Make sure you're on Node 22+: `node --version`
3. If using nvm or fnm, run `nvm use` or `fnm use` — it will read `.node-version` automatically

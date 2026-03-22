# Frontend Documentation

## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Configuration](#configuration)

---

## Overview

The frontend is a React single-page application built with Vite and TypeScript. It connects to the backend REST API and presents dart game statistics in a visual, easy to navigate interface.

---

## Getting Started

```bash
cd frontend
pnpm install
pnpm dev
```

### URLs

| Service  | URL                   |
| -------- | --------------------- |
| Frontend | http://localhost:5173 |

---

## Project Structure

```
frontend/
├── public/                   ← Static files served by Vite
├── src/
│   ├── api/
│   │   └── client.ts         ← Fetch wrapper for backend API
│   ├── theme/
│   │   └── theme.ts          ← MUI dark theme configuration
│   ├── App.tsx                ← Providers and routing
│   └── main.tsx              ← Entry point
├── index.html
├── tsconfig.json
├── vite.config.ts
└── package.json
```

---

## Tech Stack

| Library      | Purpose                   |
| ------------ | ------------------------- |
| React 19     | UI framework              |
| Vite         | Build tool and dev server |
| TypeScript   | Type safety               |
| MUI          | Component library         |
| React Query  | Data fetching and caching |
| React Router | Client-side routing       |

---

## Configuration

### Theme

The app uses a custom dark MUI theme with purple accents. Theme configuration is in `src/theme/theme.ts`.

### Routing

| Path        | View                 |
| ----------- | -------------------- |
| /           | Games list           |
| /games/:id  | Game detail          |
| /statistics | Game type statistics |

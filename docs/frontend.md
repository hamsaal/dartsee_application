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
├── public/                                         ← Static files served by Vite
├── src/
│   ├── api/
│   │   └── client.ts                               ← Fetch wrapper for backend API
│   ├── components/
│   │   ├── dartboard/
│   │   │   ├── constants.ts                        ← Board dimensions, colors, legend
│   │   │   ├── utils.ts                            ← Coordinate scaling and validation
│   │   │   └── DartBoard.tsx                       ← SVG dartboard with throw positions
│   │   ├── ErrorAlert.tsx                          ← Shared error display
│   │   ├── GameTypeChip.tsx                        ← Color-coded game type badge
│   │   ├── LoadingSpinner.tsx                      ← Shared loading state
│   │   └── NavBar.tsx                              ← Top navigation bar
│   ├── config/
│   │   └── queryClient.ts                          ← React Query configuration
│   ├── constants/
│   │   ├── chartColors.ts                          ← Chart color palette
│   │   ├── gameTypes.ts                            ← Game type definitions
│   │   └── plotColors.ts                           ← Dartboard plot colors
│   ├── pages/
│   │   ├── games-list/
│   │   │   ├── types.ts                            ← GamesListResponse
│   │   │   ├── queries.ts                          ← React Query hook
│   │   │   └── GamesListPage.tsx                   ← Games list with pagination
│   │   ├── game-detail/
│   │   │   ├── types.ts                            ← Player, GameDetail
│   │   │   ├── queries.ts                          ← React Query hook
│   │   │   └── GameDetailPage.tsx                  ← Game detail with player stats
│   │   ├── statistics/
│   │   │   ├── types.ts                            ← GameTypeStats
│   │   │   ├── queries.ts                          ← React Query hook
│   │   │   └── StatisticsPage.tsx                  ← Pie chart of game types
│   │   ├── player-analysis/
│   │   │   ├── components/
│   │   │   │   ├── ThrowMapSection.tsx             ← Dartboard with throw positions
│   │   │   │   ├── SummarySection.tsx              ← Player performance stats
│   │   │   │   └── RoundBreakdownSection.tsx       ← Round-by-round score table
│   │   │   ├── contants/
│   │   │   │   └── throwLegends.ts                 ← Throw map legend data
│   │   │   ├── types.ts                            ← ThrowData, Round, PlayerAnalysisResponse
│   │   │   ├── queries.ts                          ← React Query hook
│   │   │   ├── utils.ts                            ← Round grouping and stat calculations
│   │   │   └── PlayerAnalysisPage.tsx              ← Player analysis view
│   │   └── NotFound.tsx                            ← 404 page
│   ├── theme/
│   │   └── theme.ts                                ← Custom MUI theme
│   ├── types/
│   │   └── game.ts                                 ← Shared Game interface
│   ├── utils/
│   │   └── getGameTypeColor.ts                     ← Consistent color mapping for game types
│   ├── App.tsx                                     ← Providers and routing
│   └── main.tsx                                    ← Entry point
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
| recharts     | Chart visualization       |

---

## Configuration

### Theme

The app uses a custom MUI theme. Configuration is in `src/theme/theme.ts`.

### Routing

| Path                                      | View                 |
| ----------------------------------------- | -------------------- |
| /                                         | Games list           |
| /games/:id                                | Game detail          |
| /games/:gameId/players/:playerId/analysis | Player analysis      |
| /statistics                               | Game type statistics |
| \*                                        | 404 page             |

---

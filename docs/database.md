# Database

## Table of Contents

- [Overview](#overview)
- [Setup](#setup)
- [Schema](#schema)
- [Key Relationships](#key-relationships)
- [Notes](#notes)

---

## Overview

PostgreSQL 16 running in Docker. The schema and seed data are provided as SQL files and loaded automatically on first container start.

---

## Setup

### Step 1 — Create the database folder

```bash
mkdir -p database
```

### Step 2 — Download the SQL files

The SQL files are not included in the repository. Download them using the links below:

- [schema.sql](https://drive.google.com/file/d/1gpfnJ4QXehmgPe3O-3b8LVjzpfCWGerf/view) — creates the database tables
- [data.sql](https://drive.google.com/file/d/1RYzbuTNhshVtQdqZOLXWBGsUNTbhzRkz/view) — loads the anonymised game data

Once downloaded, place them in the `database/` folder:

```
dartsee_application/
└── database/
    ├── schema.sql
    └── data.sql
```

Then start the database:

```bash
docker compose up -d
```

This starts the PostgreSQL container in the background and begins loading the schema and data automatically. This can take a minute or two depending on your machine — the backend will wait for it to finish before starting.

> Already following the Getting Started guide? You're done here — [click here to go back to setup](../README.md#setup).

---

## Schema

### games

| Column | Type    | Description                                        |
| ------ | ------- | -------------------------------------------------- |
| id     | integer | Primary key                                        |
| type   | text    | Game type — x01, cricket, killer, golf, beer, etc. |

### players

| Column | Type | Description |
| ------ | ---- | ----------- |
| id     | text | Primary key |
| name   | text | Player name |

### game_players

| Column    | Type    | Description           |
| --------- | ------- | --------------------- |
| id        | text    | Primary key           |
| game_id   | integer | References games.id   |
| player_id | text    | References players.id |

### throws

| Column    | Type    | Description                     |
| --------- | ------- | ------------------------------- |
| id        | integer | Primary key                     |
| game_id   | integer | References games.id             |
| player_id | text    | References players.id           |
| score     | integer | Score of the throw              |
| modifier  | integer | 0 = missed the board completely |
| x         | integer | X coordinate on the board       |
| y         | integer | Y coordinate on the board       |

---

## Key Relationships

```
games
  └── game_players ← links players to games
        └── players
              └── throws ← all throws per player per game
```

---

## Notes

### Coordinate system

The x and y coordinates represent where on the board the dart landed:

- Detection area is an 800×800 square
- Dartboard is circular, centered at (400, 400) with radius 300
- Throws outside the circle are misses but still have coordinates

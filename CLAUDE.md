# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Emoji Tarot is a workshop teaching project for TypeScript API 101 with Express. It consists of:
- **Frontend**: React + Vite app with animated card interactions
- **Backend**: Express API for card data and management

## Architecture

```
emoji-tarot/
├── client/               # React frontend
│   └── src/
│       ├── api/          # Typed fetch wrappers
│       ├── components/   # TarotCard, CardForm
│       ├── pages/        # DrawPage, ManagePage
│       └── types/        # Card, DTO interfaces
├── server/               # Express backend
│   └── src/
│       ├── data/         # In-memory card storage
│       ├── routes/       # API route handlers
│       └── types/        # Card, DTO interfaces
└── package.json          # Root scripts for monorepo
```

**Note**: Types are duplicated between client and server (not shared via package).

## Development Commands

```bash
# Install dependencies
npm install

# Run development servers (both)
npm run dev

# Run individual servers
npm run dev:client    # Frontend only
npm run dev:server    # Backend only

# Build and type check
npm run build
npm run typecheck
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/cards | Get all cards |
| GET | /api/cards/random | Get random card |
| GET | /api/cards/:id | Get card by ID |
| POST | /api/cards | Create new card |
| PUT | /api/cards/:id | Update card |
| DELETE | /api/cards/:id | Delete card |

## Card Data Structure

```typescript
interface Card {
  id: string;
  emoji: string;
  name: string;
  meaning: string;
}
```

## Key Implementation Details

- **Data Storage**: In-memory array (no database)
- **Testing**: No testing framework configured
- **Build**: Client uses Vite, server uses bun/esbuild

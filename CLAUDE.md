# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Emoji Tarot is a workshop teaching project for TypeScript API 101 with Express. It consists of:
- **Frontend**: React app for drawing tarot cards with emoji faces and animations
- **Backend**: Express API for card data and management

## Architecture

```
emoji-tarot/
├── client/           # React frontend
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── pages/        # Page components (Draw, Manage)
│   │   └── api/          # API client functions
│   └── public/
├── server/           # Express backend
│   ├── src/
│   │   ├── routes/       # API routes
│   │   ├── data/         # Card data storage
│   │   └── types/        # TypeScript types
│   └── package.json
└── shared/           # Shared types between client/server
```

## Development Commands

```bash
# Install dependencies
bun install

# Run development servers
bun run dev           # Start both client and server
bun run dev:client    # Start frontend only
bun run dev:server    # Start backend only

# Build
bun run build

# Type checking
bun run typecheck
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

## Key Features

1. **Card Drawing Page**: Animated card flip revealing random emoji tarot card with meaning
2. **Card Management Page**: CRUD interface for managing card deck

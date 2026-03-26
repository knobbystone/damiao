# Project Context

Full-stack POC: React (Vite) + Express + Postgres in Docker.

## Ports
- Frontend: 5173
- Backend: 3001
- Postgres: 5432 (Docker), was conflicting with local brew postgres@16

## Structure
- backend/index.js — Express API (health, GET/POST messages)
- backend/init.sql — seeds messages table on first docker compose up
- frontend/src/App.jsx — React UI, fetches from /api via Vite proxy
- vite.config.js — allowedHosts: true (required for ngrok)

## Known gotchas
- brew postgresql@16 conflicts with Docker on port 5432 — stop it before starting
- docker compose down -v wipes the volume and re-seeds on next up
- .env must exist in backend/ for DATABASE_URL to load
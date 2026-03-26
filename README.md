# Hello World POC

React + Express + Postgres, self-hosted.

## Prerequisites

- [Node.js](https://nodejs.org) v18+
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (for Postgres)

---

## 1. Start Postgres

```bash
docker compose up -d
```

This spins up Postgres on port 5432 and seeds 3 messages automatically via `backend/init.sql`.

---

## 2. Start the Express backend

```bash
cd backend
npm install
cp .env.example .env   # edit if needed
npm run dev            # runs on http://localhost:3001
```

Test it:
```bash
curl http://localhost:3001/api/health
curl http://localhost:3001/api/messages
```

---

## 3. Start the React frontend

In a new terminal:

```bash
cd frontend
npm install
npm run dev            # runs on http://localhost:5173
```

Open http://localhost:5173 — the UI fetches messages from Postgres and lets you add new ones.

---

## Project Structure

```
hello-world/
├── docker-compose.yml       # Postgres container
├── backend/
│   ├── index.js             # Express API
│   ├── init.sql             # DB seed (runs once on first docker compose up)
│   ├── .env.example
│   └── package.json
└── frontend/
    ├── src/
    │   ├── main.jsx
    │   └── App.jsx          # React UI
    ├── index.html
    ├── vite.config.js       # Proxies /api → Express
    └── package.json
```

## API Endpoints

| Method | Path           | Description         |
|--------|----------------|---------------------|
| GET    | /api/health    | Health check        |
| GET    | /api/messages  | List all messages   |
| POST   | /api/messages  | Add a new message   |

---

## Reset the database

```bash
docker compose down -v   # removes the volume (wipes data)
docker compose up -d     # re-seeds from init.sql
```

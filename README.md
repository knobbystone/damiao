# Hello World: React + Express + PostgreSQL

Minimal full-stack Hello World application with:
- React frontend (FE)
- Express backend (BE)
- PostgreSQL persistence

## Architecture

- Frontend calls backend API endpoint `GET /api/hello`.
- Backend reads/writes greeting data from PostgreSQL.
- Database stores a simple `messages` table.

## Suggested Project Structure

```text
homeserver-hello-world/
  frontend/        # React app
  backend/         # Express API
  db/              # SQL scripts (optional)
  README.md
```

## Prerequisites

- Node.js 20+
- npm 10+
- PostgreSQL 14+

## Quick Start

### 1) Create apps

```bash
# from repo root
npm create vite@latest frontend -- --template react
mkdir backend && cd backend
npm init -y
npm install express cors pg dotenv
npm install -D nodemon
```

### 2) PostgreSQL setup

Create a database:

```sql
CREATE DATABASE hello_world;
```

Create table and seed data:

```sql
\c hello_world

CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  text VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO messages (text) VALUES ('Hello from PostgreSQL')
ON CONFLICT DO NOTHING;
```

## Environment Variables

Create `backend/.env`:

```env
PORT=3001
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/hello_world
```

## Backend (Express) Notes

- Add scripts in `backend/package.json`:

```json
{
  "scripts": {
    "dev": "nodemon index.js",
    "start": "node index.js"
  }
}
```

- Expected API route:
  - `GET /api/hello` -> returns latest message from DB.

## Frontend (React) Notes

Inside `frontend`, install and run:

```bash
npm install
npm run dev
```

In your React app, fetch:

- `http://localhost:3001/api/hello`

Render the response text as the Hello World message.

## Run the System

Use two terminals:

```bash
# terminal 1
cd backend
npm run dev

# terminal 2
cd frontend
npm run dev
```

Open Vite URL (usually `http://localhost:5173`).

## Example API Response

```json
{
  "message": "Hello from PostgreSQL"
}
```

## Next Improvements

- Add Docker Compose for app + db.
- Add migration tooling (e.g., Prisma, Knex, or node-pg-migrate).
- Add health check endpoint (`GET /health`).
- Add tests for API and FE rendering.

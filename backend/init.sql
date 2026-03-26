CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  text TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO messages (text) VALUES
  ('Hello from Postgres!'),
  ('The database is alive.'),
  ('Welcome to the POC.');

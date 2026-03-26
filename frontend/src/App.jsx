import { useState, useEffect } from "react";

const API = "/api";

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null); // null | "ok" | "error"
  const [posting, setPosting] = useState(false);

  // Check health + fetch messages on load
  useEffect(() => {
    fetch(`${API}/health`)
      .then((r) => r.json())
      .then(() => setStatus("ok"))
      .catch(() => setStatus("error"));

    fetchMessages();
  }, []);

  const fetchMessages = () => {
    setLoading(true);
    fetch(`${API}/messages`)
      .then((r) => r.json())
      .then((data) => setMessages(Array.isArray(data) ? data : []))
      .catch(() => setMessages([]))
      .finally(() => setLoading(false));
  };

  const addMessage = async () => {
    if (!input.trim()) return;
    setPosting(true);
    try {
      await fetch(`${API}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input.trim() }),
      });
      setInput("");
      fetchMessages();
    } finally {
      setPosting(false);
    }
  };

  return (
    <div style={styles.app}>
      <div style={styles.container}>
        <header style={styles.header}>
          <div style={styles.eyebrow}>POC · React + Express + Postgres</div>
          <h1 style={styles.title}>Hello, World.</h1>
          <div style={styles.statusRow}>
            <span style={styles.dot(status)} />
            <span style={styles.statusText}>
              {status === null ? "Connecting..." : status === "ok" ? "API connected" : "API unreachable"}
            </span>
          </div>
        </header>

        <section style={styles.section}>
          <div style={styles.sectionLabel}>Messages from Postgres</div>
          {loading ? (
            <div style={styles.empty}>Loading...</div>
          ) : messages.length === 0 ? (
            <div style={styles.empty}>No messages yet.</div>
          ) : (
            <ul style={styles.list}>
              {messages.map((m) => (
                <li key={m.id} style={styles.listItem}>
                  <span style={styles.msgText}>{m.text}</span>
                  <span style={styles.msgMeta}>
                    #{m.id} · {new Date(m.created_at).toLocaleTimeString()}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section style={styles.section}>
          <div style={styles.sectionLabel}>Write to Postgres</div>
          <div style={styles.inputRow}>
            <input
              style={styles.input}
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addMessage()}
            />
            <button style={styles.btn} onClick={addMessage} disabled={posting}>
              {posting ? "..." : "Send"}
            </button>
          </div>
        </section>

        <footer style={styles.footer}>
          Stack: Vite · React · Express · node-postgres · Docker Compose
        </footer>
      </div>
    </div>
  );
}

const styles = {
  app: {
    minHeight: "100vh",
    background: "#0f1117",
    color: "#e8e8e8",
    fontFamily: "'Georgia', serif",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: "60px 24px",
  },
  container: { maxWidth: 560, width: "100%" },
  header: { marginBottom: 48 },
  eyebrow: {
    fontSize: 10,
    letterSpacing: "0.25em",
    textTransform: "uppercase",
    color: "#4a9e6b",
    marginBottom: 12,
  },
  title: {
    fontSize: 48,
    fontWeight: "normal",
    margin: "0 0 16px",
    lineHeight: 1,
    color: "#f0f0f0",
  },
  statusRow: { display: "flex", alignItems: "center", gap: 8 },
  dot: (s) => ({
    width: 8,
    height: 8,
    borderRadius: 4,
    background: s === "ok" ? "#4a9e6b" : s === "error" ? "#c0392b" : "#555",
  }),
  statusText: { fontSize: 12, color: "#888", letterSpacing: "0.05em" },
  section: {
    background: "#1a1d27",
    border: "1px solid #2a2d3a",
    borderRadius: 6,
    padding: 24,
    marginBottom: 16,
  },
  sectionLabel: {
    fontSize: 10,
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: "#555",
    marginBottom: 16,
  },
  list: { listStyle: "none", padding: 0, margin: 0 },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    padding: "10px 0",
    borderBottom: "1px solid #2a2d3a",
    gap: 12,
  },
  msgText: { fontSize: 14, color: "#e0e0e0" },
  msgMeta: { fontSize: 11, color: "#444", whiteSpace: "nowrap", flexShrink: 0 },
  empty: { fontSize: 13, color: "#444", padding: "8px 0" },
  inputRow: { display: "flex", gap: 10 },
  input: {
    flex: 1,
    background: "#0f1117",
    border: "1px solid #2a2d3a",
    borderRadius: 4,
    padding: "10px 14px",
    color: "#e0e0e0",
    fontSize: 14,
    fontFamily: "inherit",
    outline: "none",
  },
  btn: {
    background: "#4a9e6b",
    color: "#fff",
    border: "none",
    borderRadius: 4,
    padding: "10px 20px",
    fontSize: 12,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    fontFamily: "inherit",
    cursor: "pointer",
  },
  footer: {
    fontSize: 11,
    color: "#333",
    textAlign: "center",
    marginTop: 32,
    letterSpacing: "0.05em",
  },
};

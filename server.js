const express = require("express");
const cors    = require("cors");
const path    = require("path");
const fs      = require("fs");

const app  = express();
const PORT = 3000;

// ── JSON "database" ───────────────────────────────────────────────────────────
// All data lives in progress.json next to server.js.
// Shape: { sessions: { "0-1": true, "2-0": false, ... }, notes: { "0": "...", "3": "..." } }

const DB_FILE = path.join(__dirname, "progress.json");

function loadDB() {
  try {
    return JSON.parse(fs.readFileSync(DB_FILE, "utf8"));
  } catch {
    return { sessions: {}, notes: {} };
  }
}

function saveDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf8");
}

// Create the file if it doesn't exist yet
if (!fs.existsSync(DB_FILE)) saveDB({ sessions: {}, notes: {} });

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// ── API Routes ────────────────────────────────────────────────────────────────

// GET  /api/progress
app.get("/api/progress", (req, res) => {
  const db = loadDB();
  res.json(db.sessions);
});

// POST /api/progress  body: { key: "0-1", completed: true }
app.post("/api/progress", (req, res) => {
  const { key, completed } = req.body;
  if (!key || typeof completed !== "boolean") {
    return res.status(400).json({ error: "key and completed required" });
  }
  const db = loadDB();
  db.sessions[key] = completed;
  saveDB(db);
  res.json({ ok: true, key, completed });
});

// POST /api/progress/reset
app.post("/api/progress/reset", (req, res) => {
  const db = loadDB();
  db.sessions = {};
  saveDB(db);
  res.json({ ok: true, message: "Progress reset" });
});

// GET  /api/notes
app.get("/api/notes", (req, res) => {
  const db = loadDB();
  res.json(db.notes);
});

// POST /api/notes  body: { dayIndex: 0, content: "..." }
app.post("/api/notes", (req, res) => {
  const { dayIndex, content } = req.body;
  if (dayIndex === undefined || content === undefined) {
    return res.status(400).json({ error: "dayIndex and content required" });
  }
  const db = loadDB();
  db.notes[String(dayIndex)] = content;
  saveDB(db);
  res.json({ ok: true });
});

// GET  /api/stats
app.get("/api/stats", (req, res) => {
  const db      = loadDB();
  const entries = Object.values(db.sessions);
  res.json({
    total_tracked : entries.length,
    completed     : entries.filter(Boolean).length,
    pending       : entries.filter(v => !v).length,
  });
});

// Catch-all: serve the React SPA
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log("\n  +--------------------------------------------------+");
  console.log("  |   TCS NQT Tracker  ->  http://localhost:3000     |");
  console.log("  |   Progress saved to: progress.json               |");
  console.log("  +--------------------------------------------------+\n");
});

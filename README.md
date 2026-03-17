# TCS NQT 2026 — 7-Day Study Tracker
### Mar 14 (Sat) → Mar 20 (Fri)

A local full-stack study tracker with **persistent progress** saved to a SQLite database.
Every session tick, note, and progress bar is restored exactly as you left it each time you open the app.

---

## 🚀 Setup (one time only)

**Prerequisites:** Node.js installed (v16 or later)

```bash
# 1. Navigate to this folder
cd tcs-nqt-tracker

# 2. Install dependencies (Express + SQLite + CORS)
npm install

# 3. Start the server
npm start
```

Then open your browser at → **http://localhost:3000**

---

## 📁 Project Structure

```
tcs-nqt-tracker/
├── server.js          ← Express server + SQLite API
├── progress.db        ← Auto-created SQLite database (your saved progress)
├── package.json
├── public/
│   └── index.html     ← The full React app (no build step needed)
└── README.md
```

---

## 🔌 API Endpoints

| Method | Endpoint              | Description                        |
|--------|-----------------------|------------------------------------|
| GET    | `/api/progress`       | Get all completed session keys     |
| POST   | `/api/progress`       | Toggle a session complete/incomplete |
| POST   | `/api/progress/reset` | Wipe all progress                  |
| GET    | `/api/notes`          | Get all day notes                  |
| POST   | `/api/notes`          | Save a note for a day              |
| GET    | `/api/stats`          | Summary count of done/pending      |

---

## 💾 How persistence works

- Progress is stored in `progress.db` (SQLite file in the same folder)
- Every time you tick/untick a session, it's instantly written to the database
- Notes auto-save 800ms after you stop typing
- Restarting the server or browser restores everything exactly

---

## 🔄 To reset progress

Click the **RESET** button in the top-right of the app, or:

```bash
# Via API
curl -X POST http://localhost:3000/api/progress/reset
```

---

## 📅 Schedule

| Day | Date       | Focus                                    |
|-----|------------|------------------------------------------|
| 1   | Sat Mar 14 | Numerical Aptitude + Number Coding       |
| 2   | Sun Mar 15 | Reasoning + Array Coding                 |
| 3   | Mon Mar 16 | Verbal + String Coding                   |
| 4   | Tue Mar 17 | Advanced Quant + Sorting & Searching     |
| 5   | Wed Mar 18 | Advanced Reasoning + Recursion           |
| 6   | Thu Mar 19 | **Advanced Coding ★** (DP + Greedy)      |
| 7   | Fri Mar 20 | Full Mock + Error Analysis + Revision    |

Good luck! 🚀

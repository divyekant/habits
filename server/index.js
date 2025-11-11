// /dev/apps/habits/server/index.js
// Multi-tenant Habit Tracker API (Cloudflare Access + Redis)
// Enhanced version with notes support and flexible goals

import express from "express";
import IORedis from "ioredis";
import { customAlphabet } from "nanoid";
import path from "path";
import { fileURLToPath } from "url";

// ---------- Config ----------
const PORT = Number(process.env.PORT || 9300);
const ALLOW_X_USER = (process.env.ALLOW_X_USER || "false").toLowerCase() === "true";
const REDIS_URL = process.env.REDIS_URL || "redis://default:pass@redis-shared:6379/3";

// ---------- App / Redis ----------
const app = express();
app.use(express.json({ limit: "256kb" }));

const redis = new IORedis(REDIS_URL, {
  enableOfflineQueue: false,
  lazyConnect: false,
  maxRetriesPerRequest: 3,
});

// ---------- Paths / Static ----------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PUBLIC_DIR = path.join(__dirname, "public");

app.use(express.static(PUBLIC_DIR));
app.get("/", (_req, res) => res.sendFile(path.join(PUBLIC_DIR, "index.html")));

// ---------- Helpers ----------
const nid = customAlphabet("abcdefghijkmnopqrstuvwxyz0123456789", 10);
const DAY_MS = 24 * 60 * 60 * 1000;

function getUID(req) {
  const email = req.headers["cf-access-authenticated-user-email"];
  if (email) return String(email).toLowerCase();
  
  if (ALLOW_X_USER) {
    const x = req.headers["x-user"];
    if (x) return String(x).toLowerCase();
  }
  return null;
}

function ymd(date = new Date()) {
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 10);
}

function addDays(iso, n) {
  const d = new Date(iso);
  d.setDate(d.getDate() + n);
  return ymd(d);
}

function isConsecutive(prevISO, currISO) {
  if (!prevISO) return false;
  const d1 = new Date(prevISO);
  const d2 = new Date(currISO);
  return d2 - d1 === DAY_MS;
}

// Redis keyspace
function K(uid) {
  const p = `ht:u:${uid}`;
  return {
    base: p,
    index: `${p}:index`,
    habit: (id) => `${p}:habit:${id}`,
    streak: (id) => `${p}:streak:${id}`,
    log: (id, date) => `${p}:log:${id}:${date}`,
    rlDone: (id, minute) => `${p}:rl:done:${id}:${minute}`,
    amt: (id, date) => `${p}:amt:${id}:${date}`,
    note: (id, date) => `${p}:note:${id}:${date}`, // NEW: notes per day
  };
}

// ---------- Health ----------
app.get("/health", async (_req, res) => {
  try {
    await redis.ping();
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ ok: false, error: "redis" });
  }
});

app.get("/health/redis-roundtrip", async (_req, res) => {
  try {
    const key = `ht:probe:${Date.now()}`;
    await redis.set(key, "1", "EX", 10);
    const v = await redis.get(key);
    res.json({ ok: v === "1" });
  } catch {
    res.status(500).json({ ok: false });
  }
});

// ---------- Auth probe ----------
app.get("/api/me", (req, res) => {
  const uid = getUID(req);
  if (!uid) return res.status(401).json({ error: "unauthorized" });
  res.json({ uid });
});

// ---------- List habits ----------
app.get("/api/habits", async (req, res) => {
  const uid = getUID(req);
  if (!uid) return res.status(401).json({ error: "unauthorized" });
  
  const keys = K(uid);
  const ids = await redis.smembers(keys.index);
  if (!ids.length) return res.json({ habits: [] });

  const pipe = redis.pipeline();
  ids.forEach((id) => pipe.hgetall(keys.habit(id)));
  const rows = (await pipe.exec()).map(([, h]) => h).filter(Boolean);
  res.json({ habits: rows });
});

// ---------- Create habit ----------
app.post("/api/habits", async (req, res) => {
  const uid = getUID(req);
  if (!uid) return res.status(401).json({ error: "unauthorized" });
  
  const { 
    name = "New Habit", 
    template = "", 
    type = "custom", 
    unit = "", 
    dailyGoal = 0,
    dailyGoalWeekend = null // NEW: optional weekend goal
  } = req.body || {};
  
  const id = nid();
  const now = Date.now().toString();
  const keys = K(uid);

  await redis
    .multi()
    .sadd(keys.index, id)
    .hset(keys.habit(id), {
      id,
      name,
      template,
      type,
      unit,
      dailyGoal: String(dailyGoal || 0),
      dailyGoalWeekend: String(dailyGoalWeekend || dailyGoal || 0),
      createdAt: now,
      archived: "0"
    })
    .hset(keys.streak(id), { current: "0", longest: "0", lastDoneDate: "" })
    .exec();

  res.json({ id, name, template, type, unit, dailyGoal, dailyGoalWeekend });
});

// ---------- Update habit ----------
app.patch("/api/habits/:id", async (req, res) => {
  const uid = getUID(req);
  if (!uid) return res.status(401).json({ error: "unauthorized" });
  
  const { id } = req.params;
  const { name, archived, type, unit, dailyGoal, dailyGoalWeekend } = req.body || {};
  const keys = K(uid);
  const hkey = keys.habit(id);

  const exists = await redis.exists(hkey);
  if (!exists) return res.status(404).json({ error: "not_found" });

  const updates = {};
  if (typeof name === "string") updates.name = name;
  if (archived === "0" || archived === "1") updates.archived = archived;
  if (typeof type === "string") updates.type = type;
  if (typeof unit === "string") updates.unit = unit;
  if (dailyGoal !== undefined && !Number.isNaN(Number(dailyGoal))) {
    updates.dailyGoal = String(Number(dailyGoal));
  }
  if (dailyGoalWeekend !== undefined && !Number.isNaN(Number(dailyGoalWeekend))) {
    updates.dailyGoalWeekend = String(Number(dailyGoalWeekend));
  }

  if (!Object.keys(updates).length) return res.json({ ok: true, noChange: true });
  await redis.hset(hkey, updates);
  res.json({ ok: true });
});

// ---------- Delete habit ----------
app.delete("/api/habits/:id", async (req, res) => {
  const uid = getUID(req);
  if (!uid) return res.status(401).json({ error: "unauthorized" });
  
  const { id } = req.params;
  const keys = K(uid);
  await redis
    .multi()
    .srem(keys.index, id)
    .del(keys.habit(id))
    .del(keys.streak(id))
    .exec();
  res.json({ ok: true });
});

// ---------- Mark done (with amount + note) ----------
app.post("/api/habits/:id/done", async (req, res) => {
  const uid = getUID(req);
  if (!uid) return res.status(401).json({ error: "unauthorized" });
  
  const { id } = req.params;
  let { date, amount, note } = req.body || {};
  if (!date) date = ymd();
  amount = Number(amount || 0);

  const keys = K(uid);

  // RL: max 10 marks/min per habit per user
  const minute = Math.floor(Date.now() / 60000);
  const rlKey = keys.rlDone(id, minute);
  const cnt = await redis.incr(rlKey);
  if (cnt === 1) await redis.expire(rlKey, 70);
  if (cnt > 10) return res.status(429).json({ error: "slow_down" });

  const hmeta = await redis.hgetall(keys.habit(id));
  if (!hmeta?.id) return res.status(404).json({ error: "not_found" });

  // Determine goal based on day of week (NEW: weekend support)
  const dateObj = new Date(date);
  const dayOfWeek = dateObj.getDay(); // 0 = Sunday, 6 = Saturday
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
  
  const goalWeekday = Number(hmeta.dailyGoal || 0);
  const goalWeekend = Number(hmeta.dailyGoalWeekend || goalWeekday);
  const goal = isWeekend ? goalWeekend : goalWeekday;
  
  const completed = goal > 0 ? amount >= goal : amount > 0;

  const logKey = keys.log(id, date);
  const amtKey = keys.amt(id, date);
  const noteKey = keys.note(id, date);

  const already = await redis.get(logKey);
  const streakKey = keys.streak(id);
  const s = await redis.hgetall(streakKey);
  const last = s.lastDoneDate || "";

  let current = Number(s.current || 0);
  let longest = Number(s.longest || 0);

  const multi = redis.multi().set(amtKey, String(amount));

  // Save note if provided (NEW)
  if (note && note.trim()) {
    multi.set(noteKey, note.trim());
  }

  // Update streak if completed and wasn't already
  if (completed && !already) {
    current = isConsecutive(last, date) ? current + 1 : 1;
    longest = Math.max(current, longest);
    multi.set(logKey, "1")
         .hset(streakKey, { 
           current: String(current), 
           longest: String(longest), 
           lastDoneDate: date 
         });
  }

  await multi.exec();
  res.json({ ok: true, date, amount, completed, current, longest, goal });
});

// ---------- Get notes for a habit (NEW) ----------
app.get("/api/habits/:id/notes", async (req, res) => {
  const uid = getUID(req);
  if (!uid) return res.status(401).json({ error: "unauthorized" });
  
  const { id } = req.params;
  const keys = K(uid);
  
  // Get last 30 days of notes
  const today = ymd();
  const dates = [];
  for (let i = 29; i >= 0; i--) {
    dates.push(addDays(today, -i));
  }
  
  const pipe = redis.pipeline();
  dates.forEach(d => pipe.get(keys.note(id, d)));
  const results = await pipe.exec();
  
  const notes = {};
  results.forEach(([err, note], i) => {
    if (note) notes[dates[i]] = note;
  });
  
  res.json({ notes });
});

// ---------- Stats (30d heatmap + success + amounts + progress %) ----------
app.get("/api/stats", async (req, res) => {
  const uid = getUID(req);
  if (!uid) return res.status(401).json({ error: "unauthorized" });
  
  const keys = K(uid);
  const ids = await redis.smembers(keys.index);
  if (!ids.length) return res.json({ stats: [] });

  // Fetch streaks + habit metas
  const p1 = redis.pipeline();
  ids.forEach(id => p1.hgetall(keys.streak(id)));
  const p2 = redis.pipeline();
  ids.forEach(id => p2.hgetall(keys.habit(id)));
  const [streakRows, habitRows] = await Promise.all([p1.exec(), p2.exec()]);
  const streaks = streakRows.map(([, v]) => v || {});
  const metas = habitRows.map(([, v]) => v || {});

  // Window dates
  const today = ymd();
  const window = [];
  for (let i = 29; i >= 0; i--) window.push(addDays(today, -i));

  // Fetch completion + amounts
  const pLogs = redis.pipeline();
  const pAmts = redis.pipeline();
  ids.forEach(id => window.forEach(d => {
    pLogs.get(keys.log(id, d));
    pAmts.get(keys.amt(id, d));
  }));
  const [logsFlat, amtsFlat] = await Promise.all([pLogs.exec(), pAmts.exec()]);
  const logs = logsFlat.map(([, v]) => (v ? 1 : 0));
  const amts = amtsFlat.map(([, v]) => Number(v || 0));

  // Build output
  const out = [];
  for (let h = 0; h < ids.length; h++) {
    const from = h * window.length;
    const to = from + window.length;
    const arrDone = logs.slice(from, to);
    const arrAmt = amts.slice(from, to);
    const done = arrDone.reduce((a, b) => a + b, 0);
    const rate = Math.round((done / window.length) * 100);

    const meta = metas[h];
    const goal = Number(meta.dailyGoal || 0);
    const totalAmt = arrAmt.reduce((a, b) => a + b, 0);
    const targetAmt = goal * window.length;
    const progressPct = goal > 0 
      ? Math.min(100, Math.round((totalAmt / targetAmt) * 100)) 
      : (totalAmt > 0 ? 100 : 0);

    out.push({
      id: ids[h],
      name: meta.name || "",
      type: meta.type || "custom",
      unit: meta.unit || "",
      dailyGoal: goal,
      current: Number(streaks[h]?.current || 0),
      longest: Number(streaks[h]?.longest || 0),
      successRate30: rate,
      progress30: { total: totalAmt, target: targetAmt, pct: progressPct },
      last30: window.map((d, i) => ({
        date: d,
        done: !!arrDone[i],
        amount: arrAmt[i]
      })),
    });
  }
  res.json({ stats: out });
});

// ---------- Export ----------
app.get("/api/export", async (req, res) => {
  const uid = getUID(req);
  if (!uid) return res.status(401).json({ error: "unauthorized" });
  
  const keys = K(uid);
  const ids = await redis.smembers(keys.index);

  const pipe = redis.pipeline();
  ids.forEach((id) => pipe.hgetall(keys.habit(id)));
  const habits = (await pipe.exec()).map(([, h]) => h).filter(Boolean);

  const format = (req.query.format || "json").toLowerCase();
  const attachment = req.query.attachment === "1";

  if (attachment) {
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="habits-${uid}.${format === "jsonl" ? "jsonl" : "json"}"`
    );
  }

  if (format === "jsonl") {
    res.setHeader("Content-Type", "application/x-ndjson; charset=utf-8");
    habits.forEach((h, i) => {
      res.write(JSON.stringify(h));
      res.write("\n");
      if (i === habits.length - 1) res.end();
    });
  } else {
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.json({ habits });
  }
});

// ---------- 404 fallback ----------
app.use("/api", (_req, res) => res.status(404).json({ error: "not_found" }));

// ---------- Start ----------
app.listen(PORT, () => {
  console.log(`✅ Habits API listening on port ${PORT}`);
  console.log(`📊 Redis: ${REDIS_URL}`);
  console.log(`🔐 Dev mode (X-User header): ${ALLOW_X_USER}`);
});
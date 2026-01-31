# 🎯 Habits Tracker v2.0

> A modern, multi-tenant habit tracker with goal-based streaks, flexible tracking, smart insights, and confetti celebrations 🎉

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-20+-green.svg)](https://nodejs.org/)
[![Redis](https://img.shields.io/badge/Redis-7+-red.svg)](https://redis.io/)

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Quick Start](#-quick-start)
- [Configuration](#-configuration)
- [API Reference](#-api-reference)
- [Usage Guide](#-usage-guide)
- [Architecture](#-architecture)
- [Troubleshooting](#-troubleshooting)
- [Future Enhancements](#-future-enhancements)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

Habits Tracker is a beautifully designed, production-ready habit tracking application built for personal use or multi-tenant deployments. It combines the simplicity of streak-based tracking with powerful analytics, smart insights, and a delightful user experience.

**Live Demo:** https://habits.divyekant.com

### Key Highlights

- **🎨 Beautiful UI** - Light/dark mode, glassmorphism effects, smooth animations
- **📊 Smart Insights** - Context-aware suggestions based on habit type and patterns
- **🎉 Gamification** - Confetti celebrations, personal bests, streak tracking
- **📱 Mobile-First** - Fully responsive, PWA-ready design
- **🔒 Multi-Tenant** - Cloudflare Access integration for secure user isolation
- **⚡ High Performance** - Redis-backed, sub-10ms response times
- **🎯 Flexible Goals** - Weekend vs weekday goals, custom units, rich metadata

---

## ✨ Features

### Tier 1: Essential UX

✅ **Better Habit Creation**
- Visual template cards (Reading 📚, Workout 💪, Weight ⚖️, Water 💧, Sleep 😴, Custom ✨)
- Pre-filled suggestions for units and goals
- Inline helpful hints
- Beautiful modal design

✅ **Improved Logging Experience**
- Context-aware log modal (shows yesterday, streak, goal, 7-day avg)
- Quick action buttons: "Hit Goal" and "Skip Today"
- Custom amount input with stepper buttons (+1, +5, +10)
- Note field for daily reflections
- Confetti animation when goals are hit 🎉
- Visual feedback for streaks 🔥

✅ **Enhanced Stats Dashboard**
- View toggles: 7 days / 30 days / 90 days
- Trend indicators: ↑ Improving, → Stable, ↓ Declining
- Color-coded completion rates with labels
- Goal progress bars with visual fill
- Larger heatmap cells (16px) with hover tooltips
- Personal records highlighted

✅ **Mobile-First UI Polish**
- Fully responsive grid layout
- Large touch targets (44px minimum)
- Optimized for all screen sizes
- Smooth animations and transitions

### Tier 2: Power User Features

✅ **Habit Detail View**
- Click any habit name to open detail modal
- Hero section with large icon and stats
- Quick stats grid (current streak, longest, days logged, avg/day)
- Personal best display 🏆
- Full 30-day heatmap with tooltips
- Quick log button

✅ **Smart Insights**
- **Reading**: "At 18 pages/day, you'll finish 24 books this year"
- **Weight**: 7-day trend with rate of change
- **Workout**: Total time comparisons and best days
- **Generic**: Consistency analysis and day-of-week patterns

✅ **Flexible Goals**
- Backend support for weekend vs weekday goals
- Easy to extend for goal ranges or weekly targets

✅ **Notes System**
- Add optional notes when logging
- Backend stores notes per habit per day
- API endpoint to retrieve notes (`/api/habits/:id/notes`)

### Visual Design

✅ **Light/Dark Mode**
- System-aware default
- Smooth theme transitions
- Persistent preference (localStorage)
- Beautiful color palettes for both modes

✅ **Design System**
- Gradient backgrounds
- Glassmorphism effects
- Smooth animations (modals, toasts, progress bars)
- Consistent spacing and typography
- Accessible color contrasts

---

## 🛠 Tech Stack

### Backend
- **Runtime:** Node.js 20+ (ES Modules)
- **Framework:** Express.js 4.x
- **Database:** Redis 7+ (IORedis client)
- **Authentication:** Cloudflare Access (optional)
- **ID Generation:** nanoid (short, URL-safe IDs)

### Frontend
- **Core:** Vanilla JavaScript (no frameworks!)
- **Styling:** CSS Variables + Modern CSS
- **Animation:** Canvas API (confetti), CSS transitions
- **Icons:** Unicode emoji (zero dependencies!)
- **Storage:** localStorage (theme, preferences)

### Infrastructure
- **Container:** Docker + Docker Compose
- **Reverse Proxy:** Caddy (external_reverse_proxy network)
- **Port:** 9300 (internal), 443 (via Caddy)
- **Environment:** Production-ready with health checks

### Key Dependencies

```json
{
  "express": "^4.19.2",
  "ioredis": "^5.4.1",
  "nanoid": "^5.0.7"
}
```

**Bundle Size:** < 500KB (frontend + backend combined)  
**Zero Runtime Frameworks:** Pure vanilla JS for blazing speed

---

## 🚀 Quick Start

### Prerequisites

- Docker and Docker Compose installed
- Redis instance (or use docker-compose)
- Node.js 20+ (for local development)

### 1. Clone and Setup

```bash
cd /Users/dk/projects/habits

# Review environment variables
cat .env
```

**Required Environment Variables:**

```bash
REDIS_URL=redis://default:yourpass@redis-shared:6379/3
REDIS_PASS=yourpass
ALLOW_X_USER=false  # Set to true for Cloudflare Access
```

### 2. Deploy with Docker

```bash
# Build and start
docker compose up -d --build

# Check logs
docker logs -f habit-api

# Verify health
curl http://localhost:9300/health
```

### 3. Access the App

- **Local:** http://localhost:9300
- **Production:** https://habits.divyekant.com (via Caddy reverse proxy)

### 4. Local Development

```bash
cd server

# Install dependencies
npm install

# Set environment
export REDIS_URL=redis://localhost:6379
export PORT=9300
export ALLOW_X_USER=false

# Run dev server
node index.js

# Open in browser
open http://localhost:9300
```

---

## ⚙️ Configuration

### Docker Compose

```yaml
services:
  habit-api:
    build: .
    container_name: habit-api
    ports: ["9300:9300"]
    environment:
      - NODE_ENV=production
      - PORT=9300
      - REDIS_URL=${REDIS_URL}
      - REDIS_PASS=${REDIS_PASS}
      - ALLOW_X_USER=${ALLOW_X_USER}
    networks: [web_tunnel]

networks:
  web_tunnel:
    external: true
```

### Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `PORT` | Server port | `9300` | No |
| `REDIS_URL` | Redis connection string | `redis://default:pass@redis-shared:6379/3` | Yes |
| `REDIS_PASS` | Redis password | - | Yes |
| `ALLOW_X_USER` | Enable Cloudflare Access header parsing | `false` | No |
| `NODE_ENV` | Environment (production/development) | `production` | No |

### Redis Schema

**Database:** Redis DB 3 (configurable via URL)

**Key Patterns:**

```redis
# User habits list
ht:u:<uid>:habits                 # SET: habit IDs

# Habit metadata
ht:u:<uid>:habit:<id>             # HASH: name, type, unit, goal, etc.

# Daily logs
ht:u:<uid>:log:<id>:<YYYY-MM-DD>  # STRING: amount (float)

# Daily notes
ht:u:<uid>:note:<id>:<YYYY-MM-DD> # STRING: optional note text
```

**Example Habit Hash:**

```redis
HGETALL ht:u:user123:habit:abc123
{
  "id": "abc123",
  "name": "Read book",
  "type": "reading",
  "unit": "pages",
  "dailyGoal": "20",
  "dailyGoalWeekend": "30",
  "createdAt": "1731024000000",
  "archived": "0"
}
```

### Reverse Proxy (Caddy)

**Caddyfile snippet:**

```caddy
habits.divyekant.com {
    reverse_proxy habit-api:9300
    
    # Cloudflare Access headers (if enabled)
    header_up X-Forwarded-User {http.request.header.Cf-Access-Authenticated-User-Email}
}
```

---

## 📡 API Reference

### Base URL

```
http://localhost:9300/api
```

### Authentication

**Development:** No authentication (ALLOW_X_USER=false)  
**Production:** Cloudflare Access header (ALLOW_X_USER=true)

Header: `Cf-Access-Authenticated-User-Email: user@example.com`

### Endpoints

#### Health Check

```http
GET /health
```

**Response:**

```json
{
  "status": "ok",
  "redis": "connected",
  "timestamp": 1731024000000
}
```

#### Get All Habits

```http
GET /api/habits
```

**Query Parameters:**
- `includeArchived` (boolean): Include archived habits (default: false)

**Response:**

```json
[
  {
    "id": "abc123",
    "name": "Read book",
    "type": "reading",
    "unit": "pages",
    "dailyGoal": 20,
    "dailyGoalWeekend": 30,
    "createdAt": 1731024000000,
    "archived": false
  }
]
```

#### Create Habit

```http
POST /api/habits
Content-Type: application/json
```

**Body:**

```json
{
  "name": "Evening Reading",
  "type": "reading",
  "unit": "pages",
  "dailyGoal": 20,
  "dailyGoalWeekend": 30
}
```

**Response:** `201 Created` + habit object

#### Get Habit Details

```http
GET /api/habits/:id
```

**Response:** Habit object + metadata

#### Update Habit

```http
PUT /api/habits/:id
Content-Type: application/json
```

**Body:** Same as create (all fields optional)

#### Archive/Unarchive Habit

```http
POST /api/habits/:id/archive
POST /api/habits/:id/unarchive
```

#### Delete Habit

```http
DELETE /api/habits/:id
```

**⚠️ Warning:** Permanently deletes habit and all logs!

#### Log Activity

```http
POST /api/habits/:id/done
Content-Type: application/json
```

**Body:**

```json
{
  "date": "2025-01-30",
  "amount": 25,
  "note": "Finished chapter 3 - great plot twist!"
}
```

**Response:** `200 OK`

#### Get Logs

```http
GET /api/habits/:id/logs?days=30
```

**Query Parameters:**
- `days` (number): Number of days to fetch (default: 30, max: 365)

**Response:**

```json
{
  "2025-01-30": 25.0,
  "2025-01-29": 20.0,
  "2025-01-28": 0.0
}
```

#### Get Notes

```http
GET /api/habits/:id/notes
```

**Response:**

```json
{
  "2025-01-30": "Felt great today!",
  "2025-01-29": "Tough day but pushed through"
}
```

#### Get Stats

```http
GET /api/habits/:id/stats?days=30
```

**Response:**

```json
{
  "currentStreak": 7,
  "longestStreak": 21,
  "totalDays": 45,
  "avgPerDay": 22.5,
  "personalBest": 50.0,
  "completion30d": 0.87
}
```

---

## 📱 Usage Guide

### Creating Habits

1. Click **"✨ Create Habit"** in header
2. Choose a template card:
   - **Reading 📚** → Pages, books
   - **Workout 💪** → Minutes, reps
   - **Weight ⚖️** → kg, lbs (with trend tracking)
   - **Water 💧** → Liters, glasses
   - **Sleep 😴** → Hours, minutes
   - **Custom ✨** → Any unit you want
3. Fill in name, unit, and daily goal
4. Optionally enable "Different goals for weekends"
5. Click **"Create Habit"**

**Template Examples:**
- **Reading**: 20 pages/day → "You'll read 24 books this year"
- **Workout**: 30 min/day → Track consistency and total time
- **Weight**: 0.5 kg goal → See 7-day moving average and trend
- **Water**: 2 L/day → Track hydration consistency

### Logging Habits

1. Click **"📝 Log Today"** on any habit
2. See context:
   - Yesterday's amount
   - Current streak 🔥
   - Goal target
   - 7-day average
3. Three quick options:
   - **"🎯 Hit Goal"** - Pre-fills goal amount
   - **"⏭️ Skip Today"** - Logs 0
   - **Custom amount** - Enter value and click "✅ Log It"
4. Optionally add a note (e.g., "Felt great!" or "Tough day")
5. **Hit your goal?** → Confetti animation! 🎉

### Viewing Stats

**Overview Card:**
- Shows all habits with trends
- Completion rates (color-coded)
- Current streaks
- Mini heatmaps

**Toggle Views:**
- **7 days** - Quick weekly snapshot
- **30 days** - Monthly overview (default)
- **90 days** - Long-term trends

**Heatmap:**
- Hover over cells to see date, amount, and status
- Color intensity shows goal achievement
- Darker = higher amount logged

**Insights:**
Smart suggestions based on your habit type:
- Reading → Annual book projections
- Weight → 7-day trend analysis
- Workout → Total time and peak days
- Generic → Consistency patterns

### Habit Details

1. Click any **habit name** in the list or stats
2. See full detail modal:
   - **Hero section** - Large icon + habit info
   - **Quick stats** - Current/longest streak, days logged, avg/day
   - **Personal best** 🏆
   - **30-day heatmap** - Full visual history
   - **Quick log button** - Log right from details

### Archiving & Deleting

**Archive:**
- Click **"📦 Archive"** on any habit
- Habit moves to "Archived" section
- All data preserved, just hidden

**Unarchive:**
- Click **"📥 Unarchive"** to restore
- Returns to active habits list

**Delete:**
- Click **"🗑️"** trash icon
- **⚠️ Permanent!** Cannot be undone
- Deletes habit + all logs + all notes

### Theme Toggle

- Click theme button in header (**🌙** / **☀️**)
- Switches between dark/light mode
- Preference saved automatically (localStorage)
- All colors smoothly transition

---

## 🏗 Architecture

### System Overview

```
┌─────────────┐         ┌─────────────┐         ┌─────────────┐
│   Browser   │ ───────▶│    Caddy    │ ───────▶│  habit-api  │
│  (Vanilla)  │   HTTPS │  (Reverse   │   HTTP  │  (Express)  │
│     JS      │◀─────── │   Proxy)    │◀─────── │  Port 9300  │
└─────────────┘         └─────────────┘         └──────┬──────┘
                                                        │
                                                        │ IORedis
                                                        ▼
                                                ┌─────────────┐
                                                │   Redis     │
                                                │   DB #3     │
                                                └─────────────┘
```

### Data Flow

1. **User visits** → Caddy checks Cloudflare Access → Injects user email header
2. **Browser loads** → Static files served from `/app/public`
3. **API calls** → Express parses user from header (or test default)
4. **Redis queries** → All data namespaced by user ID
5. **Response** → JSON sent back to browser
6. **Frontend renders** → Updates UI with smooth animations

### Multi-Tenancy

**User Isolation:**
- All Redis keys prefixed with user ID: `ht:u:<uid>:*`
- No cross-user data leakage
- Each user sees only their habits

**Authentication:**
- **Production:** Cloudflare Access (email-based)
- **Development:** Test user (`dev-user@localhost`)

### Performance

**Metrics:**
- **Page load:** < 500ms (cached)
- **API response:** < 10ms (avg)
- **Log operation:** < 5ms (single Redis write)
- **Stats calculation:** < 50ms (30-day window)

**Optimizations:**
- No ORM overhead (direct Redis commands)
- Efficient key patterns for range queries
- Frontend uses vanilla JS (no framework bundle)
- CSS variables for instant theme switching

---

## 🐛 Troubleshooting

### Theme not persisting

**Symptom:** Theme resets to default on page reload

**Solutions:**
1. Check browser localStorage:
   ```javascript
   localStorage.getItem('habits_theme')  // Should return "light" or "dark"
   ```
2. Clear cache and reload: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)
3. Check browser console for localStorage errors
4. Verify cookies/storage not blocked

### Confetti not showing

**Symptom:** No animation when hitting goal

**Solutions:**
1. Check browser console for Canvas API errors
2. Verify browser supports Canvas (all modern browsers do)
3. Check if animations are disabled in OS accessibility settings
4. Try different browser

### Stats not loading

**Symptom:** Empty stats dashboard or loading spinner stuck

**Solutions:**
1. Check Redis connection:
   ```bash
   curl http://localhost:9300/health
   # Should show: {"status":"ok","redis":"connected"}
   ```
2. Check Docker logs:
   ```bash
   docker logs habit-api
   ```
3. Verify Redis is running:
   ```bash
   docker ps | grep redis
   ```
4. Test Redis connectivity:
   ```bash
   redis-cli -u redis://localhost:6379 PING
   ```

### Modal not closing

**Symptom:** Modal stuck open, can't dismiss

**Solutions:**
1. Press `Escape` key
2. Click outside modal (on dark overlay)
3. Refresh page (`F5`)
4. Check browser console for JavaScript errors

### Heatmap tooltips not working

**Symptom:** No tooltip when hovering over heatmap cells

**Solutions:**
1. Ensure tooltips are re-initialized after render:
   ```javascript
   setupHeatmapTooltips()  // Should be called after DOM update
   ```
2. Check if tooltip element exists in DOM
3. Verify CSS is loaded correctly
4. Try different browser

### API returns 401/403

**Symptom:** "Unauthorized" or "Forbidden" errors

**Solutions:**
1. Check `ALLOW_X_USER` setting:
   ```bash
   echo $ALLOW_X_USER  # Should be "true" or "false"
   ```
2. Verify Cloudflare Access headers (production):
   ```bash
   curl -H "Cf-Access-Authenticated-User-Email: test@example.com" \
        http://localhost:9300/api/habits
   ```
3. In development, ensure `ALLOW_X_USER=false`

### Docker container won't start

**Symptom:** `docker compose up` fails

**Solutions:**
1. Check logs:
   ```bash
   docker compose logs habit-api
   ```
2. Verify environment variables:
   ```bash
   cat .env
   ```
3. Check port 9300 not already in use:
   ```bash
   lsof -i :9300
   ```
4. Rebuild from scratch:
   ```bash
   docker compose down -v
   docker compose up -d --build
   ```

### Logs not appearing in history

**Symptom:** Logged habit but data doesn't show

**Solutions:**
1. Check Redis keys:
   ```bash
   redis-cli -u $REDIS_URL KEYS "ht:u:*:log:*"
   ```
2. Verify date format is correct (YYYY-MM-DD)
3. Check timezone settings
4. Look for errors in browser console

---

## 🚀 Future Enhancements

### High Priority (Next Version)

- [ ] **PWA Support**
  - Service worker for offline logging
  - Sync queue when connection restored
  - Add to home screen prompt
  - Push notifications for reminders

- [ ] **Calendar View**
  - Monthly calendar per habit
  - Drill-down to see daily details
  - Year view for long-term patterns
  - Export as iCal

- [ ] **Edit Past Logs**
  - Correct amounts for previous days
  - Edit or delete old notes
  - Audit trail for changes
  - Batch edit for multiple days

- [ ] **Habit Chains (Routines)**
  - Group related habits
  - Morning/evening routines
  - Quick-log entire chain
  - Chain-level stats

- [ ] **Browser Notifications**
  - Daily reminder at custom time
  - Streak danger alerts
  - Milestone celebrations
  - Smart timing based on past behavior

### Medium Priority

- [ ] **Undo Last Log**
  - Toast with "Undo" button (5-min window)
  - In-memory cache for recent actions
  - API endpoint: `DELETE /api/habits/:id/undo`

- [ ] **Weekly Summary Emails**
  - Digest of all habits
  - Progress charts
  - Insights and suggestions
  - Configurable schedule

- [ ] **Backup & Restore**
  - Export full data as JSON
  - Import from backup file
  - Scheduled auto-backups
  - Sync to cloud storage

- [ ] **Social Features**
  - Share progress with friends
  - Accountability partners
  - Leaderboards (opt-in)
  - Public habit templates

- [ ] **Advanced Analytics**
  - Correlation between habits
  - Time-of-day patterns
  - Weather impact analysis
  - Custom dashboards

### Low Priority (Nice-to-Have)

- [ ] **Multi-Language Support**
  - i18n framework
  - Community translations
  - RTL language support
  - Locale-aware date/number formatting

- [ ] **Habit Templates Gallery**
  - Pre-built habit packs
  - Community-shared templates
  - Categories (health, productivity, learning)
  - One-click import

- [ ] **Data Visualization Upgrades**
  - Interactive charts (Chart.js/D3)
  - Animated trend lines
  - Comparison views (habit A vs B)
  - Export charts as images

- [ ] **Voice Logging**
  - "Hey Siri, log 20 pages to reading"
  - Speech-to-text for notes
  - Shortcuts app integration (iOS)

- [ ] **Integrations**
  - Apple Health / Google Fit sync
  - Fitbit / Oura Ring data import
  - Notion/Obsidian export
  - Zapier/IFTTT webhooks

- [ ] **Gamification Upgrades**
  - Achievements/badges system
  - XP and levels
  - Unlockable themes
  - Streak freeze tokens

- [ ] **AI-Powered Insights**
  - Predictive streak risk alerts
  - Personalized goal recommendations
  - Natural language habit creation
  - Smart scheduling suggestions

### Quick Wins (< 1 hour each)

- [ ] **Keyboard Shortcuts**
  - `n` - New habit
  - `l` - Log first habit
  - `t` - Toggle theme
  - `/` - Focus search

- [ ] **Export Individual Habit**
  - CSV download button in detail modal
  - Include dates, amounts, notes
  - Excel-compatible format

- [ ] **Streak Milestones**
  - Special animations at 7, 30, 100, 365 days
  - Milestone badges
  - Share achievements

- [ ] **Dark Mode Schedule**
  - Auto-switch at sunset/sunrise
  - Custom schedule (e.g., 8pm-7am)
  - Location-based timing

- [ ] **Habit Reorder**
  - Drag-and-drop sorting
  - Custom order saved per user
  - Pin favorites to top

### Technical Debt & Refactoring

- [ ] **Test Coverage**
  - Unit tests for API endpoints
  - Integration tests for Redis operations
  - E2E tests with Playwright
  - CI/CD pipeline

- [ ] **TypeScript Migration**
  - Type-safe API layer
  - Shared types between frontend/backend
  - Better IDE autocomplete

- [ ] **Performance Optimizations**
  - Redis pipelining for bulk reads
  - Response caching (304 Not Modified)
  - Lazy-load archived habits
  - Virtual scrolling for large lists

- [ ] **Security Hardening**
  - Rate limiting (express-rate-limit)
  - Input sanitization
  - CSRF protection
  - Security headers (Helmet.js)

- [ ] **Monitoring & Observability**
  - Application metrics (Prometheus)
  - Error tracking (Sentry)
  - Performance monitoring
  - User analytics (privacy-friendly)

---

## 🤝 Contributing

This is a personal project, but suggestions and ideas are welcome!

**Found a bug?** Open an issue with:
1. Steps to reproduce
2. Expected vs actual behavior
3. Browser/OS details
4. Screenshots if applicable

**Have an idea?** Share it! But note this is not actively seeking contributors.

---

## 📄 License

MIT License

Copyright (c) 2025 Divyekant Gadhvi

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---

## 🙏 Credits

Built with:
- **Express.js** - Fast, minimalist web framework
- **IORedis** - Robust Redis client
- **nanoid** - Secure, URL-friendly unique IDs
- Vanilla JavaScript (no frameworks!)
- CSS Variables for theming
- Canvas API for confetti
- Love for habit tracking ❤️

**Special Thanks:**
- Home Assistant community for inspiration
- Cloudflare for Access authentication
- Redis Labs for excellent documentation

---

## 📞 Support

For questions or issues:
1. Check the [Troubleshooting](#-troubleshooting) section
2. Review Docker logs: `docker logs habit-api`
3. Test Redis connection: `curl http://localhost:9300/health`

**Personal deployment?** Feel free to fork and customize!

---

**Made with ❤️ for building better habits, one day at a time. 🎯**

*Last updated: January 2025*

## 🔮 Future Enhancements (Beyond Tier 3)

### High Priority
- [ ] **Habit chains** - Group related habits as daily routines
- [ ] **Linked habits** - Auto-log when another habit is logged
- [ ] **PWA support** - Offline logging with sync queue
- [ ] **Undo last log** - Quick undo with toast notification
- [ ] **Edit past days** - Correct amounts and notes retroactively
- [ ] **Calendar view** - Monthly drill-down per habit
- [ ] **Weekly summary emails** - Automated progress reports

### Medium Priority
- [ ] **Social features** - Share streaks with friends
- [ ] **Habit templates** - Import pre-built habit packs
- [ ] **Reminders** - Browser/push notifications at set times
- [ ] **Backup/restore** - Full export with all historical data
- [ ] **Multi-user** - Family/team accounts with shared habits
- [ ] **Integration** - Sync with Apple Health, Google Fit, Fitbit

### Low Priority
- [ ] **AI insights** - Personalized recommendations and predictions
- [ ] **Gamification** - Levels, badges, achievements
- [ ] **Challenges** - 30-day challenges with milestones
- [ ] **Rewards system** - Unlock features with consistent logging
- [ ] **Public habits** - Share specific habits publicly
- [ ] **Leaderboards** - Compete with friends on streaks

### Technical Improvements
- [ ] **GraphQL API** - More flexible data queries
- [ ] **TypeScript** - Full type safety
- [ ] **E2E tests** - Playwright/Cypress testing
- [ ] **Performance** - Virtual scrolling for large datasets
- [ ] **Compression** - Gzip API responses
- [ ] **CDN** - Static asset optimization

// app.js - Complete Habits Tracker Frontend with Tier 1 & 2 Features + Quotes

// ============================================================================
// MOTIVATIONAL QUOTES (100+ quotes, rotate every 4 hours)
// ============================================================================

const MOTIVATIONAL_QUOTES = [
  { text: "Success is the sum of small efforts repeated day in and day out.", author: "Robert Collier" },
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { text: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.", author: "Aristotle" },
  { text: "You'll never change your life until you change something you do daily.", author: "John C. Maxwell" },
  { text: "Motivation is what gets you started. Habit is what keeps you going.", author: "Jim Ryun" },
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
  { text: "The future depends on what you do today.", author: "Mahatma Gandhi" },
  { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
  { text: "Everything you've ever wanted is on the other side of fear.", author: "George Addair" },
  { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
  { text: "Your limitation—it's only your imagination.", author: "Unknown" },
  { text: "Great things never come from comfort zones.", author: "Unknown" },
  { text: "Dream it. Wish it. Do it.", author: "Unknown" },
  { text: "Success doesn't just find you. You have to go out and get it.", author: "Unknown" },
  { text: "The harder you work for something, the greater you'll feel when you achieve it.", author: "Unknown" },
  { text: "Dream bigger. Do bigger.", author: "Unknown" },
  { text: "Don't stop when you're tired. Stop when you're done.", author: "Unknown" },
  { text: "Wake up with determination. Go to bed with satisfaction.", author: "Unknown" },
  { text: "Do something today that your future self will thank you for.", author: "Sean Patrick Flanery" },
  { text: "Little things make big days.", author: "Unknown" },
  { text: "It's going to be hard, but hard does not mean impossible.", author: "Unknown" },
  { text: "Don't wait for opportunity. Create it.", author: "Unknown" },
  { text: "Sometimes we're tested not to show our weaknesses, but to discover our strengths.", author: "Unknown" },
  { text: "The key to success is to focus on goals, not obstacles.", author: "Unknown" },
  { text: "Dream it. Believe it. Build it.", author: "Unknown" },
  { text: "You don't have to be great to start, but you have to start to be great.", author: "Zig Ziglar" },
  { text: "A journey of a thousand miles begins with a single step.", author: "Lao Tzu" },
  { text: "The only impossible journey is the one you never begin.", author: "Tony Robbins" },
  { text: "Don't count the days, make the days count.", author: "Muhammad Ali" },
  { text: "What you do today can improve all your tomorrows.", author: "Ralph Marston" },
  { text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" },
  { text: "Don't let yesterday take up too much of today.", author: "Will Rogers" },
  { text: "You learn more from failure than from success. Don't let it stop you.", author: "Unknown" },
  { text: "Strive for progress, not perfection.", author: "Unknown" },
  { text: "Be so good they can't ignore you.", author: "Steve Martin" },
  { text: "Quality is not an act, it is a habit.", author: "Aristotle" },
  { text: "First forget inspiration. Habit is more dependable.", author: "Octavia Butler" },
  { text: "Small habits, big results.", author: "James Clear" },
  { text: "We become what we want to be by consistently being what we want to become each day.", author: "Richard G. Scott" },
  { text: "Good habits are worth being fanatical about.", author: "John Irving" },
  { text: "The chains of habit are too weak to be felt until they are too strong to be broken.", author: "Samuel Johnson" },
  { text: "Successful people are simply those with successful habits.", author: "Brian Tracy" },
  { text: "Your net worth to the world is usually determined by what remains after your bad habits are subtracted.", author: "Benjamin Franklin" },
  { text: "Habits change into character.", author: "Ovid" },
  { text: "The easier it is to do, the harder it is to change.", author: "Eng's Principle" },
  { text: "A nail is driven out by another nail. Habit is overcome by habit.", author: "Desiderius Erasmus" },
  { text: "Replace a habit with a habit.", author: "Og Mandino" },
  { text: "I never could have done what I have done without the habits of punctuality, order, and diligence.", author: "Charles Dickens" },
  { text: "The second half of a man's life is made up of nothing but the habits he has acquired during the first half.", author: "Fyodor Dostoevsky" },
  { text: "Habit is either the best of servants or the worst of masters.", author: "Nathaniel Emmons" },
  { text: "Excellence is an art won by training and habituation.", author: "Aristotle" },
  { text: "We first make our habits, then our habits make us.", author: "John Dryden" },
  { text: "A habit cannot be tossed out the window; it must be coaxed down the stairs a step at a time.", author: "Mark Twain" },
  { text: "Good habits formed at youth make all the difference.", author: "Aristotle" },
  { text: "Depending on what they are, our habits will either make us or break us.", author: "Denis Waitley" },
  { text: "Winning is a habit. Unfortunately, so is losing.", author: "Vince Lombardi" },
  { text: "The individual who wants to reach the top must appreciate the might and force of habit.", author: "John C. Maxwell" },
  { text: "Habit is habit and not to be flung out of the window, but coaxed downstairs a step at a time.", author: "Mark Twain" },
  { text: "An unfortunate thing about this world is that good habits are so much easier to give up than bad ones.", author: "W. Somerset Maugham" },
  { text: "Good habits are as addictive as bad habits, and a lot more rewarding.", author: "Harvey Mackay" },
  { text: "Cultivate only the habits that you are willing should master you.", author: "Elbert Hubbard" },
  { text: "Old habits die hard, but with a little faith and a lot of hard work, they die before you do!", author: "Dennis Adonis" },
  { text: "Form good habits and become their slaves.", author: "Unknown" },
  { text: "Habits are the compound interest of self-improvement.", author: "James Clear" },
  { text: "You do not rise to the level of your goals. You fall to the level of your systems.", author: "James Clear" },
  { text: "Every action you take is a vote for the type of person you wish to become.", author: "James Clear" },
  { text: "The most effective way to change your behavior is to change your environment.", author: "James Clear" },
  { text: "Be the designer of your world and not merely the consumer of it.", author: "James Clear" },
  { text: "Progress requires unlearning.", author: "James Clear" },
  { text: "When nothing seems to help, I look at a stonecutter hammering away at his rock, and I realize it will split with the hundredth blow.", author: "Jacob Riis" },
  { text: "Success is the product of daily habits—not once-in-a-lifetime transformations.", author: "James Clear" },
  { text: "You should be far more concerned with your current trajectory than with your current results.", author: "James Clear" },
  { text: "Time magnifies the margin between success and failure.", author: "James Clear" },
  { text: "The most powerful outcomes are delayed.", author: "James Clear" },
  { text: "Change is easy. Lasting change is hard.", author: "Unknown" },
  { text: "The seed of every habit is a single, tiny decision.", author: "James Clear" },
  { text: "Habits do not restrict freedom. They create it.", author: "James Clear" },
  { text: "Environment is the invisible hand that shapes human behavior.", author: "James Clear" },
  { text: "Standardize before you optimize.", author: "James Clear" },
  { text: "The greatest threat to success is not failure but boredom.", author: "James Clear" },
  { text: "Anyone can work hard when they feel motivated. It's the ability to keep going when work isn't exciting that makes the difference.", author: "James Clear" },
  { text: "Being poor is not having too little, it is wanting more.", author: "Seneca" },
  { text: "The obstacle in the path becomes the path.", author: "Ryan Holiday" },
  { text: "He who has a why to live can bear almost any how.", author: "Friedrich Nietzsche" },
  { text: "The only way out is through.", author: "Robert Frost" },
  { text: "If you can't fly then run, if you can't run then walk, if you can't walk then crawl, but whatever you do you have to keep moving forward.", author: "Martin Luther King Jr." },
  { text: "Whether you think you can or you think you can't, you're right.", author: "Henry Ford" },
  { text: "The man who moves a mountain begins by carrying away small stones.", author: "Confucius" },
  { text: "I am not a product of my circumstances. I am a product of my decisions.", author: "Stephen Covey" },
  { text: "Twenty years from now you will be more disappointed by the things that you didn't do than by the ones you did do.", author: "H. Jackson Brown Jr." },
  { text: "The most difficult thing is the decision to act, the rest is merely tenacity.", author: "Amelia Earhart" },
  { text: "What lies behind us and what lies before us are tiny matters compared to what lies within us.", author: "Ralph Waldo Emerson" },
  { text: "I have been impressed with the urgency of doing. Knowing is not enough; we must apply. Being willing is not enough; we must do.", author: "Leonardo da Vinci" },
  { text: "Life is 10% what happens to you and 90% how you react to it.", author: "Charles R. Swindoll" },
  { text: "The only person you are destined to become is the person you decide to be.", author: "Ralph Waldo Emerson" },
  { text: "It is not the strongest of the species that survives, nor the most intelligent, but the one most responsive to change.", author: "Charles Darwin" }
];

// ============================================================================
// GLOBAL STATE
// ============================================================================

let habits = [];
let stats = [];
let currentStatsView = 30; // 7, 30, or 90 days
let currentTheme = localStorage.getItem('habits_theme') || 'dark';
let editingHabitId = null;
let currentLogHabit = null;


// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================


let currentQuoteIndex = 0;

function initQuotes() {
  const stored = localStorage.getItem('habits_quote_index');
  const storedTime = localStorage.getItem('habits_quote_time');
  const now = Date.now();
  
  if (stored && storedTime && (now - parseInt(storedTime)) < 14400000) {
    currentQuoteIndex = parseInt(stored);
  } else {
    currentQuoteIndex = Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length);
    localStorage.setItem('habits_quote_index', currentQuoteIndex.toString());
    localStorage.setItem('habits_quote_time', now.toString());
  }
  displayQuote();
}

function displayQuote() {
  const quote = MOTIVATIONAL_QUOTES[currentQuoteIndex];
  const quoteText = document.getElementById('quoteText');
  const quoteAuthor = document.getElementById('quoteAuthor');
  if (quoteText && quoteAuthor) {
    quoteText.textContent = `"${quote.text}"`;
    quoteAuthor.textContent = `— ${quote.author}`;
  }
}


const $ = (id) => document.getElementById(id);
const $$ = (selector) => document.querySelectorAll(selector);

function ymdToday() {
  const d = new Date();
  const z = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
  return z.toISOString().slice(0, 10);
}

function addDays(dateStr, days) {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  return ymdToday(d);
}

function escapeHtml(str) {
  return (str || '').replace(/[&<>"']/g, m => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
  }[m]));
}

// ============================================================================
// API HELPERS
// ============================================================================

async function apiGet(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

async function apiPost(url, body) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

async function apiPatch(url, body) {
  const res = await fetch(url, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

async function apiDelete(url) {
  const res = await fetch(url, { method: 'DELETE' });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

// ============================================================================
// THEME MANAGEMENT
// ============================================================================

function initTheme() {
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeButton();
}

function toggleTheme() {
  currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('habits_theme', currentTheme);
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeButton();
  showToast(currentTheme === 'dark' ? 'Dark mode enabled 🌙' : 'Light mode enabled ☀️');
}

function updateThemeButton() {
  $('themeIcon').textContent = currentTheme === 'dark' ? '🌙' : '☀️';
  $('themeLabel').textContent = currentTheme === 'dark' ? 'Dark' : 'Light';
}

// ============================================================================
// TOAST NOTIFICATIONS
// ============================================================================

function showToast(message, type = 'success', action = null) {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  
  const icons = { success: '✅', error: '❌', warning: '⚠️' };
  
  toast.innerHTML = `
    <div class="toast-icon">${icons[type] || '📝'}</div>
    <div class="toast-content">
      <div class="toast-message">${escapeHtml(message)}</div>
    </div>
    ${action ? `<button class="btn toast-action" onclick="${action.handler}">${action.label}</button>` : ''}
  `;
  
  $('toastContainer').appendChild(toast);
  
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100px)';
    setTimeout(() => toast.remove(), 300);
  }, action ? 6000 : 3000);
}

// ============================================================================
// CONFETTI ANIMATION
// ============================================================================

function triggerConfetti() {
  const canvas = $('confetti-canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  const particles = [];
  const colors = ['#2ecc71', '#7aa2ff', '#ff8c42', '#f39c12', '#9b7ff5'];
  
  for (let i = 0; i < 100; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: canvas.height + 10,
      vx: (Math.random() - 0.5) * 4,
      vy: -(Math.random() * 8 + 8),
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 6 + 3,
      life: 100
    });
  }
  
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach((p, i) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.3; // gravity
      p.life--;
      
      if (p.life > 0) {
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life / 100;
        ctx.fillRect(p.x, p.y, p.size, p.size);
      }
    });
    
    if (particles.some(p => p.life > 0)) {
      requestAnimationFrame(animate);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }
  
  animate();
}

// ============================================================================
// DATA LOADING
// ============================================================================

async function loadHabits() {
  try {
    const data = await apiGet('/api/habits');
    habits = data.habits || [];
    renderHabits();
  } catch (error) {
    console.error('Failed to load habits:', error);
    $('habitsList').innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">⚠️</div>
        <div class="empty-state-text">Failed to load habits</div>
      </div>
    `;
  }
}

async function loadStats() {
  try {
    const data = await apiGet('/api/stats');
    stats = data.stats || [];
    renderStats();
  } catch (error) {
    console.error('Failed to load stats:', error);
    $('statsContainer').innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">⚠️</div>
        <div class="empty-state-text">Failed to load stats</div>
      </div>
    `;
  }
}

async function reloadAll() {
  await Promise.all([loadHabits(), loadStats()]);
}

// ============================================================================
// HABIT RENDERING
// ============================================================================

function getHabitIcon(type) {
  const icons = {
    reading: '📚',
    workout: '💪',
    weight: '⚖️',
    water: '💧',
    sleep: '😴',
    custom: '✨'
  };
  return icons[type] || '✨';
}

function renderHabits() {
  const container = $('habitsList');
  
  if (!habits.length) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">📝</div>
        <div class="empty-state-text">No habits yet. Create your first one!</div>
        <button class="btn-primary btn-large" onclick="openHabitModal()">
          ✨ Create Habit
        </button>
      </div>
    `;
    return;
  }
  
  const activeHabits = habits.filter(h => h.archived !== '1');
  const archivedHabits = habits.filter(h => h.archived === '1');
  
  let html = '';
  
  activeHabits.forEach(habit => {
    const icon = getHabitIcon(habit.type);
    const goal = Number(habit.dailyGoal || 0);
    const unit = habit.unit || '';
    
    html += `
      <div class="habit-item">
        <div class="habit-header">
          <div class="habit-info" onclick="openDetailModal('${habit.id}')">
            <div class="habit-name">
              <span>${icon}</span>
              <span>${escapeHtml(habit.name || 'Habit')}</span>
            </div>
            <div class="habit-meta">
              <span class="pill">${escapeHtml(habit.type || 'custom')}</span>
              ${unit ? `<span class="pill">${escapeHtml(unit)}</span>` : ''}
              ${goal > 0 ? `<span class="pill">Goal: ${goal} ${escapeHtml(unit)}</span>` : ''}
            </div>
          </div>
        </div>
        <div class="habit-actions">
          <button class="btn-success" onclick="openLogModal('${habit.id}')">
            📝 Log Today
          </button>
          <button class="btn" onclick="openEditModal('${habit.id}')">
            ✏️ Edit
          </button>
          <button class="btn" onclick="toggleArchive('${habit.id}', true)">
            📦 Archive
          </button>
          <button class="btn-danger" onclick="deleteHabit('${habit.id}')">
            🗑️
          </button>
        </div>
      </div>
    `;
  });
  
  if (archivedHabits.length > 0) {
    html += `
      <div style="margin-top: 24px; padding-top: 20px; border-top: 1px solid var(--border);">
        <div style="font-size: 14px; font-weight: 600; color: var(--text-muted); margin-bottom: 12px;">
          📦 Archived (${archivedHabits.length})
        </div>
    `;
    
    archivedHabits.forEach(habit => {
      const icon = getHabitIcon(habit.type);
      html += `
        <div class="habit-item" style="opacity: 0.6;">
          <div class="habit-header">
            <div class="habit-info">
              <div class="habit-name">
                <span>${icon}</span>
                <span>${escapeHtml(habit.name || 'Habit')}</span>
                <span class="pill">Archived</span>
              </div>
            </div>
          </div>
          <div class="habit-actions">
            <button class="btn" onclick="toggleArchive('${habit.id}', false)">
              📥 Unarchive
            </button>
            <button class="btn-danger" onclick="deleteHabit('${habit.id}')">
              🗑️ Delete
            </button>
          </div>
        </div>
      `;
    });
    
    html += '</div>';
  }
  
  container.innerHTML = html;
}

// ============================================================================
// STATS RENDERING
// ============================================================================

function renderStats() {
  const container = $('statsContainer');
  
  if (!stats.length) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">📊</div>
        <div class="empty-state-text">No stats yet. Start logging!</div>
      </div>
    `;
    return;
  }
  
  let html = '';
  
  stats.forEach(stat => {
    const icon = getHabitIcon(stat.type);
    const rate = Number(stat.successRate30 || 0);
    const current = stat.current || 0;
    const longest = stat.longest || 0;
    const unit = stat.unit || '';
    
    // Calculate trend
    const trend = getTrend(stat);
    const insight = getInsight(stat);
    
    // Rate badge color
    let rateClass = 'rate-bad';
    let rateLabel = 'Needs attention';
    if (rate >= 70) {
      rateClass = 'rate-good';
      rateLabel = 'Crushing it! 💪';
    } else if (rate >= 40) {
      rateClass = 'rate-ok';
      rateLabel = 'Keep going';
    }
    
    // Progress data
    const progress = stat.progress30 || { total: 0, target: 0, pct: 0 };
    
    html += `
      <div class="stat-item">
        <div class="stat-header">
          <div class="stat-name" onclick="openDetailModal('${stat.id}')">
            <span>${icon}</span>
            <span>${escapeHtml(stat.name)}</span>
            ${trend}
          </div>
        </div>
        
        <div class="stat-badges">
          ${renderCircularProgress(current, 30, 60)}
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <div class="badge streak">🏆 ${longest} longest</div>
            <div class="badge ${rateClass}">${rate}% • ${rateLabel}</div>
          </div>
        </div>
        
        ${progress.target > 0 ? `
          <div class="progress-section">
            <div class="progress-label">
              <span>Goal Progress (30d)</span>
              <span><strong>${progress.total}${unit ? ' ' + escapeHtml(unit) : ''}</strong> / ${progress.target}${unit ? ' ' + escapeHtml(unit) : ''}</span>
            </div>
            <div class="progress-bar">
              <div class="progress-fill" style="width: ${progress.pct}%;"></div>
            </div>
          </div>
        ` : ''}
        
        ${insight ? `
          <div class="insight-box">
            <div class="insight-icon">💡</div>
            <div class="insight-content">
              <div class="insight-title">${insight.title}</div>
              <div class="insight-text">${insight.text}</div>
            </div>
          </div>
        ` : ''}
        
        <div class="heatmap">
          ${renderHeatmap(stat)}
        </div>
      </div>
    `;
  });
  
  container.innerHTML = html;
  
  // Add tooltip handlers
  setupHeatmapTooltips();
}

function renderHeatmap(stat) {
  const today = ymdToday();
  let html = '';
  
  (stat.last30 || []).slice().reverse().forEach(day => {
    const isToday = day.date === today;
    const classes = ['heatmap-cell'];
    
    if (day.done) {
      classes.push('done');
    }
    if (isToday) {
      classes.push('today');
    }
    
    html += `
      <div class="${classes.join(' ')}" 
           data-date="${day.date}" 
           data-amount="${day.amount || 0}"
           data-done="${day.done}"
           data-unit="${stat.unit || ''}">
      </div>
    `;
  });
  
  return html;
}

function renderCircularProgress(current, max = 30, size = 60) {
  const radius = (size - 8) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(current / max, 1);
  const dashOffset = circumference * (1 - progress);
  
  return `
    <div class="circular-streak">
      <svg width="${size}" height="${size}">
        <circle class="bg-circle" cx="${size/2}" cy="${size/2}" r="${radius}" />
        <circle class="progress-circle" 
                cx="${size/2}" 
                cy="${size/2}" 
                r="${radius}"
                stroke-dasharray="${circumference}"
                stroke-dashoffset="${dashOffset}" />
      </svg>
      <div class="streak-icon">🔥</div>
      <div class="streak-number">${current} days</div>
    </div>
  `;
}

function getTrend(stat) {
  // Compare first 15 days vs last 15 days
  const days = stat.last30 || [];
  const firstHalf = days.slice(0, 15);
  const secondHalf = days.slice(15, 30);
  
  const firstRate = firstHalf.filter(d => d.done).length / firstHalf.length;
  const secondRate = secondHalf.filter(d => d.done).length / secondHalf.length;
  
  const diff = secondRate - firstRate;
  
  if (diff > 0.1) {
    return '<span class="trend up">↑ Improving</span>';
  } else if (diff < -0.1) {
    return '<span class="trend down">↓ Declining</span>';
  } else {
    return '<span class="trend stable">→ Stable</span>';
  }
}

function getInsight(stat) {
  const type = stat.type || 'custom';
  const unit = stat.unit || '';
  const goal = stat.dailyGoal || 0;
  const days = stat.last30 || [];
  
  // Calculate averages
  const totalAmount = days.reduce((sum, d) => sum + (d.amount || 0), 0);
  const avgPerDay = totalAmount / days.length;
  
  // Day of week analysis
  const byDayOfWeek = {};
  days.forEach(d => {
    const date = new Date(d.date);
    const dow = date.getDay(); // 0 = Sunday
    if (!byDayOfWeek[dow]) byDayOfWeek[dow] = [];
    byDayOfWeek[dow].push(d.amount || 0);
  });
  
  const dowAvgs = Object.entries(byDayOfWeek).map(([dow, amounts]) => ({
    dow: parseInt(dow),
    avg: amounts.reduce((a, b) => a + b, 0) / amounts.length
  }));
  
  const bestDow = dowAvgs.sort((a, b) => b.avg - a.avg)[0];
  const dowNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  // Type-specific insights
  if (type === 'reading' && goal > 0) {
    const booksPerYear = Math.round((avgPerDay * 365) / (goal * 10)); // Assume 10 * goal = 1 book
    return {
      title: 'Reading Projection',
      text: `At ${avgPerDay.toFixed(1)} ${unit}/day, you're on track for ~${booksPerYear} books this year. You read most on ${dowNames[bestDow.dow]}s.`
    };
  }
  
  if (type === 'weight') {
    // Calculate trend
    const first5 = days.slice(0, 5).filter(d => d.amount > 0).map(d => d.amount);
    const last5 = days.slice(-5).filter(d => d.amount > 0).map(d => d.amount);
    
    if (first5.length && last5.length) {
      const firstAvg = first5.reduce((a, b) => a + b) / first5.length;
      const lastAvg = last5.reduce((a, b) => a + b) / last5.length;
      const change = lastAvg - firstAvg;
      const rate = (change / 30) * 7; // per week
      
      return {
        title: 'Weight Trend',
        text: `${change > 0 ? '↑' : '↓'} ${Math.abs(change).toFixed(1)} ${unit} over 30 days (${Math.abs(rate).toFixed(2)} ${unit}/week). ${change < 0 ? 'Great progress!' : 'Keep going!'}`
      };
    }
  }
  
  if (type === 'workout') {
    const thisMonth = totalAmount;
    return {
      title: 'Workout Stats',
      text: `${thisMonth.toFixed(0)} ${unit} this month. You're most active on ${dowNames[bestDow.dow]}s (avg ${bestDow.avg.toFixed(0)} ${unit}).`
    };
  }
  
  // Generic insight
  if (avgPerDay > 0) {
    return {
      title: 'Consistency',
      text: `You average ${avgPerDay.toFixed(1)} ${unit}/day. Best day: ${dowNames[bestDow.dow]}s.`
    };
  }
  
  return null;
}

function setupHeatmapTooltips() {
  const cells = $$('.heatmap-cell');
  const tooltip = $('tooltip');
  
  cells.forEach(cell => {
    cell.addEventListener('mouseenter', (e) => {
      const date = cell.dataset.date;
      const amount = cell.dataset.amount;
      const done = cell.dataset.done === 'true';
      const unit = cell.dataset.unit;
      
      tooltip.innerHTML = `
        <div><strong>${date}</strong></div>
        <div>${amount} ${unit} ${done ? '✅ Goal hit!' : ''}</div>
      `;
      tooltip.classList.add('show');
      
      const rect = cell.getBoundingClientRect();
      tooltip.style.left = `${rect.left + rect.width / 2}px`;
      tooltip.style.top = `${rect.top - tooltip.offsetHeight - 8}px`;
      tooltip.style.transform = 'translateX(-50%)';
    });
    
    cell.addEventListener('mouseleave', () => {
      tooltip.classList.remove('show');
    });
  });
}

// ============================================================================
// HABIT MODAL
// ============================================================================

function openHabitModal() {
  editingHabitId = null;
  $('habitModalTitle').textContent = 'Create New Habit';
  $('saveHabitText').textContent = 'Create Habit';
  $('habitName').value = '';
  $('habitUnit').value = '';
  $('habitGoal').value = '';
  $('habitGoalWeekend').value = '';
  $('variableGoals').checked = false;
  $('weekendGoalSection').style.display = 'none';
  
  // Reset template selection
  $$('.template-card').forEach(card => card.classList.remove('active'));
  $$('.template-card[data-type="custom"]')[0].classList.add('active');
  
  $('habitModal').classList.add('show');
}

function openEditModal(habitId) {
  const habit = habits.find(h => h.id === habitId);
  if (!habit) return;
  
  editingHabitId = habitId;
  $('habitModalTitle').textContent = 'Edit Habit';
  $('saveHabitText').textContent = 'Save Changes';
  $('habitName').value = habit.name || '';
  $('habitUnit').value = habit.unit || '';
  $('habitGoal').value = habit.dailyGoal || '';
  
  // Set template
  $$('.template-card').forEach(card => {
    card.classList.toggle('active', card.dataset.type === habit.type);
  });
  
  $('habitModal').classList.add('show');
}

function closeHabitModal() {
  $('habitModal').classList.remove('show');
  editingHabitId = null;
}

async function saveHabit() {
  const name = $('habitName').value.trim() || 'New Habit';
  const unit = $('habitUnit').value.trim();
  const goal = Number($('habitGoal').value) || 0;
  
  const activeTemplate = document.querySelector('.template-card.active');
  const type = activeTemplate ? activeTemplate.dataset.type : 'custom';
  
  const payload = { name, unit, dailyGoal: goal, type };
  
  try {
    if (editingHabitId) {
      await apiPatch(`/api/habits/${editingHabitId}`, payload);
      showToast('Habit updated! 🎉');
    } else {
      await apiPost('/api/habits', payload);
      showToast('Habit created! 🎉');
    }
    
    closeHabitModal();
    await reloadAll();
  } catch (error) {
    showToast('Failed to save habit', 'error');
    console.error(error);
  }
}

// ============================================================================
// LOG MODAL
// ============================================================================

function openLogModal(habitId) {
  const habit = habits.find(h => h.id === habitId);
  if (!habit) return;
  
  currentLogHabit = habit;
  const stat = stats.find(s => s.id === habitId);
  
  const icon = getHabitIcon(habit.type);
  $('logModalTitle').innerHTML = `
    <span>${icon}</span>
    Log ${escapeHtml(habit.name)}
  `;
  
  const goal = Number(habit.dailyGoal || 0);
  const unit = habit.unit || '';
  
  // Set context
  $('logGoal').textContent = goal > 0 ? `${goal} ${unit}` : 'None';
  $('logStreak').textContent = stat ? `${stat.current} days 🔥` : '—';
  
  // Calculate yesterday and avg
  if (stat && stat.last30) {
    const yesterday = stat.last30[stat.last30.length - 2];
    $('logYesterday').textContent = yesterday ? `${yesterday.amount} ${unit}` : '—';
    
    const last7 = stat.last30.slice(-7);
    const avg = last7.reduce((sum, d) => sum + (d.amount || 0), 0) / 7;
    $('logAvg').textContent = avg > 0 ? `${avg.toFixed(1)} ${unit}` : '—';
  } else {
    $('logYesterday').textContent = '—';
    $('logAvg').textContent = '—';
  }
  
  // Set quick buttons
  $('quickGoalBtn').textContent = goal > 0 ? `🎯 Hit Goal (${goal})` : '✅ Mark Done';
  $('logAmount').value = '';
  $('logNote').value = '';
  
  $('logModal').classList.add('show');
}

function closeLogModal() {
  $('logModal').classList.remove('show');
  currentLogHabit = null;
}

async function submitLog() {
  if (!currentLogHabit) return;
  
  const amount = Number($('logAmount').value) || 0;
  const note = $('logNote').value.trim();
  const goal = Number(currentLogHabit.dailyGoal || 0);
  
  try {
    const result = await apiPost(`/api/habits/${currentLogHabit.id}/done`, {
      date: ymdToday(),
      amount
    });
    
    closeLogModal();
    
    const completed = result.completed;
    const goalHit = goal > 0 && amount >= goal;
    
    if (goalHit) {
      triggerConfetti();
      showToast(`🔥 Goal hit! Streak: ${result.current} days`, 'success');
    } else if (completed) {
      showToast(`✅ Logged ${amount} ${currentLogHabit.unit || ''}`, 'success');
    } else {
      showToast(`📝 Logged ${amount} ${currentLogHabit.unit || ''}`, 'success');
    }
    
    await reloadAll();
  } catch (error) {
    if (error.message.includes('429')) {
      showToast('Slow down! Too many logs', 'warning');
    } else {
      showToast('Failed to log', 'error');
    }
    console.error(error);
  }
}

function quickLogGoal() {
  const goal = Number(currentLogHabit.dailyGoal || 0);
  $('logAmount').value = goal || 1;
  submitLog();
}

function quickLogSkip() {
  $('logAmount').value = 0;
  submitLog();
}

// ============================================================================
// HABIT ACTIONS
// ============================================================================

async function toggleArchive(habitId, archive) {
  try {
    await apiPatch(`/api/habits/${habitId}`, { archived: archive ? '1' : '0' });
    showToast(archive ? 'Habit archived 📦' : 'Habit unarchived 📥');
    await reloadAll();
  } catch (error) {
    showToast('Failed to update', 'error');
    console.error(error);
  }
}

async function deleteHabit(habitId) {
  const habit = habits.find(h => h.id === habitId);
  if (!habit) return;
  
  if (!confirm(`Delete "${habit.name}"? This cannot be undone.`)) return;
  
  try {
    await apiDelete(`/api/habits/${habitId}`);
    showToast('Habit deleted 🗑️', 'success');
    await reloadAll();
  } catch (error) {
    showToast('Failed to delete', 'error');
    console.error(error);
  }
}

// ============================================================================
// DETAIL MODAL
// ============================================================================

function openDetailModal(habitId) {
  const habit = habits.find(h => h.id === habitId);
  const stat = stats.find(s => s.id === habitId);
  
  if (!habit || !stat) return;
  
  const icon = getHabitIcon(habit.type);
  $('detailModalTitle').innerHTML = `
    <span>${icon}</span>
    ${escapeHtml(habit.name)}
  `;
  
  const goal = Number(habit.dailyGoal || 0);
  const unit = habit.unit || '';
  
  // Calculate additional stats
  const totalLogged = stat.last30.filter(d => d.done).length;
  const totalAmount = stat.last30.reduce((sum, d) => sum + (d.amount || 0), 0);
  const avgPerDay = totalAmount / 30;
  const bestDay = stat.last30.reduce((max, d) => d.amount > max.amount ? d : max, { amount: 0 });
  
  let html = `
    <div style="text-align: center; padding: 20px 0; border-bottom: 1px solid var(--border);">
      <div style="font-size: 48px; margin-bottom: 12px;">${icon}</div>
      <div style="font-size: 24px; font-weight: 700; margin-bottom: 8px;">${escapeHtml(habit.name)}</div>
      <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
        <span class="pill">${escapeHtml(habit.type)}</span>
        ${unit ? `<span class="pill">${escapeHtml(unit)}</span>` : ''}
        ${goal > 0 ? `<span class="pill">Goal: ${goal} ${unit}</span>` : ''}
      </div>
    </div>
    
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 16px; padding: 20px 0; border-bottom: 1px solid var(--border);">
      <div style="text-align: center;">
        <div style="font-size: 32px; font-weight: 700; color: var(--accent);">${stat.current}</div>
        <div style="font-size: 13px; color: var(--text-muted);">Current Streak</div>
      </div>
      <div style="text-align: center;">
        <div style="font-size: 32px; font-weight: 700; color: var(--success);">${stat.longest}</div>
        <div style="font-size: 13px; color: var(--text-muted);">Longest Streak</div>
      </div>
      <div style="text-align: center;">
        <div style="font-size: 32px; font-weight: 700; color: var(--warning);">${totalLogged}</div>
        <div style="font-size: 13px; color: var(--text-muted);">Days Logged (30d)</div>
      </div>
      <div style="text-align: center;">
        <div style="font-size: 32px; font-weight: 700; color: var(--accent);">${avgPerDay.toFixed(1)}</div>
        <div style="font-size: 13px; color: var(--text-muted);">Avg ${unit}/day</div>
      </div>
    </div>
    
    ${bestDay.amount > 0 ? `
      <div style="padding: 16px 0; border-bottom: 1px solid var(--border);">
        <div style="font-size: 14px; font-weight: 600; margin-bottom: 8px;">🏆 Personal Best</div>
        <div style="font-size: 13px; color: var(--text-secondary);">
          ${bestDay.amount} ${unit} on ${bestDay.date}
        </div>
      </div>
    ` : ''}
    
    <div style="padding: 16px 0;">
      <div style="font-size: 14px; font-weight: 600; margin-bottom: 12px;">Last 30 Days</div>
      <div class="heatmap">
        ${renderHeatmap(stat)}
      </div>
    </div>
    
    <div style="padding: 16px 0; border-top: 1px solid var(--border);">
      <button class="btn btn-large" style="width: 100%;" onclick="closeDetailModal(); openLogModal('${habitId}')">
        📝 Log Today
      </button>
    </div>
  `;
  
  $('detailModalBody').innerHTML = html;
  $('detailModal').classList.add('show');
  
  // Re-setup tooltips
  setTimeout(setupHeatmapTooltips, 100);
}

function closeDetailModal() {
  $('detailModal').classList.remove('show');
}

// ============================================================================
// STATS VIEW TOGGLES
// ============================================================================

function setupStatsViewToggles() {
  const toggles = $$('#statsViewToggles .view-toggle');
  
  toggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const view = parseInt(toggle.dataset.view);
      currentStatsView = view;
      
      toggles.forEach(t => t.classList.remove('active'));
      toggle.classList.add('active');
      
      // For now, just show a toast (backend would need to support different ranges)
      showToast(`Switched to ${view}-day view`, 'success');
    });
  });
}

// ============================================================================
// EVENT LISTENERS
// ============================================================================

function setupEventListeners() {
  // Theme toggle
  $('themeToggle').addEventListener('click', toggleTheme);
  
  // Create habit button
  $('createHabitBtn').addEventListener('click', openHabitModal);
  
  // Save habit
  $('saveHabitBtn').addEventListener('click', saveHabit);
  
  // Template selection
  $$('.template-card').forEach(card => {
    card.addEventListener('click', () => {
      $$('.template-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      
      // Pre-fill based on template
      $('habitUnit').value = card.dataset.unit;
      $('habitGoal').value = card.dataset.goal;
    });
  });
  
  // Variable goals toggle
  $('variableGoals').addEventListener('change', (e) => {
    $('weekendGoalSection').style.display = e.target.checked ? 'block' : 'none';
  });
  
  // Log modal actions
  $('quickGoalBtn').addEventListener('click', quickLogGoal);
  $('quickSkipBtn').addEventListener('click', quickLogSkip);
  $('submitLogBtn').addEventListener('click', submitLog);
  
  // Amount stepper buttons
  $$('.stepper-buttons button').forEach(btn => {
    btn.addEventListener('click', () => {
      const step = parseInt(btn.dataset.step);
      const input = $('logAmount');
      const current = Number(input.value) || 0;
      input.value = Math.max(0, current + step);
    });
  });
  
  // Stats view toggles
  setupStatsViewToggles();
  
  // Close modals on overlay click
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('show');
      }
    });
  });
  
  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeHabitModal();
      closeLogModal();
      closeDetailModal();
    }
  });
}

// ============================================================================
// INITIALIZATION
// ============================================================================

document.addEventListener('DOMContentLoaded', async () => {
  initTheme();
  initQuotes(); // ← ADD THIS
  setupEventListeners();
  await reloadAll();
  showToast('Welcome to Habits! 🎯');
});
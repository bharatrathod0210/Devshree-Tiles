require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const seedDatabase = require('./seed/seedData');
const Admin = require('./models/Admin');

const app = express();

// ── CORS ──────────────────────────────────────────────────────────────────────
const allowedOrigins = [
  'http://localhost:5173',
  'https://devshree-tiles.vercel.app',
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(cors({
  origin: (origin, cb) => {
    // allow requests with no origin (mobile apps, curl, etc.)
    if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
    cb(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ── DB + seed (cached across Vercel serverless invocations) ──────────────────
let isReady = false;
const init = async () => {
  if (isReady) return;
  await connectDB();
  await seedDatabase();
  const adminCount = await Admin.countDocuments();
  if (adminCount === 0) {
    await Admin.create({
      name: 'Admin',
      email: process.env.ADMIN_EMAIL || 'admin@devshreetiles.com',
      password: process.env.ADMIN_PASSWORD || 'Admin@123',
    });
    console.log('✅ Default admin created');
  }
  isReady = true;
};

// Run init before every request
app.use(async (_req, _res, next) => {
  try { await init(); next(); }
  catch (err) { next(err); }
});

// ── Routes ────────────────────────────────────────────────────────────────────
app.use('/api/tiles',  require('./routes/tiles'));
app.use('/api/auth',   require('./routes/auth'));
app.use('/api/upload', require('./routes/upload'));

// Health check
app.get('/', (_req, res) => res.json({ message: 'Devshree Tiles API running ✅' }));

// ── Local dev server ──────────────────────────────────────────────────────────
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  init().then(() => {
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  });
}

// ── Export for Vercel ─────────────────────────────────────────────────────────
module.exports = app;

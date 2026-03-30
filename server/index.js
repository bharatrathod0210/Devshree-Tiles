require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const seedDatabase = require('./seed/seedData');
const Admin = require('./models/Admin');

const app = express();

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(cors({ origin: '*', credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ── Routes ────────────────────────────────────────────────────────────────────
app.use('/api/tiles', require('./routes/tiles'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/upload', require('./routes/upload'));

// Health check
app.get('/', (req, res) => res.json({ message: 'Devshree Tiles API running ✅' }));

// ── Start Server ──────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  // Auto-seed tiles on first start
  await seedDatabase();

  // Auto-create default admin if none exists
  const adminCount = await Admin.countDocuments();
  if (adminCount === 0) {
    await Admin.create({
      name: 'Admin',
      email: process.env.ADMIN_EMAIL || 'admin@devshreetiles.com',
      password: process.env.ADMIN_PASSWORD || 'Admin@123',
    });
    console.log('✅ Default admin account created:');
    console.log(`   Email: ${process.env.ADMIN_EMAIL}`);
    console.log(`   Password: ${process.env.ADMIN_PASSWORD}`);
  }

  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
};

startServer();

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

// Helper to generate token
const generateToken = (id, email) =>
  jwt.sign({ id, email }, process.env.JWT_SECRET, { expiresIn: '7d' });

// @route POST /api/auth/register
// @desc  Register first admin (only if none exists)
router.post('/register', async (req, res) => {
  try {
    const count = await Admin.countDocuments();
    if (count > 0) {
      return res.status(400).json({ message: 'Admin already exists' });
    }
    const { name, email, password } = req.body;
    const admin = await Admin.create({ name, email, password });
    res.status(201).json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      token: generateToken(admin._id, admin.email),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route POST /api/auth/login
// @desc  Admin login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin || !(await admin.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    res.json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      token: generateToken(admin._id, admin.email),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

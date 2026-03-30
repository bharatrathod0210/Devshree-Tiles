const express = require('express');
const router = express.Router();
const Tile = require('../models/Tile');
const { protect } = require('../middleware/auth');

// @route GET /api/tiles
// @desc  Get all tiles with optional filters
router.get('/', async (req, res) => {
  try {
    const { category, size, finish, featured, limit, page = 1 } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (size) filter.size = size;
    if (finish) filter.finish = finish;
    if (featured === 'true') filter.featured = true;

    const pageSize = limit ? parseInt(limit) : 100;
    const skip = (parseInt(page) - 1) * pageSize;

    const total = await Tile.countDocuments(filter);
    const tiles = await Tile.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(pageSize);

    res.json({ tiles, total, page: parseInt(page) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route GET /api/tiles/:id
// @desc  Get single tile by ID
router.get('/:id', async (req, res) => {
  try {
    const tile = await Tile.findById(req.params.id);
    if (!tile) return res.status(404).json({ message: 'Tile not found' });
    res.json(tile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route POST /api/tiles
// @desc  Create a new tile (admin only)
router.post('/', protect, async (req, res) => {
  try {
    const tile = await Tile.create(req.body);
    res.status(201).json(tile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route PUT /api/tiles/:id
// @desc  Update a tile (admin only)
router.put('/:id', protect, async (req, res) => {
  try {
    const tile = await Tile.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!tile) return res.status(404).json({ message: 'Tile not found' });
    res.json(tile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route DELETE /api/tiles/:id
// @desc  Delete a tile (admin only)
router.delete('/:id', protect, async (req, res) => {
  try {
    const tile = await Tile.findByIdAndDelete(req.params.id);
    if (!tile) return res.status(404).json({ message: 'Tile not found' });
    res.json({ message: 'Tile deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

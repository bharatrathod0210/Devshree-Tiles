const express = require('express');
const router = express.Router();
const { cloudinary, upload } = require('../config/cloudinary');
const { protect } = require('../middleware/auth');

// @route POST /api/upload
// @desc  Upload image(s) to Cloudinary (admin only)
router.post('/', protect, upload.array('images', 5), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }
    const urls = req.files.map((f) => f.path);
    res.json({ urls });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route DELETE /api/upload
// @desc  Delete image from Cloudinary (admin only)
router.delete('/', protect, async (req, res) => {
  try {
    const { publicId } = req.body;
    if (!publicId) return res.status(400).json({ message: 'publicId required' });
    await cloudinary.uploader.destroy(publicId);
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

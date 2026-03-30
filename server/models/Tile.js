const mongoose = require('mongoose');

const tileSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    category: {
      type: String,
      enum: ['bathroom', 'kitchen', 'floor', 'wall'],
      required: [true, 'Category is required'],
    },
    size: {
      type: String,
      enum: ['4x2', '4x4'],
      required: [true, 'Size is required'],
    },
    finish: {
      type: String,
      enum: ['glossy', 'matte'],
      required: [true, 'Finish is required'],
    },
    images: {
      type: [String],
      default: [],
    },
    price: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      default: '',
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Tile', tileSchema);

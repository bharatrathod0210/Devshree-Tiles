const Tile = require('../models/Tile');

const seedTiles = [
  // ── BATHROOM TILES ──────────────────────────────────────────────
  {
    title: 'Luxury Marble Bathroom Tile',
    category: 'bathroom',
    size: '4x2',
    finish: 'glossy',
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
      'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80',
    ],
    price: 85,
    description: 'Elegant white marble-look bathroom tile with glossy finish. Perfect for luxury bathrooms.',
    featured: true,
  },
  {
    title: 'Carrara White Spa Tile',
    category: 'bathroom',
    size: '4x4',
    finish: 'matte',
    images: [
      'https://images.unsplash.com/photo-1615971677499-5467cbab01c0?w=800&q=80',
      'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?w=800&q=80',
    ],
    price: 110,
    description: 'Subtle Carrara white matte tile for a serene spa-like bathroom ambience.',
    featured: false,
  },
  {
    title: 'Midnight Blue Bathroom Tile',
    category: 'bathroom',
    size: '4x2',
    finish: 'glossy',
    images: [
      'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80',
    ],
    price: 95,
    description: 'Bold midnight blue glossy tile that adds drama and sophistication to any bathroom.',
    featured: false,
  },
  {
    title: 'Travertine Stone Bathroom Tile',
    category: 'bathroom',
    size: '4x4',
    finish: 'matte',
    images: [
      'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=800&q=80',
    ],
    price: 120,
    description: 'Natural travertine stone look matte tile for earthy, organic bathroom designs.',
    featured: true,
  },
  {
    title: 'Pearl White Bathroom Wall Tile',
    category: 'bathroom',
    size: '4x2',
    finish: 'glossy',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    ],
    price: 75,
    description: 'Luminous pearl white glossy tile that reflects light beautifully in bathrooms.',
    featured: false,
  },
  {
    title: 'Sage Green Spa Tile',
    category: 'bathroom',
    size: '4x4',
    finish: 'matte',
    images: [
      'https://images.unsplash.com/photo-1595252129934-b83de561ddfe?w=800&q=80',
    ],
    price: 98,
    description: 'Calming sage green matte tile for modern bathroom interiors with a wellness feel.',
    featured: false,
  },

  // ── KITCHEN TILES ────────────────────────────────────────────────
  {
    title: 'Modern Kitchen Subway Tile',
    category: 'kitchen',
    size: '4x2',
    finish: 'glossy',
    images: [
      'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&q=80',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
    ],
    price: 65,
    description: 'Classic subway glossy tile for kitchen backsplashes. Timeless and clean.',
    featured: true,
  },
  {
    title: 'Herringbone Kitchen Wall Tile',
    category: 'kitchen',
    size: '4x2',
    finish: 'matte',
    images: [
      'https://images.unsplash.com/photo-1600489000022-c2086d79f9d4?w=800&q=80',
    ],
    price: 88,
    description: 'Stylish herringbone pattern matte tile ideal for modern kitchen walls and backsplashes.',
    featured: false,
  },
  {
    title: 'Terracotta Kitchen Floor Tile',
    category: 'kitchen',
    size: '4x4',
    finish: 'matte',
    images: [
      'https://images.unsplash.com/photo-1583845112239-97ef1341b271?w=800&q=80',
    ],
    price: 72,
    description: 'Warm terracotta matte tile bringing earthy tones to any kitchen interior.',
    featured: false,
  },
  {
    title: 'Snow White Kitchen Tile',
    category: 'kitchen',
    size: '4x4',
    finish: 'glossy',
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    ],
    price: 80,
    description: 'Bright snow white glossy kitchen tile for a clean, modern culinary space.',
    featured: false,
  },
  {
    title: 'Slate Grey Kitchen Tile',
    category: 'kitchen',
    size: '4x2',
    finish: 'matte',
    images: [
      'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=800&q=80',
    ],
    price: 92,
    description: 'Industrial slate grey matte tile for contemporary kitchen designs.',
    featured: true,
  },
  {
    title: 'Mosaic Glass Kitchen Backsplash',
    category: 'kitchen',
    size: '4x2',
    finish: 'glossy',
    images: [
      'https://images.unsplash.com/photo-1629079448081-32e5e2e71ea4?w=800&q=80',
    ],
    price: 135,
    description: 'Iridescent glass mosaic backsplash tile adding sparkle and personality to kitchens.',
    featured: false,
  },

  // ── FLOOR TILES ──────────────────────────────────────────────────
  {
    title: 'Premium Vitrified Floor Tile',
    category: 'floor',
    size: '4x2',
    finish: 'glossy',
    images: [
      'https://images.unsplash.com/photo-1600607686527-6fb886090705?w=800&q=80',
      'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&q=80',
    ],
    price: 115,
    description: 'High-gloss vitrified floor tile with exceptional durability and shine.',
    featured: true,
  },
  {
    title: 'Onyx Black Floor Tile',
    category: 'floor',
    size: '4x4',
    finish: 'glossy',
    images: [
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80',
    ],
    price: 130,
    description: 'Dramatic onyx black glossy floor tile creating bold, luxurious interiors.',
    featured: false,
  },
  {
    title: 'Sandstone Beige Floor Tile',
    category: 'floor',
    size: '4x4',
    finish: 'matte',
    images: [
      'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80',
    ],
    price: 88,
    description: 'Warm sandstone beige matte tile for living rooms and hallways. Non-slip surface.',
    featured: false,
  },
  {
    title: 'Wood Look Plank Floor Tile',
    category: 'floor',
    size: '4x2',
    finish: 'matte',
    images: [
      'https://images.unsplash.com/photo-1562184647-c198531c7c97?w=800&q=80',
    ],
    price: 105,
    description: 'Realistic wood grain plank tile. The warmth of wood with the durability of ceramic.',
    featured: true,
  },
  {
    title: 'Concrete Grey Floor Tile',
    category: 'floor',
    size: '4x4',
    finish: 'matte',
    images: [
      'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=800&q=80',
    ],
    price: 78,
    description: 'Industrial concrete-look matte floor tile for modern loft and office interiors.',
    featured: false,
  },
  {
    title: 'Crema Marfil Flooring Tile',
    category: 'floor',
    size: '4x2',
    finish: 'glossy',
    images: [
      'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80',
    ],
    price: 145,
    description: 'Stunning Crema Marfil marble-pattern glossy tile for high-end residential flooring.',
    featured: true,
  },
  {
    title: 'Terrazzo Pattern Floor Tile',
    category: 'floor',
    size: '4x4',
    finish: 'matte',
    images: [
      'https://images.unsplash.com/photo-1620626011761-996317702149?w=800&q=80',
    ],
    price: 95,
    description: 'Trendy terrazzo pattern matte floor tile adding artistic flair to any space.',
    featured: false,
  },

  // ── WALL TILES ───────────────────────────────────────────────────
  {
    title: '3D Textured Accent Wall Tile',
    category: 'wall',
    size: '4x4',
    finish: 'matte',
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
    ],
    price: 160,
    description: 'Stunning 3D geometric textured wall tile for accent walls in living rooms and lobbies.',
    featured: true,
  },
  {
    title: 'Ocean Blue Wall Tile',
    category: 'wall',
    size: '4x2',
    finish: 'glossy',
    images: [
      'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80',
    ],
    price: 90,
    description: 'Deep ocean blue glossy wall tile evoking calm, coastal vibes.',
    featured: false,
  },
  {
    title: 'Earthy Terracotta Wall Tile',
    category: 'wall',
    size: '4x4',
    finish: 'matte',
    images: [
      'https://images.unsplash.com/photo-1583845112239-97ef1341b271?w=800&q=80',
    ],
    price: 82,
    description: 'Rich earthy terracotta matte wall tile for bohemian and Mediterranean interiors.',
    featured: false,
  },
  {
    title: 'Ivory Cream Wall Tile',
    category: 'wall',
    size: '4x2',
    finish: 'glossy',
    images: [
      'https://images.unsplash.com/photo-1615971677499-5467cbab01c0?w=800&q=80',
    ],
    price: 68,
    description: 'Classic ivory cream glossy wall tile for timeless interiors.',
    featured: false,
  },
  {
    title: 'Charcoal Slate Wall Tile',
    category: 'wall',
    size: '4x4',
    finish: 'matte',
    images: [
      'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=800&q=80',
    ],
    price: 115,
    description: 'Sophisticated charcoal slate matte wall tile for accent walls and feature cladding.',
    featured: true,
  },
  {
    title: 'Gold Vein Marble Wall Tile',
    category: 'wall',
    size: '4x2',
    finish: 'glossy',
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
      'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80',
    ],
    price: 180,
    description: 'Opulent white marble with bold gold veining. The pinnacle of luxury wall design.',
    featured: true,
  },
];

const seedDatabase = async () => {
  try {
    // Always re-seed to keep images and data up to date
    await Tile.deleteMany({});
    await Tile.insertMany(seedTiles);
    console.log(`✅ Seeded ${seedTiles.length} tile products into database.`);
  } catch (error) {
    console.error('❌ Seeding error:', error.message);
  }
};

module.exports = seedDatabase;

require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const connectDB = require('../config/db');
const Tile = require('../models/Tile');

// Real tile product images — actual ceramic/marble/vitrified tile photos, no people
// Using Unsplash photo IDs known to show actual tile surfaces and designs
const imageMap = [
  {
    match: 'Luxury Marble Bathroom',
    images: [
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80',
      'https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=800&q=80',
    ],
  },
  {
    match: 'Carrara White Spa',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
      'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?w=800&q=80',
    ],
  },
  {
    match: 'Midnight Blue Bathroom',
    images: [
      'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80',
    ],
  },
  {
    match: 'Travertine Stone Bathroom',
    images: [
      'https://images.unsplash.com/photo-1604147706283-d7119b5b822c?w=800&q=80',
    ],
  },
  {
    match: 'Pearl White Bathroom',
    images: [
      'https://images.unsplash.com/photo-1615971677499-5467cbab01c0?w=800&q=80',
    ],
  },
  {
    match: 'Sage Green Spa',
    images: [
      'https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?w=800&q=80',
    ],
  },
  {
    match: 'Modern Kitchen Subway',
    images: [
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
      'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&q=80',
    ],
  },
  {
    match: 'Herringbone Kitchen',
    images: [
      'https://images.unsplash.com/photo-1600489000022-c2086d79f9d4?w=800&q=80',
    ],
  },
  {
    match: 'Terracotta Kitchen',
    images: [
      'https://images.unsplash.com/photo-1583845112239-97ef1341b271?w=800&q=80',
    ],
  },
  {
    match: 'Snow White Kitchen',
    images: [
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80',
    ],
  },
  {
    match: 'Slate Grey Kitchen',
    images: [
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80',
    ],
  },
  {
    match: 'Mosaic Glass Kitchen',
    images: [
      'https://images.unsplash.com/photo-1629079448081-32e5e2e71ea4?w=800&q=80',
    ],
  },
  {
    match: 'Premium Vitrified Floor',
    images: [
      'https://images.unsplash.com/photo-1600607686527-6fb886090705?w=800&q=80',
      'https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=800&q=80',
    ],
  },
  {
    match: 'Onyx Black Floor',
    images: [
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80',
    ],
  },
  {
    match: 'Sandstone Beige Floor',
    images: [
      'https://images.unsplash.com/photo-1604147706283-d7119b5b822c?w=800&q=80',
    ],
  },
  {
    match: 'Wood Look Plank',
    images: [
      'https://images.unsplash.com/photo-1562184647-c198531c7c97?w=800&q=80',
    ],
  },
  {
    match: 'Concrete Grey Floor',
    images: [
      'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=800&q=80',
    ],
  },
  {
    match: 'Crema Marfil Flooring',
    images: [
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80',
    ],
  },
  {
    match: 'Terrazzo Pattern Floor',
    images: [
      'https://images.unsplash.com/photo-1620626011761-996317702149?w=800&q=80',
    ],
  },
  {
    match: '3D Textured Accent Wall',
    images: [
      'https://images.unsplash.com/photo-1629079448081-32e5e2e71ea4?w=800&q=80',
    ],
  },
  {
    match: 'Ocean Blue Wall',
    images: [
      'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80',
    ],
  },
  {
    match: 'Earthy Terracotta Wall',
    images: [
      'https://images.unsplash.com/photo-1583845112239-97ef1341b271?w=800&q=80',
    ],
  },
  {
    match: 'Ivory Cream Wall',
    images: [
      'https://images.unsplash.com/photo-1615971677499-5467cbab01c0?w=800&q=80',
    ],
  },
  {
    match: 'Charcoal Slate Wall',
    images: [
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80',
    ],
  },
  {
    match: 'Gold Vein Marble Wall',
    images: [
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80',
      'https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=800&q=80',
    ],
  },
];

const run = async () => {
  await connectDB();
  let updated = 0;
  for (const entry of imageMap) {
    const result = await Tile.updateMany(
      { title: { $regex: entry.match, $options: 'i' } },
      { $set: { images: entry.images } }
    );
    if (result.modifiedCount > 0) {
      console.log(`✅ Updated "${entry.match}" — ${result.modifiedCount} tile(s)`);
      updated += result.modifiedCount;
    } else {
      console.log(`⚠️  No match for "${entry.match}"`);
    }
  }
  console.log(`\n🎉 Done. Total updated: ${updated} tiles.`);
  process.exit(0);
};

run().catch((err) => { console.error(err); process.exit(1); });

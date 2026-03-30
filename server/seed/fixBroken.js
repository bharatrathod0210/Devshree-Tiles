require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const connectDB = require('../config/db');
const Tile = require('../models/Tile');

const fixes = [
  { match: 'Mosaic Glass Kitchen',  img: 'https://images.unsplash.com/photo-1556909211-36987daf7b4d?w=800&q=80' },
  { match: 'Wood Look Plank',       img: 'https://images.unsplash.com/photo-1560440021-33f9b867899d?w=800&q=80' },
  { match: 'Terrazzo Pattern',      img: 'https://images.unsplash.com/photo-1616137422495-1e9e46e2aa77?w=800&q=80' },
  { match: 'Sage Green Spa',        img: 'https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?w=800&q=80' },
];

const run = async () => {
  await connectDB();
  for (const f of fixes) {
    const r = await Tile.updateMany(
      { title: { $regex: f.match, $options: 'i' } },
      { $set: { 'images.0': f.img } }
    );
    console.log(`Fixed "${f.match}" → ${r.modifiedCount} tile(s)`);
  }
  console.log('Done.');
  process.exit(0);
};

run().catch(e => { console.error(e); process.exit(1); });

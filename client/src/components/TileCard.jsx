import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const WHATSAPP = 'https://wa.me/919898273236?text=';

const catBadge = {
  bathroom: 'bg-blue-500/15 text-blue-300 border border-blue-500/20',
  kitchen:  'bg-amber-500/15 text-amber-300 border border-amber-500/20',
  floor:    'bg-emerald-500/15 text-emerald-300 border border-emerald-500/20',
  wall:     'bg-purple-500/15 text-purple-300 border border-purple-500/20',
};

export default function TileCard({ tile, index = 0 }) {
  const [loaded, setLoaded] = useState(false);

  const msg = encodeURIComponent(
    `Hello, I want to enquire about this tile:\n*${tile.title}*\nCategory: ${tile.category} | Size: ${tile.size} | Finish: ${tile.finish}`
  );

  return (
    <motion.div
      className="tile-card group relative rounded-2xl overflow-hidden bg-[#1A1A1A] border border-white/5 hover:border-[#D4AF37]/40 transition-all duration-400 shadow-md hover:shadow-[0_8px_40px_rgba(212,175,55,0.1)]"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.07 }}
    >
      {/* Image */}
      <Link to={`/tile/${tile._id}`} className="block relative overflow-hidden aspect-[4/3]">
        {!loaded && <div className="absolute inset-0 skeleton" />}
        <img
          src={tile.images?.[0] || 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=600&q=70'}
          alt={tile.title}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=600&q=70'; setLoaded(true); }}
          className={`tile-img w-full h-full object-cover ${loaded ? 'img-loaded' : 'img-blur'}`}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

        {/* Badges */}
        <div className="absolute top-3 left-3">
          <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold capitalize backdrop-blur-md ${catBadge[tile.category] || 'bg-gray-500/20 text-gray-300'}`}>
            {tile.category}
          </span>
        </div>
        {tile.featured && (
          <div className="absolute top-3 right-3">
            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#D4AF37] text-black shadow-lg">
              ★ Featured
            </span>
          </div>
        )}
        {/* Gold border reveal on hover */}
        <div className="absolute inset-0 border-2 border-[#D4AF37]/0 group-hover:border-[#D4AF37]/30 transition-all duration-500 rounded-2xl pointer-events-none" />
      </Link>

      {/* Info */}
      <div className="p-4">
        <Link to={`/tile/${tile._id}`}>
          <h3 className="font-semibold text-base text-white mb-2.5 line-clamp-1 group-hover:text-[#D4AF37] transition-colors">
            {tile.title}
          </h3>
        </Link>

        <div className="flex items-center gap-2 flex-wrap mb-4">
          <span className="text-xs px-2 py-0.5 rounded-md border border-white/10 text-white/50">{tile.size}</span>
          <span className="text-xs px-2 py-0.5 rounded-md border border-white/10 text-white/50 capitalize">{tile.finish}</span>
          {tile.price > 0 && (
            <span className="ml-auto font-bold text-sm text-[#D4AF37]">₹{tile.price}<span className="text-[10px] text-white/40 font-normal">/sqft</span></span>
          )}
        </div>

        <a
          href={`${WHATSAPP}${msg}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-green-700/80 hover:bg-green-600 text-white text-sm font-semibold transition-all border border-green-600/30 hover:shadow-lg hover:shadow-green-700/20"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          Enquire on WhatsApp
        </a>
      </div>
    </motion.div>
  );
}

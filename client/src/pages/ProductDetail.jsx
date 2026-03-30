import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ZoomIn, Phone } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs, Zoom } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/zoom';
import TileCard from '../components/TileCard';
import SkeletonCard from '../components/SkeletonCard';
import api from '../utils/api';

const badge = {
  bathroom: 'bg-blue-500/15 text-blue-300 border border-blue-500/20',
  kitchen:  'bg-amber-500/15 text-amber-300 border border-amber-500/20',
  floor:    'bg-emerald-500/15 text-emerald-300 border border-emerald-500/20',
  wall:     'bg-purple-500/15 text-purple-300 border border-purple-500/20',
};

export default function ProductDetail() {
  const { id } = useParams();
  const [tile, setTile]           = useState(null);
  const [related, setRelated]     = useState([]);
  const [loading, setLoading]     = useState(true);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    setLoading(true);
    api.get(`/tiles/${id}`)
      .then(async (res) => {
        setTile(res.data);
        const rel = await api.get(`/tiles?category=${res.data.category}&limit=4`);
        setRelated((rel.data.tiles || []).filter((t) => t._id !== id));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  const enquiryMsg = tile
    ? encodeURIComponent(`Hello, I want to enquire about:\n*${tile.title}*\nCategory: ${tile.category} | Size: ${tile.size} | Finish: ${tile.finish}`)
    : '';

  /* ── Loading skeleton ─────────────────────────────────────────── */
  if (loading) return (
    <div className="min-h-screen bg-[#0D0D0D] pt-24 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto py-10 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="skeleton rounded-2xl aspect-square" />
        <div className="space-y-4 pt-6">
          {[40, 60, 80, 80, 100, 60].map((w, i) => (
            <div key={i} className="skeleton h-4 rounded" style={{ width: `${w}%` }} />
          ))}
        </div>
      </div>
    </div>
  );

  /* ── Not found ─────────────────────────────────────────────────── */
  if (!tile) return (
    <div className="min-h-screen bg-[#0D0D0D] flex flex-col items-center justify-center text-white">
      <p className="text-6xl mb-4">🪲</p>
      <p className="text-xl font-semibold mb-4">Tile not found</p>
      <Link to="/collection" className="btn-gold px-6 py-3 rounded-full text-sm font-bold text-[#0D0D0D]">Back to Collection</Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-10">

        {/* Back */}
        <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}>
          <Link to="/collection"
            className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-[#D4AF37] transition-colors mb-8 group"
          >
            <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" /> Back to Collection
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* ── Gallery ──────────────────────────────────────────── */}
          <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            {/* Main slider */}
            <Swiper
              modules={[Navigation, Thumbs, Zoom]}
              navigation
              zoom={{ maxRatio: 3 }}
              thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
              onSlideChange={(s) => setActiveImg(s.activeIndex)}
              className="rounded-2xl overflow-hidden mb-3 border border-white/5"
            >
              {tile.images.map((img, i) => (
                <SwiperSlide key={i} className="swiper-zoom-container bg-[#141414]">
                  <img src={img} alt={`${tile.title} ${i+1}`}
                    className="w-full aspect-square object-cover"
                    onError={(e) => { e.target.src='https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=600&q=60'; }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Thumbs */}
            {tile.images.length > 1 && (
              <Swiper onSwiper={setThumbsSwiper} spaceBetween={6} slidesPerView={4} watchSlidesProgress>
                {tile.images.map((img, i) => (
                  <SwiperSlide key={i} className="cursor-pointer">
                    <div className={`rounded-xl overflow-hidden aspect-square border-2 transition-all ${i === activeImg ? 'border-[#D4AF37]' : 'border-transparent opacity-50'}`}>
                      <img src={img} alt="" className="w-full h-full object-cover"
                        onError={(e) => { e.target.src='https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=120&q=50'; }}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
            <p className="text-white/20 text-xs text-center mt-2 flex items-center justify-center gap-1">
              <ZoomIn size={11} /> Pinch or double-click to zoom
            </p>
          </motion.div>

          {/* ── Tile Info ────────────────────────────────────────── */}
          <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            {/* Category tag */}
            <span className={`inline-block px-3 py-1 rounded-full text-[11px] font-semibold capitalize mb-5 ${badge[tile.category] || 'bg-gray-500/20 text-gray-400'}`}>
              {tile.category} Tile
            </span>

            <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mb-3 leading-tight">{tile.title}</h1>

            {tile.price > 0 && (
              <div className="flex items-baseline gap-2 mb-5">
                <span className="text-3xl font-bold text-gold">₹{tile.price}</span>
                <span className="text-white/30 text-sm">per sq.ft</span>
              </div>
            )}

            <div className="gold-divider mb-6" />

            {/* Specs grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {[
                { label: 'Size',     value: tile.size },
                { label: 'Finish',   value: tile.finish },
                { label: 'Category', value: tile.category },
                { label: 'Material', value: 'Vitrified' },
              ].map((s) => (
                <div key={s.label} className="bg-[#141414] border border-white/5 rounded-xl p-3">
                  <p className="text-white/30 text-[10px] uppercase tracking-wide mb-1">{s.label}</p>
                  <p className="text-white text-sm font-semibold capitalize">{s.value}</p>
                </div>
              ))}
            </div>

            {/* Description */}
            {tile.description && (
              <p className="text-white/50 text-sm leading-relaxed mb-7 border-l-2 border-[#D4AF37]/30 pl-4">{tile.description}</p>
            )}

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a href={`https://wa.me/919898273236?text=${enquiryMsg}`}
                target="_blank" rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl bg-green-700 hover:bg-green-600 text-white font-bold text-sm transition-all hover:shadow-lg hover:shadow-green-700/25 border border-green-600/30"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp Enquiry
              </a>
              <a href="tel:+919898273236"
                className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl border-2 border-[#D4AF37]/40 text-[#D4AF37] font-bold text-sm hover:bg-[#D4AF37] hover:text-[#0D0D0D] transition-all hover:shadow-lg hover:shadow-[#D4AF37]/20"
              >
                <Phone size={17} /> Call Now
              </a>
            </div>

            {/* Extra info */}
            <div className="mt-6 p-4 rounded-xl bg-[#141414] border border-white/5 text-xs text-white/30 leading-relaxed">
              📍 Visit showroom: Deepmala Nagar, Gautameshwar, Sihor, Gujarat – 364240
            </div>
          </motion.div>
        </div>

        {/* ── Related Tiles ─────────────────────────────────────── */}
        {related.length > 0 && (
          <section className="mt-20">
            <div className="mb-10">
              <p className="text-[#D4AF37] text-[10px] tracking-[0.4em] uppercase font-semibold mb-2">You May Also Like</p>
              <h2 className="font-display text-3xl font-bold text-white">Related Tiles</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.slice(0, 3).map((t, i) => <TileCard key={t._id} tile={t} index={i} />)}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

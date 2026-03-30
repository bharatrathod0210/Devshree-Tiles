import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { ArrowRight, Phone, Star, Quote, ChevronRight, Award, Truck, Shield, BadgePercent, ExternalLink } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import TileCard from '../components/TileCard';
import SkeletonCard from '../components/SkeletonCard';
import api from '../utils/api';

/* ─────────────────────────────────────────────────────────────────
   IMAGE LIBRARY  (tiles / interiors only — zero people)
───────────────────────────────────────────────────────────────── */
const IMGS = {
  // Hero — marble/tile backgrounds
  hero1: 'https://images.unsplash.com/photo-1615971677499-5467cbab01c0?w=1800&q=85',
  hero2: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1800&q=85',
  hero3: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?w=1800&q=85',

  // Category — strictly category-matched
  bathroom: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80',
  kitchen:  'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=800&q=80',
  floor:    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
  wall:     'https://images.unsplash.com/photo-1600489000022-c2086d79f9d4?w=800&q=80',

  // CTA parallax — marble texture, no people
  cta: 'https://images.unsplash.com/photo-1616137422495-1e9e46e2aa77?w=1600&q=80',

  // Gallery — tile applications without people
  g1: 'https://images.unsplash.com/photo-1560440021-33f9b867899d?w=800&q=80',
  g2: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=800&q=80',
  g3: 'https://images.unsplash.com/photo-1562184647-c198531c7c97?w=800&q=80',
  g4: 'https://images.unsplash.com/photo-1583845112239-97ef1341b271?w=800&q=80',
  g5: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80',
  g6: 'https://images.unsplash.com/photo-1615971677499-5467cbab01c0?w=800&q=80',
};

/* ── Static data ─────────────────────────────────────────────── */
const heroSlides = [
  { image: IMGS.hero1, title: 'Redefine Luxury', accent: 'Living', tag: 'Gold Collection 2025', sub: 'with Premium Tiles' },
  { image: IMGS.hero2, title: 'Elevate Every', accent: 'Space', tag: 'Bathroom Luxury Range', sub: 'with Designer Tiles' },
  { image: IMGS.hero3, title: 'Crafted for', accent: 'Perfection', tag: 'Premium Marble Tiles', sub: 'Built to Last' },
];

const categories = [
  { label: 'Bathroom Tiles', slug: 'bathroom', image: IMGS.bathroom, desc: 'Luxury spa-inspired designs' },
  { label: 'Kitchen Tiles',  slug: 'kitchen',  image: IMGS.kitchen,  desc: 'Modern culinary spaces' },
  { label: 'Floor Tiles',    slug: 'floor',    image: IMGS.floor,    desc: 'Durable & timeless' },
  { label: 'Wall Tiles',     slug: 'wall',     image: IMGS.wall,     desc: 'Bold accent collections' },
];

const stats = [
  { value: 500,  suffix: '+', label: 'Tile Designs' },
  { value: 15,   suffix: '+', label: 'Years Experience' },
  { value: 2000, suffix: '+', label: 'Happy Clients' },
  { value: 100,  suffix: '%', label: 'Quality Assured' },
];

const whyUs = [
  { icon: Award,       title: 'Premium Quality',  desc: "Curated tiles with superior finish and durability from India's top manufacturers." },
  { icon: BadgePercent, title: 'Best Prices',      desc: 'Competitive pricing with no compromise on quality, style, or service.' },
  { icon: Truck,       title: 'Fast Delivery',    desc: 'Quick delivery across Gujarat with professional installation guidance.' },
  { icon: Shield,      title: 'Trusted Shop',     desc: '15+ years of trust. Thousands of happy homes in Saurashtra and beyond.' },
];

const reviews = [
  { name: 'Rameshbhai Patel', location: 'Sihor',    rating: 5, text: 'Excellent tile selection! The marble bathroom tiles completely transformed our home. Quality is outstanding.' },
  { name: 'Priya Mehta',      location: 'Bhavnagar', rating: 5, text: 'Lalitbhai gave great advice. Helped us find the perfect kitchen tiles. Highly recommended!' },
  { name: 'Ashokbhai Shah',   location: 'Palitana',  rating: 5, text: 'Best tile showroom in the region. Fair pricing, wide variety, and superb quality even after 2 years.' },
  { name: 'Kiran Desai',      location: 'Bhavnagar', rating: 5, text: 'Bought floor tiles for my entire house. Delivery on time and tiles exactly as shown. Very happy!' },
];

const galleryItems = [
  { image: IMGS.g1, label: 'Glossy Floor Tile',    cat: 'Floor' },
  { image: IMGS.g2, label: 'Concrete Matte Floor', cat: 'Floor' },
  { image: IMGS.g3, label: 'Wood Plank Tile',      cat: 'Floor' },
  { image: IMGS.g4, label: 'Terracotta Kitchen',   cat: 'Kitchen' },
  { image: IMGS.g5, label: 'Onyx Black Floor',     cat: 'Floor' },
  { image: IMGS.g6, label: 'Marble Wall Tile',     cat: 'Bathroom' },
];

/* ── Animated Counter ─────────────────────────────────────────── */
function Counter({ value, suffix }) {
  const [count, setCount] = useState(0);
  const ref   = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let n = 0;
    const step = value / 60;
    const t = setInterval(() => {
      n += step;
      if (n >= value) { setCount(value); clearInterval(t); }
      else setCount(Math.floor(n));
    }, 25);
    return () => clearInterval(t);
  }, [inView, value]);
  return <span ref={ref}>{count}{suffix}</span>;
}

/* ── Lazy Image ───────────────────────────────────────────────── */
function LazyImg({ src, alt, className }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="relative w-full h-full">
      {!loaded && <div className="absolute inset-0 skeleton" />}
      <img src={src} alt={alt} loading="lazy" onLoad={() => setLoaded(true)}
        className={`${className} ${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}
        onError={(e) => { e.target.src = IMGS.hero1; setLoaded(true); }}
      />
    </div>
  );
}

const fadeUp = { hidden: { opacity: 0, y: 32 }, show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

/* ════════════════════════════════════════════════════════════════
   HOME PAGE
════════════════════════════════════════════════════════════════ */
export default function Home() {
  const [featuredTiles, setFeaturedTiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '28%']);

  useEffect(() => {
    api.get('/tiles?featured=true&limit=6')
      .then((r) => setFeaturedTiles(r.data.tiles || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-[#0B0B0B] text-white overflow-x-hidden">

      {/* ══════════════════════════════════════
          1. HERO
      ══════════════════════════════════════ */}
      <section ref={heroRef} className="relative h-screen min-h-[640px]">
        <Swiper modules={[Autoplay, Pagination, EffectFade]} effect="fade"
          autoplay={{ delay: 5500, disableOnInteraction: false }}
          pagination={{ clickable: true }} loop className="h-full"
        >
          {heroSlides.map((slide, i) => (
            <SwiperSlide key={i} className="relative overflow-hidden">
              <motion.div style={{ y: i === 0 ? parallaxY : 0 }} className="absolute inset-0 scale-[1.08]">
                <img src={slide.image} alt={slide.title} loading={i === 0 ? 'eager' : 'lazy'}
                  className="w-full h-full object-cover" />
              </motion.div>
              {/* Multi-layer dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/55 to-black/20" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
              {/* Gold shimmer top */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent" />

              <div className="absolute inset-0 flex items-center">
                <div className="max-w-7xl mx-auto px-6 sm:px-14 w-full">
                  <motion.p key={`tag-${i}`} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                    className="text-[#D4AF37] text-xs tracking-[0.55em] uppercase mb-5 font-semibold flex items-center gap-2"
                  ><span className="w-8 h-px bg-[#D4AF37]" /> {slide.tag}</motion.p>

                  <motion.h1 key={`h-${i}`} initial={{ opacity: 0, y: 34 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
                    className="font-display font-bold text-white leading-[1.04] mb-3"
                    style={{ fontSize: 'clamp(3rem, 8vw, 5rem)' }}
                  >
                    {slide.title}{' '}
                    <span className="text-gold italic">{slide.accent}</span>
                  </motion.h1>

                  <motion.p key={`sub-${i}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                    className="font-display text-white/70 mb-10"
                    style={{ fontSize: 'clamp(1.5rem, 4vw, 3.5rem)' }}
                  >{slide.sub}</motion.p>

                  <motion.div key={`cta-${i}`} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}
                    className="flex flex-wrap gap-4"
                  >
                    <Link to="/collection" className="btn-gold inline-flex items-center gap-2.5 px-9 py-4 rounded-full text-sm font-bold text-[#0B0B0B] tracking-wide">
                      Explore Tiles <ArrowRight size={17} />
                    </Link>
                    <a href="https://wa.me/919898273236?text=Hello%2C%20I%20want%20to%20enquire%20about%20your%20tiles" target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2.5 px-9 py-4 rounded-full text-sm font-bold border border-white/25 text-white hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-300 backdrop-blur-sm">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                      WhatsApp Now
                    </a>
                    <a href="tel:+919898273236"
                      className="inline-flex items-center gap-2 px-9 py-4 rounded-full text-sm font-bold border border-white/15 text-white/70 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-300">
                      <Phone size={16}/> Call Now
                    </a>
                  </motion.div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0B0B0B] to-transparent z-10" />
        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <div className="w-px h-10 bg-gradient-to-b from-[#D4AF37] to-transparent" />
        </motion.div>
      </section>

      {/* ══════════════════════════════════════
          3. STATS
      ══════════════════════════════════════ */}
      <section className="py-16 bg-[#0B0B0B]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {stats.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card rounded-2xl p-6 text-center group hover:border-[#D4AF37]/30 transition-all"
              >
                <p className="font-display text-4xl sm:text-5xl font-bold text-gold mb-1">
                  <Counter value={s.value} suffix={s.suffix} />
                </p>
                <p className="text-white/40 text-sm">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          4. CATEGORIES  (exact image match)
      ══════════════════════════════════════ */}
      <section className="py-24 px-4 sm:px-6 bg-[#121212]">
        <div className="max-w-7xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mb-14">
            <p className="text-[#D4AF37] text-[10px] tracking-[0.5em] uppercase font-bold mb-3">Browse by Category</p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white">Tile Collections</h2>
            <div className="gold-divider w-20 mx-auto mt-5" />
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {categories.map((cat, i) => (
              <motion.div key={cat.slug} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Link to={`/collection?category=${cat.slug}`}
                  className="group relative block rounded-2xl overflow-hidden aspect-[3/4] border border-white/5 hover:border-[#D4AF37]/35 transition-all duration-500 shadow-lg hover:shadow-[0_20px_60px_rgba(212,175,55,0.12)]">
                  <img src={cat.image} alt={cat.label} loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                    style={{ '--tw-scale-x': '1', '--tw-scale-y': '1' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/25 to-transparent" />
                  <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 inset-x-0 p-6">
                    <p className="text-[#D4AF37]/70 text-[10px] tracking-[0.3em] uppercase mb-2 font-semibold">{cat.desc}</p>
                    <h3 className="text-white font-display text-xl font-bold mb-2.5">{cat.label}</h3>
                    <span className="flex items-center gap-1.5 text-[#D4AF37] text-xs font-semibold uppercase tracking-wider group-hover:gap-3 transition-all">
                      Explore <ChevronRight size={14} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          5. WHY CHOOSE US
      ══════════════════════════════════════ */}
      <section className="py-24 px-4 sm:px-6 bg-[#0B0B0B]">
        <div className="max-w-7xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mb-14">
            <p className="text-[#D4AF37] text-[10px] tracking-[0.5em] uppercase font-bold mb-3">Our Promise</p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white">Why Choose <span className="text-gold italic">Devshree?</span></h2>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {whyUs.map(({ icon: Icon, title, desc }, i) => (
              <motion.div key={i} variants={fadeUp}
                className="glass-card rounded-2xl p-7 group hover:glow-gold-sm">
                <div className="w-13 h-13 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center mb-5 group-hover:bg-[#D4AF37]/20 transition-colors" style={{ width: 52, height: 52 }}>
                  <Icon size={22} className="text-[#D4AF37]" />
                </div>
                <h3 className="font-display text-xl font-bold text-white mb-2">{title}</h3>
                <p className="text-white/45 text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          6. FEATURED TILES
      ══════════════════════════════════════ */}
      <section className="py-24 px-4 sm:px-6 bg-[#121212]">
        <div className="max-w-7xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-14 gap-4">
            <div>
              <p className="text-[#D4AF37] text-[10px] tracking-[0.5em] uppercase font-bold mb-2">Handpicked Selection</p>
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-white">Featured Tiles</h2>
            </div>
            <Link to="/collection" className="btn-gold inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-bold text-[#0B0B0B]">
              View All <ArrowRight size={15} />
            </Link>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading
              ? Array(6).fill(0).map((_, i) => <SkeletonCard key={i} />)
              : featuredTiles.length > 0
                ? featuredTiles.map((tile, i) => <TileCard key={tile._id} tile={tile} index={i} />)
                : <p className="col-span-3 text-center text-white/30 py-10">Loading tiles from server...</p>
            }
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          7. GALLERY / PROJECTS
      ══════════════════════════════════════ */}
      <section className="py-24 px-4 sm:px-6 bg-[#0B0B0B]">
        <div className="max-w-7xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mb-14">
            <p className="text-[#D4AF37] text-[10px] tracking-[0.5em] uppercase font-bold mb-3">Tile Applications</p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white">Gallery &amp; Projects</h2>
            <div className="gold-divider w-20 mx-auto mt-5" />
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryItems.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.94 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="group relative overflow-hidden rounded-2xl border border-white/5 hover:border-[#D4AF37]/30 transition-all duration-500"
                style={{ aspectRatio: i % 3 === 0 ? '4/5' : '4/3' }}
              >
                <img src={item.image} alt={item.label} loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="text-[#D4AF37] text-[10px] tracking-[0.25em] uppercase font-semibold">{item.cat}</p>
                  <p className="text-white text-sm font-semibold mt-0.5">{item.label}</p>
                </div>
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-8 h-8 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/30 flex items-center justify-center">
                    <ExternalLink size={13} className="text-[#D4AF37]" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          8. PARALLAX CTA — marble texture bg
      ══════════════════════════════════════ */}
      <section className="relative py-36 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-fixed" style={{ backgroundImage: `url('${IMGS.cta}')` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/70 to-black/85" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <p className="text-[#D4AF37] text-[10px] tracking-[0.6em] uppercase font-bold mb-5">Ready to Transform Your Home?</p>
          <h2 className="font-display font-bold text-white mb-6 leading-tight"
            style={{ fontSize: 'clamp(2.2rem, 6vw, 5rem)' }}>
            Upgrade Your Home with<br /><span className="text-gold italic">Premium Tiles</span>
          </h2>
          <p className="text-white/50 text-base sm:text-lg mb-12 max-w-lg mx-auto">
            Visit Devshree Tiles Sihor showroom or connect with Lalitbhai Rathod for personalized tile consultation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+919898273236" className="btn-gold inline-flex items-center justify-center gap-2 px-10 py-4.5 rounded-full font-bold text-[#0B0B0B]"
              style={{ paddingTop: '1.1rem', paddingBottom: '1.1rem' }}>
              <Phone size={18} /> +91 9898273236
            </a>
            <a href="https://wa.me/919898273236?text=Hello%2C%20I%20want%20to%20enquire%20about%20your%20tiles" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full font-bold border border-white/25 text-white hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all backdrop-blur-sm">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp Enquiry
            </a>
          </div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════
          9. REVIEWS
      ══════════════════════════════════════ */}
      <section className="py-24 px-4 sm:px-6 bg-[#121212]">
        <div className="max-w-7xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mb-14">
            <p className="text-[#D4AF37] text-[10px] tracking-[0.5em] uppercase font-bold mb-3">Customer Love</p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">What Clients Say</h2>
            <div className="flex items-center justify-center gap-1.5">
              {[...Array(5)].map((_, i) => <Star key={i} size={18} className="text-[#D4AF37] fill-[#D4AF37]" />)}
              <span className="ml-2 text-white font-bold">5.0</span>
              <span className="text-white/30 text-sm ml-1">Google Rating</span>
            </div>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {reviews.map((r, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="glass-card rounded-2xl p-6 flex flex-col gap-4">
                <Quote size={26} className="text-[#D4AF37]/25" />
                <p className="text-white/55 text-sm leading-relaxed flex-1">"{r.text}"</p>
                <div>
                  <div className="flex gap-0.5 mb-2">
                    {[...Array(r.rating)].map((_, j) => <Star key={j} size={12} className="text-[#D4AF37] fill-[#D4AF37]" />)}
                  </div>
                  <p className="text-white text-sm font-semibold">{r.name}</p>
                  <p className="text-[#D4AF37]/50 text-xs">{r.location}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          10. SHOWROOM STRIP
      ══════════════════════════════════════ */}
      <section className="py-8 bg-[#0B0B0B] border-t border-[#D4AF37]/10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <p className="text-white/30 text-[10px] tracking-widest uppercase mb-0.5">Visit Our Showroom</p>
            <p className="text-white/80 text-sm font-medium">Deepmala Nagar, Gautameshwar, Sihor, Gujarat – 364240</p>
          </div>
          <div className="flex items-center gap-3">
            <a href="tel:+919898273236" className="btn-gold px-6 py-2.5 rounded-full text-sm font-bold text-[#0B0B0B] inline-flex items-center gap-2">
              <Phone size={14}/> Call Us
            </a>
            <a href="https://wa.me/919898273236?text=Hello%2C%20I%20want%20to%20enquire%20about%20your%20tiles" target="_blank" rel="noopener noreferrer"
              className="px-6 py-2.5 rounded-full text-sm font-bold border border-green-500/50 text-green-400 hover:bg-green-600 hover:text-white hover:border-green-600 transition-all">
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

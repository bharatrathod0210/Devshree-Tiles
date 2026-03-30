import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, X } from 'lucide-react';
import TileCard from '../components/TileCard';
import SkeletonCard from '../components/SkeletonCard';
import api from '../utils/api';

const CATEGORIES = ['all', 'bathroom', 'kitchen', 'floor', 'wall'];
const SIZES      = ['all', '4x2', '4x4'];
const FINISHES   = ['all', 'glossy', 'matte'];

export default function Collection() {
  const [searchParams] = useSearchParams();
  const [tiles, setTiles]       = useState([]);
  const [loading, setLoading]   = useState(true);
  const [total, setTotal]       = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filters, setFilters]   = useState({
    category: searchParams.get('category') || 'all',
    size: 'all',
    finish: 'all',
  });

  const setFilter = (key, val) => setFilters((f) => ({ ...f, [key]: val }));
  const clearAll  = () => setFilters({ category: 'all', size: 'all', finish: 'all' });
  const hasFilter = filters.category !== 'all' || filters.size !== 'all' || filters.finish !== 'all';

  const fetchTiles = useCallback(async () => {
    setLoading(true);
    try {
      const params = {};
      if (filters.category !== 'all') params.category = filters.category;
      if (filters.size     !== 'all') params.size     = filters.size;
      if (filters.finish   !== 'all') params.finish   = filters.finish;
      const res = await api.get('/tiles', { params });
      setTiles(res.data.tiles || []);
      setTotal(res.data.total || 0);
    } catch { setTiles([]); }
    finally  { setLoading(false); }
  }, [filters]);

  useEffect(() => { fetchTiles(); }, [fetchTiles]);

  /* ── Filter pill group ─────────────────────────────────────────── */
  const FilterGroup = ({ label, options, filterKey }) => (
    <div className="mb-7">
      <p className="text-[10px] tracking-[0.3em] uppercase text-white/30 font-semibold mb-3">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button key={opt} onClick={() => setFilter(filterKey, opt)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold capitalize transition-all duration-200 ${
              filters[filterKey] === opt
                ? 'bg-[#D4AF37] text-[#0D0D0D] shadow-md shadow-[#D4AF37]/25'
                : 'border border-white/10 text-white/50 hover:border-[#D4AF37]/50 hover:text-[#D4AF37]'
            }`}
          >{opt === 'all' ? 'All' : opt}</button>
        ))}
      </div>
    </div>
  );

  const SidebarInner = () => (
    <div className="bg-[#141414] border border-white/5 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-display text-lg font-bold text-white">Filters</h3>
        {hasFilter && (
          <button onClick={clearAll} className="text-[11px] text-[#D4AF37] hover:underline flex items-center gap-1">
            <X size={11} /> Clear
          </button>
        )}
      </div>
      <div className="gold-divider mb-6" />
      <FilterGroup label="Category" options={CATEGORIES} filterKey="category" />
      <FilterGroup label="Size"     options={SIZES}      filterKey="size"     />
      <FilterGroup label="Finish"   options={FINISHES}   filterKey="finish"   />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white pt-20">

      {/* Page header */}
      <div className="bg-[#141414] border-b border-white/5 py-12 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-[#D4AF37] text-[10px] tracking-[0.45em] uppercase font-semibold mb-2">Our Collection</p>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-white">Premium Tiles</h1>
            <p className="text-white/40 text-sm mt-1.5">
              {loading ? '...' : `${total} tiles`}
              {hasFilter && <span className="ml-2 px-2 py-0.5 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-xs border border-[#D4AF37]/20">Filtered</span>}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10">
        {/* Mobile filter toggle */}
        <div className="lg:hidden mb-6">
          <button onClick={() => setSidebarOpen(!sidebarOpen)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#141414] border border-white/10 text-white text-sm font-medium hover:border-[#D4AF37]/30 transition-all"
          >
            <SlidersHorizontal size={15} className="text-[#D4AF37]" />
            Filters
            {hasFilter && (
              <span className="w-5 h-5 rounded-full bg-[#D4AF37] text-[#0D0D0D] text-[10px] font-bold flex items-center justify-center">
                {[filters.category, filters.size, filters.finish].filter((v) => v !== 'all').length}
              </span>
            )}
          </button>
          <AnimatePresence>
            {sidebarOpen && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-4">
                <SidebarInner />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex gap-8">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-60 shrink-0">
            <div className="sticky top-24"><SidebarInner /></div>
          </aside>

          {/* Grid */}
          <main className="flex-1">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {Array(9).fill(0).map((_, i) => <SkeletonCard key={i} />)}
              </div>
            ) : tiles.length === 0 ? (
              <div className="text-center py-24">
                <div className="text-6xl mb-4">🔍</div>
                <p className="text-white text-xl font-semibold mb-1">No tiles found</p>
                <p className="text-white/40 text-sm mb-6">Try adjusting your filters</p>
                <button onClick={clearAll} className="btn-gold px-7 py-3 rounded-full text-sm font-bold text-[#0D0D0D]">Clear Filters</button>
              </div>
            ) : (
              <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                <AnimatePresence>
                  {tiles.map((tile, i) => <TileCard key={tile._id} tile={tile} index={i} />)}
                </AnimatePresence>
              </motion.div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Pencil, Trash2, X, Save, LogOut, Upload, Link, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../utils/api';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import logo from '../../assets/logo-tiles.png';

const EMPTY_FORM = {
  title: '', category: 'bathroom', size: '4x2', finish: 'glossy',
  images: [], price: '', description: '', featured: false,
};

// ── Image Uploader Component ──────────────────────────────────────────────────
function ImageUploader({ images, onChange }) {
  const [uploading, setUploading] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [tab, setTab] = useState('upload'); // 'upload' | 'url'
  const fileRef = useRef();

  const handleFiles = async (files) => {
    if (!files.length) return;
    setUploading(true);
    try {
      const formData = new FormData();
      Array.from(files).forEach((f) => formData.append('images', f));
      const res = await api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      onChange([...images, ...res.data.urls]);
      toast.success(`${res.data.urls.length} image(s) uploaded`);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Upload failed');
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const addUrl = () => {
    const url = urlInput.trim();
    if (!url) return;
    if (!url.startsWith('http')) { toast.error('Enter a valid URL'); return; }
    onChange([...images, url]);
    setUrlInput('');
  };

  const removeImage = (idx) => onChange(images.filter((_, i) => i !== idx));

  return (
    <div className="space-y-3">
      {/* Tab switcher */}
      <div className="flex gap-1 p-1 bg-[#0d0d0d] rounded-xl border border-white/5">
        {[['upload', <Upload size={13} />, 'Upload File'], ['url', <Link size={13} />, 'Paste URL']].map(([key, icon, label]) => (
          <button key={key} type="button" onClick={() => setTab(key)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-all ${
              tab === key ? 'bg-[#D4AF37] text-black' : 'text-white/40 hover:text-white'
            }`}
          >
            {icon}{label}
          </button>
        ))}
      </div>

      {/* Upload area */}
      {tab === 'upload' && (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => !uploading && fileRef.current?.click()}
          className="relative border-2 border-dashed border-white/10 hover:border-[#D4AF37]/50 rounded-xl p-6 text-center cursor-pointer transition-all group"
        >
          <input ref={fileRef} type="file" accept="image/*" multiple className="hidden"
            onChange={(e) => handleFiles(e.target.files)} />
          {uploading ? (
            <div className="flex flex-col items-center gap-2 text-[#D4AF37]">
              <Loader2 size={28} className="animate-spin" />
              <p className="text-sm font-medium">Uploading to Cloudinary…</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 text-white/30 group-hover:text-white/60 transition-colors">
              <Upload size={28} />
              <p className="text-sm font-medium">Drag & drop or click to upload</p>
              <p className="text-xs">JPG, PNG, WEBP — max 10MB each</p>
            </div>
          )}
        </div>
      )}

      {/* URL input */}
      {tab === 'url' && (
        <div className="flex gap-2">
          <input
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addUrl())}
            placeholder="https://example.com/tile-image.jpg"
            className="flex-1 px-3 py-2.5 rounded-xl text-sm bg-[#1a1a1a] border border-white/10 text-white focus:outline-none focus:border-[#D4AF37] placeholder-gray-600 transition-colors"
          />
          <button type="button" onClick={addUrl}
            className="px-4 py-2.5 rounded-xl bg-[#D4AF37] text-black text-sm font-bold hover:bg-[#E8CF7E] transition-colors"
          >Add</button>
        </div>
      )}

      {/* Preview grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((url, i) => (
            <div key={i} className="relative group aspect-square rounded-lg overflow-hidden border border-white/10">
              <img src={url} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button type="button" onClick={() => removeImage(i)}
                  className="w-7 h-7 rounded-full bg-red-500 flex items-center justify-center text-white hover:bg-red-400 transition-colors"
                >
                  <X size={13} />
                </button>
              </div>
              {i === 0 && (
                <span className="absolute bottom-1 left-1 text-[9px] bg-[#D4AF37] text-black px-1.5 py-0.5 rounded font-bold">Main</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Main Dashboard ────────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const { dark } = useTheme();
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  const [tiles, setTiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editTile, setEditTile] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => { if (!admin) navigate('/admin/login'); }, [admin, navigate]);

  const fetchTiles = async () => {
    setLoading(true);
    try {
      const res = await api.get('/tiles?limit=100');
      setTiles(res.data.tiles || []);
    } catch { toast.error('Failed to load tiles'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchTiles(); }, []);

  const openAdd = () => { setForm(EMPTY_FORM); setEditTile(null); setModalOpen(true); };
  const openEdit = (tile) => {
    setEditTile(tile);
    setForm({ ...tile, images: tile.images || [], price: tile.price || '' });
    setModalOpen(true);
  };
  const closeModal = () => { setModalOpen(false); setEditTile(null); setForm(EMPTY_FORM); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.images.length === 0) { toast.error('Add at least one image'); return; }
    setSaving(true);
    try {
      const payload = { ...form, price: form.price ? Number(form.price) : 0 };
      if (editTile) {
        await api.put(`/tiles/${editTile._id}`, payload);
        toast.success('Tile updated!');
      } else {
        await api.post('/tiles', payload);
        toast.success('Tile added!');
      }
      closeModal();
      fetchTiles();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Save failed');
    } finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/tiles/${id}`);
      toast.success('Tile deleted');
      setDeleteConfirm(null);
      fetchTiles();
    } catch { toast.error('Delete failed'); }
  };

  const handleLogout = () => { logout(); navigate('/'); };

  const Field = ({ label, ...props }) => (
    <div>
      <label className="block text-gray-400 text-xs font-medium mb-1">{label}</label>
      <input {...props} className="w-full px-3 py-2.5 rounded-xl text-sm bg-[#1a1a1a] border border-white/10 text-white focus:outline-none focus:border-[#D4AF37] placeholder-gray-600 transition-colors" />
    </div>
  );

  const Select = ({ label, children, ...props }) => (
    <div>
      <label className="block text-gray-400 text-xs font-medium mb-1">{label}</label>
      <select {...props} className="w-full px-3 py-2.5 rounded-xl text-sm bg-[#1a1a1a] border border-white/10 text-white focus:outline-none focus:border-[#D4AF37] transition-colors">
        {children}
      </select>
    </div>
  );

  const stats = [
    { label: 'Total Tiles', value: tiles.length },
    { label: 'Bathroom', value: tiles.filter((t) => t.category === 'bathroom').length },
    { label: 'Kitchen',  value: tiles.filter((t) => t.category === 'kitchen').length },
    { label: 'Floor',    value: tiles.filter((t) => t.category === 'floor').length },
    { label: 'Wall',     value: tiles.filter((t) => t.category === 'wall').length },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Header */}
      <header className="bg-[#111] border-b border-white/5 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Devshree Tiles" className="h-9 w-auto object-contain" />
            <div>
              <h1 className="font-display text-xl font-bold text-gold">Admin Dashboard</h1>
              <p className="text-gray-500 text-xs">Devshree Tiles Sihor</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:block text-sm text-gray-400">{admin?.name}</span>
            <button onClick={handleLogout}
              className="flex items-center gap-1.5 text-sm text-red-400 hover:text-red-300 border border-red-400/30 px-3 py-1.5 rounded-lg hover:bg-red-400/10 transition-all"
            >
              <LogOut size={14} /> Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-8">
          {stats.map((s) => (
            <div key={s.label} className="bg-[#161616] rounded-2xl p-4 border border-white/5">
              <p className="text-2xl font-bold text-gold">{s.value}</p>
              <p className="text-gray-400 text-xs mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Table Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display text-2xl font-semibold">All Tiles</h2>
          <button onClick={openAdd}
            className="flex items-center gap-2 px-5 py-2.5 bg-gold text-white rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-[#C9A84C]/25 transition-all"
          >
            <Plus size={16} /> Add Tile
          </button>
        </div>

        {/* Tiles Table */}
        <div className="bg-[#111] rounded-2xl border border-white/5 overflow-hidden">
          {loading ? (
            <div className="p-10 text-center text-gray-500">Loading tiles…</div>
          ) : tiles.length === 0 ? (
            <div className="p-10 text-center">
              <p className="text-gray-400 mb-3">No tiles yet.</p>
              <button onClick={openAdd} className="px-5 py-2.5 bg-gold text-white rounded-xl text-sm font-semibold">Add First Tile</button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/5 text-gray-500 text-xs uppercase tracking-wider">
                    <th className="px-4 py-3 text-left">Image</th>
                    <th className="px-4 py-3 text-left">Title</th>
                    <th className="px-4 py-3 text-left">Category</th>
                    <th className="px-4 py-3 text-left">Size</th>
                    <th className="px-4 py-3 text-left">Finish</th>
                    <th className="px-4 py-3 text-left">Price</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tiles.map((tile) => (
                    <tr key={tile._id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                      <td className="px-4 py-3">
                        <img src={tile.images?.[0]} alt={tile.title}
                          className="w-12 h-12 rounded-lg object-cover bg-gray-800"
                          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=100&q=50'; }}
                        />
                      </td>
                      <td className="px-4 py-3 font-medium text-white max-w-[200px]">
                        <div className="flex items-center gap-2">
                          {tile.featured && <span className="px-1.5 py-0.5 text-[10px] bg-gold/20 text-[#E8CF7E] rounded">★ Featured</span>}
                          <span className="truncate">{tile.title}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 capitalize text-gray-300">{tile.category}</td>
                      <td className="px-4 py-3 text-gray-300">{tile.size}</td>
                      <td className="px-4 py-3 capitalize text-gray-300">{tile.finish}</td>
                      <td className="px-4 py-3 text-[#C9A84C] font-semibold">{tile.price ? `₹${tile.price}` : '—'}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => openEdit(tile)}
                            className="p-2 rounded-lg hover:bg-blue-500/15 text-blue-400 hover:text-blue-300 transition-colors" title="Edit"
                          ><Pencil size={14} /></button>
                          <button onClick={() => setDeleteConfirm(tile._id)}
                            className="p-2 rounded-lg hover:bg-red-500/15 text-red-400 hover:text-red-300 transition-colors" title="Delete"
                          ><Trash2 size={14} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div initial={{ scale: 0.94, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.94, opacity: 0 }}
              className="w-full max-w-lg bg-[#161616] rounded-3xl border border-white/10 overflow-y-auto max-h-[90vh]"
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
                <h3 className="font-display text-xl font-semibold">{editTile ? 'Edit Tile' : 'Add New Tile'}</h3>
                <button onClick={closeModal} className="text-gray-500 hover:text-white transition-colors"><X size={20} /></button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <Field label="Title *" required value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Luxury Marble Bathroom Tile"
                />

                <div className="grid grid-cols-3 gap-3">
                  <Select label="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                    {['bathroom', 'kitchen', 'floor', 'wall'].map((c) => <option key={c} value={c}>{c}</option>)}
                  </Select>
                  <Select label="Size" value={form.size} onChange={(e) => setForm({ ...form, size: e.target.value })}>
                    {['4x2', '4x4'].map((s) => <option key={s} value={s}>{s}</option>)}
                  </Select>
                  <Select label="Finish" value={form.finish} onChange={(e) => setForm({ ...form, finish: e.target.value })}>
                    {['glossy', 'matte'].map((f) => <option key={f} value={f}>{f}</option>)}
                  </Select>
                </div>

                <Field label="Price (₹/sqft)" type="number" value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  placeholder="e.g. 95"
                />

                {/* Image Uploader */}
                <div>
                  <label className="block text-gray-400 text-xs font-medium mb-2">
                    Images * <span className="text-white/20">(upload or paste URL)</span>
                  </label>
                  <ImageUploader
                    images={form.images}
                    onChange={(imgs) => setForm({ ...form, images: imgs })}
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-xs font-medium mb-1">Description</label>
                  <textarea value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    rows={2} placeholder="Short description of this tile…"
                    className="w-full px-3 py-2.5 rounded-xl text-sm bg-[#1a1a1a] border border-white/10 text-white focus:outline-none focus:border-[#D4AF37] placeholder-gray-600 transition-colors resize-none"
                  />
                </div>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.featured}
                    onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                    className="accent-[#C9A84C] w-4 h-4 rounded"
                  />
                  <span className="text-sm text-gray-300">Mark as Featured (shows on Home page)</span>
                </label>

                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={closeModal}
                    className="flex-1 py-3 rounded-xl border border-white/10 text-gray-400 hover:text-white text-sm font-medium transition-colors"
                  >Cancel</button>
                  <button type="submit" disabled={saving}
                    className="flex-1 py-3 rounded-xl bg-gold text-white text-sm font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[#C9A84C]/20 transition-all disabled:opacity-60"
                  >
                    {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
                    {saving ? 'Saving…' : editTile ? 'Update Tile' : 'Add Tile'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirm */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
          >
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-sm bg-[#1a1a1a] rounded-2xl p-6 border border-white/10 text-center"
            >
              <div className="text-4xl mb-3">🗑️</div>
              <h3 className="text-lg font-semibold mb-2">Delete Tile?</h3>
              <p className="text-gray-400 text-sm mb-6">This action cannot be undone.</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteConfirm(null)}
                  className="flex-1 py-2.5 rounded-xl border border-white/10 text-sm text-gray-300 hover:text-white transition-colors"
                >Cancel</button>
                <button onClick={() => handleDelete(deleteConfirm)}
                  className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-sm font-semibold transition-colors"
                >Delete</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

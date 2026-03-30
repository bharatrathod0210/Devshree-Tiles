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

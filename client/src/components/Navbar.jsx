import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { Sun, Moon, Menu, X, Phone } from 'lucide-react';
import logo from '../assets/logo-tiles.png';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Collection', to: '/collection' },
  { label: 'Contact', to: '/#contact' },
];

export default function Navbar() {
  const { dark, toggleTheme } = useTheme();
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled
        ? 'bg-[#0D0D0D]/95 border-b border-[#D4AF37]/10 shadow-2xl shadow-black/50 backdrop-blur-xl'
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <img src={logo} alt="Devshree Tiles" className="h-14 w-auto object-contain group-hover:opacity-90 transition-opacity drop-shadow-lg" />
          <div className="flex flex-col leading-tight">
            <span className="font-display text-xl font-bold tracking-wide text-[#D4AF37] drop-shadow-sm group-hover:text-[#E8CF7E] transition-colors duration-300">
              Devshree Tiles
            </span>
            <span className="text-[9px] tracking-[0.5em] uppercase text-[#D4AF37]/55 font-sans">
              Sihor, Gujarat
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to}
              className={({ isActive }) =>
                `text-sm font-medium tracking-wide transition-colors duration-200 relative group ${
                  isActive ? 'text-[#D4AF37]' : 'text-white/70 hover:text-[#D4AF37]'
                }`
              }
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#D4AF37] group-hover:w-full transition-all duration-300" />
            </NavLink>
          ))}
          {admin && (
            <NavLink to="/admin/dashboard" className="text-sm font-medium text-[#D4AF37]">Admin</NavLink>
          )}
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-3">
          <button onClick={toggleTheme}
            className="p-2 rounded-full text-white/50 hover:text-[#D4AF37] hover:bg-white/5 transition-all"
          >
            {dark ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          <a href="tel:+919898273236"
            className="btn-gold inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-bold text-[#0D0D0D]"
          >
            <Phone size={14} /> Call Now
          </a>

          {admin && (
            <button onClick={handleLogout}
              className="text-sm font-medium px-3 py-1.5 rounded-lg border border-red-500/40 text-red-400 hover:bg-red-500/10 transition-all"
            >Logout</button>
          )}
        </div>

        {/* Mobile */}
        <div className="flex md:hidden items-center gap-3">
          <button onClick={toggleTheme} className="text-white/50 hover:text-[#D4AF37]">
            {dark ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="text-white">
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0D0D0D]/98 border-t border-[#D4AF37]/10 backdrop-blur-xl"
          >
            <div className="px-6 py-5 flex flex-col gap-5">
              {navLinks.map((link) => (
                <NavLink key={link.to} to={link.to} onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `text-base font-medium ${isActive ? 'text-[#D4AF37]' : 'text-white/80'}`
                  }
                >{link.label}</NavLink>
              ))}
              {admin && (
                <>
                  <NavLink to="/admin/dashboard" onClick={() => setMobileOpen(false)} className="text-[#D4AF37] font-medium">Admin Dashboard</NavLink>
                  <button onClick={handleLogout} className="text-red-400 font-medium text-left">Logout</button>
                </>
              )}
              <a href="tel:+919898273236"
                className="btn-gold inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-bold text-[#0D0D0D] w-fit"
              >
                <Phone size={14} /> +91 9898273236
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

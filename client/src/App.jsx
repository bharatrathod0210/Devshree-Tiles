import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { WhatsAppButton, StickyCallButton, ScrollToTop } from './components/FloatingButtons';
import Home from './pages/Home';
import Collection from './pages/Collection';
import ProductDetail from './pages/ProductDetail';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';

function AutoScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <AutoScrollToTop />
          <Toaster
            position="top-right"
            toastOptions={{
              style: { background: '#1a1a1a', color: '#fff', border: '1px solid rgba(201,168,76,0.3)' },
              success: { iconTheme: { primary: '#C9A84C', secondary: '#fff' } },
            }}
          />

          <Routes>
            {/* Admin routes — no Navbar/Footer */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />

            {/* Public routes */}
            <Route
              path="*"
              element={
                <>
                  <Navbar />
                  <WhatsAppButton />
                  <StickyCallButton />
                  <ScrollToTop />
                  <main>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/collection" element={<Collection />} />
                      <Route path="/tile/:id" element={<ProductDetail />} />
                      <Route path="*" element={
                        <div className="min-h-screen flex flex-col items-center justify-center pt-20">
                          <p className="text-6xl mb-4">404</p>
                          <p className="text-xl font-semibold mb-2">Page not found</p>
                          <a href="/" className="mt-4 px-6 py-2.5 bg-gold text-white rounded-full text-sm font-semibold">Go Home</a>
                        </div>
                      } />
                    </Routes>
                  </main>
                  <Footer />
                </>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

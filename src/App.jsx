import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from './components/layout/Layout';
import { useAuth } from './context/AuthContext';

// ── Public pages ──────────────────────────────────────────────────────────────
const Home     = lazy(() => import('./pages/Home'));
const About    = lazy(() => import('./pages/About'));
const News     = lazy(() => import('./pages/News'));
const Events   = lazy(() => import('./pages/Events'));
const Gallery  = lazy(() => import('./pages/Gallery'));
const Mission  = lazy(() => import('./pages/Mission'));
const Contact  = lazy(() => import('./pages/Contact'));
const Login    = lazy(() => import('./pages/Auth/Login'));
const Register = lazy(() => import('./pages/Auth/Register'));

// ── Dashboard ─────────────────────────────────────────────────────────────────
const DashboardLayout  = lazy(() => import('./pages/Dashboard/DashboardLayout'));
const DashboardHome    = lazy(() => import('./pages/Dashboard/DashboardHome'));
const PersonalInfo     = lazy(() => import('./pages/Dashboard/profile/PersonalInfo'));
const SecurityPin      = lazy(() => import('./pages/Dashboard/profile/SecurityPin'));
const KYC              = lazy(() => import('./pages/Dashboard/profile/KYC'));
const BusinessInfo     = lazy(() => import('./pages/Dashboard/profile/BusinessInfo'));
const LevelReport      = lazy(() => import('./pages/Dashboard/levels/LevelReport'));
const BinaryReport     = lazy(() => import('./pages/Dashboard/levels/BinaryReport'));

// ── Branded loader ────────────────────────────────────────────────────────────
const PageLoader = () => (
  <div className="fixed inset-0 bg-white z-[100] flex flex-col items-center justify-center overflow-hidden">
    <div className="absolute inset-0 bg-mesh-deep opacity-40 pulsate" />
    <div className="absolute inset-0 bg-dot-pattern opacity-5" />
    <div className="relative">
      <motion.div
        animate={{ scale: [1, 1.4, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -inset-20 bg-brand-blue/5 rounded-full blur-[100px]"
      />
    </div>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.8 }}
      className="mt-8 text-center space-y-4 px-6"
    >
      <div className="space-y-2">
        <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter uppercase leading-none">INDIWA</h1>
        <div className="h-1 w-12 bg-brand-green mx-auto rounded-full" />
      </div>
      <div className="flex items-center gap-4 justify-center">
        <div className="h-[1px] w-6 bg-brand-blue/20" />
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">The National Movement</span>
        <div className="h-[1px] w-6 bg-brand-blue/20" />
      </div>
    </motion.div>
  </div>
);

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';
  }, []);
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
};

// ── Route guards ──────────────────────────────────────────────────────────────
const GuestRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <PageLoader />;
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : children;
};

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <PageLoader />;
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>

        {/* ── Public site (with Navbar/Footer layout) ───────────────── */}
        <Route element={<Layout />}>
          <Route index element={<Suspense fallback={<PageLoader />}><Home /></Suspense>} />
          <Route path="about"   element={<Suspense fallback={<PageLoader />}><About /></Suspense>} />
          <Route path="news"    element={<Suspense fallback={<PageLoader />}><News /></Suspense>} />
          <Route path="events"  element={<Suspense fallback={<PageLoader />}><Events /></Suspense>} />
          <Route path="gallery" element={<Suspense fallback={<PageLoader />}><Gallery /></Suspense>} />
          <Route path="mission" element={<Suspense fallback={<PageLoader />}><Mission /></Suspense>} />
          <Route path="contact" element={<Suspense fallback={<PageLoader />}><Contact /></Suspense>} />

          <Route path="login"    element={<GuestRoute><Suspense fallback={<PageLoader />}><Login /></Suspense></GuestRoute>} />
          <Route path="register" element={<GuestRoute><Suspense fallback={<PageLoader />}><Register /></Suspense></GuestRoute>} />
        </Route>

        {/* ── Dashboard (its own full-screen layout, no Navbar) ──────── */}
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <Suspense fallback={<PageLoader />}>
                <DashboardLayout />
              </Suspense>
            </ProtectedRoute>
          }
        >
          <Route index element={<Suspense fallback={<PageLoader />}><DashboardHome /></Suspense>} />

          {/* Profile */}
          <Route path="profile/personal-info" element={<Suspense fallback={<PageLoader />}><PersonalInfo /></Suspense>} />
          <Route path="profile/security-pin"  element={<Suspense fallback={<PageLoader />}><SecurityPin /></Suspense>} />
          <Route path="profile/kyc"           element={<Suspense fallback={<PageLoader />}><KYC /></Suspense>} />
          <Route path="profile/business-info" element={<Suspense fallback={<PageLoader />}><BusinessInfo /></Suspense>} />

          {/* Levels */}
          <Route path="levels/level-report"  element={<Suspense fallback={<PageLoader />}><LevelReport /></Suspense>} />
          <Route path="levels/binary-report" element={<Suspense fallback={<PageLoader />}><BinaryReport /></Suspense>} />

          {/* Catch-all → redirect to dashboard home */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>

        {/* ── 404 fallback ──────────────────────────────────────────── */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </Router>
  );
}

export default App;

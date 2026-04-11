import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import Layout from './components/layout/Layout';

// Performance Optimization: Lazy Loading Pagess
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const News = lazy(() => import('./pages/News'));
const Events = lazy(() => import('./pages/Events'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Mission = lazy(() => import('./pages/Mission'));
const Contact = lazy(() => import('./pages/Contact'));
const Login = lazy(() => import('./pages/Auth/Login'));
const Register = lazy(() => import('./pages/Auth/Register'));

// Branded Premium Loader: Universal Globe Animation
const PageLoader = () => (
  <div className="fixed inset-0 bg-white z-[100] flex flex-col items-center justify-center overflow-hidden">
    {/* Deep Atmospheric Background */}
    <div className="absolute inset-0 bg-mesh-deep opacity-40 pulsate" />
    <div className="absolute inset-0 bg-dot-pattern opacity-5" />

    <div className="relative">
      {/* Outer Pulse Decoration */}
      <motion.div
        animate={{ scale: [1, 1.4, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -inset-20 bg-brand-blue/5 rounded-full blur-[100px]"
      />

      {/* The Universal Globe Container */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 p-6 bg-white rounded-full shadow-glow-blue border border-brand-blue/5"
      >
        <motion.div
          animate={{ rotateY: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <Globe size={72} className="text-brand-blue" strokeWidth={1.5} />
        </motion.div>

        {/* Orbital Ring Accent */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 border-r-2 border-brand-orange/30 rounded-full"
        />
      </motion.div>
    </div>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.8 }}
      className="mt-16 text-center space-y-4"
    >
      <div className="font-script text-brand-blue text-4xl mb-1">Indiwa</div>
      <div className="flex items-center gap-4 justify-center">
        <div className="h-[1px] w-8 bg-brand-orange/20" />
        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-400">Universal Network</span>
        <div className="h-[1px] w-8 bg-brand-orange/20" />
      </div>
    </motion.div>
  </div>
);

// Standard Senior UI: Scroll to Top on Route Change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Disable browser default scroll restoration behavior
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, [pathname]);

  return null;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/news" element={<News />} />
            <Route path="/events" element={<Events />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/mission" element={<Mission />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
}

export default App;
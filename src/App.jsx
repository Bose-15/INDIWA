import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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
    </div>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.8 }}
      className="mt-8 text-center space-y-4 px-6"
    >
      <div className="space-y-2">
        <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter uppercase leading-none">
          INDIWA
        </h1>
        <div className="h-1 w-12 bg-brand-green mx-auto rounded-full" />
      </div>

      <div className="flex items-center gap-4 justify-center">
        <div className="h-[1px] w-6 bg-brand-blue/20" />
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">
          The National Movement
        </span>
        <div className="h-[1px] w-6 bg-brand-blue/20" />
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
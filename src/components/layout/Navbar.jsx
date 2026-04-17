import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, Phone, Mail, Award, ArrowRight, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Mission', path: '/mission' },
    { name: 'Events', path: '/events' },
    // { name: 'Recent News', path: '/news' },
  ];

  return (
    <div className="fixed w-full z-50 pt-1 px-2 sm:pt-2 sm:px-4 transition-all duration-500 pointer-events-none">
      <div className={`max-w-7xl mx-auto flex flex-col pointer-events-auto transition-all duration-500`}>



        {/* Main Floating Nav */}
        <nav
          className={`glass rounded-full px-5 py-4 sm:px-12 transition-all duration-500 ${isScrolled ? 'shadow-[0_20px_50px_rgba(0,87,184,0.15)] py-3 sm:py-4 translate-y-1' : 'border border-white/40 shadow-sm'}`}
        >
          <div className="grid grid-cols-2 lg:grid-cols-3 items-center">
            {/* 1. Left: Logo Section */}
            <div className="flex justify-start">
              <Link to="/" className="flex items-center gap-2 sm:gap-3 group">
                <div className="relative">
                  <img
                    src="/logo.png"
                    alt="INDIWA Logo"
                    className={`transition-all duration-500 ${isScrolled ? 'h-9 sm:h-10' : 'h-10 sm:h-14'} group-hover:scale-110 active:scale-95`}
                  />
                  <div className="absolute inset-0 bg-brand-blue/5 rounded-full blur-md -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </Link>
            </div>

            {/* 2. Center: Desktop Nav Items */}
            <div className="hidden lg:flex justify-center items-center">
              <div className="flex items-center px-4 gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`text-[11px] font-black tracking-[0.12em] uppercase px-6 py-4 rounded-full transition-all relative group ${location.pathname === link.path ? 'text-brand-blue' : 'text-gray-500 hover:text-gray-900'}`}
                  >
                    <span className="relative z-10">{link.name}</span>
                    {location.pathname === link.path ? (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-blue-50/80 -z-10 rounded-full shadow-inner"
                        transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                      />
                    ) : (
                      <div className="absolute inset-x-5 bottom-2 h-0.5 bg-brand-green scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full" />
                    )}
                  </Link>
                ))}
              </div>
            </div>

            {/* 3. Right: Action Buttons (Desktop & Tablet) */}
            <div className="hidden lg:flex justify-end items-center gap-4">
              <Link to="/contact" className="bg-brand-blue text-white px-10 py-4.5 rounded-full font-black text-[11px] uppercase tracking-[0.25em] shadow-glow-blue hover:shadow-glow-blue/50 hover:scale-105 active:scale-95 transition-all">
                Join Movement
              </Link>
            </div>

            {/* Mobile Toggle (Right-aligned) */}
            <div className="flex justify-end items-center gap-2 sm:gap-4 lg:hidden">
              <Link to="/contact" className="bg-brand-blue text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-black text-[10px] uppercase tracking-widest shadow-glow-blue active:scale-95 transition-all">Join</Link>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle Menu"
                className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-slate-100 transition-all text-gray-900 border border-gray-100 bg-white shadow-sm active:scale-95"
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu Overlay - Premium Glassmorphism */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              {/* Full-Screen Dark Backdrop Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileMenuOpen(false)}
                className="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-[-1] lg:hidden pointer-events-auto"
              />

              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                className="mt-3 lg:hidden glass rounded-[35px] p-6 shadow-2xl overflow-hidden pointer-events-auto border border-white/60 relative"
              >
                {/* Decorative Blur in Menu */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-brand-green/10 blur-3xl rounded-full" />

                <div className="relative z-10 space-y-4">
                  <div className="flex flex-col gap-1.5">
                    {navLinks.map((link) => (
                      <motion.div key={link.name} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
                        <Link
                          to={link.path}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`group flex items-center justify-between py-4 px-7 rounded-2xl font-black text-[11px] tracking-[0.2em] uppercase transition-all ${location.pathname === link.path ? 'bg-brand-blue text-white shadow-glow-blue' : 'text-gray-700 hover:bg-slate-50'}`}
                        >
                          {link.name}
                          {location.pathname !== link.path && <ChevronRight size={14} className="text-gray-300 group-hover:text-brand-blue transition-colors" />}
                        </Link>
                      </motion.div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <Link
                      onClick={() => setMobileMenuOpen(false)}
                      to="/contact"
                      className="flex items-center justify-center py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest bg-brand-blue text-white shadow-glow-blue active:scale-95 transition-all"
                    >
                      Join Now
                    </Link>
                  </div>

                  <div className="text-center pt-4">
                    <p className="text-[8px] font-black text-gray-300 uppercase tracking-[0.25em]">© 2024 INDIWA Welfare Association</p>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Navbar;

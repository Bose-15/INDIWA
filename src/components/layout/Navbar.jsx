import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Globe, ChevronDown, ChevronRight, LogOut, LayoutDashboard, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage, LANGUAGES } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';

// ─── Language Dropdown ────────────────────────────────────────────────────────
const LanguageDropdown = () => {
  const { lang, switchLang, languages } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const current = languages.find(l => l.code === lang) || languages[0];

  return (
    <div ref={ref} className="relative flex-shrink-0">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-1 text-gray-500 hover:text-brand-blue px-2.5 py-2.5 rounded-full font-black text-[10px] uppercase tracking-wider transition-all hover:bg-blue-50 border border-transparent hover:border-blue-100"
        aria-label="Select language"
      >
        <Globe size={14} className="shrink-0" />
        <span className="hidden sm:inline text-[10px]">{current.code.toUpperCase()}</span>
        <ChevronDown size={10} className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50"
          >
            {languages.map(l => (
              <button
                key={l.code}
                onClick={() => { switchLang(l.code); setOpen(false); }}
                className={`w-full flex items-center justify-between px-4 py-3 text-left transition-colors
                  ${lang === l.code
                    ? 'bg-brand-blue text-white'
                    : 'text-gray-600 hover:bg-blue-50 hover:text-brand-blue'
                  }`}
              >
                <span className="text-[13px] font-bold">{l.nativeLabel}</span>
                <span className={`text-[9px] font-black uppercase tracking-wider ${lang === l.code ? 'text-blue-200' : 'text-gray-300'}`}>
                  {l.label}
                </span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── User Menu (when logged in) ───────────────────────────────────────────────
const UserMenu = () => {
  const { user, logout } = useAuth();
  const [open, setOpen]  = useState(false);
  const ref              = useRef(null);
  const navigate         = useNavigate();

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = async () => {
    setOpen(false);
    await logout();
    navigate('/', { replace: true });
  };

  const initial = user?.name?.charAt(0)?.toUpperCase() || 'U';

  return (
    <div ref={ref} className="relative flex-shrink-0">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-1.5 px-2.5 py-2 rounded-full hover:bg-blue-50 transition-all border border-transparent hover:border-blue-100"
      >
        <div className="w-7 h-7 rounded-full bg-brand-blue text-white flex items-center justify-center font-black text-[11px] shadow-glow-blue flex-shrink-0">
          {initial}
        </div>
        <div className="hidden xl:block text-left max-w-[80px]">
          <p className="text-[10px] font-black text-gray-800 uppercase tracking-wider leading-none truncate">{user?.name?.split(' ')[0]}</p>
          <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-0.5 truncate">{user?.member_id}</p>
        </div>
        <ChevronDown size={10} className={`text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''} flex-shrink-0`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50"
          >
            <div className="px-5 py-4 bg-slate-50 border-b border-gray-100">
              <p className="text-[11px] font-black text-gray-800 uppercase tracking-wider truncate">{user?.name}</p>
              <p className="text-[10px] font-bold text-gray-400 mt-0.5 truncate">{user?.member_id}</p>
              {user?.role !== 'member' && (
                <span className="inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 bg-brand-blue/10 text-brand-blue text-[9px] font-black uppercase tracking-widest rounded-full">
                  <ShieldCheck size={10} /> {user?.role}
                </span>
              )}
            </div>
            <Link
              to="/dashboard"
              onClick={() => setOpen(false)}
              className="w-full flex items-center gap-3 px-5 py-4 text-left text-[11px] font-black uppercase tracking-widest text-gray-600 hover:bg-blue-50 hover:text-brand-blue transition-colors"
            >
              <LayoutDashboard size={14} /> My Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-5 py-4 text-left text-[11px] font-black uppercase tracking-widest text-red-500 hover:bg-red-50 transition-colors border-t border-gray-100"
            >
              <LogOut size={14} /> Sign Out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Navbar ───────────────────────────────────────────────────────────────────
const Navbar = () => {
  const [isScrolled, setIsScrolled]         = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location   = useLocation();
  const navigate   = useNavigate();
  const { t }      = useLanguage();
  const { isAuthenticated, user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileMenuOpen(false); }, [location.pathname]);

  const navLinks = [
    { key: 'nav.home',    path: '/'        },
    { key: 'nav.about',   path: '/about'   },
    { key: 'nav.mission', path: '/mission' },
    { key: 'nav.events',  path: '/events'  },
    { key: 'nav.contact', path: '/contact' },
  ];

  const handleMobileLogout = async () => {
    setMobileMenuOpen(false);
    await logout();
    navigate('/', { replace: true });
  };

  return (
    <div className="fixed w-full z-50 pt-1 px-2 sm:pt-2 sm:px-4 transition-all duration-500 pointer-events-none">
      <div className="max-w-7xl mx-auto flex flex-col pointer-events-auto transition-all duration-500">

        {/* ── Main Floating Nav ──────────────────────────────────────────────── */}
        <nav className={`glass rounded-full px-4 sm:px-6 transition-all duration-500 ${
          isScrolled
            ? 'shadow-[0_20px_50px_rgba(0,87,184,0.15)] py-2.5 translate-y-1'
            : 'border border-white/40 shadow-sm py-3'
        }`}>
          {/*
            Layout: flex with three zones
            Left  — logo           (flex-shrink-0, never squishes)
            Center — nav links     (flex-1, centered, wraps only on extreme edge case)
            Right  — lang + auth   (flex-shrink-0, never squishes)
          */}
          <div className="flex items-center gap-2">

            {/* ── 1. Logo ─────────────────────────────────────────────── */}
            <div className="flex-shrink-0 mr-1">
              <Link to="/" className="flex items-center group">
                <div className="relative">
                  <img
                    src="/logo.png"
                    alt="INDIWA Logo"
                    className={`transition-all duration-500 ${isScrolled ? 'h-8 sm:h-9' : 'h-9 sm:h-12'} group-hover:scale-110 active:scale-95`}
                  />
                  <div className="absolute inset-0 bg-brand-blue/5 rounded-full blur-md -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </Link>
            </div>

            {/* ── 2. Desktop Nav Links ─────────────────────────────────── */}
            <div className="hidden lg:flex flex-1 justify-center items-center min-w-0 px-1">
              <div className="flex items-center flex-wrap justify-center gap-0">
                {navLinks.map((link) => (
                  <Link
                    key={link.key}
                    to={link.path}
                    className={`relative group whitespace-nowrap text-[10.5px] font-black tracking-[0.04em] uppercase px-2.5 xl:px-3 py-3 rounded-full transition-all ${
                      location.pathname === link.path
                        ? 'text-brand-blue'
                        : 'text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    <span className="relative z-10">{t(link.key)}</span>
                    {location.pathname === link.path ? (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-blue-50/80 -z-10 rounded-full shadow-inner"
                        transition={{ type: 'spring', bounce: 0.3, duration: 0.6 }}
                      />
                    ) : (
                      <div className="absolute inset-x-4 bottom-1.5 h-0.5 bg-brand-green scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full" />
                    )}
                  </Link>
                ))}
              </div>
            </div>

            {/* ── 3. Desktop: Language + Auth ─────────────────────────── */}
            <div className="hidden lg:flex flex-shrink-0 items-center gap-1 ml-1">
              <LanguageDropdown />
              {isAuthenticated ? (
                <UserMenu />
              ) : (
                <>
                  <Link
                    to="/login"
                    className="whitespace-nowrap text-gray-700 hover:text-brand-blue px-3 xl:px-4 py-2.5 rounded-full font-black text-[10.5px] uppercase tracking-[0.08em] transition-all hover:bg-blue-50"
                  >
                    {t('nav.login')}
                  </Link>
                  <Link
                    to="/register"
                    className="whitespace-nowrap bg-brand-blue text-white px-4 xl:px-5 py-2.5 rounded-full font-black text-[10.5px] uppercase tracking-[0.08em] shadow-glow-blue hover:shadow-glow-blue/50 hover:scale-105 active:scale-95 transition-all"
                  >
                    {t('nav.signup')}
                  </Link>
                </>
              )}
            </div>

            {/* ── 4. Mobile: Language + Login/Avatar + Hamburger ────────── */}
            <div className="flex lg:hidden flex-shrink-0 items-center gap-1.5 ml-auto">
              <LanguageDropdown />
              {isAuthenticated ? (
                <div className="w-8 h-8 rounded-full bg-brand-blue text-white flex items-center justify-center font-black text-[12px] shadow-glow-blue flex-shrink-0">
                  {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="whitespace-nowrap text-gray-700 border border-gray-200 bg-white px-3 sm:px-4 py-2 rounded-full font-black text-[10px] uppercase tracking-wider active:scale-95 transition-all"
                >
                  {t('nav.login')}
                </Link>
              )}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle Menu"
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 transition-all text-gray-900 border border-gray-100 bg-white shadow-sm active:scale-95 flex-shrink-0"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>

          </div>
        </nav>

        {/* ── Mobile Menu Overlay ────────────────────────────────────────────── */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
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
                className="mt-3 lg:hidden glass rounded-[28px] p-5 shadow-2xl overflow-hidden pointer-events-auto border border-white/60 relative"
              >
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-brand-green/10 blur-3xl rounded-full pointer-events-none" />

                <div className="relative z-10 space-y-3">

                  {/* User info (when logged in) */}
                  {isAuthenticated && (
                    <div className="flex items-center gap-3 px-4 py-3.5 bg-brand-blue/5 rounded-2xl border border-brand-blue/10">
                      <div className="w-9 h-9 rounded-full bg-brand-blue text-white flex items-center justify-center font-black text-sm shadow-glow-blue flex-shrink-0">
                        {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                      </div>
                      <div className="min-w-0">
                        <p className="text-[11px] font-black text-gray-800 uppercase tracking-wider truncate">{user?.name}</p>
                        <p className="text-[10px] font-bold text-gray-400 mt-0.5 truncate">{user?.member_id}</p>
                      </div>
                    </div>
                  )}

                  {/* Nav links */}
                  <div className="flex flex-col gap-1">
                    {navLinks.map((link, i) => (
                      <motion.div
                        key={link.key}
                        initial={{ x: -16, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: i * 0.04 }}
                      >
                        <Link
                          to={link.path}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`group flex items-center justify-between py-3.5 px-5 rounded-xl font-black text-[12px] tracking-[0.12em] uppercase transition-all ${
                            location.pathname === link.path
                              ? 'bg-brand-blue text-white shadow-glow-blue'
                              : 'text-gray-700 hover:bg-slate-50'
                          }`}
                        >
                          <span>{t(link.key)}</span>
                          {location.pathname !== link.path && (
                            <ChevronRight size={13} className="text-gray-300 group-hover:text-brand-blue transition-colors flex-shrink-0 ml-2" />
                          )}
                        </Link>
                      </motion.div>
                    ))}
                  </div>

                  {/* Auth buttons */}
                  <div className="pt-3 border-t border-gray-100 flex gap-2">
                    {isAuthenticated ? (
                      <>
                        <Link
                          to="/dashboard"
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest bg-brand-blue text-white shadow-glow-blue active:scale-95 transition-all"
                        >
                          <LayoutDashboard size={13} /> Dashboard
                        </Link>
                        <button
                          onClick={handleMobileLogout}
                          className="flex items-center justify-center gap-2 px-4 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest border border-red-100 bg-red-50 text-red-500 active:scale-95 transition-all"
                        >
                          <LogOut size={13} />
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          onClick={() => setMobileMenuOpen(false)}
                          to="/login"
                          className="flex-1 flex items-center justify-center py-4 rounded-xl text-[10px] font-black uppercase tracking-widest border border-gray-200 bg-white text-gray-800 active:scale-95 transition-all"
                        >
                          {t('nav.login')}
                        </Link>
                        <Link
                          onClick={() => setMobileMenuOpen(false)}
                          to="/register"
                          className="flex-1 flex items-center justify-center py-4 rounded-xl text-[10px] font-black uppercase tracking-widest bg-brand-blue text-white shadow-glow-blue active:scale-95 transition-all"
                        >
                          {t('nav.signup')}
                        </Link>
                      </>
                    )}
                  </div>

                  {/* Copyright */}
                  <div className="text-center pt-1">
                    <p className="text-[8px] font-black text-gray-300 uppercase tracking-[0.2em] leading-relaxed">{t('nav.copyright')}</p>
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

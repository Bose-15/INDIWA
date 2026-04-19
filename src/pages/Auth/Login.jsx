import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, LogIn, AlertCircle, Loader2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';

const ArcRings = () => (
  <div className="absolute bottom-0 right-0 pointer-events-none overflow-hidden w-full h-full">
    {[400, 320, 245, 170, 100].map((size, i) => (
      <div
        key={i}
        className="absolute bottom-0 right-0 rounded-tl-full border border-white/[0.10]"
        style={{ width: size, height: size }}
      />
    ))}
  </div>
);

const Login = () => {
  const [mobile, setMobile]             = useState('');
  const [password, setPassword]         = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError]               = useState('');
  const [loading, setLoading]           = useState(false);

  const { t } = useLanguage();
  const { login } = useAuth();
  const navigate  = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!mobile.trim() || !password) return;
    setError('');
    setLoading(true);
    try {
      await login(mobile.trim(), password);
      navigate('/', { replace: true });
    } catch (err) {
      // Network down
      if (!navigator.onLine || err.message === 'Failed to fetch') {
        setError('Unable to reach server. Please check your connection.');
        return;
      }
      // Backend field-validation error — show the first specific message
      const firstFieldError = err.data?.errors?.[0]?.message;
      setError(firstFieldError || err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-[#f5f7fa] flex items-start justify-center pt-16 pb-4 px-4">
      <div className="w-full max-w-6xl h-full">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="h-full bg-white rounded-[24px] shadow-[0_20px_60px_rgba(0,87,184,0.10)] overflow-hidden grid grid-cols-1 lg:grid-cols-[2fr_3fr]"
        >

          {/* ── Left panel ──────────────────────────────────────────────── */}
          <div className="relative hidden lg:flex flex-col justify-between bg-brand-gradient py-10 px-10 overflow-hidden h-full">
            <ArcRings />

            {/* Logo */}
            <div className="relative z-10">
              <img src="/logo.png" alt="INDIWA" className="h-7 brightness-0 invert" />
            </div>

            {/* Main welcome content */}
            <div className="relative z-10">
              <div className="mb-6 select-none">
                <svg width="56" height="56" viewBox="0 0 72 72" fill="none">
                  <line x1="36" y1="4"  x2="36" y2="68" stroke="white" strokeWidth="6" strokeLinecap="round" strokeOpacity="0.9"/>
                  <line x1="4"  y1="36" x2="68" y2="36" stroke="white" strokeWidth="6" strokeLinecap="round" strokeOpacity="0.9"/>
                  <line x1="12" y1="12" x2="60" y2="60" stroke="white" strokeWidth="6" strokeLinecap="round" strokeOpacity="0.9"/>
                  <line x1="60" y1="12" x2="12" y2="60" stroke="white" strokeWidth="6" strokeLinecap="round" strokeOpacity="0.9"/>
                </svg>
              </div>

              <h2 className="text-white text-[40px] font-black leading-[1.1] tracking-tight mb-4">
                {t('login.brand.h2.line1')}<br />
                <span className="text-green-300">{t('login.brand.h2.line2')}</span>
              </h2>
              <p className="text-white/50 text-[14px] leading-relaxed max-w-[260px]">
                {t('login.brand.body')}
              </p>
            </div>

            {/* Copyright */}
            <div className="relative z-10">
              <p className="text-white/25 text-[11px]">{t('nav.copyright')}</p>
            </div>
          </div>

          {/* ── Right: Form panel ───────────────────────────────────────── */}
          <div className="flex flex-col justify-center px-10 sm:px-14 py-10 h-full overflow-y-auto">
            <div className="max-w-[400px] mx-auto w-full">

              <div className="lg:hidden mb-6">
                <img src="/logo.png" alt="INDIWA" className="h-7" />
              </div>

              <div className="mb-8">
                <p className="text-[11px] font-semibold text-brand-blue uppercase tracking-[0.18em] mb-2">
                  Welcome to INDIWA
                </p>
                <h1 className="text-[26px] font-black text-gray-900 leading-tight tracking-tight">
                  {t('login.title')}
                </h1>
                <p className="text-[13px] text-gray-400 mt-1">
                  {t('login.sub')}{' '}
                  <Link to="/register" className="text-brand-blue font-medium hover:underline">
                    {t('login.register.btn')}
                  </Link>
                </p>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2.5 bg-red-50 border border-red-100 rounded-lg px-4 py-2.5 mb-6"
                >
                  <AlertCircle size={14} className="text-red-400 flex-shrink-0" />
                  <p className="text-[12px] font-medium text-red-600">{error}</p>
                </motion.div>
              )}

              <form method="post" className="space-y-6" onSubmit={handleSubmit}>

                {/* Mobile */}
                <div>
                  <label className="block text-[11px] font-medium text-gray-400 mb-2">
                    {t('login.mobile.label')}
                  </label>
                  <div className="flex items-end group">
                    <span className="pb-2 pr-3 text-[13px] text-gray-400 border-b border-gray-200 group-focus-within:border-brand-blue transition-colors">
                      +91
                    </span>
                    <input
                      type="tel"
                      placeholder="98765 43210"
                      value={mobile}
                      onChange={e => { setMobile(e.target.value); setError(''); }}
                      required
                      maxLength={10}
                      className="flex-1 border-0 border-b border-gray-200 group-focus-within:border-brand-blue bg-transparent pb-2 px-3 text-[14px] text-gray-800 placeholder:text-gray-300 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-[11px] font-medium text-gray-400 mb-2">
                    {t('login.password.label')}
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder={t('login.password.placeholder')}
                      value={password}
                      onChange={e => { setPassword(e.target.value); setError(''); }}
                      required
                      className="w-full border-0 border-b border-gray-200 focus:border-brand-blue bg-transparent pb-2 pr-8 text-[14px] text-gray-800 placeholder:text-gray-300 focus:outline-none transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-0 bottom-1.5 text-gray-300 hover:text-gray-500 transition-colors"
                    >
                      {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                  <div className="flex justify-end mt-2">
                    <Link to="#" className="text-[11px] text-gray-400 hover:text-brand-blue transition-colors">
                      {t('login.forgot')}
                    </Link>
                  </div>
                </div>

                {/* Submit */}
                <motion.button
                  whileHover={{ scale: loading ? 1 : 1.005 }}
                  whileTap={{ scale: loading ? 1 : 0.995 }}
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gray-900 hover:bg-brand-blue text-white py-3.5 rounded-xl font-semibold text-[13px] flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading
                    ? <><Loader2 size={14} className="animate-spin" /> Signing in…</>
                    : <><LogIn size={14} /> {t('login.btn')}</>
                  }
                </motion.button>

                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px bg-gray-100" />
                  <span className="text-[10px] text-gray-300 uppercase tracking-widest">{t('login.or')}</span>
                  <div className="flex-1 h-px bg-gray-100" />
                </div>

                <Link to="/register">
                  <motion.div
                    whileHover={{ scale: 1.005 }}
                    whileTap={{ scale: 0.995 }}
                    className="w-full border border-gray-200 hover:border-brand-blue/30 hover:bg-blue-50/40 text-gray-500 hover:text-brand-blue py-3.5 rounded-xl font-semibold text-[13px] text-center transition-all duration-200 cursor-pointer"
                  >
                    {t('login.register.btn')}
                  </motion.div>
                </Link>

              </form>
            </div>
          </div>

        </motion.div>
      </div>
    </div>
  );
};

export default Login;

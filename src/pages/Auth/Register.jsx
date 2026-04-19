import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, ArrowRight, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
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

// ─── Shared input class ───────────────────────────────────────────────────────
const inputCls = (hasError) =>
  `w-full border-0 border-b bg-transparent pb-2 text-[13px] text-gray-800 placeholder:text-gray-300 focus:outline-none transition-colors ${
    hasError ? 'border-red-300 focus:border-red-400' : 'border-gray-200 focus:border-brand-blue'
  }`;

const labelCls = 'block text-[11px] font-medium text-gray-400 mb-2';

const Register = () => {
  const { t } = useLanguage();
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '', email: '', mobile: '', referral: '',
    password: '', confirmPassword: '',
    pincode: '', state: '', district: '',
    position: '',
  });
  const [showPass, setShowPass]             = useState(false);
  const [showConfirm, setShowConfirm]       = useState(false);
  const [pincodeLoading, setPincodeLoading] = useState(false);
  const [pincodeError, setPincodeError]     = useState('');
  const [agreed, setAgreed]                 = useState(false);
  const [loading, setLoading]               = useState(false);
  const [error, setError]                   = useState('');
  const [fieldErrors, setFieldErrors]       = useState({});

  const set = field => e => {
    setForm(f => ({ ...f, [field]: e.target.value }));
    setError('');
    setFieldErrors(fe => ({ ...fe, [field]: '' }));
  };

  const handlePincode = async (e) => {
    const pin = e.target.value.replace(/\D/g, '').slice(0, 6);
    setForm(f => ({ ...f, pincode: pin, state: '', district: '' }));
    setPincodeError('');
    if (pin.length === 6) {
      setPincodeLoading(true);
      try {
        const res  = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
        const data = await res.json();
        if (data[0].Status === 'Success') {
          const post = data[0].PostOffice[0];
          setForm(f => ({ ...f, state: post.State, district: post.District }));
        } else {
          setPincodeError(t('register.pincode.notfound'));
        }
      } catch {
        setPincodeError('Could not fetch location.');
      } finally {
        setPincodeLoading(false);
      }
    }
  };

  const passwordStrength = (p) => {
    if (!p) return null;
    if (p.length < 6)                        return { label: t('register.strength.weak'),   color: 'bg-red-400',      w: 'w-1/3' };
    if (p.length < 10 || !/[0-9]/.test(p))  return { label: t('register.strength.fair'),   color: 'bg-yellow-400',   w: 'w-2/3' };
    return                                          { label: t('register.strength.strong'), color: 'bg-brand-green',  w: 'w-full' };
  };
  const strength = passwordStrength(form.password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setFieldErrors(fe => ({ ...fe, confirmPassword: 'Passwords do not match' }));
      return;
    }
    if (!agreed) { setError('Please accept the terms and conditions to continue.'); return; }
    setError(''); setFieldErrors({}); setLoading(true);
    try {
      await register({
        name:          form.name.trim(),
        email:         form.email.trim(),
        mobile:        form.mobile.trim(),
        password:      form.password,
        referral_code: form.referral.trim() || undefined,
        pincode:       form.pincode   || undefined,
        state:         form.state     || undefined,
        district:      form.district  || undefined,
        position:      form.position  || undefined,
      });
      navigate('/', { replace: true });
    } catch (err) {
      if (err.data?.errors) {
        const fe = {};
        err.data.errors.forEach(e => { fe[e.field] = e.message; });
        setFieldErrors(fe);
      } else {
        setError(err.message || 'Registration failed. Please try again.');
      }
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
                {t('register.brand.h2.line1')}<br />
                <span className="text-green-300">{t('register.brand.h2.line2')}</span>
              </h2>
              <p className="text-white/50 text-[14px] leading-relaxed max-w-[260px]">
                {t('register.brand.body')}
              </p>
            </div>

            {/* Copyright */}
            <div className="relative z-10">
              <p className="text-white/25 text-[11px]">{t('nav.copyright')}</p>
            </div>
          </div>

          {/* ── Right: Form panel ───────────────────────────────────────── */}
          <div className="flex flex-col justify-center px-10 sm:px-12 py-8 h-full overflow-y-auto">
            <div className="w-full">

              <div className="lg:hidden mb-5">
                <img src="/logo.png" alt="INDIWA" className="h-7" />
              </div>

              <div className="mb-6">
                <h1 className="text-[24px] font-black text-gray-900 tracking-tight">
                  {t('register.title')}
                </h1>
                <p className="text-[13px] text-gray-400 mt-1">
                  {t('register.sub')}{' '}
                  <Link to="/login" className="text-brand-blue font-medium hover:underline">
                    {t('register.login.link')}
                  </Link>
                </p>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2.5 bg-red-50 border border-red-100 rounded-lg px-4 py-2.5 mb-5"
                >
                  <AlertCircle size={14} className="text-red-400 flex-shrink-0" />
                  <p className="text-[12px] font-medium text-red-600">{error}</p>
                </motion.div>
              )}

              <form method="post" className="space-y-5" onSubmit={handleSubmit}>

                {/* Row 1: Name + Email */}
                <div className="grid grid-cols-2 gap-x-8">
                  <div>
                    <label className={labelCls}>{t('register.name.label')} <span className="text-brand-green">*</span></label>
                    <input type="text" placeholder={t('register.name.placeholder')} value={form.name} onChange={set('name')} required
                      className={inputCls(fieldErrors.name)} />
                    {fieldErrors.name && <p className="text-[11px] text-red-400 mt-1">{fieldErrors.name}</p>}
                  </div>
                  <div>
                    <label className={labelCls}>{t('register.email.label')} <span className="text-brand-green">*</span></label>
                    <input type="email" placeholder={t('register.email.placeholder')} value={form.email} onChange={set('email')} required
                      className={inputCls(fieldErrors.email)} />
                    {fieldErrors.email && <p className="text-[11px] text-red-400 mt-1">{fieldErrors.email}</p>}
                  </div>
                </div>

                {/* Row 2: Mobile + Referral */}
                <div className="grid grid-cols-2 gap-x-8">
                  <div>
                    <label className={labelCls}>{t('register.mobile.label')} <span className="text-brand-green">*</span></label>
                    <div className="flex items-end group">
                      <span className="pb-2 pr-2 text-[13px] text-gray-400 border-b border-gray-200 group-focus-within:border-brand-blue transition-colors">+91</span>
                      <input type="tel" placeholder="98765 43210" value={form.mobile} onChange={set('mobile')} required maxLength={10}
                        className={`flex-1 ${inputCls(fieldErrors.mobile)} px-2`} />
                    </div>
                    {fieldErrors.mobile && <p className="text-[11px] text-red-400 mt-1">{fieldErrors.mobile}</p>}
                  </div>
                  <div>
                    <label className={labelCls}>{t('register.referral.label')} <span className="text-brand-green text-[10px] font-semibold">({t('register.referral.required')})</span></label>
                    <input type="text" placeholder={t('register.referral.placeholder')} value={form.referral} onChange={set('referral')}
                      className={inputCls(fieldErrors.referral_code)} />
                    {fieldErrors.referral_code && <p className="text-[11px] text-red-400 mt-1">{fieldErrors.referral_code}</p>}
                  </div>
                </div>

                {/* Row 3: Password + Confirm */}
                <div className="grid grid-cols-2 gap-x-8">
                  <div>
                    <label className={labelCls}>{t('register.password.label')} <span className="text-brand-green">*</span></label>
                    <div className="relative">
                      <input type={showPass ? 'text' : 'password'} placeholder={t('register.password.placeholder')} value={form.password} onChange={set('password')} required
                        className={`${inputCls(fieldErrors.password)} pr-6`} />
                      <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-0 bottom-1.5 text-gray-300 hover:text-gray-500 transition-colors">
                        {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                    </div>
                    {strength && (
                      <div className="flex items-center gap-2 mt-1.5">
                        <div className="flex-1 h-0.5 bg-gray-100 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full transition-all duration-500 ${strength.color} ${strength.w}`} />
                        </div>
                        <span className={`text-[10px] font-medium flex-shrink-0 ${strength.label === t('register.strength.strong') ? 'text-brand-green' : strength.label === t('register.strength.fair') ? 'text-yellow-500' : 'text-red-400'}`}>
                          {strength.label}
                        </span>
                      </div>
                    )}
                  </div>
                  <div>
                    <label className={labelCls}>{t('register.confirm.label')} <span className="text-brand-green">*</span></label>
                    <div className="relative">
                      <input
                        type={showConfirm ? 'text' : 'password'}
                        placeholder={t('register.confirm.placeholder')}
                        value={form.confirmPassword}
                        onChange={set('confirmPassword')}
                        required
                        className={`${inputCls(fieldErrors.confirmPassword || (form.confirmPassword && form.password !== form.confirmPassword))} pr-12`}
                      />
                      {form.confirmPassword && form.password === form.confirmPassword && (
                        <CheckCircle2 size={13} className="absolute right-6 bottom-2 text-brand-green" />
                      )}
                      <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-0 bottom-1.5 text-gray-300 hover:text-gray-500 transition-colors">
                        {showConfirm ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                    </div>
                    {(fieldErrors.confirmPassword || (form.confirmPassword && form.password !== form.confirmPassword)) && (
                      <p className="text-[11px] text-red-400 mt-1">Passwords do not match</p>
                    )}
                  </div>
                </div>

                {/* Row 4: Pincode + Location */}
                <div className="grid grid-cols-2 gap-x-8">
                  <div>
                    <label className={labelCls}>{t('register.pincode.label')} <span className="text-brand-green">*</span></label>
                    <div className="relative">
                      <input type="text" placeholder={t('register.pincode.placeholder')} value={form.pincode} onChange={handlePincode} maxLength={6}
                        className={`${inputCls(!!pincodeError)} pr-6`} />
                      <div className="absolute right-0 bottom-1.5">
                        {pincodeLoading && <Loader2 size={13} className="text-brand-blue animate-spin" />}
                        {!pincodeLoading && form.state && <CheckCircle2 size={13} className="text-brand-green" />}
                      </div>
                    </div>
                    {pincodeError && <p className="text-[11px] text-red-400 mt-1">{pincodeError}</p>}
                  </div>

                  <div>
                    <label className={labelCls}>{t('register.state.label')} / {t('register.district.label')}</label>
                    {form.state ? (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 pb-2 border-b border-brand-green/30">
                        <CheckCircle2 size={12} className="text-brand-green flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="text-[13px] font-medium text-gray-800 truncate">{form.district}</p>
                          <p className="text-[11px] text-gray-400 truncate">{form.state}</p>
                        </div>
                      </motion.div>
                    ) : (
                      <div className="pb-2 border-b border-gray-200">
                        <p className="text-[13px] text-gray-300">{t('register.pincode.fetching')}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Row 5: Position */}
                <div>
                  <label className={labelCls}>{t('register.position.label')} <span className="text-brand-green">*</span></label>
                  <div className="flex rounded-xl border border-gray-200 overflow-hidden">
                    {[
                      { val: 'Left',  label: t('register.position.left')  },
                      { val: 'Right', label: t('register.position.right') },
                    ].map(({ val, label }, idx) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => { setForm(f => ({ ...f, position: val })); setFieldErrors(fe => ({ ...fe, position: '' })); }}
                        className={`flex-1 py-2.5 text-[13px] font-semibold transition-all duration-150 ${
                          form.position === val
                            ? 'bg-brand-blue text-white'
                            : 'text-gray-400 hover:bg-gray-50'
                        } ${idx === 1 ? 'border-l border-gray-200' : ''}`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Terms */}
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div
                    onClick={() => setAgreed(!agreed)}
                    className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all ${agreed ? 'bg-brand-blue border-brand-blue' : 'border-gray-300 group-hover:border-gray-400'}`}
                  >
                    {agreed && (
                      <svg width="8" height="7" viewBox="0 0 10 8" fill="none">
                        <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                  <span className="text-[12px] text-gray-500">
                    {t('register.terms')}{' '}
                    <Link to="#" className="text-brand-blue hover:underline font-medium">{t('register.terms.link')}</Link>
                  </span>
                </label>

                {/* Submit */}
                <motion.button
                  whileHover={{ scale: loading ? 1 : 1.005 }}
                  whileTap={{ scale: loading ? 1 : 0.995 }}
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gray-900 hover:bg-brand-blue text-white py-3.5 rounded-xl font-semibold text-[13px] flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading
                    ? <><Loader2 size={14} className="animate-spin" /> Creating account…</>
                    : <>{t('register.btn')} <ArrowRight size={14} /></>
                  }
                </motion.button>

                <p className="text-center text-[12px] text-gray-400 pb-1">
                  {t('register.login')}{' '}
                  <Link to="/login" className="text-brand-blue font-medium hover:underline">
                    {t('register.login.link')}
                  </Link>
                </p>

              </form>
            </div>
          </div>

        </motion.div>
      </div>
    </div>
  );
};

export default Register;

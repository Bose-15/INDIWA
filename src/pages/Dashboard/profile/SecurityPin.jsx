import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Lock, Eye, EyeOff, Loader2, CheckCircle2, AlertCircle,
  ShieldCheck, Key, RefreshCcw, AlertTriangle
} from 'lucide-react';
import { authApi } from '../../../api/auth';

const PasswordInput = ({ label, value, onChange, show, onToggle, placeholder }) => (
  <div className="space-y-1.5">
    <label className="text-[10px] font-black uppercase tracking-[0.18em] text-gray-600">{label}</label>
    <div className="relative group">
      <Lock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-brand-blue transition-colors pointer-events-none" />
      <input
        type={show ? 'text' : 'password'} value={value} onChange={onChange} placeholder={placeholder}
        className="w-full pl-10 pr-11 py-3.5 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-800 placeholder:text-gray-300 focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10 transition-all"
      />
      <button type="button" onClick={onToggle}
        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-blue transition-colors p-0.5">
        {show ? <EyeOff size={14} /> : <Eye size={14} />}
      </button>
    </div>
  </div>
);

const getStrength = (p) => {
  if (!p) return null;
  if (p.length < 6) return { label: 'Weak',   color: 'bg-red-400',   w: '33%', text: 'text-red-500'     };
  if (p.length < 10 || !/[0-9]/.test(p)) return { label: 'Fair', color: 'bg-yellow-400', w: '66%', text: 'text-yellow-600' };
  if (/[!@#$%^&*]/.test(p)) return { label: 'Strong', color: 'bg-brand-green', w: '100%', text: 'text-brand-green' };
  return { label: 'Good', color: 'bg-emerald-400', w: '85%', text: 'text-emerald-600' };
};

const RULES = [
  { test: p => p.length >= 8,        label: '8+ characters'  },
  { test: p => /[A-Z]/.test(p),      label: 'Uppercase'      },
  { test: p => /[a-z]/.test(p),      label: 'Lowercase'      },
  { test: p => /[0-9]/.test(p),      label: 'Number'         },
  { test: p => /[!@#$%^&*]/.test(p), label: 'Special char'   },
];

const SecurityPin = () => {
  const [form, setForm]       = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [show, setShow]       = useState({ current: false, new: false, confirm: false });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError]     = useState('');

  const str      = getStrength(form.newPassword);
  const mismatch = form.confirmPassword && form.newPassword !== form.confirmPassword;

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (mismatch) { setError('Passwords do not match.'); return; }
    if (form.newPassword.length < 8) { setError('Password must be at least 8 characters.'); return; }
    setError(''); setSuccess(false); setLoading(true);
    try {
      await authApi.changePassword({ currentPassword: form.currentPassword, newPassword: form.newPassword });
      setSuccess(true);
      setForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setTimeout(() => setSuccess(false), 4000);
    } catch (err) {
      setError(err.message || 'Failed to change password.');
    } finally { setLoading(false); }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">

      {/* ── Left: Info panel ───────────────────────────────────────── */}
      <div className="xl:col-span-1 space-y-4">
        <div className="dash-card overflow-hidden">
          <div className="p-6 text-center relative overflow-hidden" style={{background: 'linear-gradient(135deg, #faf5ff 0%, #f0e6ff 100%)'}}>
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-white border-2 border-violet-200 flex items-center justify-center mx-auto shadow-sm">
                <ShieldCheck size={28} className="text-violet-600" />
              </div>
              <h3 className="text-gray-900 font-semibold text-[13px] uppercase tracking-wider mt-4">Security</h3>
              <p className="text-gray-400 text-[11px] font-medium mt-1.5 px-2 leading-relaxed">
                Keep your account safe with a strong password
              </p>
            </div>
          </div>
          <div className="p-5 space-y-0.5">
            {[
              { icon: Key,         label: 'Last Changed', value: 'Not recently'        },
              { icon: ShieldCheck, label: 'Strength',     value: 'Set strong password' },
              { icon: RefreshCcw,  label: 'Devices',      value: 'All sign out on change' },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-3 py-2.5 border-b border-gray-50 last:border-0">
                <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <Icon size={13} className="text-gray-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 leading-none">{label}</p>
                  <p className="text-[12px] font-bold text-gray-700 mt-0.5">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="dash-card p-5 flex items-start gap-3 border-amber-100 bg-amber-50/50">
          <AlertTriangle size={15} className="text-amber-500 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-[11px] font-black uppercase tracking-widest text-amber-800">Important</p>
            <p className="text-[11px] font-medium text-amber-700 mt-1 leading-relaxed">
              Changing your password signs you out of all other devices immediately.
            </p>
          </div>
        </div>
      </div>

      {/* ── Right: Password form ───────────────────────────────────── */}
      <div className="xl:col-span-2">
        <div className="dash-card overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl grad-violet flex items-center justify-center">
              <Lock size={15} className="text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-[13px] uppercase tracking-tight text-gray-700">Change Password</h2>
              <p className="text-[12px] font-medium text-gray-400 mt-0.5">Use a strong mix of letters, numbers and symbols.</p>
            </div>
          </div>

          <div className="p-6 space-y-5">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="flex-1 h-px bg-gray-100" />
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-300 px-1">Current Password</span>
                <div className="flex-1 h-px bg-gray-100" />
              </div>
              <PasswordInput
                label="Current Password" value={form.currentPassword}
                onChange={e => { setForm(f => ({ ...f, currentPassword: e.target.value })); setError(''); }}
                show={show.current} onToggle={() => setShow(s => ({ ...s, current: !s.current }))}
                placeholder="Enter current password"
              />
            </div>

            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="flex-1 h-px bg-gray-100" />
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-300 px-1">New Password</span>
                <div className="flex-1 h-px bg-gray-100" />
              </div>
              <div className="space-y-4">
                <PasswordInput
                  label="New Password" value={form.newPassword}
                  onChange={e => { setForm(f => ({ ...f, newPassword: e.target.value })); setError(''); }}
                  show={show.new} onToggle={() => setShow(s => ({ ...s, new: !s.new }))}
                  placeholder="Min. 8 characters"
                />

                {form.newPassword && (
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div className={`h-full rounded-full ${str?.color}`}
                          initial={{ width: 0 }} animate={{ width: str?.w || 0 }} transition={{ duration: 0.4 }} />
                      </div>
                      <span className={`text-[9px] font-black uppercase tracking-widest w-12 text-right ${str?.text}`}>{str?.label}</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
                      {RULES.map(({ test, label }) => {
                        const ok = test(form.newPassword);
                        return (
                          <div key={label} className={`flex items-center gap-1.5 text-[10px] font-bold ${ok ? 'text-brand-green' : 'text-gray-400'}`}>
                            <CheckCircle2 size={11} className={ok ? 'text-brand-green' : 'text-gray-200'} />
                            {label}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                <PasswordInput
                  label="Confirm New Password" value={form.confirmPassword}
                  onChange={e => { setForm(f => ({ ...f, confirmPassword: e.target.value })); setError(''); }}
                  show={show.confirm} onToggle={() => setShow(s => ({ ...s, confirm: !s.confirm }))}
                  placeholder="Re-enter new password"
                />
                {mismatch && (
                  <p className="text-[11px] font-bold text-red-400 flex items-center gap-1.5">
                    <AlertCircle size={12} /> Passwords do not match
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="px-6 py-4 bg-gray-50/80 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <AnimatePresence mode="wait">
                {error && <motion.p key="e" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="text-[12px] font-bold text-red-500 flex items-center gap-1.5"><AlertCircle size={13} />{error}</motion.p>}
                {success && <motion.p key="s" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="text-[12px] font-bold text-emerald-600 flex items-center gap-1.5"><CheckCircle2 size={13} />Password changed!</motion.p>}
                {!error && !success && <p key="h" className="text-[11px] text-gray-400 font-medium">All other sessions will be terminated.</p>}
              </AnimatePresence>
            </div>
            <button onClick={handleSubmit}
              disabled={loading || !form.currentPassword || !form.newPassword || !form.confirmPassword || !!mismatch}
              className="flex items-center gap-2 px-6 py-3 grad-violet text-white rounded-xl font-black text-[11px] uppercase tracking-widest glow-violet hover:opacity-90 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {loading ? <><Loader2 size={13} className="animate-spin" /> Updating…</> : <><Lock size={13} /> Update Password</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityPin;

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, Mail, Phone, MapPin, Loader2, CheckCircle2,
  AlertCircle, Save, Lock, Calendar, BadgeCheck, ShieldCheck
} from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { membersApi } from '../../../api/members';

// ─── Locked field ─────────────────────────────────────────────────────────────
const LockedField = ({ label, value, icon: Icon }) => (
  <div className="space-y-1.5">
    <label className="text-[10px] font-black uppercase tracking-[0.18em] text-gray-400 flex items-center gap-1.5">
      {label} <Lock size={9} className="text-gray-300" />
    </label>
    <div className="flex items-center gap-3 px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl cursor-not-allowed">
      {Icon && <Icon size={15} className="text-gray-300 flex-shrink-0" />}
      <span className="text-sm font-semibold text-gray-400 truncate">{value || '—'}</span>
    </div>
  </div>
);

// ─── Editable field ───────────────────────────────────────────────────────────
const EditField = ({ label, value, onChange, icon: Icon, placeholder, type = 'text', maxLength, suffix }) => (
  <div className="space-y-1.5">
    <label className="text-[10px] font-black uppercase tracking-[0.18em] text-gray-600">{label}</label>
    <div className="relative group">
      {Icon && <Icon size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-brand-blue transition-colors pointer-events-none" />}
      <input
        type={type} value={value} onChange={onChange} placeholder={placeholder} maxLength={maxLength}
        className="w-full pl-10 pr-10 py-3.5 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-800 placeholder:text-gray-300 focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10 transition-all"
      />
      {suffix && <div className="absolute right-3 top-1/2 -translate-y-1/2">{suffix}</div>}
    </div>
  </div>
);

const PersonalInfo = () => {
  const { user, setUser } = useAuth();
  const [form, setForm]   = useState({ name: '', pincode: '', state: '', district: '', position: '' });
  const [loading, setLoading]   = useState(false);
  const [success, setSuccess]   = useState(false);
  const [error, setError]       = useState('');
  const [pincodeLoading, setPincodeLoading] = useState(false);

  useEffect(() => {
    if (user) setForm({
      name: user.name || '', pincode: user.pincode || '',
      state: user.state || '', district: user.district || '', position: user.position || '',
    });
  }, [user]);

  const handlePincode = async (e) => {
    const pin = e.target.value.replace(/\D/g, '').slice(0, 6);
    setForm(f => ({ ...f, pincode: pin, state: '', district: '' }));
    if (pin.length === 6) {
      setPincodeLoading(true);
      try {
        const res  = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
        const data = await res.json();
        if (data[0].Status === 'Success') {
          const p = data[0].PostOffice[0];
          setForm(f => ({ ...f, state: p.State, district: p.District }));
        }
      } catch { /* ignore */ } finally { setPincodeLoading(false); }
    }
  };

  const handleSave = async () => {
    if (!form.name.trim()) { setError('Full name is required.'); return; }
    setError(''); setSuccess(false); setLoading(true);
    try {
      const { data } = await membersApi.updateMe({
        name: form.name.trim(),
        pincode: form.pincode || undefined,
        state: form.state || undefined,
        district: form.district || undefined,
        position: form.position || undefined,
      });
      setUser(prev => ({ ...prev, ...data }));
      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
    } catch (err) {
      setError(err.message || 'Failed to update profile.');
    } finally { setLoading(false); }
  };

  const joinDate = user?.created_at
    ? new Date(user.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    : '—';

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">

      {/* ── Left: Account summary ──────────────────────────────────── */}
      <div className="xl:col-span-1 space-y-4">

        {/* Avatar card */}
        <div className="dash-card overflow-hidden">
          <div className="p-6 text-center relative overflow-hidden" style={{background: 'linear-gradient(135deg, #f0f7ff 0%, #e8f2fd 100%)'}}>
            <div className="relative z-10">
              <div className="w-20 h-20 rounded-2xl bg-white border-2 border-brand-blue/20 flex items-center justify-center font-black text-brand-blue text-3xl mx-auto shadow-sm">
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              <h3 className="text-gray-900 font-semibold text-[13px] uppercase tracking-wider mt-4 leading-none">{user?.name}</h3>
              <p className="text-gray-400 font-mono text-[11px] mt-1.5">{user?.member_id}</p>
              <span className={`inline-flex items-center gap-1.5 mt-3 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                user?.status === 'active' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' : 'bg-yellow-100 text-yellow-700 border border-yellow-200'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${user?.status === 'active' ? 'bg-emerald-400' : 'bg-yellow-400'}`} />
                {user?.status}
              </span>
            </div>
          </div>

          <div className="p-5 space-y-0.5">
            {[
              { icon: BadgeCheck, label: 'Member ID', value: user?.member_id },
              { icon: User,       label: 'Role',      value: user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : '—' },
              { icon: Calendar,   label: 'Joined',    value: joinDate },
              { icon: MapPin,     label: 'Location',  value: user?.district ? `${user.district}, ${user.state}` : '—' },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-3 py-2.5 border-b border-gray-50 last:border-0">
                <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <Icon size={13} className="text-gray-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 leading-none">{label}</p>
                  <p className="text-[12px] font-bold text-gray-700 mt-0.5 truncate">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* KYC status */}
        <div className="dash-card p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center">
              <ShieldCheck size={15} className="text-amber-600" />
            </div>
            <div>
              <p className="text-[11px] font-black uppercase tracking-widest text-gray-700">KYC Status</p>
              <p className="text-[10px] font-medium text-amber-600 mt-0.5">Verification Pending</p>
            </div>
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full w-1/3 bg-amber-400 rounded-full" />
          </div>
          <p className="text-[10px] font-medium text-gray-400 mt-2">Complete KYC to unlock all features</p>
        </div>
      </div>

      {/* ── Right: Edit form ────────────────────────────────────────── */}
      <div className="xl:col-span-2">
        <div className="dash-card overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl grad-blue flex items-center justify-center">
              <User size={15} className="text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-[13px] uppercase tracking-tight text-gray-700">Edit Profile</h2>
              <p className="text-[12px] font-medium text-gray-400 mt-0.5">Fields marked * are required. Locked fields require support to change.</p>
            </div>
          </div>

          <div className="p-6 space-y-6">

            {/* Locked fields */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-6 rounded-lg bg-gray-100 flex items-center justify-center">
                  <Lock size={10} className="text-gray-400" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Account Info — Read Only</span>
                <div className="flex-1 h-px bg-gray-100" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <LockedField label="Member ID"    value={user?.member_id} icon={BadgeCheck} />
                <LockedField label="Mobile"       value={user?.mobile}    icon={Phone}      />
              </div>
              <div className="mt-4">
                <LockedField label="Email Address" value={user?.email}    icon={Mail}       />
              </div>
            </div>

            {/* Editable fields */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-1 h-px bg-gray-100" />
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-300 px-1">Personal Details</span>
                <div className="flex-1 h-px bg-gray-100" />
              </div>
              <div className="space-y-4">

                <EditField
                  label="Full Name *" value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  icon={User} placeholder="Enter your full name"
                />

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <EditField
                    label="Pincode" value={form.pincode} onChange={handlePincode}
                    icon={MapPin} placeholder="600001" maxLength={6}
                    suffix={
                      pincodeLoading ? <Loader2 size={14} className="text-brand-blue animate-spin" /> :
                      form.state     ? <CheckCircle2 size={14} className="text-emerald-500" />       : null
                    }
                  />
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-[0.18em] text-gray-600">State</label>
                    <div className={`flex items-center gap-2 px-4 py-3.5 rounded-xl border text-sm font-semibold transition-all ${
                      form.state ? 'bg-emerald-50 border-emerald-200 text-gray-700' : 'bg-gray-50 border-gray-200 text-gray-400'
                    }`}>
                      {form.state ? <CheckCircle2 size={13} className="text-emerald-500 flex-shrink-0" /> : <MapPin size={13} className="text-gray-300 flex-shrink-0" />}
                      <span className="truncate">{form.state || 'Auto-filled'}</span>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-[0.18em] text-gray-600">District</label>
                    <div className={`flex items-center gap-2 px-4 py-3.5 rounded-xl border text-sm font-semibold transition-all ${
                      form.district ? 'bg-emerald-50 border-emerald-200 text-gray-700' : 'bg-gray-50 border-gray-200 text-gray-400'
                    }`}>
                      {form.district ? <CheckCircle2 size={13} className="text-emerald-500 flex-shrink-0" /> : <MapPin size={13} className="text-gray-300 flex-shrink-0" />}
                      <span className="truncate">{form.district || 'Auto-filled'}</span>
                    </div>
                  </div>
                </div>

                {/* Position selector */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.18em] text-gray-600">Binary Position</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['Left', 'Right'].map(val => (
                      <label key={val} className="cursor-pointer group">
                        <input type="radio" name="position" value={val} checked={form.position === val} onChange={e => setForm(f => ({ ...f, position: e.target.value }))} className="sr-only" />
                        <div className={`flex items-center justify-center gap-2.5 py-3.5 rounded-xl border-2 font-black text-[12px] uppercase tracking-widest transition-all duration-200 ${
                          form.position === val
                            ? 'grad-blue border-transparent text-white shadow-[0_4px_14px_rgba(0,124,193,0.4)]'
                            : 'bg-gray-50 border-gray-200 text-gray-400 hover:border-brand-blue/30 hover:text-gray-600'
                        }`}>
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${form.position === val ? 'border-white' : 'border-gray-300'}`}>
                            {form.position === val && <div className="w-2 h-2 rounded-full bg-white" />}
                          </div>
                          {val} Leg
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50/80 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <AnimatePresence mode="wait">
                {error && (
                  <motion.p key="err" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="text-[12px] font-bold text-red-500 flex items-center gap-1.5">
                    <AlertCircle size={13} /> {error}
                  </motion.p>
                )}
                {success && (
                  <motion.p key="ok" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="text-[12px] font-bold text-emerald-600 flex items-center gap-1.5">
                    <CheckCircle2 size={13} /> Profile updated successfully!
                  </motion.p>
                )}
                {!error && !success && (
                  <p key="hint" className="text-[11px] text-gray-400 font-medium">Changes are saved to your account immediately.</p>
                )}
              </AnimatePresence>
            </div>
            <button onClick={handleSave} disabled={loading}
              className="flex items-center gap-2 px-6 py-3 grad-blue text-white rounded-xl font-black text-[11px] uppercase tracking-widest glow-blue hover:opacity-90 active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {loading ? <><Loader2 size={13} className="animate-spin" /> Saving…</> : <><Save size={13} /> Save Changes</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;

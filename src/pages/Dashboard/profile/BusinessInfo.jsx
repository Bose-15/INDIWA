import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Gift, Copy, CheckCircle2, Share2, ArrowLeftRight,
  Link as LinkIcon, BadgeCheck, Users, GitBranch
} from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

const InfoRow = ({ label, value, mono }) => (
  <div className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{label}</p>
    <p className={`text-[13px] font-bold text-gray-800 truncate max-w-[55%] text-right ${mono ? 'font-mono tracking-widest' : ''}`}>{value || '—'}</p>
  </div>
);

const BusinessInfo = () => {
  const { user } = useAuth();
  const [copied, setCopied]         = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const referralLink = `${window.location.origin}/register?ref=${user?.referral_code || ''}`;

  const copyCode = () => {
    navigator.clipboard?.writeText(user?.referral_code || '');
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };
  const copyLink = () => {
    navigator.clipboard?.writeText(referralLink);
    setCopiedLink(true); setTimeout(() => setCopiedLink(false), 2000);
  };
  const shareLink = async () => {
    if (navigator.share) {
      try { await navigator.share({ title: 'Join INDIWA', text: `Use my referral code: ${user?.referral_code}`, url: referralLink }); }
      catch { /* cancelled */ }
    } else { copyLink(); }
  };

  const joinDate = user?.created_at
    ? new Date(user.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
    : '—';

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">

      {/* ── Left: Referral card ────────────────────────────────────── */}
      <div className="xl:col-span-1 space-y-4">

        {/* Referral code hero */}
        <div className="dash-card overflow-hidden">
          <div className="px-6 py-6 relative overflow-hidden" style={{background: 'linear-gradient(135deg, #f0fdf6 0%, #dcfceb 100%)'}}>
            <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-brand-green/[0.06] pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <Gift size={15} className="text-brand-green" />
                <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.25em]">Referral Code</p>
              </div>
              <p className="text-gray-900 text-[30px] font-black tracking-[0.18em] leading-none">{user?.referral_code || '——'}</p>
            </div>
          </div>
          <div className="p-4 space-y-3">
            <div className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 flex items-center gap-2">
              <LinkIcon size={12} className="text-gray-400 flex-shrink-0" />
              <p className="text-[10px] font-mono text-gray-500 truncate flex-1">{referralLink}</p>
              <button onClick={copyLink} className="text-gray-400 hover:text-brand-blue transition-colors flex-shrink-0">
                {copiedLink ? <CheckCircle2 size={13} className="text-emerald-500" /> : <Copy size={13} />}
              </button>
            </div>
            <AnimatePresence mode="wait">
              <motion.button
                key={copied ? 'c' : 'u'}
                initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
                whileTap={{ scale: 0.95 }} onClick={copyCode}
                className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-black text-[11px] uppercase tracking-widest transition-all ${
                  copied ? 'bg-emerald-500 text-white' : 'grad-blue text-white glow-blue hover:opacity-90'
                }`}
              >
                {copied ? <><CheckCircle2 size={12} /> Copied!</> : <><Copy size={12} /> Copy Code</>}
              </motion.button>
            </AnimatePresence>
            <button onClick={shareLink}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-white border border-gray-200 rounded-xl font-black text-[11px] uppercase tracking-widest text-gray-600 hover:border-brand-blue hover:text-brand-blue transition-all"
            >
              <Share2 size={12} /> Share Link
            </button>
          </div>
        </div>

        {/* Mini stats */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: Users,     label: 'Referrals', value: '0',                   bg: 'bg-brand-blue/10', color: 'text-brand-blue'  },
            { icon: GitBranch, label: 'Position',  value: user?.position || '—',  bg: 'bg-violet-100',     color: 'text-violet-600'  },
          ].map(({ icon: Icon, label, value, bg, color }) => (
            <div key={label} className="dash-card p-4 text-center">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center mx-auto mb-2.5 ${bg}`}>
                <Icon size={15} className={color} />
              </div>
              <p className="text-[9px] font-black uppercase tracking-widest text-gray-400">{label}</p>
              <p className="text-[17px] font-black text-gray-900 mt-0.5">{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right: Details + Binary ────────────────────────────────── */}
      <div className="xl:col-span-2 space-y-4">

        {/* Business details */}
        <div className="dash-card overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl grad-green flex items-center justify-center">
              <Gift size={15} className="text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-[13px] uppercase tracking-tight text-gray-700">Business Details</h2>
              <p className="text-[11px] font-medium text-gray-400 mt-0.5">Your account and network information</p>
            </div>
          </div>
          <div className="px-6 py-2">
            <InfoRow label="Member ID"   value={user?.member_id} mono />
            <InfoRow label="Position"    value={user?.position} />
            <InfoRow label="Role"        value={user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : ''} />
            <InfoRow label="Status"      value={user?.status ? user.status.charAt(0).toUpperCase() + user.status.slice(1) : ''} />
            <InfoRow label="Joined"      value={joinDate} />
            <InfoRow label="Referred By" value={user?.referred_by || 'Direct Join'} mono={!!user?.referred_by} />
            <InfoRow label="Pincode"     value={user?.pincode} mono />
            <InfoRow label="District"    value={user?.district} />
            <InfoRow label="State"       value={user?.state} />
          </div>
        </div>

        {/* Binary position */}
        <div className="dash-card overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl grad-violet flex items-center justify-center">
              <ArrowLeftRight size={15} className="text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-[13px] uppercase tracking-tight text-gray-700">Binary Position</h2>
              <p className="text-[11px] font-medium text-gray-400 mt-0.5">Your placement in the network tree</p>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4">
              {['Left', 'Right'].map(side => {
                const active = user?.position === side;
                const isLeft = side === 'Left';
                return (
                  <div key={side} className={`rounded-2xl p-6 border-2 text-center transition-all ${
                    active
                      ? isLeft
                        ? 'border-transparent grad-blue text-white shadow-[0_4px_20px_rgba(0,124,193,0.3)]'
                        : 'border-transparent grad-violet text-white shadow-[0_4px_20px_rgba(124,58,237,0.3)]'
                      : 'border-gray-100 bg-gray-50'
                  }`}>
                    <div className={`w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center font-black text-base ${
                      active ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-400'
                    }`}>{side.charAt(0)}</div>
                    <p className={`font-black text-[12px] uppercase tracking-widest ${active ? 'text-white' : 'text-gray-400'}`}>{side} Leg</p>
                    {active && <span className="inline-block mt-2 text-[9px] font-black text-white/70 bg-white/20 px-2.5 py-1 rounded-full uppercase tracking-widest">Your Position</span>}
                  </div>
                );
              })}
            </div>
            {!user?.position && (
              <p className="text-center text-[11px] font-medium text-gray-400 mt-4">No position set. Update Personal Info to assign one.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessInfo;

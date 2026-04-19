import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck, Calendar, Gift, ArrowUpRight,
  TrendingUp, TrendingDown, UserCheck, BadgeCheck,
  Copy, CheckCircle2, GitBranch, BarChart3,
  Zap, Lock,
  Users2, LayoutGrid, Tag,
  PlusCircle, ArrowDownLeft, MonitorPlay, CalendarDays
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

// ─── Corelystic-style white stat card ────────────────────────────────────────
const StatCard = ({ icon: Icon, iconBg, iconColor, label, value, trend, trendUp = true, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="stat-card"
  >
    <div className="flex items-start justify-between mb-5">
      <p className="text-[12px] font-semibold text-gray-400 uppercase tracking-wider">{label}</p>
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${iconBg}`}>
        <Icon size={18} className={iconColor} />
      </div>
    </div>
    <p className="text-[26px] font-black text-gray-900 tracking-tight leading-none">{value}</p>
    {trend && (
      <p className={`flex items-center gap-1 text-[12px] font-semibold mt-3 ${trendUp ? 'text-brand-green' : 'text-red-500'}`}>
        {trendUp ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
        {trend}
      </p>
    )}
  </motion.div>
);

// ─── Quick action card (small icon grid) ─────────────────────────────────────
const ActionCard = ({ icon: Icon, iconBg, iconColor, label, desc, to, delay = 0 }) => (
  <Link to={to}>
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ y: -2 }}
      className="dash-card p-4 group cursor-pointer hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-all duration-200 h-full"
    >
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${iconBg}`}>
        <Icon size={17} className={iconColor} />
      </div>
      <p className="font-semibold text-[12px] text-gray-800 group-hover:text-brand-blue transition-colors leading-snug">{label}</p>
      <p className="text-[11px] text-gray-400 mt-0.5">{desc}</p>
    </motion.div>
  </Link>
);

// ─── Quick link row (Corelystic screenshot style) ─────────────────────────────
const QuickLink = ({ icon: Icon, label, to, delay = 0 }) => (
  <Link to={to}>
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      className="quick-link group"
    >
      <div className="flex items-center gap-3.5">
        <div className="w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-brand-blue/10 flex items-center justify-center flex-shrink-0 transition-colors">
          <Icon size={15} className="text-gray-500 group-hover:text-brand-blue transition-colors" />
        </div>
        <span className="text-[13px] font-semibold text-gray-700 group-hover:text-brand-blue transition-colors">{label}</span>
      </div>
      <ArrowUpRight size={15} className="text-gray-300 group-hover:text-brand-blue group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0" />
    </motion.div>
  </Link>
);

// ─── Component ────────────────────────────────────────────────────────────────
const DashboardHome = () => {
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);

  const firstName = user?.name?.split(' ')[0] || 'Member';

  const todayStr = new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  const joinDate = user?.created_at
    ? new Date(user.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    : '—';

  const copyReferral = () => {
    navigator.clipboard?.writeText(user?.referral_code || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Account health checklist
  const checklist = [
    { label: 'Account Registered', done: true },
    { label: 'Personal Info',      done: !!user?.name },
    { label: 'KYC Documents',      done: false },
    { label: 'Binary Position',    done: !!user?.position },
  ];

  return (
    <div className="space-y-5">

      {/* ── Welcome Banner ─────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-2xl border border-gray-100 px-6 py-5 relative overflow-hidden shadow-[0_1px_8px_rgba(0,0,0,0.04)]"
      >
        {/* Abstract decorative circles */}
        <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-brand-blue/[0.04] pointer-events-none" />
        <div className="absolute top-4 right-20 w-20 h-20 rounded-full bg-brand-blue/[0.03] pointer-events-none" />
        <div className="absolute -bottom-8 right-8 w-28 h-28 rounded-full bg-brand-green/[0.04] pointer-events-none" />

        <div className="relative z-10 flex items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-400 mb-1">{todayStr}</p>
            <h1 className="text-gray-900 font-semibold text-[18px] leading-tight tracking-tight">
              Welcome back, {firstName}!
            </h1>
            <p className="text-gray-400 text-[12px] font-medium mt-1 font-mono">{user?.member_id || '—'}</p>
            <span className={`inline-flex items-center gap-1.5 mt-3 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
              user?.status === 'active'
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : 'bg-yellow-50 text-yellow-700 border-yellow-200'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${user?.status === 'active' ? 'bg-emerald-400' : 'bg-yellow-400'}`} />
              {user?.status ? user.status.charAt(0).toUpperCase() + user.status.slice(1) : 'Pending'}
            </span>
          </div>

          {/* Avatar */}
          <div className="w-14 h-14 rounded-2xl bg-brand-blue/[0.08] border-2 border-brand-blue/[0.12] flex items-center justify-center font-black text-brand-blue text-2xl flex-shrink-0 shadow-sm">
            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
          </div>
        </div>
      </motion.div>

      {/* ── Section: "Your Account at a Glance" ────────────────────── */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-[13px] font-medium text-gray-700">Your Account at a Glance</h2>
            <p className="text-[12px] text-gray-400 mt-0.5">Real-time snapshot of your membership and network</p>
          </div>
        </div>

        {/* ── Row 1: 4 white stat cards ──────────────────────────────── */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          <StatCard
            icon={BadgeCheck} iconBg="bg-brand-blue/10" iconColor="text-brand-blue"
            label="Member ID" value={user?.member_id || '—'}
            trend="Verified account" trendUp delay={0}
          />
          <StatCard
            icon={ShieldCheck} iconBg="bg-emerald-100" iconColor="text-emerald-600"
            label="Account Status"
            value={user?.status ? user.status.charAt(0).toUpperCase() + user.status.slice(1) : '—'}
            trend={`Role: ${user?.role || '—'}`} trendUp delay={0.05}
          />
          <StatCard
            icon={GitBranch} iconBg="bg-violet-100" iconColor="text-violet-600"
            label="Binary Position"
            value={user?.position || 'Not Set'}
            trend="Network placement" trendUp delay={0.1}
          />
          <StatCard
            icon={Calendar} iconBg="bg-cyan-100" iconColor="text-cyan-600"
            label="Member Since"
            value={joinDate}
            trend="Registration date" trendUp delay={0.15}
          />
        </div>
      </div>

      {/* ── Row 2: Referral + Account Health ─────────────────────────── */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">

        {/* Referral code */}
        <div className="dash-card overflow-hidden">
          <div className="grad-blue card-pattern px-5 py-5 relative overflow-hidden">
            <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/10" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <Gift size={14} className="text-white/60" />
                <p className="text-white/60 text-[10px] font-semibold uppercase tracking-widest">Referral Code</p>
              </div>
              <p className="text-white text-[26px] font-black tracking-[0.15em] leading-none">
                {user?.referral_code || '——'}
              </p>
              <p className="text-white/40 text-[10px] font-mono mt-2 truncate">
                {window.location.origin}/register?ref={user?.referral_code || ''}
              </p>
            </div>
          </div>
          <div className="p-4">
            <AnimatePresence mode="wait">
              <motion.button
                key={copied ? 'c' : 'u'}
                initial={{ scale: 0.97, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.97, opacity: 0 }}
                onClick={copyReferral}
                className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-[12px] transition-all ${
                  copied
                    ? 'bg-emerald-500 text-white'
                    : 'bg-brand-blue text-white hover:bg-blue-700 shadow-[0_2px_10px_rgba(0,124,193,0.3)]'
                }`}
              >
                {copied ? <><CheckCircle2 size={13} /> Copied!</> : <><Copy size={13} /> Copy Referral Code</>}
              </motion.button>
            </AnimatePresence>
          </div>
        </div>

        {/* Account Health card */}
        <div className="dash-card overflow-hidden flex flex-col">
          {/* Header */}
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                <ShieldCheck size={15} className="text-amber-600" />
              </div>
              <div>
                <p className="text-[13px] font-black text-gray-800 leading-none">Account Health</p>
                <p className="text-[10.5px] font-medium text-gray-400 mt-0.5">Verification &amp; profile status</p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 text-[9px] font-black uppercase tracking-widest border border-amber-200">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              Pending
            </span>
          </div>

          <div className="p-5 flex flex-col flex-1 gap-4">
            {/* KYC progress */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
                <ShieldCheck size={14} className="text-amber-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-[12px] font-bold text-gray-700">KYC Verification</p>
                  <Link to="/dashboard/profile/kyc"
                    className="text-[11px] font-semibold text-brand-blue flex items-center gap-0.5 hover:underline flex-shrink-0">
                    Verify <ArrowUpRight size={11} />
                  </Link>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full w-1/3 bg-amber-400 rounded-full" />
                </div>
                <p className="text-[10.5px] text-gray-400 mt-1.5">1 of 3 steps completed</p>
              </div>
            </div>

            {/* Thin separator */}
            <div className="h-px bg-gray-100" />

            {/* Profile checklist */}
            <div className="space-y-2.5 flex-1">
              {checklist.map(({ label, done }) => (
                <div key={label} className="flex items-center gap-2.5">
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 ${done ? 'bg-brand-green' : 'bg-gray-200'}`} />
                  <span className={`text-[12px] font-semibold ${done ? 'text-gray-700' : 'text-gray-400'}`}>{label}</span>
                  {done && <CheckCircle2 size={11} className="text-brand-green ml-auto flex-shrink-0" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Row 3: Quick Actions ────────────────────────────────────── */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[13px] font-medium text-gray-700">Quick Actions</h2>
          <span className="text-[11px] text-gray-400">6 shortcuts</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3">
          {[
            { icon: UserCheck,   iconBg: 'bg-brand-blue/10', iconColor: 'text-brand-blue',    label: 'Personal Info',  desc: 'Update profile',    to: '/dashboard/profile/personal-info' },
            { icon: ShieldCheck, iconBg: 'bg-emerald-100',   iconColor: 'text-emerald-600',   label: 'KYC',            desc: 'Verify identity',   to: '/dashboard/profile/kyc'           },
            { icon: Gift,        iconBg: 'bg-amber-100',     iconColor: 'text-amber-600',     label: 'Business',       desc: 'Referral & network',to: '/dashboard/profile/business-info' },
            { icon: BarChart3,   iconBg: 'bg-violet-100',    iconColor: 'text-violet-600',    label: 'Levels',         desc: 'Level report',      to: '/dashboard/levels/level-report'   },
            { icon: GitBranch,   iconBg: 'bg-cyan-100',      iconColor: 'text-cyan-600',      label: 'Binary',         desc: 'Left/right legs',   to: '/dashboard/levels/binary-report'  },
            { icon: Lock,        iconBg: 'bg-rose-100',      iconColor: 'text-rose-600',      label: 'Security',       desc: 'Change password',   to: '/dashboard/profile/security-pin'  },
          ].map((a, i) => <ActionCard key={a.label} {...a} delay={i * 0.04} />)}
        </div>
      </div>

      {/* ── Row 4: Quick Links (Corelystic screenshot style) ──────── */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[13px] font-medium text-gray-700">Quick Links</h2>
          <span className="text-[11px] text-gray-400">8 services</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* Left panel */}
          <div className="dash-card overflow-hidden">
            <QuickLink icon={Users2}    label="Membership Activation" to="/dashboard/profile/kyc"           delay={0}    />
            <QuickLink icon={LayoutGrid} label="App Activation"        to="/dashboard/profile/personal-info" delay={0.04} />
            <QuickLink icon={Tag}        label="Purchase Activation"    to="/dashboard/profile/business-info" delay={0.08} />
            <QuickLink icon={TrendingUp} label="Stacking Activation"    to="/dashboard/levels/level-report"  delay={0.12} />
          </div>

          {/* Right panel */}
          <div className="dash-card overflow-hidden">
            <QuickLink icon={PlusCircle}   label="Add Funds"          to="/dashboard/profile/business-info" delay={0.04} />
            <QuickLink icon={ArrowDownLeft} label="Withdraw Request"  to="/dashboard/profile/business-info" delay={0.08} />
            <QuickLink icon={MonitorPlay}  label="Watch Ads"          to="/dashboard"                       delay={0.12} />
            <QuickLink icon={CalendarDays} label="Meetings & Events"  to="/events"                         delay={0.16} />
          </div>
        </div>
      </div>

      {/* ── Row 5: Bottom account strip ────────────────────────────── */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { icon: BadgeCheck, iconBg: 'bg-brand-blue/10', iconColor: 'text-brand-blue',  label: 'Member ID', value: user?.member_id || '—' },
          { icon: Zap,        iconBg: 'bg-emerald-100',   iconColor: 'text-emerald-600', label: 'Status',    value: user?.status ? user.status.charAt(0).toUpperCase() + user.status.slice(1) : '—' },
        ].map(({ icon: Icon, iconBg, iconColor, label, value }, i) => (
          <motion.div key={label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="dash-card p-4 flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${iconBg}`}>
              <Icon size={17} className={iconColor} />
            </div>
            <div className="min-w-0">
              <p className="text-[10.5px] font-semibold uppercase tracking-wider text-gray-400">{label}</p>
              <p className="text-[14px] font-black text-gray-900 mt-0.5 truncate">{value}</p>
            </div>
          </motion.div>
        ))}
      </div>

    </div>
  );
};

export default DashboardHome;

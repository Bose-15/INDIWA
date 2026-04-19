import React from 'react';
import { motion } from 'framer-motion';
import { GitBranch, Users, TrendingUp, ArrowLeftRight, ArrowUp, ArrowDown, Info, Activity } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

const BINARY = {
  left:  { members: 1, active: 1, bv: 100, levels: 1 },
  right: { members: 1, active: 1, bv: 100, levels: 1 },
};

const LegCard = ({ side, data, isYours }) => {
  const isLeft = side === 'Left';
  const active = isYours;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      className={`rounded-2xl overflow-hidden ${active ? (isLeft ? 'shadow-[0_4px_24px_rgba(0,124,193,0.25)]' : 'shadow-[0_4px_24px_rgba(124,58,237,0.25)]') : 'shadow-[0_2px_12px_rgba(0,0,0,0.06)]'}`}
    >
      {/* Header */}
      <div className={`${active ? (isLeft ? 'grad-blue' : 'grad-violet') : 'bg-gray-100'} card-pattern px-5 py-4 flex items-center justify-between`}>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm ${active ? 'bg-white/20 text-white' : 'bg-white text-gray-500 border border-gray-200'}`}>
            {side.charAt(0)}
          </div>
          <div>
            <p className={`font-black text-[13px] uppercase tracking-widest ${active ? 'text-white' : 'text-gray-600'}`}>{side} Leg</p>
            {isYours && <p className="text-white/60 text-[9px] font-black uppercase tracking-widest mt-0.5">Your Position</p>}
          </div>
        </div>
        <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${
          data.active > 0
            ? (active ? 'bg-white/20 text-white' : 'bg-green-100 text-green-700')
            : (active ? 'bg-white/10 text-white/60' : 'bg-gray-200 text-gray-500')
        }`}>{data.active > 0 ? 'Active' : 'Empty'}</span>
      </div>

      {/* Body */}
      <div className="bg-white border border-gray-100 rounded-b-2xl px-5 py-4 space-y-3">
        {[
          { label: 'Total Members',   value: data.members,                     icon: Users      },
          { label: 'Active Members',  value: data.active,                      icon: ArrowUp    },
          { label: 'Levels Deep',     value: data.levels,                      icon: ArrowDown  },
          { label: 'Business Volume', value: `₹${data.bv.toLocaleString()}`,   icon: TrendingUp },
        ].map(({ label, value, icon: Icon }) => (
          <div key={label} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-lg bg-gray-100 flex items-center justify-center">
                <Icon size={12} className="text-gray-400" />
              </div>
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">{label}</span>
            </div>
            <span className="text-sm font-black text-gray-900">{value}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const TreeNode = ({ label, memberId, side }) => {
  const map = { root: 'grad-blue glow-blue', left: 'grad-cyan', right: 'grad-violet glow-violet' };
  return (
    <div className="flex flex-col items-center">
      <div className={`${map[side] || 'bg-gray-400'} rounded-xl px-4 py-2.5 text-center shadow-lg min-w-[90px]`}>
        <p className="text-[9px] font-black uppercase tracking-widest text-white/60">{label}</p>
        <p className="text-[11px] font-black text-white mt-0.5">{memberId}</p>
      </div>
    </div>
  );
};

const BinaryReport = () => {
  const { user } = useAuth();
  const totalBV  = BINARY.left.bv + BINARY.right.bv;
  const leftPct  = totalBV > 0 ? (BINARY.left.bv  / totalBV) * 100 : 50;
  const rightPct = totalBV > 0 ? (BINARY.right.bv / totalBV) * 100 : 50;
  const balancePct = totalBV > 0
    ? Math.round((Math.min(BINARY.left.bv, BINARY.right.bv) / Math.max(BINARY.left.bv, BINARY.right.bv)) * 100)
    : 100;

  return (
    <div className="space-y-5">

      {/* Summary stat cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: 'Total Team',    value: BINARY.left.members + BINARY.right.members, iconBg: 'bg-brand-blue/10',  iconColor: 'text-brand-blue',   icon: Users      },
          { label: 'Left Members',  value: BINARY.left.members,                         iconBg: 'bg-cyan-100',       iconColor: 'text-cyan-600',     icon: Users      },
          { label: 'Right Members', value: BINARY.right.members,                        iconBg: 'bg-violet-100',     iconColor: 'text-violet-600',   icon: Users      },
          { label: 'Total BV',      value: `₹${totalBV.toLocaleString()}`,              iconBg: 'bg-emerald-100',    iconColor: 'text-emerald-600',  icon: TrendingUp },
        ].map(({ label, value, iconBg, iconColor, icon: Icon }, i) => (
          <motion.div key={label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="bg-white rounded-2xl border border-gray-100 p-5 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
            <div className="flex items-start justify-between mb-4">
              <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">{label}</p>
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${iconBg}`}>
                <Icon size={16} className={iconColor} />
              </div>
            </div>
            <p className="text-[28px] font-black text-gray-900 tracking-tight leading-none">{value}</p>
          </motion.div>
        ))}
      </div>

      {/* Main: tree + leg cards + balance */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">

        {/* Binary tree */}
        <div className="xl:col-span-1 dash-card overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl grad-blue flex items-center justify-center">
              <GitBranch size={15} className="text-white" />
            </div>
            <h2 className="font-semibold text-[12px] uppercase tracking-tight text-gray-700">Tree View</h2>
          </div>
          <div className="p-6 flex flex-col items-center">
            <TreeNode label="You" memberId={user?.member_id || '—'} side="root" />
            <div className="relative flex items-center justify-center w-48 my-3">
              <div className="absolute inset-x-0 top-1/2 h-px bg-gray-200" />
              <div className="w-2 h-2 rounded-full bg-gray-300 relative z-10" />
            </div>
            <div className="grid grid-cols-2 gap-10 w-full">
              {[
                { side: 'left',  label: 'Left',  count: BINARY.left.members,  id: 'IW-000001' },
                { side: 'right', label: 'Right', count: BINARY.right.members, id: 'IW-000002' },
              ].map(({ side, label, count, id }) => (
                <div key={side} className="flex flex-col items-center gap-2">
                  <div className="h-8 w-px bg-gray-200" />
                  <TreeNode label={label} memberId={count > 0 ? id : 'Empty'} side={side} />
                  {count > 0 && (
                    <>
                      <div className="h-5 w-px bg-gray-200" />
                      <div className={`w-16 h-7 rounded-xl border-2 border-dashed flex items-center justify-center text-[9px] font-black uppercase tracking-widest ${
                        side === 'left' ? 'bg-blue-50 border-brand-blue/20 text-brand-blue/50' : 'bg-purple-50 border-purple-200 text-purple-400'
                      }`}>+More</div>
                    </>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-5 flex items-center gap-4 text-[10px] font-black uppercase tracking-wider">
              <span className="flex items-center gap-1.5 text-brand-blue"><span className="w-2.5 h-2.5 rounded grad-blue inline-block" /> Left</span>
              <span className="flex items-center gap-1.5 text-purple-600"><span className="w-2.5 h-2.5 rounded grad-violet inline-block" /> Right</span>
            </div>
          </div>
        </div>

        {/* Right col: leg cards + balance */}
        <div className="xl:col-span-2 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <LegCard side="Left"  data={BINARY.left}  isYours={user?.position === 'Left'}  />
            <LegCard side="Right" data={BINARY.right} isYours={user?.position === 'Right'} />
          </div>

          {/* BV Balance */}
          <div className="dash-card p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl grad-green flex items-center justify-center">
                <Activity size={15} className="text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-[12px] uppercase tracking-tight text-gray-700">BV Balance</h3>
                <p className="text-[11px] font-medium text-gray-400 mt-0.5">Left vs Right leg volume comparison</p>
              </div>
              <span className={`text-[11px] font-black px-3 py-1.5 rounded-full ${
                balancePct >= 80 ? 'bg-green-100 text-green-700' :
                balancePct >= 50 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-600'
              }`}>{balancePct}% balanced</span>
            </div>

            <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-wider mb-2">
              <span className="text-brand-blue">Left — ₹{BINARY.left.bv}</span>
              <span className="text-purple-600">Right — ₹{BINARY.right.bv}</span>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden flex">
              <motion.div className="h-full grad-blue rounded-l-full"
                initial={{ width: 0 }} animate={{ width: `${leftPct}%` }} transition={{ duration: 0.7, ease: 'easeOut' }} />
              <motion.div className="h-full grad-violet rounded-r-full"
                initial={{ width: 0 }} animate={{ width: `${rightPct}%` }} transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }} />
            </div>
            <div className="flex items-center justify-between text-[10px] font-bold text-gray-400 mt-1.5">
              <span>{leftPct.toFixed(1)}%</span>
              <span>{rightPct.toFixed(1)}%</span>
            </div>

            {balancePct < 70 && (
              <div className="mt-4 flex items-start gap-2.5 text-[11px] font-medium text-amber-700 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3">
                <Info size={13} className="mt-0.5 flex-shrink-0 text-amber-500" />
                Legs are unbalanced. Focus on your weaker leg to maximize binary commissions.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BinaryReport;

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Users, UserCheck, UserX, TrendingUp, ChevronDown, ChevronUp, RefreshCcw } from 'lucide-react';

const generateLevelData = () =>
  Array.from({ length: 10 }, (_, i) => ({
    level: i + 1, total: i === 0 ? 2 : 0, active: i === 0 ? 2 : 0, inactive: 0, bv: i === 0 ? 200 : 0,
  }));

const SummaryCard = ({ icon: Icon, label, value, iconBg, iconColor, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}
    className="bg-white rounded-2xl border border-gray-100 p-5 shadow-[0_1px_8px_rgba(0,0,0,0.04)]"
  >
    <div className="flex items-start justify-between mb-4">
      <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">{label}</p>
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${iconBg}`}>
        <Icon size={16} className={iconColor} />
      </div>
    </div>
    <p className="text-[28px] font-black text-gray-900 tracking-tight leading-none">{value}</p>
  </motion.div>
);

const LevelReport = () => {
  const [expanded, setExpanded] = useState(null);
  const levels = generateLevelData();
  const totals = levels.reduce(
    (acc, l) => ({ total: acc.total + l.total, active: acc.active + l.active, bv: acc.bv + l.bv }),
    { total: 0, active: 0, bv: 0 }
  );

  return (
    <div className="space-y-5">

      {/* Summary cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <SummaryCard icon={Users}      label="Total Members"  value={totals.total}                     iconBg="bg-brand-blue/10" iconColor="text-brand-blue"   delay={0}    />
        <SummaryCard icon={UserCheck}  label="Active Members" value={totals.active}                    iconBg="bg-emerald-100"   iconColor="text-emerald-600"  delay={0.05} />
        <SummaryCard icon={UserX}      label="Inactive"       value={totals.total - totals.active}     iconBg="bg-rose-100"      iconColor="text-rose-500"     delay={0.1}  />
        <SummaryCard icon={TrendingUp} label="Total BV"       value={`₹${totals.bv.toLocaleString()}`} iconBg="bg-violet-100"    iconColor="text-violet-600"   delay={0.15} />
      </div>

      {/* Level table */}
      <div className="dash-card overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl grad-blue flex items-center justify-center">
              <BarChart3 size={16} className="text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-[13px] uppercase tracking-tight text-gray-700">Level-wise Report</h2>
              <p className="text-[11px] font-medium text-gray-400 mt-0.5">Your downline network across all 10 levels</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black text-gray-400 bg-gray-100 px-3 py-1.5 rounded-full uppercase tracking-wider">10 Levels</span>
            <button className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors">
              <RefreshCcw size={13} />
            </button>
          </div>
        </div>

        {/* Desktop table */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-100">
                {['Level', 'Total', 'Active', 'Inactive', 'Business Volume', 'Status'].map(h => (
                  <th key={h} className="px-6 py-3.5 text-left text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {levels.map((row, i) => (
                <motion.tr
                  key={row.level}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.025 }}
                  className="border-b border-gray-50 hover:bg-gray-50/60 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-[11px] font-black transition-all ${
                        row.total > 0 ? 'grad-blue text-white shadow-sm' : 'bg-gray-100 text-gray-400'
                      }`}>L{row.level}</div>
                      <span className="text-sm font-bold text-gray-600">Level {row.level}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-black text-gray-900">{row.total}</td>
                  <td className="px-6 py-4">
                    <span className={`text-sm font-bold ${row.active > 0 ? 'text-brand-green' : 'text-gray-300'}`}>{row.active}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-sm font-bold ${row.inactive > 0 ? 'text-red-500' : 'text-gray-300'}`}>{row.inactive}</span>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-700">₹{row.bv.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      row.total > 0 ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'
                    }`}>{row.total > 0 ? 'Active' : 'Empty'}</span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-50 border-t-2 border-gray-200">
                <td className="px-6 py-4 text-[11px] font-black uppercase tracking-widest text-gray-600">Totals</td>
                <td className="px-6 py-4 text-sm font-black text-gray-900">{totals.total}</td>
                <td className="px-6 py-4 text-sm font-black text-brand-green">{totals.active}</td>
                <td className="px-6 py-4 text-sm font-black text-red-500">{totals.total - totals.active}</td>
                <td className="px-6 py-4 text-sm font-black text-gray-900">₹{totals.bv.toLocaleString()}</td>
                <td className="px-6 py-4" />
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Mobile accordion */}
        <div className="sm:hidden divide-y divide-gray-50">
          {levels.map(row => (
            <div key={row.level}>
              <button
                onClick={() => setExpanded(expanded === row.level ? null : row.level)}
                className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50/50"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-[11px] font-black ${row.total > 0 ? 'grad-blue text-white' : 'bg-gray-100 text-gray-400'}`}>L{row.level}</div>
                  <span className="font-black text-[12px] uppercase tracking-wider text-gray-700">Level {row.level}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-sm font-black ${row.total > 0 ? 'text-gray-900' : 'text-gray-300'}`}>{row.total}</span>
                  {expanded === row.level ? <ChevronUp size={14} className="text-gray-400" /> : <ChevronDown size={14} className="text-gray-400" />}
                </div>
              </button>
              {expanded === row.level && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                  className="overflow-hidden bg-gray-50 px-5 py-4 space-y-2.5">
                  {[['Active', row.active, 'text-brand-green'], ['Inactive', row.inactive, 'text-red-400'], ['BV', `₹${row.bv}`, 'text-gray-700']].map(([l, v, c]) => (
                    <div key={l} className="flex justify-between text-[12px]">
                      <span className="font-black uppercase tracking-widest text-gray-400">{l}</span>
                      <span className={`font-black ${c}`}>{v}</span>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>
          ))}
        </div>

        <div className="px-6 py-3 border-t border-gray-50 bg-gray-50/50">
          <p className="text-[10px] font-medium text-gray-400">Data updates every 24 hours. Contact support for discrepancies.</p>
        </div>
      </div>
    </div>
  );
};

export default LevelReport;

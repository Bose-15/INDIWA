import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck, Upload, CheckCircle2, Clock, AlertCircle,
  FileText, Camera, CreditCard, Info, Lock, Shield
} from 'lucide-react';

const DOC_TYPES = [
  { id: 'aadhaar', label: 'Aadhaar Card',  icon: CreditCard, desc: 'Front and back of your Aadhaar card',  accept: 'image/*,.pdf', required: true },
  { id: 'pan',     label: 'PAN Card',       icon: FileText,   desc: 'Clear photo or scan of your PAN card', accept: 'image/*,.pdf', required: true },
  { id: 'photo',   label: 'Profile Photo',  icon: Camera,     desc: 'Recent passport-size photograph',      accept: 'image/*',      required: true },
];

const StatusBadge = ({ status }) => {
  const map = {
    pending:  { label: 'Pending',  cls: 'bg-amber-100 text-amber-700 border-amber-200',  Icon: Clock        },
    verified: { label: 'Verified', cls: 'bg-green-100 text-green-700 border-green-200',  Icon: CheckCircle2 },
    rejected: { label: 'Rejected', cls: 'bg-red-100 text-red-600 border-red-200',        Icon: AlertCircle  },
  };
  const s = map[status] || map.pending;
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${s.cls}`}>
      <s.Icon size={12} /> {s.label}
    </span>
  );
};

const UploadCard = ({ doc, uploaded, onUpload }) => {
  const [dragging, setDragging] = useState(false);
  return (
    <div
      className={`rounded-xl border-2 border-dashed p-4 transition-all ${
        uploaded  ? 'border-emerald-300 bg-emerald-50/40'  :
        dragging  ? 'border-brand-blue bg-blue-50/40 scale-[1.01]' :
                    'border-gray-200 bg-gray-50/30 hover:border-brand-blue/40'
      }`}
      onDragOver={e => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={e => { e.preventDefault(); setDragging(false); onUpload(doc.id); }}
    >
      <div className="flex items-center gap-4">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${
          uploaded ? 'bg-emerald-100 text-emerald-600' : 'bg-white border border-gray-200 text-gray-400'
        }`}>
          {uploaded ? <CheckCircle2 size={20} /> : <doc.icon size={20} />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="font-black text-[12px] uppercase tracking-wider text-gray-800">{doc.label}</p>
            {doc.required && <span className="text-[9px] font-black text-red-400 bg-red-50 px-1.5 py-0.5 rounded uppercase tracking-wider">Required</span>}
          </div>
          <p className="text-[11px] font-medium text-gray-400 mt-0.5">{doc.desc}</p>
        </div>
        <div className="flex-shrink-0">
          {uploaded ? (
            <span className="flex items-center gap-1.5 text-[10px] font-black text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg">
              <CheckCircle2 size={11} /> Uploaded
            </span>
          ) : (
            <label className="flex items-center gap-1.5 cursor-pointer px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-[10px] font-black uppercase tracking-wider text-gray-600 hover:border-brand-blue hover:text-brand-blue transition-all whitespace-nowrap">
              <Upload size={12} /> Choose
              <input type="file" accept={doc.accept} className="sr-only" onChange={() => onUpload(doc.id)} />
            </label>
          )}
        </div>
      </div>
    </div>
  );
};

const KYC = () => {
  const kycStatus = 'pending';
  const [uploaded, setUploaded] = useState({});
  const handleUpload = (id) => setUploaded(u => ({ ...u, [id]: true }));
  const uploadedCount = Object.keys(uploaded).length;
  const allUploaded   = DOC_TYPES.filter(d => d.required).every(d => uploaded[d.id]);
  const pct = Math.round((uploadedCount / DOC_TYPES.length) * 100);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">

      {/* ── Left: Status panel ─────────────────────────────────────── */}
      <div className="xl:col-span-1 space-y-4">

        <div className="dash-card overflow-hidden">
          <div className="p-6 text-center relative overflow-hidden" style={{
            background: kycStatus === 'verified'
              ? 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)'
              : kycStatus === 'rejected'
              ? 'linear-gradient(135deg, #fff1f2 0%, #ffe4e6 100%)'
              : 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)'
          }}>
            <div className="relative z-10">
              <div className={`w-16 h-16 rounded-2xl bg-white border-2 flex items-center justify-center mx-auto shadow-sm ${
                kycStatus === 'verified' ? 'border-emerald-200' :
                kycStatus === 'rejected' ? 'border-red-200' : 'border-amber-200'
              }`}>
                <ShieldCheck size={26} className={
                  kycStatus === 'verified' ? 'text-emerald-600' :
                  kycStatus === 'rejected' ? 'text-red-500' : 'text-amber-600'
                } />
              </div>
              <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.25em] mt-4">KYC Status</p>
              <div className="mt-2"><StatusBadge status={kycStatus} /></div>
            </div>
          </div>

          <div className="p-5">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Completion</p>
              <p className="text-[14px] font-black text-gray-900">{pct}%</p>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <motion.div className="h-full grad-blue rounded-full"
                initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.5 }} />
            </div>
            <p className="text-[10px] font-medium text-gray-400 mt-2">{uploadedCount} of {DOC_TYPES.length} documents</p>
          </div>
        </div>

        <div className="dash-card p-5 space-y-3">
          <div className="flex items-center gap-2 mb-1">
            <Info size={14} className="text-brand-blue" />
            <p className="text-[11px] font-black uppercase tracking-widest text-gray-700">Why KYC?</p>
          </div>
          {[
            { icon: Shield,      text: 'Unlock full network features'    },
            { icon: ShieldCheck, text: 'Enable withdrawal capabilities'  },
            { icon: Clock,       text: 'Verified in 1–2 business days'  },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-3 text-[11px] font-medium text-gray-500">
              <div className="w-6 h-6 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                <Icon size={12} className="text-brand-blue" />
              </div>
              {text}
            </div>
          ))}
        </div>

        <div className="dash-card p-4">
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Accepted Formats</p>
          <div className="flex flex-wrap gap-2">
            {['JPG', 'PNG', 'PDF'].map(f => (
              <span key={f} className="px-2.5 py-1 bg-gray-100 rounded-lg text-[10px] font-black text-gray-600 uppercase tracking-wider">{f}</span>
            ))}
          </div>
          <p className="text-[10px] font-medium text-gray-400 mt-2">Max 5 MB per file</p>
        </div>
      </div>

      {/* ── Right: Upload panel ────────────────────────────────────── */}
      <div className="xl:col-span-2">
        <div className="dash-card overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl grad-blue flex items-center justify-center">
              <Upload size={15} className="text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-[13px] uppercase tracking-tight text-gray-700">Upload Documents</h2>
              <p className="text-[12px] font-medium text-gray-400 mt-0.5">All three documents are required to complete verification.</p>
            </div>
          </div>

          <div className="p-6 space-y-3">
            {DOC_TYPES.map(doc => (
              <UploadCard key={doc.id} doc={doc} uploaded={!!uploaded[doc.id]} onUpload={handleUpload} />
            ))}
          </div>

          <div className="px-6 py-4 bg-gray-50/80 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <AnimatePresence mode="wait">
                {allUploaded ? (
                  <motion.p key="r" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="text-[12px] font-bold text-emerald-600 flex items-center gap-1.5">
                    <CheckCircle2 size={13} /> All documents uploaded — ready to submit!
                  </motion.p>
                ) : (
                  <p key="h" className="text-[11px] text-gray-400 font-medium">Upload all required documents to submit.</p>
                )}
              </AnimatePresence>
            </div>
            <button disabled={!allUploaded}
              className="flex items-center gap-2 px-6 py-3 grad-green text-white rounded-xl font-black text-[11px] uppercase tracking-widest glow-green hover:opacity-90 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap"
            >
              <ShieldCheck size={13} /> Submit for Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KYC;

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Rocket, Trophy, Send, Loader2, CheckCircle2, AlertCircle, User } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { contactApi } from '../api/contact';

const Contact = () => {
  const { t } = useLanguage();

  const [form, setForm]       = useState({ name: '', email: '', mobile: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError]     = useState('');

  const set = field => e => setForm(f => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await contactApi.submit(form);
      setSuccess(true);
      setForm({ name: '', email: '', mobile: '', subject: '', message: '' });
    } catch (err) {
      setError(err.message || 'Could not send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white">

      {/* 1. Page Header */}
      <section className="relative pt-24 pb-16 border-b border-gray-100 overflow-hidden">
        <div className="absolute inset-0 bg-dot-pattern opacity-10 -z-10" />
        <div className="container-tight px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-3 bg-slate-900 text-white px-7 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-10 shadow-2xl border border-white/10"
          >
            <Rocket size={16} className="text-brand-green animate-pulse" /> {t('contact.pill')}
          </motion.div>

          <div className="space-y-6 max-w-4xl mx-auto">
            <span className="font-script text-brand-red text-3xl md:text-4xl block transform -rotate-1">{t('contact.script')}</span>
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tighter uppercase leading-none">
              {t('contact.h1.line1')} <br />
              <span className="text-brand-blue">{t('contact.h1.line2')}</span>
            </h1>
            <div className="w-16 h-1 bg-brand-blue mx-auto rounded-full mt-6"></div>
            <p className="text-lg md:text-xl font-semibold max-w-2xl mx-auto mt-8 leading-relaxed text-gray-600">
              {t('contact.sub')}
            </p>
          </div>
        </div>
      </section>

      {/* 2. Main Interaction Area */}
      <section className="section-padding relative overflow-hidden bg-white">
        <div className="container-tight px-6">
          <div className="flex flex-col lg:flex-row items-stretch gap-16">

            {/* Left: Info Cards */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex-1 space-y-12"
            >
              <div className="space-y-10">
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight uppercase leading-none">{t('contact.channels.title')}</h2>
                <p className="text-lg text-gray-500 font-bold leading-relaxed max-w-xl">
                  {t('contact.channels.body')}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-8">
                {/* Phone */}
                <div className="flex items-center gap-8 group p-8 rounded-ultra bg-slate-50 border border-gray-50 hover:bg-white hover:shadow-premium transition-all">
                  <div className="w-16 h-16 rounded-2xl bg-brand-blue text-white flex items-center justify-center shadow-glow-blue group-hover:scale-110 transition-transform">
                    <Phone size={28} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{t('contact.phone.label')}</p>
                    <p className="text-xl md:text-2xl font-black text-gray-900 tracking-tight">1800-INDIWA-01</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center gap-8 group p-8 rounded-ultra bg-slate-50 border border-gray-50 hover:bg-white hover:shadow-premium transition-all">
                  <div className="w-16 h-16 rounded-2xl bg-brand-blue text-white flex items-center justify-center shadow-glow-blue group-hover:scale-110 transition-transform">
                    <Mail size={28} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{t('contact.email.label')}</p>
                    <p className="text-xl md:text-2xl font-black text-gray-900 tracking-tight">support@indiwa.org</p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-center gap-8 group p-8 rounded-ultra bg-slate-50 border border-gray-50 hover:bg-white hover:shadow-premium transition-all">
                  <div className="w-16 h-16 rounded-2xl bg-brand-green text-white flex items-center justify-center shadow-glow-green group-hover:scale-110 transition-transform">
                    <Clock size={28} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{t('contact.hours.label')}</p>
                    <p className="text-lg font-black text-gray-900 tracking-tight">
                      {t('contact.hours.value')}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex-1"
            >
              <div className="bg-slate-50 rounded-[32px] p-8 md:p-12 border border-gray-100">
                <div className="mb-8 space-y-2">
                  <h3 className="text-2xl font-black uppercase tracking-tight text-gray-900">Send us a message</h3>
                  <p className="text-sm font-semibold text-gray-500">We'll respond within 2–3 business days.</p>
                </div>

                {/* Success State */}
                {success ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center gap-5 py-12 text-center"
                  >
                    <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle2 size={40} className="text-brand-green" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-xl font-black uppercase tracking-tight text-gray-900">Message Sent!</h4>
                      <p className="text-sm font-semibold text-gray-500 max-w-xs">
                        Thank you for reaching out. Our team will get back to you shortly.
                      </p>
                    </div>
                    <button
                      onClick={() => setSuccess(false)}
                      className="mt-2 text-[11px] font-black uppercase tracking-widest text-brand-blue hover:text-brand-green transition-colors"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">

                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-start gap-3 bg-red-50 border border-red-100 rounded-2xl px-5 py-4"
                      >
                        <AlertCircle size={16} className="text-red-400 mt-0.5 flex-shrink-0" />
                        <p className="text-sm font-semibold text-red-600">{error}</p>
                      </motion.div>
                    )}

                    {/* Name */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Name <span className="text-brand-green">*</span></label>
                      <div className="relative group">
                        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-blue transition-colors pointer-events-none"><User size={15} /></div>
                        <input type="text" placeholder="Your full name" value={form.name} onChange={set('name')} required
                          className="w-full pl-12 pr-5 py-4 bg-white border-2 border-transparent rounded-2xl text-sm font-semibold text-gray-800 placeholder:text-gray-300 focus:outline-none focus:border-brand-blue transition-all" />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Email <span className="text-brand-green">*</span></label>
                      <div className="relative group">
                        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-blue transition-colors pointer-events-none"><Mail size={15} /></div>
                        <input type="email" placeholder="you@example.com" value={form.email} onChange={set('email')} required
                          className="w-full pl-12 pr-5 py-4 bg-white border-2 border-transparent rounded-2xl text-sm font-semibold text-gray-800 placeholder:text-gray-300 focus:outline-none focus:border-brand-blue transition-all" />
                      </div>
                    </div>

                    {/* Mobile */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Mobile (optional)</label>
                      <div className="relative group flex">
                        <div className="flex items-center px-4 bg-gray-100 border-2 border-transparent border-r-0 rounded-l-2xl text-sm font-black text-gray-500 whitespace-nowrap group-focus-within:bg-blue-50 group-focus-within:border-brand-blue group-focus-within:text-brand-blue transition-all">
                          <Phone size={13} className="mr-1.5" /> +91
                        </div>
                        <input type="tel" placeholder="98765 43210" value={form.mobile} onChange={set('mobile')} maxLength={10}
                          className="flex-1 pl-4 pr-4 py-4 bg-white border-2 border-transparent border-l-0 rounded-r-2xl text-sm font-semibold text-gray-800 placeholder:text-gray-300 focus:outline-none focus:border-brand-blue transition-all" />
                      </div>
                    </div>

                    {/* Subject */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Subject</label>
                      <input type="text" placeholder="How can we help?" value={form.subject} onChange={set('subject')}
                        className="w-full px-5 py-4 bg-white border-2 border-transparent rounded-2xl text-sm font-semibold text-gray-800 placeholder:text-gray-300 focus:outline-none focus:border-brand-blue transition-all" />
                    </div>

                    {/* Message */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Message <span className="text-brand-green">*</span></label>
                      <textarea
                        placeholder="Tell us what's on your mind…"
                        value={form.message}
                        onChange={set('message')}
                        required
                        rows={5}
                        className="w-full px-5 py-4 bg-white border-2 border-transparent rounded-2xl text-sm font-semibold text-gray-800 placeholder:text-gray-300 focus:outline-none focus:border-brand-blue transition-all resize-none"
                      />
                    </div>

                    <motion.button
                      whileHover={{ scale: loading ? 1 : 1.02 }}
                      whileTap={{ scale: loading ? 1 : 0.98 }}
                      type="submit"
                      disabled={loading}
                      className="w-full bg-brand-blue text-white py-4 rounded-2xl font-black text-[11px] uppercase tracking-[0.25em] shadow-glow-blue hover:shadow-glow-blue/50 flex items-center justify-center gap-3 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {loading
                        ? <><Loader2 size={15} className="animate-spin" /> Sending…</>
                        : <><Send size={15} /> Send Message</>
                      }
                    </motion.button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Footer CTA */}
      <section className="section-padding bg-slate-900 border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh-deep opacity-10 pulsate" />
        <div className="container-tight px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-white text-4xl md:text-5xl uppercase tracking-tighter leading-none">
                {t('contact.hub.h2.line1')} <br />
                <span className="text-brand-green">{t('contact.hub.h2.line2')}</span>
              </h2>
              <p className="text-lg text-gray-400 font-semibold leading-relaxed">
                {t('contact.hub.body')}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-end gap-6">
              <div className="p-8 md:p-10 rounded-ultra bg-white/5 border border-white/10 backdrop-blur-sm text-center min-w-[240px]">
                <Phone size={32} className="text-brand-green mx-auto mb-6" />
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-3">{t('contact.hub.phone.label')}</p>
                <p className="text-xl font-black text-white">1800-INDIWA-01</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Contact;

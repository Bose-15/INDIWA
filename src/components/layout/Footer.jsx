import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Send, Radio, Globe, Phone, Mail, ShieldCheck, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-900 text-gray-400 py-20 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-blue/30 to-transparent" />
      <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-brand-blue/10 blur-[100px] rounded-full" />
      <div className="absolute top-40 -left-20 w-48 h-48 bg-brand-orange/5 blur-[80px] rounded-full" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-20">

          {/* Brand Column */}
          <div className="space-y-8">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <img src="/logo.png" alt="INDIWA Logo" className="h-20 w-auto group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-white/5 rounded-full blur-md -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </Link>
            <p className="text-[14px] leading-relaxed font-semibold text-gray-400 max-w-xs">
              {t('footer.desc')}
            </p>
            <div className="flex gap-4">
              {[MessageCircle, Send, Radio, Globe].map((Icon, idx) => (
                <motion.a
                  key={idx}
                  whileHover={{ y: -5, scale: 1.1 }}
                  href="#"
                  className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-brand-green hover:bg-green-500/10 transition-all shadow-sm"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Strategic Areas */}
          <div>
            <h3 className="text-white font-black text-[11px] uppercase tracking-[0.3em] mb-10 flex items-center gap-3">
              <span className="w-10 h-[1px] bg-brand-orange/40" /> {t('footer.col2.heading')}
            </h3>
            <ul className="space-y-5 font-bold text-xs uppercase tracking-widest">
              <li><Link to="/about" className="hover:text-white transition-colors flex items-center gap-3 group"><ArrowRight size={12} className="text-brand-green group-hover:translate-x-1 transition-transform" /> {t('footer.col2.link1')}</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors flex items-center gap-3 group"><ArrowRight size={12} className="text-brand-green group-hover:translate-x-1 transition-transform" /> {t('footer.col2.link2')}</Link></li>
              <li><Link to="/gallery" className="hover:text-white transition-colors flex items-center gap-3 group"><ArrowRight size={12} className="text-brand-green group-hover:translate-x-1 transition-transform" /> {t('footer.col2.link3')}</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors flex items-center gap-3 group"><ArrowRight size={12} className="text-brand-green group-hover:translate-x-1 transition-transform" /> {t('footer.col2.link4')}</Link></li>
            </ul>
          </div>

          {/* Association */}
          <div>
            <h3 className="text-white font-black text-[11px] uppercase tracking-[0.3em] mb-10 flex items-center gap-3">
              <span className="w-10 h-[1px] bg-brand-blue/40" /> {t('footer.col3.heading')}
            </h3>
            <ul className="space-y-5 font-bold text-xs uppercase tracking-widest">
              <li><Link to="/"        className="hover:text-brand-blue transition-colors">{t('footer.col3.home')}</Link></li>
              <li><Link to="/about"   className="hover:text-brand-blue transition-colors">{t('footer.col3.about')}</Link></li>
              <li><Link to="/mission" className="hover:text-brand-blue transition-colors">{t('footer.col3.mission')}</Link></li>
              <li><Link to="/contact" className="hover:text-brand-blue transition-colors">{t('footer.col3.membership')}</Link></li>
              <li><Link to="/contact" className="hover:text-brand-blue transition-colors">{t('footer.col3.contact')}</Link></li>
            </ul>
          </div>

          {/* Support Hub */}
          <div className="space-y-8">
            <h3 className="text-white font-black text-[11px] uppercase tracking-[0.3em] mb-10 flex items-center gap-3">
              <span className="w-10 h-[1px] bg-brand-orange/40" /> {t('footer.support.heading')}
            </h3>
            <div className="bg-white/5 border border-white/10 rounded-[2rem] p-7 space-y-7 relative overflow-hidden group hover:border-brand-blue/30 transition-colors duration-500 shadow-premium">
              <div className="absolute -top-10 -right-10 w-20 h-20 bg-brand-blue/10 blur-2xl rounded-full" />

              <div className="flex items-start gap-4 relative z-10 font-sans">
                <div className="w-12 h-12 rounded-2xl bg-brand-blue/10 flex items-center justify-center text-brand-blue group-hover:scale-110 transition-transform shadow-inner">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-extrabold uppercase text-gray-500 tracking-wider mb-1.5">{t('footer.support.phone.label')}</p>
                  <p className="text-base font-black text-white group-hover:text-brand-blue transition-colors">1800-INDIWA-01</p>
                </div>
              </div>

              <div className="h-[1px] w-full bg-gradient-to-r from-white/5 via-white/10 to-white/5" />

              <div className="flex items-start gap-4 relative z-10 font-sans">
                <div className="w-12 h-12 rounded-2xl bg-brand-green/10 flex items-center justify-center text-brand-green group-hover:scale-110 transition-transform shadow-inner">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-extrabold uppercase text-gray-500 tracking-wider mb-1.5">{t('footer.support.email.label')}</p>
                  <p className="text-base font-black text-white group-hover:text-brand-green transition-colors">support@indiwa.org</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Global Membership Tier Banner */}
        <div className="bg-white/5 border border-white/10 rounded-[35px] lg:rounded-ultra p-8 sm:p-12 flex flex-col md:flex-row justify-between items-center gap-10 mb-16 shadow-2xl backdrop-blur-3xl relative group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/5 to-brand-orange/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex items-center gap-6 relative z-10">
            <div className="w-20 h-20 rounded-2xl bg-orange-gradient text-white flex items-center justify-center shadow-glow group-hover:rotate-6 transition-transform shrink-0">
              <ShieldCheck size={40} />
            </div>
            <div className="space-y-2">
              <h4 className="text-2xl font-black text-white uppercase tracking-tight leading-none">{t('footer.banner.title')}</h4>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest opacity-80">{t('footer.banner.sub')}</p>
            </div>
          </div>
          <Link to="/contact" className="relative z-10 bg-white text-brand-blue px-12 py-5 rounded-full font-black text-[11px] uppercase tracking-[0.2em] shadow-xl hover:bg-brand-green hover:text-white hover:scale-105 active:scale-95 transition-all whitespace-nowrap">
            {t('footer.banner.btn')}
          </Link>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <div className="text-[11px] font-bold text-gray-500 uppercase tracking-[0.25em] flex items-center gap-2">
            © {new Date().getFullYear()} INDIWA • {t('footer.copy.tagline')}
          </div>
          <div className="flex gap-10 text-[10px] font-black uppercase tracking-[0.25em] text-gray-500/80">
            <Link to="/privacy"    className="hover:text-white transition-colors">{t('footer.copy.privacy')}</Link>
            <Link to="/terms"      className="hover:text-white transition-colors">{t('footer.copy.terms')}</Link>
            <Link to="/compliance" className="hover:text-white transition-colors">{t('footer.copy.compliance')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

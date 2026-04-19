import React from 'react';
import {
  ArrowRight, ShieldCheck, Landmark, Scale, Trophy, Users,
  Award, Zap, MoveRight, ShieldAlert, Rocket, Eye, Target,
  Globe, HeartHandshake, CheckCircle2, Heart, TrendingUp
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const SectionHeader = ({ script, title, description, dark = false }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    className="space-y-4 max-w-4xl mx-auto text-center mb-10 px-4 gpu-accelerated"
  >
    <span className="font-script text-brand-red text-3xl md:text-4xl block transform -rotate-1">{script}</span>
    <h2 className={`uppercase tracking-tight leading-[1.1] ${dark ? 'text-white' : 'text-gray-900'}`}>{title}</h2>
    <div className="w-16 h-1 bg-brand-blue mx-auto rounded-full mt-6"></div>
    {description && (
      <p className={`text-lg md:text-xl font-medium max-w-2xl mx-auto mt-8 leading-relaxed ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
        {description}
      </p>
    )}
  </motion.div>
);

const ValueCard = ({ icon: Icon, title, description }) => (
  <motion.div
    whileHover={{ y: -12, scale: 1.02 }}
    className="bg-white p-10 rounded-ultra shadow-premium border border-gray-100/50 hover:border-brand-blue/30 transition-all duration-500 group relative overflow-hidden"
  >
    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-brand-green/10 transition-colors duration-700" />
    <div className="relative z-10">
      <div className="flex items-center gap-6 mb-8">
        <div className="w-16 h-16 bg-brand-blue text-white rounded-2xl flex items-center justify-center group-hover:bg-brand-green transition-all duration-500 shadow-glow-blue group-hover:shadow-glow-green group-hover:rotate-3 group-hover:scale-110">
          <Icon size={30} />
        </div>
        <h4 className="text-2xl font-black text-gray-900 uppercase tracking-tighter leading-none group-hover:text-brand-blue transition-colors">{title}</h4>
      </div>
      <p className="text-gray-600 font-semibold text-base leading-relaxed border-l-4 border-slate-100 group-hover:border-brand-green pl-6 transition-all duration-500">
        {description}
      </p>
    </div>
    <div className="absolute -bottom-6 -right-6 text-gray-50 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 -z-0 pointer-events-none">
      <Icon size={140} strokeWidth={0.5} />
    </div>
  </motion.div>
);

const Mission = () => {
  const { t } = useLanguage();

  const bulletPoints = [
    t('mission.stmt.b1'),
    t('mission.stmt.b2'),
    t('mission.stmt.b3'),
    t('mission.stmt.b4'),
    t('mission.stmt.b5'),
  ];

  return (
    <div className="bg-white">

      {/* 1. Vision Section */}
      <section className="py-8 lg:py-12 relative overflow-hidden bg-slate-50">
        <div className="container-tight px-6 lg:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-16 items-center">
            <div className="relative group">
              <div className="absolute inset-0 bg-brand-blue/5 blur-3xl rounded-full" />
              <img
                src="/legal_gavel.png"
                alt="Visionary Leadership"
                className="relative z-10 w-full lg:min-h-[70vh] h-[550px] md:h-[750px] object-cover rounded-ultra shadow-premium border-8 border-white group-hover:rotate-1 transition-transform duration-700"
              />
              <div className="absolute bottom-4 right-4 md:-bottom-12 md:-right-10 glass p-5 md:p-12 rounded-2xl md:rounded-ultra shadow-glow-blue max-w-[200px] md:max-w-[320px] z-30">
                <div className="w-10 h-10 md:w-14 md:h-14 bg-brand-blue text-white rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 shadow-glow">
                  <Eye className="w-5 h-5 md:w-7 md:h-7" />
                </div>
                <h4 className="text-lg md:text-2xl font-black text-gray-900 uppercase tracking-tight mb-2 md:mb-4 leading-none">{t('mission.vision.badge.title')}</h4>
                <p className="text-[10px] md:text-sm text-gray-600 font-bold leading-relaxed opacity-80">
                  {t('mission.vision.badge.body')}
                </p>
              </div>
            </div>

            <div className="space-y-10 lg:pl-10">
              <SectionHeader
                script={t('mission.vision.script')}
                title={t('mission.vision.title')}
                description={t('mission.vision.desc')}
              />
              <div className="grid grid-cols-1 gap-8">
                {[
                  { title: t('mission.vision.card1.title'), desc: t('mission.vision.card1.desc'), icon: Landmark },
                  { title: t('mission.vision.card2.title'), desc: t('mission.vision.card2.desc'), icon: ShieldCheck },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-8 p-10 bg-white rounded-ultra border border-gray-100 shadow-premium hover:shadow-2xl transition-all hover-lift">
                    <div className="w-16 h-16 rounded-2xl bg-green-50 text-brand-green flex items-center justify-center shrink-0 shadow-inner">
                      <item.icon size={28} />
                    </div>
                    <div className="pt-1">
                      <h4 className="text-xl font-black text-gray-900 uppercase tracking-tight mb-3 leading-none">{item.title}</h4>
                      <p className="text-base text-gray-500 font-bold leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Mission Statement */}
      <section className="section-padding bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh-deep opacity-10" />
        <div className="container-tight px-6 relative z-10 text-center">
          <div className="max-w-4xl mx-auto space-y-16">
            <div className="space-y-6">
              <span className="font-script text-brand-red text-3xl md:text-4xl block transform -rotate-1">{t('mission.stmt.script')}</span>
              <h3 className="text-white text-5xl md:text-6xl uppercase tracking-tighter leading-none">
                {t('mission.stmt.title1')} <br />{t('mission.stmt.title2')}
              </h3>
            </div>

            <div className="p-12 md:p-20 bg-white/5 rounded-ultra backdrop-blur-xl border border-white/10 shadow-3xl text-left space-y-10 relative group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-green/10 blur-[60px] rounded-full group-hover:bg-brand-green/20 transition-colors" />
              <h3 className="text-2xl font-black uppercase tracking-[0.2em] text-white/50 leading-none">{t('mission.stmt.label')}</h3>
              <p className="text-2xl md:text-3xl font-black leading-tight text-white tracking-tight">
                {t('mission.stmt.quote')}
              </p>
              <p className="text-lg md:text-xl text-gray-400 font-semibold leading-relaxed border-l-4 border-brand-green pl-10 italic">
                {t('mission.stmt.sub')}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 pt-8 border-t border-white/5">
                {bulletPoints.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-5 text-blue-50/90">
                    <div className="w-8 h-8 rounded-full bg-brand-green/20 text-brand-green flex items-center justify-center shrink-0 border border-brand-green/30">
                      <ArrowRight size={16} />
                    </div>
                    <span className="text-[11px] font-black uppercase tracking-[0.2em]">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Values */}
      <section className="section-padding bg-white relative overflow-hidden">
        <div className="container-tight px-6">
          <SectionHeader
            script={t('mission.values.script')}
            title={t('mission.values.title')}
            description={t('mission.values.desc')}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            <ValueCard icon={ShieldCheck} title={t('mission.values.card1.title')} description={t('mission.values.card1.desc')} />
            <ValueCard icon={Eye}         title={t('mission.values.card2.title')} description={t('mission.values.card2.desc')} />
            <ValueCard icon={Users}       title={t('mission.values.card3.title')} description={t('mission.values.card3.desc')} />
            <ValueCard icon={TrendingUp}  title={t('mission.values.card4.title')} description={t('mission.values.card4.desc')} />
            <ValueCard icon={ShieldAlert} title={t('mission.values.card5.title')} description={t('mission.values.card5.desc')} />
            <ValueCard icon={Award}       title={t('mission.values.card6.title')} description={t('mission.values.card6.desc')} />
          </div>
        </div>
      </section>

      {/* 4. CTA */}
      <section className="section-padding relative overflow-hidden text-center bg-white">
        <div className="container-tight px-6">
          <div className="bg-brand-gradient rounded-ultra p-16 md:p-24 relative overflow-hidden shadow-glow-blue group">
            <div className="absolute inset-0 bg-mesh-deep opacity-30 pulsate" />
            <div className="relative z-10 max-w-4xl mx-auto space-y-12">
              <h2 className="text-4xl md:text-6xl uppercase tracking-tighter mb-8 text-white leading-none">
                {t('mission.cta.h2.line1')} <br />
                <span className="text-brand-green underline decoration-[6px] underline-offset-[12px]">{t('mission.cta.h2.line2')}</span>
              </h2>
              <p className="text-xl md:text-2xl text-blue-100 font-semibold mb-12 max-w-2xl mx-auto leading-relaxed">
                {t('mission.cta.body')}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-6">
                <Link to="/contact" className="w-full sm:w-auto inline-flex items-center justify-center gap-5 bg-white text-brand-blue px-14 py-7 rounded-full font-black text-xs uppercase tracking-[0.25em] shadow-2xl hover:bg-brand-green hover:text-white transition-all group scale-100 hover:scale-105 active:scale-95">
                  {t('mission.cta.btn')} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Mission;

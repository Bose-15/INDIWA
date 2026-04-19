import React from 'react';
import {
  ArrowRight, ShieldCheck, Landmark, Scale, Mic, HandHeart, Trophy, Users, Map,
  Megaphone, Handshake, Award, Gavel, GraduationCap, FlaskConical, Heart,
  Briefcase, Building, TrendingUp, Zap, Sparkles, MoveRight, ShieldAlert, Fingerprint, SearchCheck,
  Rocket, Eye, Target, Globe, HeartHandshake, CheckCircle2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const SectionHeader = ({ script, title, description, dark = false, tight = false }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    className={`space-y-2 max-w-4xl mx-auto text-center ${tight ? 'mb-2' : 'mb-6'} px-4 gpu-accelerated`}
  >
    <span className="font-script text-brand-red text-3xl md:text-4xl block transform -rotate-1">{script}</span>
    <h2 className={`uppercase tracking-tight leading-[1.1] ${dark ? 'text-white' : 'text-gray-900'}`}>{title}</h2>
    <div className="w-16 h-1 bg-brand-blue mx-auto rounded-full mt-4"></div>
    {description && (
      <p className={`text-lg md:text-xl font-medium max-w-2xl mx-auto mt-6 leading-relaxed ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
        {description}
      </p>
    )}
  </motion.div>
);

const ValueCard = ({ icon: Icon, title, description }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-white p-7 md:p-10 rounded-ultra shadow-premium border border-gray-50 hover:border-brand-blue/20 transition-all group"
  >
    <div className="flex items-center gap-6 mb-6">
      <div className="w-14 h-14 bg-slate-50 text-brand-blue rounded-2xl flex items-center justify-center group-hover:bg-brand-blue group-hover:text-white transition-all shadow-inner">
        <Icon size={28} />
      </div>
      <h4 className="text-2xl font-black text-gray-900 uppercase tracking-tight leading-none">{title}</h4>
    </div>
    <p className="text-gray-500 font-bold text-base border-l-4 border-brand-green/20 pl-6 leading-relaxed">{description}</p>
  </motion.div>
);

const About = () => {
  const { t } = useLanguage();

  const logoCards = [
    { src: '/meaning_globe_color.png',  title: t('about.logo.card1.title'), text: t('about.logo.card1.text') },
    { src: '/meaning_people_color.png', title: t('about.logo.card2.title'), text: t('about.logo.card2.text') },
    { src: '/meaning_logo_color.png',   title: t('about.logo.card3.title'), text: t('about.logo.card3.text') },
    { src: '/meaning_hand_color.png',   title: t('about.logo.card4.title'), text: t('about.logo.card4.text') },
  ];

  return (
    <div className="bg-white">

      {/* 1. Who We Are */}
      <section className="py-8 lg:py-12 relative overflow-hidden bg-white">
        <div className="container-tight">
          <SectionHeader
            tight
            script={t('about.who.script')}
            title={<>{t('about.who.h1.line1')} <br />{t('about.who.h1.line2')}</>}
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-16 items-center mt-12">
            <div className="space-y-6 order-2 lg:order-1">
              <div className="p-8 md:p-12 lg:p-16 bg-white/5 rounded-ultra backdrop-blur-xl border border-white/10 shadow-3xl text-left space-y-8 relative group">
                <p className="text-xl md:text-2xl text-gray-900 font-black leading-relaxed italic opacity-90">
                  {t('about.who.body1')}
                </p>
                <p className="text-gray-600 font-semibold text-lg md:text-xl leading-relaxed">
                  {t('about.who.body2')}
                </p>
                <p className="text-gray-600 font-semibold text-lg md:text-xl leading-relaxed">
                  {t('about.who.body3')}
                </p>
              </div>
            </div>

            <div className="relative group order-1 lg:order-2">
              <div className="absolute inset-0 bg-brand-green/5 blur-3xl rounded-full" />
              <img
                src="/community_gathering.png"
                alt="INDIWA Community"
                className="relative z-10 w-full lg:min-h-[60vh] max-h-[75vh] object-cover rounded-ultra shadow-premium border-8 border-white group-hover:rotate-1 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Logo Meaning */}
      <section className="section-padding bg-slate-50 relative overflow-hidden">
        <div className="container-tight px-6 py-12 md:py-24">
          <div className="max-w-4xl mx-auto text-center space-y-10 mb-20 md:mb-32">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-center space-y-8"
            >
              <img src="/logo.png" alt="INDIWA Logo" className="h-32 md:h-48 w-auto mb-2 drop-shadow-2xl" />
              <div className="space-y-3">
                <span className="font-script text-brand-red text-4xl md:text-5xl block transform -rotate-1">{t('about.logo.script')}</span>
                <h2 className="text-6xl md:text-8xl font-black text-[#00213d] tracking-tighter uppercase leading-none">{t('about.logo.title')}</h2>
              </div>
              <div className="w-40 h-1.5 bg-brand-green rounded-full mx-auto" />
              <p className="text-xl md:text-3xl text-gray-900 font-bold leading-relaxed max-w-3xl px-4">
                {t('about.logo.body')}
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
            {logoCards.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                whileHover={{ y: -12 }}
                className="bg-white p-10 md:p-14 rounded-ultra shadow-premium border border-gray-100 flex flex-col items-start gap-10 group transition-all duration-500 hover:shadow-glow-green hover:border-brand-green/20 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-2 h-0 bg-brand-green group-hover:h-full transition-all duration-700" />
                <div className="w-24 h-24 md:w-32 md:h-32 flex items-center justify-center shrink-0">
                  <img
                    src={item.src}
                    alt={item.title}
                    className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-700 scale-95 group-hover:scale-100"
                  />
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl md:text-3xl font-black text-[#00213d] uppercase tracking-tight leading-none">{item.title}</h3>
                  <p className="text-gray-600 font-semibold text-base md:text-lg leading-relaxed max-w-sm">{item.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Core Values */}
      <section className="section-padding bg-white relative overflow-hidden">
        <div className="container-tight px-6">
          <SectionHeader
            script={t('about.values.script')}
            title={t('about.values.title')}
            description={t('about.values.desc')}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ValueCard icon={ShieldCheck} title={t('about.values.card1.title')} description={t('about.values.card1.desc')} />
            <ValueCard icon={Fingerprint} title={t('about.values.card2.title')} description={t('about.values.card2.desc')} />
            <ValueCard icon={Users}       title={t('about.values.card3.title')} description={t('about.values.card3.desc')} />
            <ValueCard icon={TrendingUp}  title={t('about.values.card4.title')} description={t('about.values.card4.desc')} />
            <ValueCard icon={ShieldAlert} title={t('about.values.card5.title')} description={t('about.values.card5.desc')} />
            <ValueCard icon={Trophy}      title={t('about.values.card6.title')} description={t('about.values.card6.desc')} />
          </div>
        </div>
      </section>

      {/* 4. CTA */}
      <section className="section-padding relative overflow-hidden text-center bg-white">
        <div className="container-tight px-6">
          <div className="bg-brand-gradient rounded-ultra p-8 md:p-16 lg:p-24 relative overflow-hidden shadow-glow-blue group">
            <div className="absolute inset-0 bg-mesh-deep opacity-10 pulsate" />
            <div className="relative z-10 max-w-4xl mx-auto space-y-12">
              <h2 className="text-4xl md:text-6xl text-white uppercase tracking-tighter leading-none">
                {t('about.cta.h2.line1')} <br />
                <span className="text-brand-green underline decoration-[6px] underline-offset-[12px]">{t('about.cta.h2.line2')}</span>
              </h2>
              <p className="text-xl md:text-2xl text-gray-300 font-semibold mb-12 max-w-2xl mx-auto leading-relaxed">
                {t('about.cta.body')}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-6">
                <Link to="/contact" className="w-full sm:w-auto inline-flex items-center justify-center gap-5 bg-white text-brand-blue px-14 py-7 rounded-full font-black text-xs uppercase tracking-[0.25em] shadow-glow-white hover:bg-brand-green hover:text-white transition-all group scale-100 hover:scale-105 active:scale-95">
                  {t('about.cta.btn')} <Heart size={18} fill="currentColor" className="group-hover:scale-110 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;

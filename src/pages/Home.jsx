import React, { useState } from 'react';
import {
  ArrowRight, ShieldCheck, Landmark, Scale, Mic, HandHeart, Trophy, Users, Map,
  Megaphone, Handshake, Award, Gavel, GraduationCap, FlaskConical, Heart,
  Briefcase, Building, TrendingUp, Play, Lightbulb, Monitor, LayoutGrid, CheckCircle2,
  ChevronRight, HeartHandshake, Zap, Sparkles, MoveRight, ShieldAlert, Fingerprint, SearchCheck,
  Globe, Shapes
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

// --- Sub-components ---

const BackgroundDecor = () => (
  <div className="absolute inset-0 -z-20 overflow-hidden pointer-events-none">
    <div className="absolute inset-0 bg-mesh-deep opacity-80"></div>
    <div className="absolute inset-0 bg-dot-pattern opacity-40"></div>
    <motion.svg
      viewBox="0 0 1000 1000"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute top-[-10%] left-[-10%] w-[80%] h-[80%] opacity-[0.08] will-change-transform"
      style={{ backfaceVisibility: 'hidden' }}
      animate={{ rotate: [0, 90, 180, 270, 360], scale: [1, 1.1, 1, 0.9, 1] }}
      transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
    >
      <motion.path
        fill="var(--color-brand-blue)"
        animate={{ d: [
          "M822,668.5Q735,837,552.5,854Q370,871,250,735.5Q130,600,205.5,431.5Q281,263,456.5,212Q632,161,770,280.5Q908,400,822,668.5Z",
          "M813,639.5Q750,779,598,829Q446,879,285.5,791.5Q125,704,142,530.5Q159,357,301,232.5Q443,108,603,171Q763,234,819.5,367Q876,500,813,639.5Z",
          "M822,668.5Q735,837,552.5,854Q370,871,250,735.5Q130,600,205.5,431.5Q281,263,456.5,212Q632,161,770,280.5Q908,400,822,668.5Z"
        ]}}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.svg>
    <motion.svg
      viewBox="0 0 1000 1000"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] opacity-[0.06] will-change-transform"
      style={{ backfaceVisibility: 'hidden' }}
      animate={{ rotate: [360, 270, 180, 90, 0], scale: [1, 1.2, 1, 1.1, 1] }}
      transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
    >
      <motion.path
        fill="var(--color-brand-orange)"
        animate={{ d: [
          "M862,654.5Q824,809,662,810Q500,811,357.5,798Q215,785,152.5,642.5Q90,500,166.5,372Q243,244,403.5,205.5Q564,167,732,207.5Q900,248,881,424Q862,600,862,654.5Z",
          "M791,659.5Q742,819,576,825.5Q410,832,260.5,750.5Q111,669,141.5,502Q172,335,302,192.5Q432,50,589,140Q746,230,793,365Q840,500,791,659.5Z",
          "M862,654.5Q824,809,662,810Q500,811,357.5,798Q215,785,152.5,642.5Q90,500,166.5,372Q243,244,403.5,205.5Q564,167,732,207.5Q900,248,881,424Q862,600,862,654.5Z"
        ]}}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.svg>
  </div>
);

const SectionHeader = ({ script, title, description, dark = false }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    className="space-y-4 max-w-4xl mx-auto text-center mb-10 px-4 gpu-accelerated"
  >
    <span className="font-script text-brand-red text-3xl md:text-4xl block transform -rotate-1">{script}</span>
    <h2 className={`uppercase tracking-tighter leading-[1.05] ${dark ? 'text-white' : 'text-gray-900'}`}>{title}</h2>
    <div className="w-16 h-1 bg-brand-blue mx-auto rounded-full mt-6"></div>
    {description && (
      <p className={`text-lg md:text-xl font-medium max-w-2xl mx-auto mt-8 leading-relaxed ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
        {description}
      </p>
    )}
  </motion.div>
);

const ActionCard = ({ icon: Icon, title, description, highlighted = false }) => (
  <motion.div
    whileHover={{ y: -15, scale: 1.02 }}
    className={`p-6 md:p-10 rounded-ultra glass relative overflow-hidden group transition-all duration-500 ${highlighted ? 'border-t-8 border-brand-orange shadow-[0_30px_70px_rgba(241,90,36,0.15)]' : 'border border-gray-100 hover:border-brand-blue/30 shadow-premium hover:shadow-2xl'}`}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-lg bg-brand-blue group-hover:bg-brand-orange text-white shadow-blue-500/20 group-hover:shadow-orange-500/40">
      <Icon size={32} />
    </div>
    <div className="space-y-4 relative z-10">
      <h3 className="text-xl font-extrabold text-gray-900 tracking-tight uppercase leading-none group-hover:text-brand-blue transition-colors">{title}</h3>
      <p className="text-gray-600 font-semibold text-[15px] leading-relaxed tracking-tight">{description}</p>
    </div>
    <div className="absolute bottom-4 right-8 text-gray-100/50 font-heading text-8xl -z-10 group-hover:text-blue-50/40 group-hover:scale-110 transition-all duration-700">
      <Icon size={120} strokeWidth={0.5} />
    </div>
  </motion.div>
);

const FocusPillar = ({ title, description, items, index, activePillar, setActivePillar, viewStrategyLabel }) => {
  const isActive = activePillar === index;
  return (
    <motion.div
      onHoverStart={() => setActivePillar(index)}
      onClick={() => setActivePillar(index)}
      className={`relative rounded-ultra overflow-hidden transition-all duration-700 cursor-pointer border border-white/20 will-change-transform
        ${isActive
          ? 'lg:flex-[2.5] shadow-2xl scale-[1.02] h-[550px]'
          : 'lg:flex-1 grayscale-[0.5] opacity-70 hover:opacity-100 h-24 lg:h-[550px]'}`}
    >
      <div className="absolute inset-0 bg-slate-900 transition-all duration-700">
        <img
          src={`https://images.unsplash.com/photo-${index === 0 ? '1511632765486-a01980e01a18' : index === 1 ? '1522202176988-66273c2fd55f' : '1509099836639-18ba1795216d'}?q=80&w=1200&auto=format&fit=crop`}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
      </div>
      <div className={`absolute inset-0 p-8 md:p-10 flex flex-col ${isActive ? 'justify-end' : 'justify-center lg:justify-end'} text-white`}>
        <motion.div layout className="space-y-5">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center font-extrabold text-[10px]">0{index + 1}</span>
            <h3 className="text-xl md:text-2xl font-extrabold uppercase tracking-tighter">{title}</h3>
          </div>
          <AnimatePresence mode="wait">
            {isActive && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="space-y-6"
              >
                <p className="text-blue-100/90 font-medium text-sm md:text-base max-w-sm">{description}</p>
                <div className="grid grid-cols-2 gap-3 pb-4">
                  {items.map((item, i) => (
                    <div key={i} className="flex items-center gap-2.5 bg-white/10 hover:bg-white/20 p-3 rounded-xl transition-all group/item border border-white/5">
                      <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-brand-orange group-hover/item:scale-110 transition-transform">
                        <item.icon size={14} />
                      </div>
                      <span className="text-[10px] font-extrabold uppercase tracking-[0.15em]">{item.title}</span>
                    </div>
                  ))}
                </div>
                <Link to="/about" className="inline-flex items-center gap-4 text-brand-orange font-extrabold text-[10px] uppercase tracking-[0.2em] group/link">
                  {viewStrategyLabel} <MoveRight className="transition-transform group-hover/link:translate-x-2" size={14} />
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
      {!isActive && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:rotate-90 whitespace-nowrap hidden lg:block">
          <span className="text-3xl font-extrabold text-white/15 uppercase tracking-[0.4em] font-heading">{title}</span>
        </div>
      )}
    </motion.div>
  );
};

// --- Main Page Component ---

const Home = () => {
  const { scrollYProgress } = useScroll();
  const [activePillar, setActivePillar] = useState(0);
  const { t } = useLanguage();

  const pillars = [
    {
      title: t('home.pillars.p1.title'),
      description: t('home.pillars.p1.desc'),
      items: [
        { title: t('home.pillars.p1.i1'), icon: Users },
        { title: t('home.pillars.p1.i2'), icon: Globe },
        { title: t('home.pillars.p1.i3'), icon: HandHeart },
        { title: t('home.pillars.p1.i4'), icon: Heart }
      ]
    },
    {
      title: t('home.pillars.p2.title'),
      description: t('home.pillars.p2.desc'),
      items: [
        { title: t('home.pillars.p2.i1'), icon: GraduationCap },
        { title: t('home.pillars.p2.i2'), icon: TrendingUp },
        { title: t('home.pillars.p2.i3'), icon: Zap },
        { title: t('home.pillars.p2.i4'), icon: Lightbulb }
      ]
    },
    {
      title: t('home.pillars.p3.title'),
      description: t('home.pillars.p3.desc'),
      items: [
        { title: t('home.pillars.p3.i1'), icon: HeartHandshake },
        { title: t('home.pillars.p3.i2'), icon: ShieldCheck },
        { title: t('home.pillars.p3.i3'), icon: Shapes },
        { title: t('home.pillars.p3.i4'), icon: Map }
      ]
    }
  ];

  return (
    <div className="w-full bg-white selection:bg-brand-blue selection:text-white">

      {/* 1. Hero */}
      <section className="relative lg:min-h-[70vh] flex items-center pt-20 pb-12 lg:pt-28 lg:pb-20 overflow-hidden border-b border-gray-50">
        <BackgroundDecor />
        <div className="container-tight grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4 md:space-y-10 text-center lg:text-left"
          >
            <div className="space-y-3 md:space-y-6">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-script text-brand-red text-3xl md:text-5xl block transform -rotate-1"
              >
                {t('home.hero.script')}
              </motion.span>
              <div className="bg-slate-900 text-white text-[10px] font-black px-6 py-2 rounded-full w-fit uppercase tracking-[0.3em] shadow-2xl mx-auto lg:mx-0">
                {t('home.hero.pill')}
              </div>
            </div>

            <div className="space-y-3 md:space-y-8">
              <h1 className="text-gray-900 leading-[0.95] tracking-tight">
                {t('home.hero.h1.line1')} <br />
                <span className="text-brand-blue relative inline-block">
                  {t('home.hero.h1.line2')}
                </span>
              </h1>
              <p className="text-sm md:text-xl text-gray-600 font-semibold max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                {t('home.hero.sub')}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 justify-center lg:justify-start pt-2 md:pt-4">
              <Link to="/contact" className="w-full sm:w-auto bg-brand-blue text-white px-12 py-5 sm:py-6 rounded-full font-black text-xs uppercase tracking-[0.2em] shadow-glow-blue hover:shadow-glow-blue/50 hover:scale-105 active:scale-95 transition-all text-center">
                {t('home.hero.cta.primary')}
              </Link>
              <Link to="/about" className="w-full sm:w-auto group flex items-center justify-center gap-4 text-gray-900 font-black text-xs uppercase tracking-[0.2em] hover:text-brand-blue transition-colors">
                {t('home.hero.cta.secondary')}
                <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-all">
                  <ArrowRight size={16} />
                </div>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative lg:block w-[calc(100%+3rem)] -mx-6 lg:w-full lg:mx-0 mt-12 lg:mt-0"
          >
            <div className="absolute inset-0 bg-brand-blue/5 blur-[120px] rounded-full" />
            <img
              src="/hero_impact.png"
              alt="INDIWA Impact"
              className="relative z-10 w-full h-auto min-h-[50vh] lg:min-h-[65vh] object-cover rounded-ultra shadow-premium border-8 border-white group-hover:scale-[1.02] transition-transform duration-1000"
            />
            <div className="absolute top-2 right-2 md:-top-10 md:-right-10 glass p-3 md:p-8 rounded-2xl md:rounded-ultra shadow-2xl z-20 animate-float max-w-[140px] md:max-w-[240px]">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="w-8 h-8 md:w-12 md:h-12 bg-orange-gradient text-white rounded-lg md:rounded-2xl flex items-center justify-center shadow-glow">
                  <ShieldCheck className="w-5 h-5 md:w-7 md:h-7" />
                </div>
                <div>
                  <p className="text-[7px] md:text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">{t('home.hero.badge.title')}</p>
                  <p className="text-[10px] md:text-sm font-black text-gray-900 uppercase">{t('home.hero.badge.sub')}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Who We Are */}
      <section className="section-padding bg-white relative overflow-hidden">
        <div className="container-tight">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-16 items-center">
            <div className="relative group p-4 lg:p-0">
              <div className="w-full h-[400px] md:h-[550px] bg-slate-50 rounded-ultra overflow-hidden shadow-inner p-4">
                <img src="/community_gathering.png" alt="Volunteer" className="w-full h-full object-cover rounded-[32px] transition-transform duration-1000 group-hover:scale-105" />
              </div>
              <div className="absolute -bottom-6 -right-2 md:-bottom-10 md:-right-4 bg-brand-gradient text-white p-8 md:p-10 rounded-ultra shadow-glow-blue max-w-[220px] md:max-w-[260px] z-30">
                <HeartHandshake size={32} className="mb-4 text-brand-green" />
                <h3 className="text-lg md:text-xl font-black leading-tight uppercase tracking-tight">
                  {t('home.who.card.title1')} <br />
                  {t('home.who.card.title2')} <br />
                  {t('home.who.card.title3')}
                </h3>
              </div>
            </div>

            <div className="space-y-10 px-4 md:px-0">
              <div className="space-y-6">
                <span className="font-script text-brand-red text-3xl md:text-4xl block transform -rotate-1">{t('home.who.script')}</span>
                <h2 className="uppercase tracking-tight text-gray-900 leading-[1.2]">
                  {t('home.who.h2.line1')} <br />
                  <span className="text-brand-blue">{t('home.who.h2.line2')}</span>
                </h2>
              </div>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-semibold">
                {t('home.who.body')}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-8 border-y border-gray-100">
                {[
                  t('home.who.tag1'),
                  t('home.who.tag2'),
                  t('home.who.tag3'),
                  t('home.who.tag4'),
                ].map((highlight, i) => (
                  <div key={i} className="flex items-center gap-4 group/item">
                    <div className="w-2.5 h-2.5 rounded-full bg-brand-orange shadow-glow-orange group-hover/item:scale-125 transition-transform" />
                    <span className="text-[12px] font-black uppercase tracking-widest text-gray-800">{highlight}</span>
                  </div>
                ))}
              </div>
              <div className="pt-4 flex justify-center md:justify-start">
                <Link to="/about" className="group text-sm font-black text-brand-blue flex items-center gap-3 hover:gap-6 transition-all uppercase tracking-[0.2em]">
                  {t('home.who.cta')} <ArrowRight size={18} className="text-brand-orange group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Mission & Vision */}
      <section className="section-padding bg-slate-50 relative overflow-hidden">
        <div className="container-tight">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <div className="bg-white p-7 md:p-10 rounded-ultra shadow-premium border border-gray-100">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-50 text-brand-blue rounded-2xl flex items-center justify-center">
                  <ShieldCheck size={24} />
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tight">{t('home.mv.mission.title')}</h3>
              </div>
              <p className="text-lg text-gray-600 font-semibold leading-relaxed">{t('home.mv.mission.body')}</p>
            </div>
            <div className="bg-white p-7 md:p-10 rounded-ultra shadow-premium border border-gray-100">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-orange-50 text-brand-orange rounded-2xl flex items-center justify-center">
                  <Sparkles size={24} />
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tight">{t('home.mv.vision.title')}</h3>
              </div>
              <p className="text-lg text-gray-600 font-semibold leading-relaxed">{t('home.mv.vision.body')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Membership Benefits */}
      <section className="section-padding bg-white relative overflow-hidden">
        <div className="container-tight">
          <SectionHeader
            script={t('home.benefits.script')}
            title={t('home.benefits.title')}
            description={t('home.benefits.desc')}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ActionCard icon={Scale}     title={t('home.benefits.card1.title')} description={t('home.benefits.card1.desc')} highlighted />
            <ActionCard icon={Award}     title={t('home.benefits.card2.title')} description={t('home.benefits.card2.desc')} />
            <ActionCard icon={Handshake} title={t('home.benefits.card3.title')} description={t('home.benefits.card3.desc')} />
            <ActionCard icon={Landmark}  title={t('home.benefits.card4.title')} description={t('home.benefits.card4.desc')} />
            <ActionCard icon={ShieldAlert} title={t('home.benefits.card5.title')} description={t('home.benefits.card5.desc')} />
            <ActionCard icon={TrendingUp} title={t('home.benefits.card6.title')} description={t('home.benefits.card6.desc')} />
          </div>
        </div>
      </section>

      {/* 5. Strategic Impact */}
      <section className="section-padding bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh-deep opacity-10" />
        <div className="container-tight relative z-10 px-4 md:px-0">
          <SectionHeader
            dark
            script={t('home.impact.script')}
            title={t('home.impact.title')}
            description={t('home.impact.desc')}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ActionCard icon={ShieldAlert} title={t('home.impact.card1.title')} description={t('home.impact.card1.desc')} highlighted />
            <ActionCard icon={Zap}         title={t('home.impact.card2.title')} description={t('home.impact.card2.desc')} />
            <ActionCard icon={Landmark}    title={t('home.impact.card3.title')} description={t('home.impact.card3.desc')} />
            <ActionCard icon={Megaphone}   title={t('home.impact.card4.title')} description={t('home.impact.card4.desc')} />
            <ActionCard icon={HandHeart}   title={t('home.impact.card5.title')} description={t('home.impact.card5.desc')} />
            <ActionCard icon={Trophy}      title={t('home.impact.card6.title')} description={t('home.impact.card6.desc')} />
          </div>
        </div>
      </section>

      {/* 6. Focus Pillars */}
      <section className="section-padding bg-slate-50 relative overflow-hidden">
        <div className="container-tight">
          <SectionHeader
            script={t('home.pillars.script')}
            title={t('home.pillars.title')}
            description={t('home.pillars.desc')}
          />
          <div className="flex flex-col lg:flex-row gap-8 lg:h-[600px] px-4 md:px-0">
            {pillars.map((pillar, idx) => (
              <FocusPillar
                key={idx}
                index={idx}
                {...pillar}
                activePillar={activePillar}
                setActivePillar={setActivePillar}
                viewStrategyLabel={t('home.pillars.viewstrategy')}
              />
            ))}
          </div>
          <div className="mt-20 text-center">
            <Link to="/about" className="inline-flex items-center justify-center gap-4 bg-brand-blue text-white px-14 py-6 rounded-full font-black shadow-glow-blue hover:shadow-glow-blue/50 hover:scale-105 active:scale-95 transition-all text-xs uppercase tracking-[0.25em]">
              {t('home.pillars.cta')} <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* 7. CTA Banner */}
      <section className="section-padding relative">
        <div className="w-full">
          <div className="bg-brand-gradient p-8 md:p-12 lg:p-24 relative overflow-hidden shadow-glow-blue group">
            <div className="absolute inset-0 bg-mesh-deep opacity-30 pulsate" />
            <div className="relative z-10 text-center max-w-4xl mx-auto space-y-12">
              <h2 className="text-white uppercase leading-[1.05] tracking-tighter">
                {t('home.cta.h2.line1')} <br />
                <span className="text-brand-green">{t('home.cta.h2.line2')}</span>
              </h2>
              <p className="text-xl md:text-2xl text-blue-100 font-semibold max-w-2xl mx-auto leading-relaxed opacity-90">
                {t('home.cta.body')}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-6">
                <Link to="/contact" className="w-full sm:w-auto bg-white text-brand-blue px-14 py-7 rounded-full font-black text-xs uppercase tracking-[0.25em] shadow-2xl hover:bg-brand-orange hover:text-white transition-all transform hover:-translate-y-1">
                  {t('home.cta.btn')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Contact Section */}
      <section className="section-padding bg-slate-50 relative overflow-hidden">
        <div className="container-tight relative z-10 px-4 md:px-0">
          <div className="bg-white rounded-ultra p-8 md:p-12 lg:p-24 border border-gray-100 flex flex-col lg:flex-row items-center justify-between gap-16 shadow-premium">
            <div className="space-y-10 max-w-xl text-center lg:text-left">
              <div className="space-y-6">
                <span className="font-script text-brand-red text-3xl md:text-4xl block transform -rotate-1">{t('home.contact.script')}</span>
                <h2 className="text-gray-900 uppercase tracking-tighter leading-none">{t('home.contact.title')}</h2>
              </div>
              <p className="text-lg md:text-xl text-gray-600 font-semibold leading-relaxed">{t('home.contact.body')}</p>
              <div className="pt-4 flex justify-center lg:justify-start">
                <Link to="/contact" className="inline-flex items-center gap-4 bg-brand-blue text-white px-12 py-6 rounded-full font-black shadow-glow-blue hover:shadow-glow-blue/50 hover:scale-105 active:scale-95 transition-all text-xs uppercase tracking-[0.2em]">
                  {t('home.contact.btn')} <MoveRight size={18} />
                </Link>
              </div>
            </div>
            <div className="w-full lg:w-auto">
              <div className="bg-slate-50 p-10 md:p-14 rounded-ultra shadow-inner border border-gray-100 space-y-10">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-brand-blue shadow-sm">
                    <GraduationCap size={28} />
                  </div>
                  <div>
                    <h4 className="font-black text-gray-900 uppercase text-xs tracking-widest leading-none mb-2">{t('home.contact.portal.title')}</h4>
                    <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mt-1">{t('home.contact.portal.sub')}</p>
                  </div>
                </div>
                <div className="h-[1px] w-full bg-gray-200/50" />
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-brand-orange shadow-sm">
                    <Zap size={28} />
                  </div>
                  <div>
                    <h4 className="font-black text-gray-900 uppercase text-xs tracking-widest leading-none mb-2">{t('home.contact.rapid.title')}</h4>
                    <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mt-1">{t('home.contact.rapid.sub')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;

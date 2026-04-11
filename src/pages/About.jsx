import React from 'react';
import {
   ArrowRight, ShieldCheck, Landmark, Scale, Mic, HandHeart, Trophy, Users, Map,
   Megaphone, Handshake, Award, Gavel, GraduationCap, FlaskConical, Heart,
   Briefcase, Building, TrendingUp, Zap, Sparkles, MoveRight, ShieldAlert, Fingerprint, SearchCheck,
   Rocket, Eye, Target, Globe, HeartHandshake, CheckCircle2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// --- Shared Reusable Components ---

const SectionHeader = ({ script, title, description, dark = false, tight = false }) => (
   <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      className={`space-y-2 max-w-4xl mx-auto text-center ${tight ? 'mb-2' : 'mb-6'} px-4 gpu-accelerated`}
   >
      <span className="font-script text-brand-orange text-3xl md:text-4xl block transform -rotate-1">{script}</span>
      <h2 className={`uppercase tracking-tight leading-[1.1] ${dark ? 'text-white' : 'text-gray-900'}`}>{title}</h2>
      <div className="w-16 h-1 bg-brand-blue mx-auto rounded-full mt-4"></div>
      {description && (
         <p className={`text-lg md:text-xl font-medium max-w-2xl mx-auto mt-6 leading-relaxed ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
            {description}
         </p>
      )}
   </motion.div>
);

const ActionCard = ({ icon: Icon, title, description, highlighted = false }) => (
   <motion.div
      whileHover={{ y: -10 }}
      className={`p-10 rounded-ultra glass relative overflow-hidden group transition-all duration-500 ${highlighted ? 'border-t-8 border-brand-orange shadow-premium' : 'border border-gray-50'}`}
   >
      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-colors duration-500 ${highlighted ? 'bg-orange-50 text-brand-orange shadow-inner' : 'bg-slate-50 text-brand-blue group-hover:bg-brand-blue group-hover:text-white shadow-inner'}`}>
         <Icon size={32} />
      </div>
      <div className="space-y-4 relative z-10">
         <h3 className="text-xl font-extrabold text-gray-900 tracking-tight uppercase leading-none">{title}</h3>
         <p className="text-gray-600 font-semibold text-[15px] leading-relaxed tracking-tight">{description}</p>
      </div>
      <div className="absolute bottom-4 right-8 text-gray-100/50 font-heading text-8xl -z-10 group-hover:text-blue-50/30 transition-colors">
         <Icon size={120} strokeWidth={0.5} />
      </div>
   </motion.div>
);

// --- About Specific Components ---

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
      <p className="text-gray-500 font-bold text-base border-l-4 border-brand-orange/20 pl-6 leading-relaxed">{description}</p>
   </motion.div>
);

const About = () => {
   return (
      <div className="bg-white">
         <section className="py-8 lg:py-12 relative overflow-hidden bg-white">
            <div className="container-tight">
               <SectionHeader
                  tight
                  script="Who We Are"
                  title={<>Building Trust, Protection & <br />Growth for India’s Networkers</>}
               />
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-16 items-center mt-12">
                  <div className="space-y-6 order-2 lg:order-1">
                     <div className="p-8 md:p-12 lg:p-16 bg-white/5 rounded-ultra backdrop-blur-xl border border-white/10 shadow-3xl text-left space-y-8 relative group">
                        <p className="text-xl md:text-2xl text-gray-900 font-black leading-relaxed italic opacity-90">
                           INDIWA was formed with the vision of creating a strong, ethical, and united ecosystem for India’s network marketing and direct selling community.
                        </p>
                        <p className="text-gray-600 font-semibold text-lg md:text-xl leading-relaxed">
                           Thousands of genuine professionals work hard every day but often face social misunderstanding, lack of recognition, and fraudulent schemes damaging the industry’s image.
                        </p>
                        <p className="text-gray-600 font-semibold text-lg md:text-xl leading-relaxed">
                           INDIWA stands as a bridge between professionals, companies, regulators, and society.
                        </p>
                     </div>
                  </div>

                  <div className="relative group order-1 lg:order-2">
                     <div className="absolute inset-0 bg-brand-orange/5 blur-3xl rounded-full" />
                      <img
                        src="/community_gathering.png"
                        alt="INDIWA Community"
                        className="relative z-10 w-full lg:min-h-[60vh] max-h-[75vh] object-cover rounded-ultra shadow-premium border-8 border-white group-hover:rotate-1 transition-transform duration-700"
                     />
                     {/* <div className="absolute -bottom-8 -right-8 bg-slate-900 text-white p-10 rounded-ultra shadow-2xl z-20 hidden md:block border-l-4 border-brand-orange">
                        <p className="text-2xl font-black text-white leading-none mb-2 uppercase tracking-tight">National</p>
                        <p className="text-4xl font-black text-brand-orange leading-none mb-1">LAUNCH</p>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mt-2">Phase 01: Core Formation</p>
                     </div> */}
                  </div>
               </div>
            </div>
         </section>



         {/* 4. Core Values Section */}
         <section className="section-padding bg-white relative overflow-hidden">
            <div className="container-tight px-6">
               <SectionHeader
                  script="Our Identity"
                  title="Core Values"
                  description="The non-negotiable principles that drive every action, decision, and strategy at INDIWA."
               />

               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <ValueCard
                     icon={ShieldCheck}
                     title="Integrity"
                     description="Maintaining the highest moral standards and delivering on every promise to our members."
                  />
                  <ValueCard
                     icon={Fingerprint}
                     title="Transparency"
                     description="Clear communication and verified industry standards for every association initiative."
                  />
                  <ValueCard
                     icon={Users}
                     title="Unity"
                     description="Bringing together millions of individual professionals under one strong, national voice."
                  />
                  <ValueCard
                     icon={TrendingUp}
                     title="Growth"
                     description="Providing the resources and professional support needed for sustainable, long-term success."
                  />
                  <ValueCard
                     icon={ShieldAlert}
                     title="Protection"
                     description="Vigilant defense against fraudulent schemes and social misconceptions."
                  />
                  <ValueCard
                     icon={Trophy}
                     title="Leadership"
                     description="Empowering the next generation of professional industry leaders across India."
                  />
               </div>
            </div>
         </section>

         {/* 5. Final Call & Closing Line */}
         <section className="section-padding relative overflow-hidden text-center bg-white">
            <div className="container-tight px-6">
               <div className="bg-brand-gradient rounded-ultra p-8 md:p-16 lg:p-24 relative overflow-hidden shadow-glow-blue group">
                  <div className="absolute inset-0 bg-mesh-deep opacity-10 pulsate" />
                  <div className="relative z-10 max-w-4xl mx-auto space-y-12">
                     <h2 className="text-4xl md:text-6xl text-white uppercase tracking-tighter leading-none">A Strong Industry Begins <br />with <span className="text-brand-orange underline decoration-[6px] underline-offset-[12px]">Protected Professionals.</span></h2>
                     <p className="text-xl md:text-2xl text-gray-300 font-semibold mb-12 max-w-2xl mx-auto leading-relaxed">
                        Join the national movement today. Zero fees. Professional legal support.
                        A lifetime of growth and security for every networker in India.
                     </p>
                     <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-6">
                        <Link to="/contact" className="w-full sm:w-auto inline-flex items-center justify-center gap-5 bg-white text-brand-blue px-14 py-7 rounded-full font-black text-xs uppercase tracking-[0.25em] shadow-glow-white hover:bg-brand-orange hover:text-white transition-all group scale-100 hover:scale-105 active:scale-95">
                           Become a Member <Heart size={18} fill="currentColor" className="group-hover:scale-110 transition-transform" />
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

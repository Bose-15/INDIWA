import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Rocket, Trophy } from 'lucide-react';

const Contact = () => {
  return (
    <div className="bg-white">
      {/* 1. Page Header: Hero Style */}
      <section className="relative pt-24 pb-16 border-b border-gray-100 overflow-hidden">
        <div className="absolute inset-0 bg-dot-pattern opacity-10 -z-10" />
        <div className="container-tight px-6 text-center">
            <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               className="inline-flex items-center gap-3 bg-slate-900 text-white px-7 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-10 shadow-2xl border border-white/10"
            >
               <Rocket size={16} className="text-brand-orange animate-pulse" /> The National Movement
            </motion.div>
            
            <div className="space-y-6 max-w-4xl mx-auto">
               <span className="font-script text-brand-orange text-3xl md:text-4xl block transform -rotate-1">BECOME A PART OF IT</span>
               <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tighter uppercase leading-none">Uniting India for a <br/><span className="text-brand-blue">Stronger Tomorrow.</span></h1>
               <div className="w-16 h-1 bg-brand-blue mx-auto rounded-full mt-6"></div>
               <p className="text-lg md:text-xl font-semibold max-w-2xl mx-auto mt-8 leading-relaxed text-gray-600">
                  Ready to join a government-recognized movement that protects your rights? Reach out to our executive team to start your journey.
               </p>
            </div>
        </div>
      </section>

      {/* 2. Main Interaction Area */}
      <section className="section-padding relative overflow-hidden bg-white">
        <div className="container-tight px-6">
          <div className="flex flex-col lg:flex-row items-stretch gap-16 lg:gap-16">
            
            {/* Left Content: Info Cards */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex-1 space-y-12"
            >
              <div className="space-y-10">
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight uppercase leading-none">Direct Channels</h2>
                <p className="text-lg text-gray-500 font-bold leading-relaxed max-w-xl">
                  Connect with our dedicated support officers. Whether you're an individual networker or representing a leader community, we have streamlined channels for you.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-8">
                {/* Phone Card */}
                <div className="flex items-center gap-8 group p-8 rounded-ultra bg-slate-50 border border-gray-50 hover:bg-white hover:shadow-premium transition-all">
                  <div className="w-16 h-16 rounded-2xl bg-brand-blue text-white flex items-center justify-center shadow-glow-blue group-hover:scale-110 transition-transform">
                    <Phone size={28} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">National Helpline</p>
                    <p className="text-xl md:text-2xl font-black text-gray-900 tracking-tight">1800-INDIWA-01</p>
                  </div>
                </div>

                {/* Email Card */}
                <div className="flex items-center gap-8 group p-8 rounded-ultra bg-slate-50 border border-gray-50 hover:bg-white hover:shadow-premium transition-all">
                  <div className="w-16 h-16 rounded-2xl bg-brand-blue text-white flex items-center justify-center shadow-glow-blue group-hover:scale-110 transition-transform">
                    <Mail size={28} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Email Support</p>
                    <p className="text-xl md:text-2xl font-black text-gray-900 tracking-tight">support@indiwa.org</p>
                  </div>
                </div>

                {/* Hours Card */}
                <div className="flex items-center gap-8 group p-8 rounded-ultra bg-slate-50 border border-gray-50 hover:bg-white hover:shadow-premium transition-all">
                  <div className="w-16 h-16 rounded-2xl bg-brand-orange text-white flex items-center justify-center shadow-glow-orange group-hover:scale-110 transition-transform">
                    <Clock size={28} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Support Hours</p>
                    <p className="text-lg font-black text-gray-900 tracking-tight">
                      Mon - Fri | <span className="text-brand-orange">8 AM - 5 PM</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Members Overlay Badge Style */}
              <div className="pt-8 flex items-center gap-6">
                 <div className="flex -space-x-4">
                    {[1,2,3,4].map((i) => (
                       <img key={i} src={`https://i.pravatar.cc/100?u=${i + 20}`} className="w-14 h-14 rounded-full border-4 border-white shadow-lg" alt="Member" />
                    ))}
                    <div className="w-14 h-14 rounded-full bg-brand-orange text-white flex items-center justify-center text-[10px] font-black border-4 border-white shadow-lg">+4M</div>
                 </div>
                 <p className="text-xs font-black text-gray-400 uppercase tracking-[0.1em]">India's Largest Association of Networkers</p>
              </div>
            </motion.div>

            {/* Right Visual: Branded Design */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, x: 50 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex-1 relative"
            >
              <div className="relative h-full min-h-[500px] md:min-h-[700px] rounded-ultra overflow-hidden shadow-premium border-[12px] border-slate-50 group">
                <img 
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1000&auto=format&fit=crop" 
                  alt="INDIWA Support Representative" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-brand-blue/10 pointer-events-none group-hover:bg-brand-blue/0 transition-all" />
                
                {/* Elite Badge Overlay */}
                <div className="absolute top-10 left-10 glass p-8 rounded-ultra shadow-2xl max-w-[220px] backdrop-blur-xl border border-white/40">
                   <div className="w-10 h-10 bg-brand-orange text-white rounded-xl flex items-center justify-center mb-4 shadow-glow">
                      <Trophy size={20} />
                   </div>
                   <h4 className="text-xl font-black text-gray-900 uppercase tracking-tight mb-2 leading-none">India's Largest</h4>
                   <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] leading-none">Networkers Welfare Association</p>
                </div>

                {/* Vision Pill */}
                <div className="absolute bottom-10 left-10">
                   <div className="bg-slate-900/90 backdrop-blur-md text-white px-8 py-3 rounded-full text-[9px] font-black uppercase tracking-[0.3em] flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
                      Nation First Always
                   </div>
                </div>
              </div>
              
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-brand-orange/10 blur-3xl rounded-full -z-10" />
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-brand-blue/10 blur-[100px] rounded-full -z-10" />
            </motion.div>

          </div>
        </div>
      </section>

      {/* 3. Final Footer CTA Transition */}
      <section className="section-padding bg-slate-900 border-t border-white/5 relative overflow-hidden">
         <div className="absolute inset-0 bg-mesh-deep opacity-10 pulsate" />
         <div className="container-tight px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
               <div className="space-y-6">
                  <h2 className="text-white text-4xl md:text-5xl uppercase tracking-tighter leading-none">One Hub for <br/><span className="text-brand-orange">All Your Queries.</span></h2>
                  <p className="text-lg text-gray-400 font-semibold leading-relaxed">
                     Don't navigate the industry alone. Be part of a collective force that puts <span className="text-white">India’s Networkers</span> first.
                  </p>
               </div>
               <div className="flex flex-col sm:flex-row items-center justify-end gap-6">
                  <div className="p-8 md:p-10 rounded-ultra bg-white/5 border border-white/10 backdrop-blur-sm text-center min-w-[240px]">
                     <Phone size={32} className="text-brand-orange mx-auto mb-6" />
                     <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-3">Toll Free Support</p>
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

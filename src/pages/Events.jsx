import React, { useState } from 'react';
import { 
  ArrowRight, ShieldCheck, Landmark, Scale, Mic, HandHeart, Trophy, Users, Map, 
  Megaphone, Handshake, Award, Gavel, GraduationCap, FlaskConical, Heart, 
  Briefcase, Building, TrendingUp, Play, Lightbulb, Monitor, LayoutGrid, CheckCircle2,
  ChevronRight, HeartHandshake, Zap, Sparkles, MoveRight, ShieldAlert, Fingerprint, SearchCheck,
  Calendar, MapPin, Ticket, Clock, Share2, Bell, History
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// --- Shared Reusable Components ---

const SectionHeader = ({ script, title, description, dark = false }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    className="space-y-4 max-w-4xl mx-auto text-center mb-16 px-4"
  >
    <span className="font-script text-brand-red text-2xl md:text-3xl block transform -rotate-2">{script}</span>
    <h2 className={`uppercase tracking-tighter leading-[1.1] ${dark ? 'text-white' : 'text-gray-900'}`}>{title}</h2>
    <div className="w-12 h-1.5 bg-brand-blue mx-auto rounded-full mt-4"></div>
    {description && (
      <p className={`text-lg font-medium max-w-2xl mx-auto mt-6 ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
        {description}
      </p>
    )}
  </motion.div>
);

const EventCard = ({ category, date, title, location, description, price, image, index, type = "upcoming" }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    whileHover={{ y: -10 }}
    className={`group rounded-ultra border transition-all duration-500 overflow-hidden gpu-accelerated ${type === 'past' ? 'bg-slate-50 border-gray-100 opacity-80' : 'bg-white border-white shadow-xl hover:shadow-[0_40px_80px_rgba(0,87,184,0.1)]'}`}
  >
    <div className="relative h-48 overflow-hidden">
      <img src={image} alt={title} loading="lazy" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-start">
        <div className={`px-4 py-1.5 rounded-full text-[9px] font-extrabold uppercase tracking-widest ${type === 'past' ? 'bg-gray-200 text-gray-500' : 'bg-green-50 text-brand-green border border-green-100'}`}>
          {category}
        </div>
        <div className="flex gap-2">
            <button className="w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-brand-blue hover:bg-blue-50 transition-colors">
                <Share2 size={14} />
            </button>
            <button className="w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-brand-blue hover:bg-blue-50 transition-colors">
                <Bell size={14} />
            </button>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-3 text-brand-blue text-[11px] font-extrabold uppercase tracking-widest">
            <Calendar size={14} /> {date}
        </div>
        <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight leading-tight uppercase group-hover:text-brand-blue transition-colors">
            {title}
        </h3>
        <div className="flex items-center gap-2 text-gray-400 font-bold text-sm">
            <MapPin size={14} /> {location}
        </div>
      </div>

      <p className="text-gray-500 font-medium text-sm leading-relaxed line-clamp-2">
        {description}
      </p>

      <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
        <div className="flex flex-col">
            <span className="text-[10px] font-extrabold text-gray-300 uppercase tracking-widest">Access Fee</span>
            <span className="text-lg font-extrabold text-gray-900">{price}</span>
        </div>
        <button className={`flex items-center gap-3 px-8 py-3.5 rounded-full font-extrabold text-[10px] uppercase tracking-widest transition-all ${type === 'past' ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-brand-blue text-white shadow-glow-blue hover:scale-105 active:scale-95'}`}>
            {type === 'past' ? 'Event Ended' : 'Register Seat'} <MoveRight size={14} />
        </button>
      </div>
    </div>
  </motion.div>
);

const Events = () => {
    const [activeTab, setActiveTab] = useState('upcoming');

    const upcomingEvents = [
        {
            category: "Strategic Meet",
            date: "UPCOMING • 2024",
            title: "Leadership Meets",
            location: "Metropolitan Cities Nationwide",
            description: "High-level regional and national networking events for core members and industry leaders.",
            price: "MEMBERS ONLY",
            image: "/strategic_leadership_team.png"
        },
        {
            category: "Public Education",
            date: "BI-WEEKLY • 2024",
            title: "Awareness Seminars",
            location: "Virtual & Local Chapters",
            description: "Dedicated public education sessions focused on identifying ethical opportunities and avoiding fraud.",
            price: "FREE",
            image: "/mass_awareness_rally.png"
        },
        {
            category: "Celebration",
            date: "ANNUAL • 2024",
            title: "Recognition Awards",
            location: "New Delhi, India",
            description: "Annual gala honoring exceptional achievers and those who contribute significantly to the welfare movement.",
            price: "BY INVITE",
            image: "/community_gathering.png"
        },
        {
            category: "Next Gen",
            date: "QUARTERLY • 2024",
            title: "Youth Programs",
            location: "Universities & Hubs",
            description: "Empowering India’s next generation of ethical entrepreneurs through mentorship and leadership labs.",
            price: "FREE",
            image: "/leadership_team.png"
        }
    ];

    const pastEvents = [
        {
            category: "Public Outreach",
            date: "SEP 15, 2024",
            title: "Maharashtra Unity Gathering",
            location: "Pune, Maharashtra",
            description: "Successfully unified over 5,000 members during our second leg of mass education on legal networking frameworks.",
            price: "COMPLETED",
            image: "/community_gathering.png"
        },
        {
            category: "Media Event",
            date: "AUG 22, 2024",
            title: "National Media Press Conference",
            location: "Press Club, New Delhi",
            description: "Official launch of our fraud recovery legal wing and policy representation before administrative authorities.",
            price: "COMPLETED",
            image: "/news_studio.png"
        }
    ];

    const featuredEvent = {
        title: "Upcoming Programs & Activities",
        tagline: "Engage • Learn • Lead",
        date: "CALENDAR 2024-25",
        location: "Pan-India Presence",
        image: "/legal_advocacy_summit_wide.png"
    };

  return (
    <div className="bg-slate-50 min-h-screen pt-24">
        {/* 1. Hero Discovery */}
        <section className="relative py-24 overflow-hidden bg-white border-b border-gray-100 mb-16">
            <div className="absolute inset-0 bg-dot-pattern opacity-10 -z-10" />
            <div className="max-w-7xl mx-auto px-4">
                <SectionHeader 
                    script="Upcoming Programs & Activities"
                    title="INDIWA Action Roadmap"
                    description="Join our leadership meets, awareness seminars, and recognition events focused on industry integrity and protection."
                />

                {/* Featured Event Hero */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative group rounded-ultra overflow-hidden shadow-2xl h-[450px] lg:h-[550px] bg-slate-900 gpu-accelerated"
                >
                    <img src={featuredEvent.image} className="w-full h-full object-cover opacity-50 group-hover:scale-105 transition-all duration-1000" alt="Special Event" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                    
                    <div className="absolute bottom-0 p-10 lg:p-16 text-white w-full">
                        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
                            <div className="space-y-6 max-w-2xl">
                                <span className="bg-brand-green px-6 py-2 rounded-full text-[10px] font-extrabold uppercase tracking-[0.2em] shadow-glow">Upcoming Major Event</span>
                                <h2 className="text-3xl md:text-5xl uppercase tracking-tighter text-white leading-tight">National Legal <br/>Advocacy Summit 2024</h2>
                                <div className="flex flex-wrap gap-8 text-[11px] font-extrabold uppercase tracking-widest text-blue-100/60">
                                    <span className="flex items-center gap-2"><MapPin size={16} className="text-brand-green" /> New Delhi, India</span>
                                    <span className="flex items-center gap-2"><Calendar size={16} className="text-brand-green" /> Oct 28, 2024</span>
                                </div>
                            </div>
                            <button className="bg-white text-brand-blue px-12 py-5 rounded-full font-extrabold text-xs uppercase tracking-[0.2em] shadow-2xl hover:bg-brand-green hover:text-white transition-all transform active:scale-95">
                                Register Seat Now
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>

        {/* 2. Calendar Selector */}
        <section className="max-w-7xl mx-auto px-4 pb-32">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-8 mb-16 border-b border-gray-200 pb-8">
                <div className="flex items-center gap-8">
                    <button 
                        onClick={() => setActiveTab('upcoming')}
                        className={`text-sm font-extrabold uppercase tracking-[0.15em] relative py-4 ${activeTab === 'upcoming' ? 'text-brand-blue' : 'text-gray-400 hover:text-gray-900 transition-colors'}`}
                    >
                        Upcoming Gatherings
                        {activeTab === 'upcoming' && (
                            <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-1 bg-brand-blue rounded-full" />
                        )}
                    </button>
                    <button 
                         onClick={() => setActiveTab('past')}
                         className={`text-sm font-extrabold uppercase tracking-[0.15em] relative py-4 ${activeTab === 'past' ? 'text-brand-blue' : 'text-gray-400 hover:text-gray-900 transition-colors'}`}
                    >
                        Past Highlights
                        {activeTab === 'past' && (
                            <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-1 bg-brand-blue rounded-full" />
                        )}
                    </button>
                </div>

                <div className="flex items-center gap-4 bg-white p-2 rounded-full shadow-sm border border-gray-100">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-brand-blue">
                        <SearchCheck size={18} />
                    </div>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest pr-6 text-gray-500">Discover Local Meets</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                <AnimatePresence mode="wait">
                    {activeTab === 'upcoming' ? (
                        upcomingEvents.map((e, idx) => (
                            <EventCard key={idx} {...e} index={idx} type="upcoming" />
                        ))
                    ) : (
                        pastEvents.map((e, idx) => (
                            <EventCard key={idx} {...e} index={idx} type="past" />
                        ))
                    )}
                </AnimatePresence>
            </div>

            {/* Empty State Mockup */}
            {activeTab === 'past' && pastEvents.length === 0 && (
                <div className="text-center py-32 bg-white rounded-ultra border-4 border-dashed border-gray-50">
                    <History size={60} className="mx-auto text-gray-200 mb-6" />
                    <p className="text-gray-400 font-extrabold uppercase tracking-widest text-xs">No past items stored in this category</p>
                </div>
            )}
        </section>

        {/* 3. Personalized Invitation */}
        <section className="py-32 bg-brand-gradient text-white relative overflow-hidden">
             <div className="absolute inset-0 bg-mesh-deep opacity-30" />
             <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="space-y-8">
                    <span className="font-script text-brand-red text-4xl block">Never miss an Update</span>
                    <h2 className="text-4xl md:text-5xl uppercase tracking-tighter text-white leading-tight">Get Notified About <br/>Gatherings Near You</h2>
                    <p className="text-blue-100/70 max-w-2xl mx-auto font-medium leading-relaxed">
                        Join our digital announcement circle to receive direct WhatsApp and Email notifications 
                        whenever a mass rally or training meet is organized in your state.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                        <input 
                            type="email" 
                            placeholder="Your Email Address" 
                            className="flex-1 bg-white/10 border border-white/20 rounded-full px-8 py-5 text-sm font-medium focus:outline-none focus:ring-4 ring-white/10 transition-all placeholder:text-white/40"
                        />
                        <button className="bg-white text-brand-blue px-10 py-5 rounded-full font-extrabold text-[11px] uppercase tracking-widest hover:bg-brand-green hover:text-white transition-all shadow-xl">
                            Subscribe
                        </button>
                    </div>
                </motion.div>
             </div>
        </section>
    </div>
  );
};

export default Events;

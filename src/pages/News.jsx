import React, { useState } from 'react';
import { 
  ArrowRight, ShieldCheck, Landmark, Scale, Mic, HandHeart, Trophy, Users, Map, 
  Megaphone, Handshake, Award, Gavel, GraduationCap, FlaskConical, Heart, 
  Briefcase, Building, TrendingUp, Play, Lightbulb, Monitor, LayoutGrid, CheckCircle2,
  ChevronRight, HeartHandshake, Zap, Sparkles, MoveRight, ShieldAlert, Fingerprint, SearchCheck,
  Calendar, Clock, Filter, Download, ExternalLink, PlayCircle
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
    <span className="font-script text-brand-orange text-2xl md:text-3xl block transform -rotate-2">{script}</span>
    <h2 className={`uppercase tracking-tighter leading-[1.1] ${dark ? 'text-white' : 'text-gray-900'}`}>{title}</h2>
    <div className="w-12 h-1.5 bg-brand-blue mx-auto rounded-full mt-4"></div>
    {description && (
      <p className={`text-lg font-medium max-w-2xl mx-auto mt-6 ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
        {description}
      </p>
    )}
  </motion.div>
);

const NewsCard = ({ category, date, title, description, image, index }) => (
  <motion.div 
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.9 }}
    transition={{ delay: index * 0.1 }}
    whileHover={{ y: -10 }}
    className="group bg-white rounded-ultra border border-gray-100 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 gpu-accelerated"
  >
    <div className="relative h-64 overflow-hidden">
      <img src={image} alt={title} loading="lazy" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
      <div className="absolute top-4 left-4 bg-brand-blue text-white px-4 py-1.5 rounded-full text-[9px] font-extrabold uppercase tracking-widest shadow-lg">
        {category}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
    
    <div className="p-8 space-y-4">
      <div className="flex items-center gap-4 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">
        <span className="flex items-center gap-1.5"><Calendar size={12} /> {date}</span>
        <span className="flex items-center gap-1.5"><Clock size={12} /> 5 Min Read</span>
      </div>
      
      <h3 className="text-xl font-extrabold text-gray-900 leading-tight uppercase tracking-tight group-hover:text-brand-blue transition-colors">
        {title}
      </h3>
      
      <p className="text-gray-500 font-medium text-sm leading-relaxed line-clamp-2">
        {description}
      </p>
      
      <div className="pt-4 border-t border-gray-50 flex justify-between items-center group/btn">
        <button className="text-[10px] font-extrabold text-brand-orange uppercase tracking-widest flex items-center gap-2">
          Read Full Report <MoveRight size={14} className="transition-transform group-hover/btn:translate-x-2" />
        </button>
        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover/btn:bg-blue-50 group-hover/btn:text-brand-blue transition-colors">
          <ExternalLink size={14} />
        </div>
      </div>
    </div>
  </motion.div>
);

const News = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = ['All', 'Legal Updates', 'Community Impact', 'Media Broadcasts'];

  const newsData = [
    {
      id: 1,
      category: 'Community Impact',
      date: 'OCT 24, 2024',
      title: "INDIWA Launching Nationwide Membership Drive",
      description: "Join the movement that protects, empowers, and uplifts genuine networkers and investors across the nation. Registration is now open globaly.",
      image: "/community_gathering.png"
    },
    {
      id: 2,
      category: 'Legal Updates',
      date: 'OCT 20, 2024',
      title: "Awareness Campaign Against Fraud Schemes",
      description: "A national initiative to educate the public on identifying legitimate direct selling opportunities and avoiding financial traps.",
      image: "/mass_awareness_rally.png"
    },
    {
      id: 3,
      category: 'Community Impact',
      date: 'OCT 18, 2024',
      title: "Upcoming Leadership Meet in Major Cities",
      description: "Regional and national networking events planned across India for core members and prospective industry leaders.",
      image: "/strategic_leadership_team.png"
    },
    {
      id: 4,
      category: 'Legal Updates',
      date: 'OCT 12, 2024',
      title: "Government Policy Representation Initiative",
      description: "Official submission of regulatory proposals to government bodies to ensure industry protection and legal recognition for genuine professionals.",
      image: "/legal_advocacy_summit_wide.png"
    },
    {
      id: 5,
      category: 'Community Impact',
      date: 'OCT 05, 2024',
      title: "Fraud Recovery Success: 50+ Families Supported this Month",
      description: "Through our dedicated legal wing, we have successfully assisted families in reclaiming assets from shadow entities across three different states.",
      image: "/community_gathering.png"
    },
    {
      id: 6,
      category: 'Media Broadcasts',
      date: 'SEP 28, 2024',
      title: "Documentary: The Soul of Indian Networking - INDIWA Mission",
      description: "A newly released documentary highlighting the struggles and victories of the networkers community over the past four years.",
      image: "/news_studio.png"
    }
  ];

  const filteredNews = activeFilter === 'All' 
    ? newsData 
    : newsData.filter(item => item.category === activeFilter);

  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-32">
      {/* 1. Header & Featured */}
      <section className="relative py-20 overflow-hidden bg-white border-b border-gray-100 mb-16">
        <div className="absolute inset-0 bg-dot-pattern opacity-10 -z-10" />
        <div className="max-w-7xl mx-auto px-4">
            <SectionHeader 
                script="Official Updates"
                title="News & Media Center"
                description="Stay informed about our legal victories, community milestones, and public announcements."
            />

            {/* Featured Highlight */}
            <motion.div 
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="relative group rounded-[40px] overflow-hidden shadow-2xl h-[450px] lg:h-[550px]"
            >
               <img src="/leadership_team.png" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="Featured News" />
               <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
               
               <div className="absolute bottom-0 p-10 lg:p-16 text-white w-full">
                  <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 max-w-3xl">
                     <span className="bg-brand-orange px-6 py-2 rounded-full text-[10px] font-extrabold uppercase tracking-[0.2em] shadow-glow">Latest Major Update</span>
                     <h2 className="text-3xl md:text-5xl uppercase tracking-tighter leading-tight text-white">Nationwide Membership Drive: <br/>The INDIWA Evolution.</h2>
                     <p className="text-blue-100/80 font-medium text-lg hidden md:block leading-relaxed">
                        We are launching our national chapters to protect and empower legitimate networkers. 
                        Join the collective voice that is reshaping the status of the industry.
                     </p>
                     <button className="flex items-center gap-4 text-[10px] font-extrabold uppercase tracking-[0.3em] hover:text-brand-orange transition-colors">
                        Read Detailed Announcement <ArrowRight size={16} />
                     </button>
                  </motion.div>
               </div>
            </motion.div>
        </div>
      </section>

      {/* 2. Filter & Grid */}
      <section className="max-w-7xl mx-auto px-4">
        {/* Category Filters */}
        <div className="flex flex-wrap justify-center items-center gap-4 mb-16">
          <div className="flex items-center gap-3 mr-4 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest border-r border-gray-200 pr-4 hidden sm:flex">
            <Filter size={14} className="text-brand-blue" /> Filter by
          </div>
          {categories.map((cat) => (
            <button
               key={cat}
               onClick={() => setActiveFilter(cat)}
               className={`px-8 py-3.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest transition-all ${activeFilter === cat ? 'bg-brand-blue text-white shadow-glow-blue scale-105' : 'bg-white text-gray-500 hover:bg-gray-100'}`}
            >
               {cat}
            </button>
          ))}
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 min-h-[600px]">
          <AnimatePresence mode="popLayout">
            {filteredNews.map((news, idx) => (
              <NewsCard key={news.id} {...news} index={idx} />
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredNews.length === 0 && (
          <div className="text-center py-20 bg-white rounded-ultra border-2 border-dashed border-gray-100">
             <SearchCheck size={48} className="mx-auto text-gray-300 mb-4" />
             <p className="text-gray-400 font-extrabold uppercase tracking-widest text-xs">No updates found in this category</p>
          </div>
        )}

        <div className="mt-20 text-center">
            <button className="bg-white border-2 border-slate-100 text-brand-blue px-12 py-5 rounded-full font-extrabold text-[11px] uppercase tracking-widest hover:border-brand-blue transition-all shadow-sm">
                View Older Reports Archive
            </button>
        </div>
      </section>

      {/* 3. Media Assets Section */}
      <section className="py-32 mt-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <div className="space-y-10">
                    <div className="space-y-4">
                        <span className="font-script text-brand-orange text-3xl block">Media Resources</span>
                        <h2 className="uppercase tracking-tighter text-gray-900 leading-none">Official Press Kit <br/>& Brand Assets.</h2>
                        <p className="text-gray-600 font-medium leading-relaxed">
                            Access approved media assets including high-resolution logos, executive portraits, 
                            and the official INDIWA brand guidelines for press use.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-6 bg-white rounded-2xl border border-gray-100 hover:border-brand-blue transition-all group">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-blue-50 text-brand-blue rounded-xl flex items-center justify-center">
                                    <Trophy size={20} />
                                </div>
                                <span className="font-extrabold text-[11px] uppercase tracking-widest text-gray-900">Brand Kit (Logo & SVGs)</span>
                            </div>
                            <button className="p-3 text-slate-400 group-hover:text-brand-blue transition-colors"><Download size={20} /></button>
                        </div>
                        <div className="flex items-center justify-between p-6 bg-white rounded-2xl border border-gray-100 hover:border-brand-blue transition-all group">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-orange-50 text-brand-orange rounded-xl flex items-center justify-center">
                                    <Briefcase size={20} />
                                </div>
                                <span className="font-extrabold text-[11px] uppercase tracking-widest text-gray-900">Official Press Release (PDF)</span>
                            </div>
                            <button className="p-3 text-slate-400 group-hover:text-brand-blue transition-colors"><Download size={20} /></button>
                        </div>
                    </div>
                </div>

                <div className="relative group overflow-hidden rounded-ultra shadow-2xl h-[500px]">
                   <img src="https://images.unsplash.com/photo-1491336477066-31156b5e4f35?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:scale-105 opacity-100 transition-all duration-1000" alt="Executive Press" />
                   <div className="absolute inset-0 bg-brand-blue/10 pointer-events-none transition-opacity group-hover:opacity-0" />
                   <div className="absolute inset-0 flex items-center justify-center">
                      <div className="glass p-10 rounded-full text-white backdrop-blur-3xl group-hover:scale-110 transition-transform">
                         <PlayCircle size={60} fill="currentColor" className="text-brand-orange opacity-90" />
                      </div>
                   </div>
                   <div className="absolute bottom-0 p-10 text-white bg-gradient-to-t from-slate-900/80 to-transparent w-full">
                      <p className="text-[10px] font-extrabold uppercase tracking-widest mb-2 opacity-70">Watch Latest Broadcast</p>
                      <h4 className="text-xl font-extrabold uppercase">Legal Summit 2024 Highlight</h4>
                   </div>
                </div>
            </div>
        </div>
      </section>

    </div>
  );
};

export default News;

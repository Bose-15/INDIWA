import React, { useState } from 'react';
import { 
  ArrowRight, ShieldCheck, Landmark, Scale, Mic, HandHeart, Trophy, Users, Map, 
  Megaphone, Handshake, Award, Gavel, GraduationCap, FlaskConical, Heart, 
  Briefcase, Building, TrendingUp, Play, Lightbulb, Monitor, LayoutGrid, CheckCircle2,
  ChevronRight, HeartHandshake, Zap, Sparkles, MoveRight, ShieldAlert, Fingerprint, SearchCheck,
  Maximize2, Share2, Camera, PlayCircle, X, History
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

const Gallery = () => {
    const [activeFilter, setActiveFilter] = useState('All');
    const [selectedImage, setSelectedImage] = useState(null);

    const categories = ['All', 'Mass Rallies', 'Legal Advocacy', 'Executive Meets', 'Social Work'];

    const images = [
        { id: 1, cat: 'Mass Rallies', src: '/mass_awareness_rally.png', title: 'Mumbai Unity Gathering', size: 'large' },
        { id: 2, cat: 'Legal Advocacy', src: '/legal_advocacy_summit_wide.png', title: 'Legal Summit Delhi', size: 'small' },
        { id: 3, cat: 'Executive Meets', src: '/leadership_team.png', title: 'Core Strategy Meeting', size: 'small' },
        { id: 4, cat: 'Social Work', src: '/community_gathering.png', title: 'Community Support Drive', size: 'medium' },
        { id: 5, cat: 'Mass Rallies', src: '/mass_awareness_rally.png', title: 'Nationwide Awareness Walk', size: 'medium' },
        { id: 6, cat: 'Legal Advocacy', src: '/legal_gavel.png', title: 'Policy Advocacy Session', size: 'small' },
        { id: 7, cat: 'Social Work', src: '/community_gathering.png', title: 'Member Welfare Check', size: 'small' },
        { id: 8, cat: 'Executive Meets', src: '/leadership_team.png', title: 'Regional Leadership Training', size: 'medium' },
    ];

    const filteredImages = activeFilter === 'All' 
        ? images 
        : images.filter(img => img.cat === activeFilter);

  return (
    <div className="bg-white min-h-screen pt-24 pb-32 overflow-hidden">
        {/* 1. Gallery Hero */}
        <section className="relative py-24 mb-16 overflow-hidden">
            <div className="absolute inset-0 bg-dot-pattern opacity-10 -z-10" />
            <div className="max-w-7xl mx-auto px-4">
                <SectionHeader 
                    script="A Visual Journey"
                    title="INDIWA Media Gallery"
                    description="Capturing the moments of courage, unity, and integrity that define our national movement."
                />

                {/* Filter System */}
                <div className="flex flex-wrap justify-center items-center gap-3 mt-10">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveFilter(cat)}
                            className={`px-8 py-3.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest transition-all ${activeFilter === cat ? 'bg-brand-blue text-white shadow-glow-blue scale-105' : 'bg-slate-50 text-gray-500 hover:bg-slate-100'}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>
        </section>

        {/* 2. Masonry Grid */}
        <section className="max-w-7xl mx-auto px-4">
            <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                <AnimatePresence mode="popLayout">
                    {filteredImages.map((img) => (
                        <motion.div
                            key={img.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            onClick={() => setSelectedImage(img)}
                            className="relative group rounded-ultra overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 break-inside-avoid gpu-accelerated"
                        >
                            <img src={img.src} alt={img.title} loading="lazy" className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-110" />
                            
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                                <motion.div initial={{ y: 20 }} animate={{ y: 0 }} className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-brand-green text-white flex items-center justify-center">
                                            <Maximize2 size={16} />
                                        </div>
                                        <span className="text-white text-[11px] font-extrabold uppercase tracking-widest">{img.cat}</span>
                                    </div>
                                    <h4 className="text-xl font-extrabold text-white uppercase tracking-tight leading-tight">{img.title}</h4>
                                </motion.div>
                            </div>

                            {/* Corner Indicator */}
                            <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-xl flex items-center justify-center text-white scale-0 group-hover:scale-100 transition-transform">
                                <Camera size={16} />
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Empty State */}
            {filteredImages.length === 0 && (
                <div className="text-center py-40 border-2 border-dashed border-gray-100 rounded-ultra">
                    <History size={60} className="mx-auto text-gray-200 mb-6" />
                    <p className="text-gray-400 font-extrabold uppercase tracking-widest text-xs">No media found in this collection</p>
                </div>
            )}
        </section>

        {/* 3. Lightbox Simulation */}
        <AnimatePresence>
            {selectedImage && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-10 lg:p-20"
                >
                    <button 
                        onClick={() => setSelectedImage(null)}
                        className="absolute top-10 right-10 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors z-50"
                    >
                        <X size={24} />
                    </button>

                    <motion.div 
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="relative max-w-6xl w-full h-full flex items-center justify-center"
                    >
                        <img 
                            src={selectedImage.src} 
                            alt={selectedImage.title} 
                            className="w-full h-full object-contain rounded-ultra shadow-inner"
                        />
                        
                        <div className="absolute bottom-0 left-0 right-0 p-10 bg-gradient-to-t from-slate-950/80 to-transparent flex justify-between items-end rounded-b-ultra">
                            <div className="space-y-4">
                                <span className="bg-brand-green px-6 py-2 rounded-full text-[10px] font-extrabold uppercase tracking-[0.2em] text-white">{selectedImage.cat}</span>
                                <h3 className="text-3xl md:text-5xl font-extrabold text-white uppercase tracking-tighter leading-none">{selectedImage.title}</h3>
                            </div>
                            <button className="hidden sm:flex items-center gap-4 bg-white/10 text-white px-8 py-4 rounded-full font-extrabold text-[10px] uppercase tracking-widest hover:bg-white/20 transition-colors">
                                <Share2 size={16} /> Share Moment
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>

        {/* 4. Bottom Video Teaser */}
        <section className="py-32 mt-16 bg-slate-900 relative overflow-hidden">
             <div className="absolute inset-0 bg-mesh-deep opacity-10" />
             <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
                <SectionHeader 
                    dark
                    script="Action in Motion"
                    title="Video Broadcasts Archive"
                    description="Explore our curated collection of televised news, documentaries, and ground-level mass rallies."
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
                    <div className="relative aspect-video rounded-ultra overflow-hidden group cursor-pointer border border-white/5 shadow-2xl gpu-accelerated">
                        <img src="/mass_awareness_rally.png" loading="lazy" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-all duration-1000 grayscale group-hover:grayscale-0" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-20 h-20 rounded-full glass border border-white/20 flex items-center justify-center text-white scale-90 group-hover:scale-110 transition-transform shadow-glow">
                                <PlayCircle size={40} className="fill-brand-green text-brand-green opacity-90" />
                            </div>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-slate-950/80 to-transparent text-left">
                            <span className="text-[10px] font-extrabold text-brand-green uppercase tracking-widest block mb-2">Exclusive Broadcast</span>
                            <h4 className="text-xl font-extrabold text-white uppercase tracking-tight">Mass Awareness Documentary 2024</h4>
                        </div>
                    </div>
                    <div className="relative aspect-video rounded-ultra overflow-hidden group cursor-pointer border border-white/5 shadow-2xl gpu-accelerated">
                        <img src="/news_studio.png" loading="lazy" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-all duration-1000 grayscale group-hover:grayscale-0" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-20 h-20 rounded-full glass border border-white/20 flex items-center justify-center text-white scale-90 group-hover:scale-110 transition-transform shadow-glow">
                                <PlayCircle size={40} className="fill-brand-green text-brand-green opacity-90" />
                            </div>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-slate-950/80 to-transparent text-left">
                            <span className="text-[10px] font-extrabold text-brand-green uppercase tracking-widest block mb-2">Exclusive Broadcast</span>
                            <h4 className="text-xl font-extrabold text-white uppercase tracking-tight">Legal Summit Highlights</h4>
                        </div>
                    </div>
                </div>
             </div>
        </section>
    </div>
  );
};

export default Gallery;

import { useState } from 'react';
import { motion } from 'motion/react';
import { BookOpen, ArrowUpRight, Newspaper, Clock, Heart, ExternalLink, Rss } from 'lucide-react';
import { ArticleSkeleton } from './SkeletonLoader';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 14,
    },
  },
};

interface Article {
  id: string;
  title: string;
  excerpt: string;
  pubDate: string;
  readTime: string;
  claps: string;
  category: 'security' | 'ai' | 'dev';
  tags: string[];
  link: string;
}

const articlesData: Article[] = [
  {
    id: "art-osint-metadata",
    title: "EXIF & Geolocation Forensic Audits: Revealing Hidden Tracks in Digital Footprints",
    excerpt: "An in-depth guide to extracting nested camera metadata, GPS coordinates, and historical camera footprints to run passive target identification campaigns safely.",
    pubDate: "May 2026",
    readTime: "7 min read",
    claps: "380+",
    category: "security",
    tags: ["OSINT", "Forensics", "Metadata", "Python"],
    link: "https://medium.com/@Ragingsun09"
  },
  {
    id: "art-lan-audits",
    title: "Zero-Trust Active LAN Audits: Detecting Rogue Devices with ARP Frame Polling",
    excerpt: "How to automate internal network posture assessments using raw socket ARP requests, catching MAC address impersonation in security-conscious configurations.",
    pubDate: "April 2026",
    readTime: "9 min read",
    claps: "420+",
    category: "security",
    tags: ["Network Audit", "LAN Security", "Scapy", "Python"],
    link: "https://medium.com/@Ragingsun09"
  },
  {
    id: "art-neural-classifiers",
    title: "Stochastic Anomaly Engines: Training CNNs on Multidimensional Packet Streams",
    excerpt: "Leveraging deep learning classifiers to analyze and isolate malicious web shells, and configuring automated intrusion triggers without sacrificing raw server velocity.",
    pubDate: "March 2026",
    readTime: "11 min read",
    claps: "290+",
    category: "ai",
    tags: ["Deep Learning", "CNN", "Cyber Threat Intel", "Python"],
    link: "https://medium.com/@Ragingsun09"
  },
  {
    id: "art-cookie-demarcation",
    title: "Hardening Session Access Roles: Modern Mitigations for OWASP Hook Hijacks",
    excerpt: "A tactical guide detailing how SameSite, HttpOnly, and cryptographically secure CSRF tokens converge to block parameter tampering in PHP and modern web apps.",
    pubDate: "Feb 2026",
    readTime: "6 min read",
    claps: "210+",
    category: "dev",
    tags: ["PHP Secure Dev", "Session Hacking", "CSRF Defense"],
    link: "https://medium.com/@Ragingsun09"
  }
];

interface ArticlesProps {
  isLoading?: boolean;
}

export default function Articles({ isLoading = false }: ArticlesProps) {
  const [filter, setFilter] = useState<'all' | 'security' | 'ai' | 'dev'>('all');

  const filteredArticles = filter === 'all'
    ? articlesData
    : articlesData.filter(a => a.category === filter);

  return (
    <section id="articles" className="py-24 bg-[#080808] relative overflow-hidden text-neutral-300 border-b border-[#222] editorial-grid">
      
      {/* Visual background details */}
      <div className="absolute top-1/2 left-1/4 w-[350px] h-[350px] bg-[#F27D26]/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="space-y-4 text-left">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#111] border border-[#222] text-neutral-400 rounded">
              <Newspaper className="w-3.5 h-3.5 text-[#F27D26]" />
              <span className="text-[9px] uppercase tracking-[0.15em] font-bold">Medium Publisher Matrix</span>
            </div>
            <h2 className="editorial-title text-3xl sm:text-4xl text-white uppercase select-none">
              Technical Writes & Intel Reports
            </h2>
            <p className="text-neutral-400 font-serif italic text-sm max-w-xl">
              Published thoughts on offensive cyber audits, OSINT metadata forensics, passive LAN telemetry, and neural architecture training guidelines.
            </p>
          </div>

          {/* Filtering Switcher */}
          <div className="flex flex-wrap gap-2 text-xs font-mono bg-[#0c0c0c] p-1.5 border border-[#222] rounded self-start">
            {(['all', 'security', 'ai', 'dev'] as const).map((cat) => (
              <button
                key={cat}
                id={`article-filter-${cat}`}
                onClick={() => setFilter(cat)}
                className={`px-3 py-1.5 rounded transition-all cursor-pointer uppercase tracking-wider font-bold text-[10px] ${
                  filter === cat
                    ? 'bg-[#F27D26] text-black font-extrabold'
                    : 'text-neutral-400 hover:text-white border border-transparent'
                }`}
              >
                {cat === 'all' 
                  ? 'All Publications' 
                  : cat === 'security' 
                    ? 'Security' 
                    : cat === 'ai' 
                      ? 'AI Models' 
                      : 'Software Dev'}
              </button>
            ))}
          </div>
        </div>

        {/* Medium Articles Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <ArticleSkeleton key={i} />
            ))}
          </div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {filteredArticles.map((article) => (
              <motion.div
                key={article.id}
                variants={cardVariants}
                className="group flex flex-col justify-between bg-[#0c0c0c] border border-[#222] hover:border-[#F27D26]/40 hover:bg-[#111] rounded overflow-hidden transition-all duration-300 relative"
              >
                <div className="p-6 space-y-4">
                  {/* Meta stats */}
                  <div className="flex justify-between items-center text-[10px] font-mono text-neutral-500">
                    <div className="flex items-center space-x-3">
                      <span className="px-2 py-0.5 bg-[#111] border border-[#222] rounded text-[#F27D26] uppercase font-bold text-[8px]">
                        {article.category}
                      </span>
                      <span className="flex items-center uppercase font-bold text-[8px] tracking-wider">
                        <Clock className="w-3 h-3 mr-1 text-neutral-600" />
                        {article.readTime}
                      </span>
                    </div>
                    <span className="text-[9px] uppercase tracking-widest font-bold">
                      {article.pubDate}
                    </span>
                  </div>

                  {/* Article Title */}
                  <h3 className="font-mono text-sm tracking-widest uppercase text-white group-hover:text-[#F27D26] transition-colors leading-relaxed">
                    {article.title}
                  </h3>

                  {/* Article Excerpt */}
                  <p className="text-neutral-450 text-xs font-sans leading-relaxed pt-1">
                    {article.excerpt}
                  </p>

                  {/* Tags row */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {article.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 bg-[#080808] text-neutral-600 border border-[#222] rounded text-[9px] font-mono uppercase tracking-wider"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Interaction Footer Bar */}
                <div className="px-6 py-4 bg-[#111] border-t border-[#222] flex justify-between items-center text-[10px] font-mono">
                  {/* Visual clap count interaction mimic */}
                  <div className="flex items-center space-x-1.5 text-neutral-500 font-bold tracking-widest">
                    <Heart className="w-3.5 h-3.5 text-[#F27D26]/60 group-hover:text-[#F27D26] transition-colors" />
                    <span>{article.claps} CLAPS</span>
                  </div>

                  <a
                    href={article.link}
                    target="_blank"
                    rel="noreferrer"
                    id={`article-link-${article.id}`}
                    className="flex items-center space-x-1 text-neutral-400 group-hover:text-[#F27D26] hover:underline transition-colors uppercase tracking-widest font-bold"
                  >
                    <span>Read Article</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Global Medium Profile Callout Box */}
        <div className="mt-10 p-6 bg-[#0c0c0c] border border-[#222] hover:border-[#F27D26]/20 transition-all rounded flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-[#111] border border-[#222] text-[#F27D26] rounded-full shrink-0">
              <Rss className="w-5 h-5" />
            </div>
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="font-mono text-xs uppercase tracking-wider text-white font-bold">
                Follow @Ragingsun09 on Medium
              </h4>
              <p className="text-neutral-500 font-sans text-xs">
                Subscribe to get instant alerts whenever new system design methodologies or digital forensic intelligence writeups are compiled.
              </p>
            </div>
          </div>
          
          <a
            href="https://medium.com/@Ragingsun09"
            target="_blank"
            rel="noreferrer"
            id="global-medium-follow-btn"
            className="w-full sm:w-auto flex items-center justify-center space-x-1 px-5 py-2.5 bg-[#F27D26] hover:bg-[#e06d1c] text-black font-semibold font-mono text-[10px] uppercase tracking-widest rounded transition-all cursor-pointer shadow-sm text-center font-extrabold"
          >
            <span>VISIT MEDIUM PROFILE</span>
            <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5px]" />
          </a>
        </div>

      </div>
    </section>
  );
}

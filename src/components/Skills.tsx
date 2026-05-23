import { useState } from 'react';
import { Shield, Brain, Terminal, Award, CheckSquare, Layers } from 'lucide-react';
import { skillsData } from '../data';

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'security' | 'ai' | 'dev'>('all');

  const categories = [
    { id: 'all', label: 'All Skillsets', icon: Layers },
    { id: 'security', label: 'Cybersecurity', icon: Shield },
    { id: 'ai', label: 'AI & Machine Learning', icon: Brain },
    { id: 'dev', label: 'Development & Scripting', icon: Terminal }
  ];

  const filteredSkills = selectedCategory === 'all'
    ? skillsData
    : skillsData.filter((skill) => skill.category === selectedCategory);

  return (
    <section id="skills" className="py-24 bg-[#080808] relative overflow-hidden text-neutral-300 border-b border-[#222] editorial-grid">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* Section Headings */}
        <div className="text-center space-y-4 mb-14">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#111] border border-[#222] text-neutral-400 rounded">
            <Award className="w-3.5 h-3.5 text-[#F27D26]" />
            <span className="text-[9px] uppercase tracking-[0.15em] font-bold">Technical Capabilities</span>
          </div>
          <h2 className="editorial-title text-3xl sm:text-4xl text-white tracking-tight uppercase">
            Core Competencies & Toolsets
          </h2>
          <p className="text-neutral-400 font-serif italic text-sm max-w-xl mx-auto">
            Practical skills verified across structured ethical hacking boxes, academic curriculum challenges, and active scripting utilities.
          </p>
        </div>

        {/* Dashboard Grid split into Categories & Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Category Filters & Skills List (cols 1-8) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Category Pill Switcher */}
            <div className="flex flex-wrap gap-2 p-1.5 bg-[#0c0c0c] border border-[#222] rounded">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id as any)}
                    className={`flex items-center space-x-2 px-4 py-2.5 rounded text-xs font-mono transition-all cursor-pointer uppercase tracking-wider ${
                      isActive 
                        ? 'bg-[#F27D26] text-black font-bold' 
                        : 'text-neutral-400 hover:text-white hover:bg-[#111]'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Practical Skills Stack */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredSkills.map((skill) => (
                <div 
                  key={skill.name}
                  className="p-5 bg-[#0c0c0c] border border-[#222] rounded hover:border-[#F27D26]/40 hover:bg-[#111] transition-all group"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-mono text-xs uppercase tracking-wider text-white group-hover:text-[#F27D26] transition-colors">
                        {skill.name}
                      </h4>
                      <p className="text-neutral-400 text-[11px] font-sans mt-2 leading-normal">
                        {skill.description}
                      </p>
                    </div>
                    {/* Visual Meter Badge */}
                    <span className="font-mono text-[10px] font-bold text-[#F27D26] bg-[#F27D26]/10 px-2 py-0.5 rounded border border-[#F27D26]/20">
                      {skill.level}%
                    </span>
                  </div>

                  {/* Meter Bar */}
                  <div className="h-1.5 w-full bg-[#1a1a1a] rounded overflow-hidden mb-4">
                    <div 
                      className="h-full bg-[#F27D26] transition-all duration-500"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>

                  {/* Tool Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {skill.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="px-2 py-0.5 bg-[#080808] text-neutral-500 rounded text-[9px] font-mono border border-[#222] uppercase tracking-wider"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Security Lab Stats Achievements (cols 9-12) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* TryHackMe Lab Certificate */}
            <div className="p-6 bg-[#0c0c0c] border border-[#222] hover:border-[#F27D26]/30 rounded relative overflow-hidden transition-all">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-[#111] rounded border border-[#222]">
                  <Shield className="w-5 h-5 text-[#F27D26]" />
                </div>
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-wider text-white">TryHackMe Profile</h4>
                  <p className="text-[9px] font-mono text-neutral-500 tracking-[0.15em] uppercase font-bold">LABORATORY ACTIVE</p>
                </div>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="flex justify-between items-center py-2 border-b border-[#222]">
                  <span className="text-neutral-500">Target Range</span>
                  <span className="text-white font-bold text-right">45+ Rooms</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-[#222]">
                  <span className="text-neutral-500">Interactive Rank</span>
                  <span className="text-[#F27D26] font-bold text-right">Top 3% Globally</span>
                </div>
                <div className="flex justify-between items-start py-2">
                  <span className="text-neutral-500 block h-full">Sectors Controlled</span>
                  <div className="text-right space-y-1">
                    <span className="inline-block px-1.5 py-0.5 bg-[#111] text-neutral-400 border border-[#222] rounded text-[8px] ml-1 font-bold uppercase tracking-wider">Linux Privesc</span>
                    <span className="inline-block px-1.5 py-0.5 bg-[#111] text-neutral-400 border border-[#222] rounded text-[8px] ml-1 font-bold uppercase tracking-wider">OWASP-10</span>
                    <span className="inline-block px-1.5 py-0.5 bg-[#111] text-neutral-400 border border-[#222] rounded text-[8px] ml-1 font-bold uppercase tracking-wider">Metasploit</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Hack The Box Lab Certificate */}
            <div className="p-6 bg-[#0c0c0c] border border-[#222] hover:border-[#F27D26]/30 rounded relative overflow-hidden transition-all">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-[#111] rounded border border-[#222]">
                  <Terminal className="w-5 h-5 text-[#F27D26]" />
                </div>
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-wider text-white">Hack The Box</h4>
                  <p className="text-[9px] font-mono text-neutral-500 tracking-[0.15em] uppercase font-bold">ENDPOINT AUDITING</p>
                </div>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="flex justify-between items-center py-2 border-b border-[#222]">
                  <span className="text-neutral-500">Target Machines Owned</span>
                  <span className="text-white font-bold text-right">Active Systems</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-[#222]">
                  <span className="text-neutral-500">Methodology Practiced</span>
                  <span className="text-white text-right">Static Code Audits</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-neutral-500">Port Operations</span>
                  <span className="text-white text-right">Port-Forwards</span>
                </div>
              </div>
            </div>

            {/* Ethical Decryption Card */}
            <div className="p-5 bg-transparent border border-[#F27D26]/20 bg-[#F27D26]/5 rounded flex items-start space-x-3.5">
              <CheckSquare className="w-5 h-5 text-[#F27D26] shrink-0 mt-0.5" />
              <div>
                <span className="text-[9px] font-mono font-bold text-[#F27D26] tracking-[0.15em] block mb-1 uppercase">COMPLIANCE CRITERIA</span>
                <p className="text-[11px] font-sans text-neutral-400 leading-normal">
                  All repositories comply strictly with defensive testing principles and are certified exclusively within authorized local test clusters or open-source licenses.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

import { BookOpen, Briefcase, GraduationCap } from 'lucide-react';
import { timelineData } from '../data';

export default function Timeline() {
  return (
    <section id="timeline" className="py-24 bg-[#080808] relative overflow-hidden text-neutral-300 border-b border-[#222] editorial-grid">
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-20">
        
        {/* Section Headings */}
        <div className="text-center space-y-4 mb-14">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#111] border border-[#222] text-neutral-400 rounded">
            <GraduationCap className="w-3.5 h-3.5 text-[#F27D26]" />
            <span className="text-[9px] uppercase tracking-[0.15em] font-bold">Academic Chronology</span>
          </div>
          <h2 className="editorial-title text-3xl sm:text-4xl text-white uppercase select-none">
            Education, Experience & Training
          </h2>
          <p className="text-neutral-400 font-serif italic text-sm max-w-lg mx-auto">
            A chronological timeline of official studies alongside active, independent learning systems and hands-on laboratory work.
          </p>
        </div>

        {/* Tree Container */}
        <div className="relative border-l border-[#222] ml-4 sm:ml-6 space-y-10 py-2">
          
          {timelineData.map((item, index) => {
            const isEdu = item.type === 'education';
            const TimelineIcon = isEdu ? BookOpen : Briefcase;
            
            return (
              <div key={index} className="relative pl-8 sm:pl-10 group">
                
                {/* Node Dot absolute */}
                <span className="absolute left-0 top-1.5 -translate-x-1/2 flex items-center justify-center w-7 h-7 rounded bg-[#0c0c0c] border border-[#222] text-[#F27D26] group-hover:border-[#F27D26]/40 transition-colors">
                  <TimelineIcon className="w-3.5 h-3.5" />
                </span>

                {/* Content Box */}
                <div className="space-y-4 p-5 bg-[#0c0c0c] border border-[#222] rounded hover:border-[#F27D26]/30 hover:bg-[#111] transition-all">
                  
                  {/* Period badge and type tag */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-mono text-[9px] font-bold text-[#F27D26] bg-[#F27D26]/10 px-2.5 py-0.5 rounded border border-[#F27D26]/20 uppercase tracking-widest">
                      {item.period}
                    </span>
                    
                    <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-500 font-bold">
                      {item.type}
                    </span>
                  </div>

                  {/* Titles */}
                  <div className="space-y-1">
                    <h4 className="font-mono text-xs sm:text-sm uppercase tracking-wider text-white group-hover:text-[#F27D26] transition-colors leading-normal">
                      {item.title}
                    </h4>
                    <p className="text-neutral-400 font-serif italic text-xs">
                      {item.subtitle}
                    </p>
                  </div>

                  {/* Core Description */}
                  <p className="text-neutral-400 text-xs leading-relaxed font-sans">
                    {item.description}
                  </p>

                  {/* Skills/Tools list tags */}
                  {item.badges && item.badges.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#222]">
                      {item.badges.map((b) => (
                        <span 
                          key={b}
                          className="px-2 py-0.5 bg-[#080808] text-neutral-500 rounded text-[9px] font-mono border border-[#222] uppercase tracking-wider"
                        >
                          {b}
                        </span>
                      ))}
                    </div>
                  )}

                </div>
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}

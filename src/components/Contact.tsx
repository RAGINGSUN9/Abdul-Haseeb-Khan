import { useState } from 'react';
import { Mail, Github, Copy, Check, MessageSquare } from 'lucide-react';

export default function Contact() {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText('haseebkhan03005036291@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="contact" className="py-24 bg-[#080808] relative overflow-hidden editorial-grid border-b border-[#222]">
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* Header Title */}
        <div className="text-center space-y-4 mb-14">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#111] border border-[#222] text-neutral-400 rounded">
            <MessageSquare className="w-3.5 h-3.5 text-[#F27D26]" />
            <span className="text-[9px] uppercase tracking-[0.15em] font-bold">Encrypted Tunnel</span>
          </div>
          <h2 className="editorial-title text-3xl sm:text-4xl text-white uppercase select-none">
            Establish Secure Connection
          </h2>
          <p className="text-neutral-400 font-serif italic text-sm max-w-lg mx-auto">
            Want to discuss penetration testing scopes, collaborative AI modeling projects, or academic partnerships? Use a direct channel below.
          </p>
        </div>

        {/* Centered Connection info channels card */}
        <div className="max-w-xl mx-auto w-full">
          <div className="p-8 bg-[#0c0c0c] border border-[#222] rounded space-y-6">
            
            <div className="space-y-3 text-center">
              <span className="font-mono text-[9px] text-neutral-500 tracking-wider block font-bold uppercase">NODE COORDINATES</span>
              <h3 className="font-mono text-sm uppercase tracking-wider text-white font-bold leading-normal">
                Reach Out Directly
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed font-sans max-w-sm mx-auto">
                Whether you prefer secure communications or standard channels, feel free to use these pathways to start a dialogue.
              </p>
            </div>

            {/* Specific Contacts List with copy triggers */}
            <div className="space-y-4 pt-6 border-t border-[#222]">
              
              {/* Email Channel */}
              <div className="flex items-center justify-between p-3.5 bg-[#111] border border-[#222] rounded group transition-all">
                <div className="flex items-center space-x-3 min-w-0">
                  <div className="p-2 bg-[#0c0c0c] border border-[#222] text-[#F27D26] rounded shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[9px] font-mono text-neutral-500 block leading-tight font-bold uppercase tracking-wider">EMAIL RESOURCE</span>
                    <span className="text-[11px] text-neutral-300 font-mono font-medium block truncate pt-0.5">
                      haseebkhan03005036291@gmail.com
                    </span>
                  </div>
                </div>
                
                <button
                  onClick={copyEmailToClipboard}
                  className="p-1 px-2.5 text-[9px] font-mono text-[#F27D26] hover:text-white bg-[#0c0c0c] hover:bg-[#161616] border border-[#222] rounded shrink-0 cursor-pointer ml-3 flex items-center space-x-1 uppercase font-bold tracking-wider transition-all"
                  title="Copy email address"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              {/* GitHub Channel */}
              <a 
                href="https://github.com/ragingsun9" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center justify-between p-3.5 bg-[#111] border border-[#222] rounded hover:border-[#F27D26]/40 group transition-all cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-[#0c0c0c] border border-[#222] text-[#F27D26] rounded shrink-0">
                    <Github className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-neutral-500 block leading-tight font-bold uppercase tracking-wider">SOURCE REPOSITORIES</span>
                    <span className="text-xs text-[#F27D26] font-mono font-bold block pt-0.5">
                      github.com/ragingsun9
                    </span>
                  </div>
                </div>
                
                <span className="text-[9px] font-mono text-neutral-500 group-hover:text-white font-bold tracking-wider transition-colors pl-3 shrink-0 uppercase">
                  VISIT ↗
                </span>
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

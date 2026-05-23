import { useEffect, useRef, useState } from 'react';
import { Terminal, Shield, ArrowRight, Github, Mail, ShieldAlert, Cpu } from 'lucide-react';

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeAlert, setActiveAlert] = useState(false);

  // Trigger a blinking security alarm effect when clicking the shield
  const handleShieldClick = () => {
    setActiveAlert(true);
    setTimeout(() => setActiveAlert(false), 2000);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = 700);

    const handleResize = () => {
      if (canvas && canvas.parentElement) {
        width = canvas.width = canvas.parentElement.clientWidth;
        height = canvas.height = 700;
      }
    };

    window.addEventListener('resize', handleResize);

    // Particle class simulating network nodes / data packets
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      isThreatAlert: boolean;
    }

    const particles: Particle[] = [];
    const particleCount = Math.min(60, Math.floor(width / 20));

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      const isThreatAlert = Math.random() > 0.94; // 6% chance of a mock red threat node
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1,
        color: isThreatAlert 
          ? 'rgba(239, 68, 68, 0.7)'  // red
          : i % 2 === 0 
            ? 'rgba(242, 125, 38, 0.6)' // editorial orange
            : 'rgba(115, 115, 115, 0.5)',  // neutral grey
        isThreatAlert
      });
    }

    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            const opacity = (1 - dist / 110) * 0.15;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = p1.isThreatAlert || p2.isThreatAlert
              ? `rgba(239, 68, 68, ${opacity})`
              : `rgba(242, 125, 38, ${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Draw connections to mouse
        if (mouseX !== -1000 && mouseY !== -1000) {
          const dx = p1.x - mouseX;
          const dy = p1.y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            const opacity = (1 - dist / 150) * 0.2;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouseX, mouseY);
            ctx.strokeStyle = p1.isThreatAlert 
              ? `rgba(239, 68, 68, ${opacity * 1.5})` 
              : `rgba(242, 125, 38, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        // Update positions
        p1.x += p1.vx;
        p1.y += p1.vy;

        // Bounce off walls
        if (p1.x < 0 || p1.x > width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > height) p1.vy *= -1;

        // Correct bounds
        if (p1.x < 0) p1.x = 0;
        if (p1.x > width) p1.x = width;
        if (p1.y < 0) p1.y = 0;
        if (p1.y > height) p1.y = height;

        // Draw node
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = p1.color;
        ctx.fill();

        // If high active alert, draw secondary ring
        if (p1.isThreatAlert) {
          ctx.beginPath();
          ctx.arc(p1.x, p1.y, p1.radius * (2.2 + Math.sin(Date.now() / 150) * 0.5), 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(239, 68, 68, 0.25)';
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (canvas) {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="home" className="relative min-h-screen bg-[#080808] flex items-center pt-28 overflow-hidden editorial-grid">
      {/* Decorative Canvas Network */}
      <div className="absolute inset-x-0 top-0 h-full pointer-events-none z-10 opacity-60">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>

      {/* Security alert indicator (Only acts on interactive trigger) */}
      <div className={`absolute top-0 inset-x-0 h-1 bg-red-500 z-50 transition-all duration-300 ${
        activeAlert ? 'opacity-100' : 'opacity-0'
      }`}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Copy */}
          <div className="lg:col-span-7 flex flex-col space-y-8">
            
            {/* Status Chip */}
            <div className="inline-flex self-start items-center space-x-2 px-3 py-1 bg-[#111] border border-[#222] rounded text-neutral-300">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F27D26] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F27D26]"></span>
              </span>
              <span className="font-mono text-[9px] tracking-[0.15em] uppercase text-[#F27D26] font-bold">Secure Node Active</span>
            </div>

            {/* Profile Intro */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="h-px w-8 bg-[#222]"></span>
                <span className="text-neutral-500 font-mono text-[10px] tracking-[0.2em] uppercase">
                  Cybersecurity & Defensive AI
                </span>
              </div>
              <h1 className="editorial-title text-5xl sm:text-7xl lg:text-8xl tracking-tight text-white font-normal uppercase">
                Abdul Haseeb <span className="text-[#F27D26]">Khan</span>
              </h1>
              <div className="space-y-2.5 pl-1">
                <p className="text-xl sm:text-2xl font-serif italic text-neutral-400">
                  Security Systems Researcher & BS AI Specialist
                </p>
                <div className="flex flex-wrap gap-2">
                  <div className="inline-flex items-center space-x-2 px-2.5 py-1 bg-[#F27D26]/10 border border-[#F27D26]/20 rounded text-[#F27D26]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#F27D26] animate-pulse"></span>
                    <span className="font-mono text-[11px] font-extrabold uppercase tracking-widest">
                      Founder of Kinetix
                    </span>
                  </div>
                  <div className="inline-flex items-center space-x-2 px-2.5 py-1 bg-neutral-900 border border-[#222] rounded text-neutral-400">
                    <span className="h-1 w-1 rounded-full bg-neutral-500"></span>
                    <span className="font-mono text-[10px] font-bold uppercase tracking-widest">
                      aka Ragingsun09
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Core Pitch */}
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed max-w-xl font-sans pl-1">
              Currently pursuing a BS in <strong className="text-white font-semibold">Artificial Intelligence</strong> with a focused, analytical dedication to penetration testing, network infrastructure auditing, and intelligent defense systems. Crafting highly structured, responsive solutions to guard high-scale system integrity.
            </p>

            {/* Micro Stats Shelf */}
            <div className="grid grid-cols-3 gap-4 py-3 max-w-lg border-t border-b border-[#222] font-mono pl-1">
              <div className="space-y-1">
                <span className="text-[9px] text-neutral-500 uppercase tracking-widest block font-bold">Ranking</span>
                <span className="text-[#F27D26] font-bold tracking-tight text-xs sm:text-sm">TOP 3% THM</span>
              </div>
              <div className="space-y-1">
                <span className="text-[9px] text-neutral-500 uppercase tracking-widest block font-bold">Audits</span>
                <span className="text-white font-bold tracking-tight text-xs sm:text-sm">6+ REPOS</span>
              </div>
              <div className="space-y-1">
                <span className="text-[9px] text-neutral-500 uppercase tracking-widest block font-bold">Research</span>
                <span className="text-neutral-300 font-bold tracking-tight text-xs sm:text-sm">DEFENSIVE AI</span>
              </div>
            </div>

            {/* Call to Actions */}
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-2 pl-1">
              <button
                onClick={() => scrollToSection('console')}
                className="flex items-center justify-center space-x-2 px-6 py-3 bg-[#F27D26] hover:bg-[#e06d1c] active:scale-[0.98] text-black font-mono text-xs font-bold rounded transition-all cursor-pointer uppercase tracking-wider"
              >
                <span>Launch Security Console</span>
                <Terminal className="w-4 h-4 ml-1" />
              </button>

              <button
                onClick={() => scrollToSection('projects')}
                className="flex items-center justify-center space-x-2 px-6 py-3 bg-transparent hover:bg-[#111] border border-[#222] hover:border-[#F27D26]/50 active:scale-[0.98] text-neutral-300 hover:text-white font-mono text-xs rounded transition-all cursor-pointer uppercase tracking-wider"
              >
                <span>Audit Projects</span>
                <ArrowRight className="w-4 h-4 ml-0.5" />
              </button>
            </div>
          </div>

          {/* Interactive Profile Decorative Section */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96">
              
              {/* Outer rotating cyber-ring */}
              <div className="absolute inset-0 border border-[#222] rounded-full animate-spin [animation-duration:45s] pointer-events-none"></div>
              <div className="absolute inset-4 border border-dashed border-[#F27D26]/20 rounded-full animate-spin [animation-duration:25s] pointer-events-none"></div>
              <div className="absolute inset-12 border border-[#222] rounded-full animate-spin [animation-duration:15s] [animation-direction:reverse] pointer-events-none"></div>

              {/* Hologram Circle */}
              <div 
                onClick={handleShieldClick}
                className="absolute inset-16 bg-[#0c0c0c] border border-[#222] hover:border-[#F27D26]/40 transition-colors duration-500 rounded-full flex flex-col items-center justify-center shadow-lg relative group overflow-hidden cursor-pointer"
              >
                
                {/* Micro tech grid background on graphic element */}
                <div className="absolute inset-0 editorial-grid opacity-30 group-hover:scale-105 transition-transform duration-500"></div>

                {/* Verified Profile and Face Sensor Audit */}
                <div className="relative z-10 flex flex-col items-center justify-center p-4 text-center space-y-3">
                  
                  {/* Circular Avatar with Glowing Border */}
                  <div className={`relative w-28 h-28 sm:w-32 sm:h-32 rounded-full border-2 border-[#222] group-hover:border-[#F27D26]/70 p-1 bg-[#111] transition-all duration-500 ${
                    activeAlert ? 'scale-105 !border-red-500 bg-red-500/10' : ''
                  }`}>
                    <img 
                      src="https://media.licdn.com/dms/image/v2/D4D03AQHQtJQbaL67bA/profile-displayphoto-crop_800_800/B4DZ4myya3GcAI-/0/1778767309163?e=1781136000&v=beta&t=bBm19i07Fqm-QPhYW_NdO1tGEjZgsLHc2vg7mh9rgjY" 
                      alt="Abdul Haseeb Khan" 
                      referrerPolicy="no-referrer"
                      className={`w-full h-full object-cover rounded-full grayscale hover:grayscale-0 transition-all duration-500 ${
                        activeAlert ? '!grayscale-0' : ''
                      }`}
                    />
                    
                    {/* Tiny blinking authority status dot */}
                    <span className={`absolute bottom-1 right-1 w-3.5 h-3.5 border border-black rounded-full flex items-center justify-center ${
                      activeAlert ? 'bg-red-500 animate-ping' : 'bg-[#F27D26]'
                    }`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-black"></span>
                    </span>
                  </div>
                  
                  <div className="space-y-0.5">
                    <p className={`font-mono font-bold text-[10px] tracking-widest uppercase transition-colors duration-300 ${
                      activeAlert ? 'text-red-500' : 'text-white group-hover:text-[#F27D26]'
                    }`}>
                      {activeAlert ? 'SYSTEM LOCKENGAGED' : 'OPERATOR KEYPAIR'}
                    </p>
                    <p className="font-serif italic text-[11px] text-neutral-400">
                      Ragingsun09 // Verified
                    </p>
                  </div>
                  
                  {/* Subtle terminal-like code fragment */}
                  <div className="font-mono text-[9px] text-neutral-500 bg-[#080808] p-1.5 px-3 rounded border border-[#222] max-w-[170px] overflow-hidden text-ellipsis whitespace-nowrap">
                    <code>{activeAlert ? 'WARN: THREATS DETECTED' : 'root@secop-auth:~$ verified'}</code>
                  </div>
                </div>

                {/* Scan lines passing through */}
                <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#F27D26]/40 to-transparent shadow-[0_0_15px_rgba(242,125,38,0.5)] animate-[bounce_6s_infinite_ease-in-out]"></div>
              </div>

              {/* Float-by satellite badges */}
              <div className="absolute top-[10%] left-[-5%] py-2 px-3 bg-[#0c0c0c] border border-[#222] rounded flex items-center space-x-2 animate-bounce [animation-duration:6s] shadow-md">
                <Cpu className="w-4 h-4 text-[#F27D26]" />
                <span className="font-mono text-[10px] text-neutral-400">Deep Learning</span>
              </div>

              <div className="absolute bottom-[10%] right-[-5%] py-2 px-3 bg-[#0c0c0c] border border-[#222] rounded flex items-center space-x-2 animate-bounce [animation-duration:8s] [animation-delay:1s] shadow-md">
                <Terminal className="w-4 h-4 text-white" />
                <span className="font-mono text-[10px] text-neutral-400">Pen-Testing Labs</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Cpu, Terminal as TermIcon, CheckCircle2, Server, Lock, AlertTriangle } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

const initializationLogs = [
  "CONNECTING Secure Operator Socket [port=3000]...",
  "RESOLVING Operator Ident Code: 'Ragingsun09' [RESOLVED]",
  "RETRIEVING Verified GPG Credentials... [DECRYPTED]",
  "SYNCHRONIZING GitHub Sync Bridge & Medium Publisher Matrix...",
  "VERIFYING Kinetix Sub-Kernels Integrity... [OK]",
  "PARSING SECURE SYSTEM REGISTERS... [COMPLETED]",
  "ESTABLISHING AUTHORIZED PORTAL HANDSHAKE... [SUCCESS]"
];

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [progress, setProgress] = useState(0);
  const [currentLogIdx, setCurrentLogIdx] = useState(0);
  const [allLogs, setAllLogs] = useState<string[]>([]);
  const [stage, setStage] = useState<'initialize' | 'decrypting' | 'handshake' | 'deploying'>('initialize');

  // Increment numeric loading progress
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const start = Date.now();
    const duration = 3000; // 3 seconds splash

    const update = () => {
      const elapsed = Date.now() - start;
      const pct = Math.min(Math.floor((elapsed / duration) * 100), 100);
      setProgress(pct);

      if (pct < 100) {
        requestAnimationFrame(update);
      } else {
        setTimeout(() => {
          onComplete();
        }, 600);
      }
    };

    requestAnimationFrame(update);
    return () => clearTimeout(timer);
  }, [onComplete]);

  // Handle logging ticks
  useEffect(() => {
    if (progress === 0) return;
    const expectedLogIdx = Math.min(
      Math.floor((progress / 100) * initializationLogs.length),
      initializationLogs.length - 1
    );

    if (expectedLogIdx !== currentLogIdx) {
      setCurrentLogIdx(expectedLogIdx);
      setAllLogs((prev) => [...prev, initializationLogs[expectedLogIdx]]);
    }

    if (progress < 25) setStage('initialize');
    else if (progress < 60) setStage('decrypting');
    else if (progress < 85) setStage('handshake');
    else setStage('deploying');

  }, [progress, currentLogIdx]);

  // Auto-init direct log
  useEffect(() => {
    setAllLogs([initializationLogs[0]]);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-[#030303] flex items-center justify-center overflow-hidden font-mono text-neutral-400 select-none">
      
      {/* Editorial Scanner Scanlines Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(242,125,38,0.05)_0%,transparent_75%)] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
      
      {/* Moving Laser Scanline */}
      <motion.div 
        className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#F27D26]/60 to-transparent shadow-[0_0_12px_#F27D26] z-10 pointer-events-none"
        initial={{ top: "-5%" }}
        animate={{ top: "105%" }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
      />

      {/* Extreme Visual Grid Framing */}
      <div className="absolute top-6 bottom-6 left-6 right-6 border border-neutral-900 pointer-events-none hidden sm:block">
        <div className="absolute top-0 left-4 -translate-y-1/2 bg-[#030303] px-2 text-[8px] tracking-[0.3em] text-[#F27D26] uppercase font-bold">
          SECURE SECTOR ACCESS
        </div>
        <div className="absolute bottom-0 right-4 translate-y-1/2 bg-[#030303] px-2 text-[8px] tracking-[0.3em] text-neutral-700 uppercase">
          STIG INTEGRITY: PASSED
        </div>
        
        {/* Reticle corner icons */}
        <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#F27D26]/40"></span>
        <span className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#F27D26]/40"></span>
        <span className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#F27D26]/40"></span>
        <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#F27D26]/40"></span>
      </div>

      {/* Main Core Assembly Panel */}
      <div className="w-full max-w-xl mx-auto px-6 flex flex-col items-center justify-center space-y-10 relative">
        
        {/* Holographic Concentric Loader Circles with Insane Animations */}
        <div className="relative w-44 h-44 flex items-center justify-center">
          
          {/* Static outer framing rings */}
          <div className="absolute inset-0 border border-neutral-800/50 rounded-full" />
          <div className="absolute inset-3 border border-dashed border-neutral-800 rounded-full animate-spin [animation-duration:12s]" />
          
          {/* Main glowing orange tracker circle */}
          <motion.div 
            className="absolute inset-1 border-2 border-dashed border-[#F27D26]/20 rounded-full"
            style={{ rotate: progress * 3.6 }}
          />

          {/* Micro ticking decoder ring */}
          <motion.div 
            className="absolute inset-6 border border-dotted border-[#F27D26]/70 rounded-full"
            animate={{ rotate: -360 }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          />

          {/* Inner metallic rotating core */}
          <motion.div 
            className="absolute inset-10 bg-[#070707] border border-neutral-800 rounded-full flex flex-col items-center justify-center shadow-[inset_0_0_20px_rgba(0,0,0,0.9)] z-10"
            animate={{ 
              scale: [0.96, 1.04, 0.96],
              borderColor: stage === 'deploying' ? '#F27D26' : '#222'
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Dynamic Core icon based on loading phase */}
            {stage === 'initialize' && <Cpu className="w-7 h-7 text-neutral-600 animate-pulse" />}
            {stage === 'decrypting' && <Lock className="w-7 h-7 text-amber-500 animate-bounce" />}
            {stage === 'handshake' && <Server className="w-7 h-7 text-[#F27D26] animate-pulse" />}
            {stage === 'deploying' && <Shield className="w-7 h-7 text-emerald-500 animate-ping [animation-duration:1.5s]" />}
            
            {/* Percentage text indicator */}
            <span className="text-[10px] tracking-widest font-black uppercase text-neutral-500 mt-1">
              STG-{progress.toString().padStart(3, '0')}
            </span>
          </motion.div>

          {/* Ambient center glow */}
          <div className="absolute inset-12 bg-radial-gradient from-[#F27D26]/10 to-transparent rounded-full filter blur-xl pointer-events-none" />
        </div>

        {/* Info Layout Banner & Description */}
        <div className="text-center space-y-2">
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[10px] text-neutral-600 uppercase tracking-[0.25em] font-semibold"
          >
            SYSTEM LAUNCHER SEQUENCE v4.2
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white font-black text-lg sm:text-xl tracking-[0.2em] uppercase"
          >
            RAGINGSUN09 // INGRESS
          </motion.h1>
          <div className="h-1 w-24 bg-neutral-900 mx-auto rounded overflow-hidden relative">
            <motion.div 
              className="h-full bg-[#F27D26]" 
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Diagnostic Logs scroll box */}
        <div className="w-full bg-[#070707] border border-neutral-900 rounded p-4 h-28 overflow-hidden relative flex flex-col justification justify-end text-left">
          {/* Faded scan top overlay */}
          <div className="absolute top-0 inset-x-0 h-6 bg-gradient-to-b from-[#070707] to-transparent z-10 pointer-events-none" />
          
          {/* Micro text logs scrolling dynamically */}
          <div className="space-y-1.5 z-0">
            <AnimatePresence>
              {allLogs.slice(-4).map((log, listIdx) => {
                const isSuccess = log.includes('[OK]') || log.includes('[DECRYPTED]') || log.includes('[RESOLVED]') || log.includes('[SUCCESS]') || log.includes('[COMPLETED]');
                return (
                  <motion.div
                    key={log}
                    initial={{ opacity: 0, x: -15, y: 5 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="text-[9px] font-mono leading-relaxed truncate flex items-center justify-between"
                  >
                    <span className="text-neutral-500 tracking-wider">
                      {listIdx === 3 ? '❯ ' : '  '}
                      {log}
                    </span>
                    {isSuccess && (
                      <span className="text-[8px] font-black bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-1 rounded uppercase mr-1">
                        PASS
                      </span>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  );
}

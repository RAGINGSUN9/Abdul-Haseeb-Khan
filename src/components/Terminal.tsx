import { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Play, RefreshCw, HelpCircle } from 'lucide-react';
import { TerminalLine } from '../types';
import { TerminalSkeleton } from './SkeletonLoader';

interface TerminalProps {
  isLoading?: boolean;
}

export default function Terminal({ isLoading = false }: TerminalProps) {
  const [history, setHistory] = useState<TerminalLine[]>([
    { id: '1', text: 'Sec-Op OS Security Suite [Version 4.29.1]', type: 'system' },
    { id: '2', text: 'Initializing cryptographic protocols and network diagnostic bridges...', type: 'highlight' },
    { id: '3', text: 'Type "help" to view authorized terminal operations or click a command below.', type: 'output' }
  ]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const terminalBottomRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const timeoutsRef = useRef<number[]>([]);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach((t) => clearTimeout(t));
    };
  }, []);

  // Auto-scroll logic
  useEffect(() => {
    terminalBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  // Focus terminal input
  const focusInput = () => {
    inputRef.current?.focus();
  };

  const addLine = (text: string, type: TerminalLine['type']) => {
    setHistory((prev) => [...prev, { id: Math.random().toString(), text, type }]);
  };

  const clearTerminal = () => {
    setHistory([
      { id: '1', text: 'Sec-Op Terminal Session Cleared.', type: 'system' },
      { id: '2', text: 'Type "help" to show directories.', type: 'output' }
    ]);
  };

  const handleCommandSubmit = (commandText: string) => {
    if (isProcessing) return;
    const cleanCommand = commandText.trim();
    if (!cleanCommand) return;

    addLine(`guest@haseeb-sec-op:~$ ${cleanCommand}`, 'input');
    setInput('');

    const cmdParts = cleanCommand.toLowerCase().split(' ');
    const baseCmd = cmdParts[0];
    const arg = cmdParts[1];

    switch (baseCmd) {
      case 'clear':
        clearTerminal();
        break;

      case 'help':
        addLine('====================================================', 'system');
        addLine('  COMMAND     -  DESCRIPTION                        ', 'highlight');
        addLine('====================================================', 'system');
        addLine('  help        - Displays active terminal command layout', 'output');
        addLine('  about       - Summarizes professional credentials', 'output');
        addLine('  projects    - Lists featured open-source repositories', 'output');
        addLine('  skills      - Lists cybersecurity & artificial intelligence vectors', 'output');
        addLine('  scan        - Triggers active penetration scanner on mock target', 'output');
        addLine('  decrypt     - Intercepts a cryptography flag capturing challenge', 'output');
        addLine('  clear       - Flushes security logs on screen', 'output');
        addLine('====================================================', 'system');
        break;

      case 'about':
        addLine('[INFO] ANALYZING RESUME NODE: ABDUL HASEEB KHAN...', 'highlight');
        addLine('Role: Cybersecurity & Artificial Intelligence Student', 'output');
        addLine('Degree: BS Artificial Intelligence Undergraduate', 'output');
        addLine('Core Thesis: Implementing automated ML pipelines to mitigate cyber infiltration.', 'output');
        addLine('Experience: Active CTF contestant, independent static code auditing, script creation.', 'output');
        addLine('Preferred Lab Setup: headless Linux controllers, customized metadata harvesters.', 'output');
        break;

      case 'projects':
        addLine('[INFO] PULLING ACTIVE REPOSITORIES LISTING...', 'highlight');
        addLine('• Network Client Monitor - LAN analyzer searching for unauthorized hosts. (Python)', 'output');
        addLine('• Ghost-Trace-Research - Passive OSINT tracker harvesting platform matches. (Python)', 'output');
        addLine('• PHP Secure Login System - Sec-Op hardened credential portal. (PHP + SQL)', 'output');
        addLine('• WiFi Security Toolkit - Handshake and signal de-auth auditing modules. (Bash)', 'output');
        addLine('• CTF Automation Scripts - Exploitation helper commands. (Python)', 'output');
        addLine('• Web Vulnerability Scanner - Automated OWASP Top 15 audit suites. (Python)', 'output');
        addLine('Type "projects" inside the Featured Work section below to audit detailed specs.', 'success');
        break;

      case 'skills':
        addLine('[INFO] SEC-OP CLASSIFIED CORE COMPETENCY MAP...', 'highlight');
        addLine('[SEC] Penetration Testing, OWASP Audits, Wireless Handshakes, OSINT Investigations', 'output');
        addLine('[A.I] Neural Network Topologies, Regression Models, Multi-Variant Analytics', 'output');
        addLine('[DEV] Secure Software Cycles, Shell Automations, Scripting (Python, Bash, PHP)', 'output');
        break;

      case 'scan':
        triggerScanSimulation();
        break;

      case 'decrypt':
        if (!arg) {
          addLine('[!] CRYPTO PUZZLE ENGAGED [!]', 'error');
          addLine('A ciphered flag signature was intercepted in network transit:', 'output');
          addLine('    "SYNT{PLORE_N_E_SPECIALIST}"', 'highlight');
          addLine('Methodology: ROT-13 Algorithm. Shift characters by 13 positions.', 'output');
          addLine('Instruction: Decode the key and type: decrypt [your_flag_guess]', 'output');
          addLine('Example: decrypt FLAG{SAMPLE}', 'output');
        } else {
          const upperArg = arg.toUpperCase();
          if (upperArg === 'FLAG{CYBER_A_I_SPECIALIST}') {
            addLine('[+] ==========================================[+]', 'success');
            addLine('[+] EXPLOIT TRIUMPHAL. FLAG CAPTURED SUCCESSFULLY!', 'success');
            addLine('[+] KEY: FLAG{CYBER_A_I_SPECIALIST}', 'success');
            addLine('[+] Status Rank: Ethical Decryptor Achievement unlocked!', 'success');
            addLine('[+] ==========================================[+]', 'success');
          } else {
            addLine(`[-] Decryption Failure. Key "${upperArg}" does not fit index algorithms. Try Again!`, 'error');
          }
        }
        break;

      default:
        addLine(`sec-op: command not authorized: "${cleanCommand}". Type "help" for support.`, 'error');
        break;
    }
  };

  const triggerScanSimulation = () => {
    // Clear any and all existing timeouts
    timeoutsRef.current.forEach((t) => clearTimeout(t));
    timeoutsRef.current = [];

    setIsProcessing(true);
    addLine('[!] SCANNING AUDIT PREPARING: TARGET GATEWAY localhost:3000 [!]', 'highlight');
    
    const steps = [
      { text: '[PING] Mapping subnets inside broadcast zones...', delay: 400, type: 'output' },
      { text: '[AUDIT] Port 80, 443 detected. Analyzing SSL negotiation security parameters...', delay: 1000, type: 'output' },
      { text: '[SUCCESS] SSL Certificated issued. Perfect forward secrecy SHA256 configurations found.', delay: 1500, type: 'success' },
      { text: '[ALERT] Directory indexing vulnerability search running on folders structure...', delay: 2000, type: 'error' },
      { text: '[WARN] Outdated configuration path check: /admin (Status: 403 Forbidden - secure)', delay: 2600, type: 'highlight' },
      { text: '[AUDIT] Checking OWASP Cross-Site Script entries and PDO headers verification...', delay: 3200, type: 'output' },
      { text: '[PASS] Headers secure. X-Frame-Options set. XSS vectors mitigated.', delay: 3800, type: 'success' },
      { text: '[*] GATEWAY DECLARED SECURED. 0 Fatal, 1 Minor Warning logged.', delay: 4200, type: 'system' }
    ];

    steps.forEach((step) => {
      const timerId = window.setTimeout(() => {
        addLine(step.text, step.type as TerminalLine['type']);
        if (step.text.startsWith('[*]')) {
          setIsProcessing(false);
        }
      }, step.delay);
      timeoutsRef.current.push(timerId);
    });
  };

  const shortcuts = ['about', 'skills', 'projects', 'scan', 'decrypt'];

  return (
    <section id="console" className="py-24 bg-[#080808] relative overflow-hidden editorial-grid border-b border-[#222]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Title Area */}
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#111] border border-[#222] text-neutral-400 rounded">
            <TerminalIcon className="w-3.5 h-3.5 text-[#F27D26]" />
            <span className="text-[9px] uppercase tracking-[0.15em] font-bold">Interactive Node Sandbox</span>
          </div>
          <h2 className="editorial-title text-3xl sm:text-4xl text-white tracking-tight uppercase">
            Security & Terminal Playground
          </h2>
          <p className="text-neutral-400 font-serif italic text-sm max-w-lg mx-auto">
            Test a fast diagnostic security inspection or try cracking the cryptographic puzzle to test-ride your own pentesting chops!
          </p>
        </div>

        {isLoading ? (
          <TerminalSkeleton />
        ) : (
          <>
            {/* Terminal Case */}
            <div 
              onClick={focusInput}
              className="bg-[#0c0c0c] border border-[#222] rounded overflow-hidden shadow-sm relative cursor-text group transition-colors"
            >
              {/* Header Bar */}
              <div className="bg-[#111] px-4 py-3 flex justify-between items-center border-b border-[#222]">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-neutral-800"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-neutral-700"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-neutral-600"></span>
                  <span className="text-[10px] text-neutral-600 font-mono ml-4 select-none">secop-client.sh</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="text-[9px] text-[#F27D26] bg-[#F27D26]/10 border border-[#F27D26]/20 px-2 py-0.5 rounded font-mono tracking-wider font-bold">
                    AES-GCM-256
                  </span>
                </div>
              </div>

              {/* Lines logs body */}
              <div className="p-5 h-80 overflow-y-auto font-mono text-xs space-y-2.5">
                {history.map((line) => (
                  <div key={line.id} className="leading-relaxed">
                    {line.type === 'input' && (
                      <span className="text-white font-medium">{line.text}</span>
                    )}
                    {line.type === 'output' && (
                      <span className="text-neutral-450">{line.text}</span>
                    )}
                    {line.type === 'system' && (
                      <span className="text-neutral-600">{line.text}</span>
                    )}
                    {line.type === 'highlight' && (
                      <span className="text-white underline decoration-[#F27D26] decoration-1 underline-offset-2 font-medium">{line.text}</span>
                    )}
                    {line.type === 'success' && (
                      <span className="text-[#F27D26] font-semibold">{line.text}</span>
                    )}
                    {line.type === 'error' && (
                      <span className="text-red-500 font-medium">{line.text}</span>
                    )}
                  </div>
                ))}
                <div ref={terminalBottomRef} />
              </div>

              {/* Feed Line input area */}
              <div className="bg-[#111] border-t border-[#222] px-5 py-3 flex items-center">
                <span className="font-mono text-xs text-[#F27D26] mr-2.5 select-none">
                  guest@haseeb-sec-op:~$
                </span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleCommandSubmit(input)}
                  placeholder={isProcessing ? 'Deploying packages...' : 'Enter security protocol hook (e.g. "help")'}
                  disabled={isProcessing}
                  className="flex-1 bg-transparent border-none text-white font-mono text-xs focus:ring-0 w-full"
                />
                {!isProcessing ? (
                  <button 
                    onClick={() => handleCommandSubmit(input)}
                    className="p-1 px-3 text-xs font-mono font-bold bg-[#0c0c0c] hover:bg-[#161616] border border-[#222] text-[#F27D26] hover:text-white rounded flex items-center space-x-1.5 cursor-pointer transition-all"
                  >
                    <span>SEND</span>
                    <Play className="w-3" />
                  </button>
                ) : (
                  <RefreshCw className="w-3.5 h-3.5 text-[#F27D26] animate-spin mr-1" />
                )}
              </div>
            </div>

            {/* Shortcuts Tray */}
            <div className="mt-4 flex flex-wrap justify-center items-center gap-2">
              <span className="font-mono text-[9px] text-neutral-600 select-none mr-1 flex items-center tracking-widest uppercase font-bold">
                <HelpCircle className="w-3 h-3 mr-1 text-[#F27D26]" /> QUICK ACTIONS:
              </span>
              {shortcuts.map((shortcut) => (
                <button
                  key={shortcut}
                  onClick={() => handleCommandSubmit(shortcut)}
                  disabled={isProcessing}
                  className="px-2.5 py-1 text-[10px] font-mono text-neutral-400 bg-[#111] hover:bg-[#161616] hover:text-[#F27D26] border border-[#222] rounded transition-all cursor-pointer uppercase tracking-wider font-semibold"
                >
                  {shortcut === 'scan' ? '⚡ scan' : shortcut === 'decrypt' ? '🔑 decrypt' : shortcut}
                </button>
              ))}
              <button
                onClick={clearTerminal}
                disabled={isProcessing}
                className="px-2.5 py-1 text-[10px] font-mono text-neutral-600 hover:text-white border border-[#222] hover:bg-[#111] rounded transition-all ml-auto pointer-events-auto cursor-pointer uppercase font-bold tracking-wider"
              >
                clear logs
              </button>
            </div>
          </>
        )}

      </div>
    </section>
  );
}

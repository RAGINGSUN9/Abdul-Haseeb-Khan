import { useState, useEffect } from 'react';
import { Terminal, Shield, Menu, X, Github, Mail, ShieldAlert } from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Simple active link detection based on section positions
      const sections = ['home', 'console', 'skills', 'projects', 'articles', 'timeline', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'console', label: 'Playground Console' },
    { id: 'skills', label: 'Competencies' },
    { id: 'projects', label: 'Featured Work' },
    { id: 'articles', label: 'Intel Reports' },
    { id: 'timeline', label: 'Education' },
    { id: 'contact', label: 'Contact' }
  ];

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of the navbar
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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-[#080808]/95 backdrop-blur-md border-b border-[#222] py-3 shadow-sm' 
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => scrollToSection('home')}>
            <div className="flex flex-col">
              <span className="editorial-title text-2xl tracking-tight text-white">AHK.</span>
              <span className="micro-label text-[9px] -mt-0.5 tracking-[0.2em]">Ragingsun09</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-4 py-2 font-mono text-xs transition-colors duration-200 cursor-pointer uppercase tracking-wider ${
                  activeSection === item.id 
                    ? 'text-[#F27D26] font-bold' 
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-[#F27D26] rounded-full"></span>
                )}
              </button>
            ))}

            <div className="h-4 w-px bg-[#222] mx-4"></div>

            {/* Quick Links */}
            <div className="flex items-center space-x-2">
              <a 
                href="https://github.com/ragingsun9" 
                target="_blank" 
                rel="noreferrer"
                className="p-1.5 text-neutral-400 hover:text-[#F27D26] transition-colors bg-[#111] hover:bg-[#161616] border border-[#222] rounded"
                title="Github Profile"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-neutral-400 hover:text-white bg-[#111] border border-[#222] rounded focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#080808]/98 backdrop-blur-lg border-b border-[#222] py-4 px-6 shadow-2xl animate-fade-in">
          <div className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`flex items-center justify-between px-3 py-2.5 font-mono text-xs rounded transition-colors uppercase tracking-wider ${
                  activeSection === item.id 
                    ? 'text-[#F27D26] bg-[#F27D26]/5 font-bold border-l-2 border-[#F27D26] pl-2.5' 
                    : 'text-neutral-400 hover:text-white hover:bg-[#111]'
                }`}
              >
                <span>{item.label}</span>
                {activeSection === item.id && <Terminal className="w-3.5 h-3.5 text-[#F27D26]" />}
              </button>
            ))}
            
            <div className="h-px bg-[#222] my-2"></div>
            
            <div className="flex justify-between items-center px-3 py-1">
              <span className="text-neutral-600 font-mono text-[10px] tracking-wider">CONNECTIONS:</span>
              <div className="flex space-x-3">
                <a 
                  href="https://github.com/ragingsun9" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center text-neutral-400 hover:text-[#F27D26]"
                >
                  <Github className="w-4 h-4 mr-1" />
                  <span className="text-[10px] font-mono">GitHub</span>
                </a>
                <a 
                  href="mailto:haseebkhan03005036291@gmail.com" 
                  className="flex items-center text-neutral-400 hover:text-[#F27D26]"
                >
                  <Mail className="w-4 h-4 mr-1" />
                  <span className="text-[10px] font-mono">Email</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-[#0c0c0c] border-t border-[#222] py-12 relative overflow-hidden text-neutral-500 font-mono text-xs">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Brand */}
          <div className="flex flex-col cursor-pointer" onClick={handleScrollTop}>
            <span className="editorial-title text-2xl tracking-normal text-white">AHK.</span>
            <span className="text-[9px] text-neutral-600 tracking-[0.15em] font-bold uppercase -mt-0.5">PORTFOLIO</span>
          </div>

          {/* Copyrights and state indicators */}
          <div className="text-center md:text-right space-y-1.5">
            <p className="text-[10px] text-neutral-400 uppercase tracking-wider font-bold">
              © {currentYear} Abdul Haseeb Khan. All rights reserved.
            </p>
            <p className="text-[10px] text-[#F27D26]/90 uppercase tracking-widest font-bold flex items-center justify-center md:justify-end gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#F27D26] inline-block animate-pulse"></span>
              <span>Engineered by Kinetix</span>
            </p>
            <p className="text-[8px] text-neutral-700 tracking-widest font-bold uppercase pt-0.5">
              RE-STYLED // EDITORIAL GRID VERTICALS VERIFIED
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}
